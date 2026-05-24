import { test, expect } from '@playwright/test'

test.describe('Detail pages', () => {
  test('film detail shows properties', async ({ page }) => {
    await page.goto('/films/1')
    await expect(page.getByRole('heading', { name: /A New Hope/i })).toBeVisible()
    await expect(page.getByText('Directed By')).toBeVisible()
    await expect(page.getByText('Producer(s)')).toBeVisible()
    await expect(page.getByText('Release Date')).toBeVisible()
  })

  test('person detail shows properties', async ({ page }) => {
    await page.goto('/people/1')
    await expect(page.getByRole('heading', { name: /Luke Skywalker/i })).toBeVisible()
    await expect(page.getByText(/Gender/)).toBeVisible()
    await expect(page.getByText(/Weight/)).toBeVisible()
    await expect(page.getByText(/Height/)).toBeVisible()
  })

  test('planet detail shows properties', async ({ page }) => {
    await page.goto('/planets/1')
    await expect(page.getByRole('heading', { name: /Tatooine/i })).toBeVisible()
    await expect(page.getByText('Climate')).toBeVisible()
    await expect(page.getByText('Terrain')).toBeVisible()
  })

  test('species detail shows properties', async ({ page }) => {
    await page.goto('/species/1')
    await expect(page.getByRole('heading', { name: /Human/i })).toBeVisible()
    await expect(page.getByText('Language')).toBeVisible()
    await expect(page.getByText('Classification')).toBeVisible()
  })

  test('starship detail shows properties', async ({ page }) => {
    await page.goto('/starships/2')
    await expect(page.getByText(/Starship Class/i)).toBeVisible()
    await expect(page.getByText(/Model/i)).toBeVisible()
  })

  test('vehicle detail shows properties', async ({ page }) => {
    await page.goto('/vehicles/4')
    await expect(page.getByText(/Vehicle Class/i)).toBeVisible()
    await expect(page.getByText(/Model/i)).toBeVisible()
  })

  test.describe('Not-found handling', () => {
    const categories = [
      { id: 'films/99999', category: 'films' },
      { id: 'people/99999', category: 'people' },
      { id: 'planets/99999', category: 'planets' },
      { id: 'species/99999', category: 'species' },
      { id: 'starships/99999', category: 'starships' },
      { id: 'vehicles/99999', category: 'vehicles' },
    ]

    for (const { id, category } of categories) {
      test(`shows not-found for invalid ${category} ID`, async ({ page }) => {
        await page.goto(`/${id}`)
        await expect(page.getByText('Resource Not Found')).toBeVisible()
        await expect(page.getByText(`The requested ${category} could not be found`)).toBeVisible()
      })
    }

    test('not-found has working browse all link', async ({ page }) => {
      await page.goto('/films/99999')
      await expect(page.getByText('Resource Not Found')).toBeVisible()
      await page.getByText('Browse all films').click()
      await expect(page).toHaveURL('/films')
    })
  })
})
