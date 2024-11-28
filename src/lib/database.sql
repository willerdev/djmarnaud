-- Enable Row Level Security
ALTER TABLE tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Create tickets table
CREATE TABLE tickets (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    event_name TEXT NOT NULL,
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    customer_address TEXT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    purchase_date TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('UTC'::TEXT, NOW()) NOT NULL,
    status TEXT DEFAULT 'valid' CHECK (status IN ('valid', 'used', 'cancelled')),
    payment_method TEXT CHECK (payment_method IN ('momo', 'card')),
    payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'completed', 'failed')),
    ticket_type TEXT NOT NULL,
    event_date TIMESTAMP WITH TIME ZONE NOT NULL
);

-- Create events table for tours and performances
CREATE TABLE events (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    date TIMESTAMP WITH TIME ZONE NOT NULL,
    venue TEXT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    capacity INTEGER NOT NULL,
    available_tickets INTEGER NOT NULL,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('UTC'::TEXT, NOW())
);

-- Create policies for public access
CREATE POLICY "Enable read access for all users" ON events FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON tickets FOR SELECT USING (true);
CREATE POLICY "Enable insert for all users" ON tickets FOR INSERT WITH CHECK (true);

-- Create policy for admin access
CREATE POLICY "Enable all access for authenticated users" ON events FOR ALL USING (
    auth.role() = 'authenticated'
);

-- Insert sample events
INSERT INTO events (title, description, date, venue, price, capacity, available_tickets, image_url) VALUES
('Summer Healing Session', 'Experience the power of music therapy in this intimate session', '2024-07-15 19:00:00+00', 'Zen Garden', 50.00, 30, 30, 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4'),
('Deep Meditation Night', 'A journey through therapeutic soundscapes', '2024-08-01 20:00:00+00', 'The Sanctuary', 75.00, 40, 40, 'https://images.unsplash.com/photo-1519389950473-47ba0277781c'),
('Energy Flow Experience', 'Uplifting beats and healing frequencies', '2024-08-15 19:30:00+00', 'Harmony Hall', 60.00, 50, 50, 'https://images.unsplash.com/photo-1511379938547-c1f69419868d');