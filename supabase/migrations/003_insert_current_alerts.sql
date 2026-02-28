-- Current alerts - February 28, 2026 Iran attacks on UAE

-- 1. Palm Jumeirah - Fairmont fire/explosion (CRITICAL)
INSERT INTO public.alerts (title_en, title_ar, description_en, description_ar, severity, status, event_type, lat, lng, radius_km, source_text, detected_at, expires_at)
VALUES (
  'Explosion at Fairmont The Palm - Palm Jumeirah',
  'انفجار في فيرمونت ذا بالم - نخلة جميرا',
  'Major incident at Fairmont The Palm. Witnesses reported a loud bang followed by a fireball. Dubai Civil Defense confirmed fire under control. 4 injured.',
  'حادث كبير في فيرمونت ذا بالم. أفاد شهود عيان بسماع دوي انفجار تلاه كرة نارية. أكدت الدفاع المدني في دبي السيطرة على الحريق. 4 إصابات.',
  'critical', 'active', 'missile',
  25.1124, 55.1390, 3,
  'Loud bang followed by fireball at Fairmont The Palm. 4 injured. Fire under control.',
  NOW(), NOW() + INTERVAL '24 hours'
);

-- 2. Dubai International Airport - Flights suspended (CRITICAL)
INSERT INTO public.alerts (title_en, title_ar, description_en, description_ar, severity, status, event_type, lat, lng, radius_km, source_text, detected_at, expires_at)
VALUES (
  'Dubai Airport (DXB) - All Flights Suspended',
  'مطار دبي الدولي - تعليق جميع الرحلات',
  'All flight operations at Dubai International Airport suspended indefinitely. Passengers advised to stay away from the airport.',
  'تم تعليق جميع عمليات الطيران في مطار دبي الدولي إلى أجل غير مسمى. ينصح المسافرون بالابتعاد عن المطار.',
  'critical', 'active', 'missile',
  25.2532, 55.3657, 5,
  'DXB all flights suspended indefinitely. Stay away from airport.',
  NOW(), NOW() + INTERVAL '24 hours'
);

-- 3. Burj Khalifa area evacuation (WARNING)
INSERT INTO public.alerts (title_en, title_ar, description_en, description_ar, severity, status, event_type, lat, lng, radius_km, source_text, detected_at, expires_at)
VALUES (
  'Burj Khalifa Area Evacuated',
  'إخلاء منطقة برج خليفة',
  'Evacuation of the Burj Khalifa area as a precautionary measure. Residents urged to follow authorities instructions.',
  'إخلاء منطقة برج خليفة كإجراء احترازي. يُطلب من السكان اتباع تعليمات السلطات.',
  'warning', 'active', 'threat',
  25.1972, 55.2744, 2,
  'Burj Khalifa area evacuated as precaution.',
  NOW(), NOW() + INTERVAL '24 hours'
);

-- 4. Dubai airspace - Missile interceptions (CRITICAL)
INSERT INTO public.alerts (title_en, title_ar, description_en, description_ar, severity, status, event_type, lat, lng, radius_km, source_text, detected_at, expires_at)
VALUES (
  'Missile Interceptions Over Dubai Airspace',
  'اعتراض صواريخ في أجواء دبي',
  'UAE air defense systems intercepting incoming threats. Explosions and fireballs visible across multiple neighborhoods.',
  'أنظمة الدفاع الجوي الإماراتية تعترض تهديدات قادمة. انفجارات وكرات نارية مرئية في عدة أحياء.',
  'critical', 'active', 'missile',
  25.2048, 55.2708, 20,
  'Air defense intercepting missiles. Explosions heard across Dubai.',
  NOW(), NOW() + INTERVAL '24 hours'
);

-- 5. Saadiyat Island - Abu Dhabi debris fallout (CRITICAL)
INSERT INTO public.alerts (title_en, title_ar, description_en, description_ar, severity, status, event_type, lat, lng, radius_km, source_text, detected_at, expires_at)
VALUES (
  'Missile Debris Fallout - Saadiyat Island',
  'سقوط حطام صواريخ - جزيرة السعديات',
  'Debris from intercepted missiles fell on Saadiyat Island. Area cordoned off by authorities.',
  'سقطت حطام صواريخ تم اعتراضها على جزيرة السعديات. تم تطويق المنطقة من قبل السلطات.',
  'critical', 'active', 'missile',
  24.5474, 54.4350, 4,
  'Intercepted missile debris on Saadiyat Island.',
  NOW(), NOW() + INTERVAL '24 hours'
);

-- 6. Khalifa City - Abu Dhabi debris (CRITICAL)
INSERT INTO public.alerts (title_en, title_ar, description_en, description_ar, severity, status, event_type, lat, lng, radius_km, source_text, detected_at, expires_at)
VALUES (
  'Debris Fallout - Khalifa City, Abu Dhabi',
  'سقوط حطام - مدينة خليفة، أبو ظبي',
  'Debris from intercepted missiles reported in Khalifa City. One fatality confirmed — a Pakistani national killed by falling shrapnel.',
  'أفيد بسقوط حطام صواريخ في مدينة خليفة. تأكيد وفاة شخص واحد — مواطن باكستاني قتل بشظايا متساقطة.',
  'critical', 'active', 'missile',
  24.4209, 54.5788, 5,
  'Missile debris in Khalifa City. 1 fatality from shrapnel.',
  NOW(), NOW() + INTERVAL '24 hours'
);

-- 7. Bani Yas - Abu Dhabi debris (WARNING)
INSERT INTO public.alerts (title_en, title_ar, description_en, description_ar, severity, status, event_type, lat, lng, radius_km, source_text, detected_at, expires_at)
VALUES (
  'Debris Fallout - Bani Yas, Abu Dhabi',
  'سقوط حطام - بني ياس، أبو ظبي',
  'Debris from intercepted missiles reported in Bani Yas residential area.',
  'أفيد بسقوط حطام صواريخ في المنطقة السكنية ببني ياس.',
  'warning', 'active', 'missile',
  24.3260, 54.6350, 4,
  'Intercepted missile debris fell in Bani Yas.',
  NOW(), NOW() + INTERVAL '24 hours'
);

-- 8. Mohammed bin Zayed City - Abu Dhabi debris (WARNING)
INSERT INTO public.alerts (title_en, title_ar, description_en, description_ar, severity, status, event_type, lat, lng, radius_km, source_text, detected_at, expires_at)
VALUES (
  'Debris Fallout - Mohammed bin Zayed City',
  'سقوط حطام - مدينة محمد بن زايد',
  'Debris from intercepted missiles reported in Mohammed bin Zayed City area.',
  'أفيد بسقوط حطام صواريخ في منطقة مدينة محمد بن زايد.',
  'warning', 'active', 'missile',
  24.3700, 54.5500, 4,
  'Missile debris in MBZ City area.',
  NOW(), NOW() + INTERVAL '24 hours'
);

-- 9. Al Falah - Abu Dhabi debris (WARNING)
INSERT INTO public.alerts (title_en, title_ar, description_en, description_ar, severity, status, event_type, lat, lng, radius_km, source_text, detected_at, expires_at)
VALUES (
  'Debris Fallout - Al Falah, Abu Dhabi',
  'سقوط حطام - الفلاح، أبو ظبي',
  'Debris from intercepted missiles reported in Al Falah neighborhood.',
  'أفيد بسقوط حطام صواريخ في حي الفلاح.',
  'warning', 'active', 'missile',
  24.3450, 54.5100, 3,
  'Intercepted missile debris in Al Falah.',
  NOW(), NOW() + INTERVAL '24 hours'
);
