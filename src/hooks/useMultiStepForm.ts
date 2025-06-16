import { MultiStepFormContextProps } from "@/context/context";
import { ClaimFormType } from "@/schema";
import { FormStep } from "@/types/uiType";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";

export function useMultiStepForm(
  steps: FormStep[],
  methods: UseFormReturn<ClaimFormType>
): MultiStepFormContextProps {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const currentStep = steps[currentStepIndex];
  const next = async () => {
    const isValid = await methods.trigger(currentStep.fields, {
      shouldFocus: true,
    });
    if (!isValid) {
      return;
    }
    const formValues = methods.getValues();
    const currentStepValues = currentStep.fields.reduce((acc, field) => {
      acc[field] = formValues[field];
      return acc;
    }, {} as Record<string, any>);
    if (currentStep.schema) {
      const validationResult = currentStep.schema.safeParse(currentStepValues);
      if (!validationResult.success) {
        validationResult.error.issues.forEach((err) => {
          methods.setError(err.path[0] as keyof ClaimFormType, {
            type: "manual",
            message: err.message,
          });
        });
        return;
      }
    }

    setCurrentStepIndex((prev) => {
      if (prev >= steps.length - 1) {
        return prev;
      }
      return prev + 1;
    });
  };
  const prev = () => {
    setCurrentStepIndex((prev) => {
      if (prev <= 0) {
        return prev;
      }
      return prev - 1;
    });
  };
  return {
    currentStep: steps[currentStepIndex],
    currentStepIndex,
    isFirstStep: currentStepIndex === 0,
    isLastStep: currentStepIndex === steps.length - 1,
    next,
    prev,
    steps,
  };
}
