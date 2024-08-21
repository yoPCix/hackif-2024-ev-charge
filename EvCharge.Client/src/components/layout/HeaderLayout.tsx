import React from "react";
import { Box } from "../adhoc/ui/Box";
import { cn } from "@/utils/cn";
import { Container } from "../adhoc/ui/Container";
import { Logo, LogoSize } from "@ids/react-logo";
import { Outlet } from "react-router-dom";

const HeaderConstants = {
	HEIGHT: 80,
};

export const HeaderLayout: React.FC = () => {
	return (
		<React.Fragment>
			<header className={cn("fixed w-full")}>
				<Box variant="normal" className={cn("border-b border-b-beige-500")}>
					<Container
						style={{ height: HeaderConstants.HEIGHT }}
						className={cn("px-4 flex items-center")}
					>
						<Logo size={LogoSize.MEDIUM} />
					</Container>
				</Box>
			</header>
			<Box variant="light" style={{ paddingTop: HeaderConstants.HEIGHT }}>
				<Container className={cn("px-4 py-5")}>
					<Outlet />
				</Container>
			</Box>
		</React.Fragment>
	);
};
