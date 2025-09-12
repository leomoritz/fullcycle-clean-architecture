import { Sequelize } from "sequelize-typescript";
import CreateProductUseCase from "./create-product.usecase";
import ProductModel from "../../../infra/product/repository/sequelize/product.model";
import ProductRepository from "../../../infra/product/repository/sequelize/product.repository";

beforeEach(() => {

});

describe("Integration test for a create customer use case", () => {
    let sequelize: Sequelize;
    let input = {
        name: "",
        price: 0,
    };

    beforeEach(async () => {
        input = {
            name: "Teclado & Mouse Logitech",
            price: 100
        }

        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        await sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a customer", async () => {
        const productRepository = new ProductRepository();
        const usecase = new CreateProductUseCase(productRepository);

        const output = await usecase.execute(input);

        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            price: input.price,
        });
    })

    it("should throw an error when name is missing", async () => {
        const productRepository = new ProductRepository();
        const usecase = new CreateProductUseCase(productRepository);

        input.name = "";

        await expect(usecase.execute(input)).rejects.toThrow("Name is required");
    });

    it("should throw an error when price is less than zero", async () => {
        const productRepository = new ProductRepository();
        const usecase = new CreateProductUseCase(productRepository);

        input.price = -10;

        await expect(usecase.execute(input)).rejects.toThrow("Price must be greater than or equal to zero");
    });

    it("should throw an error when price is zero", async () => {
        const productRepository = new ProductRepository();
        const usecase = new CreateProductUseCase(productRepository);

        input.price = 0;

        await expect(usecase.execute(input)).rejects.toThrow("Price must be greater than or equal to zero");
    });
});