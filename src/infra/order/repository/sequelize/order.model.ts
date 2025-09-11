import { BelongsTo, Column, ForeignKey, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import CustomerModel from "../../../customer/repository/sequelize/customer.model";
import OrderItemModel from "./order-item.model";

@Table({
    tableName: "orders",
    timestamps: false,
})
export default class OrderModel extends Model {

    @PrimaryKey
    @Column
    declare id: string;

    @ForeignKey(() => CustomerModel)
    @Column({ allowNull: false })
    declare customer_id: string;

    // Minha ordem possui um cliente. Útil para quando for necessário buscar o cliente associado ao pedido
    // Exemplo: ao buscar um pedido, você pode querer incluir os detalhes do cliente
    @BelongsTo(() => CustomerModel)
    declare customer: CustomerModel;

    // Minha ordem possui muitos itens
    @HasMany(() => OrderItemModel)
    declare items: OrderItemModel[];

    @Column({ allowNull: false })
    declare total: number;

}