import { test, expect } from '@playwright/test'

test.describe('Home page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('Page title is correct', async ({ page }) => {
    await expect(page).toHaveTitle('Carbonite')
  })

  test('Home hero exists', async ({ page }) => {
    await expect(page.getByText('Welcome to Carbonite')).toBeVisible()
    await expect(page.getByText(/Carbonite is an online encyclopedia/)).toBeVisible()
  })

  test('Info cards exist', async ({ page }) => {
    const labels = ['Films', 'People', 'Planets', 'Species', 'Starships', 'Vehicles']
    for (const label of labels) {
      await expect(page.getByRole('heading', { name: label })).toBeVisible()
    }
  })
})
