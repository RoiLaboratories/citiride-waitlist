-- Existing database migration: make waitlist emails unique across all categories.
-- Run this after the original waitlist_entries table already exists.
-- It does not drop or recreate any tables.

begin;

-- Stop early if the current table already contains the same email in multiple rows.
-- Resolve those duplicates manually, then rerun this migration.
do $$
begin
  if exists (
    select 1
    from public.waitlist_entries
    group by lower(email)
    having count(*) > 1
  ) then
    raise exception 'Cannot enforce unique waitlist emails because duplicate email records already exist. Remove duplicate waitlist emails, then rerun this migration.';
  end if;
end $$;

-- Remove the old rule that allowed one email per category.
drop index if exists public.waitlist_entries_email_category_idx;

-- Add the new rule: one email can appear only once in waitlist_entries.
create unique index if not exists waitlist_entries_email_idx
  on public.waitlist_entries (lower(email));

commit;