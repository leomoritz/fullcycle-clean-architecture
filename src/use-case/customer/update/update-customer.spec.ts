import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import UpdateCustomerUseCase from "./update-customer.usecase";

const customer = CustomerFactory.createWithAddress(
    "John",
    new Address("Street", 123, "City", "Zip")
)

const input = {
    id: customer.id, // com o ID do registro já existente
    name: "John Doe", // nome atualizado
    address: {
        street: "Street updated", // atualizado
        number: 1234, // atualizado
        city: "City updated", // atualizado
        zip: "Zip updated", // atualizado
    }
}

const MockRepository = () => {
    return {
        create: jest.fn(),
        findAll: jest.fn(),
        findById: jest.fn().mockReturnValue(Promise.resolve(customer)), // simula o retorno do customer já existente
        update: jest.fn(),
    }
}

describe("Unit test for customer update use case", () => {
    it("should update a customer", async () => {
        const customerRepository = MockRepository();
        const customerUpdateUseCase = new UpdateCustomerUseCase(customerRepository);

        const output = await customerUpdateUseCase.execute(input);

        expect(output).toEqual(input);
    });

    it("should not find a customer", async () => {
        const customerRepository = MockRepository();
        customerRepository.findById.mockImplementation(
            () => {
                throw new Error("Customer not found");
            }
        );

        const usecase = new UpdateCustomerUseCase(customerRepository);

        input.id = "b434ad18-deda-4e32-aa9c-1ed8fef1fb80"

        expect(() => {
            return usecase.execute(input);
        }).rejects.toThrow("Customer not found");
    });

    it("should throw an error when name is missing", async () => {
        const customerRepository = MockRepository();
        const customerUpdateUseCase = new UpdateCustomerUseCase(customerRepository);

        input.name = "",

        await expect(customerUpdateUseCase.execute(input)).rejects.toThrow("Name is required");
    });

    it("should throw an error when street is missing", async () => {
        const customerRepository = MockRepository();
        const customerUpdateUseCase = new UpdateCustomerUseCase(customerRepository);

        input.name = "John Doe"
        input.address.street = "",

        await expect(customerUpdateUseCase.execute(input)).rejects.toThrow("Street is required");
    });
})