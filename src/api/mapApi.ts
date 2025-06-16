import { MapResponse } from "@/types/mapType";
import api from "@/utils/generic";
import { toQueryParams } from "@/utils/queryUtil";

const API_BASE_URL = "https://api-uat-ibmi.baominh.vn:8500/insurance/Map";

export async function getNearbyHospitals(
  longitude: number = 106.7035,
  latitude: number = 10.816,
  range: number = 5,
  lang: string = "vi"
): Promise<MapResponse> {
  try {
    const response = await api.get<MapResponse>(
      `${API_BASE_URL}/Index?${toQueryParams({
        longitude,
        latitude,
        range,
        lang,
      })}`
    );
    return response;
  } catch (error) {
    throw error;
  }
}
