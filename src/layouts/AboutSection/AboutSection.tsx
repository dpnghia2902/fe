import "./AboutSection.css";
import { useNavigate } from "react-router-dom";

export default function AboutSection() {
    const navigate = useNavigate();

  return (
    <section className="about-section">
      <div className="about-container">
        {/* Header */}
        <div className="about-header">
          <h2 className="about-title">
            Kết nối thông minh giữa người cần việc và người làm việc
          </h2>
          <p className="about-description">
            HandyGo là nền tảng công nghệ giúp kết nối những người cần hỗ trợ công việc 
            hàng ngày với những người làm việc chuyên nghiệp và đáng tin cậy trong khu vực của bạn.
          </p>
        </div>

        {/* Features Grid */}
        <div className="features-grid">
          {/* Feature 1 */}
          <div className="feature-card">
            <div className="feature-icon feature-icon-primary">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="feature-title">Cộng đồng đáng tin cậy</h3>
            <p className="feature-text">
              Hàng ngàn người làm việc đã được xác minh và đánh giá bởi cộng đồng. 
              Bạn có thể yên tâm tìm kiếm người phù hợp nhất cho công việc của mình.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="feature-card">
            <div className="feature-icon feature-icon-success">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="feature-title">Nhanh chóng & Tiện lợi</h3>
            <p className="feature-text">
              Đăng công việc chỉ trong vài phút và nhận được phản hồi ngay lập tức. 
              Tiết kiệm thời gian và công sức tìm kiếm người giúp việc.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="feature-card">
            <div className="feature-icon feature-icon-warning">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="feature-title">An toàn & Bảo mật</h3>
            <p className="feature-text">
              Hệ thống thanh toán trực tuyến an toàn, bảo vệ thông tin cá nhân. 
              Chính sách hoàn tiền rõ ràng và hỗ trợ khách hàng 24/7.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="feature-card">
            <div className="feature-icon feature-icon-info">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="feature-title">Giá cả minh bạch</h3>
            <p className="feature-text">
              Người làm việc tự đặt giá dịch vụ. Bạn có thể so sánh và chọn lựa 
              mức giá phù hợp nhất với ngân sách của mình.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="stats-section">
          <div className="stat-item">
            <div className="stat-number">10,000+</div>
            <div className="stat-label">Người làm việc</div>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <div className="stat-number">50,000+</div>
            <div className="stat-label">Công việc hoàn thành</div>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <div className="stat-number">4.8/5</div>
            <div className="stat-label">Đánh giá trung bình</div>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <div className="stat-number">24/7</div>
            <div className="stat-label">Hỗ trợ khách hàng</div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="cta-section">
          <h3 className="cta-title">Sẵn sàng bắt đầu?</h3>
          <p className="cta-text">
            Tham gia HandyGo ngay hôm nay và trải nghiệm sự khác biệt!
          </p>
          <div className="cta-buttons">
            <button className="btn-primary"
            onClick={() => navigate('/login')}
            >
              Bắt đầu ngay
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
