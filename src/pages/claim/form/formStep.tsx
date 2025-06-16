import { FormStep } from "@/types/uiType";
import PaymentInfoPage from "@/pages/claim/paymentInfo";
import ContactInfoPage from "@/pages/claim/contactInfo";
import BenificiaryInfoPage from "@/pages/claim/benificiaryInfo";
import { benificiaryInfoSchema } from "@/schema";
import FileUploadPage from "@/pages/claim/fileUpload";
import TreatmentInfoPage from "@/pages/claim/treatmentInfo";
import { contactInfoSchema } from "@/schema";
import { fileUploadSchema } from "@/schema";
import { paymentInfoSchema } from "@/schema";
import { treatmentInfoSchema } from "@/schema";

export const FORM_STEPS: FormStep[] = [
  {
    component: <BenificiaryInfoPage />,
    schema: benificiaryInfoSchema,
    title: "Thông tin người được bảo hiểm",
    description: "Chọn Mã thành viên",
    fields: [
      "act",
      "id",
      "version",
      "memberId",
      "memberHistId",
      "branchMainId",
      "branchHandlerId",
      "requestorId",
      "memberCode",
      "createdBy",
      "updatedBy",
      "policyNo",
      "memberName",
      "citizenIdentity",
      "policyHolder",
      "relationship",
      "dob",
      "effectiveFrom",
      "effectiveTo",
      "contactEmail",
      "contactPhone",
    ],
  },
  {
    component: <ContactInfoPage />,
    schema: contactInfoSchema,
    title: "Thông tin liên hệ",
    description: "Nhập thông tin cá nhân",
    fields: ["email", "phoneNumber"],
  },
  {
    component: <TreatmentInfoPage />,
    schema: treatmentInfoSchema,
    title: "Thông tin điều trị",
    description: "Nhập thông tin điều trị",
    fields: [
      "medicalFacilities",
      "treatmentType",
      "treatmentDate",
      "dischargeDate",
      "eventDate",
      "claimCost",
      "diagnosis",
      "currencyUnit",
    ],
  },
  {
    component: <PaymentInfoPage />,
    schema: paymentInfoSchema,
    title: "Thông tin thanh toán",
    description: "Nhập thông tin thanh toán",
    fields: [
      "memberBenificialName",
      "updateBenenfit",
      "beneficialRelationship",
      "memberBenificialId",
      "beneficiaryId",
      "paymentMethod",
      "beneficiaryCitizenIdentity",
      "bankName",
      "bankAccountNumber",
    ],
  },
  {
    component: <FileUploadPage />,
    schema: fileUploadSchema,
    title: "Đính kèm chứng từ",
    description: "Chụp/gửi ảnh chứng từ",
    fields: ["documents", "fileOther", "fileInvoice"],
  },
];
