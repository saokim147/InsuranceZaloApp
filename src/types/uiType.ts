import { ClaimFormType } from "@/schema";
import { ZodType } from "zod";

export type ComboboxValue = {
  id: string;
  name: string;
  value: string;
};
export type ClaimFilter = {
  Status: string | null;
  SendFrom: string | null;
  SendTo: string | null;
};

type FieldKeys = keyof ClaimFormType;

export type FormStep = {
  title: string;
  description?: string;
  component: React.ReactElement;
  schema: ZodType<unknown>;
  fields: FieldKeys[];
};

export interface FileItemProps {
  index: number;
  remove: (index: number) => void;
  doc: {
    file: File;
  };
}

export type HospitalFilter = {
  hospitalName: string;
  cityName: string;
  isPublicHospital: boolean | null;
  inPatient: boolean | null;
  outPatient: boolean | null;
  dental: boolean | null;
  sortOrder: string;
  isBlackList: boolean;
};
