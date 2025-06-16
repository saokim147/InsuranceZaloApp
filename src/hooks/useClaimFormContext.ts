import { MultiStepFormContext } from "@/context/context";
import { useContext } from "react";

export default function useMutliStepFormContext() {
  const claimForm = useContext(MultiStepFormContext);
  if (claimForm === undefined) {
    throw new Error(
      "useMutliStepFormContext must be used with MultiStepFormContext"
    );
  }
  return claimForm;
}
