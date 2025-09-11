import { BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import ProductModel from "../../../product/repository/sequelize/product.model";
import OrderModel from "./order.model";

@Table({
    tableName: "order_items",
    timestamps: false,
})
export default class OrderItemModel extends Model {

    @PrimaryKey
    @Column
    declare id: string;

    @ForeignKey(() => ProductModel)
    @Column({ allowNull: false })
    declare product_id: string;

    // Meu item pertence a um produto. Útil para quando for necessário buscar o produto associado ao pedido
    // Exemplo: ao buscar um item de produto do pedido, você pode querer recuperar os detalhes do produto
    @BelongsTo(() => ProductModel)
    declare product: ProductModel;

    @ForeignKey(() => OrderModel)
    @Column({ allowNull: false })
    declare order_id: string;

    // Meu item pertence a uma ordem. Útil para quando for necessário buscar o pedido associado ao item
    // Exemplo: ao buscar um item de pedido, você pode querer recuperar os detalhes do pedido
    @BelongsTo(() => OrderModel)
    declare order: OrderModel;

    @Column({ allowNull: false })
    declare quantity: number;

    @Column({ allowNull: false })
    declare name: string;

    @Column({ allowNull: false })
    declare price: number;

}