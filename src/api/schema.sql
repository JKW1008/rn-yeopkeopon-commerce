-- ============================================================
-- SCHEMA: yeopkeopon-commerce
-- 기존 테이블 전체 삭제 후 재생성
-- ============================================================

DROP TABLE IF EXISTS public.order_items CASCADE;
DROP TABLE IF EXISTS public.orders CASCADE;
DROP TABLE IF EXISTS public.cart_items CASCADE;
DROP TABLE IF EXISTS public.wishlists CASCADE;
DROP TABLE IF EXISTS public.search_history CASCADE;
DROP TABLE IF EXISTS public.payment_methods CASCADE;
DROP TABLE IF EXISTS public.addresses CASCADE;
DROP TABLE IF EXISTS public.blog_sections CASCADE;
DROP TABLE IF EXISTS public.blog_posts CASCADE;
DROP TABLE IF EXISTS public.sns_posts CASCADE;
DROP TABLE IF EXISTS public.trending_tags CASCADE;
DROP TABLE IF EXISTS public.popular_searches CASCADE;
DROP TABLE IF EXISTS public.collections CASCADE;
DROP TABLE IF EXISTS public.brands CASCADE;
DROP TABLE IF EXISTS public.banners CASCADE;
DROP TABLE IF EXISTS public.products CASCADE;

-- ============================================================
-- 1. PRODUCTS
-- ============================================================
CREATE TABLE public.products (
  id           uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  name         text        NOT NULL,
  brand        text        NOT NULL,
  description  text,
  price        numeric     NOT NULL,
  category     text        NOT NULL,
  -- category 값: 'Outer'|'Dress'|'Knitwear'|'Bag'|'Shoes'|'Accessories'|'Ring'|'Necklace'
  images       text[]      NOT NULL DEFAULT '{}',
  -- images[1] 이 대표 이미지 (PostgreSQL 배열은 1-indexed)
  sizes        text[]      NOT NULL DEFAULT '{}',
  colors       jsonb       NOT NULL DEFAULT '[]',
  -- colors 구조: [{"id":"c1","hex":"#000000","name":"Black"}, ...]
  rating       numeric     NOT NULL DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
  review_count integer     NOT NULL DEFAULT 0 CHECK (review_count >= 0),
  created_at   timestamptz NOT NULL DEFAULT now()
);

-- ============================================================
-- 2. BANNERS (Hero Carousel)
-- ============================================================
CREATE TABLE public.banners (
  id         uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url  text        NOT NULL,
  title      text,
  sort_order integer     NOT NULL DEFAULT 0,
  is_active  boolean     NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- ============================================================
-- 3. BRANDS (입점 브랜드 로고)
-- 현재는 로컬 이미지 에셋이지만 URL 기반 전환 대비
-- ============================================================
CREATE TABLE public.brands (
  id         uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  name       text        NOT NULL,
  logo_url   text,
  sort_order integer     NOT NULL DEFAULT 0,
  is_active  boolean     NOT NULL DEFAULT true
);

-- ============================================================
-- 4. COLLECTIONS (시즌 컬렉션)
-- ============================================================
CREATE TABLE public.collections (
  id           uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  title        text        NOT NULL,   -- 'COLLECTIONS'
  season_name  text,                   -- 'Autumn'
  month_name   text,                   -- 'October'
  season_number text,                  -- '10'
  image_url    text        NOT NULL,
  video_url    text,
  sort_order   integer     NOT NULL DEFAULT 0,
  is_active    boolean     NOT NULL DEFAULT true
);

-- ============================================================
-- 5. SNS POSTS (Instagram 피드)
-- ============================================================
CREATE TABLE public.sns_posts (
  id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  username    text        NOT NULL,   -- '@mia'
  image_url   text        NOT NULL,
  post_url    text,                   -- 원본 포스팅 링크
  sort_order  integer     NOT NULL DEFAULT 0,
  is_active   boolean     NOT NULL DEFAULT true
);

-- ============================================================
-- 6. TRENDING TAGS (홈 해시태그 & 검색 추천)
-- ============================================================
CREATE TABLE public.trending_tags (
  id         uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  tag        text        NOT NULL UNIQUE,  -- '#spring', '#dress'
  sort_order integer     NOT NULL DEFAULT 0,
  is_active  boolean     NOT NULL DEFAULT true
);

-- ============================================================
-- 7. POPULAR SEARCHES (인기 검색어)
-- ============================================================
CREATE TABLE public.popular_searches (
  id           uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  term         text        NOT NULL UNIQUE,  -- 'Dress', 'Bag'
  view_count   integer     NOT NULL DEFAULT 0,
  sort_order   integer     NOT NULL DEFAULT 0,
  is_active    boolean     NOT NULL DEFAULT true
);

-- ============================================================
-- 8. BLOG POSTS
-- ============================================================
CREATE TABLE public.blog_posts (
  id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  title       text        NOT NULL,
  description text,
  category    text        NOT NULL,
  -- category 값: 'Fashion'|'Lifestyle'|'Beauty'|'Trends'
  tags        text[]      NOT NULL DEFAULT '{}',
  image_url   text,
  updated_at  timestamptz NOT NULL DEFAULT now(),
  created_at  timestamptz NOT NULL DEFAULT now()
);

-- ============================================================
-- 9. BLOG SECTIONS (블로그 본문 섹션)
-- blog_posts.id 에 귀속, 순서대로 렌더링
-- ============================================================
CREATE TABLE public.blog_sections (
  id           uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  blog_post_id uuid        NOT NULL REFERENCES public.blog_posts(id) ON DELETE CASCADE,
  type         text        NOT NULL CHECK (type IN ('text', 'image')),
  value        text,
  -- type='text' 이면 본문 텍스트
  -- type='image' 이면 단일 이미지 URL
  images       text[]      NOT NULL DEFAULT '{}',
  -- type='image' 이면 갤러리 이미지 배열 (비어있으면 value 단독 사용)
  sort_order   integer     NOT NULL DEFAULT 0
);

-- ============================================================
-- 10. ADDRESSES (기기별 배송지)
-- user_id = device UUID (anonymous)
-- ============================================================
CREATE TABLE public.addresses (
  id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     uuid        NOT NULL,
  first_name  text        NOT NULL,
  last_name   text        NOT NULL,
  street      text        NOT NULL,
  city        text        NOT NULL,
  state       text        NOT NULL,
  zip_code    text        NOT NULL,
  phone       text        NOT NULL,
  is_default  boolean     NOT NULL DEFAULT false,
  created_at  timestamptz NOT NULL DEFAULT now()
);

-- ============================================================
-- 11. PAYMENT METHODS (기기별 저장 카드)
-- 카드 번호는 마스킹 상태로만 저장 (실제 결제 연동 없음)
-- ============================================================
CREATE TABLE public.payment_methods (
  id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     uuid        NOT NULL,
  brand       text        NOT NULL,   -- 'Master Card', 'Visa'
  number      text        NOT NULL,   -- '5124 **** **** 1234'
  expiry      text,                   -- '03/25'
  is_default  boolean     NOT NULL DEFAULT false,
  created_at  timestamptz NOT NULL DEFAULT now()
);

-- ============================================================
-- 12. CART ITEMS (기기별 장바구니)
-- UNIQUE 제약으로 동일 상품+옵션은 quantity만 증가
-- ============================================================
CREATE TABLE public.cart_items (
  id             uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id        uuid        NOT NULL,
  product_id     uuid        NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  quantity       integer     NOT NULL DEFAULT 1 CHECK (quantity > 0),
  selected_size  text,
  selected_color text,
  created_at     timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, product_id, selected_size, selected_color)
);

-- ============================================================
-- 13. WISHLISTS (찜 목록)
-- ============================================================
CREATE TABLE public.wishlists (
  id         uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    uuid        NOT NULL,
  product_id uuid        NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, product_id)
);

-- ============================================================
-- 14. SEARCH HISTORY (기기별 최근 검색어)
-- ============================================================
CREATE TABLE public.search_history (
  id         uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    uuid        NOT NULL,
  term       text        NOT NULL,
  searched_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, term)
);

-- ============================================================
-- 15. ORDERS (주문 헤더)
-- ============================================================
CREATE TABLE public.orders (
  id               uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id          uuid        NOT NULL,
  total_amount     numeric     NOT NULL,
  shipping_method  text        NOT NULL DEFAULT 'pickup'
                               CHECK (shipping_method IN ('pickup', 'delivery')),
  shipping_cost    numeric     NOT NULL DEFAULT 0,
  status           text        NOT NULL DEFAULT 'created'
                               CHECK (status IN ('created', 'confirmed', 'shipped', 'delivered', 'cancelled')),
  -- 주문 시점 배송지 스냅샷 (address 변경돼도 주문 내역 보존)
  shipping_address jsonb,
  created_at       timestamptz NOT NULL DEFAULT now()
);

-- ============================================================
-- 16. ORDER ITEMS (주문 라인 아이템)
-- product_id: 상품 삭제 시 NULL 허용 (스냅샷으로 보존)
-- ============================================================
CREATE TABLE public.order_items (
  id             uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id       uuid        NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id     uuid        REFERENCES public.products(id) ON DELETE SET NULL,
  -- 주문 시점 스냅샷 (상품 수정/삭제 후에도 주문 내역 유지)
  product_name   text        NOT NULL,
  product_brand  text,
  unit_price     numeric     NOT NULL,
  quantity       integer     NOT NULL DEFAULT 1,
  selected_size  text,
  selected_color text,
  image_url      text
);

-- ============================================================
-- INDEXES
-- ============================================================
CREATE INDEX idx_products_category     ON public.products(category);
CREATE INDEX idx_cart_items_user_id    ON public.cart_items(user_id);
CREATE INDEX idx_wishlists_user_id     ON public.wishlists(user_id);
CREATE INDEX idx_orders_user_id        ON public.orders(user_id);
CREATE INDEX idx_blog_sections_post_id ON public.blog_sections(blog_post_id, sort_order);
CREATE INDEX idx_search_history_user   ON public.search_history(user_id, searched_at DESC);
CREATE INDEX idx_addresses_user_id     ON public.addresses(user_id);
CREATE INDEX idx_payment_methods_user  ON public.payment_methods(user_id);
