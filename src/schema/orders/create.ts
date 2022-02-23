import Joi from "joi";
import { AppValidator } from "../validator";

const createOderData = {
  name: Joi.string().required(),
  max_bid_price: Joi.string().required(),
  data_package_type: Joi.string()
    .valid("Device Location", "Device Behavior", "ID Mapping")
    .required(),
};

export const createOrder = AppValidator.body(Joi.object(createOderData));
