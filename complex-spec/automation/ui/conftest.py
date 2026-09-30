"""Pytest configuration and fixture imports for UI test suite."""
import sys
import os

# Ensure automation/ui directory and its subdirectories are on python path
CURRENT_DIR = os.path.abspath(os.path.dirname(__file__))
if CURRENT_DIR not in sys.path:
    sys.path.insert(0, CURRENT_DIR)

from fixtures.browser_fixtures import browser_instance, context, page, assignments_page

__all__ = ["browser_instance", "context", "page", "assignments_page"]
