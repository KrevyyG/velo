import { test, expect } from "@playwright/test";
import { gerarCodigoPedido, consultarPedido, validarBadge } from "../support/helpers";

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
    const order = {
      number: "VLO-ZET8T5",
      status: "APROVADO",
      color: "Lunar White",
      wheelType: "aero Wheels",
      customerName: "Guilherme Oliveira Souza",
      customerEmail: "guilherme@velo.dev",
    }

    // Act
    await consultarPedido(page, order.number)

    // Assert
    await expect(page.getByTestId(`order-result-${order.number}`)).toMatchAriaSnapshot(`
      - img
      - paragraph: Pedido
      - paragraph: ${order.number}
      - status:
        - img
        - text: ${order.status}
      `)

    await expect(page.getByTestId(`order-result-${order.number}`)).toMatchAriaSnapshot(`
      - img "Velô Sprint"
      - paragraph: Modelo
      - paragraph: Velô Sprint
      - paragraph: Cor
      - paragraph: ${order.color}
      - paragraph: Interior
      - paragraph: cream
      - paragraph: Rodas
      - paragraph: ${order.wheelType}
      - heading "Dados do Cliente" [level=4]
      - paragraph: Nome
      - paragraph: ${order.customerName}
      - paragraph: Email
      - paragraph: ${order.customerEmail}
      - paragraph: Loja de Retirada
      - paragraph
      - paragraph: Data do Pedido
      - paragraph: /\\d+\\/\\d+\\/\\d+/
      - heading "Pagamento" [level=4]
      - paragraph: À Vista
      - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
      `)

    await validarBadge(page, order.status, /bg-green-100 text-green-700/, /lucide-circle-check-big/)
  })

  test("deve consultar um pedido reprovado", async ({ page }) => {
    //Test Data
    const order = {
      number: "VLO-74KCR9",
      status: "REPROVADO",
      color: "Midnight Black",
      wheelType: "sport Wheels",
      customerName: "Steeve Jobs",
      customerEmail: "jobs@apple.com",
    }

    // Act
    await consultarPedido(page, order.number)

    // Assert
    await expect(page.getByTestId(`order-result-${order.number}`)).toMatchAriaSnapshot(`
      - img
      - paragraph: Pedido
      - paragraph: ${order.number}
      - status:
        - img
        - text: ${order.status}
      `)

    await expect(page.getByTestId(`order-result-${order.number}`)).toMatchAriaSnapshot(`
      - img "Velô Sprint"
      - paragraph: Modelo
      - paragraph: Velô Sprint
      - paragraph: Cor
      - paragraph: ${order.color}
      - paragraph: Interior
      - paragraph: cream
      - paragraph: Rodas
      - paragraph: ${order.wheelType}
      - heading "Dados do Cliente" [level=4]
      - paragraph: Nome
      - paragraph: ${order.customerName}
      - paragraph: Email
      - paragraph: ${order.customerEmail}
      - paragraph: Loja de Retirada
      - paragraph
      - paragraph: Data do Pedido
      - paragraph: /\\d+\\/\\d+\\/\\d+/
      - heading "Pagamento" [level=4]
      - paragraph: À Vista
      - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
      `)

    await validarBadge(page, order.status, /bg-red-100 text-red-700/, /lucide-circle-x/)
  })

  test("deve consultar um pedido em análise", async ({ page }) => {
    //Test Data
    const order = {
      number: "VLO-AWGCM4",
      status: "EM ANÁLISE",
      color: "Lunar White",
      wheelType: "aero Wheels",
      customerName: "João da Silva",
      customerEmail: "joao@silva.com",
    }

    // Act
    await consultarPedido(page, order.number)

    // Assert
    await expect(page.getByTestId(`order-result-${order.number}`)).toMatchAriaSnapshot(`
      - img
      - paragraph: Pedido
      - paragraph: ${order.number}
      - status:
        - img
        - text: EM ANÁLISE
      `)

    await expect(page.getByTestId(`order-result-${order.number}`)).toMatchAriaSnapshot(`
      - img "Velô Sprint"
      - paragraph: Modelo
      - paragraph: Velô Sprint
      - paragraph: Cor
      - paragraph: ${order.color}
      - paragraph: Interior
      - paragraph: cream
      - paragraph: Rodas
      - paragraph: ${order.wheelType}
      - heading "Dados do Cliente" [level=4]
      - paragraph: Nome
      - paragraph: ${order.customerName}
      - paragraph: Email
      - paragraph: ${order.customerEmail}
      - paragraph: Loja de Retirada
      - paragraph
      - paragraph: Data do Pedido
      - paragraph: /\\d+\\/\\d+\\/\\d+/
      - heading "Pagamento" [level=4]
      - paragraph: À Vista
      - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
      `)

    await validarBadge(page, order.status, /bg-amber-100 text-amber-700/, /lucide-clock/)
  })

  test("deve consultar um pedido inexistente", async ({ page }) => {
    //Test Data
    const order = gerarCodigoPedido("VLO")

    // Act
    await consultarPedido(page, order)

    // Assert
    await expect(page.locator('#root')).toMatchAriaSnapshot(`
      - img
      - heading "Pedido não encontrado" [level=3]
      - paragraph: Verifique o número do pedido e tente novamente
      `)
  })
})