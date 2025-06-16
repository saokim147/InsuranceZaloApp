import { HospitalsResponse } from "@/types/hospitalType";
import { Box, List } from "zmp-ui";
import CardHospitalHorizontal from "./card-hospital-horizontal";
import { ZMPNavigationFunction } from "zmp-ui/useNavigate";

function HospitalList({
  items,
  navigation,
}: {
  items: HospitalsResponse;
  navigation: ZMPNavigationFunction;
}) {
  if (!items || items.data.length === 0) {
    return <div>No hospitals available</div>;
  }
  return (
    <Box px={5}>
      <List>
        {items?.data.map((hospital) => (
          <CardHospitalHorizontal
            key={hospital.hospitalId}
            hospital={hospital}
            navigation={navigation}
          />
        ))}
      </List>
    </Box>
  );
}
export default HospitalList;
