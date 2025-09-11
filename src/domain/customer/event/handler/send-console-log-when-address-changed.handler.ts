import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import CustomerAddressChangedEvent from "../customer-address-changed.event";

export default class SendConsoleLogWhenAddressChangedHandler implements EventHandlerInterface<CustomerAddressChangedEvent> {
    handle(event: CustomerAddressChangedEvent): void {
        const customerId = event.eventData.customerId;
        const customerName = event.eventData.customerName;
        const customerAddress = event.eventData.customerAddress;
        console.log(`Endereço do cliente: ${customerId}, ${customerName} alterado para: ${customerAddress}`);
    }
}