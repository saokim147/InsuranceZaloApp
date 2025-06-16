import { RelationshipStatus, TreatmentType } from "./claimType";
import { BlobMimeType } from "./fileType";
export const RELATIONSHIP_MAP: Record<RelationshipStatus, string> = {
  [RelationshipStatus.EMPLOYEE]: "Nhân viên",
  [RelationshipStatus.EMPLOYEE_OR_BENEFICIARY]: "Nhân Viên/NĐBH",
  [RelationshipStatus.CHILDREN]: "Con",
  [RelationshipStatus.SPOUSES]: "Vợ/Chồng",
  [RelationshipStatus.WIFE_PARENTS]: "Bố Mẹ Vợ",
  [RelationshipStatus.HUSBAND_PARENTS]: "Bố Mẹ Chồng",
  [RelationshipStatus.RELATIVES]: "Cô, Dì, Chú Bác, Anh, Chị Em",
  [RelationshipStatus.PARENTS]: "Bố Mẹ",
  [RelationshipStatus.PARENTS_2]: "Bố Mẹ",
  [RelationshipStatus.PARENTS_OR_SPOUSES]: "Bố Mẹ Vợ-Chồng",
  [RelationshipStatus.SIBLINGS]: "Anh/Chị/Em ruột",
  [RelationshipStatus.GRANDPARENTS]: "Ông Bà Nội/Ngoại Ruột",
  [RelationshipStatus.CLOSE_RELATIVES]: "Người thân",
};

export const FILE_MAP: Record<string, BlobMimeType> = {
  jpeg: BlobMimeType.JPEG,
  jpg: BlobMimeType.JPEG,
  png: BlobMimeType.PNG,
  pdf: BlobMimeType.PDF,
  svg: BlobMimeType.SVG,
};

export const STATUS_MAP: Record<string, string> = {
  I: "Đã nhận",
  PD: "Chờ bổ sung chứng từ",
  MAP: "Đang xử lý",
  PI: "Đang xử lý",
  A: "Đang xử lý",
  C: "Đã hủy",
  AA: "Đang xử lý",
  AR: "Đang xử lý",
  RO: "Đang xử lý",
  R: "Đã hủy",
  CC: "Đang xử lý",
  DE: "Hủy",
  IAD: "Đã bổ sung chứng từ",
  IPD: "Chờ bổ sung chứng từ",
  NE: "Đã tạo",
  SU: "Đã nộp",
  AD: "Đã bổ sung chứng từ",
  DR: "Đã nhận",
  OD: "Chờ bổ sung chứng từ",
  IOD: "Chờ bổ sung chứng từ",
  PL: "Đang xử lý",
  RA: "Đã duyệt",
  RR: "Đã duyệt",
  PP: "Đã duyệt",
  CL: "Đang xử lý",
  IO: "Đang xử lý",
  RCI: "Đã hủy",
  RRI: "Từ chối",
  PLL: "Đang xử lý",
  RCL: "Đã hủy",
  RRC: "Từ chối",
  PWP: "Đang ghi nhận vào hệ thống core",
  WC: "Ghi nhận vào hệ thống core",
};

export const TREATMENT_TYPE_MAP: Record<TreatmentType, string> = {
  [TreatmentType.ACCIDENT]: "Tai Nạn",
  [TreatmentType.DENTAL]: "Nha sĩ",
  [TreatmentType.INPATIENT]: "Nội Khoa",
  [TreatmentType.OUTPATIENT]: "Ngoại Khoa",
};

export const STATUS_COLOR_MAP: Record<string, string> = {
  "Đang xử lí": "bg-blue-500",
  "Đã hủy": "bg-red-500",
  "Đã duyệt": "bg-green-500",
  "Đã nhận": "bg-yellow-500",
  "Đã tạo": "bg-violet-500",
  "Đã nộp": "bg-fuchsia-500",
  "Đã bổ sung chứng từ": "bg-sky-500",
  "Chờ bổ sung chứng từ": "bg-orange-500",
  "Đang ghi nhận vào hệ thống core": "bg-teal-500",
};
