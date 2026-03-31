import { TanStackDevtools } from "@tanstack/react-devtools";
import type { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, HeadContent, Scripts } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";

import TanStackQueryDevtools from "../integrations/tanstack-query/devtools";
import TanStackQueryProvider from "../integrations/tanstack-query/root-provider";
import appCss from "../styles.css?url";

interface MyRouterContext {
	queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				title: "Penny Pilot",
			},
			{
				name: "twitter:title",
				content: "Penny Pilot",
			},
			{
				name: "og:title",
				content: "Penny Pilot",
			},
			{
				name: "description",
				content: "Penny Pilot is a comprehensive financial tracking application designed to bridge the gap between personal wealth management and business accounting.",
			},
			{
				name: "twitter:description",
				content: "Penny Pilot is a comprehensive financial tracking application designed to bridge the gap between personal wealth management and business accounting.",
			},
			{
				name: "og:description",
				content: "Penny Pilot is a comprehensive financial tracking application designed to bridge the gap between personal wealth management and business accounting.",
			},
		],
		links: [
			{
				rel: "stylesheet",
				href: appCss,
			},
			{ rel: "manifest", href: "/site.webmanifest" },
			{ rel: "icon", href: "/favicon.ico" },
			{ rel: "apple-touch-icon", href: "/icons/apple-touch-icon.png" },
			{ rel: "icon", type: "image/png", sizes: "32x32", href: "/icons/favicon-32x32.png" },
			{ rel: "icon", type: "image/png", sizes: "16x16", href: "/icons/favicon-16x16.png" },
		],
	}),
	shellComponent: RootDocument,
});

function RootDocument({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<HeadContent />
			</head>
			<body>
				<TanStackQueryProvider>
					{children}
					<TanStackDevtools
						config={{
							position: "bottom-right",
						}}
						plugins={[
							{
								name: "Tanstack Router",
								render: <TanStackRouterDevtoolsPanel />,
							},
							TanStackQueryDevtools,
						]}
					/>
				</TanStackQueryProvider>
				<Scripts />
			</body>
		</html>
	);
}
