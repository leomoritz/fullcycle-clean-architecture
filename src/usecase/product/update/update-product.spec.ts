import Product from "../../../domain/product/entity/product";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductRepository from "../../../infra/product/repository/sequelize/product.repository";
import { InputUpdateProductDto } from "./update-product.dto";
import UpdateProductUseCase from "./update-product.usecase";

describe("Unit test for a update product use case", () => {
    let product = {} as Product;
    let input = {} as InputUpdateProductDto;
    let MockRepository = () => {
        return {
            findAll: jest.fn(),
            findById: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
        }
    }

    beforeEach(async () => {
        product = ProductFactory.create("a", "Teclado e Mouse", 95) as Product;

        MockRepository = () => {
            return {
                findAll: jest.fn(),
                findById: jest.fn().mockReturnValue(Promise.resolve(product)), // simula o retorno de findById
                create: jest.fn(),
                update: jest.fn(),
            }
        }

        input = {
            id: product.id,
            name: "Teclado & Mouse Logitech",
            price: 100
        }
    });

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

        await expect(usecase.execute(input)).rejects.toThrow("product: Name is required");
    });

    it("should throw an error when price is less than zero", async () => {
        const productRepository: ProductRepository = MockRepository();
        const usecase = new UpdateProductUseCase(productRepository);

        input.price = -10;

        await expect(usecase.execute(input)).rejects.toThrow("product: Price must be greater than or equal to zero");
    });

    it("should throw an error when price is zero", async () => {
        const productRepository: ProductRepository = MockRepository();
        const usecase = new UpdateProductUseCase(productRepository);

        input.price = 0;

        await expect(usecase.execute(input)).rejects.toThrow("product: Price must be greater than or equal to zero");
    });
});