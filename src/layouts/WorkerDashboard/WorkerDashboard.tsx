import { useState } from 'react';
import { TrendingUp, DollarSign, Star, Briefcase, Clock, Award, MapPin, ChevronRight, Home } from 'lucide-react';
import { Feed } from '../Feed/Feed';
import { JobDetailModal } from './JobDetailModal';
import './WorkerDashboard.css';

interface Props {
  onNavigate?: (page: any) => void;
}

const todayJobs = [
  { id: 1, service: 'Dọn dẹp nhà cửa', customer: 'John Doe', time: '10:00 SA', location: '1.2 km', pay: 75, status: 'Đã lên lịch' },
  { id: 2, service: 'Lắp ráp nội thất', customer: 'Jane Smith', time: '2:00 CH', location: '2.5 km', pay: 85, status: 'Đã lên lịch' },
];

const stats = [
  { label: 'Thu nhập hôm nay', value: '0₫', icon: DollarSign, color: 'from-green-500', change: '+12%' },
  { label: 'Việc hoàn thành', value: '156', icon: Briefcase, color: 'from-blue-500', change: '+8' },
  { label: 'Đánh giá trung bình', value: '4.9', icon: Star, color: 'from-yellow-500', change: '+0.1' },
  { label: 'Giờ hoạt động', value: '124h', icon: Clock, color: 'from-purple-500', change: '+15h' },
];

export default function WorkerDashboard({ onNavigate }: Props) {
  const [isAvailable, setIsAvailable] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedJob, setSelectedJob] = useState<number | null>(null);

  const handleAcceptJob = () => {
    alert('Đã nhận việc thành công! Công việc đã được thêm vào lịch trình của bạn.');
    setSelectedJob(null);
    if (onNavigate) onNavigate('current');
  };

  const selectedJobData = todayJobs.find(job => job.id === selectedJob);

  return (
    <div className="worker-dashboard">
      {/* Welcome Section */}
      <div className="dashboard-header">
        <div className="header-content">
          <div>
            <h1 className="dashboard-title">Chào mừng trở lại, Sarah! 👋</h1>
            <p className="dashboard-subtitle">Đây là tổng quan hiệu suất của bạn</p>
          </div>
          <div className="status-card">
            <div className="status-info">
              <p className="status-label">Trạng thái</p>
              <p className={`status-value ${isAvailable ? 'available' : 'offline'}`}>
                {isAvailable ? 'Sẵn sàng' : 'Ngoại tuyến'}
              </p>
            </div>
            <label className="switch">
              <input
                type="checkbox"
                checked={isAvailable}
                onChange={(e) => setIsAvailable(e.target.checked)}
              />
              <span className="slider"></span>
            </label>
          </div>
        </div>
      </div>

      {/* ✅ Tabs Navigation */}
      <div className="tabs-container">
        <div className="tabs-list">
          <button
            className={`tab-trigger ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <Home className="tab-icon" />
            <span className="tab-label">Bảng điều khiển</span>
          </button>
          <button
            className={`tab-trigger ${activeTab === 'feed' ? 'active' : ''}`}
            onClick={() => setActiveTab('feed')}
          >
            <Briefcase className="tab-icon" />
            <span className="tab-label">Bảng tin</span>
          </button>
        </div>

        {/* ✅ Dashboard Tab Content */}
        {activeTab === 'dashboard' && (
          <div className="tab-content">
            {/* Stats Grid */}
            <div className="stats-grid">
              {stats.map((stat) => (
                <div key={stat.label} className="stat-card">
                  <div className="stat-header">
                    <div className={`stat-icon bg-gradient-${stat.color}`}>
                      <stat.icon className="icon" />
                    </div>
                    <span className="stat-change">{stat.change}</span>
                  </div>
                  <p className="stat-label">{stat.label}</p>
                  <p className="stat-value">{stat.value}</p>
                </div>
              ))}
            </div>

            <div className="dashboard-content">
              {/* Left Column - Today's Jobs */}
              <div className="left-column">
                <div className="jobs-card">
                  <div className="jobs-header">
                    <div>
                      <h2 className="section-title">Lịch hôm nay</h2>
                      <p className="section-subtitle">{todayJobs.length} công việc đang chờ</p>
                    </div>
                    <button 
                      onClick={() => onNavigate && onNavigate('jobs')}
                      className="btn-outline"
                    >
                      Xem tất cả
                    </button>
                  </div>

                  <div className="jobs-list">
                    {todayJobs.map((job) => (
                      <div 
                        key={job.id} 
                        className="job-item"
                        onClick={() => onNavigate && onNavigate('current')}
                      >
                        <div className="job-header">
                          <div>
                            <h3 className="job-title">{job.service}</h3>
                            <p className="job-customer">Khách hàng: {job.customer}</p>
                          </div>
                          <div className="job-right">
                            <p className="job-pay">{job.pay}.000₫</p>
                            <span className="job-status">{job.status}</span>
                          </div>
                        </div>
                        <div className="job-info">
                          <div className="info-item">
                            <Clock className="info-icon" />
                            <span>{job.time}</span>
                          </div>
                          <div className="info-item">
                            <MapPin className="info-icon" />
                            <span>Cách {job.location}</span>
                          </div>
                        </div>
                        <div className="job-actions">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedJob(job.id);
                            }}
                            className="btn-primary"
                          >
                            Xem chi tiết
                          </button>
                          <button className="btn-outline">Chỉ đường</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Action */}
                <div className="action-card">
                  <div className="action-content">
                    <div>
                      <h3 className="action-title">Công việc mới có sẵn</h3>
                      <p className="action-desc">5 công việc mới phù hợp với kỹ năng của bạn</p>
                    </div>
                    <button 
                      onClick={() => onNavigate && onNavigate('jobs')}
                      className="btn-action"
                    >
                      Duyệt công việc
                      <ChevronRight className="btn-icon" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column - Profile & Achievements */}
              <div className="right-column">
                {/* Profile Card */}
                <div className="profile-card">
                  <div className="profile-avatar">
                    <img src="https://i.pravatar.cc/150?img=5" alt="Sarah Johnson" />
                  </div>
                  <h3 className="profile-name">Sarah Johnson</h3>
                  <span className="profile-badge">✓ Chuyên nghiệp đã xác minh</span>

                  <div className="profile-stats">
                    <div className="profile-stat">
                      <span className="stat-label">Tỷ lệ thành công</span>
                      <span className="stat-value">98%</span>
                    </div>
                    <div className="profile-stat">
                      <span className="stat-label">Thời gian phản hồi</span>
                      <span className="stat-value">2 phút</span>
                    </div>
                    <div className="profile-stat">
                      <span className="stat-label">Thành viên từ</span>
                      <span className="stat-value">Tháng 1/2024</span>
                    </div>
                  </div>

                  <button 
                    onClick={() => onNavigate && onNavigate('profile')}
                    className="btn-outline full-width"
                  >
                    Xem hồ sơ đầy đủ
                  </button>
                </div>

                {/* Achievements */}
                <div className="achievements-card">
                  <div className="achievements-header">
                    <Award className="achievement-icon" />
                    <h3 className="section-title">Thành tích</h3>
                  </div>
                  <div className="achievements-list">
                    <div className="achievement-item">
                      <div className="achievement-emoji">🏆</div>
                      <div className="achievement-info">
                        <p className="achievement-title">Người làm việc xuất sắc</p>
                        <p className="achievement-subtitle">Tháng này</p>
                      </div>
                    </div>
                    <div className="achievement-item">
                      <div className="achievement-emoji">⭐</div>
                      <div className="achievement-info">
                        <p className="achievement-title">Đánh giá 5 sao</p>
                        <p className="achievement-subtitle">50 việc gần nhất</p>
                      </div>
                    </div>
                    <div className="achievement-item">
                      <div className="achievement-emoji">🎯</div>
                      <div className="achievement-info">
                        <p className="achievement-title">Cột mốc 100 công việc</p>
                        <p className="achievement-subtitle">Đã hoàn thành</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Earnings */}
                <div className="earnings-card">
                  <h3 className="section-title">Thu nhập tuần này</h3>
                  <div className="earnings-value">847.000₫</div>
                  <div className="earnings-change">
                    <TrendingUp className="change-icon" />
                    <span>+23% so với tuần trước</span>
                  </div>
                  <button 
                    onClick={() => onNavigate && onNavigate('earnings')}
                    className="btn-earnings"
                  >
                    Xem thu nhập
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ✅ Feed Tab Content */}
        {activeTab === 'feed' && (
          <div className="tab-content">
            <Feed
              isWorker={true}
              userName="Sarah Johnson"
              userAvatar="https://i.pravatar.cc/150?img=5"
              userType="worker"
            />
          </div>
        )}
      </div>

      {/* Job Detail Modal */}
      {selectedJobData && (
        <JobDetailModal
          open={selectedJob !== null}
          onOpenChange={(open) => !open && setSelectedJob(null)}
          job={{
            id: selectedJobData.id,
            service: selectedJobData.service,
            customer: selectedJobData.customer,
            date: 'Ngày 28 tháng 10, 2025',
            time: selectedJobData.time,
            duration: '2-3 giờ',
            location: '123 Đường Chính, Quận 1',
            distance: selectedJobData.location,
            pay: selectedJobData.pay,
            description: 'Cần dọn dẹp kỹ căn hộ 3 phòng ngủ bao gồm nhà bếp và phòng tắm.'
          }}
          onAccept={handleAcceptJob}
        />
      )}
    </div>
  );
}
