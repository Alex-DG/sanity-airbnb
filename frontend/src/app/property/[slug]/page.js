import Link from 'next/link'

import { isMultiple } from '@/utils/maths'

import { sanityClient } from '../../../../sanity'

import Image from '../../components/Image'

export const Property = async ({ params }) => {
  const property = await getProperty(params.slug)

  // console.log(property)

  const {
    title,
    location,
    propertyType,
    mainImage,
    images,
    pricePerNight,
    beds,
    bedrooms,
    description,
    host,
    reviews,
  } = property.props

  const reviewAmount = reviews?.length || 0
  // console.log({ mainImage, images })
  return (
    <div className="container">
      <h1>
        <b>{title}</b>
      </h1>
      <p>
        {reviewAmount} review{isMultiple(reviewAmount)}
      </p>
      <div className="images-section">
        <Image identifier="main-image" image={mainImage} />

        <div className="sub-images-section">
          {images.map((image) => (
            <Image key={image._key} identifier="image" image={image} />
          ))}
        </div>
      </div>

      <div className="section">
        <div className="information">
          <h2>
            <b>
              {propertyType} hosted by {host?.name}
            </b>
          </h2>
          <h4>
            {bedrooms} bedroom{isMultiple(bedrooms)} * {beds} bed
            {isMultiple(beds)}
          </h4>
          <hr />
          <h4>
            <b>Enhanced Clean</b>
          </h4>
          <p>
            This host is committed to Airbnb's 5-step enhanced cleaning process.
          </p>
          <h4>
            <b>Amenities for everyday living</b>
          </h4>
          <p>
            The host has equipped this place for long stays - kitchen, shampoo,
            conditioner, hairdryer included.
          </p>
          <h4>
            <b>House rules</b>
          </h4>
          <p>
            This place isn't suitable for pets andthe host does not allow
            parties or smoking.
          </p>
        </div>
        <div className="price-box">
          <h2>£{pricePerNight}</h2>
          <h4>
            {reviewAmount} review{isMultiple(reviewAmount)}
          </h4>
          <Link href="/">
            <div className="button">Change Dates</div>
          </Link>
        </div>
      </div>

      <hr />

      <h4>{description}</h4>

      <hr />

      <h2>
        {reviewAmount} review{isMultiple(reviewAmount)}
      </h2>
      {reviewAmount > 0 && reviews.map((review) => <>TODO: review</>)}

      <hr />

      <h2>Location</h2>
      {/* <Map location={location}></Map> */}
    </div>
  )
}

const getProperty = async (pageSlug) => {
  const query = `*[ _type == "property" && slug.current == $pageSlug][0]{
    title,
    location,
    propertyType,
    mainImage,
    images,
    pricePerNight,
    beds,
    bedrooms,
    description,
    host->{
      _id,
      name,
      slug,
      image
    },
    reviews[]{
      ...,
      traveller->{
        _id,
        name,
        slug,
        image
      }
    }
  }`

  const property = await sanityClient.fetch(query, {
    pageSlug,
    next: { revalidate: 10 },
  })

  if (!property) {
    return {
      props: null,
      notFound: true,
    }
  } else {
    return {
      props: {
        title: property.title,
        location: property.location,
        propertyType: property.propertyType,
        mainImage: property.mainImage,
        images: property.images,
        pricePerNight: property.pricePerNight,
        beds: property.beds,
        bedrooms: property.bedrooms,
        description: property.description,
        host: property.host,
        reviews: property.reviews,
      },
      notFound: false,
    }
  }
}

export default Property
