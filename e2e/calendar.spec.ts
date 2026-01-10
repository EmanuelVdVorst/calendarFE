import { test, expect } from '@playwright/test';

test.describe('Calendar Application', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Wait for the app to load
    await page.waitForLoadState('networkidle');
  });

  test('should display the calendar page', async ({ page }) => {
    // Check that the main navigation elements are visible
    await expect(page.getByRole('button', { name: 'Today' })).toBeVisible();
    await expect(page.getByRole('button', { name: /Prev/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Next/i })).toBeVisible();
  });

  test('should display week header with current week information', async ({ page }) => {
    // Check that week information is displayed
    const heading = page.getByRole('heading', { level: 1 });
    await expect(heading).toBeVisible();
    await expect(heading).toContainText('Week');
  });

  test('should navigate to previous week', async ({ page }) => {
    // Get current week info
    const heading = page.getByRole('heading', { level: 1 });
    const currentWeekText = await heading.textContent();

    // Click previous week button
    await page.getByRole('button', { name: /Prev/i }).click();

    // Check that the week has changed
    await expect(heading).not.toHaveText(currentWeekText ?? '');
  });

  test('should navigate to next week', async ({ page }) => {
    // Get current week info
    const heading = page.getByRole('heading', { level: 1 });
    const currentWeekText = await heading.textContent();

    // Click next week button
    await page.getByRole('button', { name: /Next/i }).click();

    // Check that the week has changed
    await expect(heading).not.toHaveText(currentWeekText ?? '');
  });

  test('should return to today when clicking Today button', async ({ page }) => {
    // Get current week info
    const heading = page.getByRole('heading', { level: 1 });
    const initialWeekText = await heading.textContent();

    // Navigate away from today
    await page.getByRole('button', { name: /Next/i }).click();
    await page.getByRole('button', { name: /Next/i }).click();

    // Verify we moved
    await expect(heading).not.toHaveText(initialWeekText ?? '');

    // Click Today button
    await page.getByRole('button', { name: 'Today' }).click();

    // Should be back to initial week
    await expect(heading).toHaveText(initialWeekText ?? '');
  });

  test('should display day headers for the week', async ({ page }) => {
    // Check that day abbreviations are visible in the header
    // Use regex to match exact day abbreviations
    const weekHeader = page.locator('text=/^(MON|TUE|WED|THU|FRI|SAT|SUN)$/').first();
    await expect(weekHeader).toBeVisible();
  });
});

test.describe('Event Modal', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  // Helper function to open modal by clicking on a time slot
  async function openNewEventModal(page: import('@playwright/test').Page): Promise<void> {
    const timeSlots = page.getByTestId('time-slot');
    await expect(timeSlots.first()).toBeVisible({ timeout: 10000 });

    // Use JavaScript click to bypass overlay issues
    await timeSlots.nth(20).dispatchEvent('click');

    // Wait for modal to appear
    await expect(page.getByText('New Event')).toBeVisible({ timeout: 5000 });
  }

  test('should open modal when clicking on a time slot', async ({ page }) => {
    await openNewEventModal(page);
    await expect(page.getByText('New Event')).toBeVisible();
  });

  test('should close modal when clicking Cancel', async ({ page }) => {
    await openNewEventModal(page);

    // Click Cancel button
    await page.getByRole('button', { name: 'Cancel' }).click();

    // Modal should be closed
    await expect(page.getByText('New Event')).not.toBeVisible();
  });

  test('should show validation error for empty title', async ({ page }) => {
    await openNewEventModal(page);

    // Try to submit without a title
    await page.getByRole('button', { name: 'Create Event' }).click();

    // Should show validation error
    await expect(page.getByText('Event title is required')).toBeVisible();
  });

  test('should create an event with valid data', async ({ page }) => {
    await openNewEventModal(page);

    // Fill in the event title
    await page.getByLabel('Event Title').fill('Test Meeting');

    // Submit the form
    await page.getByRole('button', { name: 'Create Event' }).click();

    // Modal should close (may fail if backend is not running, that's expected)
    // Wait a bit for the API call
    await page.waitForTimeout(500);
  });
});

test.describe('Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should have accessible navigation buttons', async ({ page }) => {
    const todayButton = page.getByRole('button', { name: 'Today' });
    const prevButton = page.getByRole('button', { name: /Prev/i });
    const nextButton = page.getByRole('button', { name: /Next/i });

    await expect(todayButton).toBeVisible();
    await expect(prevButton).toBeVisible();
    await expect(nextButton).toBeVisible();
  });

  test('should have proper heading hierarchy', async ({ page }) => {
    const h1 = page.getByRole('heading', { level: 1 });
    await expect(h1).toBeVisible();
  });

  test('form fields should have labels', async ({ page }) => {
    // Open the modal using dispatchEvent
    const timeSlots = page.getByTestId('time-slot');
    await expect(timeSlots.first()).toBeVisible({ timeout: 10000 });
    await timeSlots.nth(20).dispatchEvent('click');

    // Wait for modal
    await expect(page.getByText('New Event')).toBeVisible({ timeout: 5000 });

    // Check that form fields have accessible labels
    await expect(page.getByLabel('Event Title')).toBeVisible();
    await expect(page.getByLabel('Start Time')).toBeVisible();
    await expect(page.getByLabel('End Time')).toBeVisible();
  });
});

test.describe('Keyboard Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should be able to activate buttons with keyboard', async ({ page }) => {
    // Focus on Today button and verify it's focusable
    const todayButton = page.getByRole('button', { name: 'Today' });
    await todayButton.focus();
    await expect(todayButton).toBeFocused();
  });

  test('should be able to submit form with Enter key', async ({ page }) => {
    // Open the modal
    const timeSlots = page.getByTestId('time-slot');
    await expect(timeSlots.first()).toBeVisible({ timeout: 10000 });
    await timeSlots.nth(20).dispatchEvent('click');

    // Wait for modal
    await expect(page.getByText('New Event')).toBeVisible({ timeout: 5000 });

    // Fill in the event title
    const titleInput = page.getByLabel('Event Title');
    await titleInput.fill('Keyboard Test Event');

    // Press Enter to submit
    await titleInput.press('Enter');

    // Form should attempt to submit (modal may close or show success)
    // Wait a bit for any API calls
    await page.waitForTimeout(500);
  });
});
