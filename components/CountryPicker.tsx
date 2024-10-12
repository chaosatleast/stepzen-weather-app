"use client";
import React, { Key, useEffect, useRef, useState } from "react";
import { createClient } from "@/utils/superbase/client";
import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";
import countryNewsSupported from "@/helper/supportedCountryNews";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

async function getAllCountries<T>() {
	const supabase = createClient();
	console.log(supabase);
	const { data, error } = await supabase.from("countries").select();
	console.log(data);
	if (data) return data as T[];
	else throw error;
}

function CountryPicker() {
	const [country, setCountry] = useState<Country>();
	const [countries, setCountries] = useState<Country[]>([]);
	const containerRef = useRef<HTMLDivElement | null>(null);
	const router = useRouter();
	const pathname = usePathname();
	const handleCountrySelection = (key: Key | null) => {
		const found: Country[] = countries.filter(
			(country: Country) => country.id == key
		);
		if (found[0]) {
			setCountry(found[0]);
			router.push(
				`${
					pathname.split("/news/")[0]
				}/news/${found[0]?.iso2.toLocaleLowerCase()}/${
					pathname.split("/news/")[1].split("/")[1]
				}`
			);
		}
	};

	async function fetchCountriesOption() {
		const splitPathname = pathname.split("/");
		if (countries.length == 0) {
			const data: Country[] = await getAllCountries<Country>();
			const filter: Country[] = data.filter(
				(country: Country) =>
					countryNewsSupported.indexOf(country.iso2.toLocaleLowerCase()) !== -1
			);
			const foundCountry: Country[] = data.filter(
				(country: Country) =>
					countryNewsSupported.indexOf(
						splitPathname[splitPathname.length - 2]
					) !== -1
			);

			if (foundCountry.length == 1) {
				setCountry(foundCountry[0]);
			}

			setCountries(filter);
		}
	}
	useEffect(() => {
		fetchCountriesOption();
	}, []);
	return (
		<div>
			{" "}
			<div ref={containerRef} className="dark text-foreground z ">
				<Autocomplete
					variant={"underlined"}
					labelPlacement="inside"
					placeholder="Select a country"
					onSelectionChange={handleCountrySelection}
					size="md"
					radius="sm"
					inputValue={country?.name}
					value={country?.id}
					popoverProps={{
						portalContainer: containerRef.current as Element,
					}}
					defaultItems={countries}
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
		</div>
	);
}

export default CountryPicker;
