/**
 * Email service for sending appointment notifications
 * and newsletter campaigns via Vercel serverless API endpoints.
 */

export interface AppointmentEmailPayload {
  name: string;
  email: string;
  phone: string;
  services: string[];
  date: string;
  message?: string;
}

export interface NewsletterSendResult {
  success: boolean;
  sent?: number;
  failed?: number;
  total?: number;
  message?: string;
}

export const emailService = {
  /**
   * Send an appointment notification email via the API.
   * This calls the /api/send-appointment-email serverless function.
   */
  async sendAppointmentEmail(payload: AppointmentEmailPayload): Promise<{ success: boolean; message?: string }> {
    try {
      const response = await fetch('/api/send-appointment-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error('Email API error:', data);
        return { success: false, message: data.error || 'Failed to send email' };
      }

      return { success: true, message: data.message };
    } catch (error) {
      console.error('Email service error:', error);
      return { success: false, message: 'Network error while sending email' };
    }
  },

  /**
   * Send a newsletter email for a published article to all active subscribers.
   */
  async sendNewsletter(articleId: string): Promise<NewsletterSendResult> {
    try {
      const response = await fetch('/api/send-newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ articleId }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error('Newsletter API error:', data);
        return { success: false, message: data.error || 'Failed to send newsletter' };
      }

      return {
        success: true,
        sent: data.sent,
        failed: data.failed,
        total: data.total,
        message: data.message,
      };
    } catch (error) {
      console.error('Newsletter service error:', error);
      return { success: false, message: 'Network error while sending newsletter' };
    }
  },
};
