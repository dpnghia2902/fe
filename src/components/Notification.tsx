import { useState } from 'react';
import { Bell, X, Settings, Check, MessageCircle, UserPlus, Heart, ShoppingCart, Clock } from 'lucide-react';
import './Notifications.css';

interface Notification {
  id: string;
  type: 'message' | 'friend' | 'like' | 'order' | 'system';
  avatar: string;
  title: string;
  description: string;
  time: string;
  isRead: boolean;
  link: string;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'message',
    avatar: 'https://i.pravatar.cc/150?img=1',
    title: 'Minh Tuấn',
    description: 'đã gửi tin nhắn cho bạn',
    time: '5 phút trước',
    isRead: false,
    link: '/messages/1'
  },
  {
    id: '2',
    type: 'order',
    avatar: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=150',
    title: 'Đơn hàng #12345',
    description: 'đã được hoàn thành và đang trên đường giao',
    time: '1 giờ trước',
    isRead: false,
    link: '/orders/12345'
  },
  {
    id: '3',
    type: 'friend',
    avatar: 'https://i.pravatar.cc/150?img=5',
    title: 'Lan Anh',
    description: 'đã chấp nhận lời mời kết bạn của bạn',
    time: '2 giờ trước',
    isRead: false,
    link: '/profile/lananh'
  },
  {
    id: '4',
    type: 'like',
    avatar: 'https://i.pravatar.cc/150?img=8',
    title: 'Hải Đăng',
    description: 'đã thích đánh giá của bạn',
    time: '5 giờ trước',
    isRead: true,
    link: '/reviews/1'
  },
  {
    id: '5',
    type: 'system',
    avatar: 'https://via.placeholder.com/150/00BFA6/ffffff?text=S',
    title: 'Khuyến mãi đặc biệt',
    description: 'Giảm 30% cho dịch vụ dọn dẹp nhà cửa trong tuần này',
    time: '1 ngày trước',
    isRead: true,
    link: '/promotions'
  },
  {
    id: '6',
    type: 'message',
    avatar: 'https://i.pravatar.cc/150?img=12',
    title: 'Thu Hà',
    description: 'đã trả lời bình luận của bạn',
    time: '2 ngày trước',
    isRead: true,
    link: '/comments/1'
  }
];

const getIcon = (type: string) => {
  switch (type) {
    case 'message':
      return <MessageCircle className="notification-type-icon" />;
    case 'friend':
      return <UserPlus className="notification-type-icon" />;
    case 'like':
      return <Heart className="notification-type-icon" />;
    case 'order':
      return <ShoppingCart className="notification-type-icon" />;
    default:
      return <Bell className="notification-type-icon" />;
  }
};

export default function Notifications() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [activeTab, setActiveTab] = useState<'all' | 'unread'>('all');

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const deleteNotification = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const filteredNotifications = activeTab === 'unread' 
    ? notifications.filter(n => !n.isRead)
    : notifications;

  return (
    <div className="notifications-wrapper">
      {/* ✅ Button với chữ "Thông Báo" */}
      <button 
        className="nav-item notification-button"
        onClick={() => setIsOpen(!isOpen)}
      >
        Thông Báo
        {unreadCount > 0 && (
          <span className="notification-badge">{unreadCount}</span>
        )}
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <>
          <div className="notification-overlay" onClick={() => setIsOpen(false)} />
          <div className="notification-dropdown">
            {/* Header */}
            <div className="notification-header">
              <div className="header-left">
                <h2 className="notification-title">Thông báo</h2>
                {unreadCount > 0 && (
                  <span className="unread-count-badge">{unreadCount}</span>
                )}
              </div>
              <button className="settings-btn" title="Cài đặt thông báo">
                <Settings className="settings-icon" />
              </button>
            </div>

            {/* Tabs */}
            <div className="notification-tabs">
              <button
                className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
                onClick={() => setActiveTab('all')}
              >
                Tất cả
              </button>
              <button
                className={`tab-btn ${activeTab === 'unread' ? 'active' : ''}`}
                onClick={() => setActiveTab('unread')}
              >
                Chưa đọc
              </button>
              {unreadCount > 0 && (
                <button className="mark-all-read-btn" onClick={markAllAsRead}>
                  <Check className="check-icon" />
                  Đánh dấu tất cả đã đọc
                </button>
              )}
            </div>

            {/* Notifications List */}
            <div className="notifications-list">
              {filteredNotifications.length === 0 ? (
                <div className="empty-state">
                  <Bell className="empty-icon" />
                  <p className="empty-text">Không có thông báo mới</p>
                </div>
              ) : (
                filteredNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`notification-item ${!notification.isRead ? 'unread' : ''}`}
                    onClick={() => {
                      markAsRead(notification.id);
                      setIsOpen(false);
                    }}
                  >
                    <div className="notification-avatar-wrapper">
                      <img 
                        src={notification.avatar} 
                        alt={notification.title}
                        className="notification-avatar"
                      />
                      <div className={`notification-icon-badge ${notification.type}`}>
                        {getIcon(notification.type)}
                      </div>
                    </div>

                    <div className="notification-content">
                      <div className="notification-text">
                        <span className="notification-name">{notification.title}</span>
                        {' '}
                        <span className="notification-desc">{notification.description}</span>
                      </div>
                      <div className="notification-meta">
                        <Clock className="time-icon" />
                        <span className="notification-time">{notification.time}</span>
                      </div>
                    </div>

                    <div className="notification-actions">
                      {!notification.isRead && (
                        <div className="unread-dot" title="Chưa đọc" />
                      )}
                      <button
                        className="delete-btn"
                        onClick={(e) => deleteNotification(notification.id, e)}
                        title="Xóa thông báo"
                      >
                        <X className="delete-icon" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {notifications.length > 0 && (
              <div className="notification-footer">
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
