export default function RootLayout({
  children,
  sidepanel,
}: {
  children: React.ReactNode;
  sidepanel: React.ReactNode;
}) {
  return (
    <main>
      <div className=" h-full xl:flex-row xl:relative fixed w-screen overflow-y-scroll">
        <div className="flex flex-col ">
          <div className="w-full xl:h-screen xl:fixed xl:left-0 xl:top-0 xl:w-[25%] xl:overflow-y-scroll">
            {sidepanel}
          </div>
          <div
            className="flex-1 min-h-screen bg-[var(--dark)] p-5 ml-0 xl:p-10 xl:ml-[25%] xl:w-[75%] xl:h-screen xl:fixed  xl:overflow-y-scroll"
            style={{ background: `var(--dark)` }}
          >
            <div>{children}</div>
          </div>
        </div>
      </div>
    </main>
  );
}
