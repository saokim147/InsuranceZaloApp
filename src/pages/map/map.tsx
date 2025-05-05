import { useEffect, useState } from "react";
import {
  Map,
  Marker,
  NavigationControl,
  Popup,
  useMap,
} from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { useQuery } from "@tanstack/react-query";
import { getNearbyHospitals } from "@/api/mapApi";
import { MapPinXInside } from "lucide-react";
import { MapItem } from "@/types/map";
import { Page } from "zmp-ui";

function MapPage() {
  const { current: map } = useMap();
  const [selectedHospital, setSelectedHospital] = useState<MapItem | null>(
    null
  );
  useEffect(() => {
    if (map) {
      map.fitBounds([
        [102.0409, 7.730748],
        [111.6685, 23.47731],
      ]);
    }
  }, [map]);

  const { data, isLoading } = useQuery({
    queryKey: ["mapList"],
    queryFn: () => getNearbyHospitals(106.7035, 10.816),
  });
  //https://9d5d-2001-ee0-4f04-dc20-343a-d0f6-cac5-c616.ngrok-free.app
  if (isLoading) return <div>Loading ..</div>;

  return (
    <Page>
      <Map
        initialViewState={{
          longitude: 106.7035,
          latitude: 10.816,
          zoom: 14,
        }}
        style={{ width: 600, height: 400 }}
        mapStyle="https://9d5d-2001-ee0-4f04-dc20-343a-d0f6-cac5-c616.ngrok-free.app/static/map/style.json"
      >
        <NavigationControl position="top-left" />
        {data?.hospitals.map((hospital, index) => (
          <Marker
            key={index}
            longitude={hospital.longitude}
            latitude={hospital.latitude}
            onClick={() => setSelectedHospital(hospital)}
          >
            <MapPinXInside color="red" />
          </Marker>
        ))}
        {selectedHospital && (
          <Popup
            longitude={selectedHospital.longitude}
            latitude={selectedHospital.latitude}
            onClose={() => setSelectedHospital(null)}
            closeOnClick={false}
          >
            <div>{selectedHospital.hospitalName}</div>
            <div className="mt-1">{selectedHospital.hospitalAddress}</div>
          </Popup>
        )}
      </Map>
    </Page>
  );
}

export default MapPage;
