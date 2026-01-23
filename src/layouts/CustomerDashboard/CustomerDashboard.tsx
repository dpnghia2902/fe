import { useState } from 'react';
import { Search, MapPin, Calendar, DollarSign, MessageCircle, Phone } from 'lucide-react';
import "./CustomerDashboard.css";

interface CustomerDashboardProps {
  onNavigate?: (path: string) => void;
}

const jobPosts = [
  {
    id: 1,
    title: 'Cần 5 người hỗ trợ chuyển phòng',
    description: 'Mình cần hỗ trợ chuyển các đồ đạc, tủ lạnh, bàn ghế... từ Sáng 2 xuống tầng 5. Dự kiến không nặng lắm. Cần 5 người để hoàn thành nhanh chóng...',
    author: 'Nguyễn Văn A',
    status: 'Thứ 2 người',
    date: '08:00 - 22/01/2026',
    location: '123 Đoàn Thúy Anh, Q.Hai Bà Trưng',
    budget: '300.000đ / người',
    images: 3,
    isFilled: false
  },
  {
    id: 2,
    title: 'Cần 3 người hỗ trợ chuyển phòng',
    description: 'Mình cần hỗ trợ chuyển các đồ đạc, tủ lạnh, bàn ghế... từ Sáng 2 xuống tầng 5. Dự kiến không nặng lắm...',
    author: 'Nguyễn Văn A',
    status: 'Đã đủ người',
    date: '08:00 - 22/01/2026',
    location: '123 Đoàn Thúy Anh, Q.Hai Bà Trưng',
    budget: '300.000đ / người',
    images: 3,
    isFilled: true
  },
  {
    id: 3,
    title: 'Cần 5 người hỗ trợ chuyển phòng',
    description: 'Mình cần hỗ trợ chuyển các đồ đạc, tủ lạnh, bàn ghế... từ Sáng 2 xuống tầng 5. Dự kiến không nặng lắm...',
    author: 'Nguyễn Văn A',
    status: 'Thứ 2 người',
    date: '08:00 - 12/01/2026',
    location: '123 Đoàn Thúy Anh, Q.Hai Bà Trưng',
    budget: '300.000đ / người',
    images: 3,
    isFilled: false
  }
];

export default function CustomerDashboard({ onNavigate }: CustomerDashboardProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');

  const handleNavigate = (path: string) => {
    if (onNavigate) {
      onNavigate(path);
    }
  };

  return (
    <>
      {/* Global Header */}
      <div className="dashboard-global-header">
        <div className="header-search-wrapper">
          <div className="header-search-input">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Tìm kiếm bài đăng"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="header-location-input">
            <MapPin className="location-icon" />
            <input
              type="text"
              placeholder="Địa điểm"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          <button className="header-search-btn">Tìm kiếm</button>
          <button className="header-post-btn" onClick={() => handleNavigate('create')}>
            + Tạo bài đăng
          </button>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="customer-dashboard">
        <div className="dashboard-container">
          {/* Job Posts List */}
          <div className="job-posts-container">
            {jobPosts.map((job) => (
              <div key={job.id} className="job-post-card">
                {/* Card Header */}
                <div className="job-post-header">
                  <div className="job-author-info">
                    <div className="author-avatar">N</div>
                    <span className="author-name">{job.author}</span>
                  </div>
                  <span className={`job-status-badge ${job.isFilled ? 'status-filled' : 'status-available'}`}>
                    {job.status}
                  </span>
                </div>

                {/* Card Title */}
                <h3 className="job-post-title">{job.title}</h3>

                {/* Card Description */}
                <p className="job-post-description">{job.description}</p>

                {/* Job Images Preview */}
                <div className="job-images-preview">
                  <div className="image-placeholder"></div>
                  <div className="image-placeholder"></div>
                  <div className="image-placeholder"></div>
                </div>

                {/* Job Details */}
                <div className="job-post-details">
                  <div className="detail-item">
                    <Calendar className="detail-icon" />
                    <span>{job.date}</span>
                  </div>
                  <div className="detail-item">
                    <MapPin className="detail-icon" />
                    <span>{job.location}</span>
                  </div>
                  <div className="detail-item budget-item">
                    <DollarSign className="detail-icon" />
                    <span>{job.budget}</span>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="job-post-footer">
                  {job.isFilled ? (
                    <button className="btn-filled" disabled>
                      Đã đủ nhân lực
                    </button>
                  ) : (
                    <>
                      <button className="btn-icon" onClick={() => console.log('Nhắn tin')}>
                        <MessageCircle className="btn-icon-svg" />
                        Nhắn tin
                      </button>
                      <button className="btn-icon" onClick={() => console.log('Gọi')}>
                        <Phone className="btn-icon-svg" />
                        Gọi
                      </button>
                      <button className="btn-primary" onClick={() => handleNavigate('tracking')}>
                        Nhận việc ngay
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
