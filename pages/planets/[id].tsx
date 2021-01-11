import axios from 'axios'

type PlanetInfo = {
  name: string
}

type Props = {
  planetInfo: PlanetInfo | undefined
}

export async function getStaticPaths () {
  return {
    paths: [],
    fallback: true
  }
}

type PlanetPageStaticProps = {
  params: {
    id: string
  }
}

export async function getStaticProps ({params, ...rest}: PlanetPageStaticProps) {
  try {
    const {data} = await axios.get(`https://www.swapi.tech/api/planets/${params.id}`)
    return {
      props: {
        planetInfo: data.result.properties
      },
      revalidate: 1
    }
  }
  catch {
    return {
      notFound: true
    }
  }
}


export default function PlanetPage ({planetInfo}: Props)  {
  if (!planetInfo) return null

  return (
    <article>
      <h1>{planetInfo.name}</h1>
    </article>
  )
}