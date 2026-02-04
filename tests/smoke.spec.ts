import { test, expect } from '@playwright/test';

test.describe('Smoke Test - Portfolio Production', () => {
  test('should load homepage and show key sections', async ({ page }) => {
    await page.goto('/');
    
    // Check main title (using more robust matching for split text)
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Arquitecto de Software');
    
    // Check key sections exist by ID
    await expect(page.locator('#hero')).toBeVisible();
    await expect(page.locator('#case-studies')).toBeVisible();
    await expect(page.locator('#tech-stack')).toBeVisible();
    await expect(page.locator('#contact')).toBeVisible();
  });

  test('should navigate to a case study', async ({ page }) => {
    await page.goto('/');
    
    // Click on the first case study link by its text
    const firstCaseStudyLink = page.locator('article').first().getByRole('link', { name: /Ver Estudio de Arquitectura/i });
    await firstCaseStudyLink.click();
    
    // Check URL change and wait for the page to load the heading
    await page.waitForURL(/\/casos\//);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });

  test('should show qualification form in contact section', async ({ page }) => {
    await page.goto('/#contact');
    
    // Verify the form is present with correct labels
    await expect(page.getByLabel('Nombre')).toBeVisible();
    await expect(page.getByLabel('Email Corporativo')).toBeVisible();
    await expect(page.getByRole('button', { name: /Verificar Disponibilidad/i })).toBeVisible();
  });
});
