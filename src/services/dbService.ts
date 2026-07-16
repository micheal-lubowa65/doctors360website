import { supabase } from '../lib/supabaseClient';

export interface Article {
  id: string;
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  content: string;
  read_time: string;
  image_url: string;
  author: string;
  date: string;
  created_at: string;
  is_visible?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  image_url: string;
  quote: string;
  rating: number;
  created_at: string;
  is_visible?: boolean;
}

export interface GalleryImage {
  id: string;
  title: string;
  category: string;
  image_url: string;
  created_at: string;
  is_visible?: boolean;
}

export interface Program {
  id: string;
  title: string;
  tag: string;
  description: string;
  impact: string[];
  image_url: string;
  icon_name: string;
  created_at: string;
  is_visible?: boolean;
}

export interface DonationSubmission {
  name: string;
  email: string;
  type: string;
  amount?: string;
  message?: string;
}

export interface AppointmentSubmission {
  name: string;
  email: string;
  phone: string;
  services: string[];
  date: string;
  message?: string;
}

interface FetchOptions {
  includeHidden?: boolean;
}

// 1. Articles Service
export const dbService = {
  async getArticles(options: FetchOptions = {}): Promise<Article[]> {
    let query = supabase.from('news_blogs').select('*').order('date', { ascending: false });
    if (!options.includeHidden) {
      query = query.eq('is_visible', true);
    }
    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  },

  async getLatestArticles(limit = 3, options: FetchOptions = {}): Promise<Article[]> {
    let query = supabase.from('news_blogs').select('*').order('date', { ascending: false }).limit(limit);
    if (!options.includeHidden) {
      query = query.eq('is_visible', true);
    }
    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  },

  async getArticleBySlug(slug: string, options: FetchOptions = {}): Promise<Article | null> {
    let query = supabase.from('news_blogs').select('*').eq('slug', slug);
    if (!options.includeHidden) {
      query = query.eq('is_visible', true);
    }
    const { data, error } = await query.single();
    if (error) {
      if (error.code === 'PGRST116') return null;
      throw error;
    }
    return data;
  },

  // 2. Testimonials Service
  async getTestimonials(options: FetchOptions = {}): Promise<Testimonial[]> {
    let query = supabase.from('testimonials').select('*').order('created_at', { ascending: true });
    if (!options.includeHidden) {
      query = query.eq('is_visible', true);
    }
    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  },

  // 3. Gallery Service
  async getGalleryImages(options: FetchOptions = {}): Promise<GalleryImage[]> {
    let query = supabase.from('gallery_images').select('*').order('created_at', { ascending: true });
    if (!options.includeHidden) {
      query = query.eq('is_visible', true);
    }
    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  },

  // 4. Programs Service
  async getPrograms(options: FetchOptions = {}): Promise<Program[]> {
    let query = supabase.from('programs').select('*').order('created_at', { ascending: true });
    if (!options.includeHidden) {
      query = query.eq('is_visible', true);
    }
    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  },

  // 5. Submit Donation
  async submitDonation(donation: DonationSubmission): Promise<any> {
    const { data, error } = await supabase.from('donations').insert([donation]).select();
    if (error) throw error;
    return data;
  },

  // 6. Submit Appointment Request
  async submitAppointment(appointment: AppointmentSubmission): Promise<any> {
    const { data, error } = await supabase.from('requested_appointments').insert([appointment]).select();
    if (error) throw error;
    return data;
  }
};
