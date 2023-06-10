import { use } from 'react'
import Link from 'next/link'
import { sanityClient } from '../../sanity'
import { isMultiple } from '@/utils/maths'
import Image from './components/Image'

export const dynamic = 'auto',
  dynamicParams = true,
  revalidate = 0,
  fetchCache = 'auto',
  runtime = 'nodejs',
  preferredRegion = 'auto'

const Home = () => {
  const properties = use(getProperties())

  return (
    <>
      {properties && (
        <div className="main">
          <div className="feed-container">
            <h1>Places to stay near you</h1>
            <div className="feed">
              {properties.map((property) => (
                <>
                  {console.log('YOA', { property })}
                  <Link href={`property/${property.slug.current}`}>
                    <div key={property._id} className="card">
                      <Image image={property.mainImage} wrapper={false} />
                      <p>
                        {property.reviews?.length} review
                        {isMultiple(property?.reviews?.length)}
                      </p>
                      <h3>{property.title}</h3>
                      <h3>
                        <b>£{property.pricePerNight}/per Night</b>
                      </h3>
                    </div>
                  </Link>
                </>
              ))}
            </div>
          </div>
          <div className="map">
            {/*
              A map should be here: I just didnt setup google billing account
              for the API key! :D
                
              For exemple home page map component with all porperties location:
              <DashboardMap properties={properties} /> 
           */}
            <img class="map-placeholder" src="/map_placeholder.png" alt="map" />
          </div>
        </div>
      )}
    </>
  )

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
