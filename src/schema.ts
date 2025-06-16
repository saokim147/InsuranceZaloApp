import { z } from "zod";
import { TreatmentType } from "./types/claimType";
import { PaymentMethod, CurrencyUnit } from "./types/paymentType";

export const benificiaryInfoSchema = z.object({
  act: z.number(),
  version: z.number(),
  id: z.string(),
  memberId: z.string(),
  memberHistId: z.string(),
  branchMainId: z.string(),
  branchHandlerId: z.string(),
  requestorId: z.string(),
  createdBy: z.string(),
  updatedBy: z.string(),
  memberCode: z.string().min(1, { message: "Vui lòng chọn Member ID" }),
  policyNo: z.string(),
  memberName: z.string(),
  citizenIdentity: z.string(),
  policyHolder: z.string(),
  relationship: z.string(),
  dob: z.string(),
  effectiveFrom: z.string(),
  effectiveTo: z.string(),
  contactEmail: z.string().email(),
  contactPhone: z.string(),
});
export const contactInfoSchema = z.object({
  email: z.string().email({ message: "Vui lòng nhập email hợp lệ" }),
  phoneNumber: z.string().min(1, { message: "Vui lòng nhập số điện thoại" }),
});
export const treatmentInfoSchema = z.object({
  medicalFacilities: z.string().min(1, "Vui lòng nhập CSYT"),
  treatmentType: z.enum(
    [
      TreatmentType.ACCIDENT,
      TreatmentType.DENTAL,
      TreatmentType.INPATIENT,
      TreatmentType.OUTPATIENT,
    ],
    {
      message: "Vui lòng chọn hình thức điều trị",
    }
  ),
  treatmentDate: z.date(),
  dischargeDate: z.date(),
  eventDate: z.date(),
  claimCost: z.number().min(0, "Chi phí điều trị phải lớn hơn 0"),
  currencyUnit: z.enum([
    CurrencyUnit.VND,
    CurrencyUnit.USD,
    CurrencyUnit.AUD,
    CurrencyUnit.CAD,
    CurrencyUnit.CHF,
    CurrencyUnit.EUR,
    CurrencyUnit.GBP,
    CurrencyUnit.HKD,
    CurrencyUnit.JPY,
    CurrencyUnit.KRW,
    CurrencyUnit.SGD,
    CurrencyUnit.THB,
  ]),
  diagnosis: z.string().min(1, "Vui lòng nhập chẩn đoán"),
});

export const paymentInfoSchema = z.object({
  memberBenificialName: z.string().min(1, "Vui lòng chọn người thụ hưởng"),
  beneficialRelationship: z.string(),
  memberBenificialId: z.string(),
  beneficiaryId: z.string(),
  updateBenenfit: z.number(),
  paymentMethod: z.enum([PaymentMethod.CASH, PaymentMethod.CREDIT_TRANSFER], {
    message: "Vui lòng chọn phương thức thanh toán",
  }),
  beneficiaryCitizenIdentity: z.string(),
  bankName: z.string().optional(),
  bankAccountNumber: z.string().optional(),
});
export const fileUploadSchema = z.object({
  documents: z
    .array(
      z.object({
        file: z.instanceof(File),
      })
    )
    .min(1, "Cần cung cấp hình ảnh HSBT"),
  fileOther: z.array(
    z.object({
      file: z.instanceof(File),
    })
  ),
  fileInvoice: z.array(
    z.object({
      file: z.instanceof(File),
    })
  ),
});

export const claimFormSchema = benificiaryInfoSchema
  .merge(contactInfoSchema)
  .merge(treatmentInfoSchema)
  .merge(paymentInfoSchema)
  .merge(fileUploadSchema);

export type ClaimFormType = z.infer<typeof claimFormSchema>;
