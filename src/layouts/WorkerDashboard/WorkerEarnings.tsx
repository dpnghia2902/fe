import { useState } from 'react';
import { TrendingUp, DollarSign, Calendar, Download, Wallet, CreditCard, ArrowUpRight, ArrowDownRight, Plus, X } from 'lucide-react';
import './WorkerEarnings.css';

interface Props {
  onNavigate?: (page: any) => void;
}

const transactions = [
  { id: 1, type: 'Thu nhập', description: 'Dọn dẹp nhà cửa - John Doe', amount: 142500, date: 'Ngày 24/10/2025', status: 'Hoàn thành' },
  { id: 2, type: 'Thu nhập', description: 'Lắp ráp nội thất - Jane Smith', amount: 85000, date: 'Ngày 22/10/2025', status: 'Hoàn thành' },
  { id: 3, type: 'Rút tiền', description: 'Chuyển khoản ngân hàng', amount: -500000, date: 'Ngày 20/10/2025', status: 'Đang xử lý' },
  { id: 4, type: 'Thu nhập', description: 'Chăm sóc vườn - Mike Wilson', amount: 120000, date: 'Ngày 18/10/2025', status: 'Hoàn thành' },
  { id: 5, type: 'Thu nhập', description: 'Lau kính cửa sổ - Emily Brown', amount: 90000, date: 'Ngày 15/10/2025', status: 'Hoàn thành' },
];

const weeklyEarnings = [
  { week: 'Tuần 1', amount: 420000 },
  { week: 'Tuần 2', amount: 580000 },
  { week: 'Tuần 3', amount: 720000 },
  { week: 'Tuần 4', amount: 847000 },
];

export default function WorkerEarnings({ onNavigate }: Props) {
  const [showTopUpModal, setShowTopUpModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [topUpAmount, setTopUpAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('momo');
  const [timeFilter, setTimeFilter] = useState('all');

  const handleTopUp = () => {
    if (!topUpAmount || parseFloat(topUpAmount) <= 0) {
      alert('Vui lòng nhập số tiền hợp lệ');
      return;
    }
    alert(`Nạp tiền thành công! Đã nạp ${parseFloat(topUpAmount).toLocaleString('vi-VN')}₫ vào ví`);
    setShowTopUpModal(false);
    setTopUpAmount('');
  };

  const handleWithdraw = () => {
    if (!withdrawAmount || parseFloat(withdrawAmount) <= 0) {
      alert('Vui lòng nhập số tiền hợp lệ');
      return;
    }
    alert('Yêu cầu rút tiền đã được gửi! Tiền sẽ được chuyển vào tài khoản của bạn trong 1-2 ngày làm việc');
    setShowWithdrawModal(false);
    setWithdrawAmount('');
  };

  return (
    <div className="earnings-container">
      <div className="earnings-header">
        <h1 className="page-title">Thu nhập & Ví</h1>
        <p className="page-subtitle">Theo dõi thu nhập và quản lý rút tiền</p>
      </div>

      {/* Stats Overview */}
      <div className="stats-grid">
        <div className="wallet-card">
          <div className="wallet-header">
            <Wallet className="wallet-icon" />
            <span>Số dư ví</span>
          </div>
          <p className="wallet-balance">1.247.500₫</p>
          <div className="wallet-actions">
            <button onClick={() => setShowWithdrawModal(true)} className="btn-withdraw-main">
              Rút tiền
            </button>
            <button onClick={() => setShowTopUpModal(true)} className="btn-topup-main">
              <Plus className="icon-small" />
              Nạp tiền
            </button>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <div className="stat-icon green">
              <DollarSign className="icon-medium" />
            </div>
            <span className="stat-badge green">+23%</span>
          </div>
          <p className="stat-label">Tuần này</p>
          <p className="stat-value">847.500₫</p>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <div className="stat-icon blue">
              <Calendar className="icon-medium" />
            </div>
            <span className="stat-badge blue">+12%</span>
          </div>
          <p className="stat-label">Tháng này</p>
          <p className="stat-value">3.287.000₫</p>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <div className="stat-icon purple">
              <TrendingUp className="icon-medium" />
            </div>
            <span className="stat-badge purple">156 việc</span>
          </div>
          <p className="stat-label">Tổng thu nhập</p>
          <p className="stat-value">18.450.000₫</p>
        </div>
      </div>

      <div className="earnings-content">
        {/* Transactions */}
        <div className="transactions-section">
          <div className="transactions-card">
            <div className="transactions-header">
              <h2 className="section-title">Lịch sử giao dịch</h2>
              <div className="transactions-filters">
                <select 
                  value={timeFilter}
                  onChange={(e) => setTimeFilter(e.target.value)}
                  className="filter-select"
                >
                  <option value="all">Tất cả thời gian</option>
                  <option value="week">Tuần này</option>
                  <option value="month">Tháng này</option>
                </select>
                <button className="btn-export">
                  <Download className="icon-small" />
                  Xuất
                </button>
              </div>
            </div>

            <div className="transactions-list">
              {transactions.map((transaction) => (
                <div key={transaction.id} className="transaction-item">
                  <div className="transaction-info">
                    <div className={`transaction-icon ${transaction.type === 'Thu nhập' ? 'income' : 'expense'}`}>
                      {transaction.type === 'Thu nhập' ? (
                        <ArrowDownRight className="icon-medium" />
                      ) : (
                        <ArrowUpRight className="icon-medium" />
                      )}
                    </div>
                    <div>
                      <p className="transaction-description">{transaction.description}</p>
                      <div className="transaction-meta">
                        <span>{transaction.date}</span>
                        <span className={`transaction-status ${transaction.status === 'Hoàn thành' ? 'completed' : 'pending'}`}>
                          {transaction.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className={`transaction-amount ${transaction.amount > 0 ? 'positive' : 'negative'}`}>
                    {transaction.amount > 0 ? '+' : ''}{Math.abs(transaction.amount).toLocaleString('vi-VN')}₫
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Weekly Chart */}
          <div className="chart-card">
            <h2 className="section-title">Xu hướng thu nhập hàng tuần</h2>
            <div className="chart-list">
              {weeklyEarnings.map((week) => (
                <div key={week.week} className="chart-item">
                  <div className="chart-item-header">
                    <span className="chart-week">{week.week}</span>
                    <span className="chart-amount">{week.amount.toLocaleString('vi-VN')}₫</span>
                  </div>
                  <div className="chart-bar-bg">
                    <div
                      className="chart-bar-fill"
                      style={{ width: `${(week.amount / 1000000) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="sidebar-section">
          {/* Payment Methods */}
          <div className="payment-card">
            <h3 className="card-title">Phương thức rút tiền</h3>
            <div className="payment-method">
              <div className="payment-method-info">
                <div className="payment-icon">
                  <CreditCard className="icon-small" />
                </div>
                <div>
                  <p className="payment-name">Tài khoản ngân hàng</p>
                  <p className="payment-number">•••• 4242</p>
                </div>
              </div>
              <span className="payment-badge">Chính</span>
            </div>
            <button className="btn-add-payment">Thêm phương thức thanh toán</button>
          </div>

          {/* Quick Stats */}
          <div className="performance-card">
            <h3 className="card-title">Hiệu suất tháng này</h3>
            <div className="performance-stats">
              <div className="performance-stat">
                <span className="performance-label">Việc hoàn thành</span>
                <span className="performance-value">32</span>
              </div>
              <div className="performance-stat">
                <span className="performance-label">Trung bình mỗi việc</span>
                <span className="performance-value">102.710₫</span>
              </div>
              <div className="performance-stat">
                <span className="performance-label">Ngày hoạt động</span>
                <span className="performance-value">18</span>
              </div>
              <div className="performance-stat">
                <span className="performance-label">Thu nhập hàng ngày TB</span>
                <span className="performance-value">182.610₫</span>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="tips-card">
            <div className="tips-emoji">💡</div>
            <h3 className="tips-title">Mẹo kiếm thu nhập</h3>
            <p className="tips-text">
              Hoàn thành công việc đúng hạn và duy trì đánh giá cao để mở khóa cơ hội cao cấp và tiền thưởng!
            </p>
          </div>

          {/* Pending Withdrawals */}
          <div className="pending-card">
            <h3 className="card-title">Rút tiền đang chờ</h3>
            <div className="pending-content">
              <p className="pending-amount">500.000₫</p>
              <p className="pending-status">Đang xử lý...</p>
              <p className="pending-date">Dự kiến: 26/10/2025</p>
            </div>
          </div>
        </div>
      </div>

      {/* Top Up Modal */}
      {showTopUpModal && (
        <div className="modal-overlay" onClick={() => setShowTopUpModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowTopUpModal(false)}>
              <X className="icon-small" />
            </button>

            <h2 className="modal-title">Nạp tiền vào ví</h2>

            <div className="modal-body">
              {/* Amount Input */}
              <div className="form-group">
                <label className="form-label">Số tiền nạp</label>
                <div className="amount-input-wrapper">
                  <input
                    type="number"
                    placeholder="Nhập số tiền"
                    value={topUpAmount}
                    onChange={(e) => setTopUpAmount(e.target.value)}
                    className="amount-input"
                  />
                  <span className="currency-symbol">₫</span>
                </div>
                <div className="quick-amounts">
                  {['100000', '200000', '500000'].map((amount) => (
                    <button
                      key={amount}
                      onClick={() => setTopUpAmount(amount)}
                      className="quick-amount-btn"
                    >
                      {(parseInt(amount) / 1000).toLocaleString('vi-VN')}k
                    </button>
                  ))}
                </div>
              </div>

              {/* Payment Method */}
              <div className="form-group">
                <label className="form-label">Phương thức thanh toán</label>
                <div className="payment-methods">
                  <label className={`payment-option ${paymentMethod === 'momo' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="payment"
                      value="momo"
                      checked={paymentMethod === 'momo'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <div className="payment-option-icon pink">M</div>
                    <span>MoMo</span>
                  </label>
                  <label className={`payment-option ${paymentMethod === 'zalopay' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="payment"
                      value="zalopay"
                      checked={paymentMethod === 'zalopay'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <div className="payment-option-icon blue">Z</div>
                    <span>ZaloPay</span>
                  </label>
                  <label className={`payment-option ${paymentMethod === 'wallet' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="payment"
                      value="wallet"
                      checked={paymentMethod === 'wallet'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <div className="payment-option-icon green">
                      <Wallet className="icon-small" />
                    </div>
                    <span>HandyGo Wallet</span>
                  </label>
                </div>
              </div>

              {/* Summary */}
              <div className="payment-summary">
                <div className="summary-row">
                  <span className="summary-label">Số tiền nạp:</span>
                  <span className="summary-value">
                    {topUpAmount ? parseFloat(topUpAmount).toLocaleString('vi-VN') : '0'}₫
                  </span>
                </div>
                <div className="summary-row">
                  <span className="summary-label">Phí giao dịch:</span>
                  <span className="summary-value green">Miễn phí</span>
                </div>
                <div className="summary-total">
                  <span>Tổng thanh toán:</span>
                  <span className="total-amount">
                    {topUpAmount ? parseFloat(topUpAmount).toLocaleString('vi-VN') : '0'}₫
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="modal-actions">
                <button onClick={() => setShowTopUpModal(false)} className="btn-cancel">
                  Hủy
                </button>
                <button onClick={handleTopUp} className="btn-confirm">
                  Xác nhận nạp tiền
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Withdraw Modal */}
      {showWithdrawModal && (
        <div className="modal-overlay" onClick={() => setShowWithdrawModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowWithdrawModal(false)}>
              <X className="icon-small" />
            </button>

            <h2 className="modal-title">Rút tiền</h2>

            <div className="modal-body">
              <div className="available-balance">
                <p className="balance-label">Số dư khả dụng</p>
                <p className="balance-amount">1.247.500₫</p>
              </div>
              
              <div className="form-group">
                <label className="form-label">Số tiền rút</label>
                <div className="amount-input-wrapper">
                  <input
                    type="number"
                    placeholder="Nhập số tiền"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    className="amount-input"
                  />
                  <span className="currency-symbol">₫</span>
                </div>
              </div>

              <div className="withdraw-notice">
                ⏱ Thời gian xử lý: 1-2 ngày làm việc
              </div>

              <div className="modal-actions">
                <button onClick={() => setShowWithdrawModal(false)} className="btn-cancel">
                  Hủy
                </button>
                <button onClick={handleWithdraw} className="btn-confirm">
                  Xác nhận rút tiền
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
