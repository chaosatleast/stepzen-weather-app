"use client";
import infiniteFetch from "@/actions/infiniteFetch";
import { timeAgo } from "@/helper/dateConversion";
import sortNews from "@/helper/sortNews";
import { Card, CardHeader } from "@nextui-org/card";
import { motion, useAnimation, useInView } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FaImages } from "react-icons/fa6";

function InfiniteScroll({
	country,
	category,
	utcOffsetSeconds,
	data,
	pagination,
}: {
	country: string;
	category: string;
	utcOffsetSeconds: number;
	data: News[];
	pagination: NewsPagination;
}) {
	const [offset, setOffset] = useState(pagination.offset);
	const [cellData, setCellData] = useState<News[]>(data);

	const [isLoading, setIsLoading] = useState(false);
	const newsRef = useRef(null);
	const loadingRef = useRef(null);
	const contentRef = useRef(null);
	const router = useRouter();

	const loadingInView = useInView(loadingRef);
	const newsInView = useInView(newsRef, { once: true });
	const key = process.env.MEDIASTACK_API_KEY;

	const handleMoreNewsLoad = async () => {
		setIsLoading(true);
		const { news, pagination } = await infiniteFetch(offset, category, country);
		console.log(data);
		const sorted = sortNews(news);
		const paginate: NewsPagination = pagination;

		console.log(cellData);

		let newSort = sortNews([...cellData, ...sorted]);
		console.log(newSort);

		setTimeout(() => {
			setIsLoading(false);
			setOffset(paginate.offset);
			setCellData(newSort);
		}, 1000);
	};

	const container = {
		hidden: { opacity: 0 },
		show: {
			opacity: 1,
			transition: {
				staggerChildren: 0.5,
			},
		},
	};

	const controls = useAnimation();
	const item = {
		hidden: {
			opacity: 0,
			y: 50,
			transition: { ease: [0.78, 0.14, 0.15, 0.86] },
		},
		show: {
			opacity: 1,
			y: 0,
			transition: { ease: [0.78, 0.14, 0.15, 0.86] },
		},
	};

	useEffect(() => {
		if (newsInView) {
			controls.start("show");
		}
	}, [controls, newsInView]);

	useEffect(() => {
		if (contentRef) {
			controls.start("show");
		}
	}, [controls, contentRef]);

	return (
		<div className="flex flex-col">
			<motion.div
				className="z-0 sm:mx-auto gap-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
				initial="hidden"
				animate="show"
				variants={container}
				ref={contentRef}
			>
				{cellData?.map((data: News, index: number) => {
					return (
						<>
							<motion.div
								className="flex flex-col h-80  sm:w-72 hover:sm:w-[294px] xl:w-64 hover:xl:w-[260px] hover:h-[324px] overflow-hidden gap-x-2  bg-white/10 rounded-2xl  transition-all duration- relative group/news hover:cursor-pointer"
								variants={item}
								initial="hidden"
								animate={controls}
								ref={newsRef}
							>
								{/* Image */}
								<Card className="col-span-12 sm:col-span-4  w-full shrink-0 relative h-[60%]">
									{data.image ? (
										<img
											// removeWrapper
											className="z-0 w-full h-full object-cover"
											src={data.image}
										/>
									) : (
										<div className="z-0 w-full h-full p-10 flex items-center justify-center text-gray-700 bg-[var(--dark)]">
											<FaImages className="h-full w-full" />
										</div>
									)}
									<CardHeader className="absolute   flex-col items-start from-black to-transparent  bg-gradient-to-b h-full ">
										<p className="text-tiny text-white/60  font-bold">
											{data.title}
										</p>
									</CardHeader>
								</Card>
								{/* Description */}
								<div className="absolute top-[50%] h-full w-full bg-black mt-1 space-y-1 flex flex-col  justify-start p-4">
									<span className="text-gray-400 text-sm ">
										{data.author ? `${data.author} · ` : ``}
										{timeAgo(data.published_at, utcOffsetSeconds)}
									</span>
									<h4 className="text-white  font-extralight text-sm group-hover/news:line-clamp-4 line-clamp-5">
										{data.description}
									</h4>
								</div>

								{/* Read More */}
								<div
									className="absolute bottom-0 group-hover/news:flex  bg-gray-300 group-news/hover:h-6 w-full text-zinc-900 hidden justify-center items-center text-center font-bold text-sm"
									onClick={() => router.push(`$data.url}`)}
								>
									Read More
								</div>
							</motion.div>{" "}
						</>
					);
				})}
			</motion.div>
			<motion.button
				className="max-h-20 mx-10 mt-5 flex justify-center items-center"
				viewport={{ once: true, margin: "0px" }}
				onViewportEnter={handleMoreNewsLoad}
			>
				{isLoading && (
					<div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-[#183B7E]"></div>
				)}
			</motion.button>
		</div>
	);
}

export default InfiniteScroll;
