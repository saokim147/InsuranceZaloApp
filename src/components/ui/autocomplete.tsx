import { cn } from "@/lib/utils";
import { ComboboxValue } from "@/types/uiType";
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import React, { useRef } from "react";

interface GenericComboboxProps<T extends ComboboxValue> {
  items: T[];
  selectedItem: string;
  setSelectedItem: (item: string) => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  keyValue: "id" | "name" | "value";
  displayValue: "id" | "name" | "value";
}

export default function Autocomplete<T extends ComboboxValue>({
  items,
  selectedItem,
  setSelectedItem,
  onChange,
  placeholder = "Select an option",
  className = "w-72",
  keyValue,
  displayValue,
}: GenericComboboxProps<T>) {
  const getSelectedProp = (item: T) => {
    if (keyValue === "id") return item.id;
    if (keyValue === "name") return item.name;
    return item.value;
  };
  const getDisplayProp = (item: T) => {
    if (displayValue === "id") return item.id;
    if (displayValue === "name") return item.name;
    return item.value;
  };

  const getNameFromKeyValue = (value: string): string => {
    var item: T | undefined;
    if (keyValue === "id") {
      item = items.find((it) => it.id === value);
    } else if (keyValue === "name") {
      item = items.find((it) => it.name === value);
    } else {
      item = items.find((it) => it.value === value);
    }
    return item ? getDisplayProp(item) : "";
  };

  const inputRef = useRef<HTMLInputElement>(null);
  const onFocus = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };
  return (
    <Combobox value={selectedItem} onChange={setSelectedItem}>
      <ComboboxButton as="div" className="flex items-center w-full relative">
        <ComboboxInput
          ref={inputRef}
          className={cn(
            "w-full  flex h-10 focus:border-primary focus:ring-1 focus:ring-primary outline-none  rounded-md border border-input bg-background px-3 py-2 text-base   placeholder:text-muted-foreground  disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          placeholder={placeholder}
          onKeyDown={(e) => e.stopPropagation()}
          displayValue={(item: string) => getNameFromKeyValue(item)}
          onChange={(e) => onChange(e)}
          onFocus={onFocus}
        />
      </ComboboxButton>

      <ComboboxOptions className="mt-1 w-full bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
        {items.map((item) => (
          <ComboboxOption
            key={item.id}
            value={getSelectedProp(item)}
            className="p-2 data-[focus]:bg-gray-200  mx-1 mt-1 rounded-sm"
          >
            {getDisplayProp(item)}
          </ComboboxOption>
        ))}
        {items.length === 0 && (
          <div className="p-2 text-gray-500">No results found</div>
        )}
      </ComboboxOptions>
    </Combobox>
  );
}
