import { Box, Heading, Input, SimpleGrid } from '@chakra-ui/react'
import axios from 'axios'
import { GetStaticPropsResult } from 'next'
import Link from 'next/link'
import { FunctionComponent, useMemo, useState } from 'react'
import { randomColor } from '../../utils'
import { Pagination } from '../../components/Pagination'

const ITEMS_PER_PAGE = 10

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
  const [currentPage, setCurrentPage] = useState(1)

  const filtered = useMemo(
    () => props.data.filter(planet => planet.name.toLowerCase().includes(searchTerm)),
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
      <Heading textAlign="center" size="xl" my={8}>Planets</Heading>
      <Box textAlign="center" mb={4}>
        <Input
          placeholder="Search for planets"
          onChange={e => handleSearch(e.target.value)}
          maxW={400}
          variant="subtle"
        />
      </Box>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} gridGap={12} p={4}>
        {paginated.map(planet => (
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
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </Box>
  )
}

export default PlanetsPage
