import axios from 'axios'
import {
  Box,
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

type VehicleInfo = {
  name: string
  model: string
  vehicle_class: string
  manufacturer: string
  length: string
  cost_in_credits: string
  crew: string
  passengers: string
  max_atmosphering_speed: string
  cargo_capacity: string

}

type Props = {
  vehicleInfo: VehicleInfo | undefined
}

export async function getStaticPaths () {
  return {
    paths: [],
    fallback: 'blocking'
  }
}

type PlanetPageStaticProps = {
  params: {
    id: string
  }
}

export async function getStaticProps ({ params }: PlanetPageStaticProps) {
  try {
    const { data } = await axios.get(`https://www.swapi.tech/api/vehicles/${params.id}`)
    return {
      props: {
        vehicleInfo: data.result.properties
      },
      revalidate: 864000
    }
  } catch {
    return {
      notFound: true
    }
  }
}

export default function VehiclePage ({ vehicleInfo }: Props) {
  if (!vehicleInfo) return null

  return (
    <>
      <Head>
        <title>Vehicle | {vehicleInfo.manufacturer} {vehicleInfo.name}</title>
      </Head>
      <article>
        <Heading textAlign="center">{vehicleInfo.manufacturer} {vehicleInfo.name}</Heading>
        <Box px={8} my={4}>
          <Heading size="md">Costs {vehicleInfo.cost_in_credits} credits</Heading>
          <Heading size="md">{vehicleInfo.length} meters long</Heading>
        </Box>
        <Box my={2}>
          <Table variant="striped" size="lg">
            <TableCaption>Vehicle Info</TableCaption>
            <Thead>
              <Tr>
                <Th>Vehicle Class</Th>
                <Th>Model</Th>
                <Th>Max Cargo Capacity</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>{vehicleInfo.vehicle_class}</Td>
                <Td>{vehicleInfo.model}</Td>
                <Td>{vehicleInfo.cargo_capacity} kg</Td>
              </Tr>
            </Tbody>
          </Table>
        </Box>
      </article>
    </>
  )
}
