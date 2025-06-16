export const PAGE_SIZE = 5;
export const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

// đang xử lý
export const PROCESSING_STATUS =
  "ICLI | ICLM | MAPCLI | MAPCLM | PICLI | PICLM | ACLI | ACLM | AACLI | AACLM | ARCLI | ARCLM | ROCLI | ROCLM | CCCLI | CCCLM | PLCLI | PLCLM | CLCLI | CLCLM | IOCLI | IOCLM | PLLCLI | PLLCLM";

// chờ bổ sung chứng từ
export const PENDING_DOCUMENT_STATUS =
  "PDCLI|PDCLM|IPDCLI|IPDCLM|ODCLI|ODCLM|IODCLI|IODCLM";

// đã nhận
export const RECEIVED_STATUS = "ICLI|ICLM|DRCLI|DRCLM";

// đã bổ sung chứng từ
export const DOCUMENT_ADDED_STATUS = "IADCLI|IADCLM|ADCLI|ADCLM";

// đã tạo
export const CREATED_STATUS = "NECLI|NECLM";

// đã nộp
export const SUBMITTED_STATUS = "SUCLI|SUCLM";

// đã duyệt
export const APPROVED_STATUS = "RACLI|RACLM|RRCLI|RRCLM|PPCLI|PPCLM";

// đã hủy
export const CANCELED_STATUS =
  "CCLI|CCLM|RCLI|RCLM|RCICLI|RCICLM|RCLCLI|RCLCLM";

// hủy
export const DELETED_STATUS = "DECLI|DECLM";

// từ chối
export const REJECTED_STATUS = "RRICLI|RRICLM|RRCCLI|RRCCLM";

// ghi nhận vào hệ thống core
export const CORE_SUBMITTED_STATUS = "WCCLI|WCCLM";
// đang ghi nhận vào hệ thống core
export const CORE_PROCESSING_STATUS = "PWPCLI|PWPCLM";
// đã thanh toán
export const PAID_STATUS = "";
