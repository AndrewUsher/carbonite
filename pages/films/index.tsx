import { Box, Heading, Input, SimpleGrid } from '@chakra-ui/react'
import axios from 'axios'
import { GetStaticPropsResult } from 'next'
import Link from 'next/link'
import { FunctionComponent, useMemo, useState } from 'react'
import { randomColor } from '../../utils'
import { Pagination } from '../../components/Pagination'

const ITEMS_PER_PAGE = 10

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
  const [currentPage, setCurrentPage] = useState(1)

  const filtered = useMemo(
    () => props.data.filter(film => film.properties.title.toLowerCase().includes(searchTerm)),
    [props.data, searchTerm]
  )

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE))
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

  const handleSearch = (value: string) => {
    setSearchTerm(value)
    setCurrentPage(1)
  }

  return (
    <Box my={16}>
      <Heading textAlign="center" size="xl" my={8}>Films</Heading>
      <Box textAlign="center" mb={4}>
        <Input
          placeholder="Search for films"
          onChange={e => handleSearch(e.target.value)}
          maxW={400}
          variant="subtle"
        />
      </Box>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} gridGap={12} p={4}>
        {paginated.map(film => (
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
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </Box>
  )
}

export default FilmsPage
