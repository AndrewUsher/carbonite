import { Flex, Heading, Text } from '@chakra-ui/react'
import { signIn, useSession } from 'next-auth/client'
import { FunctionComponent, ReactElement } from 'react'

export const Navigation = (): ReactElement => {
  const [session] = useSession()

  console.log(session)
  return (
    <Flex bg="#0f1123" color="#f8f1f1" p={4} alignItems="center" justifyContent="space-between">
      <Heading size="lg">Carbonite</Heading>
      {session ? <Text onClick={signIn}>Howdy, {session.user.name}!</Text> : <Text onClick={signIn}>Sign In, Whore!</Text>}
    </Flex>
  )
}
