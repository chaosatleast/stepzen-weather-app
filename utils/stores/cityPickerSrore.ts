import { create } from "zustand";

interface CityPickerStore {
  country: Country | null;
  state: State | null;
  city: City | null;
  setCountry: (country: Country | null) => void;
  setState: (state: State | null) => void;
  setCity: (city: City | null) => void;
}

export const useCityPickerStore = create<CityPickerStore>()((set) => ({
  country: null,
  state: null,
  city: null,
  setCountry: (country: Country | null) => {
    set(() => ({ country: country }));
  },
  setState: (state: State | null) => {
    set(() => ({ state: state }));
  },
  setCity: (city: City | null) => {
    set(() => ({ city: city }));
  },
}));
