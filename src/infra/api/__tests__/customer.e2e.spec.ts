import { app, sequelize } from '../express'
import request from "supertest"

describe("E2E test for customer", () => {
    beforeEach(async () => {
        await sequelize.sync({ force: true }); // força a criação do schema a cada teste
    });

    afterAll(async () => {
        await sequelize.close(); // Fecha a utilização do schema depois que todos testes finalizarem
    });

    it("should create a customer", async () => {
        const response = await request(app)
            .post("/customer")
            .send({
                name: "John Doe",
                address: {
                    street: "Street",
                    city: "City",
                    number: 123,
                    zip: "12345"
                }
            });

        expect(response.status).toBe(200);
        expect(response.body.name).toBe("John Doe");
        expect(response.body.address.street).toBe("Street");
        expect(response.body.address.city).toBe("City");
        expect(response.body.address.number).toBe(123);
        expect(response.body.address.zip).toBe("12345");
    });

    it("should not create a customer", async () => {
        const response = await request(app)
            .post("/customer")
            .send({
                name: "john"
            });

            expect(response.status).toBe(500);
    });

    it("should list all customer", async () => {
        await request(app)
            .post("/customer")
            .send({
                name: "John Doe",
                address: {
                    street: "Street",
                    city: "City",
                    number: 123,
                    zip: "12345"
                }
            });

        await request(app)
            .post("/customer")
            .send({
                name: "Jane Doe",
                address: {
                    street: "Street 2",
                    city: "City 2",
                    number: 321,
                    zip: "54321"
                }
            });

        const listResponse = await request(app).get("/customer").send();
        
        expect(listResponse.status).toBe(200);
        expect(listResponse.body.customers).toHaveLength(2);

        const customerOne = listResponse.body.customers[0];
        expect(customerOne.name).toBe("John Doe");
        expect(customerOne.address.street).toBe("Street");
        expect(customerOne.address.city).toBe("City");
        expect(customerOne.address.number).toBe(123);
        expect(customerOne.address.zip).toBe("12345");

        const customerTwo = listResponse.body.customers[1];
        expect(customerTwo.name).toBe("Jane Doe");
        expect(customerTwo.address.street).toBe("Street 2");
        expect(customerTwo.address.city).toBe("City 2");
        expect(customerTwo.address.number).toBe(321);
        expect(customerTwo.address.zip).toBe("54321");
    });

});