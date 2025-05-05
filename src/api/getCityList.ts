import { API_BASE_URL } from "./hospitalApi";

export async function getCityList(): Promise<CityResponse> {
  const url = `${API_BASE_URL}/Hospital/ListCities`;
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  const response = await res.json();
  return response;
}
