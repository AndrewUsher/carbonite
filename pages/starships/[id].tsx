import { Box, Container, Heading, Table } from "@chakra-ui/react";
import axios from "axios";
import Head from "next/head";
import { ResourceNotFound } from "../../components/ResourceNotFound";

type StarshipInfo = {
	MGLT: string;
	cargo_capacity: string;
	consumables: string;
	cost_in_credits: string;
	crew: string;
	hyperdrive_rating: string;
	length: string;
	manufacturer: string;
	max_atmosphering_speed: string;
	model: string;
	name: string;
	passengers: string;
	starship_class: string;
};

type Props = {
	starshipInfo: StarshipInfo | null;
};

export async function getStaticPaths() {
	return {
		paths: [],
		fallback: "blocking",
	};
}

type StarshipPageStaticProps = {
	params: {
		id: string;
	};
};

export async function getStaticProps({ params }: StarshipPageStaticProps) {
	try {
		const { data } = await axios.get(
			`https://www.swapi.tech/api/starships/${params.id}`,
		);
		return {
			props: {
				starshipInfo: data.result.properties,
			},
			revalidate: 864000,
		};
	} catch {
		return {
			props: {
				starshipInfo: null,
			},
		};
	}
}

export default function StarshipPage({ starshipInfo }: Props) {
	if (!starshipInfo) return <ResourceNotFound category="starships" />;

	return (
		<>
			<Head>
				<title>
					Starship | {starshipInfo.manufacturer} {starshipInfo.name}
				</title>
			</Head>
			<Container as="article" maxW="container.lg">
				<Heading textAlign="center" mt={8}>
					{starshipInfo.manufacturer} {starshipInfo.name}
				</Heading>
				<Box px={8} my={4}>
					<Heading size="md">
						Costs {starshipInfo.cost_in_credits} credits
					</Heading>
					<Heading size="md">{starshipInfo.length} meters long</Heading>
				</Box>
				<Box my={2}>
					<Table.Root striped size="lg">
						<Table.Caption>Starship Info</Table.Caption>
						<Table.Header>
							<Table.Row>
								<Table.ColumnHeader>Starship Class</Table.ColumnHeader>
								<Table.ColumnHeader>Model</Table.ColumnHeader>
								<Table.ColumnHeader>Max Cargo Capacity</Table.ColumnHeader>
							</Table.Row>
						</Table.Header>
						<Table.Body>
							<Table.Row>
								<Table.Cell>{starshipInfo.starship_class}</Table.Cell>
								<Table.Cell>{starshipInfo.model}</Table.Cell>
								<Table.Cell>{starshipInfo.cargo_capacity} kg</Table.Cell>
							</Table.Row>
						</Table.Body>
					</Table.Root>
				</Box>
			</Container>
		</>
	);
}
