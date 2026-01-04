import { useState } from "react";
import Container from "../../components/Container";
import "../Login/Login.css";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const validateEmail = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setError("Email là bắt buộc");
      return;
    }

    if (!validateEmail(email)) {
      setError("Email không hợp lệ");
      return;
    }

    setError("");
    setIsSubmitting(true);

    setTimeout(() => {
      console.log("Reset password:", email);
      setSuccess(true);
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="auth-layout">
      <div className="auth-image" />

      <div className="auth-wrapper">
        <Container maxWidth="450px" padding="0">
          <div className="auth-form-container">
            <div className="auth-header">
              <h1>Quên mật khẩu</h1>
              <p>Nhập email để nhận link đặt lại mật khẩu</p>
            </div>

            {success ? (
              <p style={{ color: "#38a169", textAlign: "center" }}>
                ✅ Link đặt lại mật khẩu đã được gửi!
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="auth-form">
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={error ? "input-error" : ""}
                    placeholder="example@email.com"
                  />
                  {error && (
                    <span className="error-message">{error}</span>
                  )}
                </div>

                <button
                  type="submit"
                  className="submit-button"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Đang gửi..." : "Gửi yêu cầu"}
                </button>
              </form>
            )}

            <div className="auth-toggle">
              <button
                className="toggle-button"
                onClick={() => window.history.back()}
              >
                ← Quay lại đăng nhập
              </button>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
