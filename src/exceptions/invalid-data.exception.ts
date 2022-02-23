import APIException from "./api.exception";

export default class InvalidData extends APIException {
  constructor(error = "") {
    super(400, error || "The data you passed is invalid", error);
  }
}
