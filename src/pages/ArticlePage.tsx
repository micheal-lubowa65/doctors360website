import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, ArrowLeft, Tag, User } from 'lucide-react';
import { articles } from './NewsPage';
import ScrollReveal from '../components/ScrollReveal';

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

function renderMarkdown(text: string) {
  const lines = text.trim().split('\n');
  const elements: React.ReactNode[] = [];
  let key = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.startsWith('## ')) {
      elements.push(<h2 key={key++} className="text-2xl font-bold text-primary-500 mt-8 mb-3">{line.slice(3)}</h2>);
    } else if (line.startsWith('**') && line.endsWith('**')) {
      elements.push(<p key={key++} className="font-semibold text-primary-500 mt-4 mb-1">{line.slice(2, -2)}</p>);
    } else if (line.startsWith('- ')) {
      elements.push(<li key={key++} className="ml-4 text-slate-brand list-disc leading-relaxed">{line.slice(2)}</li>);
    } else if (line.trim() === '') {
      elements.push(<div key={key++} className="h-2" />);
    } else {
      elements.push(<p key={key++} className="text-slate-brand leading-relaxed">{line}</p>);
    }
  }
  return elements;
}

export default function ArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 pt-36">
        <h1 className="text-3xl font-bold text-primary-500">Article not found</h1>
        <Link to="/news" className="btn-primary">
          <ArrowLeft className="w-4 h-4" /> Back to News
        </Link>
      </div>
    );
  }

  const related = articles.filter((a) => a.slug !== slug && a.category === article.category).slice(0, 2);

  return (
    <div className="min-h-screen bg-white">

      {/* Hero image */}
      <div className="relative h-[65vh] overflow-hidden">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-700/80 via-primary-500/30 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="container-x pb-12">
            <ScrollReveal animation="fade-up">
              <div className="flex items-center gap-2 mb-4">
                <Tag className="w-3.5 h-3.5 text-seafoam-300" />
                <span className="text-seafoam-300 text-xs font-semibold uppercase tracking-wider">{article.category}</span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight max-w-3xl">
                {article.title}
              </h1>
            </ScrollReveal>
          </div>
        </div>
      </div>

      {/* Meta bar */}
      <div className="border-b border-seafoam-50 bg-seafoam-50/40">
        <div className="container-x py-4 flex flex-wrap items-center gap-5 text-sm text-slate-brand">
          <Link to="/news" className="flex items-center gap-1.5 text-teal-deep hover:underline font-medium">
            <ArrowLeft className="w-4 h-4" /> Back to News
          </Link>
          <span className="flex items-center gap-1.5"><User className="w-4 h-4" /> {article.author}</span>
          <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {formatDate(article.date)}</span>
          <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {article.readTime}</span>
        </div>
      </div>

      {/* Content */}
      <article className="py-14">
        <div className="container-x">
          <div className="max-w-2xl mx-auto">
            <ScrollReveal animation="fade-up">
              <p className="text-xl text-slate-brand leading-relaxed font-medium border-l-4 border-seafoam-300 pl-5 mb-10">
                {article.excerpt}
              </p>
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={100}>
              <div className="prose-like space-y-2">
                {renderMarkdown(article.content)}
              </div>
            </ScrollReveal>

            {/* Author card */}
            <ScrollReveal animation="fade-up" delay={200}>
              <div className="mt-14 p-6 rounded-2xl bg-seafoam-50 border border-seafoam-100 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-teal-deep flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                  {article.author.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-primary-500">Written by {article.author}</p>
                  <p className="text-sm text-slate-brand">Doctors360 Medical Team</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </article>

      {/* Related articles */}
      {related.length > 0 && (
        <section className="py-16 bg-seafoam-50/40 border-t border-seafoam-50">
          <div className="container-x">
            <h2 className="text-2xl font-bold text-primary-500 mb-8">Related Articles</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {related.map((rel) => (
                <Link
                  key={rel.slug}
                  to={`/news/${rel.slug}`}
                  className="group flex gap-4 bg-white rounded-2xl overflow-hidden border border-seafoam-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
                >
                  <div className="w-32 flex-shrink-0 overflow-hidden">
                    <img src={rel.image} alt={rel.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="p-4 flex flex-col justify-center">
                    <span className="text-xs text-teal-deep font-semibold uppercase tracking-wider">{rel.category}</span>
                    <h3 className="mt-1 text-sm font-bold text-primary-500 leading-snug group-hover:text-teal-deep transition-colors">{rel.title}</h3>
                    <span className="mt-2 text-xs text-slate-brand">{formatDate(rel.date)}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-12 bg-primary-500">
        <div className="container-x flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold text-white">Need medical advice or an appointment?</h3>
            <p className="text-seafoam-100 text-sm mt-1">Our team is available Mon–Sat, 8 AM–10 PM.</p>
          </div>
          <a href="/#contact" className="btn-secondary whitespace-nowrap">Book an Appointment</a>
        </div>
      </section>
    </div>
  );
}
