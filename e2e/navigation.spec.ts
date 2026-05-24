import { test, expect } from '@playwright/test'

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('brand link navigates to home', async ({ page }) => {
    await page.getByRole('link', { name: 'Carbonite' }).click()
    await expect(page).toHaveURL('/')
  })

  test('browse menu opens with all 6 categories', async ({ page }) => {
    const browseButton = page.getByRole('button', { name: 'Browse' })
    await browseButton.click()

    const labels = ['Films', 'People', 'Planets', 'Species', 'Starships', 'Vehicles']
    for (const label of labels) {
      await expect(page.getByRole('menuitem', { name: label })).toBeVisible()
    }
  })

  test('browse menu items navigate to correct pages', async ({ page }) => {
    const routes = [
      { label: 'Films', path: '/films' },
      { label: 'People', path: '/people' },
      { label: 'Planets', path: '/planets' },
      { label: 'Species', path: '/species' },
      { label: 'Starships', path: '/starships' },
      { label: 'Vehicles', path: '/vehicles' },
    ]

    for (const { label, path } of routes) {
      await page.getByRole('button', { name: 'Browse' }).click()
      await page.getByRole('menuitem', { name: label }).click()
      await expect(page).toHaveURL(path)
      await page.goto('/')
    }
  })
})
