import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import HeroSection from "../layouts/HeroSection/HeroSection";
import AboutSection from "../layouts/AboutSection/AboutSection";
import CustomerDashboard from "../layouts/CustomerDashboard/CustomerDashboard";
import WorkerDashboard from "../layouts/WorkerDashboard/WorkerDashboard";

export default function Home() {
  const navigate = useNavigate();
  const { isLoggedIn, user } = useAuth(); // ✅ Thêm user

  const handleNavigate = (path: string) => {
    navigate(`/${path}`);
  };

  return (
    <>
      {!isLoggedIn ? (
        // ✅ Chưa đăng nhập - Hiển thị Hero và About
        <>
          <HeroSection onNavigate={handleNavigate} />
          <AboutSection />
        </>
      ) : user?.role === 'worker' ? (
        // ✅ Đã đăng nhập VÀ là Worker - Hiển thị Worker Dashboard
        <WorkerDashboard />
      ) : (
        // ✅ Đã đăng nhập VÀ là Customer - Hiển thị Customer Dashboard
        <CustomerDashboard onNavigate={handleNavigate} />
      )}
    </>
  );
}
