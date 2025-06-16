import { Input } from "./input";
import { ClaimFormType } from "@/schema";
import { formatMoney, parseMoney } from "@/utils/money";
import { Controller, useFormContext } from "react-hook-form";
import ErrorMessage from "./errorValidation";

export default function MoneyInput() {
  const {
    control,
    formState: { errors },
  } = useFormContext<ClaimFormType>();

  return (
    <>
      <Controller
        name="claimCost"
        control={control}
        render={({ field }) => (
          <Input
            type="text"
            className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            placeholder="0"
            onChange={(ev) => {
              const parsedValue = parseMoney(ev.target.value);
              field.onChange(parsedValue);
            }}
            value={formatMoney(field.value)}
          />
        )}
      />
      <ErrorMessage message={errors.claimCost?.message} />
    </>
  );
}
