"use client";
import React, { useEffect, useRef, useState, useTransition } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { Card, CardHeader } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import fetchNewsQuery from "@/graphQL/fetchNewsQuery";
import { getClient } from "@/apollo-client";
import { FaImages } from "react-icons/fa6";
import { timeAgo } from "@/helper/dateConversion";
import { useRouter } from "next/navigation";

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
  const [offset, setOffset] = useState(0);
  const [cellData, setCellData] = useState<News[]>(data);
  const [isPending, startTransition] = useTransition();
  const newsRef = useRef(null);
  const loadingRef = useRef(null);
  const contentRef = useRef(null);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const loadingInView = useInView(loadingRef, { once: true });
  const newsInView = useInView(newsRef, { once: true });
  const key = process.env.MEDIASTACK_API_KEY;

  async function loadMoreResult() {
    setIsLoading(true);
    const client = getClient();
    const result = await client.query({
      query: fetchNewsQuery,
      variables: {
        access_key: key,
        categories: category,
        countries: country,
        limit: "20",
        offset: `${offset + 20}`,
        languages: "en",
      },
    });

    if (result) {
      console.log(result);

      const news: News[] = result.data.newsQuery.data;
      const pagination: NewsPagination = result.data.newsQuery.data;

      startTransition(() => {
        setOffset(offset + 20);
        setCellData([...cellData, ...news]);
      });
    }
    setIsLoading(false);
  }
  useEffect(() => {
    if (loadingInView && cellData.length <= 100) {
      loadMoreResult();
    }
  }, [loadingInView]);

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
      {cellData.length <= 100 && cellData.length > 0 ? (
        <>
          {isLoading ? (
            <div
              className="h-16 mt-5 flex justify-center items-center"
              ref={loadingRef}
            >
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#183B7E]"></div>
            </div>
          ) : (
            <></>
          )}
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default InfiniteScroll;
