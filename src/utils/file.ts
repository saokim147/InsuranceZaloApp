import { FILE_MAP } from "@/types/record";

export function convertBase64ToFileUrl(str: string, ext: string): string {
  const byteCharacters = atob(str);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  return URL.createObjectURL(new Blob([byteArray], { type: FILE_MAP[ext] }));
}

export function convertBase64toFile(
  str: string,
  filename: string,
  ext: string
): File {
  const byteCharacters = atob(str);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  return new File([byteArray], filename, {
    type: FILE_MAP[ext],
  });
}

export function getFileExtension(fileName: string): string {
  return fileName.split(".").pop()?.toLowerCase() ?? "";
}
