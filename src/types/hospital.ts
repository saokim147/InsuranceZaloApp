export interface HospitalSearchParams {
  hospitalName?: string;
  cityName?: string;
  districtName?: string;
  wardName?: string;
  isPublicHospital?: boolean | null;
  inPatient?: boolean | null;
  outPatient?: boolean | null;
  dental?: boolean | null;
  isBlackList?: boolean;
  lang?: string;
}
export interface SearchItem {
  label: string;
  value: string;
}

export interface SearchResponse {
  results: SearchItem[];
}

export interface PagedHospitalParams {
  page: number;
  pageSize: number;
  hospitalName?: string;
  cityName?: string;
  districtName?: string;
  wardName?: string;
  isPublicHospital?: boolean | null;
  inPatient?: boolean | null;
  outPatient?: boolean | null;
  dental?: boolean | null;
  sortOrrder?: string;
  isBlackList?: boolean;
  lang?: string;
}

export type HospitalsResponse = {
  data: hospital[];
  totalRecord: number;
  nextPage: number | null;
};

export interface CityItem {
  cityName: string;
  cityId: number;
}

export type CityResponse = {
  data: CityItem[];
};

export interface hospital {
  hospitalId: number;
  hospitalName: string;
  hospitalAddress: string;
  isPublicHospital: boolean;
  inPatient: boolean;
  outPatient: boolean;
  dental: boolean;
  phoneNumber: string;
  billingTime: string;
  insuranceAndDirectBilling: string;
  note?: string;
  longitude: number;
  latitude: number;
}
export function convertFromSearchResponse(
  response?: SearchResponse
): { value: string; label: string }[] {
  return (
    response?.results.map((item) => ({
      value: item.value,
      label: item.label,
    })) ?? []
  );
}

export function convertFromCityResponse(
  response?: CityResponse
): { value: string; label: string }[] {
  return (
    response?.data.map((item) => ({
      value: item.cityName,
      label: item.cityName,
    })) ?? []
  );
}
