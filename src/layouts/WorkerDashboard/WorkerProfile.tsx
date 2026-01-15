import { useState } from 'react';
import { User, Star, MapPin, Phone, Mail, Edit2, Award, Check, X } from 'lucide-react';
import './WorkerProfile.css';

interface Props {
  onNavigate?: (page: any) => void;
}

const skills = ['Dọn dẹp', 'Dọn sâu', 'Thân thiện môi trường', 'Thân thiện thú cưng', 'Tổ chức'];
const reviews = [
  { id: 1, customer: 'John Doe', rating: 5, comment: 'Dịch vụ xuất sắc! Rất kỹ lưỡng và chuyên nghiệp.', date: 'Ngày 24/10/2025' },
  { id: 2, customer: 'Jane Smith', rating: 5, comment: 'Sarah đã làm việc tuyệt vời. Rất đáng giới thiệu!', date: 'Ngày 20/10/2025' },
  { id: 3, customer: 'Mike Wilson', rating: 4, comment: 'Công việc tốt, đến đúng giờ.', date: 'Ngày 15/10/2025' },
];

export default function WorkerProfile({ onNavigate }: Props) {
  const [editMode, setEditMode] = useState(false);
  const [isAvailable, setIsAvailable] = useState(true);
  const [formData, setFormData] = useState({
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+84 (555) 987-6543',
    city: 'Hồ Chí Minh, Việt Nam',
    bio: 'Chuyên gia dọn dẹp chuyên nghiệp với hơn 5 năm kinh nghiệm. Cam kết cung cấp dịch vụ dọn dẹp thân thiện với môi trường và kỹ lưỡng. Thân thiện với thú cưng và linh hoạt với lịch trình.'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    alert('Đã lưu thay đổi!');
    setEditMode(false);
  };

  const handleCancel = () => {
    setEditMode(false);
    // Reset form data
    setFormData({
      name: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      phone: '+84 (555) 987-6543',
      city: 'Hồ Chí Minh, Việt Nam',
      bio: 'Chuyên gia dọn dẹp chuyên nghiệp với hơn 5 năm kinh nghiệm. Cam kết cung cấp dịch vụ dọn dẹp thân thiện với môi trường và kỹ lưỡng. Thân thiện với thú cưng và linh hoạt với lịch trình.'
    });
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1 className="page-title">Hồ sơ của tôi</h1>
        <p className="page-subtitle">Quản lý hồ sơ chuyên nghiệp và cài đặt của bạn</p>
      </div>

      <div className="profile-content">
        {/* Profile Card */}
        <div className="profile-sidebar">
          <div className="profile-card">
            <div className="profile-avatar-section">
              <div className="profile-avatar">
                <img src="https://i.pravatar.cc/150?img=5" alt="Sarah Johnson" />
              </div>
              <h2 className="profile-name">Sarah Johnson</h2>
              <div className="profile-badges">
                <span className="profile-badge verified">
                  <Check className="badge-icon" />
                  Đã xác minh
                </span>
                <span className="profile-badge premium">
                  ⭐ Được đánh giá cao
                </span>
              </div>
              <button className="btn-upload-photo">
                <Edit2 className="icon-small" />
                Tải lên ảnh
              </button>
            </div>

            <div className="profile-divider" />

            <div className="profile-stats">
              <div className="profile-stat-item">
                <span className="stat-label">Sẵn sàng làm việc</span>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={isAvailable}
                    onChange={(e) => setIsAvailable(e.target.checked)}
                  />
                  <span className="slider"></span>
                </label>
              </div>
              <div className="profile-stat-item">
                <span className="stat-label">Đánh giá</span>
                <div className="stat-value-with-icon">
                  <Star className="star-icon filled" />
                  <span>4.9 (156)</span>
                </div>
              </div>
              <div className="profile-stat-item">
                <span className="stat-label">Việc hoàn thành</span>
                <span className="stat-value">156</span>
              </div>
              <div className="profile-stat-item">
                <span className="stat-label">Tỷ lệ thành công</span>
                <span className="stat-value">98%</span>
              </div>
              <div className="profile-stat-item">
                <span className="stat-label">Thời gian phản hồi</span>
                <span className="stat-value">2 phút</span>
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div className="achievements-card">
            <div className="achievements-header">
              <Award className="achievements-icon" />
              <h3 className="card-title">Huy hiệu & Thành tích</h3>
            </div>
            <div className="achievements-grid">
              <div className="achievement-badge">
                <div className="achievement-emoji">🏆</div>
                <p className="achievement-text">Xuất sắc nhất</p>
              </div>
              <div className="achievement-badge">
                <div className="achievement-emoji">⭐</div>
                <p className="achievement-text">Chuyên gia 5 sao</p>
              </div>
              <div className="achievement-badge">
                <div className="achievement-emoji">🎯</div>
                <p className="achievement-text">100+ việc</p>
              </div>
              <div className="achievement-badge">
                <div className="achievement-emoji">⚡</div>
                <p className="achievement-text">Phản hồi nhanh</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="profile-main">
          {/* Personal Info */}
          <div className="info-card">
            <div className="info-header">
              <h2 className="section-title">Thông tin cá nhân</h2>
              <button
                onClick={() => editMode ? handleCancel() : setEditMode(true)}
                className="btn-edit"
              >
                <Edit2 className="icon-small" />
                {editMode ? 'Hủy' : 'Chỉnh sửa'}
              </button>
            </div>

            <div className="info-form">
              <div className="form-row">
                <div className="form-field">
                  <label className="form-label">Họ và tên</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    disabled={!editMode}
                    className="form-input"
                  />
                </div>
                <div className="form-field">
                  <label className="form-label">Địa chỉ email</label>
                  <div className="input-with-icon">
                    <Mail className="input-icon" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      disabled={!editMode}
                      className="form-input with-icon"
                    />
                  </div>
                </div>
              </div>
              <div className="form-row">
                <div className="form-field">
                  <label className="form-label">Số điện thoại</label>
                  <div className="input-with-icon">
                    <Phone className="input-icon" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      disabled={!editMode}
                      className="form-input with-icon"
                    />
                  </div>
                </div>
                <div className="form-field">
                  <label className="form-label">Thành phố</label>
                  <div className="input-with-icon">
                    <MapPin className="input-icon" />
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      disabled={!editMode}
                      className="form-input with-icon"
                    />
                  </div>
                </div>
              </div>
            </div>

            {editMode && (
              <div className="form-actions">
                <button onClick={handleCancel} className="btn-cancel">
                  Hủy
                </button>
                <button onClick={handleSave} className="btn-save">
                  Lưu thay đổi
                </button>
              </div>
            )}
          </div>

          {/* Skills & Services */}
          <div className="skills-card">
            <h2 className="section-title">Kỹ năng & Dịch vụ</h2>
            <p className="section-subtitle">Các dịch vụ bạn cung cấp cho khách hàng</p>
            <div className="skills-list">
              {skills.map((skill) => (
                <span key={skill} className="skill-badge">
                  {skill}
                  {editMode && <span className="skill-remove">×</span>}
                </span>
              ))}
              {editMode && (
                <button className="btn-add-skill">+ Thêm kỹ năng</button>
              )}
            </div>

            <div className="bio-section">
              <label className="form-label">Giới thiệu bản thân</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                disabled={!editMode}
                className="bio-textarea"
              />
            </div>
          </div>

          {/* Working Area */}
          <div className="area-card">
            <h2 className="section-title">Khu vực làm việc</h2>
            <p className="section-subtitle">Các khu vực bạn cung cấp dịch vụ</p>
            <div className="map-placeholder">
              <MapPin className="map-icon" />
              <p className="map-title">Bản đồ khu vực dịch vụ</p>
              <p className="map-subtitle">Bán kính 5 km từ vị trí của bạn</p>
            </div>
          </div>

          {/* Reviews */}
          <div className="reviews-card">
            <div className="reviews-header">
              <div>
                <h2 className="section-title">Đánh giá từ khách hàng</h2>
                <div className="reviews-summary">
                  <div className="stars-display">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="star-icon filled" />
                    ))}
                  </div>
                  <span className="reviews-text">Trung bình 4.9 từ 156 đánh giá</span>
                </div>
              </div>
            </div>

            <div className="reviews-list">
              {reviews.map((review) => (
                <div key={review.id} className="review-item">
                  <div className="review-header">
                    <div>
                      <p className="review-customer">{review.customer}</p>
                      <div className="review-stars">
                        {Array.from({ length: review.rating }).map((_, i) => (
                          <Star key={i} className="star-icon small filled" />
                        ))}
                      </div>
                    </div>
                    <span className="review-date">{review.date}</span>
                  </div>
                  <p className="review-comment">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
