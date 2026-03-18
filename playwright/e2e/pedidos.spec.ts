import { test, expect } from "@playwright/test";

///AAA - Arrange, Act, Assert

test("deve consultar um pedido aprovado", async ({ page }) => {
  //Test Data
  const order = "VLO-ZET8T5"

  // Arrange
  await page.goto("http://localhost:5173/")
  await expect(page.getByTestId("hero-section").getByRole("heading")).toContainText("Velô Sprint")
  await page.getByRole("link", { name: "Consultar Pedido" }).click()
  await expect(page.getByRole("heading")).toContainText("Consultar Pedido")
  
  // Act
  await page.getByTestId("search-order-id").fill(order)
  await page.getByRole('button', { name: 'Buscar Pedido' }).click()

  // Assert
  const orderCode = page.locator(`//p[text()="Pedido"]/..//p[text()="${order}"]`)
  await expect(orderCode).toBeVisible()
  await expect(page.locator('//div[text()="APROVADO"]')).toBeVisible()
})

test("deve consultar um pedido inexistente", async ({ page }) => {
  //Test Data
  const order = "ABC-DEF1G2"

  // Arrange
  await page.goto("http://localhost:5173/")
  await expect(page.getByTestId("hero-section").getByRole("heading")).toContainText("Velô Sprint")
  await page.getByRole("link", { name: "Consultar Pedido" }).click()
  await expect(page.getByRole("heading")).toContainText("Consultar Pedido")
  
  // Act
  await page.getByTestId("search-order-id").fill(order)
  await page.getByRole('button', { name: 'Buscar Pedido' }).click()

  // Assert
  // await expect(page.getByRole('heading', {name: "Pedido não encontrado"})).toBeVisible()
  // await expect(page.locator('p', {hasText: "Verifique o número do pedido e tente novamente"})).toBeVisible()
  await expect(page.locator('#root')).toMatchAriaSnapshot(`
    - img
    - heading "Pedido não encontrado" [level=3]
    - paragraph: Verifique o número do pedido e tente novamente
    `)
})
