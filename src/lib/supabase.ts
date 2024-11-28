import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bpvwtfizytwcmyzrlubv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJwdnd0Zml6eXR3Y215enJsdWJ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE0OTg5NDgsImV4cCI6MjA0NzA3NDk0OH0.S46GzwZD2LE5sy8aVfMXwFp2VfNqwSD3KNpzCXBPHgw';

export const supabase = createClient(supabaseUrl, supabaseKey);

export type Ticket = {
  id: string;
  event_name: string;
  customer_name: string;
  customer_email: string;
  price: number;
  purchase_date: string;
  status: 'valid' | 'used' | 'cancelled';
};