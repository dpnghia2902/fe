import { Facebook, Twitter, Instagram, Linkedin, Phone, Mail, MapPin } from 'lucide-react';
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Column 1: Brand & Description */}
        <div className="footer-column">
          <div className="footer-logo">
            <h2 className="logo-text">Handy GO</h2>
          </div>
          <p className="footer-description">
            Nền tảng kết nối việc làm thời vụ hàng đầu Việt Nam. Giúp bạn tìm người làm việc nhanh chóng, an toàn và tiện lợi.
          </p>
          <div className="footer-social">
            <a href="#" className="social-link" aria-label="Facebook">
              <Facebook className="social-icon" />
            </a>
            <a href="#" className="social-link" aria-label="Twitter">
              <Twitter className="social-icon" />
            </a>
            <a href="#" className="social-link" aria-label="Instagram">
              <Instagram className="social-icon" />
            </a>
            <a href="#" className="social-link" aria-label="LinkedIn">
              <Linkedin className="social-icon" />
            </a>
          </div>
        </div>

        {/* Column 2: Về Handy GO */}
        <div className="footer-column">
          <h3 className="footer-heading">Về Handy GO</h3>
          <ul className="footer-links">
            <li><a href="#" className="footer-link">Giới thiệu</a></li>
            <li><a href="#" className="footer-link">Quy chế hoạt động</a></li>
            <li><a href="#" className="footer-link">Chính sách bảo mật</a></li>
            <li><a href="#" className="footer-link">Tuyển dụng</a></li>
          </ul>
        </div>

        {/* Column 3: Hỗ trợ */}
        <div className="footer-column">
          <h3 className="footer-heading">Hỗ trợ</h3>
          <ul className="footer-links">
            <li><a href="#" className="footer-link">Trung tâm trợ giúp</a></li>
            <li><a href="#" className="footer-link">An toàn & Tin cậy</a></li>
            <li><a href="#" className="footer-link">Báo cáo sự cố</a></li>
            <li><a href="#" className="footer-link">Cộng đồng Worker</a></li>
          </ul>
        </div>

        {/* Column 4: Liên hệ */}
        <div className="footer-column">
          <h3 className="footer-heading">Liên hệ</h3>
          <ul className="footer-contact">
            <li className="contact-item">
              <Phone className="contact-icon" />
              <span>1900 1234</span>
            </li>
            <li className="contact-item">
              <Mail className="contact-icon" />
              <span>hotro@handygo.vn</span>
            </li>
            <li className="contact-item">
              <MapPin className="contact-icon" />
              <span>Cầu Giấy, Hà Nội</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="footer-bottom-container">
          <p className="footer-copyright">© 2026 Handy GO. All rights reserved.</p>
          <div className="footer-language">
            <button className="language-btn">English</button>
            <button className="language-btn active">Tiếng Việt</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
