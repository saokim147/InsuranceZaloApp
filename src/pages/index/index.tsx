import { useCallback, useRef, useState } from "react";
import { Box, Checkbox, Header, Page, Sheet, useNavigate } from "zmp-ui";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import {
  getCityList,
  getHospitalNames,
  getPagedHospitals,
} from "@/api/hospitalApi";
import HospitalList from "@/components/hospitalList";
import ServiceSelect from "@/components/service-select";
import {
  convertFromCityResponse,
  convertFromSearchResponse,
} from "@/types/hospital";
import { AutoComplete } from "@/components/ui/autocomplete";
import { ListFilter } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const PAGE_SIZE = 5;

const HomePage = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedService, setSelectedService] = useState<string>("");
  const [visible, setVisible] = useState(false);
  const [isPublicHospital, setIsPublicHospital] = useState<boolean | null>(
    null
  );
  const [inDental, setInDental] = useState<boolean | null>(null);
  const [inPatient, setInPatient] = useState<boolean | null>(null);
  const [OutPatient, setOutPatient] = useState(null);
  const navigation = useNavigate();
  const { data: cityList, isLoading: cityLoading } = useQuery({
    queryKey: ["cityList", selectedCity],
    queryFn: () => getCityList(selectedCity),
  });

  const { data: hospitalNames, isLoading } = useQuery({
    queryKey: ["hospitalNames", selectedService, searchValue],
    queryFn: () =>
      getHospitalNames(
        searchValue,
        selectedCity,
        isPublicHospital,
        inPatient,
        OutPatient,
        inDental,
        "default",
        selectedService === "true",
        "vi"
      ),
    enabled: searchValue.length > 1,
  });

  const {
    data: hospitalLists,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: [
      "hospitals",
      selectedCity,
      isPublicHospital,
      inPatient,
      OutPatient,
      inDental,
      selectedService,
    ],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await getPagedHospitals(
        pageParam,
        PAGE_SIZE,
        "",
        selectedCity,
        isPublicHospital,
        inPatient,
        OutPatient,
        inDental,
        "default",
        selectedService === "true",
        "vi"
      );
      return response;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });
  const observer = useRef<IntersectionObserver | null>(null);
  const lastPostRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isFetchingNextPage) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });
      if (node) observer.current.observe(node);
    },
    [isFetchingNextPage, fetchNextPage, hasNextPage]
  );

  const resetFilter = () => {
    setIsPublicHospital(true);
    setInDental(null);
    setInPatient(null);
    setOutPatient(null);
  };

  return (
    <Page>
      <Header
        title="Profile"
        backgroundColor="#e92020"
        textColor="white"
        style={{ position: "sticky" }}
        showBackIcon={false}
      />
      <Box mt={2} p={2} mx={2}>
        <div className="flex items-center gap-1">
          <Box className="flex-1">
            <AutoComplete<string>
              selectedValue={searchValue}
              onSelectedValueChange={setSearchValue}
              searchValue={searchValue}
              onSearchValueChange={setSearchValue}
              items={convertFromSearchResponse(hospitalNames)}
              isLoading={isLoading}
              emptyMessage="Not found."
            />
          </Box>
          <Button size="icon" onClick={() => setVisible(true)}>
            <ListFilter></ListFilter>
          </Button>
        </div>
        <ServiceSelect onSelect={setSelectedService} />
      </Box>
      <Sheet visible={visible} onClose={() => setVisible(false)}>
        <Box p={2} flexDirection="column">
          <Checkbox
            value={"true"}
            label="bệnh viện công"
            className="mb-2"
            checked={isPublicHospital === true}
            onChange={(e) => setIsPublicHospital(e.target.checked)}
          ></Checkbox>
          <Checkbox
            value={"true"}
            label="Nội khoa"
            className="mb-2"
            checked={inPatient === true}
            onChange={(e) => setInPatient(e.target.checked)}
          ></Checkbox>
          <Checkbox
            value={"true"}
            label="Ngoại khoa"
            className="mb-2"
            checked={OutPatient === true}
            onChange={(e) => setOutPatient(e.target.checked)}
          ></Checkbox>
          <Checkbox
            value={"true"}
            label="Nha khoa"
            className="mb-2"
            checked={inDental === true}
            onChange={(e) => setInDental(e.target.checked)}
          />
          <AutoComplete
            selectedValue={selectedCity}
            onSelectedValueChange={setSelectedCity}
            searchValue={selectedCity}
            onSearchValueChange={setSelectedCity}
            items={convertFromCityResponse(cityList)}
            isLoading={cityLoading}
            emptyMessage="Không tìm thấy"
            placeholder="Thành phố..."
          />
        </Box>
        <Box p={2}>
          <Button size="lg" onClick={() => resetFilter()}>
            reset
          </Button>
        </Box>
      </Sheet>

      {status === "pending" && (
        <div className="p-4 text-center">Đang Load dữ liệu..</div>
      )}
      {status === "error" && (
        <div className="p-4 text-center text-red-500">
          Lỗi Không Load dữ liệu được,xin hãy khởi động lại
        </div>
      )}
      {status === "success" && (
        <>
          {hospitalLists.pages.map((page, index) => (
            <div
              key={index}
              ref={
                index === hospitalLists.pages.length - 1 ? lastPostRef : null
              }
            >
              <HospitalList items={page} navigation={navigation} />
            </div>
          ))}
          {isFetchingNextPage && (
            <div className="p-4 text-center">Load thêm dữ liệu...</div>
          )}
          {!hasNextPage && !isFetchingNextPage && (
            <div className="p-4 text-center font-medium">Hết</div>
          )}
        </>
      )}
    </Page>
  );
};

export default HomePage;
