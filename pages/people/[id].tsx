import axios from 'axios'
import {
  Box,
  Heading,
  Table
} from '@chakra-ui/react'
import Head from 'next/head'
import { ResourceNotFound } from '../../components/ResourceNotFound'

type PersonInfo = {
  height: string
  mass: string
  hair_color: string
  skin_color: string
  eye_color: string
  birth_year: string
  gender: string
  name: string
}

type Props = {
  personInfo: PersonInfo | null
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
    const { data } = await axios.get(`https://www.swapi.tech/api/people/${params.id}`)
    return {
      props: {
        personInfo: data.result.properties
      },
      revalidate: 864000
    }
  } catch {
    return {
      props: {
        personInfo: null
      }
    }
  }
}

export default function PersonPage ({ personInfo }: Props) {
  if (!personInfo) return <ResourceNotFound category="people" />

  return (
    <>
      <Head>
        <title>People | {personInfo.name}</title>
      </Head>
      <article>
        <Heading textAlign="center" mt={8}>{personInfo.name}</Heading>
        <Box px={8} my={4}>
          <Heading size="md">Gender: {personInfo.gender}</Heading>
          <Heading size="md">Weight: {personInfo.mass} kg</Heading>
          <Heading size="md">Height: {personInfo.height} cm</Heading>
        </Box>
        <Box my={2}>
          <Table.Root striped size="lg">
            <Table.Caption>Character Info</Table.Caption>
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader>Birth Year</Table.ColumnHeader>
                <Table.ColumnHeader>Eye Color</Table.ColumnHeader>
                <Table.ColumnHeader>Hair Color</Table.ColumnHeader>
                <Table.ColumnHeader>Skin Color</Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell>{personInfo.birth_year}</Table.Cell>
                <Table.Cell>{personInfo.eye_color}</Table.Cell>
                <Table.Cell>{personInfo.hair_color}</Table.Cell>
                <Table.Cell>{personInfo.skin_color}</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table.Root>
        </Box>
      </article>
    </>
  )
}
