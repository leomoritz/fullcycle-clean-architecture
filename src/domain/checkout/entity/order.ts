import OrderItem from "./order_item";

export default class Order {

    private _id: string;
    private _customerId: string;
    private _items: OrderItem[];
    private _total: number;

    constructor(id: string, customerId: string, items: OrderItem[] = []) {
        this._id = id;
        this._customerId = customerId;
        this._items = items;
        this.validate();
        this._total = this.total();
    }

    get id(): string {
        return this._id;
    }

    get customerId(): string {
        return this._customerId;
    }

    get items(): OrderItem[] {
        return this._items;
    }

    validate() {
        if (!this._id) {
            throw new Error("Id is required");
        }

        if (!this._customerId) {
            throw new Error("CustomerId is required");
        }
        
        if (this._items.length === 0) {
            throw new Error("Items must contain at least one item");
        }
    }

    addItem(item: OrderItem) {
        this._items.push(item);
    }

    total() {
        this._total = this._items.reduce((acc, item) => acc + item.orderItemTotal(), 0);
        return this._total;
    }
}