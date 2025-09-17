import Notification from "./notification";

describe("Unit tests for notifications", () => {
    it("should create errors", () => {
        const notification = new Notification();
        
        const customerError = {
            message: "error message",
            context: "customer"
        }

        notification.addError(customerError);

        expect(notification.messages("customer")).toBe("customer: error message")

        const otherCustomerError = {
            message: "other error message",
            context: "customer"
        }

        notification.addError(otherCustomerError);

        expect(notification.messages("customer")).toBe("customer: error message, customer: other error message");

        const orderError = {
            message: "error message",
            context: "order"
        }

        notification.addError(orderError);

        expect(notification.messages("order")).toBe("order: error message");
        expect(notification.messages("customer")).toBe("customer: error message, customer: other error message");
        expect(notification.messages()).toBe("customer: error message, customer: other error message, order: error message");
        expect(notification.messages(null)).toBe("customer: error message, customer: other error message, order: error message");
        expect(notification.messages("")).toBe("customer: error message, customer: other error message, order: error message");
    });

    it("should check if notification has at least one error", () => {
        const notification = new Notification();
        
        const customerError = {
            message: "error message",
            context: "customer"
        }

        notification.addError(customerError);

        expect(notification.hasErrors()).toBe(true)
    });

    it("should get all errors props", () => {
        const notification = new Notification();
        
        const customerError = {
            message: "error message",
            context: "customer"
        }

        notification.addError(customerError);

        expect(notification.getErrors()).toEqual([customerError]);
    });
});