import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infra/product/repository/sequelize/product.model";
import ProductRepository from "../../../infra/product/repository/sequelize/product.repository";
import FindProductUseCase from "./find-product.usecase";

describe("Unit test for a find product use case", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
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

    it("should return product", async () => {
        const productRepository = new ProductRepository();
        const productOne = new Product("f791f273-7aa5-40fb-99dd-9c56a32d616d", "Teclado Logitech", 80)
        const productTwo = new Product("9785177a-83e1-4178-a670-33e8571d96d3", "Mouse Logitech", 30)
        productRepository.create(productOne);
        productRepository.create(productTwo);

        const usecase = new FindProductUseCase(productRepository);

        const input = {
            id: productOne.id
        }

        const result = await usecase.execute(input);

        expect(result).toEqual({
            id: productOne.id,
            name: productOne.name,
            price: productOne.price
        });
    });
});