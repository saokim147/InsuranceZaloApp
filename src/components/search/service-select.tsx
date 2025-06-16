import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Box } from "zmp-ui";

export default function ServiceSelect({
  onSelect,
}: {
  onSelect: (value: string) => void;
}) {
  return (
    <Box mt={2}>
      <Label htmlFor="service-select">Dịch vụ</Label>
      <div id="service-select">
        <Select onValueChange={onSelect}>
          <SelectTrigger className="w-[200px]  mt-1 border border-border">
            <SelectValue placeholder="Chọn danh sách" />
          </SelectTrigger>
          <SelectContent className="w-[200px]  border-gray-200">
            <SelectItem value="false">Có Bảo lãnh viện phí</SelectItem>
            <SelectItem value="true">Không Bảo Lãnh viện phí</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </Box>
  );
}
