-- Seed UAE Regions (7 Emirates)
INSERT INTO public.regions (name_en, name_ar, code, center_lat, center_lng) VALUES
  ('Dubai', 'دبي', 'DXB', 25.2048, 55.2708),
  ('Abu Dhabi', 'أبو ظبي', 'AUH', 24.4539, 54.3773),
  ('Sharjah', 'الشارقة', 'SHJ', 25.3463, 55.4209),
  ('Ajman', 'عجمان', 'AJM', 25.4052, 55.5136),
  ('Umm Al Quwain', 'أم القيوين', 'UAQ', 25.5647, 55.5553),
  ('Ras Al Khaimah', 'رأس الخيمة', 'RAK', 25.7895, 55.9432),
  ('Fujairah', 'الفجيرة', 'FUJ', 25.1288, 56.3265);

-- Seed Dubai districts/cities
INSERT INTO public.cities (name_en, name_ar, lat, lng, region_id) VALUES
  ('Deira', 'ديرة', 25.2697, 55.3095, (SELECT id FROM public.regions WHERE code = 'DXB')),
  ('Bur Dubai', 'بر دبي', 25.2532, 55.2963, (SELECT id FROM public.regions WHERE code = 'DXB')),
  ('Jumeirah', 'جميرا', 25.2048, 55.2388, (SELECT id FROM public.regions WHERE code = 'DXB')),
  ('Dubai Marina', 'مرسى دبي', 25.0805, 55.1403, (SELECT id FROM public.regions WHERE code = 'DXB')),
  ('Downtown Dubai', 'وسط مدينة دبي', 25.1972, 55.2744, (SELECT id FROM public.regions WHERE code = 'DXB')),
  ('Business Bay', 'الخليج التجاري', 25.1851, 55.2618, (SELECT id FROM public.regions WHERE code = 'DXB')),
  ('Palm Jumeirah', 'نخلة جميرا', 25.1124, 55.1390, (SELECT id FROM public.regions WHERE code = 'DXB')),
  ('Al Barsha', 'البرشاء', 25.1134, 55.2006, (SELECT id FROM public.regions WHERE code = 'DXB')),
  ('Jebel Ali', 'جبل علي', 25.0047, 55.0272, (SELECT id FROM public.regions WHERE code = 'DXB')),
  ('Dubai International City', 'المدينة العالمية', 25.1660, 55.4040, (SELECT id FROM public.regions WHERE code = 'DXB')),
  ('Al Quoz', 'القوز', 25.1489, 55.2348, (SELECT id FROM public.regions WHERE code = 'DXB')),
  ('Dubai Silicon Oasis', 'واحة دبي للسيليكون', 25.1254, 55.3781, (SELECT id FROM public.regions WHERE code = 'DXB')),
  ('Karama', 'الكرامة', 25.2446, 55.3038, (SELECT id FROM public.regions WHERE code = 'DXB')),
  ('Satwa', 'السطوة', 25.2280, 55.2700, (SELECT id FROM public.regions WHERE code = 'DXB')),
  ('Al Rashidiya', 'الراشدية', 25.2326, 55.3849, (SELECT id FROM public.regions WHERE code = 'DXB'));

-- Seed Abu Dhabi districts
INSERT INTO public.cities (name_en, name_ar, lat, lng, region_id) VALUES
  ('Abu Dhabi City', 'مدينة أبو ظبي', 24.4539, 54.3773, (SELECT id FROM public.regions WHERE code = 'AUH')),
  ('Al Reem Island', 'جزيرة الريم', 24.4980, 54.4060, (SELECT id FROM public.regions WHERE code = 'AUH')),
  ('Saadiyat Island', 'جزيرة السعديات', 24.5474, 54.4350, (SELECT id FROM public.regions WHERE code = 'AUH')),
  ('Yas Island', 'جزيرة ياس', 24.4892, 54.6040, (SELECT id FROM public.regions WHERE code = 'AUH')),
  ('Al Ain', 'العين', 24.2075, 55.7447, (SELECT id FROM public.regions WHERE code = 'AUH')),
  ('Khalifa City', 'مدينة خليفة', 24.4209, 54.5788, (SELECT id FROM public.regions WHERE code = 'AUH')),
  ('Mussafah', 'مصفح', 24.3538, 54.4795, (SELECT id FROM public.regions WHERE code = 'AUH')),
  ('Al Dhafra', 'الظفرة', 23.6530, 53.7058, (SELECT id FROM public.regions WHERE code = 'AUH'));

-- Seed Sharjah cities
INSERT INTO public.cities (name_en, name_ar, lat, lng, region_id) VALUES
  ('Sharjah City', 'مدينة الشارقة', 25.3463, 55.4209, (SELECT id FROM public.regions WHERE code = 'SHJ')),
  ('Al Nahda', 'النهضة', 25.3100, 55.3700, (SELECT id FROM public.regions WHERE code = 'SHJ')),
  ('Al Majaz', 'المجاز', 25.3246, 55.3875, (SELECT id FROM public.regions WHERE code = 'SHJ'));

-- Seed other Emirates (main cities)
INSERT INTO public.cities (name_en, name_ar, lat, lng, region_id) VALUES
  ('Ajman City', 'مدينة عجمان', 25.4052, 55.5136, (SELECT id FROM public.regions WHERE code = 'AJM')),
  ('Umm Al Quwain City', 'مدينة أم القيوين', 25.5647, 55.5553, (SELECT id FROM public.regions WHERE code = 'UAQ')),
  ('Ras Al Khaimah City', 'مدينة رأس الخيمة', 25.7895, 55.9432, (SELECT id FROM public.regions WHERE code = 'RAK')),
  ('Fujairah City', 'مدينة الفجيرة', 25.1288, 56.3265, (SELECT id FROM public.regions WHERE code = 'FUJ')),
  ('Dibba Al Fujairah', 'دبا الفجيرة', 25.5939, 56.2614, (SELECT id FROM public.regions WHERE code = 'FUJ')),
  ('Khor Fakkan', 'خورفكان', 25.3393, 56.3497, (SELECT id FROM public.regions WHERE code = 'SHJ'));
