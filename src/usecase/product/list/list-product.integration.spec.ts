import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ListProductUseCase from "./list-product.usecase";
import ProductModel from "../../../infra/product/repository/sequelize/product.model";
import ProductRepository from "../../../infra/product/repository/sequelize/product.repository";

describe("Unit test for a listing products use case", () => {
    let sequelize: Sequelize;
    const productRepository = new ProductRepository();

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
    it("should list products", async () => {
        const productOne = ProductFactory.create("a", "Teclado Logitech", 80) as Product;
        const productTwo = ProductFactory.create("a", "Mouse Logitech", 30) as Product;
        productRepository.create(productOne);
        productRepository.create(productTwo);

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

    it("should return empty list", async () => {
        const usecase = new ListProductUseCase(productRepository);

        const output = await usecase.execute();

        expect(output.products).toHaveLength(0);
    });
});