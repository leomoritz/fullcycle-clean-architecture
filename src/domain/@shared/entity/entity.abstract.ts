import Notification from "../notification/notification";
import NotificationError from "../notification/notification.error";

export default abstract class Entity {
    protected _id: string;
    protected notification: Notification;

    constructor() {
        this.notification = new Notification();
    }

    addError(errorMessage: string) {
        this.notification.addError({
            context: this.getClassName(),
            message: errorMessage,
        })
    }

    protected throwNotificationErrorIfHasErrors() {
        if (this.notification.hasErrors()) {
            throw new NotificationError(this.notification.getErrors());
        }
    }

    protected abstract getClassName(): string;

}