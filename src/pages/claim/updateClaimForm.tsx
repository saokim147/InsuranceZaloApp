import { Box, Header, Page, useLocation, Text, useNavigate } from "zmp-ui";
import { ClaimFormType } from "@/schema";
import { updateClaim } from "@/api/claimApi";
import { useState } from "react";
import { convertToClaimPayload } from "@/utils/common";
import { Textarea } from "@/components/ui/textarea";
import { chooseImage } from "zmp-sdk";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { FileItem } from "@/components/claim/fileItem";

export default function UpdateClaimFormPage() {
  const location = useLocation();
  const navigation = useNavigate();
  const formData = location.state.formData as ClaimFormType;
  const claimId = location.state.claimId as string;
  const [diagnosis, setDiagnosis] = useState("");
  const [files, setFiles] = useState<{ file: File }[]>(formData.documents);

  const handleAddFiles = async () => {
    const { tempFiles } = await chooseImage({
      count: 5,
      cameraType: "back",
      sourceType: ["album", "camera"],
    });

    if (tempFiles && tempFiles.length > 0) {
      const newFiles = await Promise.all(
        tempFiles.map(async (temp) => {
          const res = await fetch(temp.path);
          const blob = await res.blob();
          const date = Date.now().toString();
          const uploadedFile = new File([blob], `Upload-${date}.jpg`, {
            type: blob.type,
          });
          return {
            file: uploadedFile,
          };
        })
      );
      setFiles(newFiles);
    }
  };
  const remove = (indexToRemove: number) => {
    setFiles((prevFiles) =>
      prevFiles.filter((_, index) => index !== indexToRemove)
    );
  };

  return (
    <Page className="bg-gray-100 flex flex-col">
      <Header
        title="Hồ sơ bồi thường"
        backgroundColor="#e92020"
        textColor="white"
        style={{ position: "sticky" }}
      />
      <Box mt={2} p={6} className="bg-white rounded-lg shadow-sm flex-1">
        <Box mt={2}>
          <Text size="small">Chẩn đoán</Text>
          <Textarea
            className="mt-2"
            onChange={(e) => setDiagnosis(e.target.value)}
          />
        </Box>
        <Box flex flexDirection="column" mt={2}>
          <h1 className="font-bold">Chứng từ khác</h1>
          <Button
            className="bg-blue-500 mt-2 hover:bg-blue-500"
            onClick={handleAddFiles}
          >
            <Upload className="text-white" onClick={handleAddFiles} />
            Thêm File
          </Button>
        </Box>

        <Box mt={2} flex flexDirection="column">
          {files.map((doc, index) => (
            <FileItem key={index} index={index} remove={remove} doc={doc} />
          ))}
        </Box>

        <Box mt={2}>
          <Button
            onClick={async () => {
              const claimPayload = convertToClaimPayload(formData);
              claimPayload.Diagnostics = diagnosis;
              const updatedFiles = formData.documents.map(
                (doc: { file: File }) => doc.file
              );
              const response = await updateClaim(claimPayload, updatedFiles);
              if (response.success) {
                navigation("/claimDetail", {
                  direction: "backward",
                  state: {
                    claimId: claimId,
                    isSuccessfulUpdate: true,
                  },
                });
              }
            }}
          >
            Thêm
          </Button>
        </Box>
      </Box>
    </Page>
  );
}
