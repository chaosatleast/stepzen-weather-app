import React from "react";
import ReturnButton from "../ReturnButton";
import CountryPicker from "@/components/CountryPicker";
import NewsCategories from "@/components/NewsCategories";

function header({ country, category }: { country: string; category: string }) {
	return (
		<div className="pt-2 pb-8 z-10 sticky">
			{/* Header */}
			<div className="flex flex-col space-y-3 xl:justify-between">
				{/* title */}
				<div className="  flex flex-col gap-y-1">
					<ReturnButton />
					<div className="space-x-2 flex items-end">
						<span className="text-gray-200 font-bold text-lg">Read</span>
						<span className="text-gray-400 text-md font-semibold ">
							express news
						</span>
					</div>
				</div>
				<div className="w-[75%]">
					<CountryPicker />
				</div>
			</div>
			{/* Category */}
			<NewsCategories />
			<hr className="h-px my-4 bg-zinc-700 border-0"></hr>
			{/* New Section */}
		</div>
	);
}

export default header;
