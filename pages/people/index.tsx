import { Box, Heading, Input, SimpleGrid } from '@chakra-ui/react'
import axios from 'axios'
import { GetStaticPropsResult } from 'next'
import Link from 'next/link'
import { FunctionComponent, useState } from 'react'
import { randomColor } from '../../utils'

type Person = {
  uid: string,
  name: string
}

interface PeoplePageProps {
  data: Person[]
}

export async function getStaticProps (): Promise<GetStaticPropsResult<PeoplePageProps>> {
  let allPeople: Person[] = []
  let nextPageUrl = ''
  const { data } = await axios.get('https://www.swapi.tech/api/people')
  allPeople = allPeople.concat(data.results)
  nextPageUrl = data.next
  while (nextPageUrl) {
    const { data } = await axios.get(nextPageUrl)
    allPeople = allPeople.concat(data.results)
    nextPageUrl = data.next
  }

  return {
    props: {
      data: allPeople
    },
    revalidate: 86400
  }
}

const PeoplePage: FunctionComponent<PeoplePageProps> = (props: PeoplePageProps) => {
  const [searchTerm, setSearchTerm] = useState('')
  return (
    <Box my={16}>
      <Heading textAlign="center" size="xl" my={8}>People</Heading>
      <Box textAlign="center" mb={4}>
        <Input
          placeholder="Search for people"
          onChange={e => {
            setSearchTerm(e.target.value)
          }}
          maxW={400}
          variant="filled"
        />
      </Box>
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} gridGap={12} p={4}>
        {props.data
          .filter(person => person
            .name
            .toLowerCase()
            .includes(searchTerm)
          )
          .map(person => (
            <Link href={`/people/${person.uid}`} key={person.uid}>
              <Box boxShadow="md" rounded="md" cursor="pointer" _hover={{
                transform: 'scale(1.05)',
                transition: 'transform 400ms'
              }}>
                <Box width="100%" height={200} background={`linear-gradient(to bottom, #${randomColor()}, #${randomColor()})`}></Box>
                <Heading size="lg" p={4}>{person.name}</Heading>
              </Box>
            </Link>
          ))}
      </SimpleGrid>
    </Box>
  )
}

export default PeoplePage
