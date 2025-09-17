import Product from "./product";

describe("Product unit tests", () => {

    it("should throw error when id is empty", () => {
        expect(() => {
            new Product("", "Product 1", 100);
        }).toThrow("product: Id is required");
    });

    it("should throw error when name is empty", () => {
        expect(() => {
            new Product("a4a62a37-b9fa-482d-844f-c99e9195d7a3", "", 100);
        }).toThrow("product: Name is required");
    });

    it("should throw error when name is empty", () => {
        expect(() => {
            new Product("a4a62a37-b9fa-482d-844f-c99e9195d7a3", "", 100);
        }).toThrow("product: Name is required");
    });

    it("should throw error when price is less than zero", () => {
        expect(() => {
            new Product("a4a62a37-b9fa-482d-844f-c99e9195d7a3", "Product 1", -1);
        }).toThrow("product: Price must be greater than or equal to zero");
    });

    it("should throw error when id and name is empty and price is less than zero", () => {
        expect(() => {
            new Product("", "", -1);
        }).toThrow("product: Id is required, product: Name is required, product: Price must be greater than or equal to zero");
    });

    it("should throw error when change name to empty", () => {
        const product = new Product("a4a62a37-b9fa-482d-844f-c99e9195d7a3", "Product 1", 100);
        expect(() => {
            product.changeName("");
        }
        ).toThrow("product: Name is required");
    });

    it("should change name", () => {
        const product = new Product("a4a62a37-b9fa-482d-844f-c99e9195d7a3", "Product 1", 100);
        product.changeName("Product 2");
        expect(product.name).toBe("Product 2");
    });

    it("should change price", () => {
        const product = new Product("a4a62a37-b9fa-482d-844f-c99e9195d7a3", "Product 1", 100);
        product.changePrice(200);
        expect(product.price).toBe(200);
    });

    it("should throw error when change price to less than zero", () => {
        const product = new Product("a4a62a37-b9fa-482d-844f-c99e9195d7a3", "Product 1", 100);
        expect(() => {
            product.changePrice(-1);
        }).toThrow("product: Price must be greater than or equal to zero");
    });

});