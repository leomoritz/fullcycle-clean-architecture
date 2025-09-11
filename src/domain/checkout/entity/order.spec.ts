import Order from "./order";
import OrderItem from "./order_item";

describe("Order unit tests", () => {

    it("should throw error when id is empty", () => {
        expect(() => {
            new Order("", "e7027ac8-61bb-4c23-91bb-0e2031468b55", []);
        }).toThrow("Id is required");
    });

    it("should throw error when customerId is empty", () => {
        expect(() => {
            new Order("d345fab2-9477-433e-bf83-51cc735e4304", "", []);
        }).toThrow("CustomerId is required");
    });

    it("should throw error when items is empty", () => {
        expect(() => {
            new Order("d345fab2-9477-433e-bf83-51cc735e4304", "66421d65-46ee-4381-ac21-1ef421893488", []);
        }).toThrow("Items must contain at least one item");
    });

    it("should calculate total", () => {
        const item = new OrderItem("item1", "Item 1", 100, "9eae8f74-8d26-41d4-bd1d-28efdf462b06", 2);
        const item2 = new OrderItem("item2", "Item 2", 200, "845fe427-53f7-4758-9a22-1701ba458ef0", 2);
        const item3 = new OrderItem("item3", "Item 3", 50, "d18d4c3b-7acf-46e3-b1f9-1ca8181ecd50", 3);
        const items = [item, item2, item3];

        const order = new Order("d345fab2-9477-433e-bf83-51cc735e4304", "66421d65-46ee-4381-ac21-1ef421893488", items);

        expect(order.total()).toBe(750);
    });

    it("should calculate total with diferent orders", () => {
        const item = new OrderItem("item1", "Item 1", 100, "9eae8f74-8d26-41d4-bd1d-28efdf462b06", 2);
        const item2 = new OrderItem("item2", "Item 2", 200, "845fe427-53f7-4758-9a22-1701ba458ef0", 2);
        const item3 = new OrderItem("item3", "Item 3", 50, "d18d4c3b-7acf-46e3-b1f9-1ca8181ecd50", 3);

        const order = new Order("d345fab2-9477-433e-bf83-51cc735e4304", "66421d65-46ee-4381-ac21-1ef421893488", [item, item2, item3]);
        const order2 = new Order("c6385c6b-ebd1-4301-8e0a-91aadd7b76e1", "03d165a6-fac5-4543-8d4e-5c6ca2446807", [item, item3]);
        const order3 = new Order("52949160-ded6-4377-a79e-1ebfabd8a9656", "f2d43b43-df6d-4691-9e59-26f8e5a00d63", [item2]);

        expect(order.total()).toBe(750);
        expect(order2.total()).toBe(350);
        expect(order3.total()).toBe(400);
    });

});