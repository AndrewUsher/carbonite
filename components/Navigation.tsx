import { Button, Flex, Heading, Menu } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, useCallback } from "react";
import { LuChevronDown } from "react-icons/lu";

export const Navigation: FC = () => {
	const router = useRouter();

	const navigateTo = useCallback(
		(path: string) => () => {
			router.push(path);
		},
		[router],
	);

	return (
		<Flex
			bg="#0f1123"
			color="#f8f1f1"
			p={4}
			alignItems="center"
			justifyContent="space-between"
		>
			<Heading size="lg">
				<Link href="/">Carbonite</Link>
			</Heading>
			<Flex>
				<Menu.Root>
					<Menu.Trigger asChild>
						<Button variant="solid" colorPalette="blue" mr={4}>
							Browse
							<LuChevronDown />
						</Button>
					</Menu.Trigger>
					<Menu.Positioner>
						<Menu.Content>
							<Menu.Item value="films" onClick={navigateTo("/films")}>
								Films
							</Menu.Item>
							<Menu.Item value="people" onClick={navigateTo("/people")}>
								People
							</Menu.Item>
							<Menu.Item value="planets" onClick={navigateTo("/planets")}>
								Planets
							</Menu.Item>
							<Menu.Item value="species" onClick={navigateTo("/species")}>
								Species
							</Menu.Item>
							<Menu.Item value="starships" onClick={navigateTo("/starships")}>
								Starships
							</Menu.Item>
							<Menu.Item value="vehicles" onClick={navigateTo("/vehicles")}>
								Vehicles
							</Menu.Item>
						</Menu.Content>
					</Menu.Positioner>
				</Menu.Root>
			</Flex>
		</Flex>
	);
};
