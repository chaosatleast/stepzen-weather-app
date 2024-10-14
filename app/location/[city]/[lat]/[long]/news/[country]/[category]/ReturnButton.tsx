"use client";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { IoIosArrowBack } from "react-icons/io";

function ReturnButton() {
	const router = useRouter();
	const pathname = usePathname();
	return (
		<div
			className="text-gray-500 flex gap-x-1 items-center text-sm hover:cursor-pointer hover:text-white hover:border-b w-fit hover:pb-1 transition-all duration-500"
			onClick={() => router.push(`${pathname?.split("/news")[0]}`)}
		>
			<IoIosArrowBack /> Back
		</div>
	);
}

export default ReturnButton;
