import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";
import Address from "../../../domain/customer/value-object/address";
import { InputUpdateCustomerDto, OutputUpdateCustomerDto } from "./update-customer.dto";

export default class UpdateCustomerUseCase {
    private customerRepository: CustomerRepositoryInterface;

    constructor(customerRepository: CustomerRepositoryInterface) {
        this.customerRepository = customerRepository;
    }

    async execute(input: InputUpdateCustomerDto): Promise<OutputUpdateCustomerDto> {
        const customer = await this.customerRepository.findById(input.id);
        const addressDto = input.address;
        customer.changeName(input.name);
        customer.changeAddress(new Address(
            addressDto.street,
            addressDto.number,
            addressDto.city,
            addressDto.zip
        ));

        await this.customerRepository.update(customer);
        
        const customerAddress = customer.address;
        return {
            id: customer.id,
            name: customer.name,
            address: {
                street: customerAddress.street,
                number: customerAddress.number,
                city: customerAddress.city,
                zip: customerAddress.zipCode,
            },
        }
    }
}