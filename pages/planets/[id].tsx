import axios from 'axios'
import {
  Box,
  Heading,
  Table
} from '@chakra-ui/react'
import Head from 'next/head'
import { ResourceNotFound } from '../../components/ResourceNotFound'

type PlanetInfo = {
  climate: string
  name: string
  orbital_period: string
  rotation_period: string
  terrain: string
}

type Props = {
  planetInfo: PlanetInfo | null
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
    const { data } = await axios.get(`https://www.swapi.tech/api/planets/${params.id}`)
    return {
      props: {
        planetInfo: data.result.properties
      },
      revalidate: 864000
    }
  } catch {
    return {
      props: {
        planetInfo: null
      }
    }
  }
}

export default function PlanetPage ({ planetInfo }: Props) {
  if (!planetInfo) return <ResourceNotFound category="planets" />

  return (
    <>
      <Head>
        <title>Planets | {planetInfo.name}</title>
      </Head>
      <article>
        <Heading textAlign="center">{planetInfo.name}</Heading>
        <Box my={4}>
          <Table.Root variant="outline">
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader>Climate</Table.ColumnHeader>
                <Table.ColumnHeader>Terrain</Table.ColumnHeader>
                <Table.ColumnHeader>Orbital Period</Table.ColumnHeader>
                <Table.ColumnHeader>Rotation Period</Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell>{planetInfo.climate}</Table.Cell>
                <Table.Cell>{planetInfo.terrain}</Table.Cell>
                <Table.Cell>{planetInfo.orbital_period} days</Table.Cell>
                <Table.Cell>{planetInfo.rotation_period} hours</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table.Root>
        </Box>
      </article>
    </>
  )
}
