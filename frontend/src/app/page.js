// import Image from 'next/image'
// import styles from './page.module.css'
import { use, Suspense } from 'react'
import { sanityClient } from '../../sanity'

export const dynamic = 'auto',
  dynamicParams = true,
  revalidate = 0,
  fetchCache = 'auto',
  runtime = 'nodejs',
  preferredRegion = 'auto'

const Home = () => {
  const properties = use(getProperties())

  return <>Home Page</>

  // return (
  //   <Suspense fallback={<h2>Loading…</h2>}>
  //     <>Home Page</>
  //   </Suspense>
  // )
}

const getProperties = async () => {
  const query = '*[ _type == "property"]'

  const properties = await sanityClient.fetch(query) // exported parameters so no need { query: 'no-store' }
  // or alternative:
  //      const properties = await sanityClient.fetch(query, { query: 'no-store' })

  if (!properties.length) return []

  return properties
}

export default Home
