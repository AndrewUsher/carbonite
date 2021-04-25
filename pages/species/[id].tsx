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
import Link from 'next/link'

type SingleSpeciesInfo = {
  average_height: string
  average_lifespan: string
  classification: string
  designation: string
  eye_colors: string
  hair_colors: string
  language: string
  name: string
  skin_colors: string
}

type Homeworld = {
  id: string
  name: string
}

type Props = {
  homeworld: Homeworld | undefined
  singleSpeciesInfo: SingleSpeciesInfo | undefined
}

export async function getStaticPaths () {
  return {
    paths: [],
    fallback: 'blocking'
  }
}

type SingleSpeciesPageStaticProps = {
  params: {
    id: string
  }
}

export async function getStaticProps ({ params }: SingleSpeciesPageStaticProps) {
  try {
    const { data } = await axios.get(`https://www.swapi.tech/api/species/${params.id}`)
    const { data: homeworldInfo } = await axios.get(data.result.properties.homeworld)
    return {
      props: {
        homeworld: {
          name: homeworldInfo.result.properties.name,
          id: homeworldInfo.result.uid
        },
        singleSpeciesInfo: data.result.properties
      },
      revalidate: 864000
    }
  } catch (err) {
    return {
      notFound: true
    }
  }
}

const SingleSpeciesPage: React.FunctionComponent<Props> = ({ homeworld, singleSpeciesInfo }: Props) => {
  if (!singleSpeciesInfo || !homeworld) return null

  return (
    <>
      <Head>
        <title>Species | {singleSpeciesInfo.name}</title>
      </Head>
      <article>
        <Heading textAlign="center">{singleSpeciesInfo.name}</Heading>
        <Box px={8} my={4}>
          <Heading size="md">Language: {singleSpeciesInfo.language}</Heading>
          <Heading size="md">Classification: {singleSpeciesInfo.classification}</Heading>
          <Heading size="md">Designation: {singleSpeciesInfo.designation}</Heading>
          <Heading size="md">Homeworld: <Link href={`/planets/${homeworld.id}`}>{homeworld.name}</Link></Heading>
        </Box>
        <Box my={2}>
          <Table variant="striped" size="lg">
            <TableCaption>Species Info</TableCaption>
            <Thead>
              <Tr>
                <Th>Average Height</Th>
                <Th>Average Lifespan</Th>
                <Th>Eye Color(s)</Th>
                <Th>Hair Color(s)</Th>
                <Th>Skin Color(s)</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>{singleSpeciesInfo.average_height}</Td>
                <Td>{singleSpeciesInfo.average_lifespan}</Td>
                <Td>{singleSpeciesInfo.eye_colors}</Td>
                <Td>{singleSpeciesInfo.hair_colors}</Td>
                <Td>{singleSpeciesInfo.skin_colors}</Td>
              </Tr>
            </Tbody>
          </Table>
        </Box>
      </article>
    </>
  )
}

export default SingleSpeciesPage
