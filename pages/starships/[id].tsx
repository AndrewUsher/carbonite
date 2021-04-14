import axios from 'axios'
import {
  Box,
  Container,
  Heading,
  Table,
  TableCaption,
  Tbody,
  Td,
  Th,
  Thead,
  Tr
} from '@chakra-ui/react'
import Head from 'next/head'

type StarshipInfo = {
  MGLT: string
  cargo_capacity: string
  consumables: string
  cost_in_credits: string
  crew: string
  hyperdrive_rating: string
  length: string
  manufacturer: string
  max_atmosphering_speed: string
  model: string
  name: string
  passengers: string
  starship_class: string
}

type Props = {
  starshipInfo: StarshipInfo | undefined
}

export async function getStaticPaths () {
  return {
    paths: [],
    fallback: 'blocking'
  }
}

type StarshipPageStaticProps = {
  params: {
    id: string
  }
}

export async function getStaticProps ({ params }: StarshipPageStaticProps) {
  try {
    const { data } = await axios.get(`https://www.swapi.tech/api/starships/${params.id}`)
    return {
      props: {
        starshipInfo: data.result.properties
      },
      revalidate: 864000
    }
  } catch {
    return {
      notFound: true
    }
  }
}

export default function VehiclePage ({ starshipInfo }: Props) {
  if (!starshipInfo) return null

  return (
    <>
      <Head>
        <title>Starship | {starshipInfo.manufacturer} {starshipInfo.name}</title>
      </Head>
      <Container as="article" maxW="container.lg">
        <Heading textAlign="center" mt={8}>{starshipInfo.manufacturer} {starshipInfo.name}</Heading>
        <Box px={8} my={4}>
          <Heading size="md">Costs {starshipInfo.cost_in_credits} credits</Heading>
          <Heading size="md">{starshipInfo.length} meters long</Heading>
        </Box>
        <Box my={2}>
          <Table variant="striped" size="lg">
            <TableCaption placement="top">Starship Info</TableCaption>
            <Thead>
              <Tr>
                <Th>Starship Class</Th>
                <Th>Model</Th>
                <Th>Max Cargo Capacity</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>{starshipInfo.starship_class}</Td>
                <Td>{starshipInfo.model}</Td>
                <Td>{starshipInfo.cargo_capacity} kg</Td>
              </Tr>
            </Tbody>
          </Table>
        </Box>
      </Container>
    </>
  )
}
