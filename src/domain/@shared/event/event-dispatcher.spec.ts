import CustomerAddressChangedEvent from "../../customer/event/customer-address-changed.event";
import CustomerCreatedEvent from "../../customer/event/customer-created.event";
import SendConsoleLogWhenAddressChangedHandler from "../../customer/event/handler/send-console-log-when-address-changed.handler";
import SendFirstConsoleLogWhenCustomerIsCreatedHandler from "../../customer/event/handler/send-first-console-log-when-customer-is-created.handler";
import SendSecondConsoleLogWhenCustomerIsCreatedHandler from "../../customer/event/handler/send-second-console-log-when-customer-is-created.handler";
import SendEmailWhenProductIsCreatedHandler from "../../product/event/handler/send-email-when-product-is-created.handler";
import ProductCreatedEvent from "../../product/event/product-created.event";
import EventDispatcher from "./event-dispatcher";

describe("Domain events tests", () => {

    it("should register an event handler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();
        const customerCreatedHandler1 = new SendFirstConsoleLogWhenCustomerIsCreatedHandler();
        const customerCreatedHandler2 = new SendSecondConsoleLogWhenCustomerIsCreatedHandler();
        const customerAddressChangeHandler = new SendConsoleLogWhenAddressChangedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);
        eventDispatcher.register("CustomerCreatedEvent", customerCreatedHandler1);
        eventDispatcher.register("CustomerCreatedEvent", customerCreatedHandler2);
        eventDispatcher.register("CustomerAddressChangedEvent", customerAddressChangeHandler);

        expect(eventDispatcher.getEventHandlers("ProductCreatedEvent")).toBeDefined();
        expect(eventDispatcher.getEventHandlers("ProductCreatedEvent").length).toBe(1);
        expect(eventDispatcher.getEventHandlers("ProductCreatedEvent")[0]).toMatchObject(eventHandler);

        expect(eventDispatcher.getEventHandlers("CustomerCreatedEvent")).toBeDefined();
        expect(eventDispatcher.getEventHandlers("CustomerCreatedEvent").length).toBe(2);
        expect(eventDispatcher.getEventHandlers("CustomerCreatedEvent")[0]).toMatchObject(customerCreatedHandler1);
        expect(eventDispatcher.getEventHandlers("CustomerCreatedEvent")[1]).toMatchObject(customerCreatedHandler2);

        expect(eventDispatcher.getEventHandlers("CustomerAddressChangedEvent")).toBeDefined();
        expect(eventDispatcher.getEventHandlers("CustomerAddressChangedEvent").length).toBe(1);
        expect(eventDispatcher.getEventHandlers("CustomerAddressChangedEvent")[0]).toMatchObject(customerAddressChangeHandler);
    });

    it("should unregister an event handler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();
        const customerCreatedHandler1 = new SendFirstConsoleLogWhenCustomerIsCreatedHandler();
        const customerCreatedHandler2 = new SendSecondConsoleLogWhenCustomerIsCreatedHandler();
        const customerAddressChangeHandler = new SendConsoleLogWhenAddressChangedHandler();

        // Registrando os eventos
        eventDispatcher.register("ProductCreatedEvent", eventHandler);
        eventDispatcher.register("CustomerCreatedEvent", customerCreatedHandler1);
        eventDispatcher.register("CustomerCreatedEvent", customerCreatedHandler2);
        eventDispatcher.register("CustomerAddressChangedEvent", customerAddressChangeHandler);

        expect(eventDispatcher.getEventHandlers("ProductCreatedEvent")[0]).toMatchObject(eventHandler);
        expect(eventDispatcher.getEventHandlers("CustomerCreatedEvent")[0]).toMatchObject(customerCreatedHandler1);
        expect(eventDispatcher.getEventHandlers("CustomerCreatedEvent")[1]).toMatchObject(customerCreatedHandler2);
        expect(eventDispatcher.getEventHandlers("CustomerAddressChangedEvent")[0]).toMatchObject(customerAddressChangeHandler);

        // Removendo o registro dos eventos
        eventDispatcher.unregister("ProductCreatedEvent", eventHandler);
        expect(eventDispatcher.getEventHandlers("ProductCreatedEvent").length).toBe(0);

        eventDispatcher.unregister("CustomerCreatedEvent", customerCreatedHandler1);
        expect(eventDispatcher.getEventHandlers("CustomerCreatedEvent").length).toBe(1); // Deve restar apenas o customerCreatedHandler2
        expect(eventDispatcher.getEventHandlers("CustomerCreatedEvent")[0]).toMatchObject(customerCreatedHandler2);

        eventDispatcher.unregister("CustomerCreatedEvent", customerCreatedHandler2);
        expect(eventDispatcher.getEventHandlers("CustomerCreatedEvent").length).toBe(0);

        eventDispatcher.unregister("CustomerAddressChangedEvent", customerAddressChangeHandler);
        expect(eventDispatcher.getEventHandlers("CustomerAddressChangedEvent").length).toBe(0);
    }
    );

    it("should unregister all event handlers", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();
        const customerCreatedHandler1 = new SendFirstConsoleLogWhenCustomerIsCreatedHandler();
        const customerCreatedHandler2 = new SendSecondConsoleLogWhenCustomerIsCreatedHandler();
        const customerAddressChangeHandler = new SendConsoleLogWhenAddressChangedHandler();

        // Registrando os eventos
        eventDispatcher.register("ProductCreatedEvent", eventHandler);
        eventDispatcher.register("CustomerCreatedEvent", customerCreatedHandler1);
        eventDispatcher.register("CustomerCreatedEvent", customerCreatedHandler2);
        eventDispatcher.register("CustomerAddressChangedEvent", customerAddressChangeHandler);

        expect(eventDispatcher.getEventHandlers("ProductCreatedEvent")[0]).toMatchObject(eventHandler);
        expect(eventDispatcher.getEventHandlers("CustomerCreatedEvent")[0]).toMatchObject(customerCreatedHandler1);
        expect(eventDispatcher.getEventHandlers("CustomerCreatedEvent")[1]).toMatchObject(customerCreatedHandler2);
        expect(eventDispatcher.getEventHandlers("CustomerAddressChangedEvent")[0]).toMatchObject(customerAddressChangeHandler);

        // Removendo o registro de todos os eventos
        eventDispatcher.unregisterAll();
        expect(eventDispatcher.getEventHandlers("ProductCreatedEvent")[0]).toBeUndefined();
        expect(eventDispatcher.getEventHandlers("ProductCreatedEvent").length).toBe(0);
        expect(eventDispatcher.getEventHandlers("CustomerCreatedEvent")[0]).toBeUndefined();
        expect(eventDispatcher.getEventHandlers("CustomerCreatedEvent")[1]).toBeUndefined();
        expect(eventDispatcher.getEventHandlers("CustomerCreatedEvent").length).toBe(0);
        expect(eventDispatcher.getEventHandlers("CustomerAddressChangedEvent")[0]).toBeUndefined();
        expect(eventDispatcher.getEventHandlers("CustomerAddressChangedEvent").length).toBe(0);
    });

    it("should notify all event handlers", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();
        const spyHandle = jest.spyOn(eventHandler, "handle");

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers("ProductCreatedEvent")[0]).toMatchObject(eventHandler);

        const productCreatedEvent = new ProductCreatedEvent({
            name: "Mouse Logitech",
            description: "Mouse sem fio",
            price: 100.0,
        });

        // Quando o notify for executado o SendEmailWhenProductIsCreatedHandler.handle() deve ser chamado
        eventDispatcher.notify(productCreatedEvent);
        expect(spyHandle).toHaveBeenCalledWith(productCreatedEvent);
    });

    it("should notify all event handlers for CustomerCreatedEvent", () => {
        const eventDispatcher = new EventDispatcher();
        const customerCreatedHandler1 = new SendFirstConsoleLogWhenCustomerIsCreatedHandler();
        const customerCreatedHandler2 = new SendSecondConsoleLogWhenCustomerIsCreatedHandler();
        const spyHandle1 = jest.spyOn(customerCreatedHandler1, "handle");
        const spyHandle2 = jest.spyOn(customerCreatedHandler2, "handle");

        eventDispatcher.register("CustomerCreatedEvent", customerCreatedHandler1);
        eventDispatcher.register("CustomerCreatedEvent", customerCreatedHandler2);

        expect(eventDispatcher.getEventHandlers("CustomerCreatedEvent")[0]).toMatchObject(customerCreatedHandler1);
        expect(eventDispatcher.getEventHandlers("CustomerCreatedEvent")[1]).toMatchObject(customerCreatedHandler2);

        const customerCreatedEvent = new CustomerCreatedEvent({
            eventData: {
                customerId: "28e503c8-bdda-4371-8d41-e84eb6082957",
                customerName: "John Doe",
                customerAddress: "123 Main St, Springfield, USA",
            },
            dateTimeOccurred: new Date(),
        });

        // Quando o notify for executado o SendFirstConsoleLogWhenCustomerIsCreated.handle() e SendSecondConsoleLogWhenCustomerIsCreated.handle() devem ser chamados
        eventDispatcher.notify(customerCreatedEvent);
        expect(spyHandle1).toHaveBeenCalledWith(customerCreatedEvent);
        expect(spyHandle2).toHaveBeenCalledWith(customerCreatedEvent);
    });

    it("should notify event handlers for CustomerAddressChangedEvent", () => {
        const eventDispatcher = new EventDispatcher();
        const customerAddressChangeHandler = new SendConsoleLogWhenAddressChangedHandler();
        const spyHandle = jest.spyOn(customerAddressChangeHandler, "handle");

        eventDispatcher.register("CustomerAddressChangedEvent", customerAddressChangeHandler);

        expect(eventDispatcher.getEventHandlers("CustomerAddressChangedEvent")[0]).toMatchObject(customerAddressChangeHandler);

        const customerAddressChangedEvent = new CustomerAddressChangedEvent({
            customerId: "28e503c8-bdda-4371-8d41-e84eb6082957",
            customerName: "John Doe",
            customerAddress: "123 Main St, Springfield, USA",
            dateTimeOccurred: new Date(),
        });

        // Quando o notify for executado o SendConsoleLogWhenAddressChanged.handle() deve ser chamado
        eventDispatcher.notify(customerAddressChangedEvent);
        expect(spyHandle).toHaveBeenCalledWith(customerAddressChangedEvent);
    });

});