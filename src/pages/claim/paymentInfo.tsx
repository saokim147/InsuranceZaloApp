import {
  getMemberBeneficialInfo,
  getMemberInfo,
  getUserFamilyMembers,
} from "@/api/claimApi";
import ErrorMessage from "@/components/ui/errorValidation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUserFamilyMembers } from "@/hooks/useUserFamilyMembers";
import { ClaimFormType } from "@/schema";
import { PaymentMethod } from "@/types/paymentType";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { nativeStorage } from "zmp-sdk";
import { Box, Select, Text } from "zmp-ui";
const { Option } = Select;
export default function PaymentInfoPage() {
  const {
    register,
    getValues,
    setValue,
    control,
    watch,
    formState: { errors },
  } = useFormContext<ClaimFormType>();
  // const userProfile = JSON.parse(
  //   nativeStorage.getItem("profile")
  // ) as AppProfile;
  // const userId = userProfile.userId;

  const userId = "59d337c9-386a-46c4-8813-8ac10127b7ba";

  const { data: memberList } = useUserFamilyMembers(userId);
  const id = getValues().id;
  const memberCode = getValues().memberCode;
  const [beneficalMemberCode, setBeneficialMemberCode] = useState("");
  const paymentMethod = watch("paymentMethod");
  return (
    <Box
      mt={2}
      p={6}
      className="bg-white rounded-lg border border-gray-200 shadow-sm"
    >
      <Box mt={2}>
        <Input {...register("updateBenenfit")} className="hidden" />
        <Input {...register("memberBenificialId")} className="hidden" />
        <Input {...register("beneficiaryId")} className="hidden" />
        <Controller
          name="memberBenificialName"
          control={control}
          render={({ field }) => (
            <Select
              id="memberBenificialName"
              label="Người thụ hưởng"
              className="h-[48px]"
              value={field.value}
              onChange={async (value) => {
                const code = value?.toString() || "";
                const memberDetailRes = await getMemberInfo(code);
                const memberId = memberDetailRes.model[0]?.id || "";
                const medicalInfo = await getMemberBeneficialInfo(
                  id,
                  memberId,
                  memberCode
                );
                const item = medicalInfo?.model[0];
                field.onChange(code);
                setBeneficialMemberCode(code);
                setValue("memberBenificialId", memberId);
                setValue("beneficiaryId", item?.beneficiaryId || "");
                setValue("updateBenenfit", item?.updateBenenfit || 0);
                setValue(
                  "beneficialRelationship",
                  item?.beneficialRelationship || ""
                );
                setValue("paymentMethod", item?.paymentMethod as PaymentMethod);
                setValue("bankAccountNumber", item?.beneficyBankAccount || "");
                setValue("bankName", item?.beneficyBankName || "");
              }}
            >
              {memberList?.model.map((member) => (
                <Option
                  key={member.memberCode}
                  value={member.memberCode}
                  title={`${member.memberName} - ${member.memberCode}`}
                >
                  {member.memberCode} - {member.memberName}
                </Option>
              ))}
              {/* <Option value="OT">Khác</Option> */}
            </Select>
          )}
        />
        <ErrorMessage message={errors.memberBenificialName?.message} />
        <Box mt={1}>
          <Text>Quan hệ người thụ hưởng</Text>
          <Input
            className="h-[48px] mt-2"
            disabled={memberCode === beneficalMemberCode}
            {...register("beneficialRelationship")}
          />
        </Box>
      </Box>
      <Box mt={2}>
        <Text>Số CCCD người thụ hưởng</Text>
        <Input
          {...register("beneficiaryCitizenIdentity")}
          className="h-[48px] mt-2"
          disabled
        />
      </Box>
      <Box mt={2}>
        <Controller
          name="paymentMethod"
          control={control}
          render={({ field }) => (
            <Select
              label="Thanh toán"
              value={field.value}
              onChange={field.onChange}
              className="h-[48px] mt-2"
            >
              <Select.Option
                value={PaymentMethod.CREDIT_TRANSFER}
                title="Chuyển khoản"
              >
                Chuyển khoản
              </Select.Option>
              <Select.Option value={PaymentMethod.CASH} title="Tiền mặt">
                Tiền mặt
              </Select.Option>
            </Select>
          )}
        />
      </Box>
      <Box mt={2}>
        <Text>Tên ngân hàng</Text>
        <Input
          className="h-[48px] mt-2"
          {...register("bankName")}
          disabled={paymentMethod === PaymentMethod.CASH}
        />
      </Box>
      <Box mt={2}>
        <Text>Số tài khoản</Text>
        <Input
          className="h-[48px] mt-2"
          {...register("bankAccountNumber")}
          disabled={paymentMethod === PaymentMethod.CASH}
        />
      </Box>
    </Box>
  );
}
