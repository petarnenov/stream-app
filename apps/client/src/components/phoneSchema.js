import Joi from 'joi';

const phoneSchema = Joi.object({
	rowData: Joi.array().items(
		Joi.object({
            id: Joi.string().required(),
            brand: Joi.string().required(),
            model: Joi.string().required(),
            price: Joi.number().required()
        })
    ).required(),
	removePhone: Joi.function().required()
})

export default phoneSchema;
