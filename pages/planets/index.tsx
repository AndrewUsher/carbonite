import { Box, Heading, Input, SimpleGrid } from '@chakra-ui/react'
import axios from 'axios'
import { GetStaticPropsResult } from 'next'
import Link from 'next/link'
import { FunctionComponent, useState } from 'react'
import { randomColor } from '../../utils'

type Planet = {
  uid: string,
  name: string
}

interface PlanetsPageProps {
  data: Planet[]
}

export async function getStaticProps (): Promise<GetStaticPropsResult<PlanetsPageProps>> {
  let allPlanets: Planet[] = []
  let nextPageUrl = ''
  const { data } = await axios.get('https://www.swapi.tech/api/planets')
  allPlanets = allPlanets.concat(data.results)
  nextPageUrl = data.next
  while (nextPageUrl) {
    const { data } = await axios.get(nextPageUrl)
    allPlanets = allPlanets.concat(data.results)
    nextPageUrl = data.next
  }

  return {
    props: {
      data: allPlanets
    },
    revalidate: 86400
  }
}

const PlanetsPage: FunctionComponent<PlanetsPageProps> = (props: PlanetsPageProps) => {
  const [searchTerm, setSearchTerm] = useState('')
  return (
    <Box my={16}>
      <Heading textAlign="center" size="xl" my={8}>Planets</Heading>
      <Box textAlign="center" mb={4}>
        <Input
          placeholder="Search for planets"
          onChange={e => {
            setSearchTerm(e.target.value)
          }}
          maxW={400}
          variant="filled"
        />
      </Box>
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} gridGap={12} p={4}>
        {props.data
          .filter(planet => planet
            .name
            .toLowerCase()
            .includes(searchTerm)
          )
          .map(planet => (
            <Link href={`/planets/${planet.uid}`} key={planet.uid}>
              <Box boxShadow="md" rounded="md" cursor="pointer" _hover={{
                transform: 'scale(1.05)',
                transition: 'transform 400ms'
              }}>
                <Box width="100%" height={200} background={`linear-gradient(to bottom, #${randomColor()}, #${randomColor()})`}></Box>
                <Heading size="lg" p={4}>{planet.name}</Heading>
              </Box>
            </Link>
          ))}
      </SimpleGrid>
    </Box>
  )
}

export default PlanetsPage
