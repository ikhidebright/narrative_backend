import APIException from "./api.exception";

export default class RemoteError extends APIException {
  constructor(error = "") {
    super(500, error || "There was an error querying remote resource", error);
  }
}
