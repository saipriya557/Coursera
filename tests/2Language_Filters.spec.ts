import { expect } from '@playwright/test';
import { test } from '../fixtures/test-fixture';
import { Logger } from '../utils/logger';

// test.describe.configure({ mode: 'serial' });

test.beforeAll(async () => {
  Logger.log('Starting Test Suite 2 - Language Filter Tests');
});

test.afterAll(async () => {
  Logger.log('Completed Test Suite 2 - Language Filter Tests');
});
test.setTimeout(90_000);
test('@sanity Test 2.1 - Open Language Filter and Count Available Options', async ({ homePage, searchPage }) => {
  await homePage.goto();
  await homePage.searchCourse('Language Learning');
  await searchPage.openLanguageFilter();
  const languageOptions = await searchPage.getLanguageOptions();
  const count = await languageOptions.count();
  Logger.log(`Available language filters: ${count}`);
});

test('@sanity Test 2.2 - Iterate Through Languages and List Available Levels', async ({ page, homePage, searchPage }) => {

  await homePage.goto();
  await homePage.searchCourse('Language Learning');
  await searchPage.openLanguageFilter();

  const languageOptions = await searchPage.getLanguageOptions();

  const count = await languageOptions.count();
  expect(count).toBeGreaterThan(0);
  // expect(count).toBeGreaterThan(-1);

  Logger.log(`Total available language filters found: ${count}`);
  const view = page.getByRole('button', { name: 'View' });

  for (let j = 0; j < 4; j++) {
    Logger.log(`Selecting Language Filter ${j + 1}: ${await languageOptions.nth(j).innerText()}`);
    await languageOptions.nth(j).click();
    await searchPage.applyView();
    await searchPage.openLevelFilter();
    await page.waitForTimeout(5000);

    const levelOptions = await searchPage.getLevelOptions();
    const levelCount = await levelOptions.count();
    expect(levelCount).toBeGreaterThan(0);

    for (let k = 0; k < levelCount; k++) {
      const text = (await levelOptions.nth(k).textContent()) ?? '';
      Logger.log(text);
    }

    await searchPage.applyView();
    await searchPage.openLanguageFilter();
    await searchPage.clearFilters();
  }
});

