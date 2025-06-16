import { Box, Header, Page, useLocation, useNavigate } from "zmp-ui";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { claimFormSchema, ClaimFormType } from "@/schema";
import { useMultiStepForm } from "@/hooks/useMultiStepForm";
import { MultiStepFormContext } from "@/context/context";
import StepProgress from "@/components/claim/step-progress";
import ProgressButtons from "./progressButtons";
import { FORM_STEPS } from "@/pages/claim/form/formStep";
import INITIAL_FORM_DATA from "./form/initialFormData";
import toast from "@/components/ui/sonner";
import { handleClaimSubmission } from "./form/claimSubmitssion";

export default function CreateClaimFormPage() {
  const navigation = useNavigate();
  const location = useLocation();
  const isUpdate = location.state?.isUpdate as boolean;
  var claimId = "";
  if (isUpdate) {
    claimId = location.state?.claimId as string;
  }
  const FORM_DATA = location.state?.formData as ClaimFormType;

  const methods = useForm<ClaimFormType>({
    mode: "onSubmit",
    resolver: zodResolver(claimFormSchema),
    defaultValues: isUpdate ? FORM_DATA : INITIAL_FORM_DATA,
  });

  const value = useMultiStepForm(FORM_STEPS, methods);
  // lưu api
  const onSubmit = async (data: ClaimFormType) => {
    const response = await handleClaimSubmission(data, isUpdate);
    if (response.success) {
      if (isUpdate) {
        navigation("/claimDetail", {
          direction: "backward",
          state: {
            claimId: claimId,
            isSuccessfulUpdate: true,
          },
        });
      } else {
        navigation("/claim", {
          direction: "backward",
          state: {
            isSuccessfulCreate: true,
          },
        });
      }
    } else {
      if (isUpdate) {
        toast({
          title: "Tạo đơn thất bại, xin hãy thử lại",
          variant: "error",
        });
      } else {
        toast({
          title: "Sửa đơn thất bại, xin hãy thử lại",
          variant: "error",
        });
      }
    }
  };
  return (
    <Page className="bg-background flex flex-col">
      <Header
        title="Tạo hồ sơ bồi thường"
        backgroundColor="#e42154"
        textColor="white"
        style={{ position: "sticky" }}
      />
      <MultiStepFormContext.Provider value={value}>
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="flex-1 overflow-auto"
          >
            <Box p={3}>
              <StepProgress />
              {value.currentStep.component}
              <ProgressButtons isUpdate={isUpdate} claimInitId={claimId} />
            </Box>
          </form>
        </FormProvider>
      </MultiStepFormContext.Provider>
    </Page>
  );
}
