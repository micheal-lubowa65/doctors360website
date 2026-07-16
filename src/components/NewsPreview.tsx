import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Tag } from 'react-bootstrap-icons';
import { dbService, Article } from '../services/dbService';
import ScrollReveal from './ScrollReveal';

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

export default function NewsPreview() {
  const [preview, setPreview] = useState<Article[]>([]);

  useEffect(() => {
    dbService.getLatestArticles(3)
      .then(data => {
        setPreview(data);
      })
      .catch(err => {
        console.error('Error fetching preview articles:', err);
      });
  }, []);
  return (
    <section className="py-20 lg:py-28 bg-gradient-to-b from-seafoam-50/30 to-white relative overflow-hidden">
      <div className="absolute top-20 right-0 w-72 h-72 bg-seafoam-100/30 rounded-full blur-3xl" />
      <div className="container-x relative">
        <ScrollReveal animation="fade-up" className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <span className="section-eyebrow">Latest News</span>
            <h2 className="section-title">
              From our team &amp; <span className="gradient-text">community</span>
            </h2>
          </div>
          <Link to="/news" className="flex items-center gap-1.5 text-teal-deep font-medium text-sm hover:underline whitespace-nowrap">
            All Articles <ArrowRight className="w-4 h-4" />
          </Link>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6">
          {preview.map((article, i) => (
            <ScrollReveal key={article.slug} animation="fade-up" delay={i * 100} className="h-full">
              <Link
                to={`/news/${article.slug}`}
                className="group flex flex-col h-full bg-white rounded-3xl overflow-hidden border border-seafoam-50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-400"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={article.image_url}
                    alt={article.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="flex-1 flex flex-col p-6">
                  <div className="flex items-center gap-1.5 mb-3">
                    <Tag className="w-3.5 h-3.5 text-teal-deep" />
                    <span className="text-xs font-semibold text-teal-deep uppercase tracking-wider">{article.category}</span>
                  </div>
                  <h3 className="text-base font-bold text-primary-500 leading-snug group-hover:text-teal-deep transition-colors flex-1">
                    {article.title}
                  </h3>
                  <div className="mt-4 flex items-center justify-between text-xs text-slate-brand">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {formatDate(article.date)}
                    </span>
                    <span className="flex items-center gap-1 text-teal-deep font-medium">
                      Read <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
