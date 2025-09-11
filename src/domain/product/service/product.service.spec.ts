import Product from "../entity/product";
import ProductService from "./product.service";

describe("Product service unit tests", () => {

    it("should change the prices of all products", () => {
        const product1 = new Product("8fa1a063-3ab8-4799-b786-42fce7aad870", "Mouse Logitech", 100);
        const product2 = new Product("896d74cc-3285-4cea-8f96-7aae7808f8da", "Keyboard Logitech", 200);
        const products = [product1, product2];

        ProductService.increasePrice(products, 100);

        expect(product1.price).toBe(200);
        expect(product2.price).toBe(400);
    })
}
);