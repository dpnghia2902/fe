import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Briefcase, Users, Clock, MapPin, DollarSign, 
  Eye, Edit2, Trash2, CheckCircle2, XCircle,
  MessageCircle, Phone, Star, Calendar,
  ChevronRight, Filter, Search, Plus
} from 'lucide-react';
import "./MyJobs.css";

interface Applicant {
  id: number;
  name: string;
  avatar: string;
  rating: number;
  status: 'pending' | 'accepted' | 'rejected';
  appliedAt: string;
  completedJobs: number;
}

interface Job {
  id: number;
  title: string;
  description: string;
  location: string;
  budget: string;
  date: string;
  time: string;
  peopleNeeded: number;
  applicants: Applicant[];
  status: 'open' | 'filled' | 'in-progress' | 'completed';
  createdAt: string;
}

// MOCK DATA
const mockJobs: Job[] = [
  {
    id: 1,
    title: 'Cần 5 người hỗ trợ chuyển phòng',
    description: 'Mình cần hỗ trợ chuyển các đồ đạc, tủ lạnh, bàn ghế...',
    location: '123 Đoàn Thúy Anh, Q.Hai Bà Trưng',
    budget: '300.000₫/người',
    date: '22/01/2026',
    time: '08:00',
    peopleNeeded: 5,
    status: 'open',
    createdAt: '20/01/2026',
    applicants: [
      { 
        id: 1, 
        name: 'Nguyễn Văn A', 
        avatar: 'N', 
        rating: 4.8, 
        status: 'pending',
        appliedAt: '21/01/2026 14:30',
        completedJobs: 23
      },
      { 
        id: 2, 
        name: 'Trần Thị B', 
        avatar: 'T', 
        rating: 4.9, 
        status: 'accepted',
        appliedAt: '21/01/2026 15:00',
        completedJobs: 45
      },
    ]
  },
  {
    id: 2,
    title: 'Cần người dọn dẹp nhà cửa',
    description: 'Dọn dẹp tổng thể căn hộ 80m2',
    location: '456 Trần Duy Hưng, Q.Cầu Giấy',
    budget: '200.000₫/người',
    date: '25/01/2026',
    time: '09:00',
    peopleNeeded: 2,
    status: 'filled',
    createdAt: '19/01/2026',
    applicants: [
      { 
        id: 3, 
        name: 'Lê Văn C', 
        avatar: 'L', 
        rating: 4.7, 
        status: 'accepted',
        appliedAt: '20/01/2026 10:00',
        completedJobs: 34
      },
      { 
        id: 4, 
        name: 'Phạm Thị D', 
        avatar: 'P', 
        rating: 5.0, 
        status: 'accepted',
        appliedAt: '20/01/2026 11:20',
        completedJobs: 67
      },
    ]
  }
];

export default function MyJobs() {
  const navigate = useNavigate();
  const [jobs] = useState<Job[]>(mockJobs);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showApplicantsModal, setShowApplicantsModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const handleViewApplicants = (job: Job) => {
    setSelectedJob(job);
    setShowApplicantsModal(true);
  };

  const handleAcceptApplicant = (applicantId: number) => {
    console.log('Accept applicant:', applicantId);
    // TODO: API call
  };

  const handleRejectApplicant = (applicantId: number) => {
    console.log('Reject applicant:', applicantId);
    // TODO: API call
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      'open': { text: 'Đang tuyển', class: 'status-open' },
      'filled': { text: 'Đã đủ người', class: 'status-filled' },
      'in-progress': { text: 'Đang thực hiện', class: 'status-progress' },
      'completed': { text: 'Hoàn thành', class: 'status-completed' }
    };
    return badges[status as keyof typeof badges] || badges.open;
  };

  const filteredJobs = filterStatus === 'all' 
    ? jobs 
    : jobs.filter(job => job.status === filterStatus);

  return (
    <div className="my-jobs-container">
      {/* Header */}
      <div className="my-jobs-header">
        <div className="header-content">
          <h1 className="page-title">Quản lý bài đăng</h1>
          <p className="page-subtitle">Theo dõi và quản lý các yêu cầu của bạn</p>
        </div>
        <button 
          onClick={() => navigate('/create-task')}
          className="btn-create-job"
        >
          <Plus size={20} />
          Đăng bài mới
        </button>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon blue">
            <Briefcase size={24} />
          </div>
          <div className="stat-info">
            <h3>{jobs.length}</h3>
            <p>Tổng bài đăng</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon green">
            <Users size={24} />
          </div>
          <div className="stat-info">
            <h3>{jobs.reduce((sum, job) => sum + job.applicants.length, 0)}</h3>
            <p>Ứng viên</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon orange">
            <Clock size={24} />
          </div>
          <div className="stat-info">
            <h3>{jobs.filter(j => j.status === 'open').length}</h3>
            <p>Đang tuyển</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon purple">
            <CheckCircle2 size={24} />
          </div>
          <div className="stat-info">
            <h3>{jobs.filter(j => j.status === 'completed').length}</h3>
            <p>Hoàn thành</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="filters-section">
        <div className="filter-tabs">
          <button 
            className={`filter-tab ${filterStatus === 'all' ? 'active' : ''}`}
            onClick={() => setFilterStatus('all')}
          >
            Tất cả ({jobs.length})
          </button>
          <button 
            className={`filter-tab ${filterStatus === 'open' ? 'active' : ''}`}
            onClick={() => setFilterStatus('open')}
          >
            Đang tuyển ({jobs.filter(j => j.status === 'open').length})
          </button>
          <button 
            className={`filter-tab ${filterStatus === 'filled' ? 'active' : ''}`}
            onClick={() => setFilterStatus('filled')}
          >
            Đã đủ người ({jobs.filter(j => j.status === 'filled').length})
          </button>
        </div>
      </div>

      {/* Jobs List */}
      <div className="jobs-list">
        {filteredJobs.map(job => (
          <div key={job.id} className="job-card">
            <div className="job-card-header">
              <div className="job-title-section">
                <h3 className="job-title">{job.title}</h3>
                <span className={`status-badge ${getStatusBadge(job.status).class}`}>
                  {getStatusBadge(job.status).text}
                </span>
              </div>
              <div className="job-actions">
                <button 
                  className="action-btn view"
                  onClick={() => navigate(`/tracking/${job.id}`)}
                  title="Xem chi tiết"
                >
                  <Eye size={18} />
                </button>
                <button className="action-btn edit" title="Chỉnh sửa">
                  <Edit2 size={18} />
                </button>
                <button className="action-btn delete" title="Xóa">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>

            <p className="job-description">{job.description}</p>

            <div className="job-details">
              <div className="detail-item">
                <MapPin size={16} />
                <span>{job.location}</span>
              </div>
              <div className="detail-item">
                <Calendar size={16} />
                <span>{job.date} - {job.time}</span>
              </div>
              <div className="detail-item">
                <DollarSign size={16} />
                <span>{job.budget}</span>
              </div>
              <div className="detail-item">
                <Users size={16} />
                <span>Cần {job.peopleNeeded} người</span>
              </div>
            </div>

            <div className="job-card-footer">
              <div className="applicants-info">
                <div className="applicants-avatars">
                  {job.applicants.slice(0, 3).map(applicant => (
                    <div key={applicant.id} className="applicant-avatar">
                      {applicant.avatar}
                    </div>
                  ))}
                  {job.applicants.length > 3 && (
                    <div className="applicant-avatar more">
                      +{job.applicants.length - 3}
                    </div>
                  )}
                </div>
                <span className="applicants-count">
                  {job.applicants.length} ứng viên
                </span>
              </div>
              <button 
                className="btn-view-applicants"
                onClick={() => handleViewApplicants(job)}
              >
                Xem ứng viên
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Applicants Modal */}
      {showApplicantsModal && selectedJob && (
        <div className="modal-overlay" onClick={() => setShowApplicantsModal(false)}>
          <div className="applicants-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <h2>Ứng viên cho: {selectedJob.title}</h2>
                <p className="modal-subtitle">
                  {selectedJob.applicants.length} ứng viên - Cần {selectedJob.peopleNeeded} người
                </p>
              </div>
              <button 
                className="modal-close"
                onClick={() => setShowApplicantsModal(false)}
              >
                <XCircle size={24} />
              </button>
            </div>

            <div className="applicants-list">
              {selectedJob.applicants.map(applicant => (
                <div key={applicant.id} className="applicant-card">
                  <div className="applicant-info">
                    <div className="applicant-avatar-large">
                      {applicant.avatar}
                    </div>
                    <div className="applicant-details">
                      <h4>{applicant.name}</h4>
                      <div className="applicant-meta">
                        <div className="rating">
                          <Star size={16} fill="currentColor" />
                          <span>{applicant.rating}</span>
                        </div>
                        <span>•</span>
                        <span>{applicant.completedJobs} việc hoàn thành</span>
                      </div>
                      <p className="applied-time">Ứng tuyển: {applicant.appliedAt}</p>
                    </div>
                  </div>

                  <div className="applicant-actions">
                    {applicant.status === 'pending' && (
                      <>
                        <button 
                          className="btn-accept"
                          onClick={() => handleAcceptApplicant(applicant.id)}
                        >
                          <CheckCircle2 size={18} />
                          Chấp nhận
                        </button>
                        <button 
                          className="btn-reject"
                          onClick={() => handleRejectApplicant(applicant.id)}
                        >
                          <XCircle size={18} />
                          Từ chối
                        </button>
                      </>
                    )}
                    {applicant.status === 'accepted' && (
                      <span className="status-accepted">✓ Đã chấp nhận</span>
                    )}
                    {applicant.status === 'rejected' && (
                      <span className="status-rejected">✗ Đã từ chối</span>
                    )}
                  </div>

                  <div className="applicant-contact">
                    <button className="contact-btn">
                      <MessageCircle size={18} />
                    </button>
                    <button className="contact-btn">
                      <Phone size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
