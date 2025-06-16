import { CurrencyUnit, PaymentMethod } from "./paymentType";
import { ClaimItemType, Status } from "./systemType";

const CiTreatmentType = {
  I: "I",
  O: "O",
  P: "P",
} as const;
type CiTreatmentType = (typeof CiTreatmentType)[keyof typeof CiTreatmentType];

export interface ClaimResult {
  totalRequestAmount: number;
  totalClaimAmount: number;
}

export interface ClaimApiResponse {
  success: boolean;
  id: string;
  type: null;
  messages: any[];
  model: ClaimItem[];
  result: ClaimResult;
  count: number;
  page: number;
  limit: number;
}

export interface ClaimItem {
  id: string;
  parentId: null | string;
  claimIndex: number;
  claimIntiId: string;
  type: ClaimItemType;
  source: CiTreatmentType;
  ciCode: string;
  ciCodeRef: null | string;
  ciParentCode: string;
  childrenNumRel: number;
  createdBy: string;
  cmCode: null | string;
  cmCodeRef: null | string;
  paymentOrderNo: null;
  paymentNo: null | string;
  paymentDate: null | string;
  memId: string;
  memCode: string;
  policyId: string;
  polNo: string;
  ciRequestAmount: number;
  cmRequestAmount: number | null;
  paAmount: null | string;
  claimAmount: number | null;
  currencyUnit: CurrencyUnit;
  sentAt: string;
  memFirstName: string;
  memLastName: string;
  memPhone: null | string;
  memCitizenIdentity: null | string;
  isDocumentsReceived: number;
  status: Status;
  custCode: string;
  custCodeRef: null | string;
  custName: string;
  mfCode: null | string;
  mfName: null | string;
  handlerBy: null | string;
  handlerUserNameRef: null | string;
  handlerFirstName: null | string;
  handlerLastName: null | string;
  coreCreatedBy: null | string;
  coreCreatedUserNameRef: null | string;
  coreCreatedFirstName: null | string;
  coreCreatedLastName: null | string;
  coreCreatedAt: Date | null;
  initialRecipientBy: null | string;
  initialRecipientUserNameRef: null | string;
  initialRecipientFirstName: null | string;
  initialRecipientLastName: null | string;
  initialRecipientAt: Date | null;
  ciTreatmentType: CiTreatmentType;
  cmTreatmentType: CiTreatmentType | null;
  ciAdmissionDate: Date | null;
  cmAdmissionDate: Date | null;
  ciDischargeDate: Date | null;
  cmDischargeDate: Date | null;
  ciTreatmentDate: Date;
  cmTreatmentDate: Date | null;
  approvedAt: null | string;
  approvedBy: null | string;
  lastApprovedAt: null | string;
  lastApprovedBy: null | string;
  lastReviewAt: null | string;
  cmRejectedAt: null | string;
  cmRejectedBy: null | string;
  ciRejectedAt: null | string;
  ciRejectedBy: null | string;
  version: number;
  userIds: null | string;
  insuredEventDate: Date;
  riskType: null | string;
  provinceId: null | string;
  lastNextExecutionBy: null | string;
  branchId: string;
}

export interface ClaimApiRequest {
  Limit: number;
  Page: number;
  Order: string;
  UserGroups: string[];
  UserFilter: string[];
  MemName: string | null;
  SendFrom: string | null;
  SendTo: string | null;
  UserId: string;
  StatusClaimDeclare: string;
}
export interface ClaimDetailResponse {
  success: boolean;
  id: string;
  type: null;
  messages: any[];
  model: ClaimDetailItem[];
}

export interface ClaimDetailItem {
  userFilter: null;
  isCheck: boolean;
  provideCode: null;
  effectiveFrom: null;
  effectiveTo: null;
  isSync: boolean;
  createdByAddId: null;
  claims: null;
  userAdds: any[];
  codeRefund: null;
  claimIntiNoRef: null;
  accountNamePA: null;
  isDocumentsReceived: null;
  act: number;
  currentId: null;
  isAdmin: boolean;
  otp: null;
  isClaim: null;
  limit: number;
  page: number;
  order: null;
  isUpdateBenenfit: boolean;
  addBenefitDocumentIds: null;
  additionalDocumentIds: null;
  delBenefitDocumentIds: null;
  delFileOtherDocumentIds: null;
  delFileInvoiceDocumentIds: null;
  updateBenenfit: number;
  policyNo: null;
  medicalFacility: MedicalFacility;
  is_InsuredBenefit: null;
  beneficyName: null;
  memberBeneficialId: null;
  branchCode: null;
  medicalFacilityCode: string;
  language: string;
  bankName: string | null;
  beneficiaryIdentifier: null;
  relationship: string | null;
  relationshipMember: string;
  beneficialRelationship: null;
  phone: string | null;
  email: string | null;
  bankAccount: BankAccount;
  citizenIdentity: null | string;
  accountNo: null;
  documentBeneficialName: null;
  documentBeneficialId: null;
  documentInsuredName: null;
  documentInsuredId: null;
  isBeneficial: boolean;
  memberInsuredId: null;
  relationships: any[];
  treatmentForms: any[];
  currencies: any[];
  typeClaimDeclare: null;
  companies: null;
  documentTypes: null;
  claimTypes: null;
  diagnos: null;
  paymentmethods: any[];
  medicalFacilities: any[];
  bankAccounts: any[];
  chooseMemberBenefits: any[];
  fileOther: null;
  fileBeneficial: null;
  fileInsured: null;
  fileInvoice: null;
  selectedUsername: null;
  policy: null;
  id: string;
  parentId: null;
  paymentVerificationId: string;
  code: string;
  typeCode: null;
  type: string;
  codeRef: null;
  memberId: string;
  memCode: null;
  memName: null;
  rejectionNotesExt: null;
  memPhone: null;
  requestorRel: null;
  memBirthday: null;
  memidentity: null;
  memberHistId: string;
  memberHist: MemberHist;
  branchMainId: string;
  branchHandlerId: string;
  coreCreatedCode: null;
  finalHandlerCode: null;
  coreCreatedAt: null;
  finalTransferHandlerAt: null;
  source: string;
  sourceApi: string;
  diagnostics: string;
  createdAt: Date;
  createdTo: null;
  createdFrom: null;
  sendTo: null;
  sendFrom: null;
  createdBy: string;
  initialRecipientBy: null;
  finalHandlerBy: null;
  medicalFacilityId: string;
  treatmentType: string;
  treatmentAdmissionDate: null;
  admissionDate: string;
  treatmentDate: string;
  dischargeDate: string;
  requestAmount: number;
  currencyUnit: string;
  paymentMethod: PaymentMethod;
  insuredEventDate: string;
  dateOfLoss: null;
  requestorId: string;
  rejectionNotes: null;
  isOwner: null;
  rejectedAt: null;
  rejectedBy: null;
  beneficiaryId: string;
  bankAccountId: null;
  sentBy: string;
  sentAt: Date;
  updatedAt: Date;
  updatedBy: null;
  recipientAt: Date;
  recipientBy: null;
  recipientCode: null;
  notes: null;
  timestamp: Date;
  version: number;
  createdCode: null;
  status: string;
  statusName: null;
  paAmount: null;
  extInfo: null;
  statusAdmin: null;
  documents: Document[];
  documentBeneficial: any[];
  beneficiary: Beneficiary;
  createdByNavigation: CreatedByNavigation;
  finalHandlerByNavigation: null;
  memberBenefits: any[];
  member: Member;
  addittionalNotices: any[];
  contactEmail: string;
  contactPhone: string;
  invoices: any[];
  historyStatuses: any[];
  finalTransferHandledAt: null;
  coreCreatedBy: null;
  coreCreatedByNavigation: null;
}

export interface Beneficiary {
  id: string;
  memberId: string;
  transNo: number;
  type: string;
  firstName: string;
  lastName: string;
  planId: string;
  terminalDate: null;
  createdAt: Date;
  createdBy: string;
  updatedAt: null;
  updatedBy: null;
  timestamp: Date;
  status: string;
  plan: null;
  policyHist: null;
  grossLcPremium: number;
  grossFcPremium: number;
  salary: null;
  isVip: null;
  chngEffFmDt: null;
  policyHistId: string;
  citizenIdentity: null;
  phone: null | string;
  email: null | string;
  gender: string;
  dob: string;
  address: null;
  relationship: string;
  nationality: null;
  originalEntryDt: string;
  effectiveFrom: string;
  effectiveTo: string;
  notes: string | null;
}

export interface CreatedByNavigation {
  id: string;
  code: string;
  permission: null;
  userName: string;
  loweredUserName: string;
  type: string;
  status: string;
  userNameRef: string;
}

export interface MedicalFacility {
  id: string;
  code: string;
  codeRef: string;
  shortName: string;
  name: string;
  address: string;
  providerType: string;
  email: null;
  phone: null;
  wardId: null;
  districtId: null;
  proviceId: null;
  proviceCode: null;
  countryId: null;
  taxCode: string;
  taxCodeExt: string;
  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  updatedBy: null;
  isInpatient: null;
  isOutpatient: null;
  isDental: null;
  nameUnsign: string;
}

export interface Member {
  parent: Parent;
  id: string;
  parentRelId: null;
  parentId: string;
  policyId: string;
  code: string;
  type: string;
  createdAt: Date;
  createdBy: string;
  updatedAt: null;
  updatedBy: null;
  timestamp: Date;
  status: string;
  policy: Policy;
}

export interface Parent {
  id: string;
  code: string;
  type: string;
  memberHists: Beneficiary[];
}

export interface Policy {
  id: string;
  code: string;
  codeRef: null;
  planValues: null;
  parentId: null;
  parentCode: null;
  sapId: null;
  source: string;
  transNo: number;
  type: string;
  customer: Customer;
  branchId: string;
  customerId: string;
  productId: string;
  createdAt: Date;
  createdBy: string;
  updatedAt: null;
  updatedBy: null;
  timestamp: Date;
  status: string;
  branch: Branch;
  idMemberhist: null;
  staff: Staff;
  saps: any[];
  notes: null;
}

export interface Branch {
  id: string;
  parentRef: null;
  parentId: null;
  code: string;
  codeSap: string;
  type: string;
  name: string;
  nameInfo: null;
  taxCode: null;
  address: null;
  phone: null;
  phone1: null;
  phone2: null;
  phone3: null;
  fax: null;
  email: null;
  userRefId: null;
  createdAt: string;
  createdBy: string;
  createdCode: null;
  updatedAt: null;
  updatedBy: null;
  status: string;
  shortName: string;
  parent: null;
}

export interface Customer {
  transNo: number;
  parentRef: null;
  policyRef: null;
  name1: null;
  code: string;
  idNo: string;
  id: string;
  policyId: null;
  type: string;
  effectiveTo: null;
  fax: null;
  emails: null;
  phone: null;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy: null;
  parentId: null;
  relationshipId: null;
  businessTypeId: null;
  parent: null;
  shortName: string;
  name: string;
  taxcode: string;
  address: null;
}

export interface Staff {
  id: string;
  code: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  companyId: string;
  companyRef: null;
  terminatedDt: null;
  createdAt: string;
  createdBy: string;
  updatedAt: null;
  updatedBy: null;
  status: string;
  policyCode: null;
}

export interface MemberHist {
  id: string;
  memberId: string;
  transNo: number;
  type: string;
  planId: string;
  planCode: string;
  planName: string;
  firstName: string;
  lastName: string;
  dob: string;
  citizenIdentity: null;
  address: null;
  phone: null;
  email: null;
  effectiveFrom: string;
  effectiveTo: string;
  terminalDate: null;
  createdAt: string;
  createdBy: string;
  updatedAt: null;
  updatedBy: null;
  timestamp: string;
  status: string;
  notes: null;
  originalEntryDt: string;
  plan: string;
}

export interface Plan {
  parentId: string;
  code: string;
  codeRef: null;
  sortOrder: number;
  productId: string;
  policyId: string;
  type: string;
  extInfo: null;
  createdAt: Date;
  createdBy: string;
  updatedAt: null;
  updatedBy: null;
  timestamp: Date;
  status: string;
  hospGuaCardTemplateId: string;
  id: string;
  totalPayroll: null;
  name: string;
  desc: null;
  effectiveFrom: Date;
  effectiveTo: Date;
}

export interface MedicalFacilityItem {
  id: string | null;
  code: string | null;
  codeRef: string | null;
  shortName: string | null;
  name: string | null;
  address: string | null;
  providerType: string | null;
  email: string | null;
  phone: string | null;
  wardId: string | null;
  districtId: string | null;
  proviceId: string | null;
  proviceCode: string | null;
  countryId: string | null;
  taxCode: string | null;
  taxCodeExt: string | null;
  createdAt: string | null;
  createdBy: string | null;
  updatedAt: string | null;
  updatedBy: string | null;
  isInpatient: string | null;
  isOutpatient: string | null;
  isDental: string | null;
  nameUnsign: string | null;
}

export interface MedicalListReponse {
  success: boolean;
  id: string;
  type: null;
  messages: any[];
  model: MedicalFacilityItem[];
  result: null;
  count: number;
  page: number;
  limit: number;
}

export interface ClaimMember {
  createdAt: string;
  effectiveTo: string;
  effectiveFrom: string;
  memberCode: string;
  status: string;
  memberName: string;
}

export interface MemberListRepsonse {
  success: boolean;
  id: string;
  type: any;
  messages: any[];
  model: ClaimMember[];
  result: any;
  count: number;
  page: number;
  limit: number;
}

export interface DownloadFileResponse {
  success: boolean;
  id: string;
  type: any;
  messages: any[];
  model: FileItem;
  result: any;
  count: number;
  page: number;
  limit: number;
}

export interface FileItem {
  id: string;
  policyId: null;
  policyHistId: null;
  relatedId: string;
  typeCode: null;
  relatedObject: string;
  type: string;
  descType: null;
  typeName: null;
  fileName: string;
  ext: string;
  code: string;
  name: string;
  desc: string;
  extInfo: null;
  file: string;
  createdAt: string;
  createdBy: string;
  updatedAt: null;
  updatedBy: null;
  timestamp: string;
  status: string;
  numOfExport: null;
  policyHists: any[];
}

export interface Document {
  id: string;
  policyId: null;
  policyHistId: null;
  relatedId: string;
  typeCode: null;
  relatedObject: string;
  type: string;
  descType: null;
  typeName: null;
  fileName: string;
  ext: string;
  code: string;
  name: string;
  desc: string;
  extInfo: null | string;
  file: null | string;
  createdAt: Date;
  createdBy: string;
  updatedAt: null;
  updatedBy: null;
  timestamp: Date;
  status: string;
  numOfExport: null;
  policyHists: any[];
  policyHist: null;
  related2: null;
}
export interface BankAccount {
  id: string;
  beneficiaryId: string;
  bankName: string;
  accountNo: string;
  createdAt: Date;
  createdBy: string;
  updatedAt: null | string;
  updatedBy: null | string;
  status: string;
  accountName: null | string;
  beneficiary: null | string;
}

export const RelationshipStatus = {
  EMPLOYEE: "000",
  EMPLOYEE_OR_BENEFICIARY: "Q001",
  CHILDREN: "Q002",
  SPOUSES: "Q003",
  WIFE_PARENTS: "Q004",
  HUSBAND_PARENTS: "Q005",
  RELATIVES: "Q006",
  PARENTS: "Q007",
  PARENTS_2: "Q008",
  PARENTS_OR_SPOUSES: "Q009",
  SIBLINGS: "Q010",
  GRANDPARENTS: "Q011",
  CLOSE_RELATIVES: "Q012",
} as const;
export type RelationshipStatus =
  (typeof RelationshipStatus)[keyof typeof RelationshipStatus];

export type ClaimPayload = {
  Act: number;
  UpdateBenenfit: number;
  PolicyNo: string;
  MemberBeneficialId: string;
  Language: string;
  BankName: string;
  BeneficialRelationship: string;
  Phone: string;
  Email: string;
  CitizenIdentity: string;
  AccountNo: string;
  Id: string;
  Type: string;
  MemberId: string;
  MemberHistId: string;
  BranchMainId: string;
  BranchHandlerId: string;
  Diagnostics: string;
  CreatedBy: string;
  MedicalFacilityId: string;
  TreatmentType: string;
  TreatmentAdmissionDate: string;
  DischargeDate: string;
  RequestAmount: number;
  CurrencyUnit: string;
  PaymentMethod: string;
  InsuredEventDate: string;
  RequestorId: string;
  BeneficiaryId: string;
  UpdatedBy: string;
  Notes: string | null;
  Status: string;
  ContactEmail: string;
  ContactPhone: string;
  Version: number;
};

export const TreatmentType = {
  INPATIENT: "I",
  OUTPATIENT: "O",
  ACCIDENT: "A",
  DENTAL: "D",
} as const;
export type TreatmentType = (typeof TreatmentType)[keyof typeof TreatmentType];

export interface UpdateClaimResponse {
  success: boolean;
  id: string;
  type: null;
  messages: any[];
  model: UpdateClaimValue;
  result: null;
  count: number;
  page: number;
  limit: number;
}

export interface UpdateClaimValue {
  userFilter: null;
  isCheck: null;
  isWarning: null;
  provideCode: null;
  effectiveFrom: null;
  effectiveTo: null;
  isSync: boolean;
  createdByAddId: null;
  claims: null;
  userAdds: any[];
  codeRefund: null;
  claimIntiNoRef: null;
  accountNamePA: null;
  isDocumentsReceived: null;
  act: number;
  currentId: null;
  isAdmin: boolean;
  otp: null;
  isClaim: null;
  limit: number;
  page: number;
  order: null;
  isUpdateBenenfit: boolean;
  addBenefitDocumentIds: null;
  additionalDocumentIds: null;
  delBenefitDocumentIds: null;
  delFileOtherDocumentIds: null;
  delFileInvoiceDocumentIds: null;
  updateBenenfit: number;
  policyNo: string;
  medicalFacility: null;
  is_InsuredBenefit: null;
  beneficyName: null;
  memberBeneficialId: string;
  branchCode: null;
  medicalFacilityCode: null;
  language: string;
  bankName: string;
  beneficiaryIdentifier: null;
  relationship: null;
  relationshipMember: null;
  beneficialRelationship: string;
  phone: string;
  email: string;
  bankAccount: null;
  citizenIdentity: string;
  accountNo: string;
  documentBeneficialName: null;
  documentBeneficialId: null;
  documentInsuredName: null;
  documentInsuredId: null;
  isBeneficial: boolean;
  memberInsuredId: null;
  relationships: any[];
  treatmentForms: any[];
  currencies: any[];
  typeClaimDeclare: null;
  companies: null;
  documentTypes: null;
  claimTypes: null;
  diagnos: null;
  paymentmethods: any[];
  medicalFacilities: any[];
  bankAccounts: any[];
  chooseMemberBenefits: any[];
  fileOther: null;
  fileBeneficial: null;
  fileInsured: null;
  fileInvoice: null;
  selectedUsername: null;
  policy: null;
  isPreventTTBT: boolean;
  id: string;
  parentId: null;
  paymentVerificationId: null;
  code: null;
  typeCode: null;
  type: string;
  codeRef: null;
  memberId: string;
  memCode: null;
  memName: null;
  rejectionNotesExt: null;
  memPhone: null;
  requestorRel: null;
  memBirthday: null;
  memidentity: null;
  memberHistId: string;
  memberHist: null;
  branchMainId: string;
  branchHandlerId: string;
  coreCreatedCode: null;
  finalHandlerCode: null;
  coreCreatedAt: null;
  finalTransferHandlerAt: null;
  source: null;
  sourceApi: string;
  diagnostics: string;
  createdAt: Date;
  createdTo: null;
  createdFrom: null;
  sendTo: null;
  sendFrom: null;
  createdBy: string;
  initialRecipientBy: null;
  finalHandlerBy: null;
  medicalFacilityId: string;
  treatmentType: string;
  treatmentAdmissionDate: Date;
  admissionDate: null;
  treatmentDate: null;
  dischargeDate: Date;
  requestAmount: number;
  currencyUnit: string;
  paymentMethod: string;
  insuredEventDate: Date;
  dateOfLoss: null;
  requestorId: string;
  rejectionNotes: null;
  isOwner: null;
  rejectedAt: null;
  rejectedBy: null;
  beneficiaryId: string;
  bankAccountId: null;
  sentBy: null;
  sentAt: null;
  updatedAt: null;
  updatedBy: string;
  recipientAt: null;
  recipientBy: null;
  recipientCode: null;
  notes: string;
  timestamp: Date;
  version: number;
  createdCode: null;
  status: string;
  statusName: null;
  paAmount: null;
  extInfo: null;
  statusAdmin: null;
  documents: any[];
  documentBeneficial: any[];
  beneficiary: null;
  createdByNavigation: null;
  finalHandlerByNavigation: null;
  memberBenefits: null;
  member: null;
  addittionalNotices: null;
  contactEmail: string;
  contactPhone: string;
  invoices: null;
  historyStatuses: any[];
  finalTransferHandledAt: null;
  coreCreatedBy: null;
  coreCreatedByNavigation: null;
}

export interface DeleteClaimResponse {
  success: boolean;
  id: string;
  type: null | string;
  messages: Message[];
  model: any;
  result: any;
  count: number;
  page: number;
}

export interface Message {
  type: string;
  code: any;
  message: string;
}

export interface PrintPDFResponse {
  success: boolean;
  id: string;
  type: null;
  messages: any[];
  model: PrintModel;
  result: null;
  count: number;
  page: number;
  limit: number;
}

export interface PrintModel {
  additionalDocuments: null;
  isDocument: null;
  relatedId: null;
  isGetData: boolean;
  savePathLocal: null;
  mailReq: null;
  isUpdateReject: boolean;
  isUpdateAdditonalDocument: boolean;
  claimDeclare: null;
  code: string;
  templateCode: null;
  typeSendInfor: null;
  resendTemplateEmailCode: null;
  templateEmailId: null;
  templateSubject: null;
  content: null;
  otpCode: null;
  claimIntiId: string;
  claimId: null;
  data: string;
  stringData: string;
  fileName: string;
  confirmOtpNow: boolean;
  pathFile: string;
  to: null;
  cc: null;
  idDocuments: null;
  idDocumentAddtions: null;
  language: string;
  isSaveDocument: null;
  rejectionNotes: null;
  rejectionNotesExt: string;
  sendAdditionalDocuments: null;
  currentUserId: null;
  isSign: boolean;
  genPDF: null;
  isSendMailOnly: boolean;
  rejectNoteLDNV: null;
  isRejectClaim: null;
}
