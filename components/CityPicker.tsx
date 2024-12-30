"use client";
import { useCityPickerStore } from "@/utils/stores/cityPickerSrore";
import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";
import { useRouter } from "next/navigation";
import { Key, useEffect, useRef, useState } from "react";

const getAbsoluteURL = (endpoint: string) => {
	if (process.env.NODE_ENV === "development") {
		return `http://localhost:3000${endpoint}`;
	} else {
		return `https://next-weathernews.vercel.app${endpoint}`;
	}
};

export async function getAllCountries<T>() {
	const url = getAbsoluteURL("/api/options/countries");
	try {
		const response = await fetch(url, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});

		const data = await response.json();
		console.log(data.countries.rows);

		return data.countries.rows as T[];
	} catch (error) {
		console.error(error);
	}
}

async function getCountryState<T>(id: number) {
	const url = getAbsoluteURL(`/api/options/states?countryId=${id}`);

	try {
		const response = await fetch(url, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});
		const data = await response.json();
		return data.states.rows as T[];
	} catch (error) {
		console.error(error);
	}
}

async function getStateCity<T>(sid: number, cid: number) {
	const url = getAbsoluteURL(
		`/api/options/cities?countryId=${cid}&stateId=${sid}`,
	);

	try {
		const response = await fetch(url, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});
		const data = await response.json();
		console.log(data);
		return data.cities.rows as T[];
	} catch (error) {
		console.error(error);
	}
}

function CityPicker() {
	const [countries, setCountries] = useState<Country[]>([]);
	const [states, setStates] = useState<State[]>([]);
	const [cities, setCities] = useState<City[]>([]);

	const [countryInput, setCountryInput] = useState<string>("");

	const [citiesInput, setCitiesInput] = useState<string>("");
	const [statesInput, setStatesInput] = useState<string>("");

	const { country, state, city, setCountry, setCity, setState } =
		useCityPickerStore();

	const router = useRouter();

	async function fetchCountriesOption() {
		if (countries.length == 0) {
			const data: any = await getAllCountries<Country>();

			console.log(data);
			setCountries(data);
		}
	}

	async function fetchStatesOption<T>() {
		if (country) {
			const data: any = await getCountryState(country?.id);
			console.log(data);
			setStates(data);
			if (data.length == 0) {
				router.push(
					`/location/${country.name.toLocaleLowerCase().replaceAll(" ", "_")}/${
						country.latitude
					}/${country.longitude}`,
				);
			}
		}
	}
	async function fetchCitiesOption() {
		if (country && state) {
			const data: any = await getStateCity(state?.id, country.id);
			console.log(data);
			setCities(data);
			if (data.length == 0) {
				if (state.longitude && state.latitude) {
					router.push(
						`/location/${state.name.toLocaleLowerCase().replaceAll(" ", "_")}/${
							state.latitude
						}/${state.longitude}`,
					);
				}
			}
		}
	}

	useEffect(() => {
		fetchCountriesOption();
		// setCountry(null);
		// setCity(null);
		// setState(null);
	}, []);

	useEffect(() => {
		fetchStatesOption();
	}, [country]);

	useEffect(() => {
		fetchCitiesOption();
	}, [country, state]);

	const handleCountrySelection = (key: Key | null) => {
		console.log("CountryKey", key);
		const found: Country[] = countries.filter(
			(country: Country) => country.id == key,
		);
		if (found[0]) {
			setCountry(found[0]);
		}
	};

	const handleStateSelection = (key: Key | null) => {
		const found: State[] = states.filter((state: State) => state.id == key);
		if (found[0]) {
			setState(found[0]);
		}
	};

	const handleCitySelection = (key: Key | null) => {
		const found: City[] = cities.filter((city: City) => city.id == key);
		if (found[0]) {
			setCity(found[0]);
			if (found[0].longitude && found[0].latitude) {
				router.push(
					`/location/${found[0].name
						.toLocaleLowerCase()
						.replaceAll(" ", "_")}/${found[0].latitude}/${found[0].longitude}`,
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
					onInputChange={(value) => {
						setCountryInput(value);
					}}
					onSelectionChange={handleCountrySelection}
					size="md"
					radius="sm"
					inputValue={countryInput}
					value={country?.id}
					popoverProps={{
						portalContainer: containerRef.current as Element,
					}}
				>
					{countries &&
						countries?.map((country: Country) => (
							<AutocompleteItem
								key={country.id}
								textValue={country.name}
							>
								<div className="flex items-center">
									<span className="pr-1">{country.emoji}</span>
									{country.name}
								</div>
							</AutocompleteItem>
						))}
				</Autocomplete>
			</div>
			{country && states.length > 0 && (
				<div
					className="space-y-2 "
					ref={containerRef}
				>
					<Autocomplete
						label={<span className="text-white">State</span>}
						labelPlacement="outside"
						placeholder="Select a state"
						onSelectionChange={handleStateSelection}
						size="md"
						radius="sm"
						inputValue={statesInput}
						value={state?.id}
						popoverProps={{
							portalContainer: containerRef.current as Element,
						}}
						onInputChange={(value) => {
							setStatesInput(value);
						}}
					>
						{states.map((state: State) => (
							<AutocompleteItem
								key={state.id}
								textValue={state.name}
							>
								<div className="flex items-center">{state.name}</div>
							</AutocompleteItem>
						))}
					</Autocomplete>
				</div>
			)}

			{state && cities.length > 0 && (
				<div
					className="space-y-2 "
					ref={containerRef}
				>
					<Autocomplete
						label={<span className="text-white">City</span>}
						labelPlacement="outside"
						placeholder="Select a city"
						onSelectionChange={handleCitySelection}
						size="md"
						radius="sm"
						inputValue={citiesInput}
						value={city?.id}
						popoverProps={{
							portalContainer: containerRef.current as Element,
						}}
						onInputChange={(value) => {
							setCitiesInput(value);
						}}
					>
						{cities.map((city: City) => (
							<AutocompleteItem
								key={city.id}
								textValue={city.name}
							>
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
