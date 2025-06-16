import { SaveIcon } from "@/components/icons/saveIcon";
import { SendIcon } from "@/components/icons/sendIcon";
import { Button } from "@/components/ui/button";
import useMutliStepFormContext from "@/hooks/useClaimFormContext";
import Box from "zmp-ui/box";
import { handleClaimSubmission } from "./form/claimSubmitssion";
import { useFormContext } from "react-hook-form";
import { ClaimFormType } from "@/schema";
import { useNavigate } from "zmp-ui";

export default function ProgressButtons({
  isUpdate,
  claimInitId,
}: {
  isUpdate: boolean;
  claimInitId: string;
}) {
  const claimForm = useMutliStepFormContext();
  const { getValues } = useFormContext<ClaimFormType>();
  const navigation = useNavigate();
  return (
    <Box flex mt={4} className="gap-4">
      {!claimForm.isLastStep ? (
        <>
          <Button
            variant="accent"
            className="flex-1"
            onClick={() => claimForm.prev()}
            disabled={claimForm.isLastStep}
            type="button"
          >
            Back
          </Button>
          <Button
            className="flex-1"
            onClick={() => claimForm.next()}
            type="button"
          >
            Next
          </Button>
        </>
      ) : (
        <>
          <Button className="flex-1" variant="secondary" type="submit">
            <SaveIcon />
            Lưu
          </Button>
          <Button
            type="button"
            className="flex-1"
            onClick={async () => {
              const response = await handleClaimSubmission(
                getValues(),
                isUpdate
              );
              if (response.success) {
                navigation("/viewPdf", {
                  state: { claimInitId: claimInitId || response.model.id },
                });
              }
            }}
          >
            <SendIcon />
            Gửi yêu cầu
          </Button>
        </>
      )}
    </Box>
  );
}
