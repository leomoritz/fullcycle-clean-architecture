import EventDispatcherInterface from "./event-dispatcher.interface";
import EventHandlerInterface from "./event-handler.interface";
import EventInterface from "./event.interface";

export default class EventDispatcher implements EventDispatcherInterface {
    
    eventHandlers: { [eventName: string]: EventHandlerInterface<EventInterface>[]; } = {};

    notify(event: EventInterface): void {
        const eventName = event.constructor.name;
        
        if(!this.eventHandlers[eventName] || this.eventHandlers[eventName].length === 0) {
            return;
        }

        this.eventHandlers[eventName].forEach(eventHandler => {
            eventHandler.handle(event);
        });
    }

    register(eventName: string, eventHandler: EventHandlerInterface): void {
        if(!this.eventHandlers[eventName]) {
            this.eventHandlers[eventName] = [];
        }
        this.eventHandlers[eventName].push(eventHandler);
    }

    unregister(eventName: string, eventHandler: EventHandlerInterface): void {
        if(!this.eventHandlers[eventName]) {
            return;
        }
        this.eventHandlers[eventName] = this.eventHandlers[eventName].filter(handler => handler !== eventHandler);
        if(this.eventHandlers[eventName].length === 0) {
            delete this.eventHandlers[eventName];
        }
    }

    unregisterAll(): void {
        this.eventHandlers = {};
    }

    getEventHandlers(eventName: string): EventHandlerInterface[] {
        return this.eventHandlers[eventName] || [];
    }
}