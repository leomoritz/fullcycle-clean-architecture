import express, { Request, Response } from 'express'
import CreateCustomerUseCase from '../../../usecase/customer/create/create-customer.usecase';
import CustomerRepository from '../../customer/repository/sequelize/customer.repository';
import ListCustomerUseCase from '../../../usecase/customer/list/list-customer.usecase';

export const customerRoute = express.Router();

customerRoute.post("/", async (request: Request, response: Response) => {
    const usecase = new CreateCustomerUseCase(new CustomerRepository());
    try {
        const customerDto = {
            name: request.body.name,
            address: {
                street: request.body.address.street,
                city: request.body.address.city,
                number: request.body.address.number,
                zip: request.body.address.zip,
            },
        }
        const output = await usecase.execute(customerDto);
        response.send(output);
    } catch (err) {
        response.status(500).send(err);
    }
});

customerRoute.get("/", async (request: Request, response: Response) => {
    const usecase = new ListCustomerUseCase(new CustomerRepository());
    try {
        const output = await usecase.execute();
        response.send(output);
    } catch (err) {
        response.status(500).send(err);
    }
});