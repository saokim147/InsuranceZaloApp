import { MapResponse } from "@/types/map";
import { toQueryParams } from "@/utils/queryUtil";
// https://c681-2001-ee0-4f04-dc20-3569-7042-67a-449b.ngrok-free.app/
//https://localhost:7262/Map
// "ngrok-skip-browser-warning": "69420",
const API_BASE_URL =
  "https://9d5d-2001-ee0-4f04-dc20-343a-d0f6-cac5-c616.ngrok-free.app/Map";

export async function getNearbyHospitals(
  longitude: number = 106.7035,
  latitude: number = 10.816,
  range: number = 5,
  lang: string = "vi"
): Promise<MapResponse> {
  const params = {
    longitude,
    latitude,
    range,
    lang,
  };
  const url = `${API_BASE_URL}/Index?${toQueryParams(params).toString()}`;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "69420",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}
