import { Button } from "@/components/ui/button";
import { Upload, XIcon } from "lucide-react";
import { useState } from "react";
import { chooseImage } from "zmp-sdk/apis";
import Box from "zmp-ui/box";
export default function TestPage() {
  const [fileList, setFileList] = useState<string[]>([]);
  return (
    <Box
      mt={5}
      p={6}
      className="bg-white rounded-lg outline-1 outline-neutral-200 outline-double h-screen"
    >
      <h1 className="font-bold">Chứng từ quan hệ với người thụ hưởng</h1>
      <Box flex flexDirection="row" alignItems="center">
        <Button
          className="bg-blue-500 mt-2 hover:bg-blue-500"
          onClick={async () => {
            const { filePaths } = await chooseImage({
              count: 1,
              cameraType: "back",
              sourceType: ["album", "camera"],
            });
            if (filePaths && filePaths.length > 0) {
              setFileList(filePaths);
            }
          }}
        >
          <Upload className="text-white" />
          Thêm
        </Button>
        <Box mt={2} flex flexDirection="column">
          {fileList.map((file, index) => (
            <Box key={index} mt={2} className="gap-2" flexDirection="row">
              <img src={file} alt={`Uploaded file ${index + 1}`} />
              <Button size="icon" className="bg-red-500 ">
                <XIcon />
              </Button>
            </Box>
          ))}
        </Box>
      </Box>
      <h1 className="font-bold mt-2">Hồ sơ bồi thường</h1>
      <Button className="bg-blue-500 hover:bg-blue-600 mt-2" size="icon">
        <Upload
          className="text-white"
          onClick={async () => {
            const { filePaths } = await chooseImage({
              count: 1,
              cameraType: "back",
              sourceType: ["album", "camera"],
            });
            if (filePaths && filePaths.length > 0) {
              setFileList(filePaths);
            }
          }}
        />
      </Button>
      <Box mt={2} flex flexDirection="column">
        {fileList.map((file, index) => (
          <Box key={index} mt={1} className="gap-2" flexDirection="row">
            <img src={file} alt={`Uploaded file ${index + 1}`} />
            <Button size="icon" className="bg-red-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="size-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </Button>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
