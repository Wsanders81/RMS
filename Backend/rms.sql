\echo 'Delete and recreate rms db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE IF EXISTS rms; 
CREATE DATABASE rms;

-- \connect rms



-- \i rms-schema.sql;

-- \i rms-seed.sql;

-- \echo 'Delete and recreate rms_test db?'
-- \prompt 'Return for yes or control-C to cancel > ' foo
-- DROP DATABASE IF EXISTS rms_test; 
-- CREATE DATABASE rms_test;

-- -- \connect rms_test

-- \i rms-schema.sql