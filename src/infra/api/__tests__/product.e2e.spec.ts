import ProductModel from '../../product/repository/sequelize/product.model';
import { app, sequelize } from '../express'
import request from "supertest"

describe("E2E test for product", () => {
    beforeEach(async () => {
        await sequelize.addModels([ProductModel]);
        await sequelize.sync({ force: true }); // força a criação do schema a cada teste
    });

    afterAll(async () => {
        await sequelize.close(); // Fecha a utilização do schema depois que todos testes finalizarem
    });

    it("should create a product", async () => {
        const response = await request(app)
            .post("/product")
            .send({
                name: "Teclado & Mouse Logitech",
                price: 100
            });

        expect(response.status).toBe(200);
        expect(response.body.id).toBeDefined();
        expect(response.body.name).toBe("Teclado & Mouse Logitech");
        expect(response.body.price).toBe(100);
    });

    it("should not create a product", async () => {
        const response = await request(app)
            .post("/product")
            .send({
                name: "Teclado & Mouse Logitech"
            });

        expect(response.status).toBe(500);
    });

    it("should list all product", async () => {
        await request(app)
            .post("/product")
            .send({
                name: "Teclado & Mouse Logitech",
                price: 100
            });

        await request(app)
            .post("/product")
            .send({
                name: "Webcam Logitech",
                price: 120
            });

        await request(app)
            .post("/product")
            .send({
                name: "Notebook Dell",
                price: 4500
            });

        const listResponse = await request(app).get("/product").send();

        expect(listResponse.status).toBe(200);
        expect(listResponse.body.products).toHaveLength(3);

        const productOne = listResponse.body.products[0];
        expect(productOne.name).toBe("Teclado & Mouse Logitech");
        expect(productOne.price).toBe(100);

        const productTwo = listResponse.body.products[1];
        expect(productTwo.name).toBe("Webcam Logitech");
        expect(productTwo.price).toBe(120);

        const productThree = listResponse.body.products[2];
        expect(productThree.name).toBe("Notebook Dell");
        expect(productThree.price).toBe(4500);
    });

});