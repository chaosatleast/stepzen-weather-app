import CityPicker from "@/components/CityPicker";

export default async function Home() {
	return (
		<div
			className="min-h-screen bg-gradient-to-br  px-10 flex flex-col justify-center items-center"
			style={{ background: `var(--default-gradient)` }}
		>
			<div className="w-full h-auto  bg-white/30 rounded-md p-8 flex flex-col justify-center">
				<h1 className="text-6xl  text-black text-center font-bold mb-10">
					News + Weather App
				</h1>
				<span className="text-lg text-center text-zinc-800">
					Powered by Next.js@14, Stepzen, NextUI and Tailwind CSS.
				</span>
				<div className="my-10 border-[0.5px] border-zinc-300" />
				<div className="bg-gradient-to-br from-[#394F68] to-[#183B7E] max-w-4xl mx-auto"></div>
				<CityPicker />
			</div>
		</div>
	);
}
