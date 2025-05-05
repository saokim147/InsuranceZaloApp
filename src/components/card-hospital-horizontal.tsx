import { hospital } from "@/types/hospital";
import { ArrowRight } from "lucide-react";
import { Box } from "zmp-ui";
import { ZMPNavigationFunction } from "zmp-ui/useNavigate";
// 12.6
interface CardHospitalHorizontalProps {
  hospital: hospital;
  navigation: ZMPNavigationFunction;
}

function CardHospitalHorizontal({
  hospital,
  navigation,
}: CardHospitalHorizontalProps) {
  return (
    <div className="flex flex-row items-center bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="flex-1">
        <h2 className="text-lg font-semibold">{hospital.hospitalName}</h2>
        <p className="text-gray-600">{hospital.hospitalAddress}</p>
        <p className="text-gray-600">{hospital.phoneNumber}</p>
      </div>
      <Box
        mx={2}
        flex
        justifyContent="center"
        alignItems="center"
        role="button"
        onClick={() =>
          navigation("/detail", { state: { hospital }, direction: "forward" })
        }
      >
        <ArrowRight size={20} className="text-red-500"></ArrowRight>
      </Box>
    </div>
  );
}

export default CardHospitalHorizontal;
