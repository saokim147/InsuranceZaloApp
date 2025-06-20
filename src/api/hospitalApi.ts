import {
  CityResponse,
  HospitalsResponse,
  SearchResponse,
} from "@/types/hospitalType";
import { toQueryParams } from "@/utils/queryUtil";

const API_BASE_URL = "https://api-uat-ibmi.baominh.vn:8500/insurance/Hospital";

export const getHospitalNames = async (
  hospitalName = "",
  cityName = "",
  isPublicHospital: boolean | null = null,
  inPatient: boolean | null = null,
  outPatient: boolean | null = null,
  dental: boolean | null = null,
  sortOrder = "default",
  isBlackList: boolean = false,
  lang = "vi"
): Promise<SearchResponse> => {
  const params = {
    hospitalName,
    cityName,
    isPublicHospital,
    inPatient,
    outPatient,
    dental,
    sortOrder,
    isBlackList,
    lang,
  };
  const url = `${API_BASE_URL}/Search?${toQueryParams(params)}`;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return {
      results: data.results.map((item) => ({
        label: item,
        value: item,
      })),
    };
  } catch (error) {
    throw error;
  }
};

export async function getPagedHospitals(
  page = 1,
  pageSize = 5,
  hospitalName = "",
  cityName = "",
  isPublicHospital: boolean | null = null,
  inPatient: boolean | null = null,
  outPatient: boolean | null = null,
  dental: boolean | null = null,
  sortOrder = "default",
  isBlackList: boolean = false,
  lang = "vi"
): Promise<HospitalsResponse> {
  const params = {
    page: page,
    pageSize,
    hospitalName,
    cityName,
    isPublicHospital,
    inPatient,
    outPatient,
    dental,
    sortOrder,
    isBlackList,
    lang,
  };
  const url = `${API_BASE_URL}/?${toQueryParams(params)}`;
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
  const nextPage = page < response.totalRecord / pageSize ? page + 1 : null;
  const hospitalResponse: HospitalsResponse = {
    data: response.data,
    totalRecord: response.totalRecord,
    nextPage: nextPage,
  };
  return hospitalResponse;
}

export async function getCityList(
  cityName = "",
  lang = "vi"
): Promise<CityResponse> {
  const params = {
    cityName,
    lang,
  };
  const url = `${API_BASE_URL}/ListCities?${toQueryParams(params)}`;
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
