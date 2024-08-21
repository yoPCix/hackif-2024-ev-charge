import { Heading } from "@/components/adhoc/ui/Heading";
import { cn } from "@/utils/cn";
import React from "react";

export type WaypointListItemProps = {
	title: string;
	subtitle: string;
} & (
	| { isChargingStation?: false }
	| {
			isChargingStation?: true;
			power: number;
			isVisited: boolean;
	  }
);

export const WaypointListItem: React.FC<WaypointListItemProps> = ({
	title,
	subtitle,
	...props
}) => {
	const { power, isVisited } = props.isChargingStation
		? {
				power: props.power,
				isVisited: props.isVisited,
		  }
		: {};

	return (
		<li className={cn("flex")}>
			<div>dots</div>
			<div className={cn("flex flex-col")}>
				<Heading>{title}</Heading>
				<Heading>{subtitle}</Heading>
			</div>
			<div>action</div>
		</li>
	);
};
