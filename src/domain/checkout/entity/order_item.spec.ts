import OrderItem from "./order_item";

describe("OrderItem unit tests", () => {

    it("should throw error when id is empty", () => {
        expect(() => {
           new OrderItem("", "Item 1", 100, "9eae8f74-8d26-41d4-bd1d-28efdf462b06", 2);
        }).toThrow("Id is required");
    });

    it("should throw error when productId is empty", () => {
        expect(() => {
           new OrderItem("7f4887fb-8940-4933-8e4f-03756239e25e", "Item 1", 100, "", 2);
        }).toThrow("Product's ID is require");
    });

    it("should throw error when product's name is empty", () => {
        expect(() => {
           new OrderItem("7f4887fb-8940-4933-8e4f-03756239e25e", "", 100, "9eae8f74-8d26-41d4-bd1d-28efdf462b06", 2);
        }).toThrow("Name is required");
    });

    it("should throw error when price is less or equal zero", () => {
        expect(() => {
           new OrderItem("38ff7e54-d4e4-406c-af4d-9eb0cb902f9b", "Item 1", -1, "9eae8f74-8d26-41d4-bd1d-28efdf462b06", 2);
        }).toThrow("Price must be greater than zero");

        expect(() => {
           new OrderItem("38ff7e54-d4e4-406c-af4d-9eb0cb902f9b", "Item 1", 0, "9eae8f74-8d26-41d4-bd1d-28efdf462b06", 2);
        }).toThrow("Price must be greater than zero");
    });

    it("should throw error when quantity is less or equal zero", () => {
        expect(() => {
           new OrderItem("38ff7e54-d4e4-406c-af4d-9eb0cb902f9b", "Item 1", 100, "9eae8f74-8d26-41d4-bd1d-28efdf462b06", -1);
        }).toThrow("Item quantity must be greater than zero");

        expect(() => {
           new OrderItem("38ff7e54-d4e4-406c-af4d-9eb0cb902f9b", "Item 1", 100, "9eae8f74-8d26-41d4-bd1d-28efdf462b06", 0);
        }).toThrow("Item quantity must be greater than zero");
    });

    it("should create a new OrderItem with successfully", () => {
        expect(() => {
            new OrderItem("008f919a-9ab5-4172-99f3-98816dbcda45", "Item 1", 100, "9eae8f74-8d26-41d4-bd1d-28efdf462b06", 2);
        }).not.toThrow();
    });

    it("should calculate and return the order item total", () => {
        const item = new OrderItem("008f919a-9ab5-4172-99f3-98816dbcda45", "Item 1", 100, "9eae8f74-8d26-41d4-bd1d-28efdf462b06", 2);
        expect(item.orderItemTotal()).toBe(200);
    }
    );

    it("should return the item quantity", () => {
        const item = new OrderItem("008f919a-9ab5-4172-99f3-98816dbcda45", "Item 1", 100, "9eae8f74-8d26-41d4-bd1d-28efdf462b06", 2);
        expect(item.quantity).toBe(2);
    });

});