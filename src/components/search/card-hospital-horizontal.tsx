import { hospital } from "@/types/hospitalType";
import { isNullOrEmpty } from "@/utils/common";
import { ChevronRight, MapPin, PhoneCall } from "lucide-react";
import { Box, Center } from "zmp-ui";
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
    <Box
      flex
      flexDirection="row"
      alignItems="center"
      p={3}
      mb={3}
      className="rounded-md border border-border"
    >
      <Box className="flex-1" mt={2}>
        <h2 className="text-lg font-semibold mt-1">{hospital.hospitalName}</h2>
        <div className="text-gray-400 flex gap-2">
          {!isNullOrEmpty(hospital.phoneNumber) ? (
            <>
              <span className="items-center flex ">
                <PhoneCall size={17} className="font-semibold" />
              </span>
              <div className="font-semibold">{hospital.phoneNumber}</div>
            </>
          ) : (
            <></>
          )}
        </div>
        <Box className="text-teal-700 gap-1" mt={2} flex flexDirection="row">
          <span className="items-start flex">
            <MapPin size={17} />
          </span>
          {hospital.hospitalAddress}
        </Box>
      </Box>
      <Box
        mx={1}
        role="button"
        flex
        onClick={() =>
          navigation("/detail", {
            state: { hospital: hospital },
            direction: "forward",
          })
        }
      >
        <ChevronRight size={17} />
      </Box>
    </Box>
  );
}

export default CardHospitalHorizontal;
