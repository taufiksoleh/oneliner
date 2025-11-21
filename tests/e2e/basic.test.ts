import { test, expect } from '@playwright/test'

test.describe('Oneliner App', () => {
  test('should load the homepage', async ({ page }) => {
    await page.goto('/oneliner/')
    await expect(page.locator('h1')).toContainText('Oneliner')
  })

  test('should switch between tabs', async ({ page }) => {
    await page.goto('/oneliner/')

    // Click CSS tab
    await page.click('text=CSS')
    await expect(page.locator('.tab.active')).toContainText('CSS')

    // Click JavaScript tab
    await page.click('text=JavaScript')
    await expect(page.locator('.tab.active')).toContainText('JavaScript')
  })

  test('should minify HTML', async ({ page }) => {
    await page.goto('/oneliner/')

    // Input HTML
    const htmlInput = page.locator('#htmlInput')
    await htmlInput.fill('<div>  <p>  Hello  </p>  </div>')

    // Click minify button
    await page.click('text=Minify HTML')

    // Check output
    const htmlOutput = page.locator('#htmlOutput')
    const output = await htmlOutput.inputValue()
    expect(output.length).toBeGreaterThan(0)
    expect(output.length).toBeLessThan(35) // Minified should be shorter
  })

  test('should toggle dark mode', async ({ page }) => {
    await page.goto('/oneliner/')

    // Click dark mode toggle
    await page.click('.dark-mode-toggle')

    // Check if body has dark-mode class
    const body = page.locator('body')
    await expect(body).toHaveClass(/dark-mode/)
  })

  test('should clear editor fields', async ({ page }) => {
    await page.goto('/oneliner/')

    // Input HTML
    const htmlInput = page.locator('#htmlInput')
    await htmlInput.fill('<div>Test</div>')

    // Click clear button
    await page.click('text=Clear All')

    // Check if input is empty
    const inputValue = await htmlInput.inputValue()
    expect(inputValue).toBe('')
  })

  test('should show notification on minify', async ({ page }) => {
    await page.goto('/oneliner/')

    // Input HTML
    const htmlInput = page.locator('#htmlInput')
    await htmlInput.fill('<div>Test</div>')

    // Click minify button
    await page.click('text=Minify HTML')

    // Wait for notification to appear
    const notification = page.locator('#notification')
    await expect(notification).toHaveClass(/show/)
  })

  test('should encode Base64 text', async ({ page }) => {
    await page.goto('/oneliner/')

    // Click Base64 tab
    await page.click('text=Base64')

    // Input text
    const textInput = page.locator('#base64TextInput')
    await textInput.fill('Hello World')

    // Click encode button
    await page.click('text=Encode to Base64')

    // Check output
    const textOutput = page.locator('#base64TextOutput')
    const output = await textOutput.inputValue()
    expect(output).toBe('SGVsbG8gV29ybGQ=')
  })
})
