import APIException from "./api.exception";

export default class DoesNotExist extends APIException {
  constructor(error = "") {
    super(404, error || "Resource does not exist", error);
  }
}
