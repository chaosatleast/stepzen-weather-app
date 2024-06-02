"use client";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useCityPickerStore } from "@/utils/stores/cityPickerSrore";
import { createClient } from "@/utils/superbase/client";
import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";

async function getAllCountries<T>() {
  const supabase = createClient();
  console.log(supabase);
  const { data, error } = await supabase.from("countries").select();
  console.log(data);
  if (data) return data as T[];
  else throw error;
}

async function getCountryState<T>(id: number) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("states")
    .select()
    .eq("country_id", id);
  console.log(data);
  if (data) return data as T[];
  else throw error;
}

async function getStateCity<T>(sid: number, cid: number) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("cities")
    .select()
    .eq("state_id", sid)
    .eq("country_id", cid);
  console.log(data);
  if (data) return data as T[];
  else throw error;
}

function CityPicker() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [states, setStates] = useState<State[]>([]);
  const [cities, setCities] = useState<City[]>([]);

  const { country, state, city, setCountry, setCity, setState } =
    useCityPickerStore();

  const router = useRouter();

  async function fetchCountriesOption() {
    if (countries.length == 0) {
      const data: Country[] = await getAllCountries<Country>();
      setCountries(data);
    }
  }

  async function fetchStatesOption<T>() {
    if (country) {
      const data: State[] = await getCountryState(country?.id);
      console.log(data);
      setStates(data);
      if (data.length == 0) {
        router.push(
          `/location/${country.name.toLocaleLowerCase().replaceAll(" ", "_")}/${
            country.latitude
          }/${country.longitude}`
        );
      }
    }
  }
  async function fetchCitiesOption() {
    if (country && state) {
      const data: City[] = await getStateCity(state?.id, country.id);
      console.log(data);
      setCities(data);
      if (data.length == 0) {
        if (state.longitude && state.latitude) {
          router.push(
            `/location/${state.name.toLocaleLowerCase().replaceAll(" ", "_")}/${
              state.latitude
            }/${state.longitude}`
          );
        }
      }
    }
  }

  useEffect(() => {
    fetchCountriesOption();
    setCountry(null);
    setCity(null);
    setState(null);
  }, []);

  useEffect(() => {
    fetchStatesOption();
  }, [country]);

  useEffect(() => {
    fetchCitiesOption();
  }, [country, state]);

  const handleCountrySelection = (key: React.Key) => {
    const found: Country[] = countries.filter(
      (country: Country) => country.id == key
    );
    if (found[0]) {
      setCountry(found[0]);
    }
  };

  const handleStateSelection = (key: React.Key) => {
    const found: State[] = states.filter((state: State) => state.id == key);
    if (found[0]) {
      setState(found[0]);
    }
  };

  const handleCitySelection = (key: React.Key) => {
    const found: City[] = cities.filter((city: City) => city.id == key);
    if (found[0]) {
      setCity(found[0]);
      if (found[0].longitude && found[0].latitude) {
        router.push(
          `/location/${found[0].name
            .toLocaleLowerCase()
            .replaceAll(" ", "_")}/${found[0].latitude}/${found[0].longitude}`
        );
      }
    }
  };

  const containerRef = useRef<HTMLDivElement | null>(null);

  return (
    <div
      className="space-y-4 shadow-2xl ring-1 ring-white/10 bg-white/10 rounded-md p-4 text-black "
      ref={containerRef}
    >
      <div className="space-y-2 ">
        <Autocomplete
          label={<span className="text-white">Country</span>}
          labelPlacement="outside"
          placeholder="Select a country"
          onSelectionChange={handleCountrySelection}
          size="md"
          radius="sm"
          inputValue={country?.name}
          value={country?.id}
          popoverProps={{
            portalContainer: containerRef.current as Element,
          }}
        >
          {countries &&
            countries.map((country: Country) => (
              <AutocompleteItem key={country.id} textValue={country.name}>
                <div className="flex items-center">
                  <span className="pr-1">{country.emoji}</span>
                  {country.name}
                </div>
              </AutocompleteItem>
            ))}
        </Autocomplete>
      </div>
      {country && states.length > 0 && (
        <div className="space-y-2 " ref={containerRef}>
          <Autocomplete
            label={<span className="text-white">State</span>}
            labelPlacement="outside"
            placeholder="Select a state"
            onSelectionChange={handleStateSelection}
            size="md"
            radius="sm"
            inputValue={state?.name}
            value={state?.id}
            popoverProps={{
              portalContainer: containerRef.current as Element,
            }}
          >
            {states.map((state: State) => (
              <AutocompleteItem key={state.id} textValue={state.name}>
                <div className="flex items-center">{state.name}</div>
              </AutocompleteItem>
            ))}
          </Autocomplete>
        </div>
      )}

      {state && cities.length > 0 && (
        <div className="space-y-2 " ref={containerRef}>
          <Autocomplete
            label={<span className="text-white">City</span>}
            labelPlacement="outside"
            placeholder="Select a city"
            onSelectionChange={handleCitySelection}
            size="md"
            radius="sm"
            inputValue={city?.name}
            value={city?.id}
            popoverProps={{
              portalContainer: containerRef.current as Element,
            }}
          >
            {cities.map((city: City) => (
              <AutocompleteItem key={city.id} textValue={city.name}>
                <div className="flex items-center">{city.name}</div>
              </AutocompleteItem>
            ))}
          </Autocomplete>
        </div>
      )}
    </div>
  );
}

export default CityPicker;
