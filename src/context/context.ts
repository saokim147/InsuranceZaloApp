import { FormStep } from "@/types/uiType";
import { createContext } from "react";

export interface MultiStepFormContextProps {
  currentStep: FormStep;
  currentStepIndex: number;
  isFirstStep: boolean;
  isLastStep: boolean;
  next: () => void;
  prev: () => void;
  steps: FormStep[];
}

export const MultiStepFormContext = createContext<
  MultiStepFormContextProps | undefined
>(undefined);
