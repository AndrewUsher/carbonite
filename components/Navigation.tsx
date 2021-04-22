import { FC } from 'react'
import { Flex, Heading, Button, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react'
import { signIn, signOut, useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import Link from 'next/link'

export const Navigation: FC = () => {
  const [session, sessionInfoLoading] = useSession()
  const router = useRouter()

  const navigateToFavorites = () => {
    router.push('/favorites')
  }

  const handleSignIn = () => {
    signIn()
  }

  const handleSignOut = () => {
    signOut()
  }

  console.log(session)
  return (
    <Flex bg="#0f1123" color="#f8f1f1" p={4} alignItems="center" justifyContent="space-between">
      <Heading size="lg">
        <Link href="/">
          Carbonite
        </Link>
      </Heading>
      {session ? (
        <Menu colorScheme="purple">
          <MenuButton
            as={Button}
            leftIcon={session.user.image ? <img width={30} src={session.user.image} alt=""/> : null}
            variant="solid"
            colorScheme="purple"
          >
            {session.user.name}
          </MenuButton>
          <MenuList color="black">
            <MenuItem onClick={navigateToFavorites}>Favorites</MenuItem>
            <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
          </MenuList>
        </Menu>
      ) : (
        <Button variant="solid" colorScheme="purple" isLoading={sessionInfoLoading} onClick={handleSignIn}>Sign In</Button>
      )}
    </Flex>
  )
}
