import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Container from "../components/Container";
import HeroSection from "../layouts/HeroSection/HeroSection";
import AboutSection from "../layouts/AboutSection/AboutSection";
import CustomerDashboard from "../layouts/CustomerDashboard/CustomerDashboard";

export default function Home() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  const handleNavigate = (path: string) => {
    navigate(`/${path}`);
  };

  return (
    <>
      {!isLoggedIn ? (
        // Chưa đăng nhập - Hiển thị Hero và About
        <>
            <HeroSection onNavigate={handleNavigate} />
          <AboutSection />
        </>
      ) : (
        // Đã đăng nhập - Hiển thị Dashboard
        <CustomerDashboard onNavigate={handleNavigate} />
      )}
    </>
  );
}
