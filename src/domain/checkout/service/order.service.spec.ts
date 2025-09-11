import Customer from "../../customer/entity/customer";
import Order from "../entity/order";
import OrderItem from "../entity/order_item";
import OrderService from "./order.service";

describe("Order service unit tests", () => {

    it("should place an order", () => {
        const customer1 = new Customer("fc059c8e-7cba-4b62-a36f-076ede66a22d", "John Doe");
        const item1 = new OrderItem("8fa1a063-3ab8-4799-b786-42fce7aad870", "Mouse Logitech", 100, "444d90ad-ae9d-4b30-9466-90a87842ace5", 1);

        const order = OrderService.placeOrder(customer1, [item1]);

        expect(customer1.rewardPoints).toBe(50);
        expect(order.total()).toBe(100);
    });
    
    it("should get total of all orders", () => {
        const orderItem1 = new OrderItem("8fa1a063-3ab8-4799-b786-42fce7aad870", "Mouse Logitech", 100, "444d90ad-ae9d-4b30-9466-90a87842ace5", 1);
        const orderItem2 = new OrderItem("896d74cc-3285-4cea-8f96-7aae7808f8da", "Keyboard Logitech", 200, "444d90ad-ae9d-4b30-9466-90a87842ace5", 1);

        const order1 = new Order("444d90ad-ae9d-4b30-9466-90a87842ace5", "95c8bc39-7d6c-4f46-b9b9-fd0e50ce24bd", [orderItem1]);
        const order2 = new Order("555d90ad-ae9d-4b30-9466-90a87842ace5", "4cd73813-4a52-4f02-9cb7-d5a3eaa9ab36", [orderItem2]);

        const total = OrderService.total([order1, order2]);

        expect(total).toBe(300);
    })

});