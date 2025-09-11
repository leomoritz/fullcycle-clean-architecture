import Order from "../../../../domain/checkout/entity/order";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import OrderRepositoryInterface from "../../../../domain/checkout/repository/order-repository.interface";
import OrderItemModel from "./order-item.model";
import OrderModel from "./order.model";

export default class OrderRepository implements OrderRepositoryInterface {

    async create(entity: Order): Promise<void> {
        await OrderModel.create(
            {
                id: entity.id,
                customer_id: entity.customerId,
                total: entity.total(),
                items: entity.items.map((item) => ({
                    id: item.id,
                    product_id: item.productId,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity
                })),
            },
            {
                include: [{ model: OrderItemModel }], // Para incluir os itens do pedido junto com o pedido
            });
    }

    async update(entity: Order): Promise<void> {
        await OrderModel.update(
            {
                total: entity.total(),
            },
            {
                where: { id: entity.id },
            }
        );

        await OrderItemModel.bulkCreate(
            entity.items.map((item) => ({
                id: item.id,
                product_id: item.productId,
                order_id: entity.id,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
            })),
            {
                updateOnDuplicate: ["name", "price", "quantity"], // Atualiza os campos se já existirem
            }
        );
    }

    async findById(id: string): Promise<Order> {
        let foundOrder;

        try {
            foundOrder = await OrderModel.findOne({
                where: { id },
                include: [{ model: OrderItemModel }],
                rejectOnEmpty: true,
            });
        } catch (error) {
            throw new Error(`Order with id ${id} not found`);
        }

        return new Order(
            foundOrder.id,
            foundOrder.customer_id,
            foundOrder.items.map((item) => (new OrderItem(
                item.id,
                item.name,
                item.price,
                item.product_id,
                item.quantity
            ))),
        );
    }

    async findAll(): Promise<Order[]> {
        const orderModels = await OrderModel.findAll({
            include: [{ model: OrderItemModel }],
        });

        return orderModels.map((orderModel) => {
            return new Order(
                orderModel.id,
                orderModel.customer_id,
                orderModel.items.map((item) => (new OrderItem(
                    item.id,
                    item.name,
                    item.price,
                    item.product_id,
                    item.quantity
                ))),
            );
        });
    }

}