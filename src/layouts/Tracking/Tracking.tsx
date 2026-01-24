// Tracking.tsx - ✅ NO HEADER + STATUS CORNER
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  ArrowLeft, 
  Calendar, 
  MapPin, 
  DollarSign, 
  Clock, 
  Image, 
  MessageCircle, 
  Phone,
  CheckCircle2,
  X,
  User,
  Star,
  Users
} from 'lucide-react';
import "./Tracking.css";

interface JobPost {
  id: number;
  title: string;
  description: string;
  author: string;
  status: string;
  date: string;
  location: string;
  budget: string;
  images: number;
  isFilled: boolean;
  rating?: number;
  applicants?: number;
}

const jobPosts: JobPost[] = [
  {
    id: 1,
    title: 'Cần 5 người hỗ trợ chuyển phòng',
    description: 'Mình cần hỗ trợ chuyển các đồ đạc, tủ lạnh, bàn ghế... từ Sáng 2 xuống tầng 5. Dự kiến không nặng lắm. Cần 5 người để hoàn thành nhanh chóng. Thời gian làm việc khoảng 3-4 tiếng.',
    author: 'Nguyễn Văn A',
    status: 'Cần 3 người nữa',
    date: '08:00 - 22/01/2026',
    location: '123 Đoàn Thúy Anh, Q.Hai Bà Trưng',
    budget: '300.000đ/người',
    images: 3,
    isFilled: false,
    rating: 4.8,
    applicants: 2
  },
  {
    id: 2,
    title: 'Cần 3 người hỗ trợ chuyển phòng',
    description: 'Mình cần hỗ trợ chuyển các đồ đạc, tủ lạnh, bàn ghế... từ Sáng 2 xuống tầng 5.',
    author: 'Nguyễn Văn A',
    status: 'Đã đủ người',
    date: '08:00 - 22/01/2026',
    location: '123 Đoàn Thúy Anh, Q.Hai Bà Trưng',
    budget: '300.000đ/người',
    images: 3,
    isFilled: true,
    rating: 4.8
  }
];

export default function Tracking() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<JobPost | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const jobId = id ? parseInt(id!) : 1;
    const foundJob = jobPosts.find(j => j.id === jobId) || jobPosts[0];
    setJob({ ...foundJob, applicants: foundJob?.applicants || 0 });
    setLoading(false);
  }, [id]);

  const handleAcceptJob = () => {
    setShowConfirmModal(true);
  };

  const confirmAcceptJob = () => {
    setShowConfirmModal(false);
    setTimeout(() => {
      setShowSuccessModal(true); 
    }, 500);
  };

  const handleSuccessClose = () => {
    setShowSuccessModal(false);
    navigate('/');
  };

  if (loading) {
    return (
      <div className="tracking-container">
        <div className="loading-skeleton">
          <div className="skeleton-header"></div>
          <div className="skeleton-content">
            <div className="skeleton-images"></div>
            <div className="skeleton-card"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="tracking-container">
        <div className="empty-state">
          <Image className="empty-icon" size={64} />
          <h2>Công việc không tồn tại</h2>
          <p>Job bạn tìm không có trong hệ thống</p>
          <button onClick={() => navigate('/dashboard')} className="btn-primary">
            Xem danh sách việc làm
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="tracking-container">
      <div className="tracking-content">
        {/* ✅ JOB HERO - STATUS CORNER + BACK BUTTON */}
        <div className="job-hero">
          {/* ✅ STATUS BADGE - GÓC TRÊN PHẢI */}
          <div className="status-corner">
            <span className={`job-status-badge ${job.isFilled ? 'filled' : 'open'}`}>
              {job.status}
            </span>
          </div>

          {/* Back Button - Góc trái */}
          <button 
            onClick={() => navigate('/dashboard')}
            className="back-btn-hero"
            title="Quay lại danh sách việc làm"
          >
            <ArrowLeft className="back-icon" size={20} />
          </button>

          <div className="hero-author">
            <div className="author-avatar-large">
              {job.author.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="hero-title">{job.title}</h1>
              <div className="author-info">
                <div className="author-rating">
                  <Star className="star-icon" fill="currentColor" />
                  <span>{job.rating || 4.8}</span>
                </div>
                <span className="author-name">{job.author}</span>
              </div>
            </div>
          </div>
          
          <div className="hero-actions">
            <button className="quick-btn message">
              <MessageCircle size={20} />
              Nhắn tin
            </button>
            <button className="quick-btn phone">
              <Phone size={20} />
              Gọi ngay
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="content-tabs">
          <button className="tab active">Chi tiết công việc</button>
          <button className="tab">Vị trí</button>
        </div>

        {/* Main Content */}
        <div className="main-content">
          {/* Images */}
          <section className="section images-section">
            <h2 className="section-title">
              <Image size={20} />
              Ảnh minh họa ({job.images})
            </h2>
            <div className="images-grid">
              {Array.from({ length: job.images }).map((_, i) => (
                <div key={i} className="job-image-placeholder">
                  <Image className="image-icon" size={48} />
                  <span className="image-label">Ảnh {i + 1}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Job Details */}
          <section className="section job-details">
            <h2 className="section-title">
              <Clock size={20} />
              Thông tin chi tiết
            </h2>
            <div className="details-grid">
              <div className="detail-item">
                <Calendar size={20} />
                <div>
                  <span className="detail-label">Thời gian</span>
                  <span className="detail-value">{job.date}</span>
                </div>
              </div>
              <div className="detail-item">
                <MapPin size={20} />
                <div>
                  <span className="detail-label">Địa điểm</span>
                  <span className="detail-value">{job.location}</span>
                </div>
              </div>
              <div className="detail-item">
                <DollarSign size={20} />
                <div>
                  <span className="detail-label">Ngân sách</span>
                  <span className="detail-value">{job.budget}</span>
                </div>
              </div>
              <div className="detail-item">
                <Users size={20} />
                <div>
                  <span className="detail-label">Đã ứng tuyển</span>
                  <span className="detail-value">{job.applicants || 0} người</span>
                </div>
              </div>
            </div>
          </section>

          {/* Description */}
          <section className="section description-section">
            <h2 className="section-title">
              Mô tả công việc
            </h2>
            <div className="job-description">
              {job.description}
            </div>
          </section>
        </div>

        {/* Sticky Action Bar */}
        {!job.isFilled ? (
          <div className="action-bar">
            <div className="action-info">
              <span>💰 {job.budget}</span>
              <span>{job.applicants || 0} người đã ứng tuyển</span>
            </div>
            <button className="action-btn primary" onClick={handleAcceptJob}>
              <CheckCircle2 size={20} />
              Nhận việc ngay
            </button>
          </div>
        ) : (
          <div className="filled-banner">
            <CheckCircle2 size={24} />
            Công việc đã đủ người tham gia
          </div>
        )}
      </div>

      {/* Confirm Modal */}
      {showConfirmModal && (
        <div className="modal-overlay">
          <div className="confirm-modal">
            <div className="modal-header">
              <CheckCircle2 className="modal-icon" size={48} />
              <h3>Xác nhận nhận việc</h3>
            </div>
            <p className="modal-description">
              Bạn có chắc chắn muốn nhận công việc này? Sau khi xác nhận, bạn sẽ được ghép đôi với khách hàng.
            </p>
            <div className="modal-actions">
              <button 
                className="modal-btn cancel"
                onClick={() => setShowConfirmModal(false)}
              >
                <X size={20} />
                Hủy
              </button>
              <button 
                className="modal-btn confirm"
                onClick={confirmAcceptJob}
              >
                <CheckCircle2 size={20} />
                Nhận việc ngay
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="modal-overlay">
          <div className="success-modal">
            <div className="success-icon">
              <CheckCircle2 size={64} />
            </div>
            <h3 className="success-title">Đăng kí thành công!</h3>
            <p className="success-description">
              Chúng tôi đã thông báo cho khách hàng.
            </p>
            <button 
              className="success-btn"
              onClick={handleSuccessClose}
            >
              Về danh sách việc làm
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
