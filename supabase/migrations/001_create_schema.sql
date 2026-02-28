-- Tahdhir تحذير - Database Schema
-- Run this in your Supabase SQL Editor

-- 1. Regions (7 Emirates)
CREATE TABLE public.regions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name_en TEXT NOT NULL,
  name_ar TEXT NOT NULL,
  code TEXT UNIQUE NOT NULL,
  center_lat DOUBLE PRECISION NOT NULL,
  center_lng DOUBLE PRECISION NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Cities
CREATE TABLE public.cities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name_en TEXT NOT NULL,
  name_ar TEXT NOT NULL,
  lat DOUBLE PRECISION NOT NULL,
  lng DOUBLE PRECISION NOT NULL,
  region_id UUID REFERENCES public.regions(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_cities_region ON public.cities(region_id);
CREATE INDEX idx_cities_name_en ON public.cities(name_en);
CREATE INDEX idx_cities_name_ar ON public.cities(name_ar);

-- 3. Alerts
CREATE TYPE alert_severity AS ENUM ('critical', 'warning', 'info');
CREATE TYPE alert_status AS ENUM ('active', 'expired', 'resolved');

CREATE TABLE public.alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title_en TEXT NOT NULL,
  title_ar TEXT,
  description_en TEXT,
  description_ar TEXT,
  severity alert_severity NOT NULL DEFAULT 'warning',
  status alert_status NOT NULL DEFAULT 'active',
  event_type TEXT,
  lat DOUBLE PRECISION NOT NULL,
  lng DOUBLE PRECISION NOT NULL,
  radius_km DOUBLE PRECISION DEFAULT 5.0,
  source_url TEXT,
  source_text TEXT,
  detected_at TIMESTAMPTZ DEFAULT now(),
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_alerts_status ON public.alerts(status);
CREATE INDEX idx_alerts_severity ON public.alerts(severity);
CREATE INDEX idx_alerts_detected_at ON public.alerts(detected_at DESC);

-- 4. Alert-Cities junction
CREATE TABLE public.alert_cities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  alert_id UUID REFERENCES public.alerts(id) ON DELETE CASCADE,
  city_id UUID REFERENCES public.cities(id) ON DELETE CASCADE,
  region_id UUID REFERENCES public.regions(id) ON DELETE CASCADE,
  UNIQUE(alert_id, city_id)
);

CREATE INDEX idx_alert_cities_alert ON public.alert_cities(alert_id);
CREATE INDEX idx_alert_cities_city ON public.alert_cities(city_id);

-- 5. Geocode cache
CREATE TABLE public.geocode_cache (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  query TEXT UNIQUE NOT NULL,
  lat DOUBLE PRECISION NOT NULL,
  lng DOUBLE PRECISION NOT NULL,
  formatted_address TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 6. Processed tweets (deduplication)
CREATE TABLE public.processed_tweets (
  tweet_id TEXT PRIMARY KEY,
  processed_at TIMESTAMPTZ DEFAULT now(),
  is_alert BOOLEAN DEFAULT false
);

-- 7. Enable Realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.alerts;

-- 8. RLS Policies
ALTER TABLE public.regions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.alert_cities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.geocode_cache ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.processed_tweets ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Anyone can read regions" ON public.regions FOR SELECT USING (true);
CREATE POLICY "Anyone can read cities" ON public.cities FOR SELECT USING (true);
CREATE POLICY "Anyone can read alerts" ON public.alerts FOR SELECT USING (true);
CREATE POLICY "Anyone can read alert_cities" ON public.alert_cities FOR SELECT USING (true);

-- Service role write access (for cron jobs)
CREATE POLICY "Service can insert regions" ON public.regions FOR INSERT WITH CHECK (true);
CREATE POLICY "Service can insert cities" ON public.cities FOR INSERT WITH CHECK (true);
CREATE POLICY "Service can manage alerts" ON public.alerts FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service can manage alert_cities" ON public.alert_cities FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service can manage geocode_cache" ON public.geocode_cache FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service can manage processed_tweets" ON public.processed_tweets FOR ALL USING (true) WITH CHECK (true);
