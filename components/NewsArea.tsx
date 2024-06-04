"use client";
import { Card, CardHeader } from "@nextui-org/card";
import CalloutCard from "./CalloutCard";
import { IoNewspaperOutline } from "react-icons/io5";
import { Image } from "@nextui-org/image";
import { usePathname, useRouter } from "next/navigation";
import { IoMdArrowForward } from "react-icons/io";

function NewsArea() {
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
        <div className="flex h-32 overflow-hidden  gap-x-2 hover:p-2 hover:bg-white/10 hover:rounded-lg transition-all duration-500">
          {/* Image */}
          <Card className="col-span-12 sm:col-span-4  w-44 shrink-0">
            <CardHeader className="absolute z-10  flex-col !items-start from-black to-transparent  bg-gradient-to-b h-full ">
              <p className="text-tiny text-white/60 uppercase font-bold">
                TMZ.com
              </p>
            </CardHeader>
            <Image
              removeWrapper
              alt="Card background"
              className="z-0 w-full h-full object-cover"
              src="https://nextui.org/images/card-example-4.jpeg"
            />
          </Card>
          {/* Description */}
          <div className="mt-1 space-y-1 flex flex-col justify-center">
            <span className="text-gray-700 font-bold bg-gray-300 text-xs p-1 rounded-lg w-fit">
              General
            </span>
            <h4 className="text-white font-medium text-md line-clamp-1">
              Hurricane Hanna makes landfall around 5 p.m. on Saturday
            </h4>
            <h4 className="text-white font-extralight text-xs line-clamp-2 ">
              Minim adipisicing est ea pariatur mollit qui aliqua laborum
              aliquip sint cillum. Irure quis exercitation occaecat ad aute
              culpa sit. Commodo nostrud sunt labore dolore veniam sint duis
              nisi consectetur. Officia duis qui eiusmod ex culpa exercitation
              aliqua nisi sunt do est nostrud. Non qui ad excepteur dolor id
              voluptate proident cupidatat. Proident pariatur reprehenderit ea
              magna aute ea eiusmod.
            </h4>
            <span className="text-gray-400 text-xs ">Author · 13hour ago</span>
          </div>
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
