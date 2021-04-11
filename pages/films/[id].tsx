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

type FilmInfo = {
  title: string
  episode_id: number
  opening_crawl: string
  director: string
  producer: string
  release_date: string

}

type Props = {
  filmInfo: FilmInfo | undefined
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
    const { data } = await axios.get(`https://www.swapi.tech/api/films/${params.id}`)
    return {
      props: {
        filmInfo: data.result.properties
      },
      revalidate: 864000
    }
  } catch {
    return {
      notFound: true
    }
  }
}

export default function VehiclePage ({ filmInfo }: Props) {
  if (!filmInfo) return null

  return (
    <>
      <Head>
        <title>Films | {filmInfo.title}</title>
      </Head>
      <article>
        <Heading textAlign="center" mt={8}>{filmInfo.title}</Heading>
        <Box px={8} my={4}>
          <Heading size="md">Directed By {filmInfo.director}</Heading>
          <Heading size="md">Producer(s): {filmInfo.producer}</Heading>
        </Box>
        <Box my={2}>
          <Table variant="striped" size="lg">
            <TableCaption>Film Info</TableCaption>
            <Thead>
              <Tr>
                <Th>Release Date</Th>
                <Th>Opening Crawl</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>{new Date(filmInfo.release_date).toLocaleDateString()}</Td>
                <Td>{filmInfo.opening_crawl}</Td>
              </Tr>
            </Tbody>
          </Table>
        </Box>
      </article>
    </>
  )
}
