import ValidatorInterface from "../../@shared/validator/validator.interface";
import Product from "../entity/product";
import * as yup from "yup";

export default class ProductYupValidator implements ValidatorInterface<Product> {

    validate(entity: Product): void {
        try {
            yup.object()
                .shape(
                    {
                        id: yup.string().required("Id is required"),
                        name: yup.string().required("Name is required"),
                        price: yup.number().positive("Price must be greater than or equal to zero")

                    }
                ).validateSync(
                    {
                        id: entity.id,
                        name: entity.name,
                        price: entity.price
                    },
                    {
                        abortEarly: false, // pra não abortar no primeiro erro que encontrar
                    }
                );
        } catch (errors) {
            const e = errors as yup.ValidationError;
            e.errors.forEach((error) => {
                entity.addError(error);
            });
        }
    }

}