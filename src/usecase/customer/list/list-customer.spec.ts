import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import ListCustomerUseCase from "./list-customer.usecase";

const customerOne = CustomerFactory.createWithAddress(
    "John Doe",
    new Address("Street 1", 1, "City", "Zip")
);

const customerTwo = CustomerFactory.createWithAddress(
    "Jane Doe",
    new Address("Street 2", 2, "Other City", "Other Zip")
);

const MockRepository = () => {
    return {
        create: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve([customerOne, customerTwo])),
        findById: jest.fn(),
        update: jest.fn(),
    }
}

describe("Unit test for listing customer use case", () => {
    it("should list a customer", async () => {
        const customerRepository = MockRepository();
        const usecase = new ListCustomerUseCase(customerRepository);

        const output = await usecase.execute();

        expect(output.customers).toHaveLength(2);

        const outputCustomerOne = output.customers[0];
        const outputAddressOne = output.customers[0].address;

        expect(outputCustomerOne.id).toBe(customerOne.id);
        expect(outputCustomerOne.name).toBe(customerOne.name);
        expect(outputAddressOne.street).toBe(customerOne.address.street);
        expect(outputAddressOne.number).toBe(customerOne.address.number);
        expect(outputAddressOne.city).toBe(customerOne.address.city);
        expect(outputAddressOne.zip).toBe(customerOne.address.zipCode);


        const outputCustomerTwo = output.customers[1];
        const outputAddressTwo = output.customers[1].address;

        expect(outputCustomerTwo.id).toBe(customerTwo.id);
        expect(outputCustomerTwo.name).toBe(customerTwo.name);
        expect(outputAddressTwo.street).toBe(customerTwo.address.street);
        expect(outputAddressTwo.number).toBe(customerTwo.address.number);
        expect(outputAddressTwo.city).toBe(customerTwo.address.city);
        expect(outputAddressTwo.zip).toBe(customerTwo.address.zipCode);
    });

    it("should return a empty list when no have customers in repository", async () => {
        const customerRepository = MockRepository();
        customerRepository.findAll.mockReturnValue(Promise.resolve([]));

        const usecase = new ListCustomerUseCase(customerRepository);

        const output = await usecase.execute();

        expect(output.customers).toHaveLength(0);
    });

    it("should throw an error when the repository fails", async () => {
        const customerRepository = MockRepository();
        customerRepository.findAll.mockImplementation(
            () => {
                throw new Error("An error occurred while accessing the database");
            }
        );

        const usecase = new ListCustomerUseCase(customerRepository);

        expect(() => {
            return usecase.execute();
        }).rejects.toThrow("An error occurred while accessing the databas");
    });
});