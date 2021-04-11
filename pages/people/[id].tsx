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
  personInfo: PersonInfo | undefined
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
      notFound: true
    }
  }
}

export default function VehiclePage ({ personInfo }: Props) {
  if (!personInfo) return null

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
          <Table variant="striped" size="lg">
            <TableCaption>Character Info</TableCaption>
            <Thead>
              <Tr>
                <Th>Birth Year</Th>
                <Th>Eye Color</Th>
                <Th>Hair Color</Th>
                <Th>Skin Color</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>{personInfo.birth_year}</Td>
                <Td>{personInfo.eye_color}</Td>
                <Td>{personInfo.hair_color}</Td>
                <Td>{personInfo.skin_color}</Td>
              </Tr>
            </Tbody>
          </Table>
        </Box>
      </article>
    </>
  )
}
