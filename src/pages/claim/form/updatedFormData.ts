import { ClaimFormType } from "@/schema";
import { ClaimDetailItem, TreatmentType } from "@/types/claimType";
import { CurrencyUnit } from "@/types/paymentType";

// sửa
export default function getFormData(
  detailItem: ClaimDetailItem,
  documentFiles: File[] = [],
  otherFiles: File[] = [],
  invoiceFiles: File[] = []
): ClaimFormType {
  return {
    act: 1,
    id: detailItem.id,
    version: detailItem.version,
    memberId: detailItem.memberId,
    memberHistId: detailItem.memberHistId,
    branchMainId: detailItem.branchHandlerId,
    branchHandlerId: detailItem.branchHandlerId,
    beneficiaryId: detailItem.memberHist.id,
    requestorId: detailItem.requestorId,
    memberCode: detailItem.member.code,
    policyNo: detailItem.member.policy.code,
    memberName:
      detailItem?.beneficiary.lastName +
      " " +
      detailItem?.beneficiary.firstName,
    citizenIdentity: "",
    beneficialRelationship: "",
    policyHolder: detailItem.member.policy.customer.name,
    relationship: detailItem.relationshipMember,
    updateBenenfit: detailItem.updateBenenfit,
    beneficiaryCitizenIdentity: "",
    dob: detailItem.beneficiary.dob,
    effectiveFrom: detailItem.memberHist.effectiveFrom,
    effectiveTo: detailItem.memberHist.effectiveTo,
    createdBy: detailItem.createdBy,
    updatedBy: detailItem.createdBy,
    contactEmail: detailItem.contactEmail,
    contactPhone: detailItem.contactPhone,
    email: detailItem.contactEmail,
    phoneNumber: detailItem.contactPhone,
    medicalFacilities: detailItem.medicalFacilityId,
    treatmentType: detailItem.treatmentType as TreatmentType,
    treatmentDate: new Date(detailItem.treatmentDate),
    dischargeDate: new Date(detailItem.dischargeDate),
    eventDate: new Date(detailItem.insuredEventDate),
    claimCost: detailItem.requestAmount,
    diagnosis: detailItem.diagnostics,
    memberBenificialName:
      detailItem?.beneficiary.lastName +
      " " +
      detailItem?.beneficiary.firstName,
    memberBenificialId: detailItem.beneficiary.memberId,
    paymentMethod: detailItem.paymentMethod,
    currencyUnit: detailItem.currencyUnit as CurrencyUnit,
    bankName:
      detailItem.paymentMethod === "C" ? detailItem.bankAccount.bankName : "",
    bankAccountNumber:
      detailItem.paymentMethod === "C" ? detailItem.bankAccount.accountNo : "",
    documents: documentFiles.map((doc) => ({
      file: doc,
    })),
    fileOther: otherFiles.map((doc) => ({
      file: doc,
    })),
    fileInvoice: invoiceFiles.map((doc) => ({
      file: doc,
    })),
  };
}
