import EventInterface from "./event.interface";

export default interface EventHandlerInterface<T extends EventInterface=EventInterface> { // O =EventInterface significa que por padrão o tipo T será EventInterface, mas pode ser substituído por outro tipo que estenda EventInterface
    handle(event: T): void;
}