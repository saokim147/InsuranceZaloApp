import { STATUS_COLOR_MAP } from "@/types/record";
import { Badge } from "../ui/badge";
import { getStatusDescription } from "@/utils/common";

export default function BadgeStatus({ status }: { status: string }) {
  const color = STATUS_COLOR_MAP[getStatusDescription(status)];
  return (
    <Badge className={`text-white ${color}`}>
      {getStatusDescription(status)}
    </Badge>
  );
}
