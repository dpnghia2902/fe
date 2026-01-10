import { useNavigate } from "react-router-dom";
import { Search, MapPin, Clock, Star, CheckCircle } from "lucide-react";
import "./Matching.css";

export default function Matching() {
  const navigate = useNavigate();

  return (
    <div className="matching-container">
      <div className="matching-card">
        <div className="matching-header">
          <CheckCircle className="success-icon" />
          <h2 className="matching-title">Yêu cầu đã được đăng!</h2>
          <p className="matching-subtitle">
            Chúng tôi đang tìm kiếm những người phù hợp nhất cho công việc của bạn
          </p>
        </div>

        <div className="matching-content">
          <div className="loading-animation">
            <div className="spinner"></div>
            <p>Đang tìm kiếm người làm việc...</p>
          </div>

          <div className="matching-info">
            <h3>Điều gì sẽ xảy ra tiếp theo?</h3>
            <ul>
              <li>✓ Hệ thống sẽ gửi thông báo đến các người làm việc phù hợp</li>
              <li>✓ Bạn sẽ nhận được đề xuất trong vòng 24 giờ</li>
              <li>✓ Có thể xem và chọn người làm việc phù hợp nhất</li>
            </ul>
          </div>

          <div className="matching-actions">
            <button 
              onClick={() => navigate('/')}
              className="btn-secondary-outline"
            >
              Về trang chủ
            </button>
            <button 
              onClick={() => navigate('/my-jobs')}
              className="btn-primary-solid"
            >
              Xem công việc của tôi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
