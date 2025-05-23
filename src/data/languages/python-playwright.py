from playwright.sync_api import sync_playwright, Playwright
import os

def run(playwright: Playwright):
    browser = playwright.chromium.connect_over_cdp(f"wss://cdp.blitzbrowser.com?accessKey={os.environ.get('BLITZBROWSER_ACCESS_KEY')}")
    page = browser.new_page()

with sync_playwright() as playwright:
    run(playwright)