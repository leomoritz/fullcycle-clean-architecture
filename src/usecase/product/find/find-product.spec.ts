import Product from "../../../domain/product/entity/product";
import ProductFactory from "../../../domain/product/factory/product.factory";
import FindProductUseCase from "./find-product.usecase";

const product = ProductFactory.create("a", "Teclado Logitech", 80) as Product;
const input = {
    id: product.id
}
const output = {
    id: product.id,
    name: product.name,
    price: product.price
}

const MockRepository = () => {
    return {
        findAll: jest.fn(),
        findById: jest.fn().mockReturnValue(Promise.resolve(product)),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe("Unit test for a find product use case", () => {

    it("should return product", async () => {
        const productRepository = MockRepository();
        const usecase = new FindProductUseCase(productRepository);

        const result = await usecase.execute(input);

        expect(result).toEqual(output);
    });

    it("should not found product", async () => {
        const productRepository = MockRepository();
        productRepository.findById.mockImplementation(() => {
            throw new Error("Product not found")
        })

        const usecase = new FindProductUseCase(productRepository);

        expect(() => {
            return usecase.execute(input);
        }).rejects.toThrow("Product not found");
    });
});