import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infra/product/repository/sequelize/product.model";
import ProductRepository from "../../../infra/product/repository/sequelize/product.repository";
import UpdateProductUseCase from "./update-product.usecase";
import ProductFactory from "../../../domain/product/factory/product.factory";
import Product from "../../../domain/product/entity/product";

beforeEach(() => {

});

describe("Integration test for a update product use case", () => {
    let sequelize: Sequelize;
    let input = {
        id: "",
        name: "",
        price: 0,
    };

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        await sequelize.addModels([ProductModel]);
        await sequelize.sync();

        const productRepository = new ProductRepository();
        const product = ProductFactory.create("a", "Teclado e Mouse", 95) as Product;
        productRepository.create(product)

        input = {
            id: product.id,
            name: "Teclado & Mouse Logitech",
            price: 100,
        }
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should update a product", async () => {
        const productRepository = new ProductRepository();
        const usecase = new UpdateProductUseCase(productRepository);

        const output = await usecase.execute(input);

        expect(output).toEqual({
            id: input.id,
            name: input.name,
            price: input.price,
        });
    })

    it("should throw an error when name is missing", async () => {
        const productRepository = new ProductRepository();
        const usecase = new UpdateProductUseCase(productRepository);

        input.name = "";

        await expect(usecase.execute(input)).rejects.toThrow("Name is required");
    });

    it("should throw an error when price is less than zero", async () => {
        const productRepository = new ProductRepository();
        const usecase = new UpdateProductUseCase(productRepository);

        input.price = -10;

        await expect(usecase.execute(input)).rejects.toThrow("Price must be greater than or equal to zero");
    });

    it("should throw an error when price is zero", async () => {
        const productRepository = new ProductRepository();
        const usecase = new UpdateProductUseCase(productRepository);

        input.price = 0;

        await expect(usecase.execute(input)).rejects.toThrow("Price must be greater than or equal to zero");
    });
});