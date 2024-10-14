"use client";
import { timeAgo } from "@/helper/dateConversion";
import { Card, CardHeader } from "@nextui-org/card";
import { usePathname, useRouter } from "next/navigation";
import { FaImages } from "react-icons/fa6";
import { IoMdArrowForward } from "react-icons/io";
import { IoNewspaperOutline } from "react-icons/io5";
import CalloutCard from "./CalloutCard";

function NewsArea({
	data,
	timezone,
	utcOffsetSecond,
}: {
	data: News[];
	timezone: string;
	utcOffsetSecond: number;
}) {
	const router = useRouter();
	const pathname = usePathname();

	return (
		<div className="pt-5 m-1">
			<CalloutCard>
				<div className="text-blue-600">
					<div className="flex gap-x-2 items-center w-fit">
						<IoNewspaperOutline />
						LIVE NEWS
					</div>
				</div>
				<hr className="h-px my-4 bg-zinc-700 border-0"></hr>
				<div className="space-y-3">
					{data.map((item: News) => (
						<>
							<div
								className="flex h-32 overflow-hidden  gap-x-2 hover:p-2 hover:bg-white/10 hover:rounded-lg transition-all duration-500"
								onClick={() => {
									router.push(`${item.url}`);
								}}
							>
								{/* Image */}
								<Card className="col-span-12 sm:col-span-4  w-44 shrink-0">
									<CardHeader className="absolute z-10  flex-col items-start from-black to-transparent  bg-gradient-to-b h-full ">
										<p className="text-tiny text-white/60 uppercase font-bold">
											{item.source}
										</p>
									</CardHeader>
									{item.image ? (
										<img
											// removeWrapper
											className="z-0 w-full h-full object-cover"
											src={item.image}
										/>
									) : (
										<div className="z-0 w-full h-full p-10 flex items-center justify-center text-gray-700 bg-[var(--dark)]">
											<FaImages className="h-full w-full" />
										</div>
									)}
								</Card>

								{/* Description */}
								<div className="mt-1 space-y-1 flex flex-col justify-center">
									<span className="text-gray-700 font-bold bg-gray-300 text-xs p-1 rounded-lg w-fit">
										{item.category.charAt(0).toUpperCase() +
											item.category.slice(1)}
									</span>

									<h4 className="text-white font-medium text-md line-clamp-1">
										{item.title}
									</h4>
									<h4 className="text-white font-extralight text-xs line-clamp-2 ">
										{item.description}
									</h4>

									<span className="text-gray-400 text-xs ">
										{item.author ? `${item.author} · ` : ``}
										{timeAgo(item.published_at, utcOffsetSecond)}
									</span>
								</div>
							</div>
						</>
					))}
				</div>
				<div
					className="mt-2 flex items-center gap-x-1 text-sm text-gray-400 w-fit hover:border-b hover:border-gray-400 hover:cursor-pointer"
					onClick={() => {
						router.push(`${pathname}/news/us/general`);
					}}
				>
					More news <IoMdArrowForward />
				</div>
			</CalloutCard>
		</div>
	);
}

export default NewsArea;
