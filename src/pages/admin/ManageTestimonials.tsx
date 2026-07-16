import { Loader, Edit2, Trash2, X, AlertCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { dbService, Testimonial } from '../../services/dbService';
import { Plus, Pencil, Trash, XLg, Upload, ArrowClockwise, Star, ExclamationCircle } from 'react-bootstrap-icons';

export default function ManageTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form states
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [quote, setQuote] = useState('');
  const [rating, setRating] = useState<number>(5);
  const [imageUrl, setImageUrl] = useState('');
  const [isVisible, setIsVisible] = useState(true);

  // Upload states
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  async function fetchTestimonials() {
    setLoading(true);
    try {
      const data = await dbService.getTestimonials({ includeHidden: true });
      setTestimonials(data);
    } catch (err) {
      console.error('Error fetching testimonials:', err);
    } finally {
      setLoading(false);
    }
  }

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
        .from('testimonials-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('testimonials-images')
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
    setName('');
    setRole('');
    setQuote('');
    setRating(5);
    setImageUrl('');
    setIsVisible(true);
    setModalOpen(true);
  };

  const handleOpenEdit = (t: Testimonial) => {
    setEditingId(t.id);
    setName(t.name);
    setRole(t.role);
    setQuote(t.quote);
    setRating(t.rating);
    setImageUrl(t.image_url);
    setIsVisible(t.is_visible ?? true);
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageUrl) {
      alert('Please upload an avatar image or provide a URL');
      return;
    }

    const payload = {
      name,
      role,
      image_url: imageUrl,
      quote,
      rating,
      is_visible: isVisible
    };

    try {
      if (editingId) {
        const { error } = await supabase
          .from('testimonials')
          .update(payload)
          .eq('id', editingId);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('testimonials')
          .insert([payload]);
        if (error) throw error;
      }
      setModalOpen(false);
      fetchTestimonials();
    } catch (err: any) {
      console.error('Submit failed:', err);
      alert(err.message || 'Failed to save testimonial.');
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete the testimonial from "${name}"?`)) return;
    try {
      const { error } = await supabase
        .from('testimonials')
        .delete()
        .eq('id', id);
      if (error) throw error;
      fetchTestimonials();
    } catch (err: any) {
      console.error('Delete failed:', err);
      alert(err.message || 'Failed to delete testimonial.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Manage Patient Testimonials</h1>
          <p className="mt-1 text-sm text-slate-400">Review and modify patient testimonials displayed on the homepage.</p>
        </div>
        <button 
          onClick={handleOpenAdd}
          className="btn-primary py-2.5 px-4 bg-teal-500 hover:bg-teal-600 rounded-xl flex items-center gap-1.5 text-sm font-semibold text-white shadow-lg shadow-sm"
        >
          <Plus className="w-4 h-4" /> Add Testimonial
        </button>
      </div>

      {/* Grid of Testimonials */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader className="w-8 h-8 text-teal-500 animate-spin" />
        </div>
      ) : testimonials.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-20 text-center text-slate-400 text-sm">
          No testimonials found.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t) => (
            <div 
              key={t.id}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-6 relative flex flex-col justify-between shadow-xl"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-0.5 text-amber-400">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${t.is_visible !== false ? 'bg-teal-500/10 text-teal-400' : 'bg-slate-800 text-slate-400'}`}>
                    {t.is_visible !== false ? 'Published' : 'Hidden'}
                  </span>
                </div>
                <p className="text-slate-300 italic">"{t.quote}"</p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img 
                    src={t.image_url} 
                    alt={t.name} 
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-800"
                  />
                  <div>
                    <h3 className="font-bold text-sm text-white">{t.name}</h3>
                    <p className="text-xs text-slate-500">{t.role}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button 
                    onClick={() => handleOpenEdit(t)}
                    className="p-2 rounded-lg bg-teal-500/10 hover:bg-teal-500/20 text-teal-400 transition-all text-xs"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleDelete(t.id, t.name)}
                    className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-all text-xs"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CRUD Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 ">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-lg shadow-2xl relative">
            <div className="p-6 border-b border-slate-800 flex justify-between items-center">
              <h2 className="text-xl font-bold text-white">
                {editingId ? 'Edit Testimonial' : 'Add Testimonial'}
              </h2>
              <button 
                onClick={() => setModalOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Patient Name</label>
                <input 
                  type="text" 
                  required 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Achol Deng"
                  className="mt-1 w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:border-teal-500 outline-none transition-all"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Patient Description / Role</label>
                <input 
                  type="text" 
                  required 
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="e.g. Maternity Patient (Juba)"
                  className="mt-1 w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:border-teal-500 outline-none transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Rating (Stars)</label>
                  <select 
                    value={rating} 
                    onChange={(e) => setRating(parseInt(e.target.value))}
                    className="mt-1 w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:border-teal-500 outline-none transition-all"
                  >
                    <option value={5}>5 Stars</option>
                    <option value={4}>4 Stars</option>
                    <option value={3}>3 Stars</option>
                    <option value={2}>2 Stars</option>
                    <option value={1}>1 Star</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Avatar Image</label>
                  <div className="mt-1 flex gap-2">
                    <label className="cursor-pointer flex items-center justify-center p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-300 hover:bg-slate-800 hover:text-white transition-all">
                      {uploading ? (
                        <Loader className="w-4 h-4 animate-spin text-teal-400" />
                      ) : (
                        <Upload className="w-4 h-4" />
                      )}
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
                      placeholder="Or enter image URL"
                      className="flex-1 px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:border-teal-500 outline-none transition-all"
                    />
                  </div>
                  {uploadError && (
                    <div className="mt-1 text-xs text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {uploadError}
                    </div>
                  )}
                </div>
              </div>

              {imageUrl && (
                <div className="flex items-center gap-3 p-2 bg-slate-950 border border-slate-800 rounded-xl max-w-xs">
                  <img src={imageUrl} alt="Avatar" className="w-12 h-12 rounded-full object-cover" />
                  <span className="text-xs text-slate-500">Avatar preview</span>
                </div>
              )}

              <div>
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Patient Testimonial Quote</label>
                <textarea 
                  required 
                  rows={4} 
                  value={quote}
                  onChange={(e) => setQuote(e.target.value)}
                  placeholder="Paste patient's feedback here..."
                  className="mt-1 w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:border-teal-500 outline-none transition-all resize-none"
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
                    <span className="block text-xs text-slate-400">If unchecked, this testimonial will be hidden from the website but saved in the admin panel.</span>
                  </div>
                </label>
              </div>

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
                  {editingId ? 'Update Testimonial' : 'Save Testimonial'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
