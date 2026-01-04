import { useState } from "react";
import Container from "../../components/Container";
import "./Login.css";

interface FormErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
  name?: string;
}

interface FormData {
  email: string;
  password: string;
  confirmPassword?: string;
  name?: string;
}

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string): boolean => {
    return password.length >= 6;
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.email) {
      newErrors.email = "Email là bắt buộc";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Email không hợp lệ";
    }

    if (!formData.password) {
      newErrors.password = "Mật khẩu là bắt buộc";
    } else if (!validatePassword(formData.password)) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
    }

    if (!isLogin) {
      if (!formData.name) {
        newErrors.name = "Tên là bắt buộc";
      } else if (formData.name.length < 2) {
        newErrors.name = "Tên phải có ít nhất 2 ký tự";
      }

      if (!formData.confirmPassword) {
        newErrors.confirmPassword = "Vui lòng xác nhận mật khẩu";
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Mật khẩu không khớp";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    setTimeout(() => {
      console.log(isLogin ? "Đăng nhập" : "Đăng ký", formData);
      alert(
        isLogin
          ? `Đăng nhập thành công với email: ${formData.email}`
          : `Đăng ký thành công! Chào mừng ${formData.name}`
      );
      setIsSubmitting(false);
    }, 1500);
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
    });
    setErrors({});
  };

  return (
    <div className="auth-wrapper">
      <Container maxWidth="450px" padding="0">
        <div className="auth-form-container">
          <div className="auth-header">
            <h1>{isLogin ? "Đăng Nhập" : "Đăng Ký"}</h1>
            <p>
              {isLogin
                ? "Chào mừng bạn quay trở lại!"
                : "Tạo tài khoản mới của bạn"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form" noValidate>
            {!isLogin && (
              <div className="form-group">
                <label htmlFor="name">Tên</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={errors.name ? "input-error" : ""}
                  placeholder="Nhập tên của bạn"
                />
                {errors.name && (
                  <span className="error-message">{errors.name}</span>
                )}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={errors.email ? "input-error" : ""}
                placeholder="example@email.com"
              />
              {errors.email && (
                <span className="error-message">{errors.email}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="password">Mật khẩu</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={errors.password ? "input-error" : ""}
                placeholder="Nhập mật khẩu"
              />
              {errors.password && (
                <span className="error-message">{errors.password}</span>
              )}
            </div>

            {!isLogin && (
              <div className="form-group">
                <label htmlFor="confirmPassword">Xác nhận mật khẩu</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={errors.confirmPassword ? "input-error" : ""}
                  placeholder="Nhập lại mật khẩu"
                />
                {errors.confirmPassword && (
                  <span className="error-message">{errors.confirmPassword}</span>
                )}
              </div>
            )}

            {isLogin && (
              <div className="forgot-password">
                <a href="forget-password">Quên mật khẩu?</a>
              </div>
            )}

            <button
              type="submit"
              className="submit-button"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Đang xử lý..."
                : isLogin
                ? "Đăng Nhập"
                : "Đăng Ký"}
            </button>
          </form>

          <div className="auth-toggle">
            <p>
              {isLogin ? "Chưa có tài khoản?" : "Đã có tài khoản?"}{" "}
              <button onClick={toggleMode} className="toggle-button">
                {isLogin ? "Đăng ký ngay" : "Đăng nhập"}
              </button>
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
