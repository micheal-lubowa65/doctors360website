import { AlertCircle, Loader, Edit2, Trash2, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { dbService, Article } from '../../services/dbService';
import { Plus, Pencil, Trash, XLg, Upload, ArrowClockwise, Calendar, Eye, Search, ExclamationCircle } from 'react-bootstrap-icons';

export default function ManageNews() {
  const [blogs, setBlogs] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Form states
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState('Community Health');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [readTime, setReadTime] = useState('5 min read');
  const [author, setAuthor] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [isVisible, setIsVisible] = useState(true);

  // Upload state
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const categories = [
    'Community Health',
    'Maternal Health',
    'Mental Health',
    'Child Health',
    'Organisational Update',
    'Community Stories'
  ];

  useEffect(() => {
    fetchBlogs();
  }, []);

  async function fetchBlogs() {
    setLoading(true);
    try {
      const data = await dbService.getArticles({ includeHidden: true });
      setBlogs(data);
    } catch (err) {
      console.error('Error loading blogs:', err);
    } finally {
      setLoading(false);
    }
  }

  // Auto-generate slug from title
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTitle(val);
    if (!editingId) {
      setSlug(
        val
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, '')
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-')
      );
    }
  };

  // Image upload handler
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    const file = files[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `uploads/${fileName}`;

    setUploading(true);
    setUploadError(null);

    try {
      const { error: uploadError } = await supabase.storage
        .from('news-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('news-images')
        .getPublicUrl(filePath);

      setImageUrl(publicUrl);
    } catch (err: any) {
      console.error('Upload failed:', err);
      setUploadError(err.message || 'Image upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleOpenAdd = () => {
    setEditingId(null);
    setTitle('');
    setSlug('');
    setCategory('Community Health');
    setExcerpt('');
    setContent('');
    setReadTime('5 min read');
    setAuthor('');
    setImageUrl('');
    setDate(new Date().toISOString().split('T')[0]);
    setIsVisible(true);
    setModalOpen(true);
  };

  const handleOpenEdit = (article: Article) => {
    setEditingId(article.id);
    setTitle(article.title);
    setSlug(article.slug);
    setCategory(article.category);
    setExcerpt(article.excerpt);
    setContent(article.content);
    setReadTime(article.read_time);
    setAuthor(article.author);
    setImageUrl(article.image_url);
    setDate(new Date(article.date).toISOString().split('T')[0]);
    setIsVisible(article.is_visible ?? true);
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageUrl) {
      alert('Please upload or provide an image URL');
      return;
    }

    const payload = {
      slug,
      category,
      title,
      excerpt,
      content,
      read_time: readTime,
      image_url: imageUrl,
      author,
      date,
      is_visible: isVisible
    };

    try {
      if (editingId) {
        const { error } = await supabase
          .from('news_blogs')
          .update(payload)
          .eq('id', editingId);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('news_blogs')
          .insert([payload]);
        if (error) throw error;
      }
      setModalOpen(false);
      fetchBlogs();
    } catch (err: any) {
      console.error('Submit failed:', err);
      alert(err.message || 'Failed to save article.');
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;
    try {
      const { error } = await supabase
        .from('news_blogs')
        .delete()
        .eq('id', id);
      if (error) throw error;
      fetchBlogs();
    } catch (err: any) {
      console.error('Delete failed:', err);
      alert(err.message || 'Failed to delete article.');
    }
  };

  const filteredBlogs = blogs.filter(
    (b) =>
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Manage News & Blogs</h1>
          <p className="mt-1 text-sm text-slate-400">Create, edit, or delete Doctors360 news posts.</p>
        </div>
        <button 
          onClick={handleOpenAdd}
          className="btn-primary py-2.5 px-4 bg-teal-500 hover:bg-teal-600 rounded-xl flex items-center gap-1.5 text-sm font-semibold text-white shadow-lg shadow-sm"
        >
          <Plus className="w-4 h-4" /> Add New Story
        </button>
      </div>

      {/* Search and Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input 
            type="text" 
            placeholder="Search stories..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none transition-all"
          />
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader className="w-8 h-8 text-teal-500 animate-spin" />
          </div>
        ) : filteredBlogs.length === 0 ? (
          <p className="text-slate-400 text-center py-20 text-sm">No stories found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-950/60 text-slate-400 text-xs font-semibold uppercase tracking-wider border-b border-slate-800">
                <tr>
                  <th className="px-6 py-4 rounded-tl-2xl">Story Title</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Author</th>
                  <th className="px-6 py-4">Date Published</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 rounded-tr-2xl text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredBlogs.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-800/20 transition-all">
                    <td className="px-6 py-4 font-semibold text-white max-w-xs truncate">{b.title}</td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-teal-400 text-xs font-semibold">
                        {b.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">{b.author}</td>
                    <td className="px-6 py-4 flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-slate-500" />
                      {new Date(b.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${b.is_visible !== false ? 'bg-teal-500/10 text-teal-400' : 'bg-slate-800 text-slate-400'}`}>
                        {b.is_visible !== false ? 'Published' : 'Hidden'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <a 
                        href={`/news/${b.slug}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all"
                        title="View Live"
                      >
                        <Eye className="w-4 h-4" />
                      </a>
                      <button 
                        onClick={() => handleOpenEdit(b)}
                        className="p-2 rounded-lg bg-teal-500/10 hover:bg-teal-500/20 text-teal-400 transition-all"
                        title="Edit Story"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(b.id, b.title)}
                        className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-all"
                        title="Delete Story"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* CRUD Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4  overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl relative">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-800 flex justify-between items-center">
              <h2 className="text-xl font-bold text-white">
                {editingId ? 'Edit Story / Blog Post' : 'Add New Story / Blog Post'}
              </h2>
              <button 
                onClick={() => setModalOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Title</label>
                  <input 
                    type="text" 
                    required 
                    value={title} 
                    onChange={handleTitleChange}
                    placeholder="e.g. Health Education in Juba"
                    className="mt-1 w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:border-teal-500 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Slug</label>
                  <input 
                    type="text" 
                    required 
                    value={slug} 
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="e.g. health-education-in-juba"
                    className="mt-1 w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:border-teal-500 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Category</label>
                  <select 
                    value={category} 
                    onChange={(e) => setCategory(e.target.value)}
                    className="mt-1 w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:border-teal-500 outline-none transition-all"
                  >
                    {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Author Name</label>
                  <input 
                    type="text" 
                    required 
                    value={author} 
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="e.g. Dr. Sarah Machar"
                    className="mt-1 w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:border-teal-500 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Read Time Estimate</label>
                  <input 
                    type="text" 
                    required 
                    value={readTime} 
                    onChange={(e) => setReadTime(e.target.value)}
                    placeholder="e.g. 5 min read"
                    className="mt-1 w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:border-teal-500 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Publish Date</label>
                  <input 
                    type="date" 
                    required 
                    value={date} 
                    onChange={(e) => setDate(e.target.value)}
                    className="mt-1 w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:border-teal-500 outline-none transition-all [color-scheme:dark]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Uploader Image / Cover Photo</label>
                  <div className="mt-1 flex items-center gap-3">
                    <label className="cursor-pointer flex items-center justify-center gap-1.5 px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-300 hover:bg-slate-800 hover:text-white transition-all">
                      {uploading ? (
                        <Loader className="w-4 h-4 animate-spin text-teal-400" />
                      ) : (
                        <Upload className="w-4 h-4" />
                      )}
                      Upload Image
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleImageUpload} 
                        className="hidden" 
                        disabled={uploading}
                      />
                    </label>
                    <input 
                      type="text" 
                      required 
                      value={imageUrl} 
                      onChange={(e) => setImageUrl(e.target.value)}
                      placeholder="Or enter image URL directly"
                      className="flex-1 px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:border-teal-500 outline-none transition-all"
                    />
                  </div>
                  {uploadError && (
                    <div className="mt-2 text-xs text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {uploadError}
                    </div>
                  )}
                </div>
              </div>

              {imageUrl && (
                <div className="rounded-xl border border-slate-800 p-2 max-w-sm">
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider block mb-1">Image Preview</span>
                  <img src={imageUrl} alt="Preview" className="w-full h-40 object-cover rounded-lg" />
                </div>
              )}

              <div>
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Short Excerpt (Teaser description)</label>
                <input 
                  type="text" 
                  required 
                  value={excerpt} 
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="A short summary of the article..."
                  className="mt-1 w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:border-teal-500 outline-none transition-all"
                />
              </div>

              <div>
                <label className="flex items-center gap-3 cursor-pointer p-4 rounded-xl border border-slate-800 bg-slate-950/50 hover:bg-slate-900 transition-all">
                  <input 
                    type="checkbox" 
                    checked={isVisible}
                    onChange={(e) => setIsVisible(e.target.checked)}
                    className="w-5 h-5 rounded border-slate-700 bg-slate-900 text-teal-500 focus:ring-teal-500 focus:ring-offset-slate-950"
                  />
                  <div>
                    <span className="block text-sm font-semibold text-white">Visible to Public</span>
                    <span className="block text-xs text-slate-400">If unchecked, this story will be hidden from the website but saved in the admin panel.</span>
                  </div>
                </label>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Full Story Content (Markdown format supported)</label>
                <textarea 
                  required 
                  rows={10} 
                  value={content} 
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write the full post here..."
                  className="mt-1 w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:border-teal-500 outline-none transition-all resize-none font-mono"
                />
              </div>

              {/* Modal Actions */}
              <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
                <button 
                  type="button" 
                  onClick={() => setModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-slate-800 hover:bg-slate-800 text-sm font-semibold text-slate-400 hover:text-white transition-all"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={uploading}
                  className="px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-600 text-sm font-semibold text-white shadow-lg shadow-sm transition-all disabled:opacity-50"
                >
                  {editingId ? 'Update Story' : 'Publish Story'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
}
