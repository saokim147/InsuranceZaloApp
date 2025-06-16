import { Status } from "@/types/systemType";

export function isDeleteable(status: Status) {
  return status === "NE";
}

export function isEditable(status: Status) {
  return status === "A";
}
