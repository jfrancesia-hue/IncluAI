import { Hero } from "@/components/landing/Hero"
import { ComoFunciona } from "@/components/landing/ComoFunciona"
import { GridDiscapacidades } from "@/components/landing/GridDiscapacidades"
import { Testimonios } from "@/components/landing/Testimonios"
import { Pricing } from "@/components/landing/Pricing"
import { Footer } from "@/components/landing/Footer"

export default function LandingPage() {
  return (
    <>
      <Hero />
      <ComoFunciona />
      <GridDiscapacidades />
      <Testimonios />
      <Pricing />
      <Footer />
    </>
  )
}
