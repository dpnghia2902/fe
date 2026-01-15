import { useState } from 'react';
import { MapPin, Phone, MessageCircle, User, Calendar, Clock, DollarSign, Navigation, MessageSquare, X } from 'lucide-react';
import './JobDetailModal.css';

interface JobDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  job: {
    id: number;
    service: string;
    customer: string;
    date: string;
    time: string;
    duration: string;
    location: string;
    distance: string;
    pay: number;
    description: string;
  };
  onAccept?: () => void;
}

export function JobDetailModal({ open, onOpenChange, job, onAccept }: JobDetailModalProps) {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showContactOptions, setShowContactOptions] = useState(false);

  if (!open) return null;

  const handleAccept = () => {
    setShowConfirmDialog(false);
    onOpenChange(false);
    if (onAccept) onAccept();
  };

  return (
    <>
      {/* Main Dialog */}
      <div className="modal-overlay" onClick={() => onOpenChange(false)}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <button className="modal-close" onClick={() => onOpenChange(false)}>
            <X className="w-5 h-5" />
          </button>

          <h2 className="modal-title">{job.service}</h2>

          <div className="modal-body">
            {/* Customer Info */}
            <div className="info-section">
              <h3>Thông tin khách hàng</h3>
              <div className="info-grid">
                <div className="info-item">
                  <User className="info-icon" />
                  <div>
                    <p className="info-label">Tên khách hàng</p>
                    <p className="info-value">{job.customer}</p>
                  </div>
                </div>
                <div className="info-item">
                  <MapPin className="info-icon" />
                  <div>
                    <p className="info-label">Địa chỉ</p>
                    <p className="info-value">{job.location}</p>
                    <p className="info-sub">Cách {job.distance} từ vị trí của bạn</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Job Details */}
            <div className="details-section">
              <h3>Chi tiết công việc</h3>
              <div className="details-grid">
                <div className="detail-card">
                  <Calendar className="detail-icon" />
                  <div>
                    <p className="detail-label">Ngày</p>
                    <p className="detail-value">{job.date}</p>
                  </div>
                </div>
                <div className="detail-card">
                  <Clock className="detail-icon" />
                  <div>
                    <p className="detail-label">Giờ</p>
                    <p className="detail-value">{job.time}</p>
                  </div>
                </div>
                <div className="detail-card">
                  <Clock className="detail-icon" />
                  <div>
                    <p className="detail-label">Thời lượng</p>
                    <p className="detail-value">{job.duration}</p>
                  </div>
                </div>
                <div className="detail-card payment">
                  <DollarSign className="detail-icon" />
                  <div>
                    <p className="detail-label">Thanh toán</p>
                    <p className="detail-value pay">{job.pay}.000₫</p>
                  </div>
                </div>
              </div>
              <div className="description-box">
                <p className="description-label">Mô tả công việc</p>
                <p className="description-text">{job.description}</p>
              </div>
            </div>

            {/* Contact Options */}
            <div className="contact-section">
              <button 
                onClick={() => setShowContactOptions(!showContactOptions)}
                className="btn-contact"
              >
                <Phone className="w-4 h-4" />
                Liên hệ khách hàng
              </button>
              
              {showContactOptions && (
                <div className="contact-options">
                  <p className="contact-label">Chọn phương thức liên hệ:</p>
                  <button className="contact-option primary">
                    <MessageCircle className="w-4 h-4" />
                    Chat trong ứng dụng
                  </button>
                  <button className="contact-option">
                    <Phone className="w-4 h-4" />
                    Gọi điện
                  </button>
                  <button className="contact-option">
                    <MessageSquare className="w-4 h-4" />
                    Nhắn Zalo
                  </button>
                </div>
              )}
            </div>

            {/* Action Button */}
            <button 
              onClick={() => setShowConfirmDialog(true)}
              className="btn-accept"
            >
              Nhận việc
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Dialog */}
      {showConfirmDialog && (
        <div className="modal-overlay" onClick={() => setShowConfirmDialog(false)}>
          <div className="modal-content small" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-title">Xác nhận nhận việc</h2>
            <p className="confirm-text">Bạn chắc chắn muốn nhận công việc này?</p>
            <div className="confirm-details">
              <div className="confirm-row">
                <span>Dịch vụ:</span>
                <span>{job.service}</span>
              </div>
              <div className="confirm-row">
                <span>Khách hàng:</span>
                <span>{job.customer}</span>
              </div>
              <div className="confirm-row">
                <span>Thời gian:</span>
                <span>{job.date} • {job.time}</span>
              </div>
              <div className="confirm-row">
                <span>Thanh toán:</span>
                <span className="pay">{job.pay}.000₫</span>
              </div>
            </div>
            <div className="confirm-actions">
              <button onClick={() => setShowConfirmDialog(false)} className="btn-cancel">
                Hủy
              </button>
              <button onClick={handleAccept} className="btn-confirm">
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
