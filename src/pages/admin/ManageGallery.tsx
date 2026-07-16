import { Loader, Edit2, Trash2, X, AlertCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { dbService, GalleryImage } from '../../services/dbService';
import { Plus, Pencil, Trash, XLg, Upload, ArrowClockwise, ExclamationCircle } from 'react-bootstrap-icons';

export default function ManageGallery() {
  const [gallery, setGallery] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form states
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Medical Centre');
  const [imageUrl, setImageUrl] = useState('');
  const [isVisible, setIsVisible] = useState(true);

  // Upload states
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const categories = [
    'Medical Centre',
    'Partnerships',
    'Community Outreach',
    'Clinical Operations'
  ];

  useEffect(() => {
    fetchGallery();
  }, []);

  async function fetchGallery() {
    setLoading(true);
    try {
      const data = await dbService.getGalleryImages({ includeHidden: true });
      setGallery(data);
    } catch (err) {
      console.error('Error fetching gallery:', err);
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
        .from('gallery-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('gallery-images')
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
    setCategory('Medical Centre');
    setImageUrl('');
    setIsVisible(true);
    setModalOpen(true);
  };

  const handleOpenEdit = (img: GalleryImage) => {
    setEditingId(img.id);
    setTitle(img.title);
    setCategory(img.category);
    setImageUrl(img.image_url);
    setIsVisible(img.is_visible ?? true);
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageUrl) {
      alert('Please upload a gallery image or provide a URL');
      return;
    }

    const payload = {
      title,
      category,
      image_url: imageUrl,
      is_visible: isVisible
    };

    try {
      if (editingId) {
        const { error } = await supabase
          .from('gallery_images')
          .update(payload)
          .eq('id', editingId);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('gallery_images')
          .insert([payload]);
        if (error) throw error;
      }
      setModalOpen(false);
      fetchGallery();
    } catch (err: any) {
      console.error('Submit failed:', err);
      alert(err.message || 'Failed to save gallery item.');
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;
    try {
      const { error } = await supabase
        .from('gallery_images')
        .delete()
        .eq('id', id);
      if (error) throw error;
      fetchGallery();
    } catch (err: any) {
      console.error('Delete failed:', err);
      alert(err.message || 'Failed to delete gallery item.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Manage Photo Gallery</h1>
          <p className="mt-1 text-sm text-slate-400">Add, edit, or delete items within the visual work showcase.</p>
        </div>
        <button 
          onClick={handleOpenAdd}
          className="btn-primary py-2.5 px-4 bg-teal-500 hover:bg-teal-600 rounded-xl flex items-center gap-1.5 text-sm font-semibold text-white shadow-lg shadow-sm"
        >
          <Plus className="w-4 h-4" /> Add Photo
        </button>
      </div>

      {/* Grid of gallery */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader className="w-8 h-8 text-teal-500 animate-spin" />
        </div>
      ) : gallery.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-20 text-center text-slate-400 text-sm">
          No gallery images found.
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {gallery.map((img) => (
            <div 
              key={img.id}
              className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden group shadow-xl relative"
            >
              <div className="aspect-square w-full overflow-hidden bg-slate-950 flex items-center justify-center">
                <img 
                  src={img.image_url} 
                  alt={img.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-4 space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-teal-400 text-[10px] font-semibold uppercase tracking-wider">
                    {img.category}
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${img.is_visible !== false ? 'bg-teal-500/10 text-teal-400' : 'bg-slate-800 text-slate-400'}`}>
                    {img.is_visible !== false ? 'Published' : 'Hidden'}
                  </span>
                </div>
                <p className="font-semibold text-sm text-white truncate">{img.title}</p>
                
                <div className="pt-2 flex justify-end gap-2 border-t border-slate-800/80">
                  <button 
                    onClick={() => handleOpenEdit(img)}
                    className="p-2 rounded-lg bg-teal-500/10 hover:bg-teal-500/20 text-teal-400 transition-all text-xs"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button 
                    onClick={() => handleDelete(img.id, img.title)}
                    className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-all text-xs"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
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
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-md shadow-2xl relative">
            <div className="p-6 border-b border-slate-800 flex justify-between items-center">
              <h2 className="text-xl font-bold text-white">
                {editingId ? 'Edit Photo Details' : 'Add Photo to Gallery'}
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
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Photo Description / Title</label>
                <input 
                  type="text" 
                  required 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Outreach Clinic in Wakiso"
                  className="mt-1 w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:border-teal-500 outline-none transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
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
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Upload File</label>
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
                      placeholder="Or URL"
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
                <div className="rounded-xl border border-slate-800 p-2 max-w-sm">
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider block mb-1">Image Preview</span>
                  <img src={imageUrl} alt="Preview" className="w-full h-40 object-cover rounded-lg" />
                </div>
              )}

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
                    <span className="block text-xs text-slate-400">If unchecked, this photo will be hidden from the website but saved in the admin panel.</span>
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
                  {editingId ? 'Update Photo' : 'Add to Gallery'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
