import React, { useState } from "react";
import { cn } from "@/utils/cn";
import { Logo, LogoSize } from "@ids/react-logo";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Box } from "../ui/Box";
import { Container } from "../ui/Container";
import {
	TypographyUI,
	TypographyUISize,
	TypographyUIWeight,
} from "@ids/react-typography";
import { Ui16Cross, Ui16Menu, Ui24Cross } from "@ids/react-icons";

const HeaderConstants = {
	HEIGHT: 60,
};

type NavItem = {
	path: string;
	label: string;
};

const navItems: NavItem[] = [
	{
		path: "/",
		label: "Home",
	},
	{
		path: "/stations",
		label: "Charging stations",
	},
];

export const HeaderLayout: React.FC = () => {
	const [isMenuExpanded, setIsMenuExpanded] = useState(false);
	const { pathname } = useLocation();

	const toggleExpandMenu = () => {
		setIsMenuExpanded((_isMenuExpanded) => !_isMenuExpanded);
	};

	const MenuTrigger = (
		<div
			onClick={toggleExpandMenu}
			className={cn(
				"flex flex-col items-center self-stretch justify-center w-[4.5rem] aspect-square gap-2 cursor-pointer",
				"border-l border-l-beige-500",
				isMenuExpanded ? "bg-beige-300" : "bg-beige-200"
			)}
		>
			{isMenuExpanded ? (
				<Ui16Cross className={cn("scale-150 text-primary-400")} />
			) : (
				<React.Fragment>
					<Ui16Menu />
					<TypographyUI size={TypographyUISize.X_SMALL}>Menu</TypographyUI>
				</React.Fragment>
			)}
		</div>
	);

	const MenuSidebar = (
		<React.Fragment>
			<div
				className={cn(
					"fixed left-0 right-0 bottom-0 z-30",
					"bg-beige-200 border-t border-t-beige-500 transition-all origin-top duration-300 ease-in-out",
					"flex flex-col p-4 gap-4",
					isMenuExpanded ? "scale-y-100" : "scale-y-0 pointer-events-none"
				)}
				style={{ top: HeaderConstants.HEIGHT }}
			>
				{navItems.map(({ label, path }) => (
					<Link key={label} to={path} onClick={() => setIsMenuExpanded(false)}>
						<TypographyUI
							weight={
								path === pathname
									? TypographyUIWeight.BOLD
									: TypographyUIWeight.MEDIUM
							}
						>
							{label}
						</TypographyUI>
					</Link>
				))}
			</div>
			<div
				className={cn(
					"fixed left-0 right-0 bottom-0 bg-black z-20 pointer-events-none transition-colors",
					isMenuExpanded ? "bg-black/50" : "bg-transparent"
				)}
				style={{ top: HeaderConstants.HEIGHT }}
			/>
		</React.Fragment>
	);

	return (
		<React.Fragment>
			<header className={cn("fixed w-full")}>
				<Box
					variant="light"
					className={cn("flex items-center border-b border-b-beige-500")}
				>
					<Container
						style={{ height: HeaderConstants.HEIGHT }}
						className={cn("px-4 flex items-center")}
					>
						<Logo size={LogoSize.SMALL} />
					</Container>
					{MenuTrigger}
				</Box>
			</header>
			<Box
				variant="normal"
				className={cn("h-full overflow-hidden")}
				style={{ paddingTop: HeaderConstants.HEIGHT }}
			>
				<Container className={cn("md:px-4 md:py-5 h-full")}>
					<Outlet />
				</Container>
			</Box>
			{MenuSidebar}
		</React.Fragment>
	);
};
