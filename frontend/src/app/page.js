// import Image from 'next/image'
// import styles from './page.module.css'
import { use, Suspense } from 'react'
import { sanityClient } from '../../sanity'

const Home = () => {
  const properties = use(getData())

  return (
    <Suspense fallback={<h2>Loading…</h2>}>
      <>Home Page</>
    </Suspense>
  )
}

const getData = async () => {
  const query = '*[ _type == "property"]'

  const properties = await sanityClient.fetch(query, { query: 'no-store' })

  if (!properties.length) return []

  return properties
}

export default Home
