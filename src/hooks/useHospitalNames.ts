import { getHospitalNames } from "@/api/hospitalApi";
import { SearchResponse } from "@/types/hospitalType";
import { HospitalFilter } from "@/types/uiType";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export default function useHospitalNames(
  searchValue: string,
  filter: HospitalFilter,
  lang: string
): UseQueryResult<SearchResponse> {
  return useQuery({
    queryKey: ["hospitalNames", searchValue],
    queryFn: async () =>
      await getHospitalNames(
        searchValue,
        filter.cityName,
        filter.isPublicHospital,
        filter.inPatient,
        filter.outPatient,
        filter.dental,
        filter.sortOrder,
        filter.isBlackList,
        lang
      ),
  });
}
