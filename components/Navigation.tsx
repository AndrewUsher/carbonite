import { Box, Heading, Text } from '@chakra-ui/react'
import { FunctionComponent, ReactElement } from 'react'

export const Navigation = (): ReactElement => {
  return (
    <Box bg="#0f1123" color="#f8f1f1" p={4}>
      <Heading size="lg">Carbonite</Heading>
    </Box>
  )
}
