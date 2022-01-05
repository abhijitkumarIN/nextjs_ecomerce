import Head from 'next/head';
import Header from '../components/Header';
import { useRouter } from 'next/router';

export default ({ children, metadata }) => {
  const router = useRouter();
  const pathname = router.pathname;

  return (
		<div className="app-main">
			<Head>
				<title>{metadata.title}</title>
				<meta name="description" content="Some random description..."></meta>
				<meta property="og:title" content={metadata.title} />
				<meta property="og:url" content={metadata.url} />
				<meta
					property="og:description"
					content="Some random description..."
				></meta>
				<meta property="og:image" content={metadata.image} />
				<meta property="og:type" content="website" />
			</Head>

			<Header />

			<main className={pathname !== "/" ? "main-page" : ""}>{children}</main>
		</div>
	);
}