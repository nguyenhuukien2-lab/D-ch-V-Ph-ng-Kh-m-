import React, { useState } from 'react';
import { Search, Clock, Calendar, User, ArrowRight } from 'lucide-react';

export default function NewsPage({ articles, onViewArticle }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'Tim mạch', 'Nhi khoa', 'Sản phụ khoa', 'Nha khoa', 'Xét nghiệm'];

  const filteredArticles = articles.filter(art => {
    const matchesCat = selectedCategory === 'all' || art.category === selectedCategory;
    const matchesSearch = art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          art.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="px-3.5 py-1.5 rounded-full bg-teal-100 text-teal-800 text-xs font-bold uppercase tracking-wider">
          Tin tức & Kiến thức y học
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
          Cẩm Nang Sức Khỏe Gia Đình
        </h1>
        <p className="text-slate-600 text-sm">
          Bài viết chuyên môn được biên soạn và kiểm duyệt trực tiếp bởi đội ngũ Bác sĩ Chuyên khoa MedCare.
        </p>
      </div>

      {/* Filter and Search */}
      <div className="space-y-4">
        <div className="max-w-md mx-auto relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input 
            type="text"
            placeholder="Tìm bài viết sức khỏe..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-3 py-2.5 rounded-2xl bg-white border border-slate-200 shadow-sm text-xs focus:outline-none focus:border-teal-600"
          />
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold capitalize transition ${
                selectedCategory === cat 
                  ? 'bg-teal-700 text-white' 
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cat === 'all' ? 'Tất cả bài viết' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredArticles.map((art) => (
          <div 
            key={art.id}
            onClick={() => onViewArticle(art)}
            className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition cursor-pointer flex flex-col group"
          >
            <div className="h-48 overflow-hidden bg-slate-100 relative">
              <img src={art.image} alt={art.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
              <span className="absolute top-3 left-3 bg-teal-800 text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                {art.category}
              </span>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <h3 className="font-bold text-slate-900 text-base group-hover:text-teal-700 transition line-clamp-2">
                  {art.title}
                </h3>
                <p className="text-slate-500 text-xs mt-2 line-clamp-2 leading-relaxed">
                  {art.excerpt}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                <span className="font-medium text-slate-600">{art.author}</span>
                <span>{art.publishedAt}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
