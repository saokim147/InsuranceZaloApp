import { Box } from "zmp-ui";
import StepIndicator from "../StepIndicator";
import useMutliStepFormContext from "@/hooks/useClaimFormContext";

export default function StepProgress() {
  const claimForm = useMutliStepFormContext();
  const component = claimForm.currentStep;

  return claimForm.isLastStep ? (
    <></>
  ) : (
    <Box
      mt={2}
      className="bg-white rounded-md border border-gray-200 shadow-sm"
      p={4}
    >
      <div className="flex items-center gap-4">
        <StepIndicator
          currentStep={claimForm.currentStepIndex + 1}
          totalSteps={claimForm.steps.length}
          size={90}
          strokeWidth={10}
        />
        <div className="flex flex-col">
          <h4 className="text-lg font-medium">{component.title}</h4>
          <p className="text-sm text-muted-foreground">
            {component.description}
          </p>
        </div>
      </div>
    </Box>
  );
}
