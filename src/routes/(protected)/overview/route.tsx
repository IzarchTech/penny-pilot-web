import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(protected)/overview")({
	component: OverviewRouteComponent,
});

function OverviewRouteComponent() {
	return <div>Hello "/(protected)/overview"!</div>;
}
