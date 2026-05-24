import { test, expect } from '@playwright/test'

test.describe('Listing pages', () => {
  test('films page loads and displays cards', async ({ page }) => {
    await page.goto('/films')
    await expect(page.getByRole('heading', { name: 'Films' })).toBeVisible()
    const cards = page.locator('a[href^="/films/"]')
    await expect(cards.first()).toBeVisible()
    await expect(cards).not.toHaveCount(0)
  })

  test('people page loads with pagination', async ({ page }) => {
    await page.goto('/people')
    await expect(page.getByRole('heading', { name: 'People' })).toBeVisible()
    await expect(page.getByText(/Page 1 of/).first()).toBeVisible()
  })

  test('planets page loads with pagination', async ({ page }) => {
    await page.goto('/planets')
    await expect(page.getByRole('heading', { name: 'Planets' })).toBeVisible()
    await expect(page.getByText(/Page 1 of/).first()).toBeVisible()
  })

  test('species page loads with pagination', async ({ page }) => {
    await page.goto('/species')
    await expect(page.getByRole('heading', { name: 'Species', exact: true })).toBeVisible()
    await expect(page.getByText(/Page 1 of/).first()).toBeVisible()
  })

  test('starships page loads with pagination', async ({ page }) => {
    await page.goto('/starships')
    await expect(page.getByRole('heading', { name: 'Starships' })).toBeVisible()
    await expect(page.getByText(/Page 1 of/).first()).toBeVisible()
  })

  test('vehicles page loads with pagination', async ({ page }) => {
    await page.goto('/vehicles')
    await expect(page.getByRole('heading', { name: 'Vehicles' })).toBeVisible()
    await expect(page.getByText(/Page 1 of/).first()).toBeVisible()
  })

  test.describe('Pagination controls', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/people')
    })

    test('previous button is disabled on page 1', async ({ page }) => {
      const prevButton = page.getByRole('button', { name: 'Previous' }).first()
      await expect(prevButton).toBeDisabled()
    })

    test('next button advances to page 2', async ({ page }) => {
      const nextButton = page.getByRole('button', { name: 'Next' }).first()
      await nextButton.click()
      await expect(page.getByText(/Page 2 of/).first()).toBeVisible()
    })

    test('previous becomes enabled after advancing', async ({ page }) => {
      await page.getByRole('button', { name: 'Next' }).first().click()
      await expect(page.getByRole('button', { name: 'Previous' }).first()).toBeEnabled()
    })

    test('can navigate back to page 1', async ({ page }) => {
      await page.getByRole('button', { name: 'Next' }).first().click()
      await page.getByRole('button', { name: 'Previous' }).first().click()
      await expect(page.getByText(/Page 1 of/).first()).toBeVisible()
    })
  })

  test.describe('Search filtering', () => {
    const categories = [
      { path: '/films', searchPlaceholder: 'Search for films', heading: 'Films' },
      { path: '/people', searchPlaceholder: 'Search for people', heading: 'People' },
      { path: '/planets', searchPlaceholder: 'Search for planets', heading: 'Planets' },
      { path: '/species', searchPlaceholder: 'Search for species', heading: 'Species' },
      { path: '/starships', searchPlaceholder: 'Search for starships', heading: 'Starships' },
      { path: '/vehicles', searchPlaceholder: 'Search for vehicles', heading: 'Vehicles' },
    ]

    for (const { path, searchPlaceholder, heading } of categories) {
      test(`search filters ${heading} results`, async ({ page }) => {
        await page.goto(path)
        const input = page.getByPlaceholder(searchPlaceholder)
        await expect(input).toBeVisible()

        await input.fill('xyzzy-nonexistent')
        const cards = page.locator(`a[href^="${path}"]`)
        await expect(cards).toHaveCount(0)

        await input.fill('')
        await expect(cards.first()).toBeVisible()
      })
    }

    test('search resets to page 1 on people', async ({ page }) => {
      await page.goto('/people')
      await page.getByRole('button', { name: 'Next' }).first().click()
      const page2Text = page.getByText(/Page 2 of/).first()
      await expect(page2Text).toBeVisible()

      const input = page.getByPlaceholder('Search for people')
      await input.fill('a')
      const page1Text = page.getByText(/Page 1 of/).first()
      await expect(page1Text).toBeVisible()
    })

    test('search results fitting one page hide pagination', async ({ page }) => {
      await page.goto('/people')
      await expect(page.getByText(/Page 1 of/).first()).toBeVisible()
      const input = page.getByPlaceholder('Search for people')
      await input.fill('skywalker')
      await expect(page.getByText(/Page 1 of/)).toHaveCount(0)
    })
  })
})
