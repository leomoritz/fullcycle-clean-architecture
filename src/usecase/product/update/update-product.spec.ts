import Product from "../../../domain/product/entity/product";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductRepository from "../../../infra/product/repository/sequelize/product.repository";
import UpdateProductUseCase from "./update-product.usecase";

const product = ProductFactory.create("a", "Teclado e Mouse", 95) as Product;

let input = {
    id: "",
    name: "",
    price: 0,
};

beforeEach(() => {
    input = {
        id: product.id,
        name: "Teclado & Mouse Logitech",
        price: 100
    }
});

const MockRepository = () => {
    return {
        findAll: jest.fn(),
        findById: jest.fn().mockReturnValue(Promise.resolve(product)),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe("Unit test for a update product use case", () => {
    it("should update a product", async () => {
        const productRepository: ProductRepository = MockRepository();
        const usecase = new UpdateProductUseCase(productRepository);

        const output = await usecase.execute(input);

        expect(output).toEqual({
            id: input.id,
            name: input.name,
            price: input.price,
        });
    })

    it("should throw an error when name is missing", async () => {
        const productRepository: ProductRepository = MockRepository();
        const usecase = new UpdateProductUseCase(productRepository);

        input.name = "";

        await expect(usecase.execute(input)).rejects.toThrow("Name is required");
    });

    it("should throw an error when price is less than zero", async () => {
        const productRepository: ProductRepository = MockRepository();
        const usecase = new UpdateProductUseCase(productRepository);

        input.price = -10;

        await expect(usecase.execute(input)).rejects.toThrow("Price must be greater than or equal to zero");
    });

    it("should throw an error when price is zero", async () => {
        const productRepository: ProductRepository = MockRepository();
        const usecase = new UpdateProductUseCase(productRepository);

        input.price = 0;

        await expect(usecase.execute(input)).rejects.toThrow("Price must be greater than or equal to zero");
    });
});