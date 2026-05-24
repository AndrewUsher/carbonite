import axios from 'axios'
import {
  Box,
  Heading,
  Table
} from '@chakra-ui/react'
import Head from 'next/head'
import { ResourceNotFound } from '../../components/ResourceNotFound'

type FilmInfo = {
  title: string
  episode_id: number
  opening_crawl: string
  director: string
  producer: string
  release_date: string

}

type Props = {
  filmInfo: FilmInfo | null
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
      props: {
        filmInfo: null
      }
    }
  }
}

export default function FilmPage ({ filmInfo }: Props) {
  if (!filmInfo) return <ResourceNotFound category="films" />

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
          <Table.Root striped size="lg">
            <Table.Caption>Film Info</Table.Caption>
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader>Release Date</Table.ColumnHeader>
                <Table.ColumnHeader>Opening Crawl</Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell>{new Date(filmInfo.release_date).toLocaleDateString()}</Table.Cell>
                <Table.Cell>{filmInfo.opening_crawl}</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table.Root>
        </Box>
      </article>
    </>
  )
}
