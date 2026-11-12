-- SnapStudio v1 database foundation
-- Run in a fresh Supabase project's SQL editor.
create extension if not exists pgcrypto;

create type public.user_role as enum ('client', 'photographer');
create type public.session_status as enum ('requested', 'awaiting_deposit', 'confirmed', 'completed', 'cancelled');
create type public.gallery_status as enum ('preparing', 'ready', 'archived');
create type public.payment_status as enum ('pending', 'successful', 'failed', 'refunded');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null default '',
  role public.user_role not null default 'client',
  created_at timestamptz not null default now()
);

create table public.packages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text not null default '',
  price_kobo bigint not null check (price_kobo >= 0),
  deposit_kobo bigint not null check (deposit_kobo >= 0 and deposit_kobo <= price_kobo),
  edited_photo_count integer not null default 0 check (edited_photo_count >= 0),
  duration_minutes integer not null default 60 check (duration_minutes > 0),
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.sessions (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.profiles(id),
  package_id uuid not null references public.packages(id),
  preferred_at timestamptz not null,
  confirmed_at timestamptz,
  location text not null default '',
  notes text not null default '',
  status public.session_status not null default 'requested',
  created_at timestamptz not null default now()
);

create table public.galleries (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null unique references public.sessions(id) on delete cascade,
  client_id uuid not null references public.profiles(id),
  title text not null default 'Your SnapStudio Gallery',
  status public.gallery_status not null default 'preparing',
  ready_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.photos (
  id uuid primary key default gen_random_uuid(),
  gallery_id uuid not null references public.galleries(id) on delete cascade,
  storage_path text not null,
  caption text not null default '',
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  unique(gallery_id, storage_path)
);

create table public.photo_favorites (
  photo_id uuid not null references public.photos(id) on delete cascade,
  client_id uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key(photo_id, client_id)
);

create table public.payments (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.sessions(id) on delete cascade,
  client_id uuid not null references public.profiles(id),
  amount_kobo bigint not null check (amount_kobo > 0),
  currency text not null default 'NGN' check (currency = 'NGN'),
  provider text not null default 'paystack',
  provider_reference text unique,
  status public.payment_status not null default 'pending',
  paid_at timestamptz,
  created_at timestamptz not null default now()
);

create index sessions_client_date_idx on public.sessions(client_id, preferred_at);
create index galleries_client_idx on public.galleries(client_id);
create index photos_gallery_sort_idx on public.photos(gallery_id, sort_order);
create index payments_session_idx on public.payments(session_id);

create or replace function public.is_photographer()
returns boolean
language sql
stable
security definer
set search_path = ''
as $
  select exists (
    select 1
    from public.profiles
    where id = (select auth.uid())
      and role = 'photographer'::public.user_role
  );
$;

revoke all on function public.is_photographer() from public;
grant execute on function public.is_photographer() to anon, authenticated;

alter table public.profiles enable row level security;
alter table public.packages enable row level security;
alter table public.sessions enable row level security;
alter table public.galleries enable row level security;
alter table public.photos enable row level security;
alter table public.photo_favorites enable row level security;
alter table public.payments enable row level security;

-- Keep profile roles out of client-controlled updates. Photographer promotion is
-- an owner/admin action in the SQL editor, never a signup form field.
revoke update on table public.profiles from authenticated;
grant update (full_name) on table public.profiles to authenticated;

-- Explicit API grants: row-level security remains the record-level gate.
grant select on public.profiles to authenticated;
grant select on public.packages to anon, authenticated;
grant insert, select, update, delete on public.packages to authenticated;
grant select, insert, update, delete on public.sessions to authenticated;
grant select, insert, update, delete on public.galleries to authenticated;
grant select, insert, update, delete on public.photos to authenticated;
grant select, insert, delete on public.photo_favorites to authenticated;
grant select on public.payments to authenticated;

create policy "Users view own profile and photographers view all profiles"
  on public.profiles for select
  using (id = (select auth.uid()) or (select public.is_photographer()));
create policy "Users update only their own profile"
  on public.profiles for update
  using (id = (select auth.uid()))
  with check (id = (select auth.uid()));

create policy "Public can view active packages" on public.packages for select using (is_active or public.is_photographer());
create policy "Photographers manage packages" on public.packages for all
  using (public.is_photographer()) with check (public.is_photographer());

create policy "Clients view their own sessions" on public.sessions for select
  using (client_id = auth.uid() or public.is_photographer());
create policy "Clients request sessions" on public.sessions for insert
  with check (client_id = auth.uid());
create policy "Photographers manage sessions" on public.sessions for all
  using (public.is_photographer()) with check (public.is_photographer());

create policy "Clients view their own galleries" on public.galleries for select
  using (client_id = auth.uid() or public.is_photographer());
create policy "Photographers manage galleries" on public.galleries for all
  using (public.is_photographer()) with check (public.is_photographer());

create policy "Clients view photos in their own galleries" on public.photos for select
  using (exists (select 1 from public.galleries g where g.id = gallery_id and (g.client_id = auth.uid() or public.is_photographer())));
create policy "Photographers manage photos" on public.photos for all
  using (public.is_photographer()) with check (public.is_photographer());

create policy "Clients view their favourites" on public.photo_favorites for select
  using (client_id = auth.uid() or public.is_photographer());
create policy "Clients favourite photos in their own galleries" on public.photo_favorites for insert
  with check (client_id = auth.uid() and exists (
    select 1 from public.photos p join public.galleries g on g.id = p.gallery_id
    where p.id = photo_id and g.client_id = auth.uid()
  ));
create policy "Clients remove their own favourites" on public.photo_favorites for delete
  using (client_id = auth.uid() or public.is_photographer());

create policy "Clients view their payments" on public.payments for select
  using (client_id = auth.uid() or public.is_photographer());
create policy "Photographers manage payment records" on public.payments for all
  using (public.is_photographer()) with check (public.is_photographer());

-- Important: never expose the Supabase service-role key in browser code.
-- Promote the first photographer profile manually from the Supabase SQL editor
-- after that user has registered:
-- update public.profiles set role = 'photographer' where id = '<AUTH_USER_UUID>';


-- Automatically create a client profile whenever a user registers.
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, role)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'full_name', ''), 'client');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
