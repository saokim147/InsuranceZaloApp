import { getPagedHospitals } from "@/api/hospitalApi";
import { HospitalFilter } from "@/types/uiType";
import { PAGE_SIZE } from "@/utils/constant";
import { useInfiniteQuery } from "@tanstack/react-query";

export default function usePagedHospital(filter: HospitalFilter, lang: string) {
  return useInfiniteQuery({
    queryKey: ["hospitals", filter],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await getPagedHospitals(
        pageParam,
        PAGE_SIZE,
        filter.hospitalName,
        filter.cityName,
        filter.isPublicHospital,
        filter.inPatient,
        filter.outPatient,
        filter.dental,
        filter.sortOrder,
        filter.isBlackList,
        lang
      );
      return response;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });
}
