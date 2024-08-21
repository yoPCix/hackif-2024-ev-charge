import React, { useState } from "react";
import { cn } from "@/utils/cn";
import { Logo, LogoSize } from "@ids/react-logo";
import { Outlet } from "react-router-dom";
import { Box } from "../ui/Box";
import { Container } from "../ui/Container";
import { TypographyUI, TypographyUISize } from "@ids/react-typography";
import { Ui16Cross, Ui16Menu, Ui24Cross } from "@ids/react-icons";

const HeaderConstants = {
	HEIGHT: 60,
};

export const HeaderLayout: React.FC = () => {
	const [isMenuExpanded, setIsMenuExpanded] = useState(false);

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
		<div
			className={cn(
				"fixed left-0 right-0 bottom-0 bg-beige-200 border-t border-t-beige-500 transition-all origin-top duration-300 ease-in-out p-4",
				isMenuExpanded ? "scale-y-100" : "scale-y-0 pointer-events-none"
			)}
			style={{ top: HeaderConstants.HEIGHT }}
		>
			test
		</div>
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
			<Box variant="light" style={{ paddingTop: HeaderConstants.HEIGHT }}>
				<Container className={cn("md:px-4 md:py-5")}>
					<Outlet />
				</Container>
			</Box>
			{MenuSidebar}
		</React.Fragment>
	);
};
