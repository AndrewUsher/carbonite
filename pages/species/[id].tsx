import { Box, Heading, Table } from "@chakra-ui/react";
import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { ResourceNotFound } from "../../components/ResourceNotFound";

type SingleSpeciesInfo = {
	average_height: string;
	average_lifespan: string;
	classification: string;
	designation: string;
	eye_colors: string;
	hair_colors: string;
	language: string;
	name: string;
	skin_colors: string;
};

type Homeworld = {
	id: string;
	name: string;
};

type Props = {
	homeworld: Homeworld | null;
	singleSpeciesInfo: SingleSpeciesInfo | null;
};

export async function getStaticPaths() {
	return {
		paths: [],
		fallback: "blocking",
	};
}

type SingleSpeciesPageStaticProps = {
	params: {
		id: string;
	};
};

export async function getStaticProps({ params }: SingleSpeciesPageStaticProps) {
	try {
		const { data } = await axios.get(
			`https://www.swapi.tech/api/species/${params.id}`,
		);
		const { data: homeworldInfo } = await axios.get(
			data.result.properties.homeworld,
		);
		return {
			props: {
				homeworld: {
					name: homeworldInfo.result.properties.name,
					id: homeworldInfo.result.uid,
				},
				singleSpeciesInfo: data.result.properties,
			},
			revalidate: 864000,
		};
	} catch (err) {
		return {
			props: {
				homeworld: null,
				singleSpeciesInfo: null,
			},
		};
	}
}

const SingleSpeciesPage: React.FunctionComponent<Props> = ({
	homeworld,
	singleSpeciesInfo,
}: Props) => {
	if (!singleSpeciesInfo || !homeworld)
		return <ResourceNotFound category="species" />;

	return (
		<>
			<Head>
				<title>Species | {singleSpeciesInfo.name}</title>
			</Head>
			<article>
				<Heading textAlign="center">{singleSpeciesInfo.name}</Heading>
				<Box px={8} my={4}>
					<Heading size="md">Language: {singleSpeciesInfo.language}</Heading>
					<Heading size="md">
						Classification: {singleSpeciesInfo.classification}
					</Heading>
					<Heading size="md">
						Designation: {singleSpeciesInfo.designation}
					</Heading>
					<Heading size="md">
						Homeworld:{" "}
						<Link href={`/planets/${homeworld.id}`}>{homeworld.name}</Link>
					</Heading>
				</Box>
				<Box my={2}>
					<Table.Root striped size="lg">
						<Table.Caption>Species Info</Table.Caption>
						<Table.Header>
							<Table.Row>
								<Table.ColumnHeader>Average Height</Table.ColumnHeader>
								<Table.ColumnHeader>Average Lifespan</Table.ColumnHeader>
								<Table.ColumnHeader>Eye Color(s)</Table.ColumnHeader>
								<Table.ColumnHeader>Hair Color(s)</Table.ColumnHeader>
								<Table.ColumnHeader>Skin Color(s)</Table.ColumnHeader>
							</Table.Row>
						</Table.Header>
						<Table.Body>
							<Table.Row>
								<Table.Cell>{singleSpeciesInfo.average_height}</Table.Cell>
								<Table.Cell>{singleSpeciesInfo.average_lifespan}</Table.Cell>
								<Table.Cell>{singleSpeciesInfo.eye_colors}</Table.Cell>
								<Table.Cell>{singleSpeciesInfo.hair_colors}</Table.Cell>
								<Table.Cell>{singleSpeciesInfo.skin_colors}</Table.Cell>
							</Table.Row>
						</Table.Body>
					</Table.Root>
				</Box>
			</article>
		</>
	);
};

export default SingleSpeciesPage;
