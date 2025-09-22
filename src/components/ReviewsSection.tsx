import { useState } from 'react';
import { Star, ThumbsUp, Verified, Edit3, X, Shield, CheckCircle, Users } from 'lucide-react';
import { toast } from "sonner@2.0.3";

interface Review {
  id: number;
  author: string;
  rating: number;
  title: string;
  content: string;
  date: string;
  verified: boolean;
  helpful: number;
  category?: string;
}

interface ReviewsSectionProps {
  productName: string;
  productCategory: string;
}

export function ReviewsSection({ productName, productCategory }: ReviewsSectionProps) {
  const [showWriteReview, setShowWriteReview] = useState(false);
  const [showHowItWorks, setShowHowItWorks] = useState(false);
  const [newReview, setNewReview] = useState({
    author: '',
    rating: 0,
    title: '',
    content: ''
  });

  // Generate realistic reviews based on product category
  const generateReviews = (category: string): Review[] => {
    const baseReviews = [
      {
        id: 1,
        author: "Sarah M.",
        rating: 5,
        title: "Exceeded my expectations",
        content: "The build quality is outstanding and the battery life is exactly as advertised. Very comfortable for all-day wear and the app integration is seamless.",
        date: "Dec 2024",
        verified: true,
        helpful: 23,
        category: "Quality"
      },
      {
        id: 2,
        author: "Michael R.",
        rating: 4,
        title: "Great device, minor setup issues",
        content: "Love the features and design. Setup took a bit longer than expected but customer support was helpful. Overall very satisfied with the purchase.",
        date: "Nov 2024",
        verified: true,
        helpful: 18,
        category: "Setup"
      },
      {
        id: 3,
        author: "Emma L.",
        rating: 5,
        title: "Perfect for my lifestyle",
        content: "This has become an essential part of my daily routine. The accuracy is impressive and I love how it integrates with my other devices. Highly recommend!",
        date: "Nov 2024",
        verified: true,
        helpful: 31,
        category: "Lifestyle"
      },
      {
        id: 4,
        author: "David K.",
        rating: 4,
        title: "Solid performance",
        content: "Good value for the price. The design is sleek and modern. Battery easily lasts the advertised time. Would like to see more customization options in future updates.",
        date: "Oct 2024",
        verified: false,
        helpful: 12,
        category: "Performance"
      }
    ];

    // Customize reviews based on category
    if (category.includes('Fitness') || category.includes('Health')) {
      baseReviews[0].content = "Perfect for tracking workouts and daily activity. The heart rate monitoring is very accurate and the sleep tracking insights are invaluable.";
      baseReviews[2].content = "Game-changer for my fitness journey. The real-time feedback during workouts is motivating and the recovery metrics help me train smarter.";
    } else if (category.includes('Smart Glasses')) {
      baseReviews[0].content = "The AR display is crisp and the voice commands work flawlessly. Lightweight design means I can wear them all day without discomfort.";
      baseReviews[2].content = "These have revolutionized how I work. Being able to access information hands-free is incredibly convenient for my job.";
    } else if (category.includes('Smartwatch')) {
      baseReviews[0].content = "Excellent smartwatch with smooth performance. The screen is vibrant and responsive, and I love the variety of watch faces available.";
      baseReviews[2].content = "Perfect balance of fitness tracking and smart features. Notifications are discrete and the calling feature works better than expected.";
    }

    return baseReviews;
  };

  const reviews = generateReviews(productCategory);
  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  const totalReviews = reviews.length + Math.floor(Math.random() * 200) + 50; // Simulate more reviews

  // Generate realistic rating distribution
  const generateRatingDistribution = () => {
    const total = totalReviews;
    return {
      5: Math.floor(total * 0.56), // 56% - most common for good products
      4: Math.floor(total * 0.28), // 28%
      3: Math.floor(total * 0.08), // 8%
      2: Math.floor(total * 0.05), // 5%
      1: Math.floor(total * 0.03), // 3%
    };
  };

  const ratingDistribution = generateRatingDistribution();

  const renderStars = (rating: number, size: 'sm' | 'md' = 'sm', interactive: boolean = false) => {
    const sizeClass = size === 'sm' ? 'w-4 h-4' : 'w-5 h-5';
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${sizeClass} ${
              star <= rating 
                ? 'fill-yellow-400 text-yellow-400' 
                : 'fill-gray-200 text-gray-200'
            } ${interactive ? 'cursor-pointer hover:scale-110 transition-transform duration-200' : ''}`}
            onClick={interactive ? () => setNewReview(prev => ({ ...prev, rating: star })) : undefined}
          />
        ))}
      </div>
    );
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newReview.author.trim()) {
      toast.error('Please enter your name');
      return;
    }
    if (newReview.rating === 0) {
      toast.error('Please select a rating');
      return;
    }
    if (!newReview.title.trim()) {
      toast.error('Please enter a review title');
      return;
    }
    if (!newReview.content.trim()) {
      toast.error('Please write your review');
      return;
    }

    // Here you would typically send the review to your backend
    toast.success('Thank you for your review! It will be published after moderation.');
    
    // Reset form
    setNewReview({
      author: '',
      rating: 0,
      title: '',
      content: ''
    });
    setShowWriteReview(false);
  };

  return (
    <section className="bg-white py-16">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 
            className="text-3xl mb-4"
            style={{ 
              fontFamily: "'Gotham', 'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif",
              color: 'var(--primary-text)'
            }}
          >
            Customer Reviews
          </h2>
        </div>

        {/* Main Reviews Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          
          {/* Left Column - Rating Summary (2 columns on large screens) */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Overall Rating Display */}
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start space-x-3 mb-4">
                {renderStars(Math.round(averageRating), 'md')}
                <span 
                  className="text-3xl font-medium"
                  style={{ 
                    color: 'var(--primary-text)',
                    fontFamily: "'Gotham', 'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif"
                  }}
                >
                  {averageRating.toFixed(1)}
                </span>
              </div>
              <p 
                className="text-lg mb-2"
                style={{ 
                  color: 'var(--secondary-text)',
                  fontFamily: "'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif"
                }}
              >
                out of 5
              </p>
              <p 
                className="text-sm"
                style={{ 
                  color: 'var(--secondary-text)',
                  fontFamily: "'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif"
                }}
              >
                {totalReviews} global ratings
              </p>
            </div>

            {/* Rating Distribution */}
            <div className="space-y-3">
              {[5, 4, 3, 2, 1].map((starLevel) => {
                const count = ratingDistribution[starLevel as keyof typeof ratingDistribution];
                const percentage = Math.round((count / totalReviews) * 100);
                
                return (
                  <div key={starLevel} className="flex items-center space-x-3">
                    {/* Star Label */}
                    <div 
                      className="flex items-center space-x-1 w-16 justify-end"
                      style={{ 
                        color: 'var(--primary-text)',
                        fontFamily: "'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif"
                      }}
                    >
                      <span className="text-sm font-medium">{starLevel} star</span>
                    </div>

                    {/* Progress Bar */}
                    <div className="flex-1">
                      <div 
                        className="h-2 rounded-full overflow-hidden"
                        style={{ backgroundColor: 'var(--borders)' }}
                      >
                        <div
                          className="h-full rounded-full transition-all duration-700 ease-out"
                          style={{ 
                            width: `${percentage}%`,
                            backgroundColor: starLevel >= 4 ? '#FF9500' : starLevel === 3 ? '#FFB800' : '#FF6B35',
                            background: starLevel >= 4 
                              ? 'linear-gradient(90deg, #FF9500 0%, #FFB800 100%)'
                              : starLevel === 3
                              ? '#FFB800'
                              : 'linear-gradient(90deg, #FF6B35 0%, #FF8E53 100%)'
                          }}
                        />
                      </div>
                    </div>

                    {/* Percentage */}
                    <div 
                      className="w-12 text-left"
                      style={{ 
                        color: 'var(--primary-text)',
                        fontFamily: "'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif"
                      }}
                    >
                      <span className="text-sm font-medium">{percentage}%</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Write Review Button */}
            <div className="pt-4">
              <button
                onClick={() => setShowWriteReview(!showWriteReview)}
                className="w-full inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-lg border-2 hover-button transition-all duration-200"
                style={{ 
                  borderColor: 'var(--primary-accent)',
                  color: 'var(--primary-accent)',
                  backgroundColor: showWriteReview ? 'var(--secondary-accent)' : 'white',
                  fontFamily: "'Gotham', 'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif"
                }}
              >
                <Edit3 className="w-5 h-5" />
                <span>{showWriteReview ? 'Cancel Review' : 'Write a Review'}</span>
              </button>
            </div>

            {/* Additional Info Link */}
            <div className="pt-2">
              <button 
                onClick={() => setShowHowItWorks(true)}
                className="text-sm hover:underline transition-colors duration-200"
                style={{ 
                  color: 'var(--primary-accent)',
                  fontFamily: "'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--hover-accent)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--primary-accent)';
                }}
              >
                How customer reviews and ratings work ↓
              </button>
            </div>

            {/* Write Review Form */}
            {showWriteReview && (
              <div 
                className="bg-white border rounded-2xl p-6 animate-fade-in-up"
                style={{ 
                  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.08)',
                  border: `1px solid var(--borders)`
                }}
              >
                <h3 
                  className="text-lg mb-6 text-center"
                  style={{ 
                    fontFamily: "'Gotham', 'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif",
                    color: 'var(--primary-text)'
                  }}
                >
                  Share Your Experience
                </h3>

                <form onSubmit={handleSubmitReview} className="space-y-4">
                  {/* Author Name */}
                  <div>
                    <label 
                      className="block mb-2 text-sm font-medium"
                      style={{ 
                        color: 'var(--primary-text)',
                        fontFamily: "'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif"
                      }}
                    >
                      Your Name
                    </label>
                    <input
                      type="text"
                      value={newReview.author}
                      onChange={(e) => setNewReview(prev => ({ ...prev, author: e.target.value }))}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200"
                      style={{ 
                        borderColor: 'var(--borders)',
                        fontFamily: "'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif",
                        fontSize: '14px'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = 'var(--primary-accent)';
                        e.target.style.boxShadow = '0 0 0 3px rgba(10, 115, 190, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = 'var(--borders)';
                        e.target.style.boxShadow = 'none';
                      }}
                      placeholder="Enter your name"
                    />
                  </div>

                  {/* Rating */}
                  <div>
                    <label 
                      className="block mb-2 text-sm font-medium"
                      style={{ 
                        color: 'var(--primary-text)',
                        fontFamily: "'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif"
                      }}
                    >
                      Rating
                    </label>
                    <div className="flex items-center space-x-2">
                      {renderStars(newReview.rating, 'sm', true)}
                      <span 
                        className="text-xs"
                        style={{ color: 'var(--secondary-text)' }}
                      >
                        {newReview.rating > 0 ? `${newReview.rating} star${newReview.rating !== 1 ? 's' : ''}` : 'Click to rate'}
                      </span>
                    </div>
                  </div>

                  {/* Review Title */}
                  <div>
                    <label 
                      className="block mb-2 text-sm font-medium"
                      style={{ 
                        color: 'var(--primary-text)',
                        fontFamily: "'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif"
                      }}
                    >
                      Review Title
                    </label>
                    <input
                      type="text"
                      value={newReview.title}
                      onChange={(e) => setNewReview(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200"
                      style={{ 
                        borderColor: 'var(--borders)',
                        fontFamily: "'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif",
                        fontSize: '14px'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = 'var(--primary-accent)';
                        e.target.style.boxShadow = '0 0 0 3px rgba(10, 115, 190, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = 'var(--borders)';
                        e.target.style.boxShadow = 'none';
                      }}
                      placeholder="Brief summary"
                    />
                  </div>

                  {/* Review Content */}
                  <div>
                    <label 
                      className="block mb-2 text-sm font-medium"
                      style={{ 
                        color: 'var(--primary-text)',
                        fontFamily: "'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif"
                      }}
                    >
                      Your Review
                    </label>
                    <textarea
                      value={newReview.content}
                      onChange={(e) => setNewReview(prev => ({ ...prev, content: e.target.value }))}
                      rows={4}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 resize-vertical"
                      style={{ 
                        borderColor: 'var(--borders)',
                        fontFamily: "'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif",
                        fontSize: '14px'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = 'var(--primary-accent)';
                        e.target.style.boxShadow = '0 0 0 3px rgba(10, 115, 190, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = 'var(--borders)';
                        e.target.style.boxShadow = 'none';
                      }}
                      placeholder="Share your experience..."
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="flex space-x-3 pt-2">
                    <button
                      type="submit"
                      className="flex-1 py-2 px-4 rounded-lg text-white text-sm font-medium hover-button transition-all duration-200"
                      style={{ 
                        backgroundColor: 'var(--primary-accent)',
                        fontFamily: "'Gotham', 'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif"
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#085a9a';
                        e.currentTarget.style.boxShadow = '0 8px 20px rgba(10,115,190,0.3)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'var(--primary-accent)';
                        e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.08)';
                      }}
                    >
                      Submit Review
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowWriteReview(false)}
                      className="px-4 py-2 border rounded-lg text-sm font-medium hover-button transition-all duration-200"
                      style={{ 
                        borderColor: 'var(--borders)',
                        color: 'var(--secondary-text)',
                        backgroundColor: 'white',
                        fontFamily: "'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif"
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = 'var(--primary-accent)';
                        e.currentTarget.style.color = 'var(--primary-accent)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'var(--borders)';
                        e.currentTarget.style.color = 'var(--secondary-text)';
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>

          {/* Right Column - Individual Reviews (3 columns on large screens) */}
          <div className="lg:col-span-3 space-y-6">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="bg-white border border-gray-100 rounded-2xl p-6 hover-lift"
                style={{ 
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
                  border: `1px solid var(--borders)`
                }}
              >
                {/* Review Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center text-white font-medium"
                      style={{ backgroundColor: 'var(--primary-accent)' }}
                    >
                      {review.author.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 
                          className="font-medium"
                          style={{ 
                            color: 'var(--primary-text)',
                            fontFamily: "'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif"
                          }}
                        >
                          {review.author}
                        </h4>
                        {review.verified && (
                          <div className="flex items-center space-x-1">
                            <Verified className="w-4 h-4 text-green-500" />
                            <span className="text-xs text-green-600 font-medium">
                              Verified Purchase
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        {renderStars(review.rating)}
                        <span 
                          className="text-sm"
                          style={{ color: 'var(--secondary-text)' }}
                        >
                          {review.date}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Review Content */}
                <div className="mb-4">
                  <h5 
                    className="font-medium mb-2"
                    style={{ 
                      color: 'var(--primary-text)',
                      fontFamily: "'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif"
                    }}
                  >
                    {review.title}
                  </h5>
                  <p 
                    className="leading-relaxed"
                    style={{ 
                      color: 'var(--secondary-text)',
                      fontFamily: "'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif"
                    }}
                  >
                    {review.content}
                  </p>
                </div>

                {/* Review Footer */}
                <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: 'var(--borders)' }}>
                  <span 
                    className="inline-block px-3 py-1 text-xs rounded-full"
                    style={{ 
                      backgroundColor: 'var(--secondary-accent)',
                      color: 'var(--primary-accent)'
                    }}
                  >
                    {review.category}
                  </span>
                  <button 
                    className="flex items-center space-x-1 text-sm hover:opacity-70 transition-opacity"
                    style={{ color: 'var(--secondary-text)' }}
                  >
                    <ThumbsUp className="w-4 h-4" />
                    <span>Helpful ({review.helpful})</span>
                  </button>
                </div>
              </div>
            ))}

            {/* View All Reviews Button */}
            <div className="text-center pt-6">
              <button
                className="px-8 py-4 rounded-lg font-medium text-white hover-button transition-all duration-200"
                style={{ 
                  backgroundColor: 'var(--primary-accent)',
                  fontFamily: "'Gotham', 'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#085a9a';
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(10,115,190,0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--primary-accent)';
                  e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.08)';
                }}
              >
                Read All {totalReviews} Reviews
              </button>
            </div>
          </div>
        </div>

        {/* How It Works Modal */}
        {showHowItWorks && (
          <div 
            className="fixed inset-0 flex items-center justify-center p-4 z-50 animate-fade-in-up"
            style={{
              background: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(3px)',
              WebkitBackdropFilter: 'blur(3px)'
            }}
            onClick={() => setShowHowItWorks(false)}
          >
            <div 
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-scale-in"
              style={{ boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)' }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div 
                className="flex items-center justify-between p-6 border-b"
                style={{ borderColor: 'var(--borders)' }}
              >
                <h3 
                  className="text-xl font-medium"
                  style={{ 
                    fontFamily: "'Gotham', 'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif",
                    color: 'var(--primary-text)'
                  }}
                >
                  How Customer Reviews Work
                </h3>
                <button
                  onClick={() => setShowHowItWorks(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                  style={{ color: 'var(--secondary-text)' }}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-6">
                
                {/* Review Process */}
                <div className="flex items-start space-x-4">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: 'var(--secondary-accent)' }}
                  >
                    <Shield className="w-6 h-6" style={{ color: 'var(--primary-accent)' }} />
                  </div>
                  <div>
                    <h4 
                      className="font-medium mb-2"
                      style={{ 
                        color: 'var(--primary-text)',
                        fontFamily: "'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif"
                      }}
                    >
                      Authentic Reviews Only
                    </h4>
                    <p 
                      className="text-sm leading-relaxed"
                      style={{ 
                        color: 'var(--secondary-text)',
                        fontFamily: "'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif"
                      }}
                    >
                      We only accept reviews from verified purchasers. Each review goes through our moderation process to ensure authenticity and helpfulness. Reviews marked with a green checkmark indicate verified purchases.
                    </p>
                  </div>
                </div>

                {/* Verified Purchases */}
                <div className="flex items-start space-x-4">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: 'var(--secondary-accent)' }}
                  >
                    <CheckCircle className="w-6 h-6" style={{ color: 'var(--primary-accent)' }} />
                  </div>
                  <div>
                    <h4 
                      className="font-medium mb-2"
                      style={{ 
                        color: 'var(--primary-text)',
                        fontFamily: "'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif"
                      }}
                    >
                      Verification Process
                    </h4>
                    <p 
                      className="text-sm leading-relaxed"
                      style={{ 
                        color: 'var(--secondary-text)',
                        fontFamily: "'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif"
                      }}
                    >
                      Reviews are automatically verified against purchase records. Verified reviews appear with a "Verified Purchase" badge and are given priority in our ranking algorithm. This ensures you see the most relevant and trustworthy feedback first.
                    </p>
                  </div>
                </div>

                {/* Community Guidelines */}
                <div className="flex items-start space-x-4">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: 'var(--secondary-accent)' }}
                  >
                    <Users className="w-6 h-6" style={{ color: 'var(--primary-accent)' }} />
                  </div>
                  <div>
                    <h4 
                      className="font-medium mb-2"
                      style={{ 
                        color: 'var(--primary-text)',
                        fontFamily: "'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif"
                      }}
                    >
                      Community Standards
                    </h4>
                    <p 
                      className="text-sm leading-relaxed"
                      style={{ 
                        color: 'var(--secondary-text)',
                        fontFamily: "'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif"
                      }}
                    >
                      Reviews must be helpful, honest, and respectful. We remove reviews that contain inappropriate content, spam, or promotional material. Our community can vote on review helpfulness to surface the most valuable feedback.
                    </p>
                  </div>
                </div>

                {/* Rating Distribution */}
                <div 
                  className="bg-gray-50 rounded-xl p-4"
                  style={{ backgroundColor: 'var(--secondary-accent)' }}
                >
                  <h4 
                    className="font-medium mb-3"
                    style={{ 
                      color: 'var(--primary-text)',
                      fontFamily: "'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif"
                    }}
                  >
                    Understanding Rating Distribution
                  </h4>
                  <ul className="space-y-2 text-sm" style={{ color: 'var(--secondary-text)' }}>
                    <li>• <strong>5 Stars:</strong> Exceptional - Exceeds expectations</li>
                    <li>• <strong>4 Stars:</strong> Very Good - Meets expectations with minor areas for improvement</li>
                    <li>• <strong>3 Stars:</strong> Good - Average product with some limitations</li>
                    <li>• <strong>2 Stars:</strong> Fair - Below expectations with significant issues</li>
                    <li>• <strong>1 Star:</strong> Poor - Major problems or defective product</li>
                  </ul>
                </div>

                {/* Moderation Timeline */}
                <div 
                  className="border-t pt-4"
                  style={{ borderColor: 'var(--borders)' }}
                >
                  <p 
                    className="text-xs text-center"
                    style={{ 
                      color: 'var(--secondary-text)',
                      fontFamily: "'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif"
                    }}
                  >
                    Reviews typically appear within 24-48 hours after submission and moderation. 
                    We reserve the right to edit or remove reviews that don't meet our community guidelines.
                  </p>
                </div>
              </div>

              {/* Modal Footer */}
              <div 
                className="flex justify-center p-6 border-t"
                style={{ borderColor: 'var(--borders)' }}
              >
                <button
                  onClick={() => setShowHowItWorks(false)}
                  className="px-8 py-3 rounded-lg font-medium text-white hover-button transition-all duration-200"
                  style={{ 
                    backgroundColor: 'var(--primary-accent)',
                    fontFamily: "'Gotham', 'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#085a9a';
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(10,115,190,0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--primary-accent)';
                    e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.08)';
                  }}
                >
                  Got it, Thanks!
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}