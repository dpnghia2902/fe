import { useState } from 'react';
import { PostCard } from './PostCard';
import type { Post } from './PostCard';
import { Plus, Search } from 'lucide-react';
import './Feed.css';

interface Props {
  isWorker?: boolean;
  userName: string;
  userAvatar?: string;
  userType: 'customer' | 'worker';
}

const samplePosts: Post[] = [
  {
    id: '1',
    userId: 'user1',
    userName: 'Nguyễn Văn A',
    userType: 'customer',
    location: 'Quận 1, TP.HCM',
    timeAgo: '2 giờ trước',
    type: 'request',
    serviceCategory: 'Dọn dẹp',
    budget: '150.000₫ - 200.000₫',
    content: 'Mình cần tìm người giúp dọn dẹp nhà cửa cho căn hộ 3 phòng ngủ. Yêu cầu kinh nghiệm và mang theo dụng cụ dọn dẹp.',
    images: ['https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400'],
    likes: 12,
    comments: 5,
    shares: 2
  },
  {
    id: '2',
    userId: 'user2',
    userName: 'Trần Thị B',
    userAvatar: 'https://i.pravatar.cc/150?img=2',
    userType: 'worker',
    location: 'Quận 3, TP.HCM',
    timeAgo: '5 giờ trước',
    type: 'offer',
    serviceCategory: 'Gia sư',
    budget: '100.000₫/giờ',
    content: 'Mình là sinh viên năm 4 chuyên ngành Toán, có kinh nghiệm dạy kèm 3 năm. Nhận dạy học sinh cấp 2 và cấp 3.',
    images: ['https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400'],
    likes: 28,
    comments: 15,
    shares: 8
  },
];

export function Feed({ isWorker = false, userName, userAvatar, userType }: Props) {
  const [posts] = useState<Post[]>(samplePosts);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'offer' | 'request'>('all');

  const filteredPosts = posts.filter(post => {
    if (filterType !== 'all' && post.type !== filterType) return false;
    if (searchQuery && !post.content.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="feed-container">
      {/* Search & Filters */}
      <div className="feed-filters">
        <div className="search-box">
          <Search className="search-icon" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm kiếm bài đăng..."
            className="search-input"
          />
        </div>
        <div className="filter-buttons">
          <select 
            value={filterType} 
            onChange={(e) => setFilterType(e.target.value as any)}
            className="filter-select"
          >
            <option value="all">Tất cả bài đăng</option>
            <option value="request">Cần giúp đỡ</option>
            <option value="offer">Cung cấp dịch vụ</option>
          </select>
        </div>
      </div>

      {/* Posts */}
      <div className="feed-posts">
        {filteredPosts.length === 0 ? (
          <div className="empty-state">
            <p>Không tìm thấy bài đăng nào</p>
          </div>
        ) : (
          filteredPosts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              isWorker={isWorker}
              onLike={(id) => console.log('Like:', id)}
              onComment={(id) => console.log('Comment:', id)}
              onShare={(id) => console.log('Share:', id)}
              onApply={(id) => console.log('Apply:', id)}
              onBookmark={(id) => console.log('Bookmark:', id)}
            />
          ))
        )}
      </div>
    </div>
  );
}
