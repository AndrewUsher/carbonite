import type { AppProps } from "next/app";
import { ReactNode } from "react";
import { Navigation } from "../components/Navigation";
import { Provider } from "../components/ui/provider";

function MyApp({ Component, pageProps }: AppProps): ReactNode {
	return (
		<Provider>
			<Navigation />
			<Component {...pageProps} />
		</Provider>
	);
}

export default MyApp;
