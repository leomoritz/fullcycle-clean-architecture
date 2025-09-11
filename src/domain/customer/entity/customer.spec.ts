import Address from "../value-object/address";
import Customer from "./customer";

describe("Customer unit tests", () => {

    it("should throw error when id is empty", () => {
        expect(() => {
            new Customer("", "John Doe");
        }).toThrow("ID is required");
    });

    it("should throw error when name is empty", () => {
        expect(() => {
            new Customer("92b9630c-368c-4221-98b7-3047872052dd", "");
        }).toThrow("Name is required");
    });

    it("should change name", () => {
        const customer = new Customer("92b9630c-368c-4221-98b7-3047872052dd", "John Doe");

        customer.changeName("Jane Doe");

        expect(customer.name).toBe("Jane Doe");
    });

    it("should throw error when change name to empty", () => {
        const customer = new Customer("92b9630c-368c-4221-98b7-3047872052dd", "John Doe");
        expect(() => {
            customer.changeName("");
        }).toThrow("Name is required");
    });

    it("should change address", () => {
        const customer = new Customer("92b9630c-368c-4221-98b7-3047872052dd", "John Doe");
        const address = new Address("Main St", 123, "Anytown", "12345" );

        customer.changeAddress(address);

        expect(customer.address).toEqual(address);
    });

    it("should throw error when change address to undefined", () => {
        const customer = new Customer("92b9630c-368c-4221-98b7-3047872052dd", "John Doe");
        expect(() => {
            customer.changeAddress(undefined as any);
        }).toThrow("Invalid address");
    });

    it("should throw error when change address to null", () => {
        const customer = new Customer("92b9630c-368c-4221-98b7-3047872052dd", "John Doe");
        expect(() => {
            customer.changeAddress(null as any);
        }).toThrow("Invalid address");
    });

    it("should activate customer", () => {
        const customer = new Customer("92b9630c-368c-4221-98b7-3047872052dd", "John Doe");
        const address = new Address("Main St", 123, "Anytown", "12345" );
        customer.changeAddress(address);

        customer.activate();

        expect(customer.isActive).toBe(true);
    });

    it("should throw error when activate customer without address", () => {
        const customer = new Customer("92b9630c-368c-4221-98b7-3047872052dd", "John Doe");
        expect(() => {
            customer.activate();
        }).toThrow("Cannot activate customer without address");
    });

    it("should deactivate customer", () => {
        const customer = new Customer("92b9630c-368c-4221-98b7-3047872052dd", "John Doe");

        customer.deactivate();

        expect(customer.isActive).toBe(false);
    });

    it("should add reward points", () => {
        const customer = new Customer("92b9630c-368c-4221-98b7-3047872052dd", "John Doe");

        customer.addRewardPoints(100);
        expect(customer.rewardPoints).toBe(100);

        customer.addRewardPoints(50);
        expect(customer.rewardPoints).toBe(150);
    });

    it("should throw error when adding negative reward points", () => {
        const customer = new Customer("92b9630c-368c-4221-98b7-3047872052dd", "John Doe");

        expect(() => {
            customer.addRewardPoints(-50);
        }).toThrow("Reward points must be greater than zero");
    });

});