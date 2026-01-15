import { useState } from 'react';
import { MessageCircle, Phone, Navigation, MapPin, Clock, Check, Play, Flag, Star, X } from 'lucide-react';
import './CurrentJob.css';

interface Props {
  onNavigate?: (page: any) => void;
}

export default function CurrentJob({ onNavigate }: Props) {
  const [jobStatus, setJobStatus] = useState<'going' | 'arrived' | 'working' | 'completed'>('working');
  const [notes, setNotes] = useState('Bắt đầu với phòng khách như đã thảo luận. Nhà bếp sẽ là bước tiếp theo.');
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [ratingComment, setRatingComment] = useState('');
  const [checklist, setChecklist] = useState([
    { task: 'Phòng khách', completed: true },
    { task: 'Nhà bếp', completed: true },
    { task: 'Phòng tắm', completed: false },
    { task: 'Phòng ngủ', completed: false },
  ]);

  const progress = jobStatus === 'going' ? 25 : jobStatus === 'arrived' ? 40 : jobStatus === 'working' ? 70 : 100;

  const handleComplete = () => {
    setShowRatingModal(true);
  };

  const handleSubmitRating = () => {
    if (rating === 0) {
      alert('Vui lòng chọn số sao đánh giá');
      return;
    }
    
    alert('Đánh giá đã được gửi! Cảm ơn bạn đã hoàn thành công việc');
    setShowRatingModal(false);
    setJobStatus('completed');
    
    setTimeout(() => {
      if (onNavigate) onNavigate('dashboard');
    }, 2000);
  };

  const toggleChecklistItem = (index: number) => {
    const newChecklist = [...checklist];
    newChecklist[index].completed = !newChecklist[index].completed;
    setChecklist(newChecklist);
  };

  const addQuickTag = (tag: string) => {
    setRatingComment(prev => prev ? `${prev}, ${tag}` : tag);
  };

  if (jobStatus === 'completed') {
    return (
      <div className="completed-container">
        <div className="completed-card">
          <div className="completed-icon">
            <Check className="icon-large" />
          </div>
          <h2 className="completed-title">Công việc hoàn thành! 🎉</h2>
          <p className="completed-text">
            Làm tốt lắm! Thanh toán sẽ được xử lý trong thời gian ngắn.
          </p>
          <div className="completed-payment">
            <span className="payment-amount">142.500₫</span>
            <span className="payment-label">đã kiếm được</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="current-job-container">
      <div className="job-header">
        <div className="status-indicator">
          <div className="status-dot" />
          <span className="status-text">Công việc đang hoạt động</span>
        </div>
        <h1 className="job-title">Công việc hiện tại</h1>
        <p className="job-subtitle">Dịch vụ dọn dẹp nhà cửa</p>
      </div>

      <div className="job-content">
        {/* Main Content */}
        <div className="main-column">
          {/* Map */}
          <div className="map-card">
            <div className="map-placeholder">
              <div className="map-content">
                <MapPin className="map-icon" />
                <p className="map-title">Địa điểm công việc</p>
                <p className="map-address">123 Đường Chính, Căn hộ 4B</p>
              </div>
              <button className="btn-directions">
                <Navigation className="icon-small" />
                Chỉ đường
              </button>
            </div>
          </div>

          {/* Status Controls */}
          <div className="status-card">
            <div className="progress-section">
              <div className="progress-header">
                <h2 className="section-title">Tiến độ công việc</h2>
                <span className="progress-percent">{progress}%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${progress}%` }} />
              </div>
            </div>

            {/* Status Buttons */}
            <div className="status-buttons">
              <button
                onClick={() => setJobStatus('going')}
                className={`status-btn ${jobStatus === 'going' ? 'active going' : ''}`}
              >
                <Navigation className="icon-small" />
                Đang trên đường
              </button>
              <button
                onClick={() => setJobStatus('arrived')}
                className={`status-btn ${jobStatus === 'arrived' ? 'active arrived' : ''}`}
              >
                <MapPin className="icon-small" />
                Đã đến nơi
              </button>
              <button
                onClick={() => setJobStatus('working')}
                className={`status-btn ${jobStatus === 'working' ? 'active working' : ''}`}
              >
                <Play className="icon-small" />
                Đang làm việc
              </button>
              <button
                onClick={handleComplete}
                className="status-btn complete"
              >
                <Check className="icon-small" />
                Hoàn thành việc
              </button>
            </div>

            {/* Timer */}
            <div className="timer-card">
              <Clock className="timer-icon" />
              <div className="timer-content">
                <p className="timer-label">Thời gian đã trôi qua</p>
                <p className="timer-value">1:23:45</p>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="notes-card">
            <h2 className="section-title">Ghi chú công việc</h2>
            <p className="notes-subtitle">Cập nhật khách hàng về tiến độ của bạn</p>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Thêm ghi chú về tiến độ công việc..."
              className="notes-textarea"
            />
            <button className="btn-update">Cập nhật ghi chú</button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="sidebar-column">
          {/* Customer Info */}
          <div className="customer-card">
            <h3 className="card-title">Khách hàng</h3>
            <div className="customer-profile">
              <div className="customer-avatar">JD</div>
              <h4 className="customer-name">John Doe</h4>
              <p className="customer-label">Khách hàng lần đầu</p>
            </div>

            <div className="customer-actions">
              <button className="btn-message">
                <MessageCircle className="icon-small" />
                Gửi tin nhắn
              </button>
              <button className="btn-call">
                <Phone className="icon-small" />
                Gọi khách hàng
              </button>
            </div>
          </div>

          {/* Job Details */}
          <div className="details-card">
            <h3 className="card-title">Chi tiết công việc</h3>
            <div className="details-list">
              <div className="detail-item">
                <p className="detail-label">Dịch vụ</p>
                <p className="detail-value">Dọn dẹp nhà cửa</p>
              </div>
              <div className="detail-item">
                <p className="detail-label">Thời lượng</p>
                <p className="detail-value">2 giờ</p>
              </div>
              <div className="detail-item">
                <p className="detail-label">Giờ bắt đầu</p>
                <p className="detail-value">10:00 SA</p>
              </div>
              <div className="detail-item">
                <p className="detail-label">Địa điểm</p>
                <p className="detail-value">123 Đường Chính, Căn hộ 4B</p>
              </div>
              <div className="detail-item">
                <p className="detail-label">Thanh toán</p>
                <p className="detail-payment">142.500₫</p>
              </div>
            </div>
          </div>

          {/* Task Checklist */}
          <div className="checklist-card">
            <h3 className="card-title">Danh sách công việc</h3>
            <div className="checklist-items">
              {checklist.map((item, i) => (
                <div 
                  key={i} 
                  className="checklist-item"
                  onClick={() => toggleChecklistItem(i)}
                >
                  <div className={`checkbox ${item.completed ? 'checked' : ''}`}>
                    {item.completed && <Check className="check-icon" />}
                  </div>
                  <span className={item.completed ? 'completed-text' : ''}>
                    {item.task}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Report Issue */}
          <div className="report-card">
            <h3 className="card-title">Cần trợ giúp?</h3>
            <p className="report-text">
              Báo cáo bất kỳ vấn đề nào hoặc liên hệ hỗ trợ
            </p>
            <button className="btn-report">
              <Flag className="icon-small" />
              Báo cáo vấn đề
            </button>
          </div>
        </div>
      </div>

      {/* Rating Modal */}
      {showRatingModal && (
        <div className="modal-overlay" onClick={() => setShowRatingModal(false)}>
          <div className="modal-content rating-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowRatingModal(false)}>
              <X className="icon-small" />
            </button>

            <h2 className="modal-title">Đánh giá khách hàng</h2>
            
            <div className="rating-content">
              {/* Customer Info */}
              <div className="rating-customer">
                <div className="customer-avatar">JD</div>
                <h4 className="customer-name">John Doe</h4>
                <p className="customer-label">Khách hàng</p>
              </div>

              {/* Star Rating */}
              <div className="rating-section">
                <label className="rating-label">Đánh giá của bạn</label>
                <div className="stars-container">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="star-button"
                    >
                      <Star
                        className={`star-icon ${
                          star <= (hoverRating || rating) ? 'filled' : ''
                        }`}
                      />
                    </button>
                  ))}
                </div>
                <p className="rating-text">
                  {rating === 0 && 'Chọn số sao'}
                  {rating === 1 && 'Rất tệ'}
                  {rating === 2 && 'Tệ'}
                  {rating === 3 && 'Bình thường'}
                  {rating === 4 && 'Tốt'}
                  {rating === 5 && 'Xuất sắc'}
                </p>
              </div>

              {/* Comment */}
              <div className="comment-section">
                <label className="comment-label">Nhận xét về khách hàng (tùy chọn)</label>
                <textarea
                  value={ratingComment}
                  onChange={(e) => setRatingComment(e.target.value)}
                  placeholder="Khách hàng thân thiện, giao tiếp rõ ràng..."
                  className="comment-textarea"
                />
              </div>

              {/* Quick Tags */}
              <div className="tags-section">
                <label className="tags-label">Từ khóa nhanh</label>
                <div className="tags-list">
                  {['Thân thiện', 'Đúng giờ', 'Giao tiếp tốt', 'Nhiệt tình', 'Chuyên nghiệp'].map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => addQuickTag(tag)}
                      className="tag-button"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Payment Summary */}
              <div className="payment-summary">
                <div className="payment-row">
                  <span className="payment-label">Thu nhập công việc:</span>
                  <span className="payment-value">142.500₫</span>
                </div>
                <p className="payment-note">
                  Thanh toán sẽ được xử lý sau khi gửi đánh giá
                </p>
              </div>

              {/* Action Buttons */}
              <div className="modal-actions">
                <button onClick={() => setShowRatingModal(false)} className="btn-cancel-modal">
                  Hủy
                </button>
                <button onClick={handleSubmitRating} className="btn-submit-rating">
                  Gửi đánh giá
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
