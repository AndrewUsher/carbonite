import { Box, Heading, SimpleGrid } from '@chakra-ui/react'
import axios from 'axios'
import { GetStaticPropsResult } from 'next'
import Link from 'next/link'
import { FunctionComponent } from 'react'
import { randomColor } from '../../utils'

type Vehicle = {
  uid: string,
  name: string
}

interface VehiclesPageProps {
  data: Vehicle[]
}

export async function getStaticProps (): Promise<GetStaticPropsResult<VehiclesPageProps>> {
  let allVehicles: Vehicle[] = []
  let nextPageUrl = ''
  const { data } = await axios.get('https://www.swapi.tech/api/vehicles')
  allVehicles = allVehicles.concat(data.results)
  nextPageUrl = data.next
  while (nextPageUrl) {
    const { data } = await axios.get(nextPageUrl)
    allVehicles = allVehicles.concat(data.results)
    nextPageUrl = data.next
  }

  return {
    props: {
      data: allVehicles
    },
    revalidate: 86400
  }
}

const VehiclesPage: FunctionComponent<VehiclesPageProps> = (props: VehiclesPageProps) => {
  return (
    <Box my={16}>
      <Heading textAlign="center" size="xl" my={8}>Vehicles</Heading>
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} gridGap={12} p={4}>
        {props.data.map(vehicle => (
          <Link href={`/vehicles/${vehicle.uid}`} key={vehicle.uid}>
            <Box boxShadow="md" rounded="md" cursor="pointer" _hover={{
              transform: 'scale(1.05)',
              transition: 'transform 400ms'
            }}>
              <Box width="100%" height={200} background={`linear-gradient(to bottom, #${randomColor()}, #${randomColor()})`}></Box>
              <Heading size="lg" p={4}>{vehicle.name}</Heading>
            </Box>
          </Link>
        ))}
      </SimpleGrid>
    </Box>
  )
}

export default VehiclesPage
