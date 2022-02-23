import APIException from "./api.exception";

export default class SlotOverbooked extends APIException {
  constructor(error = "") {
    super(409, error || "This slot is overbooked", error);
  }
}
