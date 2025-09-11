import Address from "../value-object/address";
import CustomerFactory from "./customer.factory";

describe("Customer factory unit test", () => {

    it("should create a customer", () => {
        const customer = CustomerFactory.create("John");

        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("John");
        expect(customer.address).toBeUndefined();

    });

    it("should create a customer with an address", () => {
        const address = new Address("123 Main St", 22, "Cityville", "12345-250");
        const customer = CustomerFactory.createWithAddress("John", address);

        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("John");
        expect(customer.address).toBe(address);
    });

});