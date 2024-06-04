import InfiniteScroll from "@/components/InfiniteScroll";
import { CardBody, Card, CardHeader } from "@nextui-org/card";
import { Image } from "@nextui-org/image";

function News({ country, category }: { country: string; category: string }) {
  return (
    <>
      <div className="z-0 sm:mx-auto gap-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
        <div className="flex flex-col h-80 w-full sm:w-72 hover:sm:w-[294px] xl:w-64 hover:xl:w-[260px] hover:h-[324px] overflow-hidden gap-x-2  bg-white/10 rounded-2xl  transition-all duration- relative group/news hover:cursor-pointer">
          {/* Image */}
          <Card className="col-span-12 sm:col-span-4  w-full shrink-0 relative h-[60%]">
            <Image
              removeWrapper
              alt="Card background"
              className="z-0 w-full h-full object-cover"
              src="https://nextui.org/images/card-example-4.jpeg"
            />
            <CardHeader className="absolute   flex-col items-start from-black to-transparent  bg-gradient-to-b h-full ">
              <p className="text-tiny text-white/60  font-bold">
                Hurricane Hanna makes landfall around 5 p.m. on Saturday
              </p>
            </CardHeader>
          </Card>
          {/* Description */}
          <div className="absolute top-[50%] h-full bg-black mt-1 space-y-1 flex flex-col  justify-start p-4">
            <span className="text-gray-400 text-sm ">Author · 13hour ago</span>
            <h4 className="text-white font-extralight text-sm group-hover/news:line-clamp-4 line-clamp-5">
              Minim adipisicing est ea pariatur mollit qui aliqua laborum
              aliquip sint cillum. Irure quis exercitation occaecat ad aute
              culpa sit. Commodo nostrud sunt labore dolore veniam sint duis
              nisi consectetur. Officia duis qui eiusmod ex culpa exercitation
              aliqua nisi sunt do est nostrud. Non qui ad excepteur dolor id
              voluptate proident cupidatat. Proident pariatur reprehenderit ea
              magna aute ea eiusmod.
            </h4>
          </div>

          {/* Read More */}
          <div className="absolute bottom-0 group-hover/news:flex  bg-gray-300 group-news/hover:h-6 w-full text-zinc-900 hidden justify-center items-center text-center font-bold text-sm">
            Read More
          </div>
        </div>{" "}
      </div>

      <InfiniteScroll country={country} category={category} />
    </>
  );
}

export default News;
