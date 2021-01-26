import { Box, Container, Flex, Heading, Text } from '@chakra-ui/react'
import Image from 'next/image'

const Index = () => {
  return (
    <>
      <Container mt={8} textAlign="center">
        <Heading>
            Welcome to Carbonite
        </Heading>
        <Text>
            Carbonite is an online encyclopedia for information
            on the Star Wars universe—including. Feel free
            to jump into one of the categories below or search for info above.
        </Text>
      </Container>
    </>
  )
}

export default Index
