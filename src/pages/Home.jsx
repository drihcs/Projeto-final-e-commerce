import React from 'react'
import Slide from '../components/Swiper/Swiper'
import CollectionCards from '../components/CollectionCards/CollectionCards'
import CollectionIcons from '../components/CollectionIcons/CollectionIcons'
import ProductGrid from '../components/ProductGrid/ProductGrid'
import SpecialOffer from '../components/SpecialOffer/SpecialOffer'

export default function Home() {
  return (
    <main>
      <Slide />
      <CollectionCards />
      <section id="categorias">
        <CollectionIcons />
      </section>
      <ProductGrid />
      <SpecialOffer />
    </main>
  )
}