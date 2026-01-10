import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Package, Wrench, GraduationCap, Car, ShoppingBag, MapPin, Calendar as CalendarIcon, Clock, DollarSign, Upload, ChevronRight, Check } from 'lucide-react';
import "./CreateTask.css";

// Simple date formatter
const formatDate = (date: Date) => {
  const months = ['Th1', 'Th2', 'Th3', 'Th4', 'Th5', 'Th6', 'Th7', 'Th8', 'Th9', 'Th10', 'Th11', 'Th12'];
  const month = months[date.getMonth()];
  const day = date.getDate().toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day} ${month}, ${year}`;
};

const services = [
  { icon: Home, title: 'Dọn dẹp', color: 'blue' },
  { icon: Package, title: 'Giao hàng', color: 'purple' },
  { icon: Wrench, title: 'Sửa chữa', color: 'orange' },
  { icon: GraduationCap, title: 'Dạy kèm', color: 'green' },
  { icon: Car, title: 'Vận chuyển', color: 'red' },
  { icon: ShoppingBag, title: 'Mua sắm', color: 'pink' },
];

export default function CreateTask() {
  const navigate = useNavigate(); // Sử dụng useNavigate
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedService, setSelectedService] = useState('Cần giúp đỡ');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    address: '',
    budget: '',
    date: '',
    time: '',
  });
  const [files, setFiles] = useState<File[]>([]);

  const steps = [
    { number: 1, title: 'Chi tiết', description: 'Thêm thông tin yêu cầu' },
    { number: 2, title: 'Lịch trình', description: 'Chọn ngày và giờ' },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleSubmit = () => {
    // Validate form data (optional)
    console.log('Form Data:', formData);
    console.log('Files:', files);
    
    // Navigate to matching page
    navigate('/matching');
  };

  return (
    <div className="create-task-container">
      {/* Progress Steps */}
      <div className="progress-steps">
        <div className="steps-wrapper">
          {steps.map((step, index) => (
            <div key={step.number} className="step-item-wrapper">
              <div className="step-item">
                <div className={`step-circle ${step.number <= currentStep ? 'active' : ''}`}>
                  {step.number < currentStep ? (
                    <Check className="step-check-icon" />
                  ) : (
                    <span>{step.number}</span>
                  )}
                </div>
                <div className="step-info">
                  <p className={`step-title ${step.number <= currentStep ? 'active' : ''}`}>
                    {step.title}
                  </p>
                  <p className="step-description">{step.description}</p>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className={`step-connector ${step.number < currentStep ? 'active' : ''}`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step 1: Task Details */}
      {currentStep === 1 && (
        <div className="task-card">
          <div className="card-header">
            <h2 className="card-title">Tạo yêu cầu hỗ trợ</h2>
            <p className="card-subtitle">Cho chúng tôi biết về những gì bạn cần giúp đỡ</p>
          </div>

          <div className="form-content">
            {/* Title */}
            <div className="form-group">
              <label className="form-label">Tiêu đề yêu cầu</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Ví dụ: Cần người dọn dẹp nhà cửa"
                className="form-input"
              />
            </div>

            {/* Description */}
            <div className="form-group">
              <label className="form-label">Mô tả công việc</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Mô tả chi tiết những gì bạn cần hỗ trợ..."
                className="form-textarea"
                rows={5}
              />
            </div>

            {/* Address */}
            <div className="form-group">
              <label className="form-label">Địa chỉ</label>
              <div className="input-with-icon">
                <MapPin className="input-icon" />
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Nhập địa chỉ của bạn"
                  className="form-input with-icon"
                />
              </div>
              <div className="map-placeholder">
                <MapPin className="map-icon" />
                <p>Xem bản đồ</p>
              </div>
            </div>

            {/* Budget */}
            <div className="form-group">
              <label className="form-label">Ngân sách dự kiến</label>
              <div className="input-with-icon">
                <DollarSign className="input-icon" />
                <input
                  type="number"
                  name="budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                  placeholder="Nhập ngân sách dự kiến"
                  className="form-input with-icon"
                />
              </div>
            </div>

            {/* Photos */}
            <div className="form-group">
              <label className="form-label">Upload ảnh minh họa (Tùy chọn)</label>
              <label className="file-upload">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="file-input"
                />
                <Upload className="upload-icon" />
                <p className="upload-text">Nhấp để tải lên hoặc kéo thả</p>
                <p className="upload-hint">PNG, JPG tối đa 10MB</p>
              </label>
              {files.length > 0 && (
                <div className="files-list">
                  {files.map((file, index) => (
                    <div key={index} className="file-item">
                      {file.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="card-footer">
            <button
              onClick={() => setCurrentStep(2)}
              className="btn-primary"
            >
              Tiếp tục
              <ChevronRight className="btn-icon" />
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Schedule */}
      {currentStep === 2 && (
        <div className="task-card">
          <div className="card-header">
            <h2 className="card-title">Thời gian mong muốn</h2>
            <p className="card-subtitle">Bạn cần hỗ trợ khi nào?</p>
          </div>

          <div className="schedule-grid">
            {/* Date */}
            <div className="schedule-section">
              <label className="form-label">Chọn ngày</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>

            {/* Time and Summary */}
            <div className="schedule-section">
              <div className="form-group">
                <label className="form-label">Chọn giờ</label>
                <select
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  className="form-select"
                >
                  <option value="">Chọn khung giờ</option>
                  <option value="09:00">9:00 Sáng</option>
                  <option value="10:00">10:00 Sáng</option>
                  <option value="11:00">11:00 Sáng</option>
                  <option value="14:00">2:00 Chiều</option>
                  <option value="15:00">3:00 Chiều</option>
                  <option value="16:00">4:00 Chiều</option>
                </select>
              </div>

              {/* Summary Card */}
              <div className="summary-card">
                <h3 className="summary-title">Tóm tắt yêu cầu</h3>
                <div className="summary-content">
                  <div className="summary-item">
                    <span className="summary-label">Loại:</span>
                    <span className="summary-badge">{selectedService}</span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">Ngày:</span>
                    <span>{formData.date || 'Chưa chọn'}</span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">Giờ:</span>
                    <span>{formData.time || 'Chưa chọn'}</span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">Ngân sách:</span>
                    <span>{formData.budget ? `${formData.budget}₫` : 'Chưa nhập'}</span>
                  </div>
                </div>
              </div>

              {/* Tip */}
              <div className="tip-box">
                <p>💡 Mẹo: Đăng bài sớm để được nhiều người làm việc phản hồi hơn!</p>
              </div>
            </div>
          </div>

          <div className="card-footer space-between">
            <button
              onClick={() => setCurrentStep(1)}
              className="btn-secondary"
            >
              Quay lại
            </button>
            <button
              onClick={handleSubmit}
              className="btn-primary"
            >
              Đăng bài
              <Check className="btn-icon" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
