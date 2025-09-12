import CreateProductUseCase from "./create-product.usecase";

let input = {
    name: "",
    price: 0,
};

beforeEach(() => {
    input = {
        name: "Teclado & Mouse Logitech",
        price: 100
    }
});

const MockRepository = () => {
    return {
        findAll: jest.fn(),
        findById: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe("Unit test for a create customer use case", () => {
    it("should create a customer", async () => {
        const productRepository = MockRepository();
        const usecase = new CreateProductUseCase(productRepository);

        const output = await usecase.execute(input);

        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            price: input.price,
        });
    })

    it("should throw an error when name is missing", async () => {
        const productRepository = MockRepository();
        const usecase = new CreateProductUseCase(productRepository);

        input.name = "";

        await expect(usecase.execute(input)).rejects.toThrow("Name is required");
    });

    it("should throw an error when price is less than zero", async () => {
        const productRepository = MockRepository();
        const usecase = new CreateProductUseCase(productRepository);

        input.price = -10;

        await expect(usecase.execute(input)).rejects.toThrow("Price must be greater than or equal to zero");
    });

    it("should throw an error when price is zero", async () => {
        const productRepository = MockRepository();
        const usecase = new CreateProductUseCase(productRepository);

        input.price = 0;

        await expect(usecase.execute(input)).rejects.toThrow("Price must be greater than or equal to zero");
    });
});