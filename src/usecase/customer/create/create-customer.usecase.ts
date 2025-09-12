import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";
import Address from "../../../domain/customer/value-object/address";
import { InputCreateCustomerDto, OutputCreateCustomerDto } from "./create-customer.dto";

export default class CreateCustomerUseCase {
    private customerRepository: CustomerRepositoryInterface;

    constructor(customerRepository: CustomerRepositoryInterface) {
        this.customerRepository = customerRepository;
    }

    async execute(input: InputCreateCustomerDto): Promise<OutputCreateCustomerDto> {
        const addressDto = input.address;
        const address = new Address(addressDto.street, addressDto.number, addressDto.city, addressDto.zip);
        const customer = CustomerFactory.createWithAddress(input.name, address);

        await this.customerRepository.create(customer);
        
        return {
            id: customer.id,
            name: customer.name,
            address: {
                street: address.street,
                number: address.number,
                city: address.city,
                zip: address.zipCode,
            },
        };
    }
}