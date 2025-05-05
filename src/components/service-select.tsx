import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

function ServiceSelect({ onSelect }: { onSelect: (value: string) => void }) {
  return (
    <>
      <Label htmlFor="service-select">Dịch vụ</Label>
      <div id="service-select" className="mt-1">
        <Select onValueChange={onSelect}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Chọn danh sách" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="false">Có Bảo lãnh viện phí</SelectItem>
            <SelectItem value="true">Không Bảo Lãnh viện phí</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </>
  );
}

export default ServiceSelect;
