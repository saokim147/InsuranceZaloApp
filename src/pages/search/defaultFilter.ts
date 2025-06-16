import { HospitalFilter } from "@/types/uiType";

export const DEFAULT_HOSPITAL_FILTER: HospitalFilter = {
  hospitalName: "",
  cityName: "",
  isPublicHospital: null,
  inPatient: null,
  outPatient: null,
  dental: null,
  sortOrder: "default",
  isBlackList: false,
};
