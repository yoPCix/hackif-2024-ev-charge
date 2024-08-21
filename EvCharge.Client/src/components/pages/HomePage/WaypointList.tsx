import React, { ComponentProps, useState } from "react";
import { WaypointListItem, WaypointListItemProps } from "./WaypointListItem";
import { cn } from "@/utils/cn";
import { Box } from "@/components/ui/Box";
import { Button } from "@ids/react-button";

export type WaypointListProps = {
	items: WaypointListItem[];
	isWaypoint: boolean;
};

const WaypointListConstants = {
	NEXT_HEIGHT: 70,
	NEXT_HEIGHT_BUFFER: 50,
};

const getWaypointKey = (waypoint: WaypointListItem) =>
	`${waypoint.title}|${waypoint.subtitle}`;

export const WaypointList: React.FC<WaypointListProps> = ({
	items,
	isWaypoint,
}) => {
	const [checkedWaypoints, setCheckedWaypoints] = useState<string[]>([]);

	const toggleWaypoint = (id: string) => {
		if (checkedWaypoints.includes(id)) {
			setCheckedWaypoints(checkedWaypoints.filter((_id) => _id !== id));
		} else {
			setCheckedWaypoints([...checkedWaypoints, id]);
		}
	};

	return (
		<React.Fragment>
			<ul
				className={cn("flex flex-col overflow-y-scroll h-[350px]")}
				style={{
					paddingBottom: isWaypoint
						? WaypointListConstants.NEXT_HEIGHT
						: WaypointListConstants.NEXT_HEIGHT_BUFFER,
				}}
			>
				{items.map((item) => (
					<WaypointListItem
						key={getWaypointKey(item)}
						isWaypoint={isWaypoint}
						handleCheck={(checked) => toggleWaypoint(getWaypointKey(item))}
						{...item}
					/>
				))}
			</ul>
			{
				<Box
					className={cn(
						"fixed w-full bottom-0 p-2 flex items-center",
						!isWaypoint && "border-t-2 border-t-beige-500"
					)}
					style={{
						height: isWaypoint
							? WaypointListConstants.NEXT_HEIGHT
							: WaypointListConstants.NEXT_HEIGHT_BUFFER,
					}}
				>
					{isWaypoint && (
						<Button
							className={cn("!w-full")}
							disabled={checkedWaypoints.length === 0}
						>
							Next{" "}
							{checkedWaypoints.length !== 0 && `(${checkedWaypoints.length})`}
						</Button>
					)}
				</Box>
			}
		</React.Fragment>
	);
};
