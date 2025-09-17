import Entity from "../../@shared/entity/entity.abstract";
import ProductValidatorFactory from "../factory/product.validator.factory";
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
        ProductValidatorFactory
        .create()
        .validate(this);
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