// Supported Blob MIME types
export const BlobMimeType = {
  JPEG: "image/jpeg",
  PNG: "image/png",
  PDF: "application/pdf",
  SVG: "image/svg+xml",
} as const;

export type BlobMimeType = (typeof BlobMimeType)[keyof typeof BlobMimeType];

export const DocumentType = {
  FILE: "OT",
  INVOICE: "IV",
} as const;

export type DocumentType = (typeof DocumentType)[keyof typeof DocumentType];
