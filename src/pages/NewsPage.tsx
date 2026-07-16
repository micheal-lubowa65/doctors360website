import { Link } from 'react-router-dom';
import { Calendar, Clock, Tag, ArrowRight, Search } from 'react-bootstrap-icons';
import { useState, useEffect } from 'react';
import ScrollReveal from '../components/ScrollReveal';
import { dbService, Article } from '../services/dbService';

const categories = ['All', 'Community Health', 'Maternal Health', 'Mental Health', 'Child Health', 'Organisational Update', 'Community Stories'];

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default function NewsPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [query, setQuery] = useState('');

  useEffect(() => {
    dbService.getArticles()
      .then(data => {
        setArticles(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching articles:', err);
        setLoading(false);
      });
  }, []);

  const filtered = articles.filter((a) => {
    const matchCat = filter === 'All' || a.category === filter;
    const matchQ = query === '' || a.title.toLowerCase().includes(query.toLowerCase()) || a.excerpt.toLowerCase().includes(query.toLowerCase());
    return matchCat && matchQ;
  });

  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <section className="pt-36 pb-20 bg-gradient-to-br from-primary-500 via-teal-deep to-primary-700 relative overflow-hidden noise-overlay">
        <div className="absolute -top-20 right-0 w-96 h-96 bg-seafoam-300/10 rounded-full blur-3xl " />
        <div className="container-x relative text-center">
          <ScrollReveal animation="fade-up">
            <span className="section-eyebrow text-seafoam-300">News & Blog</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mt-4">
              Stories, insights &amp;<br />
              <span className="gradient-text-seafoam">health knowledge</span>
            </h1>
            <p className="mt-6 text-seafoam-100 text-lg max-w-xl mx-auto leading-relaxed">
              Medical articles, community stories, organisational updates, and health education from the Doctors360 team.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-0 z-30 bg-white/90  border-b border-seafoam-50 shadow-sm py-4">
        <div className="container-x flex flex-col sm:flex-row items-start sm:items-center gap-4">
          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search articles..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-full border border-seafoam-100 text-sm focus:border-teal-light focus:ring-2 focus:ring-teal-light/20 outline-none transition-all"
            />
          </div>
          {/* Category pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${filter === c ? 'bg-primary-500 text-white shadow-md' : 'bg-seafoam-50 text-primary-500 hover:bg-seafoam-100'}`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles grid */}
      <section className="py-16 lg:py-20">
        <div className="container-x">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="w-10 h-10 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : filtered.length === 0 ? (
            <p className="text-center text-slate-brand py-20">No articles found matching your search.</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((article, i) => (
                <ScrollReveal key={article.slug} animation="fade-up" delay={i * 80} className="h-full">
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
                      <div className="flex items-center gap-2 mb-3">
                        <Tag className="w-3.5 h-3.5 text-teal-deep" />
                        <span className="text-xs font-semibold text-teal-deep uppercase tracking-wider">{article.category}</span>
                      </div>
                      <h2 className="text-lg font-bold text-primary-500 leading-snug group-hover:text-teal-deep transition-colors flex-1">{article.title}</h2>
                      <p className="mt-3 text-sm text-slate-brand leading-relaxed line-clamp-3">{article.excerpt}</p>
                      <div className="mt-5 flex items-center justify-between text-xs text-slate-brand">
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{formatDate(article.date)}</span>
                          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{article.read_time}</span>
                        </div>
                        <span className="flex items-center gap-1 text-teal-deep font-medium">
                          Read <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
