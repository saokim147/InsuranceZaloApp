export const OperationType = {
  CREATE: 0,
  UPDATE: 1,
};

export type OperationType = (typeof OperationType)[keyof typeof OperationType];

const Status = {
  I: "I", // Đã nhận
  PD: "PD", // Chờ bổ sung chứng từ
  MAP: "MAP", // Đang xử lý
  PI: "PI", // Đang xử lý
  A: "A", // Đang xử lý
  C: "C", // Đã hủy
  AA: "AA", // Đang xử lý
  AR: "AR", // Đang xử lý
  RO: "RO", // Đang xử lý
  R: "R", // Đã hủy
  CC: "CC", // Đang xử lý
  DE: "DE", // Hủy
  IAD: "IAD", // Đã bổ sung chứng từ
  IPD: "IPD", // Chờ bổ sung chứng từ
  NE: "NE", // Đã tạo
  SU: "SU", // Đã nộp
  AD: "AD", // Đã bổ sung chứng từ
  DR: "DR", // Đã nhận
  OD: "OD", // Chờ bổ sung chứng từ
  IOD: "IOD", // Chờ bổ sung chứng từ
  PL: "PL", // Đang xử lý
  RA: "RA", // Đã duyệt
  RR: "RR", // Đã duyệt
  PP: "PP", // Đã duyệt
  CL: "CL", // Đang xử lý
  IO: "IO", // Đang xử lý
  RCI: "RCI", // Đã hủy
  RRI: "RRI", // Từ chối
  PLL: "PLL", // Đang xử lý
  RCL: "RCL", // Đã hủy
  RRC: "RRC", // Từ chối
  WC: "WC", // Ghi nhận vào hệ thống core
} as const;

export type Status = (typeof Status)[keyof typeof Status];

const ClaimItemType = {
  CLI: "CLI",
  CLM: "CLM",
} as const;

export type ClaimItemType = (typeof ClaimItemType)[keyof typeof ClaimItemType];
