import { Heart, MessageCircle, Share2, Bookmark, MapPin } from 'lucide-react';
import './PostCard.css';

export interface Post {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  userType: 'customer' | 'worker';
  location: string;
  timeAgo: string;
  type: 'request' | 'offer';
  serviceCategory: string;
  budget: string;
  content: string;
  images?: string[];
  likes: number;
  comments: number;
  shares: number;
}

interface PostCardProps {
  post: Post;
  isWorker?: boolean;
  onLike: (id: string) => void;
  onComment: (id: string) => void;
  onShare: (id: string) => void;
  onApply?: (id: string) => void;
  onBookmark?: (id: string) => void;
}

export function PostCard({ post, isWorker, onLike, onComment, onShare, onApply, onBookmark }: PostCardProps) {
  return (
    <div className="post-card">
      {/* Header */}
      <div className="post-header">
        <div className="post-avatar">
          {post.userAvatar ? (
            <img src={post.userAvatar} alt={post.userName} />
          ) : (
            <div className="avatar-placeholder">{post.userName[0]}</div>
          )}
        </div>
        <div className="post-info">
          <h4 className="post-username">{post.userName}</h4>
          <div className="post-meta">
            <span className={`post-badge ${post.type}`}>
              {post.type === 'request' ? '🔍 Cần giúp đỡ' : '💼 Cung cấp dịch vụ'}
            </span>
            <span>•</span>
            <span>{post.timeAgo}</span>
          </div>
          <div className="post-location">
            <MapPin className="location-icon" />
            <span>{post.location}</span>
          </div>
        </div>
        <button className="post-bookmark" onClick={() => onBookmark?.(post.id)}>
          <Bookmark className="icon" />
        </button>
      </div>

      {/* Content */}
      <div className="post-content">
        <div className="post-tags">
          <span className="tag">{post.serviceCategory}</span>
          <span className="tag budget">{post.budget}</span>
        </div>
        <p className="post-text">{post.content}</p>
        {post.images && post.images.length > 0 && (
          <div className="post-images">
            {post.images.map((img, idx) => (
              <img key={idx} src={img} alt="" className="post-image" />
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="post-footer">
        <div className="post-stats">
          <button onClick={() => onLike(post.id)} className="stat-button">
            <Heart className="icon" />
            <span>{post.likes}</span>
          </button>
          <button onClick={() => onComment(post.id)} className="stat-button">
            <MessageCircle className="icon" />
            <span>{post.comments}</span>
          </button>
          <button onClick={() => onShare(post.id)} className="stat-button">
            <Share2 className="icon" />
            <span>{post.shares}</span>
          </button>
        </div>
        {isWorker && post.type === 'request' && (
          <button onClick={() => onApply?.(post.id)} className="btn-apply">
            Ứng tuyển
          </button>
        )}
      </div>
    </div>
  );
}
