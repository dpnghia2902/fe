import { useState } from 'react';
import { Search, Sparkles, Home, Package, Wrench, GraduationCap, Car, ShoppingBag, MapPin, Star, Briefcase, TrendingUp } from 'lucide-react';
import "./CustomerDashboard.css";

interface CustomerDashboardProps {
  onNavigate?: (path: string) => void;
}

const services = [
  {
    icon: Home,
    title: 'Dọn dẹp',
    description: 'Dọn dẹp nhà chuyên nghiệp',
    color: 'blue',
    image: 'https://images.unsplash.com/photo-1758599669406-d5179ccefcb9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400'
  },
  {
    icon: Package,
    title: 'Giao hàng',
    description: 'Giao hàng nhanh và đáng tin cậy',
    color: 'purple',
    image: 'https://images.unsplash.com/photo-1758523670564-d1d6a734dc0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400'
  },
  {
    icon: Wrench,
    title: 'Sửa chữa',
    description: 'Sửa chữa nhà cửa và thiết bị',
    color: 'orange',
    image: 'https://images.unsplash.com/photo-1751486403850-fae53b6ab0e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400'
  },
  {
    icon: GraduationCap,
    title: 'Dạy kèm',
    description: 'Dịch vụ dạy kèm cá nhân',
    color: 'green',
    image: 'https://images.unsplash.com/photo-1629360021730-3d258452c425?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400'
  },
  {
    icon: Car,
    title: 'Vận chuyển',
    description: 'Hỗ trợ chuyển nhà và vận chuyển',
    color: 'red',
    image: ''
  },
  {
    icon: ShoppingBag,
    title: 'Mua sắm',
    description: 'Trợ lý mua sắm cá nhân',
    color: 'pink',
    image: ''
  }
];

const recentTasks = [
  { id: 1, service: 'Dọn dẹp nhà cửa', status: 'Đang tìm người', location: '123 Đường Chính, Quận 1', budget: '100.000₫' },
  { id: 2, service: 'Lắp ráp đồ nội thất', status: 'Đang tìm người', location: '456 Đường Phụ, Quận 2', budget: '150.000₫' },
];

const suggestedHelpers = [
  { name: 'Sarah Johnson', avatar: 'https://images.unsplash.com/photo-1665436035665-d7dad9086ee2?w=100', rating: 4.9, jobs: 156, service: 'Dọn dẹp' },
  { name: 'Mike Chen', avatar: '', rating: 4.8, jobs: 89, service: 'Sửa chữa' },
  { name: 'Emma Davis', avatar: '', rating: 4.7, jobs: 123, service: 'Gia sư' },
];

const trendingServices = [
  { name: 'Dọn dẹp nhà cửa', trend: '+23%', requests: 156 },
  { name: 'Giao hàng nhanh', trend: '+18%', requests: 98 },
  { name: 'Sửa chữa điện', trend: '+12%', requests: 67 },
];

export default function CustomerDashboard({ onNavigate }: CustomerDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');

  const handleNavigate = (path: string) => {
    if (onNavigate) {
      onNavigate(path);
    }
  };

  return (
    <div className="customer-dashboard">
      {/* Hero Section */}
      <div className="dashboard-hero">
        <div className="hero-content-wrapper">
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
          <div className="search-bar-wrapper">
            <div className="search-input-group">
              <Search className="input-icon" />
              <input
                type="text"
                placeholder="Bạn cần dịch vụ gì?"
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="location-input-group">
              <MapPin className="input-icon" />
              <input
                type="text"
                placeholder="Địa điểm"
                className="location-input"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <button
              onClick={() => handleNavigate('create')}
              className="search-submit-btn"
            >
              Đặt dịch vụ
            </button>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="tabs-container">
        <div className="tabs-list">
          <button
            className={`tab-trigger ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <Home className="tab-icon" />
            <span className="tab-text">Tổng quan</span>
          </button>
          <button
            className={`tab-trigger ${activeTab === 'feed' ? 'active' : ''}`}
            onClick={() => setActiveTab('feed')}
          >
            <Briefcase className="tab-icon" />
            <span className="tab-text">Bảng tin</span>
          </button>
        </div>

        {/* Overview Tab Content */}
        {activeTab === 'overview' && (
          <div className="tab-content">
            {/* Service Categories */}
            <section className="services-section">
              <div className="section-header">
                <div className="section-title-wrapper">
                  <h2 className="section-title">Dịch vụ phổ biến</h2>
                  <p className="section-subtitle">Chọn từ các dịch vụ được yêu cầu nhiều nhất</p>
                </div>
              </div>

              <div className="services-grid">
                {services.map((service) => (
                  <div
                    key={service.title}
                    className="service-card"
                    onClick={() => handleNavigate('create')}
                  >
                    <div className={`service-card-image service-bg-${service.color}`}>
                      {service.image && (
                        <img src={service.image} alt={service.title} />
                      )}
                      <div className={`service-icon-wrapper icon-bg-${service.color}`}>
                        <service.icon className="service-icon" />
                      </div>
                    </div>
                    <div className="service-card-content">
                      <h3 className="service-card-title">{service.title}</h3>
                      <p className="service-card-description">{service.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Active Jobs */}
            <section className="active-jobs-section">
              <div className="section-header">
                <div className="section-title-wrapper">
                  <h2 className="section-title">Các công việc đang tìm người</h2>
                  <p className="section-subtitle">Các yêu cầu công việc đang chờ người làm nhận</p>
                </div>
                <button 
                  className="view-all-btn"
                  onClick={() => handleNavigate('tracking')}
                >
                  Xem tất cả
                </button>
              </div>

              <div className="jobs-list">
                {recentTasks.map((task) => (
                  <div key={task.id} className="job-card">
                    <div className="job-card-content">
                      <div className="job-avatar">JD</div>
                      <div className="job-info">
                        <h3 className="job-title">{task.service}</h3>
                        <span className="job-status">{task.status}</span>
                        <div className="job-details">
                          <span className="job-location">
                            <MapPin className="detail-icon" />
                            {task.location}
                          </span>
                          <span className="job-budget">• Ngân sách: {task.budget}</span>
                        </div>
                      </div>
                    </div>
                    <button 
                      className="job-detail-btn"
                      onClick={() => handleNavigate('tracking')}
                    >
                      Xem chi tiết
                    </button>
                  </div>
                ))}
              </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
              <div className="cta-content">
                <div className="cta-text-wrapper">
                  <h2 className="cta-title">Cần giúp đỡ ngay bây giờ?</h2>
                  <p className="cta-subtitle">Đặt dịch vụ chỉ với vài cú click</p>
                </div>
                <button
                  onClick={() => handleNavigate('create')}
                  className="cta-button"
                >
                  Đặt dịch vụ ngay
                </button>
              </div>
            </section>
          </div>
        )}

        {/* Feed Tab Content */}
        {activeTab === 'feed' && (
          <div className="tab-content feed-layout">
            {/* Main Feed */}
            <div className="feed-main">
              <div className="feed-placeholder">
                <Briefcase className="feed-placeholder-icon" />
                <h3>Bảng tin công việc</h3>
                <p>Các công việc và cập nhật từ cộng đồng sẽ hiển thị ở đây</p>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="feed-sidebar">
              {/* Suggested Helpers */}
              <div className="sidebar-card">
                <h3 className="sidebar-card-title">Người giúp việc đề xuất</h3>
                <div className="helpers-list">
                  {suggestedHelpers.map((helper, index) => (
                    <div key={index} className="helper-item">
                      <div className={`helper-avatar ${!helper.avatar ? 'helper-avatar-fallback' : ''}`}>
                        {helper.avatar ? (
                          <img src={helper.avatar} alt={helper.name} />
                        ) : (
                          helper.name.split(' ').map(n => n[0]).join('')
                        )}
                      </div>
                      <div className="helper-info">
                        <p className="helper-name">{helper.name}</p>
                        <div className="helper-stats">
                          <Star className="star-icon" />
                          <span>{helper.rating}</span>
                          <span>• {helper.jobs} việc</span>
                        </div>
                      </div>
                      <button className="helper-view-btn">Xem</button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trending Services */}
              <div className="sidebar-card trending-card">
                <div className="trending-header">
                  <TrendingUp className="trending-icon" />
                  <h3 className="sidebar-card-title">Dịch vụ xu hướng</h3>
                </div>
                <div className="trending-list">
                  {trendingServices.map((service, index) => (
                    <div key={index} className="trending-item">
                      <div className="trending-info">
                        <p className="trending-name">{service.name}</p>
                        <p className="trending-requests">{service.requests} yêu cầu</p>
                      </div>
                      <span className="trending-badge">{service.trend}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Wallet Summary */}
              <div className="sidebar-card wallet-card">
                <h3 className="sidebar-card-title">Ví của tôi</h3>
                <div className="wallet-content">
                  <p className="wallet-label">Số dư khả dụng</p>
                  <p className="wallet-balance">500.000₫</p>
                  <button className="wallet-button">Nạp tiền</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}