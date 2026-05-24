import axios from 'axios'
import {
  Box,
  Heading,
  Table
} from '@chakra-ui/react'
import Head from 'next/head'
import { ResourceNotFound } from '../../components/ResourceNotFound'

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
  vehicleInfo: VehicleInfo | null
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
      props: {
        vehicleInfo: null
      }
    }
  }
}

export default function VehiclePage ({ vehicleInfo }: Props) {
  if (!vehicleInfo) return <ResourceNotFound category="vehicles" />

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
          <Table.Root striped size="lg">
            <Table.Caption>Vehicle Info</Table.Caption>
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader>Vehicle Class</Table.ColumnHeader>
                <Table.ColumnHeader>Model</Table.ColumnHeader>
                <Table.ColumnHeader>Max Cargo Capacity</Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell>{vehicleInfo.vehicle_class}</Table.Cell>
                <Table.Cell>{vehicleInfo.model}</Table.Cell>
                <Table.Cell>{vehicleInfo.cargo_capacity} kg</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table.Root>
        </Box>
      </article>
    </>
  )
}
