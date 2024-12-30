"use client";
import React, { Key, useEffect, useRef, useState } from "react";
import { createClient } from "@/utils/superbase/client";
import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";
import countryNewsSupported from "@/helper/supportedCountryNews";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { SourceCountry } from "@/lib/enum";
import { getAllCountries } from "./CityPicker";

function CountryPicker() {
	const [country, setCountry] = useState<string>();
	const [countries, setCountries] = useState<Country[]>([]);

	const containerRef = useRef<HTMLDivElement | null>(null);
	const router = useRouter();
	const pathname: string | null = usePathname();

	const splitPath = pathname ? pathname.split("/news/") : "";

	const handleCountrySelection = (key: Key | null) => {
		if (splitPath) {
			setCountry(key as string);
			router.push(`${splitPath[0]}/news/${key}/${splitPath[1].split("/")[1]}`);
		}
	};

	const countryCode = Object.keys(SourceCountry);
	const countryName = Object.values(SourceCountry);

	const defaultItems = countryCode.map((country, index) => ({
		key: country,
		text: countryName[index],
	}));

	console.log(defaultItems);

	useEffect(() => {
		async function fetchFlags() {
			const data: any = await getAllCountries<Country>();
			if (data) {
				setCountries(data);
			}
		}
		fetchFlags();
		setCountry(splitPath[1].split("/")[0]);
	}, []);

	const [countryInput, setCountryInput] = useState<string>("");

	return (
		<div>
			{" "}
			<div
				ref={containerRef}
				className="dark text-foreground"
			>
				<Autocomplete
					variant={"underlined"}
					labelPlacement="inside"
					placeholder="Select a country"
					onSelectionChange={handleCountrySelection}
					size="md"
					radius="sm"
					value={country}
					onInputChange={(value) => {
						setCountryInput(value);
					}}
					inputValue={countryInput}
					popoverProps={{
						portalContainer: containerRef.current as Element,
					}}
					defaultItems={defaultItems}
					defaultInputValue={
						defaultItems
							.filter(
								(c: any, index: any) => splitPath[1].split("/")[0] == c.key,
							)
							.map((c: any) => c.text)[0]
					}
				>
					{defaultItems.map((country, index) => (
						<AutocompleteItem
							key={country.key}
							textValue={country.text}
						>
							<div className="flex items-center">
								{/* <span className="pr-1">
									{
										countries
											.filter((c, index) => country.key.toUpperCase() == c.iso2)
											.map((c) => c.emoji)[0]
									}
								</span> */}
								{country.text}
							</div>
						</AutocompleteItem>
					))}
				</Autocomplete>
			</div>
		</div>
	);
}

export default CountryPicker;
