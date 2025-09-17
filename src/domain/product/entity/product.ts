import Entity from "../../@shared/entity/entity.abstract";
import ProductInterface from "./product.interface";

export default class Product extends Entity implements ProductInterface {

    private _name: string;
    private _price: number;

    constructor(id: string, name: string, price: number) {
        super();
        this._id = id;
        this._name = name;
        this._price = price;
        this.validate();
        this.throwNotificationErrorIfHasErrors();
    }

    protected getClassName(): string {
        return "product";
    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get price(): number {
        return this._price;
    }

    validate() {
        if (!this._id) {
            this.addError("Id is required");
        }

        if (!this._name) {
            this.addError("Name is required");
        }

        if (this._price <= 0) {
            this.addError("Price must be greater than or equal to zero");
        }
    }

    changeName(name: string) {
        this._name = name;
        this.validate();
        this.throwNotificationErrorIfHasErrors();
    }

    changePrice(price: number) {
        this._price = price;
        this.validate();
        this.throwNotificationErrorIfHasErrors();
    }

}