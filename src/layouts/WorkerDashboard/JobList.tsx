import { useState } from 'react';
import { MapPin, Clock, User, Calendar, X } from 'lucide-react';
import { JobDetailModal } from './JobDetailModal';
import './JobList.css';

interface Props {
  onNavigate?: (page: any) => void;
}

const availableJobs = [
  {
    id: 1,
    service: 'Dọn dẹp nhà cửa sâu',
    customer: 'John Doe',
    date: 'Ngày 28 tháng 10, 2025',
    time: '2:00 CH',
    duration: '3 giờ',
    location: '123 Đường Chính',
    distance: '1.2 km',
    pay: 120,
    description: 'Cần dọn dẹp kỹ căn hộ 3 phòng ngủ bao gồm nhà bếp và phòng tắm.',
    urgent: false,
  },
  {
    id: 2,
    service: 'Lắp ráp nội thất',
    customer: 'Jane Smith',
    date: 'Ngày 28 tháng 10, 2025',
    time: '10:00 SA',
    duration: '2 giờ',
    location: '456 Đại lộ Oak',
    distance: '0.8 km',
    pay: 85,
    description: 'Lắp ráp nội thất IKEA - bàn làm việc và kệ sách.',
    urgent: true,
  },
  {
    id: 3,
    service: 'Chăm sóc vườn',
    customer: 'Mike Wilson',
    date: 'Ngày 29 tháng 10, 2025',
    time: '9:00 SA',
    duration: '4 giờ',
    location: '789 Đường Công Viên',
    distance: '3.2 km',
    pay: 150,
    description: 'Cắt cỏ, tỉa cây bụi và dọn dẹp vườn cơ bản.',
    urgent: false,
  },
  {
    id: 4,
    service: 'Lau kính cửa sổ',
    customer: 'Emily Brown',
    date: 'Ngày 29 tháng 10, 2025',
    time: '1:00 CH',
    duration: '2 giờ',
    location: '321 Đường Hill',
    distance: '2.1 km',
    pay: 90,
    description: 'Lau kính cửa sổ trong và ngoài cho nhà 2 tầng.',
    urgent: false,
  },
];

export default function JobList({ onNavigate }: Props) {
  const [selectedJob, setSelectedJob] = useState<number | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [filterService, setFilterService] = useState('all');
  const [filterSort, setFilterSort] = useState('distance');
  const [filterDistance, setFilterDistance] = useState('5');

  const handleAccept = (jobId: number) => {
    alert('Đã nhận việc thành công! Công việc đã được thêm vào lịch trình của bạn.');
    setShowDetailModal(false);
    setSelectedJob(null);
    if (onNavigate) onNavigate('current');
  };

  const handleReject = (jobId: number) => {
    alert('Đã từ chối công việc');
  };

  const selectedJobData = availableJobs.find(j => j.id === selectedJob);

  return (
    <div className="job-list-container">
      <div className="job-list-header">
        <div>
          <h1 className="page-title">Công việc có sẵn</h1>
          <p className="page-subtitle">Tìm và nhận công việc phù hợp với kỹ năng của bạn</p>
        </div>
      </div>

      {/* Filters */}
      <div className="filters-container">
        <select 
          value={filterService}
          onChange={(e) => setFilterService(e.target.value)}
          className="filter-select"
        >
          <option value="all">Tất cả dịch vụ</option>
          <option value="cleaning">Dọn dẹp</option>
          <option value="delivery">Giao hàng</option>
          <option value="repair">Sửa chữa</option>
          <option value="tutoring">Gia sư</option>
        </select>

        <select 
          value={filterSort}
          onChange={(e) => setFilterSort(e.target.value)}
          className="filter-select"
        >
          <option value="distance">Gần nhất trước</option>
          <option value="pay">Lương cao nhất</option>
          <option value="time">Sớm nhất</option>
        </select>

        <select 
          value={filterDistance}
          onChange={(e) => setFilterDistance(e.target.value)}
          className="filter-select"
        >
          <option value="all">Mọi khoảng cách</option>
          <option value="1">Trong vòng 1 km</option>
          <option value="3">Trong vòng 3 km</option>
          <option value="5">Trong vòng 5 km</option>
        </select>

        <div className="filter-spacer" />
        
        <div className="job-count-badge">
          {availableJobs.length} công việc có sẵn
        </div>
      </div>

      {/* Jobs Grid */}
      <div className="jobs-grid">
        {availableJobs.map((job) => (
          <div
            key={job.id}
            className={`job-card ${selectedJob === job.id ? 'selected' : ''}`}
            onClick={() => setSelectedJob(job.id)}
          >
            {/* Header */}
            <div className="job-card-header">
              <div className="job-card-title-section">
                <div className="job-card-title-row">
                  <h3 className="job-card-title">{job.service}</h3>
                  {job.urgent && (
                    <span className="urgent-badge">Khẩn cấp</span>
                  )}
                </div>
                <div className="job-card-customer">
                  <User className="icon-small" />
                  <span>{job.customer}</span>
                </div>
              </div>
              <div className="job-card-pay-section">
                <div className="job-pay">{job.pay}.000₫</div>
                <p className="job-duration">{job.duration}</p>
              </div>
            </div>

            {/* Description */}
            <p className="job-description">{job.description}</p>

            {/* Details */}
            <div className="job-details-grid">
              <div className="job-detail-item">
                <Calendar className="icon-small" />
                <span>{job.date}</span>
              </div>
              <div className="job-detail-item">
                <Clock className="icon-small" />
                <span>{job.time}</span>
              </div>
              <div className="job-detail-item">
                <MapPin className="icon-small" />
                <span>{job.location}</span>
              </div>
              <div className="job-detail-item">
                <MapPin className="icon-small" />
                <span>Cách {job.distance}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="job-card-actions">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedJob(job.id);
                  setShowDetailModal(true);
                }}
                className="btn-view-detail"
              >
                Xem chi tiết
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleReject(job.id);
                }}
                className="btn-reject"
              >
                <X className="icon-small" />
                Từ chối
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Job Detail Modal */}
      {selectedJobData && (
        <JobDetailModal
          open={showDetailModal}
          onOpenChange={setShowDetailModal}
          job={selectedJobData}
          onAccept={() => handleAccept(selectedJobData.id)}
        />
      )}
    </div>
  );
}
