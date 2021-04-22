import { Box, Heading, Input, SimpleGrid } from '@chakra-ui/react'
import axios from 'axios'
import { GetStaticPropsResult } from 'next'
import Link from 'next/link'
import { FunctionComponent, useState } from 'react'
import { randomColor } from '../../utils'

type Film = {
  properties: {
    title: string
    episode_id: number
    opening_crawl: string
    director: string
    producer: string
    release_date: string
  },
  uid: string,
  name: string
}

interface FilmsPageProps {
  data: Film[]
}

export async function getStaticProps (): Promise<GetStaticPropsResult<FilmsPageProps>> {
  const { data: { result } } = await axios.get('https://www.swapi.tech/api/films')

  return {
    props: {
      data: result
    },
    revalidate: 86400
  }
}

const FilmsPage: FunctionComponent<FilmsPageProps> = (props: FilmsPageProps) => {
  const [searchTerm, setSearchTerm] = useState('')
  return (
    <Box my={16}>
      <Heading textAlign="center" size="xl" my={8}>Films</Heading>
      <Box textAlign="center" mb={4}>
        <Input
          placeholder="Search for films"
          onChange={e => {
            setSearchTerm(e.target.value)
          }}
          maxW={400}
          variant="filled"
        />
      </Box>
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} gridGap={12} p={4}>
        {props.data.filter(film => film.properties.title.toLowerCase().includes(searchTerm)).map(film => (
          <Link href={`/films/${film.uid}`} key={film.uid}>
            <Box boxShadow="md" rounded="md" cursor="pointer" _hover={{
              transform: 'scale(1.05)',
              transition: 'transform 400ms'
            }}>
              <Box width="100%" height={200} background={`linear-gradient(to bottom, #${randomColor()}, #${randomColor()})`}></Box>
              <Heading size="lg" p={4}>{film.properties.title}</Heading>
            </Box>
          </Link>
        ))}
      </SimpleGrid>
    </Box>
  )
}

export default FilmsPage
