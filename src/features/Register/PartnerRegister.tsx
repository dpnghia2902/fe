import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PartnerRegister.css";

export default function PartnerRegister() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    address: "",
    city: "",
    district: "",
    services: [] as string[],
    experience: "",
    idCard: "",
    idCardFront: null as File | null,
    idCardBack: null as File | null,
    avatar: null as File | null,
  });

  const serviceOptions = [
    "Dọn dẹp nhà cửa",
    "Sửa chữa điện nước",
    "Lắp đặt điều hòa",
    "Vệ sinh máy lạnh",
    "Sơn sửa nhà",
    "Chăm sóc người già",
    "Giúp việc theo giờ",
    "Vận chuyển hàng hóa",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleServiceToggle = (service: string) => {
    setFormData({
      ...formData,
      services: formData.services.includes(service)
        ? formData.services.filter(s => s !== service)
        : [...formData.services, service]
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, [field]: e.target.files[0] });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      alert("Đăng ký thành công! Chúng tôi sẽ xem xét và liên hệ với bạn trong 24-48 giờ.");
      navigate("/login");
    }
  };

  return (
    <div className="partner-register-container">
      <div className="partner-register-box">
        <div className="partner-header">
          <button onClick={() => navigate("/login")} className="back-btn">
            ← Quay lại
          </button>
          <h1 className="partner-register-title">Trở thành đối tác HandyGo</h1>
          <p className="partner-register-subtitle">
            Gia nhập mạng lưới người làm việc chuyên nghiệp
          </p>
        </div>

        {/* Progress Steps */}
        <div className="progress-steps">
          <div className={`step ${step >= 1 ? 'active' : ''}`}>
            <div className="step-number">1</div>
            <span className="step-label">Thông tin cơ bản</span>
          </div>
          <div className={`step ${step >= 2 ? 'active' : ''}`}>
            <div className="step-number">2</div>
            <span className="step-label">Dịch vụ & Kinh nghiệm</span>
          </div>
          <div className={`step ${step >= 3 ? 'active' : ''}`}>
            <div className="step-number">3</div>
            <span className="step-label">Xác thực danh tính</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="partner-form">
          {/* Step 1: Basic Info */}
          {step === 1 && (
            <div className="form-step">
              <h2 className="step-title">Thông tin cơ bản</h2>
              
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Họ và tên *</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Nguyễn Văn A"
                    className="form-input"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="example@email.com"
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Số điện thoại *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="0912345678"
                    className="form-input"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Mật khẩu *</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Xác nhận mật khẩu *</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="form-input"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Địa chỉ *</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Số nhà, tên đường"
                  className="form-input"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Thành phố *</label>
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="form-input"
                    required
                  >
                    <option value="">Chọn thành phố</option>
                    <option value="hanoi">Hà Nội</option>
                    <option value="hcm">TP. Hồ Chí Minh</option>
                    <option value="danang">Đà Nẵng</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Quận/Huyện *</label>
                  <input
                    type="text"
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                    placeholder="VD: Cầu Giấy"
                    className="form-input"
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Services */}
          {step === 2 && (
            <div className="form-step">
              <h2 className="step-title">Dịch vụ & Kinh nghiệm</h2>
              
              <div className="form-group">
                <label className="form-label">Chọn dịch vụ bạn cung cấp *</label>
                <div className="service-grid">
                  {serviceOptions.map(service => (
                    <button
                      key={service}
                      type="button"
                      onClick={() => handleServiceToggle(service)}
                      className={`service-tag ${formData.services.includes(service) ? 'selected' : ''}`}
                    >
                      {service}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Kinh nghiệm làm việc *</label>
                <textarea
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  placeholder="Mô tả kinh nghiệm làm việc, kỹ năng chuyên môn của bạn..."
                  className="form-textarea"
                  rows={5}
                  required
                />
              </div>
            </div>
          )}

          {/* Step 3: Verification */}
          {step === 3 && (
            <div className="form-step">
              <h2 className="step-title">Xác thực danh tính</h2>
              
              <div className="form-group">
                <label className="form-label">Số CMND/CCCD *</label>
                <input
                  type="text"
                  name="idCard"
                  value={formData.idCard}
                  onChange={handleChange}
                  placeholder="001234567890"
                  className="form-input"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Ảnh CMND/CCCD mặt trước *</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, 'idCardFront')}
                    className="form-input-file"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Ảnh CMND/CCCD mặt sau *</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, 'idCardBack')}
                    className="form-input-file"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Ảnh đại diện *</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, 'avatar')}
                  className="form-input-file"
                  required
                />
              </div>

              <div className="info-box">
                <p>📝 <strong>Lưu ý:</strong> Thông tin của bạn sẽ được xem xét trong vòng 24-48 giờ. Chúng tôi sẽ liên hệ qua email hoặc số điện thoại bạn đã cung cấp.</p>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="form-actions">
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="btn-back"
              >
                ← Quay lại
              </button>
            )}
            <button type="submit" className="btn-next">
              {step < 3 ? 'Tiếp theo →' : 'Hoàn tất đăng ký'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
