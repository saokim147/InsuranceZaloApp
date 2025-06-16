import { ImageType } from "zmp-ui/image-viewer";

export type AppProfile = {
  dateOfBirth: string;
  userId: string;
  phoneNumber: string;
  email: string;
};

export interface UserProfile {
  dob: string;
  userId: string;
  phone: string;
  email: string;
}
export interface LoginResponse {
  success: boolean;
  messages: any[];
  model: Model[];
  result: null;
  count: number;
  page: number;
  limit: number;
}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
  tokenExpireAt: string;
  refreshTokenAt: string;
}

export interface SigninResponse {
  id: string;
  agentRootId: string;
  name: string;
  permission: null;
  type: null;
  username: string;
  token: string;
  refreshToken: string;
  refreshTokenExpired: string;
  refreshAllowedTimeStart: string;
  tokenExpired: string;
  statusUser: null;
  success: boolean;
  messages: any[];
}

export type userPhoneNumberResponse = {
  data: {
    number: string;
  };
  error: string;
  message: string;
};

export type userLocationResponse = {
  data: {
    provider: string;
    latitude: string;
    longitude: string;
    timestamp: string;
  };
  error: number;
  message: string;
};

export interface RefreshTokenResponse {
  id: string;
  agentRootId: string;
  name: null;
  permission: null;
  type: null;
  username: null;
  token: string;
  refreshToken: string;
  refreshTokenExpired: string;
  refreshAllowedTimeStart: string;
  tokenExpired: string;
  statusUser: null;
  success: boolean;
  messages: any[];
}

export interface Model {
  id: string;
  code: string;
  keyApp: null;
  permission: string;
  userName: string;
  loweredUserName: string;
  passwordSalt: null;
  password1: null;
  passwordOld: null;
  type: string;
  branchCode: null;
  status: string;
  userNameRef: string;
  isCommit: boolean;
  language: string;
  createdBy: string;
  createdAt: Date;
  passwords: null;
  userProfiles: UserProfile[];
  applications: any[];
  membersInUser: null;
  groups: any[];
  roles: any[];
  companies: any[];
}

export interface LocationResposne {
  data: Data;
  error: number;
  message: string;
}

export interface Data {
  provider: string;
  latitude: string;
  timestamp: string;
  longitude: string;
}
export interface ImageExtType extends ImageType {
  description: string;
}

export interface MemberDetailResponse {
  success: boolean;
  id: string;
  type: null;
  messages: any[];
  model: MemberDetailItem[];
  result: null;
  count: number;
  page: number;
  limit: number;
}

export interface MemberDetailItem {
  id: string;
  memberId: null | string;
  claimIntiId: null | string;
  userId: null | string;
  relatedId: null | string;
  parentId: string;
  fullname: null | string;
  policyId: string;
  policyNo: string;
  policyHolder: string;
  branchId: string;
  branchName: string;
  code: string;
  type: string;
  createdAt: string;
  createdBy: string;
  updatedAt: null;
  updatedBy: null;
  timestamp: Date;
  status: string;
  order: null | string;
  page: number;
  updateBenenfit: number;
  limit: number;
  beneficiaryId: null | string;
  beneficyName: null | string;
  paymentMethod: null | string;
  beneficyBankName: null | string;
  beneficyBankAccount: null | string;
  beneficiaryIdentifier: null | string;
  documentInsuredId: string;
  documentInsuredName: null;
  memberInsuredId: string;
  memberInsuredRelationship: string;
  isOwner: boolean;
  beneficialRelationship: null | string;
  documentBeneficialId: string;
  documentBeneficialName: null;
  isBeneficial: boolean;
  memberBeneficialId: string;
  memberHists: Info[];
  documents: null;
  users: any[];
  isUpdateBenenfit: boolean;
  contactEmail: null | string;
  memberMain: null;
  contactPhone: null;
  citizenIdentity: null;
  policyHistId: null;
  memberIds: null;
  info: Info;
  isDeleted: null;
  parent: null;
  memberRequestRegister: null;
  isCardBLVP: null;
  isSTBH: null;
  cardHospitalId: null;
  policy: null;
  policyHistHist: null;
  membersInUsers: MembersInUser[];
  memberRelsInMembers: any[];
  salaries: any[];
  memberRel: MemberRel;
  empCode: string;
}

export interface Info {
  id: string;
  memberId: string;
  transNo: number;
  type: null | string;
  firstName: null | string;
  lastName: null | string;
  planId: null | string;
  terminalDate: null;
  createdAt: string;
  createdBy: string;
  updatedAt: null;
  updatedBy: null;
  timestamp: Date;
  status: null | string;
  plan: null;
  policyHist: null;
  grossLcPremium: number | null;
  grossFcPremium: number | null;
  salary: null;
  isVip: null;
  chngEffFmDt: null;
  policyHistId: null | string;
  citizenIdentity: null | string;
  phone: null | string;
  email: null | string;
  gender: null | string;
  dob: string;
  address: null | string;
  relationship: null | string;
  nationality: null;
  originalEntryDt: Date | null;
  effectiveFrom: string;
  effectiveTo: null | string;
  notes: null;
}

export interface MemberRel {
  id: string;
  memberId: string;
  relatedId: string;
  relationship: null;
  related: null;
  info: Info;
}

export interface MembersInUser {
  id: string;
  userId: string;
  memberId: string;
  relationship: string;
  otherRelationship: null | string;
  contactEmail: string;
  contactPhone: string;
  timestamp: Date;
  status: string;
}

export interface OtpResponse {
  success: boolean;
  id: string;
  type: null;
  messages: any[];
  model: OtpModel;
  result: null;
  count: number;
  page: number;
  limit: number;
}

export interface OtpModel {
  id: string;
  templateType: string;
  relatedId: string;
  code: string;
  relatedObject: string;
  language: string;
  codeRecord: null;
  type: string;
  relatedType: string;
  createdAt: Date;
  createdBy: string;
  sendType: string;
  phone: string;
  email: string;
  confirmedAt: null;
  expiredAt: Date;
  status: string;
  applicationId: string;
}

export interface CheckOtpResponse {
  success: boolean;
  id: string;
  type: null;
  messages: any[];
  model: CheckOtpModel;
  result: null;
  count: number;
  page: number;
  limit: number;
}

export interface CheckOtpModel {
  id: string;
  templateType: string;
  relatedId: string;
  code: string;
  relatedObject: string;
  language: null;
  codeRecord: null;
  type: null;
  relatedType: string;
  createdAt: Date;
  createdBy: string;
  sendType: string;
  phone: string;
  email: string;
  confirmedAt: Date;
  expiredAt: Date;
  status: string;
  applicationId: string;
}
