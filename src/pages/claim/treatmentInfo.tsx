import { Box, DatePicker, Select as SheetSelect, Text } from "zmp-ui";
import { Textarea } from "@/components/ui/textarea";
import { TreatmentType } from "@/types/claimType";
import { ClaimFormType } from "@/schema";
import { useFormContext, Controller } from "react-hook-form";
import { getMedicalFacilities } from "@/api/claimApi";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import ErrorMessage from "@/components/ui/errorValidation";
import Autocomplete from "@/components/ui/autocomplete";
import { convertMedicalFacilityToItem } from "@/utils/common";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { CurrencyUnit } from "@/types/paymentType";
import { Label } from "@/components/ui/label";
import MoneyInput from "@/components/ui/moneyInput";

export default function TreatmentInfoPage() {
  const {
    register,
    control,
    setValue,
    formState: { errors },
  } = useFormContext<ClaimFormType>();
  const [medicalSearch, setMedicalSearch] = useState<string>("");
  const [treatmentMethod, setTreatmentMethod] = useState<string>("");
  const { data: medicalList } = useQuery({
    queryKey: ["medicalList", medicalSearch],
    queryFn: () => getMedicalFacilities(1, 5, medicalSearch),
  });

  return (
    <Box
      mt={2}
      p={6}
      className="bg-white rounded-lg outline-1 outline-neutral-200 outline-double"
    >
      <Box>
        <Text size="small" className="mb-2">
          Cơ sở y tế
        </Text>
        <Controller
          name="medicalFacilities"
          control={control}
          render={({ field }) => (
            <Autocomplete
              placeholder="CSYT"
              className="w-full h-[48px]"
              items={convertMedicalFacilityToItem(medicalList?.model || [])}
              keyValue="id"
              displayValue="name"
              selectedItem={field.value || " "}
              setSelectedItem={(item) => {
                field.onChange(item);
              }}
              onChange={(e) => setMedicalSearch(e.target.value)}
            />
          )}
        />
        <ErrorMessage message={errors.medicalFacilities?.message} />
      </Box>
      <Box mt={2}>
        <Controller
          name="treatmentType"
          defaultValue={TreatmentType.INPATIENT}
          control={control}
          render={({ field }) => (
            <SheetSelect
              label="Hình thức điều trị"
              value={field.value}
              onChange={(item) => {
                field.onChange(item);
                setTreatmentMethod(item?.toString() || "");
              }}
            >
              <SheetSelect.Option
                value={TreatmentType.INPATIENT}
                title="Nội trú"
              >
                Nội trú
              </SheetSelect.Option>
              <SheetSelect.Option
                value={TreatmentType.OUTPATIENT}
                title="Ngoại trú"
              >
                Ngoại trú
              </SheetSelect.Option>
              <SheetSelect.Option
                value={TreatmentType.ACCIDENT}
                title="Tai nạn"
              >
                Tai nạn
              </SheetSelect.Option>
              <SheetSelect.Option value={TreatmentType.DENTAL} title="Nha khoa">
                Nha khoa
              </SheetSelect.Option>
            </SheetSelect>
          )}
        />
        <ErrorMessage message={errors.treatmentType?.message} />
      </Box>
      <Box mt={2}>
        <Controller
          name="treatmentDate"
          control={control}
          render={({ field }) => (
            <DatePicker
              label="Ngày điều trị"
              value={field.value}
              onChange={(value) => {
                field.onChange(value);
                setValue("eventDate", value, {
                  shouldDirty: true,
                });
              }}
            />
          )}
        />
      </Box>
      <Box mt={2}>
        <Controller
          name="dischargeDate"
          control={control}
          render={({ field }) => (
            <DatePicker
              label="Ngày ra viện"
              value={field.value || undefined}
              onChange={(value) => {
                field.onChange(value);
              }}
              disabled={treatmentMethod === TreatmentType.OUTPATIENT}
            />
          )}
        />
      </Box>
      <ErrorMessage message={errors.dischargeDate?.message} />
      <Box mt={2}>
        <Controller
          name="eventDate"
          control={control}
          render={({ field }) => (
            <DatePicker
              label="Ngày xảy ra sự kiện"
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
      </Box>
      <Box mt={2} flex flexDirection="row">
        <div className="w-full">
          <Label htmlFor="price" className="text-sm font-normal text-gray-900">
            Số tiền yêu cầu bồi thường
          </Label>
          <div className="mt-2 h-[48px]">
            <div className="flex items-center rounded-md bg-white pl-3 border border-gray-300">
              <MoneyInput />
              <Controller
                name="currencyUnit"
                control={control}
                defaultValue={CurrencyUnit.VND}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-[100px] border-0 focus-visible:ring-0 font-medium py-1.5 pl-3 text-gray-500">
                      <SelectValue placeholder="VND" />
                    </SelectTrigger>
                    <SelectContent className="font-medium">
                      <SelectItem value={CurrencyUnit.VND}>VND</SelectItem>
                      <SelectItem value={CurrencyUnit.USD}>USD</SelectItem>
                      <SelectItem value={CurrencyUnit.AUD}>AUD</SelectItem>
                      <SelectItem value={CurrencyUnit.CAD}>CAD</SelectItem>
                      <SelectItem value={CurrencyUnit.CHF}>CHF</SelectItem>
                      <SelectItem value={CurrencyUnit.EUR}>EUR</SelectItem>
                      <SelectItem value={CurrencyUnit.GBP}>GBP</SelectItem>
                      <SelectItem value={CurrencyUnit.HKD}>HKD</SelectItem>
                      <SelectItem value={CurrencyUnit.JPY}>JPY</SelectItem>
                      <SelectItem value={CurrencyUnit.KRW}>KRW</SelectItem>
                      <SelectItem value={CurrencyUnit.SGD}>SGD</SelectItem>
                      <SelectItem value={CurrencyUnit.THB}>THB</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              <ErrorMessage message={errors.claimCost?.message} />
            </div>
          </div>
        </div>
      </Box>
      <Box mt={2}>
        <Text size="small">Chẩn đoán</Text>
        <Textarea className="mt-2" {...register("diagnosis")} />
        <ErrorMessage message={errors.diagnosis?.message} />
      </Box>
    </Box>
  );
}
