"""
Configuration settings for Steak 'n Shake UI Automation.
"""

import os

# Base Application URL
BASE_URL = os.getenv("STEAKNSHAKE_BASE_URL", "https://www.steaknshake.com")

# Timeout Configurations (milliseconds)
DEFAULT_TIMEOUT = int(os.getenv("DEFAULT_TIMEOUT", "10000"))
NAVIGATION_TIMEOUT = int(os.getenv("NAVIGATION_TIMEOUT", "30000"))

# Test Credentials (Loaded from environment variables)
TEST_VALID_USER = os.getenv("TEST_VALID_USER", "valid_user@example.com")
TEST_VALID_PASSWORD = os.getenv("TEST_VALID_PASSWORD", "ValidPassword123!")
TEST_INVALID_USER = os.getenv("TEST_INVALID_USER", "invalid_user@example.com")
TEST_INVALID_PASSWORD = os.getenv("TEST_INVALID_PASSWORD", "WrongPassword123!")

# External Target URLs
URL_FRANCHISE = "http://www.steaknshakefranchise.com/"
URL_SHOP = "https://www.shopsteaknshake.com/"
URL_CAREERS = "https://recruiting.talentreef.com/steak-n-shake-corporate"
URL_FEEDBACK = "https://www.customerpulse.net/"
URL_BIGLARI = "http://www.biglariholdings.com/"
URL_REWARDS_FAQ = "https://www.steaknshake.com/rewards-faq/"
URL_GOOGLE_PLAY = "https://play.google.com/store/apps/details?id=com.zipscene.mobile.sns&hl=en_IN"
URL_APP_STORE = "https://apps.apple.com/in/app/steak-n-shake-rewards-club/id577076711"
URL_BEEF_TALLOW = "https://beeftallow.steaknshake.com/"
URL_HATS = "https://hats.steaknshake.com/"
URL_SEED_OILS = "https://www.steaknshake.com/seed-oils/"
URL_CATERING = "https://order.steaknshakecatering.com/"
URL_SIGNUP = "https://www.steaknshake.com/signup/"
URL_LOGIN = "https://www.steaknshake.com/login/"
