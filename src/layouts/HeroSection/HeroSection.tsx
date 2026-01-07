import { Search, MapPin, Sparkles } from "lucide-react";
import "./HeroSection.css";

interface HeroSectionProps {
  onNavigate?: (path: string) => void;
}

export default function HeroSection({ onNavigate }: HeroSectionProps) {
  const handleSearch = () => {
    if (onNavigate) {
      onNavigate('create');
    }
  };

  return (
      <div className="hero-content">
        <div className="hero-header">
          <Sparkles className="sparkle-icon" />
          <span className="welcome-text">Chào mừng trở lại!</span>
        </div>
        
        <h1 className="hero-title">
          Tìm kiếm hỗ trợ cho công việc hàng ngày
        </h1>
        
        <p className="hero-description">
          Kết nối với những người làm việc đáng tin cậy trong khu vực của bạn 
          để dọn dẹp, giao hàng, sửa chữa và nhiều hơn nữa.
        </p>
        
        {/* Search Bar */}
        <div className="search-bar">
          <div className="search-input-wrapper">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Bạn cần dịch vụ gì?"
              className="search-input"
            />
          </div>
          
          <div className="location-input-wrapper">
            <MapPin className="location-icon" />
            <input
              type="text"
              placeholder="Địa điểm"
              className="location-input"
            />
          </div>
          
          <button
            onClick={handleSearch}
            className="search-button"
          >
            Đặt dịch vụ
          </button>
        </div>
      </div>
  );
}
