import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../infra/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infra/customer/repository/sequelize/customer.repository";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import FindCustomerUseCase from "./find-customer.usecase";

describe("Test find customer use case", () => {
    let sequelize: Sequelize;
    
        beforeEach(async () => {
            sequelize = new Sequelize({
                dialect: "sqlite",
                storage: ":memory:",
                logging: false,
                sync: { force: true },
            });
    
            await sequelize.addModels([CustomerModel]);
            await sequelize.sync();
        });
    
        afterEach(async () => {
            await sequelize.close();
        });

        it("should find a customer", async () => {
            const customerRepository = new CustomerRepository();
            const usecase = new FindCustomerUseCase(customerRepository);
            const customer = new Customer("5eb6a572-610c-439c-a022-23e9ea8296e6", "John Doe");
            const address = new Address("Street", 123, "City", "Zip")
            customer.changeAddress(address);
            await customerRepository.create(customer);

            const input = {
                id: "5eb6a572-610c-439c-a022-23e9ea8296e6"
            }

            const output = {
                id: "5eb6a572-610c-439c-a022-23e9ea8296e6",
                name: "John Doe",
                address: {
                    street: "Street",
                    city: "City",
                    number: 123,
                    zip: "Zip",
                }
            }

            const result = await usecase.execute(input);

            expect(result).toEqual(output);
        });

});