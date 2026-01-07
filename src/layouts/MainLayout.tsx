// import { Outlet } from "react-router-dom";
import Container from "../components/Container";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeroSection from "./HeroSection/HeroSection";
import AboutSection from "./AboutSection/AboutSection";

export default function MainLayout() {
  return (
    <>
      <Header />

      <main>
        <Container>
          <HeroSection/>
        </Container>
        <AboutSection/>
      </main>

      <Footer />
    </>
  );
}
