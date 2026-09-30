"""
Page Object for Assignments Page encompassing Gantt timeline, Details Drawer,
and Worker List.
"""

import re
from datetime import date, datetime
from typing import Optional

from playwright.sync_api import Page, Locator

from .base_page import BasePage
from .unassign_modal import UnassignConfirmationModal
from .reassign_modal import ReassignEffectiveDateModal
from .warning_modal import StartDateWarningModal
from utils.ui_config import ui_config


class AssignmentsPage(BasePage):
    """Page object managing the Scheduling Gantt and Worker Table."""

    def __init__(self, page: Page):
        super().__init__(page)

        self.nav_assignments: Locator = (
            self.page.get_by_role("link", name="Assignments")
            .or_(self.page.get_by_text("Assignments", exact=True))
            .first
        )

        self.schedule_tab: Locator = (
            self.page.get_by_role("button", name="Schedule")
            .or_(self.page.get_by_text("Schedule", exact=True))
            .first
        )

        self.worker_table_tab: Locator = (
            self.page.get_by_role("button", name="Worker Table")
            .or_(self.page.get_by_text("Worker Table", exact=True))
            .first
        )

        # Stable selector discovered from the live application DOM.
        self.gantt_container: Locator = self.page.locator(
            "[data-bar='true']"
        ).first

        # MUI drawer container.
        self.details_drawer: Locator = self.page.locator(
            ".MuiDrawer-paper"
        ).first

        # Stable button selectors using accessible roles/text.
        self.drawer_unassign_button: Locator = (
            self.details_drawer
            .get_by_role("button", name="Unassign", exact=True)
        )

        self.drawer_reassign_button: Locator = (
            self.details_drawer
            .get_by_role("button", name="Reassign", exact=True)
        )

        self.drawer_split_button: Locator = (
            self.details_drawer
            .get_by_role("button", name="Split", exact=True)
        )

        self.drawer_close_button: Locator = (
            self.details_drawer
            .get_by_role("button", name="Close drawer", exact=True)
        )

        self.unassign_modal = UnassignConfirmationModal(page)
        self.reassign_modal = ReassignEffectiveDateModal(page)
        self.warning_modal = StartDateWarningModal(page)

    # ------------------------------------------------------------------
    # Navigation
    # ------------------------------------------------------------------

    def navigate_to_assignments(self):
        """Navigate to the Scheduling / Assignments page."""
        self.page.goto(
            f"{ui_config.base_url}/scheduling",
            wait_until="domcontentloaded",
        )

        self.page.wait_for_timeout(3000)

    def open_gantt_view(self):
        """Ensure the Schedule timeline view is loaded."""
        try:
            if self.schedule_tab.is_visible():
                self.schedule_tab.click()
                self.page.wait_for_timeout(1000)
        except Exception:
            pass

    # ------------------------------------------------------------------
    # Gantt / Assignment discovery
    # ------------------------------------------------------------------

    @staticmethod
    def _parse_start_date(label_text: str) -> Optional[date]:
        """
        Extract the assignment start date from a Gantt label.

        Supported examples:

            Feb 9 – Oct 1 · 8h/day · MEALS ON WHEELS
            Mar 2 - Dec 28 · 8h/day · RESILIENCE
            2026-02-09 - 2026-10-01 · 8h/day · PROJECT

        When the UI does not display a year, the current year is assumed.
        """

        if not label_text:
            return None

        text = " ".join(label_text.split())

        # --------------------------------------------------------------
        # ISO date: 2026-02-09
        # --------------------------------------------------------------
        iso_match = re.search(
            r"\b(20\d{2})-(\d{1,2})-(\d{1,2})\b",
            text,
        )

        if iso_match:
            try:
                return date(
                    int(iso_match.group(1)),
                    int(iso_match.group(2)),
                    int(iso_match.group(3)),
                )
            except ValueError:
                return None

        # --------------------------------------------------------------
        # Month name + day:
        #
        # Feb 9
        # February 9
        # Sep 10
        # September 10
        # --------------------------------------------------------------
        month_match = re.search(
            r"\b("
            r"Jan(?:uary)?|"
            r"Feb(?:ruary)?|"
            r"Mar(?:ch)?|"
            r"Apr(?:il)?|"
            r"May|"
            r"Jun(?:e)?|"
            r"Jul(?:y)?|"
            r"Aug(?:ust)?|"
            r"Sep(?:t(?:ember)?)?|"
            r"Oct(?:ober)?|"
            r"Nov(?:ember)?|"
            r"Dec(?:ember)?"
            r")\s+(\d{1,2})"
            r"(?:,\s*(20\d{2}))?",
            text,
            re.IGNORECASE,
        )

        if not month_match:
            return None

        month_text = month_match.group(1)
        day_text = month_match.group(2)
        year_text = month_match.group(3)

        try:
            month_number = datetime.strptime(
                month_text[:3].title(),
                "%b",
            ).month

            year_number = (
                int(year_text)
                if year_text
                else date.today().year
            )

            return date(
                year_number,
                month_number,
                int(day_text),
            )

        except (ValueError, TypeError):
            return None

    def _get_assignment_label(self, bar: Locator) -> str:
        """Return the text from the stable Gantt assignment label."""

        try:
            label = bar.locator(
                "[data-bar-label='true']"
            ).first

            if label.count():
                text = label.inner_text().strip()

                if text:
                    return text
        except Exception:
            pass

        try:
            return bar.inner_text().strip()
        except Exception:
            return ""

    def _get_past_start_assignment_bars(self):
        """
        Return visible Gantt assignment bars whose start date is before
        today.

        The worker name is deliberately NOT used as a required selector.

        This allows the test environment to contain different workers or
        different assignment data.
        """

        bars = self.page.locator("[data-bar='true']")

        try:
            bars.first.wait_for(
                state="visible",
                timeout=15000,
            )
        except Exception as exc:
            raise AssertionError(
                "No Gantt assignment bars were found. "
                "Expected elements with data-bar='true'."
            ) from exc

        today = date.today()
        candidates = []

        for i in range(bars.count()):
            bar = bars.nth(i)

            try:
                if not bar.is_visible():
                    continue

                label_text = self._get_assignment_label(bar)

                if not label_text:
                    continue

                start_date = self._parse_start_date(label_text)

                if start_date is None:
                    continue

                if start_date < today:
                    candidates.append(
                        {
                            "bar": bar,
                            "label": label_text,
                            "start_date": start_date,
                        }
                    )

            except Exception:
                continue

        # Prefer the most recently started past assignment.
        #
        # Example:
        # Aug 10, 2026
        # Mar 2, 2026
        # Feb 9, 2026
        #
        # This generally gives us the most relevant active/current
        # assignment first.
        candidates.sort(
            key=lambda item: item["start_date"],
            reverse=True,
        )

        return candidates

    def get_assignment_bar(self, identifier: str = "") -> Locator:
        """
        Return a visible assignment bar whose start date is in the past.

        `identifier` is retained for compatibility with existing tests,
        but it is NOT required for selecting an assignment.

        The test will dynamically discover suitable assignment data instead
        of depending on a specific worker such as BASCOM HUNTER.
        """

        candidates = self._get_past_start_assignment_bars()

        if not candidates:
            raise AssertionError(
                "No visible Gantt assignment has a start date in the past."
            )

        # If an identifier was supplied, use it only as a preference.
        if identifier:
            identifier_lower = identifier.strip().lower()

            for candidate in candidates:
                label_lower = candidate["label"].lower()

                if identifier_lower in label_lower:
                    return candidate["bar"]

        # Otherwise use dynamically discovered past-start assignment.
        return candidates[0]["bar"]

    # ------------------------------------------------------------------
    # Assignment Details Drawer
    # ------------------------------------------------------------------

    def _drawer_has_required_assignment_actions(self) -> bool:
        """
        Check whether the opened assignment drawer represents a valid
        assignment that supports Split, Reassign, and Unassign.

        Open slots / unavailable assignment rows are skipped.
        """

        try:
            self.details_drawer.wait_for(
                state="visible",
                timeout=10000,
            )

            required_buttons = [
                self.drawer_split_button,
                self.drawer_reassign_button,
                self.drawer_unassign_button,
            ]

            for button in required_buttons:
                try:
                    if not button.is_visible():
                        return False
                except Exception:
                    return False

            return True

        except Exception:
            return False

    def open_assignment_drawer(self, identifier: str = ""):
        """
        Find and open a valid assignment drawer.

        Selection rules:

        1. Discover Gantt assignment bars dynamically.
        2. Ignore assignments whose start date is today/future.
        3. Prefer the most recently started past assignment.
        4. Click a candidate.
        5. Verify the drawer contains:
             - Split
             - Reassign
             - Unassign
        6. If it is an open slot or otherwise invalid, close it and
           try the next past-start assignment.
        """

        candidates = self._get_past_start_assignment_bars()

        if not candidates:
            raise AssertionError(
                "No suitable assignment was found. "
                "A visible assignment with a start date in the past "
                "is required."
            )

        # If identifier exists, try matching candidates first.
        if identifier:
            identifier_lower = identifier.strip().lower()

            matching = [
                candidate
                for candidate in candidates
                if identifier_lower in candidate["label"].lower()
            ]

            non_matching = [
                candidate
                for candidate in candidates
                if candidate not in matching
            ]

            candidates = matching + non_matching

        last_error = None

        for candidate_index, candidate in enumerate(candidates):
            bar = candidate["bar"]
            label = candidate["label"]
            start_date = candidate["start_date"]

            print(
                f"\n[Assignment Discovery] Candidate "
                f"{candidate_index + 1}/{len(candidates)}"
            )
            print(f"[Assignment Discovery] Label: {label}")
            print(
                f"[Assignment Discovery] Start date: "
                f"{start_date.isoformat()}"
            )

            # Make sure a previous drawer is closed before clicking
            # another candidate.
            self.close_drawer()

            for attempt in range(3):
                try:
                    bar.click(
                        force=True,
                        timeout=10000,
                    )

                    self.page.wait_for_timeout(
                        2000 + attempt * 1000
                    )

                    if not self.details_drawer.is_visible():
                        continue

                    if self._drawer_has_required_assignment_actions():
                        print(
                            "[Assignment Discovery] Valid assignment "
                            "drawer found."
                        )
                        return

                    print(
                        "[Assignment Discovery] Drawer opened, but "
                        "Split/Reassign/Unassign are not available. "
                        "Trying next assignment."
                    )

                    self.close_drawer()
                    break

                except Exception as exc:
                    last_error = exc

                    if attempt < 2:
                        self.page.wait_for_timeout(1000)

            # Continue with the next candidate.

        if last_error is not None:
            raise AssertionError(
                "Unable to find a valid past-start assignment drawer "
                "with Split, Reassign, and Unassign actions."
            ) from last_error

        raise AssertionError(
            "No valid past-start assignment was found with "
            "Split, Reassign, and Unassign actions."
        )

    def trigger_gantt_context_menu_action(
        self,
        identifier: str = "",
        action: str = "Unassign",
    ):
        """
        Open a valid assignment and trigger the requested drawer action.
        """

        self.open_assignment_drawer(identifier)
        self.trigger_drawer_action(action)

    def trigger_drawer_action(self, action: str):
        """
        Click an action inside the Assignment Details Drawer.

        Supported actions:
            - Unassign
            - Reassign
            - Split
        """

        allowed_actions = {
            "Unassign": self.drawer_unassign_button,
            "Reassign": self.drawer_reassign_button,
            "Split": self.drawer_split_button,
        }

        if action not in allowed_actions:
            raise ValueError(
                f"Unsupported drawer action '{action}'. "
                f"Expected one of: {', '.join(allowed_actions)}"
            )

        self.details_drawer.wait_for(
            state="visible",
            timeout=10000,
        )

        button = allowed_actions[action]

        button.wait_for(
            state="visible",
            timeout=10000,
        )

        button.click()

        self.page.wait_for_timeout(1500)

    def close_drawer(self):
        """Close the Assignment Details Drawer."""

        try:
            if not self.details_drawer.is_visible():
                return

            # Preferred stable selector.
            try:
                if self.drawer_close_button.is_visible():
                    self.drawer_close_button.click()
                    self.page.wait_for_timeout(1000)
                    return
            except Exception:
                pass

            # Fallback for MUI drawer implementations where the accessible
            # name is not available.
            close_button = (
                self.details_drawer
                .locator("button")
                .filter(has=self.page.locator("svg"))
                .first
            )

            if close_button.is_visible():
                close_button.click()
                self.page.wait_for_timeout(1000)

        except Exception:
            pass

    # ------------------------------------------------------------------
    # Worker Table
    # ------------------------------------------------------------------

    def open_worker_assignments_tab(self):
        """Navigate to the Worker Table tab."""

        try:
            self.worker_table_tab.wait_for(
                state="visible",
                timeout=10000,
            )

            self.worker_table_tab.click()

            self.page.wait_for_timeout(1500)

        except Exception:
            pass

        self.page.wait_for_load_state(
            "domcontentloaded"
        )

    def trigger_worker_list_row_action(
        self,
        identifier: str = "",
        action: str = "Unassign",
    ):
        """
        Trigger an action for an assignment in Worker Table.

        If the Worker Table row cannot directly open the drawer, fall back
        to the dynamic Gantt assignment discovery.
        """

        rows = self.page.locator(
            "tr, [role='row']"
        )

        row = None

        # --------------------------------------------------------------
        # Prefer identifier when supplied, but don't require it.
        # --------------------------------------------------------------
        if identifier:
            candidate = rows.filter(
                has_text=identifier
            ).first

            try:
                candidate.wait_for(
                    state="visible",
                    timeout=5000,
                )

                row = candidate

            except Exception:
                row = None

        # --------------------------------------------------------------
        # Dynamic worker row discovery.
        # --------------------------------------------------------------
        if row is None:
            for i in range(rows.count()):
                candidate = rows.nth(i)

                try:
                    if not candidate.is_visible():
                        continue

                    text = candidate.inner_text().strip()

                    if not text:
                        continue

                    # Skip obvious table headers.
                    if "WORKER" in text.upper():
                        continue

                    row = candidate
                    break

                except Exception:
                    continue

        # --------------------------------------------------------------
        # If no row is found, use dynamic Gantt discovery.
        # --------------------------------------------------------------
        if row is None:
            self.open_assignment_drawer(identifier)
            self.trigger_drawer_action(action)
            return

        try:
            row.click(
                force=True,
                timeout=10000,
            )

        except Exception:
            # Worker table click failed.
            # Fall back to dynamic Gantt selection.
            self.open_assignment_drawer(identifier)
            self.trigger_drawer_action(action)
            return

        self.page.wait_for_timeout(1500)

        # --------------------------------------------------------------
        # If row click opened a valid drawer, use it.
        # --------------------------------------------------------------
        if self.details_drawer.is_visible():
            if self._drawer_has_required_assignment_actions():
                self.trigger_drawer_action(action)
                return

            # Invalid/open-slot drawer.
            self.close_drawer()

        # --------------------------------------------------------------
        # Final fallback: dynamically find a valid past-start assignment.
        # --------------------------------------------------------------
        self.open_assignment_drawer(identifier)
        self.trigger_drawer_action(action)