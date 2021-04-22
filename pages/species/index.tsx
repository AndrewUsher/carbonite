import { Box, Heading, Input, SimpleGrid } from '@chakra-ui/react'
import axios from 'axios'
import { GetStaticPropsResult } from 'next'
import Link from 'next/link'
import { FunctionComponent, useState } from 'react'
import { randomColor } from '../../utils'

type SingleSpecies = {
  uid: string,
  name: string
}

interface SpeciesPageProps {
  data: SingleSpecies[]
}

export async function getStaticProps (): Promise<GetStaticPropsResult<SpeciesPageProps>> {
  let allSpecies: SingleSpecies[] = []
  let nextPageUrl = ''
  const { data } = await axios.get('https://www.swapi.tech/api/species')
  allSpecies = allSpecies.concat(data.results)
  nextPageUrl = data.next
  while (nextPageUrl) {
    const { data } = await axios.get(nextPageUrl)
    allSpecies = allSpecies.concat(data.results)
    nextPageUrl = data.next
  }

  return {
    props: {
      data: allSpecies
    },
    revalidate: 86400
  }
}

const SpeciesPage: FunctionComponent<SpeciesPageProps> = (props: SpeciesPageProps) => {
  const [searchTerm, setSearchTerm] = useState('')
  return (
    <Box my={16}>
      <Heading textAlign="center" size="xl" my={8}>Species</Heading>
      <Box textAlign="center" mb={4}>
        <Input
          placeholder="Search for species"
          onChange={e => {
            setSearchTerm(e.target.value)
          }}
          maxW={400}
          variant="filled"
        />
      </Box>
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} gridGap={12} p={4}>
        {props.data
          .filter(singleSpecies => singleSpecies
            .name
            .toLowerCase()
            .includes(searchTerm)
          )
          .map(singleSpecies => (
            <Link href={`/species/${singleSpecies.uid}`} key={singleSpecies.uid}>
              <Box boxShadow="md" rounded="md" cursor="pointer" _hover={{
                transform: 'scale(1.05)',
                transition: 'transform 400ms'
              }}>
                <Box width="100%" height={200} background={`linear-gradient(to bottom, #${randomColor()}, #${randomColor()})`}></Box>
                <Heading size="lg" p={4}>{singleSpecies.name}</Heading>
              </Box>
            </Link>
          ))}
      </SimpleGrid>
    </Box>
  )
}

export default SpeciesPage
