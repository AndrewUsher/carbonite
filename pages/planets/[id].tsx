import axios from 'axios'
import {
  Box,
  Heading,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr
} from '@chakra-ui/react'
import Head from 'next/head'

type PlanetInfo = {
  climate: string
  name: string
  orbital_period: string
  rotation_period: string
  terrain: string
}

type Props = {
  planetInfo: PlanetInfo | undefined
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

export async function getStaticProps ({ params, ...rest }: PlanetPageStaticProps) {
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
      notFound: true
    }
  }
}

export default function PlanetPage ({ planetInfo }: Props) {
  if (!planetInfo) return null

  return (
    <>
      <Head>
        <title>Planets | {planetInfo.name}</title>
      </Head>
      <article>
        <Heading textAlign="center">{planetInfo.name}</Heading>
        <Box my={4}>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Climate</Th>
                <Th>Terrain</Th>
                <Th>Orbital Period</Th>
                <Th>Rotation Period</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>{planetInfo.climate}</Td>
                <Td>{planetInfo.terrain}</Td>
                <Td>{planetInfo.orbital_period} days</Td>
                <Td>{planetInfo.rotation_period} hours</Td>
              </Tr>
            </Tbody>
          </Table>
        </Box>
      </article>
    </>
  )
}
