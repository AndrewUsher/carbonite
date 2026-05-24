import { Box, Button, Heading, Text } from '@chakra-ui/react'
import Link from 'next/link'

type ResourceNotFoundProps = {
  category: string
}

export const ResourceNotFound = ({ category }: ResourceNotFoundProps) => (
  <Box textAlign="center" my={20}>
    <Heading size="xl" mb={4}>Resource Not Found</Heading>
    <Text mb={6}>The requested {category} could not be found.</Text>
    <Button asChild colorPalette="blue">
      <Link href={`/${category}`}>
        Browse all {category}
      </Link>
    </Button>
  </Box>
)
