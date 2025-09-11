import { Sequelize } from "sequelize-typescript";
import CustomerModel from "./customer.model";
import Customer from "../../../../domain/customer/entity/customer";
import Address from "../../../../domain/customer/value-object/address";
import CustomerRepository from "./customer.repository";

describe("Customer repository tests", () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        sequelize.addModels([CustomerModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a customer", async () => {
        const customer = new Customer(
            "8f6839aa-19e6-49ab-a0fd-2122c7da6c98",
            "John Doe",
        );

        const address = new Address(
            "123 Main St",
            123,
            "Springfield",
            "62701"
        );

        customer.changeAddress(address);

        const customerRepository = new CustomerRepository();
        customerRepository.create(customer);

        const customerModel = await CustomerModel.findByPk(customer.id);

        expect(customerModel.toJSON()).toStrictEqual({
            id: customer.id,
            name: customer.name,
            active: customer.isActive,
            rewardPoints: customer.rewardPoints,
            street: address.street,
            number: address.number,
            zipcode: address.zipCode,
            city: address.city,
        });
    })

    it("should update a customer", async () => {
        const customer = new Customer(
            "8f6839aa-19e6-49ab-a0fd-2122c7da6c98",
            "John Doe",
        );

        const address = new Address(
            "123 Main St",
            123,
            "Springfield",
            "62701"
        );

        customer.changeAddress(address);

        const customerRepository = new CustomerRepository();
        customerRepository.create(customer);

        customer.changeName("John Doe Smith");
        customer.changeAddress(
            new Address(
                "456 Elm St",
                456,
                "Springfield",
                "62702"
            )
        );

        await customerRepository.update(customer);

        const customerModel = await CustomerModel.findByPk(customer.id);

        expect(customerModel.toJSON()).toStrictEqual({
            id: customer.id,
            name: customer.name,
            active: customer.isActive,
            rewardPoints: customer.rewardPoints,
            street: "456 Elm St",
            number: 456,
            zipcode: "62702",
            city: "Springfield",
        });
    });

    it("should find a customer by id", async () => {
        const customer = new Customer(
            "8f6839aa-19e6-49ab-a0fd-2122c7da6c98",
            "John Doe",
        );

        const address = new Address(
            "123 Main St",
            123,
            "Springfield",
            "62701"
        );

        customer.changeAddress(address);

        const customerRepository = new CustomerRepository();
        customerRepository.create(customer);

        const foundCustomer = await customerRepository.findById(customer.id);

        expect(foundCustomer).toStrictEqual(customer);
    });

    it("should throw an error when customer not found", async () => {
        const customerRepository = new CustomerRepository();

        await expect(customerRepository.findById("8f6839aa-19e6-49ab-a0fd-2122c7da6c98"))
            .rejects.toThrow("Customer with id 8f6839aa-19e6-49ab-a0fd-2122c7da6c98 not found"); // rejects serve para verificar se a promise foi rejeitada devido a ser uma chamada assíncrona
    });

    it("should find all customers", async () => {
        const customerRepository = new CustomerRepository();

        const address = new Address(
            "123 Main St",
            123,
            "Springfield",
            "62701"
        );

        const customer1 = new Customer(
            "8f6839aa-19e6-49ab-a0fd-2122c7da6c98",
            "John Doe",
        );

        customer1.changeAddress(address);

        const customer2 = new Customer(
            "8f6839aa-19e6-49ab-a0fd-2122c7da6c99",
            "Jane Doe",
        );

        customer2.changeAddress(address);


        await customerRepository.create(customer1);
        await customerRepository.create(customer2);

        const foundCustomers = await customerRepository.findAll();

        expect(foundCustomers.length).toBe(2);
        expect(foundCustomers).toEqual([customer1, customer2]);
    });

});