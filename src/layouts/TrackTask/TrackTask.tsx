import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MessageCircle, Phone, MapPin, Clock, Check, Navigation, 
  AlertTriangle, Star, FileText, Briefcase, ChevronRight, DollarSign 
} from 'lucide-react';
import './TrackTask.css';

type TaskStatus = 'empty' | 'pending' | 'active';
const taskStatus: TaskStatus = 'pending'; // Test: 'empty' | 'pending' | 'active'

const pendingTask = {
  id: 1,
  title: 'Cần 3 người hỗ trợ dọn dẹp nhà cửa',
  service: 'Dọn dẹp nhà cửa',
  date: '24/01/2026',
  time: '10:00 Sáng',
  location: '123 Đường Chính, Căn hộ 4B, Q. Hai Bà Trưng',
  budget: '300.000₫/người',
  applicantsCount: 5,
} as const;

const statusSteps = [
  { id: 1, label: 'Đặt chỗ đã xác nhận', time: '9:30 Sáng', completed: true },
  { id: 2, label: 'Người làm việc đã chấp nhận', time: '9:35 Sáng', completed: true },
  { id: 3, label: 'Đang trên đường', time: '9:50 Sáng', completed: true },
  { id: 4, label: 'Đang thực hiện', time: '10:00 Sáng', completed: false, current: true },
  { id: 5, label: 'Hoàn thành', time: '-', completed: false },
];

export default function TrackTask() {
  const navigate = useNavigate();
  const currentProgress = 60;
  const [showReportDialog, setShowReportDialog] = useState(false);

  // ✅ TRẠNG THÁI 1: KHÔNG CÓ CÔNG VIỆC
  if (taskStatus === 'empty') {
    return (
      <div className="track-task-container">
        <div className="track-header">
          <h1 className="track-title">Theo dõi công việc</h1>
          <p className="track-subtitle">Giám sát dịch vụ của bạn theo thời gian thực</p>
        </div>

        <div className="empty-state">
          <div className="empty-icon-wrapper">
            <FileText className="empty-icon" />
          </div>
          <h2 className="empty-title">Chưa có công việc nào</h2>
          <p className="empty-subtitle">
            Hiện tại bạn chưa đăng ký công việc nào để theo dõi. 
            Quay lại trang chính để tìm việc mới nhé!
          </p>
          <div className="empty-actions">
            <button onClick={() => navigate('/')} className="empty-action-btn primary">
              Tìm việc mới
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ✅ TRẠNG THÁI 2: ĐANG CHỜ NHẬN
  if (taskStatus === 'pending') {
    return (
      <div className="track-task-container">
        <div className="track-header">
          <div className="pending-indicator">
            <div className="pending-dot" />
            <span className="pending-text">Đang chờ nhận việc</span>
          </div>
          <h1 className="track-title">Công việc đang chờ</h1>
          <p className="track-subtitle">Bài đăng của bạn đang được xem xét</p>
        </div>

        <div className="pending-task-card">
          <div className="pending-job-info">
            <div className="job-icon-wrapper">
              <Briefcase className="job-icon" size={48} />
            </div>
            <div className="job-details">
              <h2 className="job-title">{pendingTask.title}</h2>
              <div className="job-meta">
                <span className="meta-item">
                  <MapPin size={16} />
                  <span>{pendingTask.location}</span>
                </span>
                <span className="meta-item">
                  <Clock size={16} />
                  <span>{pendingTask.date} • {pendingTask.time}</span>
                </span>
              </div>
              <div className="job-price">
                <DollarSign size={20} />
                <span>{pendingTask.budget}</span>
              </div>
            </div>
          </div>

          <div className="pending-stats">
            <div className="stat-item">
              <div className="stat-number">{pendingTask.applicantsCount}</div>
              <div className="stat-label">Ứng viên quan tâm</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">⏳</div>
              <div className="stat-label">Đang chờ nhận</div>
            </div>
          </div>

          <div className="pending-actions">
            <button 
              onClick={() => navigate('/')} 
              className="btn-secondary"
            >
              ← Quay lại 
            </button>
            <button 
              onClick={() => navigate('/tracking')} 
              className="btn-primary"
            >
              Xem chi tiết công việc
              <ChevronRight size={20} />
            </button>
          </div>

          <div className="pending-footer">
            <p className="footer-text">
              Chúng tôi sẽ thông báo ngay khi có người nhận việc!
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ✅ TRẠNG THÁI 3: CÔNG VIỆC ĐANG THỰC HIỆN (ACTIVE)
  return (
    <div className="track-task-container">
      {/* Header */}
      <div className="track-header">
        <div className="live-indicator">
          <div className="live-dot" />
          <span className="live-text">Theo dõi trực tiếp</span>
        </div>
        <h1 className="track-title">Theo dõi công việc</h1>
        <p className="track-subtitle">Giám sát dịch vụ của bạn theo thời gian thực</p>
      </div>

      <div className="track-content">
        {/* Left Column - Map and Timeline */}
        <div className="track-main">
          {/* Map */}
          <div className="map-card">
            <div className="map-placeholder">
              <div className="map-content">
                <MapPin className="map-icon" />
                <p className="map-title">Bản đồ vị trí trực tiếp</p>
                <p className="map-subtitle">Người làm việc cách bạn 0.3 km</p>
              </div>
              {/* Status Badge */}
              <div className="map-status-badge">
                <Navigation className="badge-icon" />
                <div>
                  <p className="badge-label">Hoàn thành dự kiến</p>
                  <p className="badge-time">11:30 Sáng</p>
                </div>
              </div>
            </div>
          </div>

          {/* Status Timeline */}
          <div className="timeline-card">
            <div className="timeline-header">
              <h2 className="timeline-title">Trạng thái công việc</h2>
              <div className="status-badge">
                <Clock className="status-icon" />
                <span>Đang thực hiện</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="progress-section">
              <div className="progress-header">
                <span className="progress-label">Tiến độ tổng thể</span>
                <span className="progress-value">{currentProgress}%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${currentProgress}%` }} />
              </div>
            </div>

            {/* Timeline */}
            <div className="timeline-steps">
              {statusSteps.map((step, index) => (
                <div key={step.id} className="timeline-step">
                  <div className="step-indicator-wrapper">
                    <div className={`step-indicator ${step.completed ? 'completed' : ''} ${step.current ? 'current' : ''}`}>
                      {step.completed ? (
                        <Check className="step-icon" />
                      ) : (
                        <span>{step.id}</span>
                      )}
                    </div>
                    {index < statusSteps.length - 1 && (
                      <div className={`step-connector ${step.completed ? 'completed' : ''}`} />
                    )}
                  </div>
                  <div className="step-content">
                    <div className="step-info">
                      <p className={`step-label ${step.current ? 'current' : ''}`}>{step.label}</p>
                      <span className="step-time">{step.time}</span>
                    </div>
                    {step.current && (
                      <p className="step-note">
                        Sarah hiện đang làm việc trên công việc của bạn
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div className="notes-card">
            <h3 className="notes-title">📝 Ghi chú của người làm việc</h3>
            <p className="notes-content">
              "Đang bắt đầu với phòng khách như đã thảo luận. Bếp sẽ là tiếp theo. Mọi thứ đang diễn ra suôn sẻ!"
            </p>
            <p className="notes-time">Cập nhật 5 phút trước</p>
          </div>
        </div>

        {/* Right Column - Worker Info and Actions */}
        <div className="track-sidebar">
          {/* Worker Card */}
          <div className="worker-card">
            <h3 className="worker-card-title">Người làm việc được phân công</h3>
            <div className="worker-profile">
              <div className="worker-avatar">
                <img src="https://images.unsplash.com/photo-1665436035665-d7dad9086ee2?w=300" alt="Sarah Johnson" />
              </div>
              <h4 className="worker-name">Sarah Johnson</h4>
              <div className="worker-rating">
                <Star className="rating-star" />
                <span className="rating-value">4.9</span>
                <span className="rating-count">(156 đánh giá)</span>
              </div>
              <span className="worker-badge">✓ Chuyên nghiệp đã xác minh</span>
            </div>

            <div className="worker-actions">
              <button className="action-btn primary-btn">
                <MessageCircle className="btn-icon" />
                Chat
              </button>
              <button className="action-btn secondary-btn">
                <Phone className="btn-icon" />
                Gọi
              </button>
            </div>
          </div>

          {/* Task Details */}
          <div className="details-card">
            <h3 className="details-title">Chi tiết công việc</h3>
            <div className="details-content">
              <div className="detail-item">
                <p className="detail-label">Loại dịch vụ</p>
                <p className="detail-value">Dọn dẹp nhà cửa</p>
              </div>
              <div className="detail-item">
                <p className="detail-label">Ngày & Giờ</p>
                <p className="detail-value">28/10/2025 • 10:00 Sáng</p>
              </div>
              <div className="detail-item">
                <p className="detail-label">Địa điểm</p>
                <p className="detail-value">123 Đường Chính, Căn hộ 4B</p>
              </div>
              <div className="detail-item">
                <p className="detail-label">Tổng chi phí</p>
                <p className="detail-price">142.500đ</p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="support-card">
            <h3 className="support-title">Cần hỗ trợ?</h3>
            <p className="support-text">
              Nếu bạn có bất kỳ vấn đề hoặc thắc mắc nào, hãy liên hệ nhóm hỗ trợ của chúng tôi
            </p>
            <button 
              onClick={() => setShowReportDialog(true)}
              className="support-btn"
            >
              <AlertTriangle className="btn-icon" />
              Báo cáo sự cố
            </button>
          </div>

          {/* Complete Button */}
          <button onClick={() => navigate('/rating')} className="complete-btn">
            <Check className="btn-icon" />
            Đánh dấu hoàn thành
          </button>
        </div>
      </div>

      {/* Report Dialog */}
      {showReportDialog && (
        <div className="dialog-overlay" onClick={() => setShowReportDialog(false)}>
          <div className="dialog-content" onClick={(e) => e.stopPropagation()}>
            <div className="dialog-header">
              <AlertTriangle className="dialog-icon" />
              <h3 className="dialog-title">Báo cáo sự cố</h3>
            </div>
            <div className="dialog-body">
              <p className="dialog-text">
                Vui lòng mô tả vấn đề bạn gặp phải. Đội ngũ hỗ trợ của chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.
              </p>
              <div className="dialog-warning">
                <p>⚠️ Báo cáo sẽ được gửi đến đội ngũ hỗ trợ khách hàng và người làm việc liên quan.</p>
              </div>
              <button 
                onClick={() => setShowReportDialog(false)}
                className="dialog-submit-btn"
              >
                Gửi báo cáo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
