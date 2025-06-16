import { Plus } from "lucide-react";
import { Button } from "./button";

export default function FloatingActionButton({onClick}: {onClick: () => void}) {
  return <div
  style={{
    position: "fixed",
    bottom: 100,
    right: 16,
    zIndex: 100,
  }}
>
  <Button
    onClick={() =>onClick()}
    className="rounded-full size-12"
  >
    <Plus/>
  </Button>
</div>;
}