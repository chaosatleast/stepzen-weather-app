import { ApolloWrapper } from "@/lib/apollo-wrapper";

export default function RootLayout({
	children,
	header,
}: {
	children: React.ReactNode;
	header: React.ReactNode;
}) {
	return (
		<section className="">
			<ApolloWrapper>
				<div className="flex flex-col">
					{header}
					{children}
				</div>
			</ApolloWrapper>
		</section>
	);
}
