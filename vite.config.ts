import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

function appointmentEmailApi(): Plugin {
  return {
    name: 'appointment-email-api',
    configureServer(server) {
      server.middlewares.use('/api/send-appointment-email', async (req, res) => {
        try {
          const chunks: Buffer[] = [];
          for await (const chunk of req) {
            chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
          }

          const body = Buffer.concat(chunks).toString('utf8');
          (req as typeof req & { body?: unknown }).body = body ? JSON.parse(body) : {};

          const response = Object.assign(res, {
            status(code: number) {
              res.statusCode = code;
              return response;
            },
            json(payload: unknown) {
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify(payload));
            },
          });

          const { default: handler } = await import('./api/send-appointment-email.js');
          await handler(req, response);
        } catch (error) {
          console.error('Appointment email API error:', error);
          if (!res.headersSent) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
          }
          res.end(JSON.stringify({ error: 'Failed to send appointment email' }));
        }
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  Object.assign(process.env, loadEnv(mode, process.cwd(), 'SMTP_'));

  return {
    plugins: [react(), appointmentEmailApi()],
    optimizeDeps: {
      include: ['prop-types', 'react-simple-maps', 'd3-geo']
    },
  };
});
