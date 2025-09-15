// Input criado para caso futuramente seja necessário trabalhar com paginação por exemplo
export interface InputListProductDto {}

type Product = {
    id: string;
    name: string;
    price: number;
}

export interface OutputListProductDto {
    products: Product[];
}