import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import type { UserRole } from "../contexts/AuthContext";
import Notifications from "./Notification";
import "./Header.css";

export default function Header() {
  const navigate = useNavigate();
  const { isLoggedIn, user, logout, login } = useAuth();
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

  // ✅ TEST - Login/Logout
  const handleTestToggle = () => {
    if (isLoggedIn) {
      logout();
      alert("Test: Đã logout!");
    } else {
      login({ 
        email: 'test@gmail.com', 
        name: 'Test User',
        role: 'customer'
      });
      alert("Test: Đã login as Customer!");
    }
  };

  // ✅ TEST - Toggle Role (Customer ⇄ Worker)
  const handleRoleToggle = () => {
    if (user) {
      const newRole: UserRole = user.role === 'customer' ? 'worker' : 'customer';
      login({ ...user, role: newRole });
      
      if (newRole === 'worker') {
        navigate('/worker-dashboard');
        alert("✅ Đã chuyển sang Worker mode!");
      } else {
        navigate('/');
        alert("✅ Đã chuyển sang Customer mode!");
      }
    }
  };

  // ✅ TEST - Login as Worker
  const handleLoginAsWorker = () => {
    login({
      email: 'worker@gmail.com',
      name: 'Worker Test',
      role: 'worker'
    });
    navigate('/worker-dashboard');
    alert("✅ Đã login as Worker!");
  };

  return (
    <header className="header">
      <div className="header-container">
        <h2 className="logo" onClick={() => navigate(user?.role === 'worker' ? '/worker-dashboard' : '/')}>
          Handy GO
        </h2>

        <nav className="header-nav">
          {/* ✅ TEST BUTTONS - Xóa sau khi dev xong */}
          <div className="test-buttons-group">
            <button 
              onClick={handleTestToggle}
              className={`test-btn ${isLoggedIn ? 'logout' : 'login'}`}
            >
              {isLoggedIn ? '🔓 Logout' : '🔐 Login'}
            </button>

            {isLoggedIn && (
              <button 
                onClick={handleRoleToggle}
                className={`test-btn ${user?.role === 'customer' ? 'to-worker' : 'to-customer'}`}
              >
                {user?.role === 'customer' ? '👷 → Worker' : '👤 → Customer'}
              </button>
            )}

            {!isLoggedIn && (
              <button 
                onClick={handleLoginAsWorker}
                className="test-btn login-worker"
              >
                👷 Login Worker
              </button>
            )}
          </div>

          {!isLoggedIn ? (
            // ✅ Chưa đăng nhập
            <div className="auth-buttons">
              <button onClick={handleLogin} className="btn-login">
                Đăng Nhập
              </button>
              <button onClick={handleRegister} className="btn-register">
                Đăng Ký
              </button>
            </div>
          ) : user?.role === 'worker' ? (
            // ✅ Menu cho WORKER
            <div className="nav-menu">
              <button
                onClick={() => handleNavigation('/worker-dashboard')}
                className="nav-item"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="nav-icon">
                  <path d="M2 6L8 2L14 6V13C14 13.5304 13.7893 14.0391 13.4142 14.4142C13.0391 14.7893 12.5304 15 12 15H4C3.46957 15 2.96086 14.7893 2.58579 14.4142C2.21071 14.0391 2 13.5304 2 13V6Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Bảng điều khiển
              </button>

              <button
                onClick={() => handleNavigation('/worker/jobs')}
                className="nav-item"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="nav-icon">
                  <path d="M14 2H10C10 1.46957 9.78929 0.960859 9.41421 0.585786C9.03914 0.210714 8.53043 0 8 0C7.46957 0 6.96086 0.210714 6.58579 0.585786C6.21071 0.960859 6 1.46957 6 2H2C1.46957 2 0.960859 2.21071 0.585786 2.58579C0.210714 2.96086 0 3.46957 0 4V14C0 14.5304 0.210714 15.0391 0.585786 15.4142C0.960859 15.7893 1.46957 16 2 16H14C14.5304 16 15.0391 15.7893 15.4142 15.4142C15.7893 15.0391 16 14.5304 16 14V4C16 3.46957 15.7893 2.96086 15.4142 2.58579C15.0391 2.21071 14.5304 2 14 2ZM8 1C8.26522 1 8.51957 1.10536 8.70711 1.29289C8.89464 1.48043 9 1.73478 9 2C9 2.26522 8.89464 2.51957 8.70711 2.70711C8.51957 2.89464 8.26522 3 8 3C7.73478 3 7.48043 2.89464 7.29289 2.70711C7.10536 2.51957 7 2.26522 7 2C7 1.73478 7.10536 1.48043 7.29289 1.29289C7.48043 1.10536 7.73478 1 8 1Z" fill="currentColor"/>
                </svg>
                Công việc 
              </button>

                            <button
                onClick={() => handleNavigation('/worker/current')}
                className="nav-item"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="nav-icon">
                  <path d="M14 2H10C10 1.46957 9.78929 0.960859 9.41421 0.585786C9.03914 0.210714 8.53043 0 8 0C7.46957 0 6.96086 0.210714 6.58579 0.585786C6.21071 0.960859 6 1.46957 6 2H2C1.46957 2 0.960859 2.21071 0.585786 2.58579C0.210714 2.96086 0 3.46957 0 4V14C0 14.5304 0.210714 15.0391 0.585786 15.4142C0.960859 15.7893 1.46957 16 2 16H14C14.5304 16 15.0391 15.7893 15.4142 15.4142C15.7893 15.0391 16 14.5304 16 14V4C16 3.46957 15.7893 2.96086 15.4142 2.58579C15.0391 2.21071 14.5304 2 14 2ZM8 1C8.26522 1 8.51957 1.10536 8.70711 1.29289C8.89464 1.48043 9 1.73478 9 2C9 2.26522 8.89464 2.51957 8.70711 2.70711C8.51957 2.89464 8.26522 3 8 3C7.73478 3 7.48043 2.89464 7.29289 2.70711C7.10536 2.51957 7 2.26522 7 2C7 1.73478 7.10536 1.48043 7.29289 1.29289C7.48043 1.10536 7.73478 1 8 1Z" fill="currentColor"/>
                </svg>
                Hiện tại
              </button>

              <button
                onClick={() => handleNavigation('/worker/earnings')}
                className="nav-item"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="nav-icon">
                  <path d="M8 0C6.41775 0 4.87103 0.469192 3.55544 1.34824C2.23985 2.22729 1.21447 3.47672 0.608967 4.93853C0.00346629 6.40034 -0.15496 8.00887 0.153721 9.56072C0.462403 11.1126 1.22433 12.538 2.34315 13.6569C3.46197 14.7757 4.88743 15.5376 6.43928 15.8463C7.99113 16.155 9.59966 15.9965 11.0615 15.391C12.5233 14.7855 13.7727 13.7602 14.6518 12.4446C15.5308 11.129 16 9.58225 16 8C16 5.87827 15.1571 3.84344 13.6569 2.34315C12.1566 0.842855 10.1217 0 8 0ZM8 14C6.81332 14 5.65328 13.6481 4.66658 12.9888C3.67989 12.3295 2.91085 11.3925 2.45673 10.2961C2.0026 9.19974 1.88378 7.99334 2.11529 6.82946C2.3468 5.66557 2.91825 4.59647 3.75736 3.75736C4.59648 2.91824 5.66558 2.3468 6.82946 2.11529C7.99335 1.88378 9.19975 2.0026 10.2961 2.45672C11.3925 2.91085 12.3295 3.67988 12.9888 4.66658C13.6481 5.65327 14 6.81331 14 8C14 9.5913 13.3679 11.1174 12.2426 12.2426C11.1174 13.3679 9.5913 14 8 14Z" fill="currentColor"/>
                  <path d="M8 4C7.73478 4 7.48043 4.10536 7.29289 4.29289C7.10536 4.48043 7 4.73478 7 5V8C7 8.26522 7.10536 8.51957 7.29289 8.70711C7.48043 8.89464 7.73478 9 8 9C8.26522 9 8.51957 8.89464 8.70711 8.70711C8.89464 8.51957 9 8.26522 9 8V5C9 4.73478 8.89464 4.48043 8.70711 4.29289C8.51957 4.10536 8.26522 4 8 4Z" fill="currentColor"/>
                  <circle cx="8" cy="11" r="1" fill="currentColor"/>
                </svg>
                Thu nhập
              </button>

              <Notifications />

              <div className="profile-dropdown">
                <button
                  onClick={toggleProfileMenu}
                  className="nav-item profile-button"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="nav-icon">
                    <path d="M8 8C10.21 8 12 6.21 12 4C12 1.79 10.21 0 8 0C5.79 0 4 1.79 4 4C4 6.21 5.79 8 8 8ZM8 10C5.33 10 0 11.34 0 14V16H16V14C16 11.34 10.67 10 8 10Z" fill="currentColor"/>
                  </svg>
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
                      onClick={() => handleNavigation("/worker/profile")}
                      className="dropdown-item"
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M8 8C10.21 8 12 6.21 12 4C12 1.79 10.21 0 8 0C5.79 0 4 1.79 4 4C4 6.21 5.79 8 8 8ZM8 10C5.33 10 0 11.34 0 14V16H16V14C16 11.34 10.67 10 8 10Z" fill="currentColor"/>
                      </svg>
                      Xem hồ sơ
                    </button>
                    <button
                      onClick={() => handleNavigation("/worker/settings")}
                      className="dropdown-item"
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M8 10C9.10457 10 10 9.10457 10 8C10 6.89543 9.10457 6 8 6C6.89543 6 6 6.89543 6 8C6 9.10457 6.89543 10 8 10Z" stroke="currentColor" strokeWidth="2"/>
                        <path d="M14 8C14 8.93 14.25 9.8 14.68 10.56L13.29 11.95C13.16 12.08 13.11 12.28 13.17 12.46L13.92 14.73C13.98 14.91 14.15 15.03 14.34 15.03L16.82 15C16.93 14.36 17 13.7 17 13H14V8Z" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                      Cài đặt
                    </button>
                    <button onClick={handleLogout} className="dropdown-item logout">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M6 14H3C2.73478 14 2.48043 13.8946 2.29289 13.7071C2.10536 13.5196 2 13.2652 2 13V3C2 2.73478 2.10536 2.48043 2.29289 2.29289C2.48043 2.10536 2.73478 2 3 2H6M11 11L14 8L11 5M14 8H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Đăng xuất
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            // ✅ Menu cho CUSTOMER
            <div className="nav-menu">
              <button
                onClick={() => handleNavigation('/')}
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

              <Notifications />

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
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M8 8C10.21 8 12 6.21 12 4C12 1.79 10.21 0 8 0C5.79 0 4 1.79 4 4C4 6.21 5.79 8 8 8ZM8 10C5.33 10 0 11.34 0 14V16H16V14C16 11.34 10.67 10 8 10Z" fill="currentColor"/>
                      </svg>
                      Xem thông tin
                    </button>
                    <button onClick={handleLogout} className="dropdown-item logout">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M6 14H3C2.73478 14 2.48043 13.8946 2.29289 13.7071C2.10536 13.5196 2 13.2652 2 13V3C2 2.73478 2.10536 2.48043 2.29289 2.29289C2.48043 2.10536 2.73478 2 3 2H6M11 11L14 8L11 5M14 8H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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
