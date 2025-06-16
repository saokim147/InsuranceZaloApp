import { getCityList } from "@/api/hospitalApi";
import { CityResponse } from "@/types/hospitalType";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export default function useCityList(
  searchValue: string,
  lang: string
): UseQueryResult<CityResponse> {
  return useQuery({
    queryKey: ["cityList", searchValue, lang],
    queryFn: async () => await getCityList(searchValue, lang),
  });
}
