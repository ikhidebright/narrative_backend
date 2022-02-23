import APIException from "./api.exception";

export default class IntegrityError extends APIException {
  constructor(message = "The data is in an invalid state") {
    super(409, message);
  }
}
