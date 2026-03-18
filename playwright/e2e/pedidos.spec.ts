import { test, expect } from "@playwright/test";
import { gerarCodigoPedido } from "../support/helpers";

///AAA - Arrange, Act, Assert

test.describe("Consultar Pedido", () => {
  test.beforeEach(async ({ page }) => {
    // Arrange
    await page.goto("http://localhost:5173/")
    await expect(page.getByTestId("hero-section").getByRole("heading")).toContainText("Velô Sprint")
    await page.getByRole("link", { name: "Consultar Pedido" }).click()
    await expect(page.getByRole("heading")).toContainText("Consultar Pedido")
  })

  test("deve consultar um pedido aprovado", async ({ page }) => {
    //Test Data
    const order = "VLO-ZET8T5"

    // Act
    await page.getByTestId("search-order-id").fill(order)
    await page.getByRole('button', { name: 'Buscar Pedido' }).click()

    // Assert
    await expect(page.getByTestId(`order-result-${order}`)).toMatchAriaSnapshot(`
      - img
      - paragraph: Pedido
      - paragraph: ${order}
      - img
      - text: APROVADO
      `)

    await expect(page.getByTestId(`order-result-${order}`)).toMatchAriaSnapshot(`
      - img "Velô Sprint"
      - paragraph: Modelo
      - paragraph: Velô Sprint
      - paragraph: Cor
      - paragraph: Lunar White
      - paragraph: Interior
      - paragraph: cream
      - paragraph: Rodas
      - paragraph: aero Wheels
      - heading "Dados do Cliente" [level=4]
      - paragraph: Nome
      - paragraph: Guilherme Oliveira Souza
      - paragraph: Email
      - paragraph: guilherme@velo.dev
      - paragraph: Loja de Retirada
      - paragraph
      - paragraph: Data do Pedido
      - paragraph: /\\d+\\/\\d+\\/\\d+/
      - heading "Pagamento" [level=4]
      - paragraph: À Vista
      - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
      `)
  })

  test("deve consultar um pedido inexistente", async ({ page }) => {
    //Test Data
    const order = gerarCodigoPedido("VLO")

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
})