-- FluentPath AI — schema inicial (Fase 0/1)
-- Materializa o "checkpoint" dos .md (continuidade-mvp-e-tokens.md) em tabelas reais.
-- Row Level Security garante que cada aluno só acessa os próprios dados.

-- Perfil do aluno (1:1 com auth.users)
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text,
  goal text,
  minutes_per_day int,
  passing_score_percent int not null default 100
    check (passing_score_percent between 85 and 100),
  study_mode text not null default 'FLEXIVEL'
    check (study_mode in ('FLEXIVEL', 'POMODORO')),
  focus_minutes int,
  break_minutes int,
  professional_english jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Estado atual de aprendizagem (onde o aluno parou)
create table if not exists public.student_state (
  user_id uuid primary key references auth.users (id) on delete cascade,
  cefr text not null default 'A1'
    check (cefr in ('A1', 'A2', 'B1', 'B2', 'C1', 'C2')),
  module text,
  lesson text,
  phase text not null default 'TEORIA',
  status text not null default 'EM_ANDAMENTO',
  revision int not null default 1,
  updated_at timestamptz not null default now()
);

-- Competências CEFR por aluno (ex.: A1-L, A1-SP...)
create table if not exists public.competencies (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  competency_code text not null,
  status text not null default 'NAO_AVALIADO'
    check (status in ('DOMINADO', 'EM_REFORCO', 'NAO_AVALIADO', 'PENDENTE_DE_MODALIDADE')),
  evidence jsonb not null default '[]'::jsonb,
  updated_at timestamptz not null default now(),
  unique (user_id, competency_code)
);

-- Avaliações aplicadas
create table if not exists public.assessments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  lesson_code text,
  score_percent numeric,
  rubrics jsonb not null default '{}'::jsonb,
  status text,
  created_at timestamptz not null default now()
);

-- Revisão espaçada
create table if not exists public.reviews_due (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  topic_id text not null,
  due_date date not null,
  status text not null default 'PENDENTE'
    check (status in ('PENDENTE', 'VENCIDA', 'CONCLUIDA')),
  last_result text,
  next_action text,
  created_at timestamptz not null default now()
);

-- Envios de áudio (speaking/listening) — arquivo fica no Storage
create table if not exists public.audio_submissions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  lesson_code text,
  question_id text,
  storage_path text not null,
  transcript text,
  feedback jsonb,
  created_at timestamptz not null default now()
);

-- ===== Row Level Security =====
alter table public.profiles enable row level security;
alter table public.student_state enable row level security;
alter table public.competencies enable row level security;
alter table public.assessments enable row level security;
alter table public.reviews_due enable row level security;
alter table public.audio_submissions enable row level security;

-- Política genérica: dono do registro (user_id / id) tem acesso total.
create policy "own_profile" on public.profiles
  for all using (auth.uid() = id) with check (auth.uid() = id);

create policy "own_state" on public.student_state
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "own_competencies" on public.competencies
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "own_assessments" on public.assessments
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "own_reviews" on public.reviews_due
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "own_audio" on public.audio_submissions
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Cria profile + state automaticamente ao registrar um usuário.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, display_name)
    values (new.id, split_part(new.email, '@', 1))
    on conflict (id) do nothing;
  insert into public.student_state (user_id)
    values (new.id)
    on conflict (user_id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
