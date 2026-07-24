import React from 'react';
import { X, Clock, Calendar, User, Share2, Tag } from 'lucide-react';

export default function NewsDetailModal({ article, onClose }) {
  if (!article) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white flex items-center justify-center transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Article image header */}
        <div className="relative h-72 overflow-hidden rounded-t-3xl">
          <img 
            src={article.image} 
            alt={article.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
          
          <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
            <span className="px-3 py-1 bg-orange-500 text-white text-xs font-bold rounded-full">
              {article.category}
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold leading-snug">{article.title}</h2>
            <div className="flex items-center gap-4 text-xs text-slate-300">
              <span className="flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-teal-400" />
                <span>{article.author}</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-teal-400" />
                <span>{article.publishedAt}</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-teal-400" />
                <span>{article.readTime}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div className="p-6 sm:p-8 space-y-6">
          <div 
            className="prose prose-slate max-w-none text-slate-700 leading-relaxed text-sm space-y-4"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Footer Share & Close */}
          <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
            <button 
              onClick={() => alert('Đã sao chép liên kết bài viết!')}
              className="flex items-center gap-1.5 text-slate-600 text-xs font-semibold hover:text-teal-700 transition"
            >
              <Share2 className="w-4 h-4" />
              <span>Chia sẻ bài viết</span>
            </button>

            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition"
            >
              Đóng bài viết
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
