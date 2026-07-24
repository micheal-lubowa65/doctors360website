const { Client } = require('pg');

const client = new Client({
  host: process.env.SUPABASE_DB_HOST || 'aws-0-eu-west-1.pooler.supabase.com',
  port: parseInt(process.env.SUPABASE_DB_PORT || '6543', 10),
  database: process.env.SUPABASE_DB_NAME || 'postgres',
  user: process.env.SUPABASE_DB_USER,
  password: process.env.SUPABASE_DB_PASSWORD,
  ssl: {
    rejectUnauthorized: false,
  },
});

async function setupSubscribers() {
  if (!process.env.SUPABASE_DB_USER || !process.env.SUPABASE_DB_PASSWORD) {
    console.error('Missing SUPABASE_DB_USER or SUPABASE_DB_PASSWORD in environment.');
    process.exit(1);
  }

  try {
    await client.connect();
    console.log('Connected to database. Creating subscribers table...');

    await client.query(`
      CREATE TABLE IF NOT EXISTS public.subscribers (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email TEXT UNIQUE NOT NULL,
        unsubscribed BOOLEAN NOT NULL DEFAULT false,
        unsubscribe_token UUID UNIQUE NOT NULL DEFAULT gen_random_uuid(),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `);
    console.log('Table created or already exists.');

    console.log('Enabling RLS...');
    await client.query(`ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;`);

    console.log('Creating RLS policies...');

    await client.query(`DROP POLICY IF EXISTS "Allow public to subscribe" ON public.subscribers;`);
    await client.query(`DROP POLICY IF EXISTS "Allow authenticated to view subscribers" ON public.subscribers;`);
    await client.query(`DROP POLICY IF EXISTS "Allow anon to unsubscribe" ON public.subscribers;`);
    await client.query(`DROP POLICY IF EXISTS "Allow anon to resubscribe" ON public.subscribers;`);
    await client.query(`DROP POLICY IF EXISTS "Allow authenticated to delete subscribers" ON public.subscribers;`);

    await client.query(`
      CREATE POLICY "Allow public to subscribe"
      ON public.subscribers
      FOR INSERT
      TO public
      WITH CHECK (true);
    `);

    await client.query(`
      CREATE POLICY "Allow authenticated to view subscribers"
      ON public.subscribers
      FOR SELECT
      TO authenticated
      USING (true);
    `);

    await client.query(`
      CREATE POLICY "Allow anon to unsubscribe"
      ON public.subscribers
      FOR UPDATE
      TO anon
      USING (true)
      WITH CHECK (unsubscribed = true);
    `);

    await client.query(`
      CREATE POLICY "Allow anon to resubscribe"
      ON public.subscribers
      FOR UPDATE
      TO anon
      USING (unsubscribed = true)
      WITH CHECK (unsubscribed = false);
    `);

    await client.query(`
      CREATE POLICY "Allow authenticated to delete subscribers"
      ON public.subscribers
      FOR DELETE
      TO authenticated
      USING (true);
    `);

    console.log('Subscribers setup complete!');
  } catch (error) {
    console.error('Error setting up subscribers table:', error);
    process.exit(1);
  } finally {
    await client.end();
  }
}

setupSubscribers();
