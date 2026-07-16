import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { dbService, Program } from '../../services/dbService';
import { Plus, Pencil, Trash, XLg, Upload, ArrowClockwise, ExclamationCircle, QuestionCircle } from 'react-bootstrap-icons';
import { Loader, HelpCircle, Edit2, Trash2, X, AlertCircle, Globe, HeartHandshake, BookOpen, Users, Flame, Home } from 'lucide-react';

const iconMap: Record<string, any> = {
  Globe,
  HeartHandshake,
  BookOpen,
  Users,
  Flame,
  Home
};

export default function ManagePrograms() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form states
  const [title, setTitle] = useState('');
  const [tag, setTag] = useState('');
  const [description, setDescription] = useState('');
  const [impactInput, setImpactInput] = useState(''); // Textarea split by newline
  const [imageUrl, setImageUrl] = useState('');
  const [iconName, setIconName] = useState('Globe');
  const [isVisible, setIsVisible] = useState(true);

  // Upload states
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const availableIcons = [
    { name: 'Global / Climate', value: 'Globe' },
    { name: 'Partnership / Care', value: 'HeartHandshake' },
    { name: 'Education / Digital', value: 'BookOpen' },
    { name: 'Community Outreach', value: 'Users' },
    { name: 'Medical Emergency', value: 'Flame' },
    { name: 'Hospital Care', value: 'Home' }
  ];

  useEffect(() => {
    fetchPrograms();
  }, []);

  async function fetchPrograms() {
    setLoading(true);
    try {
      const data = await dbService.getPrograms({ includeHidden: true });
      setPrograms(data);
    } catch (err) {
      console.error('Error fetching programs:', err);
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
        .from('programs-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('programs-images')
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
    setTag('');
    setDescription('');
    setImpactInput('');
    setImageUrl('');
    setIconName('Globe');
    setIsVisible(true);
    setModalOpen(true);
  };

  const handleOpenEdit = (p: Program) => {
    setEditingId(p.id);
    setTitle(p.title);
    setTag(p.tag);
    setDescription(p.description);
    setImpactInput(p.impact.join('\n'));
    setImageUrl(p.image_url);
    setIconName(p.icon_name);
    setIsVisible(p.is_visible ?? true);
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageUrl) {
      alert('Please upload a program cover image or provide a URL');
      return;
    }

    const impact = impactInput
      .split('\n')
      .map(p => p.trim())
      .filter(p => p.length > 0);

    const payload = {
      title,
      tag,
      description,
      impact,
      image_url: imageUrl,
      icon_name: iconName,
      is_visible: isVisible
    };

    try {
      if (editingId) {
        const { error } = await supabase
          .from('programs')
          .update(payload)
          .eq('id', editingId);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('programs')
          .insert([payload]);
        if (error) throw error;
      }
      setModalOpen(false);
      fetchPrograms();
    } catch (err: any) {
      console.error('Submit failed:', err);
      alert(err.message || 'Failed to save program.');
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete the program "${title}"?`)) return;
    try {
      const { error } = await supabase
        .from('programs')
        .delete()
        .eq('id', id);
      if (error) throw error;
      fetchPrograms();
    } catch (err: any) {
      console.error('Delete failed:', err);
      alert(err.message || 'Failed to delete program.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Manage Hospital Programs</h1>
          <p className="mt-1 text-sm text-slate-400">Add or edit active community health programs and NGO proposals.</p>
        </div>
        <button 
          onClick={handleOpenAdd}
          className="btn-primary py-2.5 px-4 bg-teal-500 hover:bg-teal-600 rounded-xl flex items-center gap-1.5 text-sm font-semibold text-white shadow-lg shadow-sm"
        >
          <Plus className="w-4 h-4" /> Add Program
        </button>
      </div>

      {/* Grid of Programs */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader className="w-8 h-8 text-teal-500 animate-spin" />
        </div>
      ) : programs.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-20 text-center text-slate-400 text-sm">
          No programs found.
        </div>
      ) : (
        <div className="space-y-4">
          {programs.map((p) => {
            const IconComponent = iconMap[p.icon_name] || HelpCircle;
            return (
              <div 
                key={p.id}
                className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="flex items-start gap-4 flex-1">
                  <span className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-500 to-teal-deep text-white shadow-md">
                    <IconComponent className="w-6 h-6" />
                  </span>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-teal-400 text-xs font-semibold uppercase tracking-wider">
                        {p.tag}
                      </span>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${p.is_visible !== false ? 'bg-teal-500/10 text-teal-400' : 'bg-slate-800 text-slate-400'}`}>
                        {p.is_visible !== false ? 'Published' : 'Hidden'}
                      </span>
                      <h3 className="font-bold text-lg text-white">{p.title}</h3>
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed max-w-2xl line-clamp-2">{p.description}</p>
                    <div className="flex flex-wrap gap-x-4 gap-y-1">
                      {p.impact.map((point) => (
                        <span key={point} className="text-xs text-teal-300 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                          {point}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 flex-shrink-0 border-t md:border-t-0 border-slate-800/80 pt-4 md:pt-0">
                  <img src={p.image_url} alt="Cover" className="w-20 h-14 object-cover rounded-xl border border-slate-800" />
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleOpenEdit(p)}
                      className="p-2.5 rounded-xl bg-teal-500/10 hover:bg-teal-500/20 text-teal-400 transition-all text-xs"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDelete(p.id, p.title)}
                      className="p-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-all text-xs"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* CRUD Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4  overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-2xl shadow-2xl relative">
            <div className="p-6 border-b border-slate-800 flex justify-between items-center">
              <h2 className="text-xl font-bold text-white">
                {editingId ? 'Edit NGO Program' : 'Add NGO Program'}
              </h2>
              <button 
                onClick={() => setModalOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Program Title</label>
                  <input 
                    type="text" 
                    required 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. PEN-Plus NCD Clinic"
                    className="mt-1 w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:border-teal-500 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Tag Category</label>
                  <input 
                    type="text" 
                    required 
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                    placeholder="e.g. NCD Care"
                    className="mt-1 w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:border-teal-500 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider"> Lucide Icon Representation</label>
                  <select 
                    value={iconName} 
                    onChange={(e) => setIconName(e.target.value)}
                    className="mt-1 w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:border-teal-500 outline-none transition-all"
                  >
                    {availableIcons.map((i) => <option key={i.value} value={i.value}>{i.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Program Cover Photo</label>
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
                <div className="rounded-xl border border-slate-800 p-2 max-w-sm">
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider block mb-1">Image Preview</span>
                  <img src={imageUrl} alt="Preview" className="w-full h-32 object-cover rounded-lg" />
                </div>
              )}

              <div>
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Description</label>
                <textarea 
                  required 
                  rows={4} 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the program objectives, location, and status..."
                  className="mt-1 w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:border-teal-500 outline-none transition-all resize-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Key Impact Metrics (one per line)</label>
                <textarea 
                  required 
                  rows={3} 
                  value={impactInput}
                  onChange={(e) => setImpactInput(e.target.value)}
                  placeholder="e.g.
WHO-endorsed PEN-Plus model
Specialist-level NCD care
10 clinics established"
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
                    <span className="block text-xs text-slate-400">If unchecked, this program will be hidden from the website but saved in the admin panel.</span>
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
                  {editingId ? 'Update Program' : 'Save Program'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
