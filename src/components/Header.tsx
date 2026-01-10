import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "./Header.css";

export default function Header() {
  const navigate = useNavigate();
  const { isLoggedIn, logout, login } = useAuth(); // Thêm login
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleLogin = () => {
    navigate("/login");
  };

  const handleRegister = () => {
    navigate("/register");
  };

  const handleLogout = () => {
    logout();
    setShowProfileMenu(false);
    alert("Đã đăng xuất thành công!");
    navigate("/");
  };

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setShowProfileMenu(false);
  };

  // BUTTON TEST - Xóa sau khi có API
  const handleTestToggle = () => {
    if (isLoggedIn) {
      logout();
      alert("Test: Đã logout!");
    } else {
      login({ email: 'test@gmail.com', name: 'Test User' });
      alert("Test: Đã login!");
    }
  };

  return (
    <header className="header">
      <div className="header-container">
        <h2 className="logo" onClick={() => navigate("/")}>
          Handy GO
        </h2>

        <nav className="header-nav">
          {/* BUTTON TEST - Thêm vào đây */}
          <button 
            onClick={handleTestToggle}
            style={{
              padding: '8px 16px',
              background: isLoggedIn ? '#ef4444' : '#10b981',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '14px',
              marginRight: '16px'
            }}
          >
            {isLoggedIn ? '🔓 Test Logout' : '🔐 Test Login'}
          </button>

          {!isLoggedIn ? (
            // Chưa đăng nhập - hiển thị nút Login và Register
            <div className="auth-buttons">
              <button onClick={handleLogin} className="btn-login">
                Đăng Nhập
              </button>
              <button onClick={handleRegister} className="btn-register">
                Đăng Ký
              </button>
            </div>
          ) : (
            // Đã đăng nhập - hiển thị menu navigation
            <div className="nav-menu">
              <button
                onClick={() => handleNavigation("/")}
                className="nav-item"
              >
                Trang Chủ
              </button>
              <button
                onClick={() => handleNavigation("/my-jobs")}
                className="nav-item"
              >
                Công việc của tôi
              </button>
              <button
                onClick={() => handleNavigation("/notifications")}
                className="nav-item notification-item"
              >
                Thông Báo
                <span className="notification-badge">3</span>
              </button>

              {/* Profile Dropdown */}
              <div className="profile-dropdown">
                <button
                  onClick={toggleProfileMenu}
                  className="nav-item profile-button"
                >
                  Hồ sơ
                  <svg
                    className={`dropdown-icon ${showProfileMenu ? "open" : ""}`}
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                  >
                    <path
                      d="M2 4L6 8L10 4"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>

                {showProfileMenu && (
                  <div className="dropdown-menu">
                    <button
                      onClick={() => handleNavigation("/profile")}
                      className="dropdown-item"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M8 8C10.21 8 12 6.21 12 4C12 1.79 10.21 0 8 0C5.79 0 4 1.79 4 4C4 6.21 5.79 8 8 8ZM8 10C5.33 10 0 11.34 0 14V16H16V14C16 11.34 10.67 10 8 10Z"
                          fill="currentColor"
                        />
                      </svg>
                      Xem thông tin
                    </button>
                    <button onClick={handleLogout} className="dropdown-item logout">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M6 14H3C2.73478 14 2.48043 13.8946 2.29289 13.7071C2.10536 13.5196 2 13.2652 2 13V3C2 2.73478 2.10536 2.48043 2.29289 2.29289C2.48043 2.10536 2.73478 2 3 2H6M11 11L14 8L11 5M14 8H6"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Đăng xuất
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
