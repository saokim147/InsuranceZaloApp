import { useState } from "react";
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";

const people = [
  { id: 1, name: "Durward Reynolds" },
  { id: 2, name: "Kenton Towne" },
  { id: 3, name: "Therese Wunsch" },
  { id: 4, name: "Benedict Kessler" },
  { id: 5, name: "Katelyn Rohan" },
];

export default function MyCombobox() {
  const [selectedPeople, setSelectedPeople] = useState([people[0], people[1]]);

  return (
    <Combobox value={selectedPeople} onChange={setSelectedPeople} multiple>
      {selectedPeople.length > 0 && (
        <ul>
          {selectedPeople.map((person) => (
            <li key={person.id}>{person.name}</li>
          ))}
        </ul>
      )}
      <ComboboxInput />
      <ComboboxOptions>
        {people.map((person) => (
          <ComboboxOption key={person.id} value={person}>
            {person.name}
          </ComboboxOption>
        ))}
      </ComboboxOptions>
    </Combobox>
  );
}
