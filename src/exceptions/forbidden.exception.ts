import APIException from "./api.exception";

export default class Forbidden extends APIException {
  constructor(error = "") {
    super(403, error || "You are not authorized to perform this action", error);
  }
}
