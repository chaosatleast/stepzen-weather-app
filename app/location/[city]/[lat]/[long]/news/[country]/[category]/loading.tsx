import React from "react";

function Loading() {
	return (
		<>
			<div className="flex relative h-full">
				<div className="bg-transparent">
					<div className="absolute mt-40 inset-0 z-50 flex items-center justify-center">
						<div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#183B7E]"></div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Loading;
