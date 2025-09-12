// Input criado para caso futuramente seja necessário trabalhar com paginação por exemplo
export interface InputListCustomerDto {}

type Customer = {
    id: string;
    name: string;
    address: {
        street: string;
        number: number;
        zip: string;
        city: string;
    };
};

export interface OutputListCustomerDto {
    customers: Customer[];
}

