import { FileItemProps } from "@/types/uiType";
import { Button } from "../ui/button";
import { XIcon } from "lucide-react";
import { Box } from "zmp-ui";
import { ImageIcon } from "../icons/imageIcon";

export const FileItem = ({ index, remove, doc }: FileItemProps) => {
  return (
    <Box
      key={index}
      mt={2}
      className="items-center justify-between p-2.5 bg-secondary/30 hover:bg-secondary/60 rounded-md shadow-sm m-1 transition-colors"
      flexDirection="row"
    >
      <ImageIcon />
      <div className="flex justify-center h-full mt-2">
        <p className="text-base font-semibold">{doc.file.name}</p>
      </div>
      <Button
        size="icon"
        type="button"
        variant="ghost"
        onClick={() => remove(index)}
      >
        <XIcon />
      </Button>
    </Box>
  );
};
