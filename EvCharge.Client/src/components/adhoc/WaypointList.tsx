import React, { ComponentProps, useState } from "react";
import { WaypointListItem, WaypointListItemProps } from "./WaypointListItem";
import { cn } from "@/utils/cn";
import { Box } from "@/components/ui/Box";
import { Button, ButtonSize, ButtonType } from "@ids/react-button";
import { Product24CameraFlash, Ui24ArrowLeft } from "@ids/react-icons";
import {
	TypographyHeading,
	TypographyHeadingSize,
	TypographyUI,
	TypographyUISize,
	TypographyUIWeight,
} from "@ids/react-typography";

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
	const [selectedWaypoint, setSelectedWaypoint] =
		useState<WaypointListItem | null>(null);
	const [showSelectedWaypoint, setShowSelectedWaypoint] = useState(false);

	const toggleWaypoint = (id: string) => {
		if (checkedWaypoints.includes(id)) {
			setCheckedWaypoints(checkedWaypoints.filter((_id) => _id !== id));
		} else {
			setCheckedWaypoints([...checkedWaypoints, id]);
		}
	};

	return (
		<div className={cn("relative h-[350px]")}>
			<ul
				className={cn(
					"flex flex-col h-full overflow-y-scroll"
					// showSelectedWaypoint ? "overflow-y-hidden" : "overflow-y-scroll"
				)}
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
						handleClick={() => {
							setShowSelectedWaypoint(true);
							setSelectedWaypoint(item);
						}}
						{...item}
					/>
				))}
			</ul>
			<Box
				className={cn(
					"fixed w-full bottom-0 p-2 flex items-center z-20",
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
			<Box
				className={cn(
					"absolute top-0 h-full z-40 p-4",
					"flex flex-col gap-3 w-full bottom-10",
					"transition-all",
					showSelectedWaypoint ? "left-0" : "left-[100%]"
					// "translate-x-[90%]"
					// showSelectedWaypoint ? "translate-x-[100%]" : "translate-x-0"
				)}
				style={{
					height: `calc(350px-${WaypointListConstants.NEXT_HEIGHT}px)`,
				}}
			>
				<Button
					className={cn("self-start")}
					type={ButtonType.TEXT}
					onClick={() => setShowSelectedWaypoint(false)}
				>
					<Ui24ArrowLeft />
					Back to all
				</Button>
				<div className={cn("flex flex-col gap-6 flex-grow")}>
					<div className={cn("flex flex-col gap-2.5")}>
						<div className={cn("flex items-center")}>
							<TypographyHeading
								size={TypographyHeadingSize.XX_SMALL}
								className={cn("flex-grow")}
							>
								{selectedWaypoint?.title}
							</TypographyHeading>
							<TypographyUI
								className={cn("flex items-center gap-0.5")}
								size={TypographyUISize.SMALL}
							>
								<Product24CameraFlash />
								{selectedWaypoint?.power}kW
							</TypographyUI>
						</div>
						<TypographyUI size={TypographyUISize.SMALL} isQuiet>
							{selectedWaypoint?.subtitle}
						</TypographyUI>
					</div>
					<div className={cn("grid grid-cols-3 gap-y-1")}>
						<TypographyUI
							isQuiet
							size={TypographyUISize.SMALL}
							weight={TypographyUIWeight.BOLD}
						>
							Regular price:{" "}
						</TypographyUI>
						<TypographyUI className={cn("col-span-2")}>
							<TypographyUI isQuiet weight={TypographyUIWeight.BOLD}>
								0.553€
							</TypographyUI>{" "}
							kWh
						</TypographyUI>
						<TypographyUI size={TypographyUISize.LARGE}>
							Your price:
						</TypographyUI>
						<TypographyUI
							size={TypographyUISize.LARGE}
							className={cn("col-span-2")}
						>
							<TypographyUI weight={TypographyUIWeight.BOLD}>
								0.539€
							</TypographyUI>{" "}
							kWh
						</TypographyUI>
					</div>
					<Button>Start charging</Button>
				</div>
			</Box>
		</div>
	);
};
