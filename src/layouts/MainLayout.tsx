import { Outlet } from "react-router-dom";
import Container from "../components/Container";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function MainLayout() {
  return (
    <>
      <Header />

      <main>
        <Container>
          <Outlet />
        </Container>
      </main>

      <Footer />
    </>
  );
}
