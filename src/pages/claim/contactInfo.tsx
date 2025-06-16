import ErrorMessage from "@/components/ui/errorValidation";
import { Input } from "@/components/ui/input";
import { ClaimFormType } from "@/schema";
import { useFormContext } from "react-hook-form";
import { Box, Text } from "zmp-ui";

export default function ContactInfoPage() {
  const {
    getValues,
    register,
    formState: { errors },
  } = useFormContext<ClaimFormType>();

  const currentFormValue = getValues();
  return (
    <Box
      mt={2}
      p={6}
      className="bg-white rounded-lg border-border shadow-sm border"
    >
      <Box flex flexDirection="column">
        <Box mt={2}>
          <Text size="small">Email</Text>
          <Input className="h-[48px] mt-2" {...register("email")} />
          <ErrorMessage message={errors.email?.message} />
        </Box>
        <Box mt={2}>
          <Text size="small">Số điện thoại</Text>
          <Input className="h-[48px] mt-2" {...register("phoneNumber")} />
          <ErrorMessage message={errors.phoneNumber?.message} />
        </Box>
      </Box>
    </Box>
  );
}
