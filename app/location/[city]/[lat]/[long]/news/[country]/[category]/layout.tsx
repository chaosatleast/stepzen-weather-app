export default function RootLayout({
  children,
  header,
}: {
  children: React.ReactNode;
  header: React.ReactNode;
}) {
  return (
    <section className="">
      <div className="flex flex-col">
        {header}
        {children}
      </div>
    </section>
  );
}
