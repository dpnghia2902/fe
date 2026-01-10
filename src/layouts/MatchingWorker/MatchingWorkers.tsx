import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, MapPin, Award, Loader2, Check } from 'lucide-react';
import './MatchingWorkers.css';

const workers = [
  {
    id: 1,
    name: 'Sarah Johnson',
    rating: 4.9,
    reviews: 156,
    distance: '1.2 km',
    price: 75,
    skills: ['Dọn dẹp', 'Vệ sinh sâu', 'Thân thiện môi trường'],
    verified: true,
    completedJobs: 234,
    image: 'https://images.unsplash.com/photo-1665436035665-d7dad9086ee2?w=300',
  },
  {
    id: 2,
    name: 'Mike Chen',
    rating: 4.8,
    reviews: 203,
    distance: '2.5 km',
    price: 65,
    skills: ['Dọn dẹp', 'Tổ chức'],
    verified: true,
    completedJobs: 312,
    image: '',
  },
  {
    id: 3,
    name: 'Emma Davis',
    rating: 5.0,
    reviews: 89,
    distance: '0.8 km',
    price: 85,
    skills: ['Dọn dẹp', 'Dịch vụ cao cấp'],
    verified: true,
    completedJobs: 145,
    image: '',
  },
];

export default function MatchingWorkers() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [selectedWorker, setSelectedWorker] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState('rating');
  const [distanceFilter, setDistanceFilter] = useState('all');

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleContinuePayment = () => {
    navigate('/payment');
  };

  if (loading) {
    return (
      <div className="matching-loading-container">
        <div className="loading-card">
          <div className="loading-spinner-wrapper">
            <Loader2 className="loading-spinner" />
            <div className="loading-pulse" />
          </div>
          <h2 className="loading-title">Đang tìm người làm việc tốt nhất cho bạn...</h2>
          <p className="loading-description">
            Chúng tôi đang tìm kiếm trong mạng lưới các chuyên gia đã xác minh trong khu vực của bạn
          </p>
          <div className="loading-badges">
            <div className="badge-item badge-green">
              <Check className="badge-icon" />
              <span>Chỉ người làm việc đã xác minh</span>
            </div>
            <div className="badge-item badge-blue">
              <MapPin className="badge-icon" />
              <span>Gần vị trí của bạn</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="matching-container">
      {/* Header */}
      <div className="matching-header">
        <div className="success-indicator">
          <div className="success-icon-wrapper">
            <Check className="success-check-icon" />
          </div>
          <span className="success-text">Chúng tôi đã tìm thấy {workers.length} người giúp việc tuyệt vời gần bạn!</span>
        </div>
        <h1 className="matching-title">Chọn người làm việc</h1>
        <p className="matching-subtitle">Tất cả người làm việc đều đã được xác minh và kiểm tra lý lịch</p>
      </div>

      {/* Filters */}
      <div className="filters-wrapper">
        <select 
          value={sortBy} 
          onChange={(e) => setSortBy(e.target.value)}
          className="filter-select"
        >
          <option value="rating">Đánh giá cao nhất</option>
          <option value="distance">Gần nhất</option>
          <option value="price-low">Giá: Thấp đến cao</option>
          <option value="price-high">Giá: Cao đến thấp</option>
        </select>

        <select 
          value={distanceFilter} 
          onChange={(e) => setDistanceFilter(e.target.value)}
          className="filter-select"
        >
          <option value="all">Mọi khoảng cách</option>
          <option value="1">Trong vòng 1 km</option>
          <option value="3">Trong vòng 3 km</option>
          <option value="5">Trong vòng 5 km</option>
        </select>

        <div className="flex-spacer" />
        
        <div className="worker-count-badge">
          {workers.length} người làm việc có sẵn
        </div>
      </div>

      {/* Workers List */}
      <div className="workers-list">
        {workers.map((worker) => (
          <div
            key={worker.id}
            className={`worker-card ${selectedWorker === worker.id ? 'selected' : ''}`}
          >
            <div className="worker-content">
              {/* Avatar */}
              <div className="worker-avatar-wrapper">
                <div className="worker-avatar">
                  {worker.image ? (
                    <img src={worker.image} alt={worker.name} />
                  ) : (
                    <div className="worker-avatar-fallback">
                      {worker.name.split(' ').map(n => n[0]).join('')}
                    </div>
                  )}
                </div>
                {worker.verified && (
                  <div className="verified-badge">
                    <Check className="verified-icon" />
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="worker-info">
                <div className="worker-header">
                  <div className="worker-details">
                    <h3 className="worker-name">{worker.name}</h3>
                    <div className="worker-stats">
                      <div className="stat-item">
                        <Star className="stat-icon star-filled" />
                        <span className="stat-rating">{worker.rating}</span>
                        <span className="stat-text">({worker.reviews} đánh giá)</span>
                      </div>
                      <div className="stat-item">
                        <MapPin className="stat-icon" />
                        <span className="stat-text">Cách {worker.distance}</span>
                      </div>
                      <div className="stat-item">
                        <Award className="stat-icon" />
                        <span className="stat-text">{worker.completedJobs} công việc</span>
                      </div>
                    </div>
                  </div>
                  <div className="worker-price">
                    <div className="price-amount">{worker.price}$</div>
                    <p className="price-unit">mỗi giờ</p>
                  </div>
                </div>

                {/* Skills */}
                <div className="worker-skills">
                  {worker.skills.map((skill) => (
                    <span key={skill} className="skill-badge">
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="worker-actions">
                  <button
                    onClick={() => setSelectedWorker(worker.id)}
                    className={`action-btn select-btn ${selectedWorker === worker.id ? 'selected' : ''}`}
                  >
                    {selectedWorker === worker.id ? (
                      <>
                        <Check className="btn-icon" />
                        Đã chọn
                      </>
                    ) : (
                      'Chọn người này'
                    )}
                  </button>
                  <button className="action-btn outline-btn">
                    Xem hồ sơ
                  </button>
                  <button className="action-btn outline-btn">
                    Nhắn tin
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Continue Button */}
      {selectedWorker && (
        <div className="continue-footer">
          <div className="footer-content">
            <div className="selected-worker-info">
              <p className="info-label">Người làm việc đã chọn</p>
              <p className="info-name">
                {workers.find(w => w.id === selectedWorker)?.name}
              </p>
            </div>
            <button
              onClick={handleContinuePayment}
              className="continue-btn"
            >
              Tiếp tục thanh toán
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
