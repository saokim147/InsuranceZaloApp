import { useEffect, useState } from "react";
import Map, { Marker, NavigationControl, Popup } from "react-map-gl/maplibre"; // Corrected import
import "maplibre-gl/dist/maplibre-gl.css";
import { useQuery } from "@tanstack/react-query";
import { getNearbyHospitals } from "@/api/mapApi";
import { coordinate, MapItem } from "@/types/mapType";
import { Box, Page } from "zmp-ui";
import MarkerIcon from "@/components/marker";
import { Spinner } from "@/components/ui/spinner";
import { getUserLocationCoordinate } from "@/api/userApi";

function MapPage() {
  const [selectedHospital, setSelectedHospital] = useState<MapItem | null>(
    null
  );
  const [userLocation, setUserLocation] = useState<coordinate>({
    latitude: "10.816",
    longitude: "106.7035",
  });
  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const userLocation = await getUserLocationCoordinate();
        setUserLocation(userLocation);
      } catch (err) {
        console.log("Error getting location: ", err);
      }
    };
    fetchLocation();
  }, []);
  const { data, isLoading } = useQuery({
    queryKey: ["mapList", userLocation],
    queryFn: () =>
      getNearbyHospitals(
        parseFloat(userLocation.longitude),
        parseFloat(userLocation.latitude),
        5
      ),
  });
  useEffect(() => {
    if (data) {
      console.log("Map data loaded :", data);
    }
  }, [data]);

  if (isLoading)
    return (
      <Box
        flex
        alignItems="center"
        justifyContent="center"
        className="h-screen"
      >
        <Spinner />
      </Box>
    );

  return (
    <Page className="mb-2">
      <Map
        initialViewState={{
          longitude: parseFloat(userLocation.longitude),
          latitude: parseFloat(userLocation.latitude),
          zoom: 14,
        }}
        style={{ height: "100vh" }}
        mapStyle="https://api-uat-ibmi.baominh.vn:8500/insurance/static/map/style.json"
      >
        {" "}
        <NavigationControl
          position="bottom-right"
          style={{ marginBottom: 80 }}
        />
        {/* User location marker */}
        <Marker
          longitude={parseFloat(userLocation.longitude)}
          latitude={parseFloat(userLocation.latitude)}
        >
          <div
            className="size-5 bg-blue-500 rounded-full border-2 border-white shadow-lg"
            title="Your location"
          />
        </Marker>
        {data?.hospitals.map((hospital, index) => (
          <Marker
            key={index}
            longitude={hospital.longitude}
            latitude={hospital.latitude}
            onClick={() => setSelectedHospital(hospital)}
          >
            <MarkerIcon />
          </Marker>
        ))}
        {selectedHospital && (
          <Popup
            longitude={selectedHospital.longitude}
            latitude={selectedHospital.latitude}
            onClose={() => setSelectedHospital(null)}
            closeOnClick={false}
          >
            <Box p={1} mt={3} className="h-full rounded-md">
              <div className="font-bold mt-2">
                {selectedHospital.hospitalName}
              </div>
              <div className="mt-1">{selectedHospital.hospitalAddress}</div>
            </Box>
          </Popup>
        )}
      </Map>
    </Page>
  );
}

export default MapPage;
