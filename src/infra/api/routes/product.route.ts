import express, { Request, Response } from 'express'
import CreateProductUseCase from '../../../usecase/product/create/create-product.usecase';
import ProductRepository from '../../product/repository/sequelize/product.repository';
import ListProductUseCase from '../../../usecase/product/list/list-product.usecase';
import { InputCreateProductDto, OutputCreateProductDto } from '../../../usecase/product/create/create-product.dto';
import { OutputListProductDto } from '../../../usecase/product/list/list-product.dto';

export const productRouter = express.Router();
const productRepository = new ProductRepository();

productRouter.post("/", async (request: Request, response: Response) => {
    const usecase = new CreateProductUseCase(productRepository);
    try {
        const productDto = {
            name: request.body.name,
            price: request.body.price
        } as InputCreateProductDto;
        const output = await usecase.execute(productDto) as OutputCreateProductDto;
        response.send(output);
    } catch (err) {
        response.status(500).send(err);
    }
});

productRouter.get("/", async (request: Request, response: Response) => {
    const usecase = new ListProductUseCase(productRepository);
    try {
        const output = await usecase.execute() as OutputListProductDto;
        response.send(output);
    } catch (err) {
        response.status(500).send(err);
    }
})