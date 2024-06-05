"use client";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
const categories = [
  "general",
  "business",
  "entertainment",
  "health",
  "science",
  "sports",
  "technology",
];
function NewsCategories() {
  const router = useRouter();
  const pathname = usePathname();
  const [activeCategory, setActiveCategory] = useState<string>("general");

  const rightArrowRef = useRef<HTMLDivElement | null>(null);
  const leftArrowRef = useRef<HTMLDivElement | null>(null);
  const scrollContentRef = useRef<HTMLDivElement | null>(null);

  const handleArrowIcons = () => {
    if (scrollContentRef.current) {
      if (scrollContentRef.current.scrollLeft >= 20) {
        leftArrowRef.current?.classList.remove("hidden");
      } else {
        leftArrowRef.current?.classList.add("hidden");
      }
      let maxScroll =
        scrollContentRef.current.scrollWidth -
        scrollContentRef.current.clientWidth -
        20;
      console.log(maxScroll, scrollContentRef.current.scrollLeft);

      if (scrollContentRef.current.scrollLeft >= maxScroll) {
        rightArrowRef.current?.classList.add("hidden");
      } else {
        rightArrowRef.current?.classList.remove("hidden");
      }
    }
  };
  const handleRightArrow = () => {
    if (scrollContentRef.current) {
      scrollContentRef.current.scrollLeft += 100;

      handleArrowIcons();
    }
  };

  const handleLeftArrow = () => {
    if (scrollContentRef.current) {
      scrollContentRef.current.scrollLeft -= 100;

      handleArrowIcons();
    }
  };

  const handleActiveCategory = (category: string) => {
    setActiveCategory(category);

    router.push(
      `${pathname.split("/news/")[0]}/news/${
        pathname.split("/news/")[1].split("/")[0]
      }/${category}`
    );
  };

  const initalCategory = () => {
    const splitPathname = pathname.split("/");

    setActiveCategory(splitPathname[splitPathname.length - 1]);
  };

  useEffect(() => {
    initalCategory();
  }, []);
  return (
    <div className="relative text-gray-400 flex gap-x-6 mt-7 items-center justify-center ">
      <div className="md:hidden absolute left-0 hidden" ref={leftArrowRef}>
        <div
          className="w-11 h-6 flex items-center bg-gradient-to-r from-[var(--dark)] from-50% to-transparent"
          onClick={handleLeftArrow}
        >
          <IoIosArrowBack />
        </div>
      </div>

      <div
        className={`flex gap-x-6  overflow-x-scroll scrollbar-hide transform-all scroll-smooth`}
        ref={scrollContentRef}
        onScroll={() => {
          handleArrowIcons();
        }}
      >
        {/* Selection */}
        {categories.map((category: string) => (
          <>
            <div
              className={`hover:text-white  hover:cursor-pointer transition-all duration-500 hover:-mt-1  ${
                category == activeCategory ? `text-white` : ``
              }`}
              onClick={() => handleActiveCategory(category)}
            >
              {category.charAt(0).toLocaleUpperCase() + category.slice(1)}
            </div>
          </>
        ))}
      </div>
      <div className={`md:hidden absolute top-0 right-0`} ref={rightArrowRef}>
        <div
          className="rotate-[180deg] hover:text-white w-11 h-6 flex items-center bg-gradient-to-r from-[var(--dark)] from-50% to-transparent"
          onClick={handleRightArrow}
        >
          <IoIosArrowBack />
        </div>
      </div>
    </div>
  );
}

export default NewsCategories;
