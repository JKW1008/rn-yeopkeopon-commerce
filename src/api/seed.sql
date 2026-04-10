-- ============================================================
-- SEED DATA: yeopkeopon-commerce
-- schema.sql 실행 후 이 파일을 실행하세요
-- ============================================================

-- ============================================================
-- BANNERS
-- ============================================================
INSERT INTO public.banners (image_url, title, sort_order) VALUES
  ('https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200', 'LUXURY' || chr(10) || 'FASHION' || chr(10) || '& ACCESSORIES', 1),
  ('https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200', 'NEW' || chr(10) || 'SUMMER' || chr(10) || 'COLLECTION', 2),
  ('https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=1200', 'MODERN' || chr(10) || 'MINIMALIST' || chr(10) || 'STYLE', 3);

-- ============================================================
-- BRANDS
-- ============================================================
INSERT INTO public.brands (name, sort_order) VALUES
  ('Prada', 1),
  ('Burberry', 2),
  ('Hugo Boss', 3),
  ('Cartier', 4),
  ('Gucci', 5),
  ('Tiffany & Co', 6);

-- ============================================================
-- COLLECTIONS
-- ============================================================
INSERT INTO public.collections (title, season_name, month_name, season_number, image_url, sort_order) VALUES
  ('COLLECTIONS', 'Autumn', 'October', '10', 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200', 1),
  ('COLLECTIONS', 'Summer', 'July', '7', 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200', 2);

-- ============================================================
-- SNS POSTS
-- ============================================================
INSERT INTO public.sns_posts (username, image_url, sort_order) VALUES
  ('@mia',   'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800', 1),
  ('@_jihyn', 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=800', 2),
  ('@mia',   'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800', 3),
  ('@_jihyn', 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=800', 4);

-- ============================================================
-- TRENDING TAGS
-- ============================================================
INSERT INTO public.trending_tags (tag, sort_order) VALUES
  ('#2021',            1),
  ('#spring',          2),
  ('#collection',      3),
  ('#fall',            4),
  ('#dress',           5),
  ('#autumncollection', 6),
  ('#openfashion',     7);

-- ============================================================
-- POPULAR SEARCHES
-- ============================================================
INSERT INTO public.popular_searches (term, search_count, sort_order) VALUES
  ('Trend',       1520, 1),
  ('Dress',       1340, 2),
  ('Bag',         1100, 3),
  ('Tshirt',       890, 4),
  ('Beauty',       760, 5),
  ('Accessories',  640, 6);

-- ============================================================
-- PRODUCTS
-- ============================================================
INSERT INTO public.products (name, brand, description, price, category, images, sizes, colors, rating, review_count) VALUES
  ('Mohair-blend cardigan',   '21WN',        'A luxury mohair-blend cardigan.',         120, 'Knitwear',    ARRAY['https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800','https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=800','https://images.unsplash.com/photo-1591369822096-ffd140ec948f?q=80&w=800'], ARRAY['S','M','L'],                               '[{"id":"c1","hex":"#000000","name":"Black"},{"id":"c2","hex":"#777777","name":"Grey"},{"id":"c3","hex":"#C4C4C4","name":"Light Grey"}]'::jsonb, 4.8, 120),
  ('Cashmere overcoat',       'Loro Piana',  'Classic cashmere overcoat.',              240, 'Outer',       ARRAY['https://images.unsplash.com/photo-1544022613-e87ca75a784a?q=80&w=800','https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800','https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?q=80&w=800'], ARRAY['M','L'],                                   '[{"id":"c1","hex":"#000000","name":"Black"},{"id":"c2","hex":"#777777","name":"Grey"},{"id":"c3","hex":"#C4C4C4","name":"Light Grey"}]'::jsonb, 4.9, 85),
  ('Leather mini bag',        'Oblong',      'Premium leather mini bag.',                95, 'Bag',         ARRAY['https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800','https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=800','https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=800'], ARRAY['O/S'],                                     '[{"id":"c1","hex":"#000000","name":"Black"},{"id":"c2","hex":"#777777","name":"Grey"},{"id":"c3","hex":"#C4C4C4","name":"Light Grey"}]'::jsonb, 4.7, 204),
  ('Linen blend dress',       'OpenFashion', 'Lightweight linen blend dress.',          180, 'Dress',       ARRAY['https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=800','https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=800','https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=800'], ARRAY['S','M'],                                   '[{"id":"c1","hex":"#000000","name":"Black"},{"id":"c2","hex":"#777777","name":"Grey"},{"id":"c3","hex":"#C4C4C4","name":"Light Grey"}]'::jsonb, 4.8, 45),
  ('Boucle Knit top',         'OpenFashion', 'Sustainable boucle knit top.',            135, 'Knitwear',    ARRAY['https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=800','https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800','https://images.unsplash.com/photo-1515562141207-7a88fb0ce338?q=80&w=800'], ARRAY['S','M','L'],                               '[{"id":"c1","hex":"#000000","name":"Black"},{"id":"c2","hex":"#777777","name":"Grey"},{"id":"c3","hex":"#C4C4C4","name":"Light Grey"}]'::jsonb, 4.5, 67),
  ('Classic wool blazer',     'IAMSHOP',     'Tailored wool blazer.',                   210, 'Outer',       ARRAY['https://images.unsplash.com/photo-1591369822096-ffd140ec948f?q=80&w=800','https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800','https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?q=80&w=800'], ARRAY['M','L'],                                   '[{"id":"c1","hex":"#000000","name":"Black"},{"id":"c2","hex":"#777777","name":"Grey"},{"id":"c3","hex":"#C4C4C4","name":"Light Grey"}]'::jsonb, 4.8, 32),
  ('Pleated silk skirt',      '21WN',        'Fluid pleated silk skirt.',               145, 'Dress',       ARRAY['https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=800','https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=800','https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=800'], ARRAY['S','M'],                                   '[{"id":"c1","hex":"#000000","name":"Black"},{"id":"c2","hex":"#777777","name":"Grey"},{"id":"c3","hex":"#C4C4C4","name":"Light Grey"}]'::jsonb, 4.4, 18),
  ('Summer walk shoes',       'Loro Piana',  'Iconic summer walk shoes.',               350, 'Shoes',       ARRAY['https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=800','https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=800','https://images.unsplash.com/photo-1533867617858-e7b97e060509?q=80&w=800'], ARRAY['225','230','235','240','245','250','255','260'], '[{"id":"c1","hex":"#000000","name":"Black"},{"id":"c2","hex":"#777777","name":"Grey"},{"id":"c3","hex":"#C4C4C4","name":"Light Grey"}]'::jsonb, 4.9, 150),
  ('Structured tote bag',     'Oblong',      'Spacious structured tote bag.',           155, 'Bag',         ARRAY['https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=800','https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800','https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=800'], ARRAY['O/S'],                                     '[{"id":"c1","hex":"#000000","name":"Black"},{"id":"c2","hex":"#777777","name":"Grey"},{"id":"c3","hex":"#C4C4C4","name":"Light Grey"}]'::jsonb, 4.6, 89),
  ('Oversized trench coat',   'OpenFashion', 'Modern oversized trench coat.',           280, 'Outer',       ARRAY['https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800','https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?q=80&w=800','https://images.unsplash.com/photo-1544022613-e87ca75a784a?q=80&w=800'], ARRAY['S','M','L'],                               '[{"id":"c1","hex":"#000000","name":"Black"},{"id":"c2","hex":"#777777","name":"Grey"},{"id":"c3","hex":"#C4C4C4","name":"Light Grey"}]'::jsonb, 4.8, 41),
  ('Ribbed turtleneck',       '21WN',        'Cozy ribbed turtleneck.',                  98, 'Knitwear',    ARRAY['https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=800','https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800','https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800'], ARRAY['S','M','L'],                               '[{"id":"c1","hex":"#000000","name":"Black"},{"id":"c2","hex":"#777777","name":"Grey"},{"id":"c3","hex":"#C4C4C4","name":"Light Grey"}]'::jsonb, 4.6, 77),
  ('Leather ankle boots',     'IAMSHOP',     'Premium leather ankle boots.',            320, 'Shoes',       ARRAY['https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=800','https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=800','https://images.unsplash.com/photo-1533867617858-e7b97e060509?q=80&w=800'], ARRAY['235','245','255'],                          '[{"id":"c1","hex":"#000000","name":"Black"},{"id":"c2","hex":"#777777","name":"Grey"},{"id":"c3","hex":"#C4C4C4","name":"Light Grey"}]'::jsonb, 4.7, 55),
  ('Cashmere scarf',          'Loro Piana',  'Ultra-soft cashmere scarf.',              175, 'Accessories', ARRAY['https://images.unsplash.com/photo-1601924994987-69e26d50dc26?q=80&w=800','https://images.unsplash.com/photo-1601333144130-8cbb312386b6?q=80&w=800','https://images.unsplash.com/photo-1584736286279-246f1f048a7d?q=80&w=800'], ARRAY['O/S'],                                     '[{"id":"c1","hex":"#000000","name":"Black"},{"id":"c2","hex":"#777777","name":"Grey"},{"id":"c3","hex":"#C4C4C4","name":"Light Grey"}]'::jsonb, 4.9, 200),
  ('Satin wrap dress',        'OpenFashion', 'Elegant satin wrap dress.',               165, 'Dress',       ARRAY['https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=800','https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=800','https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=800'], ARRAY['S','M'],                                   '[{"id":"c1","hex":"#000000","name":"Black"},{"id":"c2","hex":"#777777","name":"Grey"},{"id":"c3","hex":"#C4C4C4","name":"Light Grey"}]'::jsonb, 4.5, 33),
  ('Chain shoulder bag',      'Oblong',      'Iconic chain shoulder bag.',              230, 'Bag',         ARRAY['https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=800','https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=800','https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800'], ARRAY['O/S'],                                     '[{"id":"c1","hex":"#000000","name":"Black"},{"id":"c2","hex":"#777777","name":"Grey"},{"id":"c3","hex":"#C4C4C4","name":"Light Grey"}]'::jsonb, 4.8, 112),
  ('Wide-leg trousers',       '21WN',        'Relaxed wide-leg trousers.',              140, 'Dress',       ARRAY['https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=800','https://images.unsplash.com/photo-1594830997432-2b9ce6d9ec7b?q=80&w=800','https://images.unsplash.com/photo-1584736286279-246f1f048a7d?q=80&w=800'], ARRAY['S','M','L'],                               '[{"id":"c1","hex":"#000000","name":"Black"},{"id":"c2","hex":"#777777","name":"Grey"},{"id":"c3","hex":"#C4C4C4","name":"Light Grey"}]'::jsonb, 4.5, 28),
  ('Quilted down jacket',     'IAMSHOP',     'Lightweight quilted down jacket.',        295, 'Outer',       ARRAY['https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?q=80&w=800','https://images.unsplash.com/photo-1591369822096-ffd140ec948f?q=80&w=800','https://images.unsplash.com/photo-1576905341939-402366f34ba5?q=80&w=800'], ARRAY['M','L'],                                   '[{"id":"c1","hex":"#000000","name":"Black"},{"id":"c2","hex":"#777777","name":"Grey"},{"id":"c3","hex":"#C4C4C4","name":"Light Grey"}]'::jsonb, 4.7, 64),
  ('Suede loafers',           'Loro Piana',  'Signature suede loafers.',                410, 'Shoes',       ARRAY['https://images.unsplash.com/photo-1533867617858-e7b97e060509?q=80&w=800','https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=800','https://images.unsplash.com/photo-1533544521035-6bc9f0a2ca3e?q=80&w=800'], ARRAY['230','240','250'],                          '[{"id":"c1","hex":"#000000","name":"Black"},{"id":"c2","hex":"#777777","name":"Grey"},{"id":"c3","hex":"#C4C4C4","name":"Light Grey"}]'::jsonb, 4.9, 88),
  ('Pearl hair clip set',     'OpenFashion', 'Elegant pearl hair clip set.',             45, 'Accessories', ARRAY['https://images.unsplash.com/photo-1599643477877-530eb83abc8e?q=80&w=800','https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=800','https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800'], ARRAY['O/S'],                                     '[{"id":"c1","hex":"#000000","name":"Black"},{"id":"c2","hex":"#777777","name":"Grey"},{"id":"c3","hex":"#C4C4C4","name":"Light Grey"}]'::jsonb, 4.4, 310),
  ('Canvas bucket hat',       'Oblong',      'Classic canvas bucket hat.',               65, 'Accessories', ARRAY['https://images.unsplash.com/photo-1611339555312-e607c8352fd7?q=80&w=800','https://images.unsplash.com/photo-1511499767350-a1590fdb2e1b?q=80&w=800','https://images.unsplash.com/photo-1601924994987-69e26d50dc26?q=80&w=800'], ARRAY['O/S'],                                     '[{"id":"c1","hex":"#000000","name":"Black"},{"id":"c2","hex":"#777777","name":"Grey"},{"id":"c3","hex":"#C4C4C4","name":"Light Grey"}]'::jsonb, 4.3, 142),
  ('Lace knit cardigan',      '21WN',        'Delicate lace knit cardigan.',            115, 'Knitwear',    ARRAY['https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800','https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=800','https://images.unsplash.com/photo-1515562141207-7a88fb0ce338?q=80&w=800'], ARRAY['S','M'],                                   '[{"id":"c1","hex":"#000000","name":"Black"},{"id":"c2","hex":"#777777","name":"Grey"},{"id":"c3","hex":"#C4C4C4","name":"Light Grey"}]'::jsonb, 4.6, 39),
  ('Maxi halter dress',       'IAMSHOP',     'Flowing maxi halter dress.',              195, 'Dress',       ARRAY['https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=800','https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=800','https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=800'], ARRAY['S','M','L'],                               '[{"id":"c1","hex":"#000000","name":"Black"},{"id":"c2","hex":"#777777","name":"Grey"},{"id":"c3","hex":"#C4C4C4","name":"Light Grey"}]'::jsonb, 4.7, 21),
  ('Baby cashmere gloves',    'Loro Piana',  'Rare baby cashmere gloves.',              290, 'Accessories', ARRAY['https://images.unsplash.com/photo-1584736286279-246f1f048a7d?q=80&w=800','https://images.unsplash.com/photo-1601333144130-8cbb312386b6?q=80&w=800','https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=800'], ARRAY['O/S'],                                     '[{"id":"c1","hex":"#000000","name":"Black"},{"id":"c2","hex":"#777777","name":"Grey"},{"id":"c3","hex":"#C4C4C4","name":"Light Grey"}]'::jsonb, 4.8, 47),
  ('Denim midi skirt',        'OpenFashion', 'Versatile denim midi skirt.',             110, 'Dress',       ARRAY['https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?q=80&w=800','https://images.unsplash.com/photo-1576905341939-402366f34ba5?q=80&w=800','https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=800'], ARRAY['S','M','L'],                                '[{"id":"c1","hex":"#000000","name":"Black"},{"id":"c2","hex":"#777777","name":"Grey"},{"id":"c3","hex":"#C4C4C4","name":"Light Grey"}]'::jsonb, 4.4, 83),
  ('Leather belt bag',        'Oblong',      'Compact leather belt bag.',               185, 'Bag',         ARRAY['https://images.unsplash.com/photo-1566150905458-1bf1fd113961?q=80&w=800','https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=800','https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800'], ARRAY['O/S'],                                     '[{"id":"c1","hex":"#000000","name":"Black"},{"id":"c2","hex":"#777777","name":"Grey"},{"id":"c3","hex":"#C4C4C4","name":"Light Grey"}]'::jsonb, 4.6, 56),
  ('Silky button-down',       '21WN',        'Soft silky button-down shirt.',           110, 'Dress',       ARRAY['https://images.unsplash.com/photo-1598554747436-c9293d6a588f?q=80&w=800','https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=800','https://images.unsplash.com/photo-1598554747436-c9293d6a588f?q=80&w=800'], ARRAY['S','M','L'],                               '[{"id":"c1","hex":"#000000","name":"Black"},{"id":"c2","hex":"#777777","name":"Grey"},{"id":"c3","hex":"#C4C4C4","name":"Light Grey"}]'::jsonb, 4.5, 42),
  ('Knit sneakers',           'Loro Piana',  'High-end knit sneakers.',                 450, 'Shoes',       ARRAY['https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=800','https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=800','https://images.unsplash.com/photo-1533867617858-e7b97e060509?q=80&w=800'], ARRAY['235','245','255'],                          '[{"id":"c1","hex":"#000000","name":"Black"},{"id":"c2","hex":"#777777","name":"Grey"},{"id":"c3","hex":"#C4C4C4","name":"Light Grey"}]'::jsonb, 4.8, 91),
  ('Denim trucker jacket',    'IAMSHOP',     'Vintage wash denim jacket.',              180, 'Outer',       ARRAY['https://images.unsplash.com/photo-1576905341939-402366f34ba5?q=80&w=800','https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?q=80&w=800','https://images.unsplash.com/photo-1591369822096-ffd140ec948f?q=80&w=800'], ARRAY['M','L'],                                   '[{"id":"c1","hex":"#000000","name":"Black"},{"id":"c2","hex":"#777777","name":"Grey"},{"id":"c3","hex":"#C4C4C4","name":"Light Grey"}]'::jsonb, 4.7, 37),
  ('Floral midi dress',       'OpenFashion', 'Flowy floral midi dress.',                195, 'Dress',       ARRAY['https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=800','https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=800','https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=800'], ARRAY['S','M'],                                   '[{"id":"c1","hex":"#000000","name":"Black"},{"id":"c2","hex":"#777777","name":"Grey"},{"id":"c3","hex":"#C4C4C4","name":"Light Grey"}]'::jsonb, 4.6, 54),
  ('Woven straw bag',         'Oblong',      'Beach-ready woven straw bag.',             85, 'Bag',         ARRAY['https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=800','https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800','https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=800'], ARRAY['O/S'],                                     '[{"id":"c1","hex":"#000000","name":"Black"},{"id":"c2","hex":"#777777","name":"Grey"},{"id":"c3","hex":"#C4C4C4","name":"Light Grey"}]'::jsonb, 4.4, 128),
  ('V-neck wool sweater',     '21WN',        'Classic v-neck wool sweater.',            130, 'Knitwear',    ARRAY['https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=800','https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800','https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800'], ARRAY['S','M','L'],                               '[{"id":"c1","hex":"#000000","name":"Black"},{"id":"c2","hex":"#777777","name":"Grey"},{"id":"c3","hex":"#C4C4C4","name":"Light Grey"}]'::jsonb, 4.7, 61),
  ('Aviator sunglasses',      'Loro Piana',  'Premium aviator sunglasses.',             320, 'Accessories', ARRAY['https://images.unsplash.com/photo-1511499767350-a1590fdb2e1b?q=80&w=800','https://images.unsplash.com/photo-1601333144130-8cbb312386b6?q=80&w=800','https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800'], ARRAY['O/S'],                                     '[{"id":"c1","hex":"#000000","name":"Black"},{"id":"c2","hex":"#777777","name":"Grey"},{"id":"c3","hex":"#C4C4C4","name":"Light Grey"}]'::jsonb, 4.9, 20),
  ('Cotton chino pants',      'IAMSHOP',     'Tailored cotton chino pants.',            120, 'Dress',       ARRAY['https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=800','https://images.unsplash.com/photo-1594830997432-2b9ce6d9ec7b?q=80&w=800','https://images.unsplash.com/photo-1584736286279-246f1f048a7d?q=80&w=800'], ARRAY['S','M','L'],                               '[{"id":"c1","hex":"#000000","name":"Black"},{"id":"c2","hex":"#777777","name":"Grey"},{"id":"c3","hex":"#C4C4C4","name":"Light Grey"}]'::jsonb, 4.5, 48),
  ('Striped tee',             'OpenFashion', 'Classic striped cotton tee.',              45, 'Knitwear',    ARRAY['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800','https://images.unsplash.com/photo-1515562141207-7a88fb0ce338?q=80&w=800','https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=800'], ARRAY['S','M','L'],                               '[{"id":"c1","hex":"#000000","name":"Black"},{"id":"c2","hex":"#777777","name":"Grey"},{"id":"c3","hex":"#C4C4C4","name":"Light Grey"}]'::jsonb, 4.3, 89),
  ('Leather card holder',     'Oblong',      'Minimalist leather card holder.',          55, 'Accessories', ARRAY['https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=800','https://images.unsplash.com/photo-1584736286279-246f1f048a7d?q=80&w=800','https://images.unsplash.com/photo-1566150905458-1bf1fd113961?q=80&w=800'], ARRAY['O/S'],                                     '[{"id":"c1","hex":"#000000","name":"Black"},{"id":"c2","hex":"#777777","name":"Grey"},{"id":"c3","hex":"#C4C4C4","name":"Light Grey"}]'::jsonb, 4.6, 110),
  ('Puffer vest',             '21WN',        'Warm quilted puffer vest.',               160, 'Outer',       ARRAY['https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?q=80&w=800','https://images.unsplash.com/photo-1591369822096-ffd140ec948f?q=80&w=800','https://images.unsplash.com/photo-1576905341939-402366f34ba5?q=80&w=800'], ARRAY['M','L'],                                   '[{"id":"c1","hex":"#000000","name":"Black"},{"id":"c2","hex":"#777777","name":"Grey"},{"id":"c3","hex":"#C4C4C4","name":"Light Grey"}]'::jsonb, 4.7, 34),
  ('Silk neck scarf',         'Loro Piana',  'Luxury silk neck scarf.',                 190, 'Accessories', ARRAY['https://images.unsplash.com/photo-1601333144130-8cbb312386b6?q=80&w=800','https://images.unsplash.com/photo-1601924994987-69e26d50dc26?q=80&w=800','https://images.unsplash.com/photo-1601333144130-8cbb312386b6?q=80&w=800'], ARRAY['O/S'],                                     '[{"id":"c1","hex":"#000000","name":"Black"},{"id":"c2","hex":"#777777","name":"Grey"},{"id":"c3","hex":"#C4C4C4","name":"Light Grey"}]'::jsonb, 4.9, 52),
  ('Suede desert boots',      'IAMSHOP',     'Classic suede desert boots.',             280, 'Shoes',       ARRAY['https://images.unsplash.com/photo-1533867617858-e7b97e060509?q=80&w=800','https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=800','https://images.unsplash.com/photo-1533867617858-e7b97e060509?q=80&w=800'], ARRAY['230','240','250'],                          '[{"id":"c1","hex":"#000000","name":"Black"},{"id":"c2","hex":"#777777","name":"Grey"},{"id":"c3","hex":"#C4C4C4","name":"Light Grey"}]'::jsonb, 4.8, 41),
  ('Cotton sundress',         'OpenFashion', 'Lightweight cotton sundress.',            140, 'Dress',       ARRAY['https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=800','https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=800','https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=800'], ARRAY['S','M'],                                   '[{"id":"c1","hex":"#000000","name":"Black"},{"id":"c2","hex":"#777777","name":"Grey"},{"id":"c3","hex":"#C4C4C4","name":"Light Grey"}]'::jsonb, 4.5, 27),
  ('Bucket bag',              'Oblong',      'Chic leather bucket bag.',                210, 'Bag',         ARRAY['https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=800','https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800','https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=800'], ARRAY['O/S'],                                     '[{"id":"c1","hex":"#000000","name":"Black"},{"id":"c2","hex":"#777777","name":"Grey"},{"id":"c3","hex":"#C4C4C4","name":"Light Grey"}]'::jsonb, 4.7, 63),
  ('18k Gold band ring',      'OpenFashion', 'Solid 18k yellow gold band.',             450, 'Ring',        ARRAY['https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=800','https://images.unsplash.com/photo-1601333144130-8cbb312386b6?q=80&w=800','https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=800'], ARRAY['6','7','8','9','10'],                       '[{"id":"c4","hex":"#FFD700","name":"Gold"},{"id":"c5","hex":"#C0C0C0","name":"Silver"},{"id":"c6","hex":"#B87333","name":"Rose Gold"}]'::jsonb, 4.9, 12),
  ('Pearl drop necklace',     'IAMSHOP',     'Elegant freshwater pearl necklace.',      180, 'Necklace',    ARRAY['https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800','https://images.unsplash.com/photo-1599643477877-530eb83abc8e?q=80&w=800','https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800'], ARRAY['40cm','45cm'],                             '[{"id":"c4","hex":"#FFD700","name":"Gold"},{"id":"c5","hex":"#C0C0C0","name":"Silver"},{"id":"c6","hex":"#B87333","name":"Rose Gold"}]'::jsonb, 4.7, 34),
  ('Silver twist ring',       '21WN',        'Sterling silver twist design.',            95, 'Ring',        ARRAY['https://images.unsplash.com/photo-1515562141207-7a88fb0ce338?q=80&w=800','https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800','https://images.unsplash.com/photo-1515562141207-7a88fb0ce338?q=80&w=800'], ARRAY['5','6','7','8'],                           '[{"id":"c4","hex":"#FFD700","name":"Gold"},{"id":"c5","hex":"#C0C0C0","name":"Silver"},{"id":"c6","hex":"#B87333","name":"Rose Gold"}]'::jsonb, 4.6, 56);

-- ============================================================
-- BLOG POSTS + SECTIONS
-- ============================================================

-- blog-1
WITH bp AS (
  INSERT INTO public.blog_posts (title, description, category, tags, image_url, updated_at)
  VALUES (
    '2021 STYLE GUIDE: THE BIGGEST FALL TRENDS',
    'Mixing high and low-end pieces is the best way to get the most bang for your buck while elevating your wardrobe.',
    'Fashion',
    ARRAY['#Fashion','#Tips'],
    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop',
    now() - interval '3 days'
  ) RETURNING id
)
INSERT INTO public.blog_sections (blog_post_id, type, value, images, sort_order)
SELECT id, 'text', 'You guys know how much I love mixing high and low-end - it''s the best way to get the most bang for your buck while still elevating your wardrobe. The same goes for handbags! And honestly they are probably the best pieces to mix and match. I truly think the key to completing a look is with a great bag and I found so many this year that I wanted to share a round-up of my most worn handbags.', '{}', 1 FROM bp
UNION ALL
SELECT id, 'image', 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1200&auto=format&fit=crop',
  ARRAY['https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1200&auto=format&fit=crop','https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1200&auto=format&fit=crop','https://images.unsplash.com/photo-1566150905458-1bf1fd113961?q=80&w=1200&auto=format&fit=crop'], 2 FROM bp
UNION ALL
SELECT id, 'text', 'I found this Saint Laurent canvas handbag this summer and immediately fell in love. The neutral fabrics are so beautiful and I like how this handbag can also carry into fall.', '{}', 3 FROM bp;

-- blog-2
WITH bp AS (
  INSERT INTO public.blog_posts (title, description, category, tags, image_url, updated_at)
  VALUES ('The Art of Layering: How to Style Your Essentials', 'Master the skill of combining textures and proportions.', 'Fashion', ARRAY['#StyleTips','#Layering','#Essential'], 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1200&auto=format&fit=crop', '2024-04-07') RETURNING id
)
INSERT INTO public.blog_sections (blog_post_id, type, value, images, sort_order)
SELECT id, 'text', 'Layering is the cornerstone of a sophisticated wardrobe, especially during transitional weather. The secret lies in balancing proportions and textures.', '{}', 1 FROM bp
UNION ALL SELECT id, 'image', 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1200&auto=format&fit=crop', '{}', 2 FROM bp
UNION ALL SELECT id, 'text', 'Start with a lightweight base layer, such as a fine-gauge knit or a crisp cotton shirt. Add a signature outerwear piece to anchor the look.', '{}', 3 FROM bp;

-- blog-3
WITH bp AS (
  INSERT INTO public.blog_posts (title, description, category, tags, image_url, updated_at)
  VALUES ('Top 5 Sustainable Brands You Need to Know This Year', 'Ethical fashion is more than a trend.', 'Lifestyle', ARRAY['#Sustainability','#EcoFriendly','#Fashion'], 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=1200&auto=format&fit=crop', '2024-04-05') RETURNING id
)
INSERT INTO public.blog_sections (blog_post_id, type, value, images, sort_order)
SELECT id, 'text', 'Sustainability has moved from the fringes of fashion to its very core. Today''s luxury consumers are demanding transparency.', '{}', 1 FROM bp
UNION ALL SELECT id, 'image', 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=1200&auto=format&fit=crop', '{}', 2 FROM bp
UNION ALL SELECT id, 'text', 'From regenerative agriculture initiatives to innovative recycled textiles, these pioneers are proving that high fashion can be a force for good.', '{}', 3 FROM bp;

-- blog-4
WITH bp AS (
  INSERT INTO public.blog_posts (title, description, category, tags, image_url, updated_at)
  VALUES ('Skincare Secrets for a Radiant Glow All Season Long', 'Achieve the ultimate glow with our curated guide to seasonal skincare routines.', 'Beauty', ARRAY['#Beauty','#Skincare','#Glow'], 'https://images.unsplash.com/photo-1596462502278-27bfdc4033c8?q=80&w=1200&auto=format&fit=crop', '2024-04-02') RETURNING id
)
INSERT INTO public.blog_sections (blog_post_id, type, value, images, sort_order)
SELECT id, 'text', 'Achieving radiant skin requires a holistic approach that adapts to the changing seasons.', '{}', 1 FROM bp
UNION ALL SELECT id, 'image', 'https://images.unsplash.com/photo-1596462502278-27bfdc4033c8?q=80&w=1200&auto=format&fit=crop', '{}', 2 FROM bp
UNION ALL SELECT id, 'text', 'A double-cleansing routine at night followed by a vitamin C serum can dramatically brighten the complexion.', '{}', 3 FROM bp;

-- blog-5
WITH bp AS (
  INSERT INTO public.blog_posts (title, description, category, tags, image_url, updated_at)
  VALUES ('Urban Streetwear: Why Oversized is Here to Stay', 'The evolution of comfort and style.', 'Trends', ARRAY['#Streetwear','#Oversized','#Trends'], 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1200&auto=format&fit=crop', '2024-03-30') RETURNING id
)
INSERT INTO public.blog_sections (blog_post_id, type, value, images, sort_order)
SELECT id, 'text', 'The oversized silhouette has dominated urban streetwear for years. What started as a subcultural movement has been embraced by high-fashion houses.', '{}', 1 FROM bp
UNION ALL SELECT id, 'image', 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1200&auto=format&fit=crop', '{}', 2 FROM bp
UNION ALL SELECT id, 'text', 'The key to mastering this look is intentionality. Pair voluminous trousers with a more fitted top.', '{}', 3 FROM bp;

-- blog-6
WITH bp AS (
  INSERT INTO public.blog_posts (title, description, category, tags, image_url, updated_at)
  VALUES ('The Ultimate Guide to Vintage Denim Hunting', 'Finding the perfect pair of vintage jeans is an art.', 'Fashion', ARRAY['#Vintage','#Denim','#Sustainable'], 'https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=1200&auto=format&fit=crop', '2024-03-25') RETURNING id
)
INSERT INTO public.blog_sections (blog_post_id, type, value, images, sort_order)
SELECT id, 'text', 'There is nothing quite like the feel of perfectly aged denim. Hunting for vintage Levi''s requires patience.', '{}', 1 FROM bp
UNION ALL SELECT id, 'image', 'https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=1200&auto=format&fit=crop', '{}', 2 FROM bp
UNION ALL SELECT id, 'text', 'Identify authentic vintage pieces by reading labels and understanding construction details.', '{}', 3 FROM bp;

-- blog-7
WITH bp AS (
  INSERT INTO public.blog_posts (title, description, category, tags, image_url, updated_at)
  VALUES ('Minimalist Workspace: Elevate Your Creative Flow', 'Your environment shapes your work.', 'Lifestyle', ARRAY['#Minimalism','#Workspace','#Creative'], 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1200&auto=format&fit=crop', '2024-03-20') RETURNING id
)
INSERT INTO public.blog_sections (blog_post_id, type, value, images, sort_order)
SELECT id, 'text', 'A cluttered desk often leads to a cluttered mind. Creating a minimalist workspace is about more than just aesthetics.', '{}', 1 FROM bp
UNION ALL SELECT id, 'image', 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1200&auto=format&fit=crop', '{}', 2 FROM bp
UNION ALL SELECT id, 'text', 'Invest in high-quality, tactile tools that bring joy to your process.', '{}', 3 FROM bp;

-- blog-8
WITH bp AS (
  INSERT INTO public.blog_posts (title, description, category, tags, image_url, updated_at)
  VALUES ('Hydration 101: The Secret to Naturally Glowing Skin', 'Beauty starts from within.', 'Beauty', ARRAY['#Health','#Beauty','#Hydration'], 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1200&auto=format&fit=crop', '2024-03-15') RETURNING id
)
INSERT INTO public.blog_sections (blog_post_id, type, value, images, sort_order)
SELECT id, 'text', 'True skin health is built from the inside out. Cellular hydration is key to a radiant glow.', '{}', 1 FROM bp
UNION ALL SELECT id, 'image', 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1200&auto=format&fit=crop', '{}', 2 FROM bp
UNION ALL SELECT id, 'text', 'Learn about electrolyte balance and water-rich foods.', '{}', 3 FROM bp;

-- blog-9
WITH bp AS (
  INSERT INTO public.blog_posts (title, description, category, tags, image_url, updated_at)
  VALUES ('Athleisure: The Perfect Blend of Comfort and Class', 'From the gym to the coffee shop.', 'Fashion', ARRAY['#Athleisure','#Comfort','#Style'], 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop', '2024-03-10') RETURNING id
)
INSERT INTO public.blog_sections (blog_post_id, type, value, images, sort_order)
SELECT id, 'text', 'Athleisure has redefined what it means to be well-dressed. It''s the intersection of performance and luxury.', '{}', 1 FROM bp
UNION ALL SELECT id, 'image', 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop', '{}', 2 FROM bp
UNION ALL SELECT id, 'text', 'Master this look by pairing technical leggings with a structured blazer.', '{}', 3 FROM bp;
