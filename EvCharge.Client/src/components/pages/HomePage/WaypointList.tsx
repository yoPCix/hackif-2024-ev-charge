import React from "react";
import { WaypointListItem, WaypointListItemProps } from "./WaypointListItem";
import { cn } from "@/utils/cn";

export type WaypointListProps = {
	items: WaypointListItemProps[];
};

const getWaypointKey = (waypoint: WaypointListItemProps) =>
	`${waypoint.title}|${waypoint.subtitle}`;

export const WaypointList: React.FC<WaypointListProps> = ({ items }) => {
	return (
		<ul className={cn("flex flex-col")}>
			{items.map((item) => (
				<WaypointListItem key={getWaypointKey(item)} {...item} />
			))}
		</ul>
	);
};
