import EventHandlerInterface from "./event-handler.interface";
import EventInterface from "./event.interface";

export default interface EventDispatcherInterface {

    eventHandlers: { [eventName: string]: EventHandlerInterface[] };

    notify(event: EventInterface): void;
    register(eventName: string, eventHandler: EventHandlerInterface): void;
    unregister(eventName: string, eventHandler: EventHandlerInterface): void;
    unregisterAll(): void;
    getEventHandlers(eventName: string): EventHandlerInterface[];
}