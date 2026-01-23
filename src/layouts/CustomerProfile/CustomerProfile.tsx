import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, Wallet, History, HeadphonesIcon, Edit2, Star, MapPin, 
  Phone, Mail, CreditCard, DollarSign, Calendar, LogOut, FileText, Check,
  ShieldCheck 
} from 'lucide-react';
import './CustomerProfile.css';

const completedTasks = [
  { id: 1, service: 'Dọn dẹp nhà cửa', worker: 'Sarah Johnson', date: '24/10/2025', amount: '142.500đ', status: 'Hoàn thành', rating: 5 },
  { id: 2, service: 'Lắp ráp đồ nội thất', worker: 'Mike Chen', date: '20/10/2025', amount: '85.000đ', status: 'Hoàn thành', rating: 4 },
  { id: 3, service: 'Bảo trì vườn', worker: 'Emma Davis', date: '15/10/2025', amount: '120.000đ', status: 'Hoàn thành', rating: 5 },
];

const transactions = [
  { id: 1, type: 'Thanh toán', description: 'Dịch vụ dọn dẹp nhà cửa', amount: -142.50, date: '24/10/2025' },
  { id: 2, type: 'Hoàn tiền', description: 'Dịch vụ đã hủy', amount: 50.00, date: '22/10/2025' },
  { id: 3, type: 'Nạp tiền', description: 'Nạp ví', amount: 200.00, date: '20/10/2025' },
];

const myPosts = [
  {
    id: '1',
    userName: 'Nguyễn Văn A',
    location: 'Quận 1, TP.HCM',
    timeAgo: '2 ngày trước',
    serviceCategory: 'Dọn dẹp',
    budget: '150.000₫ - 200.000₫',
    content: 'Mình cần tìm người giúp dọn dẹp nhà cửa cho căn hộ 3 phòng ngủ. Yêu cầu kinh nghiệm và mang theo dụng cụ dọn dẹp.',
    likes: 12,
    comments: 5,
    shares: 2
  }
];

export default function CustomerProfile() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [editMode, setEditMode] = useState(false);
  const [isVerified, setIsVerified] = useState(true); // ✅ State xác minh

  return (
    <div className="profile-container">
      {/* Header */}
      <div className="profile-header">
        <h1 className="profile-title">Hồ sơ của tôi</h1>
        <p className="profile-subtitle">Quản lý tài khoản và xem hoạt động của bạn</p>
      </div>

      {/* Tabs - ✅ BỎ tab Wallet */}
      <div className="profile-tabs">
        <div className="tabs-list">
          <button 
            className={`tab-item ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            <User className="tab-icon" />
            Hồ sơ
          </button>
          <button 
            className={`tab-item ${activeTab === 'history' ? 'active' : ''}`}
            onClick={() => setActiveTab('history')}
          >
            <History className="tab-icon" />
            Lịch sử
          </button>
          <button 
            className={`tab-item ${activeTab === 'posts' ? 'active' : ''}`}
            onClick={() => setActiveTab('posts')}
          >
            <FileText className="tab-icon" />
            Bài đăng
          </button>
          <button 
            className={`tab-item ${activeTab === 'payment' ? 'active' : ''}`}
            onClick={() => setActiveTab('payment')}
          >
            <CreditCard className="tab-icon" />
            Thanh toán
          </button>
          <button 
            className={`tab-item ${activeTab === 'support' ? 'active' : ''}`}
            onClick={() => setActiveTab('support')}
          >
            <HeadphonesIcon className="tab-icon" />
            Hỗ trợ
          </button>
        </div>

        {/* Profile Tab Content - ✅ THÊM trạng thái xác minh */}
        {activeTab === 'profile' && (
          <div className="tab-content">
            <div className="profile-grid">
              {/* Profile Card */}
              <div className="profile-card">
                <div className="profile-avatar-section">
                  <div className="profile-avatar">
                    <span className="avatar-initials">NVA</span>
                  </div>
                  <h2 className="profile-name">Nguyễn Văn A</h2>
                  
                  {/* ✅ TRẠNG THÁI XÁC MINH */}
                  <div className="profile-verified">
                    {isVerified ? (
                      <>
                        <ShieldCheck className="verified-icon" />
                        <span>Tài khoản đã được xác minh</span>
                      </>
                    ) : (
                      <>
                        <div className="unverified-badge" />
                        <span>Tài khoản chưa được xác minh</span>
                      </>
                    )}
                  </div>
                  
                  <p className="profile-member-since">Thành viên từ 10/2025</p>
                  <button className="upload-photo-btn">
                    <Edit2 className="btn-icon" />
                    Tải ảnh lên
                  </button>
                </div>

                <div className="profile-divider" />

                <div className="profile-stats">
                  <div className="stat-row">
                    <span className="stat-label">Tổng công việc</span>
                    <span className="stat-badge">12 hoàn thành</span>
                  </div>
                  <div className="stat-row">
                    <span className="stat-label">Đánh giá trung bình</span>
                    <div className="stat-rating">
                      <Star className="star-icon" />
                      <span>4.8</span>
                    </div>
                  </div>
                  <div className="stat-row">
                    <span className="stat-label">Tổng chi tiêu</span>
                    <span className="stat-value">1.247.500đ</span>
                  </div>
                </div>
              </div>

              {/* Personal Information */}
              <div className="info-card">
                <div className="info-header">
                  <h2 className="info-title">Thông tin cá nhân</h2>
                  <button
                    className="edit-btn"
                    onClick={() => setEditMode(!editMode)}
                  >
                    <Edit2 className="btn-icon" />
                    {editMode ? 'Hủy' : 'Chỉnh sửa'}
                  </button>
                </div>

                <div className="info-form">
                  <div className="form-row">
                    <div className="form-field">
                      <label className="field-label">Họ và tên</label>
                      <input
                        type="text"
                        defaultValue="Nguyễn Văn A"
                        disabled={!editMode}
                        className="field-input"
                      />
                    </div>
                    <div className="form-field">
                      <label className="field-label">Địa chỉ email</label>
                      <div className="input-with-icon">
                        <Mail className="input-icon" />
                        <input
                          type="email"
                          defaultValue="nguyenvana@email.com"
                          disabled={!editMode}
                          className="field-input with-icon"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-field">
                      <label className="field-label">Số điện thoại</label>
                      <div className="input-with-icon">
                        <Phone className="input-icon" />
                        <input
                          type="tel"
                          defaultValue="+84 123-456-789"
                          disabled={!editMode}
                          className="field-input with-icon"
                        />
                      </div>
                    </div>
                    <div className="form-field">
                      <label className="field-label">Thành phố</label>
                      <div className="input-with-icon">
                        <MapPin className="input-icon" />
                        <input
                          type="text"
                          defaultValue="Hồ Chí Minh"
                          disabled={!editMode}
                          className="field-input with-icon"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-field full-width">
                    <label className="field-label">Địa chỉ nhà</label>
                    <input
                      type="text"
                      defaultValue="123 Đường Chính, Căn hộ 4B"
                      disabled={!editMode}
                      className="field-input"
                    />
                  </div>
                </div>

                {editMode && (
                  <div className="form-actions">
                    <button className="cancel-btn" onClick={() => setEditMode(false)}>
                      Hủy
                    </button>
                    <button className="save-btn">
                      Lưu thay đổi
                    </button>
                  </div>
                )}
              </div>

              {/* Logout Card */}
              <div className="logout-card">
                <div className="logout-content">
                  <div>
                    <h3 className="logout-title">Đăng xuất</h3>
                    <p className="logout-text">Thoát khỏi tài khoản của bạn</p>
                  </div>
                  <button className="logout-btn" onClick={() => navigate('/login')}>
                    <LogOut className="btn-icon" />
                    Đăng xuất
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* History Tab Content */}
        {activeTab === 'history' && (
          <div className="tab-content">
            <div className="history-card">
              <h2 className="history-title">Lịch sử công việc</h2>
              <div className="history-list">
                {completedTasks.map((task) => (
                  <div key={task.id} className="history-item">
                    <div className="history-details">
                      <div className="history-header">
                        <h3 className="history-service">{task.service}</h3>
                        <span className="history-status">{task.status}</span>
                      </div>
                      <div className="history-meta">
                        <span>Người làm việc: {task.worker}</span>
                        <span className="meta-item">
                          <Calendar className="meta-icon" />
                          {task.date}
                        </span>
                        <div className="history-rating">
                          {Array.from({ length: task.rating }).map((_, i) => (
                            <Star key={i} className="rating-star filled" />
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="history-actions">
                      <p className="history-amount">{task.amount}</p>
                      <button className="view-detail-btn">Xem chi tiết</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Posts Tab Content */}
        {activeTab === 'posts' && (
          <div className="tab-content">
            <div className="posts-header">
              <div>
                <h2 className="posts-title">Bài đăng của tôi</h2>
                <p className="posts-subtitle">Quản lý tất cả bài đăng của bạn trên feed</p>
              </div>
              <span className="posts-count">{myPosts.length} bài đăng</span>
            </div>

            {myPosts.length === 0 ? (
              <div className="empty-posts">
                <FileText className="empty-icon" />
                <h3 className="empty-title">Chưa có bài đăng nào</h3>
                <p className="empty-text">Bạn chưa tạo bài đăng nào trên feed</p>
                <button className="create-post-btn">Tạo bài đăng đầu tiên</button>
              </div>
            ) : (
              <div className="posts-list">
                {myPosts.map((post) => (
                  <div key={post.id} className="post-card">
                    <div className="post-header">
                      <div className="post-author">
                        <div className="post-avatar">NVA</div>
                        <div>
                          <h4 className="post-author-name">{post.userName}</h4>
                          <p className="post-meta">{post.location} • {post.timeAgo}</p>
                        </div>
                      </div>
                    </div>
                    <div className="post-content">
                      <div className="post-tags">
                        <span className="post-category">{post.serviceCategory}</span>
                        <span className="post-budget">{post.budget}</span>
                      </div>
                      <p className="post-text">{post.content}</p>
                    </div>
                    <div className="post-footer">
                      <span>❤️ {post.likes}</span>
                      <span>💬 {post.comments}</span>
                      <span>🔗 {post.shares}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ✅ NEW: Payment Tab Content (Thay thế Wallet) */}
        {activeTab === 'payment' && (
          <div className="tab-content">
            <div className="payment-grid">
              {/* Payment Methods */}
              <div className="payment-card">
                <h3 className="payment-title">Phương thức thanh toán</h3>
                <div className="payment-methods">
                  <div className="payment-method">
                    <div className="method-info">
                      <div className="method-icon">
                        <CreditCard className="card-icon" />
                      </div>
                      <div>
                        <p className="method-number">•••• 4242</p>
                        <p className="method-expiry">Hết hạn 12/26</p>
                      </div>
                    </div>
                    <span className="method-badge">Chính</span>
                  </div>
                  <button className="add-method-btn">Thêm phương thức thanh toán</button>
                </div>
              </div>

              {/* Transactions */}
              <div className="transactions-card">
                <h2 className="transactions-title">Giao dịch gần đây</h2>
                <div className="transactions-list">
                  {transactions.map((transaction) => (
                    <div key={transaction.id} className="transaction-item">
                      <div className="transaction-info">
                        <div className={`transaction-icon ${transaction.amount > 0 ? 'positive' : 'negative'}`}>
                          <DollarSign className="dollar-icon" />
                        </div>
                        <div>
                          <p className="transaction-description">{transaction.description}</p>
                          <p className="transaction-date">{transaction.date}</p>
                        </div>
                      </div>
                      <p className={`transaction-amount ${transaction.amount > 0 ? 'positive' : ''}`}>
                        {transaction.amount > 0 ? '+' : ''}{Math.abs(transaction.amount * 1000).toFixed(0)}đ
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Support Tab Content */}
        {activeTab === 'support' && (
          <div className="tab-content">
            <div className="support-grid">
              <div className="support-contact-card">
                <div className="support-icon-wrapper">
                  <HeadphonesIcon className="support-icon" />
                </div>
                <h3 className="support-contact-title">Liên hệ hỗ trợ</h3>
                <p className="support-contact-text">Đội ngũ của chúng tôi luôn sẵn sàng hỗ trợ bạn 24/7</p>
                <button className="start-chat-btn">Bắt đầu chat</button>
              </div>

              <div className="support-help-card">
                <h3 className="support-help-title">Trợ giúp nhanh</h3>
                <div className="help-links">
                  <button className="help-link">Cách đặt dịch vụ</button>
                  <button className="help-link">Chính sách thanh toán & hoàn tiền</button>
                  <button className="help-link">Hướng dẫn an toàn</button>
                  <button className="help-link">Câu hỏi thường gặp</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
