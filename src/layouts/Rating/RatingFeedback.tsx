import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, ThumbsUp, Clock, Smile, Award, Flag, Check, Sparkles } from 'lucide-react';
import './RatingFeedback.css';

const quickTags = [
  { icon: ThumbsUp, label: 'Thân thiện', color: 'blue' },
  { icon: Clock, label: 'Đúng giờ', color: 'green' },
  { icon: Smile, label: 'Chuyên nghiệp', color: 'purple' },
  { icon: Award, label: 'Chất lượng cao', color: 'orange' },
  { icon: Sparkles, label: 'Vượt mong đợi', color: 'pink' },
];

export default function RatingFeedback() {
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  const getRatingText = () => {
    switch(rating) {
      case 5: return '🌟 Xuất sắc!';
      case 4: return '😊 Tuyệt vời!';
      case 3: return '👍 Tốt';
      case 2: return '😐 Khá';
      case 1: return '😞 Kém';
      default: return '';
    }
  };

  if (submitted) {
    return (
      <div className="rating-success-container">
        <div className="success-card">
          <div className="success-icon-wrapper">
            <Check className="success-check" />
          </div>
          <h2 className="success-title">Cảm ơn phản hồi của bạn!</h2>
          <p className="success-text">
            Đánh giá của bạn giúp chúng tôi duy trì chất lượng dịch vụ
          </p>
          <div className="success-reward">
            <Award className="reward-icon" />
            <span>Bạn đã nhận được 50 điểm thưởng!</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rating-container">
      {/* Header */}
      <div className="rating-header">
        <h1 className="rating-title">Đánh giá trải nghiệm</h1>
        <p className="rating-subtitle">Giúp chúng tôi cải thiện bằng cách chia sẻ phản hồi của bạn</p>
      </div>

      <div className="rating-content">
        {/* Main Rating Section */}
        <div className="rating-main">
          {/* Star Rating */}
          <div className="star-rating-card">
            <h2 className="card-title">Dịch vụ của bạn thế nào?</h2>
            <div className="stars-wrapper">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
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
            {rating > 0 && (
              <p className="rating-text">{getRatingText()}</p>
            )}
          </div>

          {/* Quick Tags */}
          <div className="tags-card">
            <h2 className="card-title">Bạn thích điều gì?</h2>
            <p className="card-subtitle">Chọn tất cả những gì phù hợp</p>
            <div className="tags-grid">
              {quickTags.map((tag) => (
                <button
                  key={tag.label}
                  onClick={() => toggleTag(tag.label)}
                  className={`tag-button ${selectedTags.includes(tag.label) ? 'selected' : ''}`}
                >
                  <tag.icon className="tag-icon" />
                  <span>{tag.label}</span>
                  {selectedTags.includes(tag.label) && (
                    <Check className="tag-check" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Written Feedback */}
          <div className="feedback-card">
            <h2 className="card-title">Nhận xét bổ sung</h2>
            <p className="card-subtitle">Chia sẻ thêm chi tiết về trải nghiệm của bạn (tùy chọn)</p>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Cho chúng tôi biết điều gì đã tốt hoặc cách chúng tôi có thể cải thiện..."
              className="feedback-textarea"
              maxLength={500}
            />
            <p className="character-count">{comment.length} / 500 ký tự</p>
          </div>

          {/* Report Issue */}
          <button className="report-button">
            <Flag className="report-icon" />
            <span>Báo cáo sự cố</span>
          </button>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={rating === 0}
            className="submit-button"
          >
            <Check className="submit-icon" />
            Gửi đánh giá
          </button>
        </div>

        {/* Sidebar - Worker Info */}
        <div className="rating-sidebar">
          <div className="worker-info-card">
            <h3 className="sidebar-title">Chi tiết người làm việc</h3>
            <div className="worker-profile">
              <div className="worker-avatar">
                <img src="https://images.unsplash.com/photo-1665436035665-d7dad9086ee2?w=300" alt="Sarah Johnson" />
              </div>
              <h4 className="worker-name">Sarah Johnson</h4>
              <div className="worker-rating">
                <span className="rating-star">★</span>
                <span>4.9 (156 đánh giá)</span>
              </div>
            </div>

            <div className="worker-details">
              <div className="detail-item">
                <p className="detail-label">Dịch vụ</p>
                <p className="detail-value">Dọn dẹp nhà cửa</p>
              </div>
              <div className="detail-item">
                <p className="detail-label">Thời gian hoàn thành</p>
                <p className="detail-value">2 giờ</p>
              </div>
              <div className="detail-item">
                <p className="detail-label">Ngày</p>
                <p className="detail-value">28/10/2025</p>
              </div>
            </div>
          </div>

          <div className="reward-card">
            <div className="reward-icon-wrapper">
              <Award className="reward-badge-icon" />
            </div>
            <h3 className="reward-title">Nhận phần thưởng</h3>
            <p className="reward-text">
              Để lại đánh giá chi tiết để nhận 50 điểm thưởng!
            </p>
          </div>

          <div className="importance-card">
            <h3 className="importance-title">💚 Phản hồi của bạn rất quan trọng</h3>
            <p className="importance-text">
              Đánh giá giúp người làm việc cải thiện và giúp khách hàng khác đưa ra quyết định sáng suốt.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
