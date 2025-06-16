import { getMemberInfo } from "@/api/claimApi";
import ErrorMessage from "@/components/ui/errorValidation";
import { Input } from "@/components/ui/input";
import QueryStatus from "@/components/ui/queryStatus";
import { Spinner } from "@/components/ui/spinner";
import { useUserFamilyMembers } from "@/hooks/useUserFamilyMembers";
import { ClaimFormType } from "@/schema";
import { AppProfile, MemberDetailItem } from "@/types/userType";
import { convertMemberRelationship } from "@/utils/common";
import { formatStringDate } from "@/utils/date";
import { CalendarDaysIcon } from "lucide-react";
import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { nativeStorage } from "zmp-sdk/apis";
import { Box, Select, Text } from "zmp-ui";

const { Option } = Select;

export default function BenificiaryInfoPage() {
  const {
    setValue,
    getValues,
    register,
    control,
    formState: { errors },
  } = useFormContext<ClaimFormType>();
  const [selectedMemberInfo, setSelectedMemberInfo] =
    useState<MemberDetailItem>();

  const userProfile = JSON.parse(
    nativeStorage.getItem("profile")
  ) as AppProfile;
  const userId = userProfile.userId;
  //const userId = "59d337c9-386a-46c4-8813-8ac10127b7ba";
  const { data: memberList, status } = useUserFamilyMembers(userId);
  const handleMemberSelect = async (memberCode: string) => {
    const member = memberList?.model.find((m) => m.memberCode === memberCode);
    if (!member) {
      return;
    }
    const memberDetail = await getMemberInfo(memberCode);
    const model = memberDetail.model[0];
    setSelectedMemberInfo(model);
    setValue("memberId", model.id);
    setValue("memberHistId", model.memberHists[0].id);
    setValue("branchMainId", model.branchId);
    setValue("branchHandlerId", model.branchId);
    setValue("requestorId", userId);
    setValue("createdBy", userId);
    setValue("updatedBy", userId);
    setValue("memberName", member?.memberName || "");
    setValue("memberCode", memberCode);
    setValue("policyNo", model.policyNo || "");
    setValue("citizenIdentity", model.citizenIdentity || "");
    setValue("policyHolder", model.policyHolder || "");
    setValue("relationship", model.memberHists[0]?.relationship || "");
    setValue("dob", model.memberHists[0]?.dob || "");
    setValue("effectiveFrom", model.memberHists[0]?.effectiveFrom || "");
    setValue("effectiveTo", model.memberHists[0]?.effectiveTo || "");
    setValue("contactEmail", model.membersInUsers[0]?.contactEmail || "");
    setValue("contactPhone", model.membersInUsers[0]?.contactPhone || "");
  };

  if (!memberList) {
    return (
      <div className="text-center justify-center align-center h-screen text-gray-500">
        <Spinner />
      </div>
    );
  }
  <QueryStatus status={status} />;
  return (
    <Box
      mt={2}
      p={6}
      className="bg-white rounded-lg outline-1 outline-neutral-200 outline-double"
    >
      <Box mt={2}>
        <Input className="hidden" {...register("version")} />
        <Input className="hidden" {...register("id")} />
        <Input className="hidden" {...register("memberId")} />
        <Input className="hidden" {...register("memberHistId")} />
        <Input className="hidden" {...register("branchMainId")} />
        <Input className="hidden" {...register("branchHandlerId")} />
        <Input className="hidden" {...register("createdBy")} />
        <Input className="hidden" {...register("updatedBy")} />
        <Controller
          name="memberCode"
          control={control}
          render={({ field }) => (
            <Select
              className="h-[48px] mt-2"
              label="Số member ID"
              value={field.value}
              onChange={(value) => {
                field.onChange(value?.toString() || "");
                handleMemberSelect(value?.toString() || "");
              }}
            >
              {memberList.model.map((member) => (
                <Option
                  key={member.memberCode}
                  value={member.memberCode}
                  title={`${member.memberName} - ${member.memberCode}`}
                >
                  {member.memberCode} - {member.memberName}
                </Option>
              ))}
            </Select>
          )}
        />
        <ErrorMessage message={errors.memberCode?.message} />
      </Box>
      <Box mt={2}>
        <Text size="small">Số hợp đồng bảo hiểm</Text>
        <Input disabled className="h-[48px] mt-2" {...register("policyNo")} />
      </Box>
      <Box mt={2}>
        <Text size="small">Họ và tên NĐBH</Text>
        <Input disabled className="h-[48px] mt-2" {...register("memberName")} />
      </Box>
      <Box mt={2}>
        <Text size="small">Số CCCD/Hộ chiếu định danh</Text>
        <Input
          disabled
          className="h-[48px] mt-2"
          {...register("citizenIdentity")}
        />
      </Box>
      <Box mt={2}>
        <Text size="small">Chủ hợp đồng</Text>
        <Input
          disabled
          className="h-[48px] mt-2"
          {...register("policyHolder")}
        />
      </Box>
      <Box mt={2}>
        <Text size="small">Mối quan hệ</Text>
        <Input className="hidden" {...register("relationship")} />
        <Input
          disabled
          className="h-[48px] mt-2"
          value={convertMemberRelationship(
            selectedMemberInfo?.memberHists?.[0]?.relationship ||
              getValues().relationship
          )}
        />
      </Box>
      <Box mt={2}>
        <Text size="small">Ngày tháng năm sinh</Text>
        <Box className="relative">
          <Input className="hidden" {...register("dob")} />
          <Input
            disabled
            className="h-[48px] mt-2"
            value={formatStringDate(
              selectedMemberInfo?.memberHists?.[0]?.dob || getValues().dob
            )}
          />
          <CalendarDaysIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 size-5" />
        </Box>
      </Box>
      <Box mt={2}>
        <Text size="small">Ngày bắt đầu bảo hiểm</Text>
        <Box className="relative">
          <Input className="hidden" {...register("effectiveFrom")} />
          <Input
            disabled
            className="h-[48px] mt-2"
            value={
              formatStringDate(
                selectedMemberInfo?.memberHists?.[0]?.effectiveFrom ||
                  getValues().effectiveFrom
              ) || ""
            }
          />
          <CalendarDaysIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 size-5" />
        </Box>
      </Box>
      <Box mt={2}>
        <Text size="small">Ngày kết thúc bảo hiểm</Text>
        <Box className="relative">
          <Input className="hidden" {...register("effectiveTo")} />
          <Input
            disabled
            className="h-[48px] mt-2"
            value={
              formatStringDate(
                selectedMemberInfo?.memberHists?.[0]?.effectiveTo ||
                  getValues().effectiveTo
              ) || ""
            }
          />
          <CalendarDaysIcon
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            size={17}
          />
        </Box>
      </Box>
      <Input className="h-[48px] mt-2 hidden" {...register("contactEmail")} />
      <Input className="h-[48px] mt-2 hidden" {...register("contactPhone")} />
    </Box>
  );
}
