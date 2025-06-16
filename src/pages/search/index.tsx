import { useState } from "react";
import { Box, Header, Page, Sheet, useNavigate } from "zmp-ui";
import HospitalList from "@/components/search/hospitalList";
import ServiceSelect from "@/components/search/service-select";
import {
  convertFromCityResponse,
  convertFromSearchResponse,
} from "@/types/hospitalType";
import { ListFilter } from "lucide-react";
import { Button } from "@/components/ui/button";
import useIntersectionObserver from "@/hooks/useInterceptionObserver";
import QueryStatus from "@/components/ui/queryStatus";
import Autocomplete from "@/components/ui/autocomplete";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { HospitalFilter } from "@/types/uiType";
import usePagedHospital from "@/hooks/usePagedHospital";
import useCityList from "@/hooks/useCityList";
import useHospitalNames from "@/hooks/useHospitalNames";
import { DEFAULT_HOSPITAL_FILTER } from "./defaultFilter";
import Sliders from "@/components/icons/filterIcon";
import FilterIcon from "@/components/icons/filterIcon";

const HomePage = () => {
  const navigation = useNavigate();
  const [visible, setVisible] = useState(false);
  const [filter, setFilter] = useState<HospitalFilter>(DEFAULT_HOSPITAL_FILTER);
  const [submittedFilter, setSubmittedFilter] = useState<HospitalFilter>(
    DEFAULT_HOSPITAL_FILTER
  );
  const [searchValue, setSearchValue] = useState("");
  const [searchCityValue, setSearchCityValue] = useState("");
  const { data: cityList } = useCityList(searchCityValue, "vi");
  const { data: hospitalNames } = useHospitalNames(searchValue, filter, "vi");
  const {
    data: hospitalLists,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = usePagedHospital(submittedFilter, "vi");
  const lastPostRef = useIntersectionObserver({
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  });
  const resetFilter = () => {
    setSubmittedFilter(DEFAULT_HOSPITAL_FILTER);
    setFilter(DEFAULT_HOSPITAL_FILTER);
  };
  const handleSearch = () => {
    setSubmittedFilter(filter);
  };
  return (
    <Page className="bg-background">
      <Header
        title="App Bảo hiểm"
        backgroundColor="#e11d48"
        textColor="white"
        style={{ position: "sticky" }}
        showBackIcon={false}
      />
      <Box mt={2} p={2} mx={3} className=" overflow-auto">
        <div className="flex flex-row  gap-2">
          <Box className="flex-1">
            <Autocomplete
              items={convertFromSearchResponse(hospitalNames)}
              placeholder="Tìm kiếm bệnh viện"
              selectedItem={filter.hospitalName}
              setSelectedItem={(value) =>
                setSubmittedFilter({ ...filter, hospitalName: value })
              }
              onChange={(e) => setSearchValue(e.target.value)}
              keyValue="name"
              displayValue="name"
              className="w-full"
            />
          </Box>
          <Box>
            <Button
              size="icon"
              variant="secondary"
              onClick={() => setVisible(true)}
            >
              <FilterIcon />
            </Button>
          </Box>
        </div>
        <ServiceSelect
          onSelect={(item) =>
            setSubmittedFilter({ ...filter, isBlackList: item === "true" })
          }
        />
      </Box>
      <Sheet visible={visible} onClose={() => setVisible(false)}>
        <Box p={3} flexDirection="column">
          <Box mx={4}>
            <div className="flex items-center gap-7 mt-2">
              <Label htmlFor="terms">Nội trú </Label>
              <Checkbox
                id="terms"
                checked={false}
                onCheckedChange={(checked) => {
                  setFilter({ ...filter, inPatient: checked === true });
                }}
                className="size-5"
              />
            </div>
            <div className="flex items-center gap-3 mt-2">
              <Label htmlFor="terms">Ngoại trú</Label>
              <Checkbox
                id="terms"
                checked={false}
                onCheckedChange={(checked) => {
                  setFilter({ ...filter, outPatient: checked === true });
                }}
                className="size-5"
              />
            </div>
            <div className="flex items-center gap-3 mt-2">
              <Label htmlFor="terms">Nha khoa</Label>
              <Checkbox
                id="terms"
                checked={false}
                onCheckedChange={(checked) => {
                  setFilter({ ...filter, dental: checked === true });
                }}
                className="size-5"
              />
            </div>
            <div className="mt-2">
              <div>Thành phố</div>
              <Autocomplete
                items={convertFromCityResponse(cityList)}
                placeholder="Tìm kiếm Thành phố"
                selectedItem={filter.cityName}
                setSelectedItem={(value) => {
                  setFilter({ ...filter, cityName: value });
                }}
                onChange={(e) => setSearchCityValue(e.target.value)}
                keyValue="name"
                displayValue="name"
                className="w-full mt-2"
              />
            </div>
          </Box>

          <Box mt={4} mx={4} flex flexDirection="row" className="gap-3">
            <Button className="flex-1" onClick={handleSearch}>
              Tìm kiếm
            </Button>
            <Button
              variant="secondary"
              className="flex-1"
              onClick={resetFilter}
            >
              Xóa lọc
            </Button>
          </Box>
        </Box>
      </Sheet>
      <QueryStatus status={status} />
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
