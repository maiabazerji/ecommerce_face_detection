SELECT conname
FROM pg_constraint
WHERE conrelid = 'users'::regclass;


