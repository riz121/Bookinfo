import Head from "next/head";

export function Layout({ children }) {
	return (
		<main className="layout">
			<Head>
				<title>NextJS | Full-stack Bookinfo App</title>
			</Head>
			{children}
		</main>
	);
}
