import { Box, Heading, Input, SimpleGrid } from '@chakra-ui/react'
import axios from 'axios'
import { GetStaticPropsResult } from 'next'
import Link from 'next/link'
import { FunctionComponent, useMemo, useState } from 'react'
import { randomColor } from '../../utils'
import { Pagination } from '../../components/Pagination'

const ITEMS_PER_PAGE = 10

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
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const filtered = useMemo(
    () => props.data.filter(starship => starship.name.toLowerCase().includes(searchTerm)),
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
      <Heading textAlign="center" size="xl" my={8}>Starships</Heading>
      <Box textAlign="center" mb={4}>
        <Input
          placeholder="Search for starships"
          onChange={e => handleSearch(e.target.value)}
          maxW={400}
          variant="filled"
        />
      </Box>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} gridGap={12} p={4}>
        {paginated.map(starship => (
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
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </Box>
  )
}

export default StarshipPage
