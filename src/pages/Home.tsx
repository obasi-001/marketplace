import HeroSection from '../components/HeroSection'
import CategorySection from '../components/CategorySection'
import FeaturedProducts from '../components/FeaturedProducts'
import PromotionSection from '../components/PromotionSection'

function Home() {
  return (
    <>
      <HeroSection
        title="Welcome to our store"
        description="Discover products you'll love."
        buttonText="Shop Now"
        imageUrl="https://placehold.co/800x600"
      />

      <CategorySection />

      <FeaturedProducts />
      <PromotionSection />
    </>
  )
}

export default Home