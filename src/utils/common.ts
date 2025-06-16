import { RefreshTokenResponse, SigninResponse, Tokens } from "@/types/userType";
import { nativeStorage } from "zmp-sdk";
import {
  ClaimPayload,
  MedicalFacilityItem,
  MedicalListReponse,
  RelationshipStatus,
} from "@/types/claimType";
import { FILE_MAP, RELATIONSHIP_MAP, STATUS_MAP } from "@/types/record";
import { CityResponse } from "@/types/hospitalType";
import { ComboboxValue } from "@/types/uiType";
import { ClaimFormType } from "@/schema";
const OFFSET = 60 * 5;
export function formatPhoneNumber(phoneNumber: string): string {
  return "0" + phoneNumber.slice(2);
}

export function isNullOrEmpty(str: string | null | undefined): boolean {
  return !str || str.trim() === "";
}

export function getFormatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

export function normalizeVietnamese(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .replace(/\s+/g, "")
    .toLowerCase();
}

export function isExpired(expireTimeStr: string): boolean {
  if (expireTimeStr === "") {
    return true;
  }
  const date = new Date(expireTimeStr);
  if (isNaN(date.getTime())) {
    throw new Error("Invalid date string");
  }
  const interval = Math.floor((date.getTime() - Date.now()) / 1000);
  return interval < OFFSET;
}

export function convertToTokens(signinResponse: SigninResponse): Tokens {
  return {
    accessToken: signinResponse.token,
    refreshToken: signinResponse.refreshToken,
    tokenExpireAt: signinResponse.tokenExpired,
    refreshTokenAt: signinResponse.refreshTokenExpired,
  };
}

export function convertFromRefreshTokenResponse(
  signinResponse: RefreshTokenResponse
): Tokens {
  return {
    accessToken: signinResponse.token,
    refreshToken: signinResponse.refreshToken,
    tokenExpireAt: signinResponse.tokenExpired,
    refreshTokenAt: signinResponse.refreshTokenExpired,
  };
}

export function getItem<T>(key: string): T | null {
  const item = nativeStorage.getItem(key);
  return item ? (JSON.parse(item) as T) : null;
}

export function convertPaymentMethod(paymentStatus: string): string {
  return paymentStatus === "C" ? "Chuyển khoản" : "Tiền mặt";
}

export function convertMemberRelationship(relationshipStatus: string): string {
  return RELATIONSHIP_MAP[relationshipStatus as RelationshipStatus] || "";
}

export function getStatusDescription(code: string): string {
  return STATUS_MAP[code] ?? "Không xác định";
}

export function convertFromCityResponse(
  response?: CityResponse
): { value: string; label: string }[] {
  return (
    response?.data.map((item) => ({
      value: item.cityName,
      label: item.cityName,
    })) ?? []
  );
}

export function convertFromMedicalResponse(
  response: MedicalListReponse | undefined
): { value: string; label: string }[] {
  return (
    response?.model?.map((item) => ({
      value: item.id ?? "",
      label: item.name ?? "",
    })) ?? []
  );
}

export const convertMedicalFacilityToItem = (
  facilities: MedicalFacilityItem[]
): ComboboxValue[] => {
  const result: ComboboxValue[] = [];
  facilities.forEach((facility) => {
    result.push({
      id: facility.id || "",
      name: facility.name || "",
      value: facility.name || "",
    });
  });
  return result;
};

export function convertToClaimPayload(data: ClaimFormType): ClaimPayload {
  return {
    Act: data.act,
    UpdateBenenfit: data.updateBenenfit || 0,
    PolicyNo: data.policyNo,
    MemberBeneficialId: data.memberBenificialId,
    Language: "VI",
    BankName: data.bankName || "",
    BeneficialRelationship: data.beneficialRelationship,
    Phone: data.contactPhone ?? data.phoneNumber ?? "",
    Email: data.contactEmail ?? data.email ?? "",
    CitizenIdentity: data.citizenIdentity,
    AccountNo: data.bankAccountNumber || "",
    Id: data.id,
    Type: "CI",
    MemberId: data.memberId,
    MemberHistId: data.memberHistId,
    BranchMainId: data.branchMainId,
    BranchHandlerId: data.branchHandlerId,
    Diagnostics: data.diagnosis,
    MedicalFacilityId: data.medicalFacilities,
    TreatmentType: data.treatmentType,
    TreatmentAdmissionDate: data.treatmentDate
      ? data.treatmentDate.toLocaleString()
      : "",
    DischargeDate: data.dischargeDate
      ? data.dischargeDate.toLocaleString()
      : "",
    InsuredEventDate: data.eventDate ? data.eventDate.toLocaleString() : "",
    RequestAmount: data.claimCost,
    CurrencyUnit: data.currencyUnit,
    PaymentMethod: data.paymentMethod,
    RequestorId: data.requestorId,
    BeneficiaryId: data.beneficiaryId,
    CreatedBy: data.createdBy ?? "",
    UpdatedBy: data.updatedBy ?? "",
    Notes: "",
    Status: "NE",
    ContactEmail: data.contactEmail ?? data.email ?? "",
    ContactPhone: data.contactPhone ?? data.phoneNumber ?? "",
    Version: data.version,
  };
}
