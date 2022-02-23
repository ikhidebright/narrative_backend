import APIException from "./api.exception";

export default class SlotUnavailable extends APIException {
  constructor(error = "") {
    super(409, error || "This slot is no longer available for booking", error);
  }
}
