import { Box, Heading, SimpleGrid } from '@chakra-ui/react'
import axios from 'axios'
import { GetStaticPropsResult } from 'next'
import Link from 'next/link'
import { FunctionComponent } from 'react'
import { randomColor } from '../../utils'

type Starship = {
  uid: string,
  name: string
}

interface StarshipPageProps {
  data: Starship[]
}

export async function getStaticProps (): Promise<GetStaticPropsResult<StarshipPageProps>> {
  let allStarships: Starship[] = []
  let nextPageUrl = ''
  const { data } = await axios.get('https://www.swapi.tech/api/starships')
  allStarships = allStarships.concat(data.results)
  nextPageUrl = data.next
  while (nextPageUrl) {
    const { data } = await axios.get(nextPageUrl)
    allStarships = allStarships.concat(data.results)
    nextPageUrl = data.next
  }

  return {
    props: {
      data: allStarships
    },
    revalidate: 86400
  }
}

const StarshipPage: FunctionComponent<StarshipPageProps> = (props: StarshipPageProps) => {
  return (
    <Box my={16}>
      <Heading textAlign="center" size="xl" my={8}>Starships</Heading>
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} gridGap={12} p={4}>
        {props.data.map(starship => (
          <Link href={`/starships/${starship.uid}`} key={starship.uid}>
            <Box boxShadow="md" rounded="md" cursor="pointer" _hover={{
              transform: 'scale(1.05)',
              transition: 'transform 400ms'
            }}>
              <Box width="100%" height={200} background={`linear-gradient(to bottom, #${randomColor()}, #${randomColor()})`}></Box>
              <Heading size="lg" p={4}>{starship.name}</Heading>
            </Box>
          </Link>
        ))}
      </SimpleGrid>
    </Box>
  )
}

export default StarshipPage
