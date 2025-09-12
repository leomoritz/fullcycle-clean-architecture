import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";
import { InputFindCustomerDto, OutputFindCustomerDto } from "./find-customer.dto";

export default class FindCustomerUseCase {
    private customerRepository: CustomerRepositoryInterface;

    constructor(customerRepository: CustomerRepositoryInterface) {
        this.customerRepository = customerRepository;
    }

    async execute(input: InputFindCustomerDto): Promise<OutputFindCustomerDto> {
        const customer = await this.customerRepository.findById(input.id);
        const address = customer.address;

        return {
            id: customer.id,
            name: customer.name,
            address: {
                street: address.street,
                city: address.city,
                number: address.number,
                zip: address.zipCode
            }
        }
    }
}