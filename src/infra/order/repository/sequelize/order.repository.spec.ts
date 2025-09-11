import { Sequelize } from "sequelize-typescript";
import Address from "../../../../domain/customer/value-object/address";
import ProductModel from "../../../product/repository/sequelize/product.model";
import CustomerRepository from "../../../customer/repository/sequelize/customer.repository";
import Customer from "../../../../domain/customer/entity/customer";
import ProductRepository from "../../../product/repository/sequelize/product.repository";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import Product from "../../../../domain/product/entity/product";
import OrderItemModel from "./order-item.model";
import CustomerModel from "../../../customer/repository/sequelize/customer.model";
import OrderModel from "./order.model";
import Order from "../../../../domain/checkout/entity/order";
import OrderRepository from "./order.repository";

describe("Order repository tests", () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        sequelize.addModels([CustomerModel, OrderModel, OrderItemModel, ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a new order", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("161acd1a-c46c-4da0-878c-3c5a375bb928", "John Doe");
        const address = new Address("Street 1", 123, "City", "ZipCode");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product(
            "0db6a3f0-1092-496a-80e3-9cdaa0083b76",
            "Product 1",
            100,
        );
        await productRepository.create(product);

        const orderItem = new OrderItem("932316bf-ef56-4f03-94b8-0596f6a0f7e5", "Product 1", 100, "0db6a3f0-1092-496a-80e3-9cdaa0083b76", 2);
        const order = new Order("7ceb3894-32b7-4f3b-a141-73df8f83667b", customer.id, [orderItem]);

        const orderRepository = new OrderRepository();
        await orderRepository.create(order);

        const orderModel = await OrderModel.findOne({ where: { id: order.id }, include: ["items"] }); // O include serve para trazer os dados relacionados

        expect(orderModel.toJSON()).toStrictEqual({
            id: order.id,
            customer_id: customer.id,
            total: order.total(),
            items: [
                {
                    id: orderItem.id,
                    product_id: orderItem.productId,
                    order_id: order.id,
                    name: orderItem.name,
                    price: orderItem.price,
                    quantity: orderItem.quantity,
                },
            ],
        });
    });

    it("should update an order", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("161acd1a-c46c-4da0-878c-3c5a375bb928", "John Doe");
        const address = new Address("Street 1", 123, "City", "ZipCode");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product(
            "0db6a3f0-1092-496a-80e3-9cdaa0083b76",
            "Product 1",
            100,
        );
        await productRepository.create(product);

        const orderItem = new OrderItem("932316bf-ef56-4f03-94b8-0596f6a0f7e5", "Product 1", 100, "0db6a3f0-1092-496a-80e3-9cdaa0083b76", 2);
        const order = new Order("7ceb3894-32b7-4f3b-a141-73df8f83667b", customer.id, [orderItem]);

        const orderRepository = new OrderRepository();
        await orderRepository.create(order);

        const orderCreated = await OrderModel.findOne({ where: { id: order.id }, include: ["items"] });

        expect(orderCreated.toJSON()).toStrictEqual({
            id: order.id,
            customer_id: customer.id,
            total: order.total(),
            items: [
                {
                    id: orderItem.id,
                    product_id: orderItem.productId,
                    order_id: order.id,
                    name: orderItem.name,
                    price: orderItem.price,
                    quantity: orderItem.quantity,
                },
            ],
        });


        // Update the order
        const newProduct = new Product(
            "5bb141d9-9b60-46f0-8e88-87c3068638db",
            "Product 2",
            200,
        );

        await productRepository.create(newProduct);
        const newOrderItem = new OrderItem("3655fb7e-6e29-4798-a9e1-35168495e5f3", "Product 2", 200, "5bb141d9-9b60-46f0-8e88-87c3068638db", 1);
        order.addItem(newOrderItem);

        await orderRepository.update(order);

        const orderUpdated = await OrderModel.findOne({ where: { id: order.id }, include: ["items"] });

        expect(orderUpdated.toJSON()).toStrictEqual({
            id: order.id,
            customer_id: customer.id,
            total: order.total(),
            items: [
                {
                    id: orderItem.id,
                    product_id: orderItem.productId,
                    order_id: order.id,
                    name: orderItem.name,
                    price: orderItem.price,
                    quantity: orderItem.quantity,
                },
                {
                    id: newOrderItem.id,
                    product_id: newOrderItem.productId,
                    order_id: order.id,
                    name: newOrderItem.name,
                    price: newOrderItem.price,
                    quantity: newOrderItem.quantity,
                },
            ],
        });
    });

    it("should find an order by id", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("161acd1a-c46c-4da0-878c-3c5a375bb928", "John Doe");
        const address = new Address("Street 1", 123, "City", "ZipCode");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product(
            "0db6a3f0-1092-496a-80e3-9cdaa0083b76",
            "Product 1",
            100,
        );
        await productRepository.create(product);

        const orderItem = new OrderItem("932316bf-ef56-4f03-94b8-0596f6a0f7e5", "Product 1", 100, "0db6a3f0-1092-496a-80e3-9cdaa0083b76", 2);
        const order = new Order("7ceb3894-32b7-4f3b-a141-73df8f83667b", customer.id, [orderItem]);

        const orderRepository = new OrderRepository();
        await orderRepository.create(order);

        const foundOrder = await orderRepository.findById(order.id);

        expect(foundOrder).toEqual(order);
    });

    it("should throw an error when order not found", async () => {
        const orderRepository = new OrderRepository();
        await expect(orderRepository.findById("13e99483-d307-4040-aaf8-b48978d0d7e6d"))
            .rejects.toThrow("Order with id 13e99483-d307-4040-aaf8-b48978d0d7e6d not found");
    });

    it("should find all orders", async () => {
        const customerRepository = new CustomerRepository();
        const customer1 = new Customer("161acd1a-c46c-4da0-878c-3c5a375bb928", "John Doe");
        const address1 = new Address("Street 1", 123, "City", "ZipCode");
        customer1.changeAddress(address1);
        await customerRepository.create(customer1);

        const customer2 = new Customer("2b3f4d5e-6f7g-8h9i-j0k1-l2m3n4o5p6q7", "Jane Smith");
        const address2 = new Address("Street 2", 456, "City", "ZipCode");
        customer2.changeAddress(address2);
        await customerRepository.create(customer2);

        const productRepository = new ProductRepository();
        const product = new Product(
            "0db6a3f0-1092-496a-80e3-9cdaa0083b76",
            "Product 1",
            100,
        );
        await productRepository.create(product);

        const orderItem1 = new OrderItem("932316bf-ef56-4f03-94b8-0596f6a0f7e5", "Product 1", 100, "0db6a3f0-1092-496a-80e3-9cdaa0083b76", 2);
        const order1 = new Order("7ceb3894-32b7-4f3b-a141-73df8f83667b", customer1.id, [orderItem1]);

        const orderItem2 = new OrderItem("e5aa8b5e-0bcf-400c-87a0-4281d743c1cc", "Product 1", 100, "0db6a3f0-1092-496a-80e3-9cdaa0083b76", 3);
        const order2 = new Order("3e01ac07-1e1d-4ab0-a0f5-ab386af37598", customer2.id, [orderItem2]);

        const orderRepository = new OrderRepository();
        await orderRepository.create(order1);
        await orderRepository.create(order2);

        const orders = await orderRepository.findAll();

        expect(orders).toHaveLength(2);
        expect(orders).toContainEqual(order1);
        expect(orders).toContainEqual(order2);
    });
});