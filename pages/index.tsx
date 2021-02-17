import { Box, Container, Heading, Image, SimpleGrid, Text } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import Head from 'next/head'
import Link from 'next/link'

type InfoCardProps = {
  imageUrl: string
  link: string
  title: string
}

const InfoCard = ({ imageUrl, link, title }: InfoCardProps) => {
  return (
    <motion.div animate={{ scale: [0.9, 1.1, 1] }}>
      <Link href={link}>
        <Box boxShadow="md" rounded="md" cursor="pointer">
          <Image
            height={300}
            width="100%"
            src={imageUrl || '/characters-home-banner.jpg'}
            roundedTop="md"
          />
          <Heading fontSize="lg" p={4}>{title}</Heading>
        </Box>
      </Link>
    </motion.div>
  )
}

const Index = () => {
  return (
    <>
      <Head>
        <title>Carbonite</title>
      </Head>
      <Container my={8} textAlign="center">
        <Heading>
            Welcome to Carbonite
        </Heading>
        <Text>
            Carbonite is an online encyclopedia for information
            on the Star Wars universe—including. Feel free
            to jump into one of the categories below or search for info above.
        </Text>
      </Container>
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} gridGap={12} p={4}>
        <InfoCard link="/films" title="Films" imageUrl="/films-home-banner.jpg"/>
        <InfoCard link="/people" title="People" imageUrl="/characters-home-banner.jpg"/>
        <InfoCard link="/planets" title="Planets" imageUrl="/planets-home-banner.jpg"/>
        <InfoCard link="/species" title="Species" imageUrl="/species-home-banner.jpg"/>
        <InfoCard link="/starships" title="Starships" imageUrl="/starships-home-banner.jpg" />
        <InfoCard link="/vehicles" title="Vehicles" imageUrl="/vehicles-home-banner.jpg"/>
      </SimpleGrid>
    </>
  )
}

export default Index
