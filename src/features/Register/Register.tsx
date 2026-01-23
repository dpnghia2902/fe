import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "../../components/Container";
import "./Register.css";

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
  address?: string;
  city?: string;
  district?: string;
  idCard?: string;
  idCardFront?: string;
  idCardBack?: string;
  avatar?: string;
}

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  address: string;
  city: string;
  district: string;
  idCard: string;
  idCardFront: File | null;
  idCardBack: File | null;
  avatar: File | null;
}

export default function Register() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    address: "",
    city: "",
    district: "",
    idCard: "",
    idCardFront: null,
    idCardBack: null,
    avatar: null,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const serviceOptions = [
    "Dọn dẹp nhà cửa",
    "Sửa chữa điện nước", 
    "Lắp đặt điều hòa",
    "Vệ sinh máy lạnh",
    "Sơn sửa nhà",
    "Giúp việc theo giờ",
  ];

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    return /^0\d{9}$/.test(phone);
  };

  const validatePassword = (password: string): boolean => {
    return password.length >= 6;
  };

  const validateStep1 = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.fullName.trim() || formData.fullName.length < 2) {
      newErrors.fullName = "Họ tên phải có ít nhất 2 ký tự";
    }
    if (!formData.email.trim() || !validateEmail(formData.email)) {
      newErrors.email = "Email không hợp lệ";
    }
    if (!formData.phone.trim() || !validatePhone(formData.phone)) {
      newErrors.phone = "Số điện thoại không hợp lệ (VD: 0912345678)";
    }
    if (!formData.password || !validatePassword(formData.password)) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
    }
    if (formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Mật khẩu không khớp";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.address.trim() || formData.address.length < 5) {
      newErrors.address = "Địa chỉ phải có ít nhất 5 ký tự";
    }
    if (!formData.city) {
      newErrors.city = "Vui lòng chọn thành phố";
    }
    if (!formData.district.trim() || formData.district.length < 2) {
      newErrors.district = "Quận/huyện phải có ít nhất 2 ký tự";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.idCard.trim() || formData.idCard.length < 9) {
      newErrors.idCard = "Số CMND/CCCD không hợp lệ";
    }
    if (!formData.idCardFront) {
      newErrors.idCardFront = "Vui lòng tải ảnh mặt trước";
    }
    if (!formData.idCardBack) {
      newErrors.idCardBack = "Vui lòng tải ảnh mặt sau";
    }
    if (!formData.avatar) {
      newErrors.avatar = "Vui lòng tải ảnh đại diện";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name as keyof FormErrors]) {
      setErrors({ ...errors, [name]: undefined });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof FormData) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, [field]: e.target.files[0] });
      if (errors[field as keyof FormErrors]) {
        setErrors({ ...errors, [field]: undefined });
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    let isValid = false;
    
    if (step === 1) {
      isValid = validateStep1();
    } else if (step === 2) {
      isValid = validateStep2();
    } else if (step === 3) {
      isValid = validateStep3();
    }
    
    if (!isValid) {
      return;
    }
    
    if (step < 3) {
      setStep(step + 1);
    } else {
      setIsSubmitting(true);
      setTimeout(() => {
        console.log("Đăng ký:", formData);
        alert(`Đăng ký thành công! Chào mừng ${formData.fullName}`);
        navigate("/login");
      }, 1500);
    }
  };

  const goBack = () => setStep(step - 1);

  return (
    <div className="register-wrapper">
      <Container maxWidth="800px" padding="0">
        <div className="register-container">
          <div className="register-header">
            <button onClick={() => navigate("/login")} className="back-btn">
              ← Quay lại
            </button>
            <h1 className="register-title">Đăng Ký Tài Khoản</h1>
            <p className="register-subtitle">Tạo tài khoản mới của bạn</p>
          </div>

          <div className="progress-steps">
            <div className={`step ${step >= 1 ? 'active' : ''}`}>
              <div className="step-number">1</div>
              <span className="step-label">Thông tin cá nhân</span>
            </div>
            <div className={`step ${step >= 2 ? 'active' : ''}`}>
              <div className="step-number">2</div>
              <span className="step-label">Địa chỉ & Dịch vụ</span>
            </div>
            <div className={`step ${step >= 3 ? 'active' : ''}`}>
              <div className="step-number">3</div>
              <span className="step-label">Xác thực danh tính</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="register-form">
            {/* Step 1: Personal Info */}
            {step === 1 && (
              <div className="form-step">
                <h2 className="step-title">Thông tin cá nhân</h2>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Họ và tên *</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className={errors.fullName ? "form-input error" : "form-input"}
                      placeholder="Nguyễn Văn A"
                    />
                    {errors.fullName && <span className="error-message">{errors.fullName}</span>}
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
                      className={errors.email ? "form-input error" : "form-input"}
                      placeholder="example@email.com"
                    />
                    {errors.email && <span className="error-message">{errors.email}</span>}
                  </div>
                  <div className="form-group">
                    <label className="form-label">Số điện thoại *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={errors.phone ? "form-input error" : "form-input"}
                      placeholder="0912345678"
                    />
                    {errors.phone && <span className="error-message">{errors.phone}</span>}
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
                      className={errors.password ? "form-input error" : "form-input"}
                      placeholder="••••••••"
                    />
                    {errors.password && <span className="error-message">{errors.password}</span>}
                  </div>
                  <div className="form-group">
                    <label className="form-label">Xác nhận mật khẩu *</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={errors.confirmPassword ? "form-input error" : "form-input"}
                      placeholder="••••••••"
                    />
                    {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Address & Services */}
            {step === 2 && (
              <div className="form-step">
                <h2 className="step-title">Địa chỉ & Sở thích dịch vụ</h2>
                <div className="form-group">
                  <label className="form-label">Địa chỉ nhà *</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className={errors.address ? "form-input error" : "form-input"}
                    placeholder="Số nhà, tên đường"
                  />
                  {errors.address && <span className="error-message">{errors.address}</span>}
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Thành phố *</label>
                    <select
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className={errors.city ? "form-input error" : "form-input"}
                    >
                      <option value="">Chọn thành phố</option>
                      <option value="hanoi">Hà Nội</option>
                      <option value="hcm">TP. Hồ Chí Minh</option>
                      <option value="danang">Đà Nẵng</option>
                    </select>
                    {errors.city && <span className="error-message">{errors.city}</span>}
                  </div>
                  <div className="form-group">
                    <label className="form-label">Quận/Huyện *</label>
                    <input
                      type="text"
                      name="district"
                      value={formData.district}
                      onChange={handleChange}
                      className={errors.district ? "form-input error" : "form-input"}
                      placeholder="VD: Cầu Giấy"
                    />
                    {errors.district && <span className="error-message">{errors.district}</span>}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Dịch vụ bạn quan tâm (tùy chọn)</label>
                  <div className="service-grid">
                    {serviceOptions.map((service) => (
                      <button
                        key={service}
                        type="button"
                        className="service-tag"
                        onClick={() => {}}
                      >
                        {service}
                      </button>
                    ))}
                  </div>
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
                    className={errors.idCard ? "form-input error" : "form-input"}
                    placeholder="001234567890"
                  />
                  {errors.idCard && <span className="error-message">{errors.idCard}</span>}
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Ảnh CMND/CCCD mặt trước *</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, 'idCardFront')}
                      className="form-input-file"
                    />
                    {errors.idCardFront && <span className="error-message">{errors.idCardFront}</span>}
                  </div>
                  <div className="form-group">
                    <label className="form-label">Ảnh CMND/CCCD mặt sau *</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, 'idCardBack')}
                      className="form-input-file"
                    />
                    {errors.idCardBack && <span className="error-message">{errors.idCardBack}</span>}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Ảnh đại diện *</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, 'avatar')}
                    className="form-input-file"
                  />
                  {errors.avatar && <span className="error-message">{errors.avatar}</span>}
                </div>

                <div className="info-box">
                  <p>📝 <strong>Lưu ý:</strong> Thông tin của bạn sẽ được bảo mật và chỉ sử dụng cho mục đích xác minh tài khoản.</p>
                </div>
              </div>
            )}

            <div className="form-actions">
              {step > 1 && (
                <button type="button" onClick={goBack} className="btn-back">
                  ← Quay lại
                </button>
              )}
              <button 
                type="submit" 
                className="btn-next"
                disabled={isSubmitting}
              >
                {isSubmitting 
                  ? "Đang xử lý..." 
                  : step < 3 ? 'Tiếp theo →' : 'Hoàn tất đăng ký'
                }
              </button>
            </div>
          </form>
        </div>
      </Container>
    </div>
  );
}
