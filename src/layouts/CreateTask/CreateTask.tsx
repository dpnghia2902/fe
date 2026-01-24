// CreateTask.tsx - ✅ SYNC TRACKING + SỐ NGƯỜI CẦN
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Home, Package, Wrench, GraduationCap, Car, ShoppingBag, 
  MapPin, Calendar as CalendarIcon, Clock, DollarSign, Upload, 
  ChevronRight, Check, AlertCircle, CheckCircle2, Users 
} from 'lucide-react';
import "./CreateTask.css";

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

interface FormData {
  title: string;
  description: string;
  address: string;
  budget: string;
  date: string;
  time: string;
  peopleNeeded: string; // ✅ THÊM SỐ NGƯỜI
}

export default function CreateTask() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedService, setSelectedService] = useState<string>('Cần giúp đỡ');
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    address: '',
    budget: '',
    date: '',
    time: '',
    peopleNeeded: '2', 
  });
  const [files, setFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [showSuccessPopup, setShowSuccessPopup] = useState<boolean>(false);
  const [redirectCountdown, setRedirectCountdown] = useState<number>(3);

  const steps = [
    { number: 1, title: 'Chi tiết', description: 'Thêm thông tin yêu cầu' },
    { number: 2, title: 'Lịch trình', description: 'Chọn ngày, giờ và số người' },
  ];

  // ✅ AUTO REDIRECT COUNTDOWN
  useEffect(() => {
    if (showSuccessPopup) {
      const timer = setInterval(() => {
        setRedirectCountdown(prev => {
          if (prev <= 1) {
            navigate('/');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [showSuccessPopup, redirectCountdown, navigate]);

  const validateStep1 = (): Record<string, string> => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) newErrors.title = 'Vui lòng nhập tiêu đề yêu cầu';
    if (!formData.description.trim()) newErrors.description = 'Vui lòng mô tả công việc';
    if (!formData.address.trim()) newErrors.address = 'Vui lòng nhập địa chỉ';
    if (!formData.budget || parseInt(formData.budget) <= 0) newErrors.budget = 'Vui lòng nhập ngân sách hợp lệ';
    
    return newErrors;
  };

  const validateStep2 = (): Record<string, string> => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.date) newErrors.date = 'Vui lòng chọn ngày';
    if (!formData.time) newErrors.time = 'Vui lòng chọn khung giờ';
    if (!formData.peopleNeeded || parseInt(formData.peopleNeeded) <= 0) newErrors.peopleNeeded = 'Vui lòng chọn số người cần';
    
    return newErrors;
  };

  const validateForm = (): boolean => {
    const step1Errors = validateStep1();
    const step2Errors = validateStep2();
    const allErrors = { ...step1Errors, ...step2Errors };
    setErrors(allErrors);
    return Object.keys(allErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value as keyof FormData }));
    setTouched(prev => ({ ...prev, [name]: true }));
    
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name as keyof typeof errors];
        return newErrors;
      });
    }
  };

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    
    const fieldErrors = field === 'date' || field === 'time' || field === 'peopleNeeded'
      ? validateStep2()
      : validateStep1();
    
    if (fieldErrors[field as keyof typeof fieldErrors]) {
      setErrors(prev => ({ ...prev, [field]: fieldErrors[field as keyof typeof fieldErrors]! }));
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleNextStep = () => {
    const step1Errors = validateStep1();
    setErrors(step1Errors);
    if (Object.keys(step1Errors).length === 0) {
      setCurrentStep(2);
    }
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log('✅ Form Data:', formData);
      console.log('✅ Files:', files);
      setShowSuccessPopup(true);
    }
  };

  const getErrorMessage = (field: string): string => {
    return touched[field as keyof typeof touched] && errors[field as keyof typeof errors] 
      ? errors[field as keyof typeof errors]! 
      : '';
  };

  if (showSuccessPopup) {
    return (
      <div className="success-popup-overlay">
        <div className="success-popup">
          <div className="success-icon">
            <CheckCircle2 size={64} />
          </div>
          <h2 className="success-title">Đăng bài thành công!</h2>
          <p className="success-message">
            Yêu cầu cần {formData.peopleNeeded} người đã được đăng. 
            Chúng tôi sẽ thông báo khi có người làm việc phản hồi.
          </p>
          <div className="success-countdown">
            Tự động chuyển về trang chủ trong <span>{redirectCountdown}s</span>
          </div>
        </div>
      </div>
    );
  }

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
              <label className="form-label">Tiêu đề yêu cầu <span className="required">*</span></label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                onBlur={() => handleBlur('title')}
                placeholder="Ví dụ: Cần 5 người hỗ trợ chuyển phòng"
                className={`form-input ${getErrorMessage('title') ? 'error' : ''}`}
              />
              {getErrorMessage('title') && (
                <div className="error-message">
                  <AlertCircle className="error-icon" size={16} />
                  <span>{getErrorMessage('title')}</span>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="form-group">
              <label className="form-label">Mô tả công việc <span className="required">*</span></label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                onBlur={() => handleBlur('description')}
                placeholder="Mô tả chi tiết những gì bạn cần hỗ trợ..."
                className={`form-textarea ${getErrorMessage('description') ? 'error' : ''}`}
                rows={5}
              />
              {getErrorMessage('description') && (
                <div className="error-message">
                  <AlertCircle className="error-icon" size={16} />
                  <span>{getErrorMessage('description')}</span>
                </div>
              )}
            </div>

            {/* Address */}
            <div className="form-group">
              <label className="form-label">Địa chỉ <span className="required">*</span></label>
              <div className="input-with-icon">
                <MapPin className="input-icon" />
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  onBlur={() => handleBlur('address')}
                  placeholder="Nhập địa chỉ của bạn"
                  className={`form-input with-icon ${getErrorMessage('address') ? 'error' : ''}`}
                />
              </div>
              {getErrorMessage('address') && (
                <div className="error-message">
                  <AlertCircle className="error-icon" size={16} />
                  <span>{getErrorMessage('address')}</span>
                </div>
              )}
              <div className="map-placeholder">
                <MapPin className="map-icon" />
                <p>Xem bản đồ</p>
              </div>
            </div>

            {/* Budget */}
            <div className="form-group">
              <label className="form-label">Ngân sách dự kiến <span className="required">*</span></label>
              <div className="input-with-icon">
                <DollarSign className="input-icon" />
                <input
                  type="number"
                  name="budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                  onBlur={() => handleBlur('budget')}
                  placeholder="Nhập ngân sách dự kiến"
                  min="1"
                  className={`form-input with-icon ${getErrorMessage('budget') ? 'error' : ''}`}
                />
              </div>
              {getErrorMessage('budget') && (
                <div className="error-message">
                  <AlertCircle className="error-icon" size={16} />
                  <span>{getErrorMessage('budget')}</span>
                </div>
              )}
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
              onClick={handleNextStep}
              className="btn-primary"
              disabled={false}
            >
              Tiếp tục
              <ChevronRight className="btn-icon" />
            </button>
          </div>
        </div>
      )}

      {/* ✅ STEP 2: SYNC TRACKING - THÊM SỐ NGƯỜI */}
      {currentStep === 2 && (
        <div className="task-card">
          <div className="card-header">
            <h2 className="card-title">Thời gian & Số người cần</h2>
            <p className="card-subtitle">Hoàn tất thông tin để đăng bài</p>
          </div>

          <div className="schedule-grid">
            {/* Date */}
            <div className="schedule-section">
              <label className="form-label">Chọn ngày <span className="required">*</span></label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                onBlur={() => handleBlur('date')}
                className={`form-input ${getErrorMessage('date') ? 'error' : ''}`}
              />
              {getErrorMessage('date') && (
                <div className="error-message">
                  <AlertCircle className="error-icon" size={16} />
                  <span>{getErrorMessage('date')}</span>
                </div>
              )}
            </div>

            {/* ✅ SỐ NGƯỜI CẦN - SYNC TRACKING */}
            <div className="schedule-section">
              <label className="form-label">Số người cần <span className="required">*</span></label>
              <div className="input-with-icon">
                <Users className="input-icon" size={20} />
                <select
                  name="peopleNeeded"
                  value={formData.peopleNeeded}
                  onChange={handleInputChange}
                  onBlur={() => handleBlur('peopleNeeded')}
                  className={`form-select ${getErrorMessage('peopleNeeded') ? 'error' : ''}`}
                >
                  <option value="">Chọn số người</option>
                  <option value="1">1 người</option>
                  <option value="2">2 người</option>
                  <option value="3">3 người</option>
                  <option value="4">4 người</option>
                  <option value="5">5 người</option>
                  <option value="6">6+ người</option>
                </select>
              </div>
              {getErrorMessage('peopleNeeded') && (
                <div className="error-message">
                  <AlertCircle className="error-icon" size={16} />
                  <span>{getErrorMessage('peopleNeeded')}</span>
                </div>
              )}
            </div>

            {/* Time */}
            <div className="schedule-section">
              <label className="form-label">Chọn giờ <span className="required">*</span></label>
              <select
                name="time"
                value={formData.time}
                onChange={handleInputChange}
                onBlur={() => handleBlur('time')}
                className={`form-input ${getErrorMessage('time') ? 'error' : ''}`}
              >
                <option value="">Chọn khung giờ</option>
                <option value="09:00">9:00 Sáng</option>
                <option value="10:00">10:00 Sáng</option>
                <option value="11:00">11:00 Sáng</option>
                <option value="14:00">2:00 Chiều</option>
                <option value="15:00">3:00 Chiều</option>
                <option value="16:00">4:00 Chiều</option>
              </select>
              {getErrorMessage('time') && (
                <div className="error-message">
                  <AlertCircle className="error-icon" size={16} />
                  <span>{getErrorMessage('time')}</span>
                </div>
              )}
            </div>

            {/* ✅ SUMMARY CARD - SYNC TRACKING */}
            <div className="summary-card">
              <h3 className="summary-title">Tóm tắt yêu cầu</h3>
              <div className="summary-content">
                <div className="summary-item">
                  <span className="summary-label">Tiêu đề:</span>
                  <span className="summary-value">{formData.title || 'Chưa nhập'}</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Địa chỉ:</span>
                  <span className="summary-value">{formData.address || 'Chưa nhập'}</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Số người:</span>
                  <span className="summary-badge">{formData.peopleNeeded} người</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Thời gian:</span>
                  <span>{formData.date && formData.time ? `${formData.date} ${formData.time}` : 'Chưa chọn'}</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Ngân sách:</span>
                  <span className="summary-value">{formData.budget ? `${formData.budget}₫` : 'Chưa nhập'}</span>
                </div>
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
              disabled={false}
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
