import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function createApiMiddleware(route: string, handlerPath: string): Plugin['configureServer'] {
  const absolutePath = path.resolve(__dirname, handlerPath);
  const fileUrl = pathToFileURL(absolutePath).href;
  return (server) => {
    server.middlewares.use(route, async (req, res) => {
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

        const { default: handler } = await import(fileUrl);
        await handler(req, response);
      } catch (error: any) {
        console.error(`${route} API error:`, error);
        if (!res.headersSent) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
        }
        res.end(JSON.stringify({ error: error?.message || `Failed to handle ${route}` }));
      }
    });
  };
}

function apiRoutes(): Plugin {
  return {
    name: 'api-routes',
    configureServer(server) {
      createApiMiddleware('/api/send-appointment-email', './api/send-appointment-email.js')(server);
      createApiMiddleware('/api/send-newsletter', './api/send-newsletter.js')(server);
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  Object.assign(process.env, loadEnv(mode, process.cwd(), ''));
  Object.assign(process.env, loadEnv(mode, process.cwd(), 'SMTP_'));

  return {
    plugins: [react(), apiRoutes()],
    optimizeDeps: {
      include: ['prop-types', 'react-simple-maps', 'd3-geo']
    },
  };
});
