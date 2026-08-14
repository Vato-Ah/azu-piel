--Marcelo Navarro
-- AZU-PIEL · Esquema final de la base de datos (Supabase)
-- Ejecutar en un proyecto vacío para recrear todo el esquema


--1 PROFILES extiende auth.users con el rol del usuario
create table public.profiles (
  id uuid primary key references auth.users on delete cascade,
  role text not null default 'cliente' check (role in ('cliente', 'admin')),
  created_at timestamptz not null default now()
);

--2 PRODUCTS: recurso principal de la tienda
create table public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null,
  price numeric not null,
  description text,
  image text,
  owner_id uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now()
);

--3 ORDERS: pedidos que realizan los clientes
create table public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  product_id uuid not null references public.products(id) on delete cascade,
  status text not null default 'pendiente',
  created_at timestamptz not null default now()
);

-- Activar Row Level Security en las tres tablas
alter table public.profiles enable row level security;
alter table public.products enable row level security;
alter table public.orders enable row level security;

-- Función auxiliar security definer: consulta el rol sin pasar por RLS,
-- evitando la recursión infinita en políticas que consultan profiles
create or replace function public.is_admin()
returns boolean
language sql
security definer
stable
set search_path = public
as $$
  select exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  );
$$;

-- ============ POLITICAS DE PROFILES ============
create policy "Los usuarios leen su propio perfil"
on public.profiles for select
using (auth.uid() = id);

create policy "Los admins leen todos los perfiles"
on public.profiles for select
using (public.is_admin());

-- ============ POLITICAS DE PRODUCTS ============
create policy "Cualquiera puede leer productos"
on public.products for select
using (true);

create policy "Solo admins crean productos"
on public.products for insert
to authenticated
with check (public.is_admin());

create policy "Admin o dueño puede actualizar productos"
on public.products for update
using (auth.uid() = owner_id or public.is_admin());

create policy "Admin o dueño puede eliminar productos"
on public.products for delete
using (auth.uid() = owner_id or public.is_admin());

-- ============ POLITICAS DE ORDERS ============
create policy "Los clientes crean sus propios pedidos"
on public.orders for insert
to authenticated
with check (auth.uid() = user_id);

create policy "Los usuarios leen sus propios pedidos"
on public.orders for select
using (auth.uid() = user_id);

create policy "Los admins leen todos los pedidos"
on public.orders for select
using (public.is_admin());

-- ============ TRIGGER: perfil automatico al registrarse ============
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, role)
  values (new.id, 'cliente');
  return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();