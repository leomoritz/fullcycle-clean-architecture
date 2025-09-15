import Product from "../../../domain/product/entity/product";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ListProductUseCase from "./list-product.usecase";

const productOne = ProductFactory.create("a", "Teclado Logitech", 80) as Product;
const productTwo = ProductFactory.create("a", "Mouse Logitech", 30) as Product;

const MockRepository = () => {
    return {
        findAll: jest.fn().mockReturnValue(Promise.resolve([productOne, productTwo])),
        findById: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe("Unit test for a listing products use case", () => {
    it("should list products", async() => {
        const productRepository = MockRepository();
        const usecase = new ListProductUseCase(productRepository);

        const output = await usecase.execute();

        expect(output.products).toHaveLength(2);

        const outputProductOne = output.products[0];
        expect(outputProductOne.id).toBe(productOne.id);
        expect(outputProductOne.name).toBe(productOne.name);
        expect(outputProductOne.price).toBe(productOne.price);

        const outputProductTwo = output.products[1];
        expect(outputProductTwo.id).toBe(productTwo.id);
        expect(outputProductTwo.name).toBe(productTwo.name);
        expect(outputProductTwo.price).toBe(productTwo.price);
    });

    it("should return empty list", async() => {
        const productRepository = MockRepository();
        productRepository.findAll.mockReturnValue(Promise.resolve([]));
        const usecase = new ListProductUseCase(productRepository);

        const output = await usecase.execute();

        expect(output.products).toHaveLength(0);
    });
});