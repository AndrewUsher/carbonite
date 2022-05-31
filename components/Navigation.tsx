import { FC, useCallback } from 'react'
import { Flex, Heading, Button, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { ChevronDownIcon } from '@chakra-ui/icons'

export const Navigation: FC = () => {
  const router = useRouter()

  const navigateTo = useCallback((path: string) => () => {
    router.push(path)
  }, [router])

  return (
    <Flex bg="#0f1123" color="#f8f1f1" p={4} alignItems="center" justifyContent="space-between">
      <Heading size="lg">
        <Link href="/">
          Carbonite
        </Link>
      </Heading>
      <Flex>
        <Menu colorScheme="blue">
          <MenuButton
            as={Button}
            rightIcon={<ChevronDownIcon />}
            variant="solid"
            colorScheme="blue"
            mr={4}
          >
          Browse
          </MenuButton>
          <MenuList color="black">
            <MenuItem onClick={navigateTo('/films')}>Films</MenuItem>
            <MenuItem onClick={navigateTo('/people')}>People</MenuItem>
            <MenuItem onClick={navigateTo('/planets')}>Planets</MenuItem>
            <MenuItem onClick={navigateTo('/species')}>Species</MenuItem>
            <MenuItem onClick={navigateTo('/starships')}>Starships</MenuItem>
            <MenuItem onClick={navigateTo('/vehicles')}>Vehicles</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  )
}
