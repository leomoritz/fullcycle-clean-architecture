import { Sequelize } from "sequelize-typescript";
import ProductModel from "./product.model";
import ProductRepository from "./product.repository";
import Product from "../../../../domain/product/entity/product";

describe("Product repository tests", () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a product", async () => {
        const productRepository = new ProductRepository();
        const product = new Product(
            "8f6839aa-19e6-49ab-a0fd-2122c7da6c98",
            "Mouse Logitech",
            100
        );

        productRepository.create(product);

        const productModel = await ProductModel.findByPk(product.id);

        expect(productModel.id).toBe("8f6839aa-19e6-49ab-a0fd-2122c7da6c98");
        expect(productModel.name).toBe("Mouse Logitech");
        expect(productModel.price).toBe(100);
    })

    it("should update a product", async () => {
        const productRepository = new ProductRepository();
        const product = new Product(
            "8f6839aa-19e6-49ab-a0fd-2122c7da6c98",
            "Mouse Logitech",
            100
        );

        await productRepository.create(product);

        const productModelCreated = await ProductModel.findByPk(product.id);

        expect(productModelCreated.id).toBe("8f6839aa-19e6-49ab-a0fd-2122c7da6c98");
        expect(productModelCreated.name).toBe("Mouse Logitech");
        expect(productModelCreated.price).toBe(100);

        product.changeName("Mouse Logitech MX");
        product.changePrice(150);

        await productRepository.update(product);

        const productModelUpdated = await ProductModel.findByPk(product.id);

        expect(productModelUpdated.id).toBe("8f6839aa-19e6-49ab-a0fd-2122c7da6c98");
        expect(productModelUpdated.name).toBe("Mouse Logitech MX");
        expect(productModelUpdated.price).toBe(150);
    });

    it("should find a product by id", async () => {
        const productRepository = new ProductRepository();
        const product = new Product(
            "8f6839aa-19e6-49ab-a0fd-2122c7da6c98",
            "Mouse Logitech",
            100
        );

        await productRepository.create(product);

        const foundProduct = await productRepository.findById(product.id);

        expect(foundProduct.id).toBe("8f6839aa-19e6-49ab-a0fd-2122c7da6c98");
        expect(foundProduct.name).toBe("Mouse Logitech");
        expect(foundProduct.price).toBe(100);
    });

    it("should find all products", async () => {
        const productRepository = new ProductRepository();
        const product1 = new Product(
            "8f6839aa-19e6-49ab-a0fd-2122c7da6c98",
            "Mouse Logitech",
            100
        );
        const product2 = new Product(
            "42b8a14b-3ea5-4bb1-ba64-c8884ee443f4",
            "Keyboard Logitech",
            150
        );

        await productRepository.create(product1);
        await productRepository.create(product2);

        const foundProducts = await productRepository.findAll();

        expect(foundProducts.length).toBe(2);
        expect(foundProducts).toEqual([product1, product2]);
    });

});