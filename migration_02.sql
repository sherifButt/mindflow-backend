CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "username" varchar UNIQUE,
  "email" varchar UNIQUE,
  "password" varchar,
  "jwt" varchar,
  "created_at" timestamp,
  "updated_at" timestamp
);

CREATE TABLE "token_black_list" (
  "id" SERIAL PRIMARY KEY,
  "user_id" integer,
  "token_id" varchar(255),
  "blacklisted_at" timestamp,
  "created_at" timestamp,
  "updated_at" timestamp
);

CREATE TABLE "diagrams" (
  "id" SERIAL PRIMARY KEY,
  "diagram_data" jsonb,
  "name" varchar,
  "slug" varchar UNIQUE,
  "description" varchar,
  "created_at" timestamp,
  "updated_at" timestamp,
  "created_by" integer,
  "sharing_settings" varchar
);

CREATE TABLE "nodes" (
  "id" SERIAL PRIMARY KEY,
  "diagram_id" integer,
  "position" jsonb,
  "type" varchar,
  "data" jsonb,
  "created_at" timestamp,
  "updated_at" timestamp,
  "created_by" integer
);

CREATE TABLE "edges" (
  "id" SERIAL PRIMARY KEY,
  "diagram_id" integer,
  "source" integer,
  "target" integer,
  "animated" boolean,
  "label" varchar
);

CREATE TABLE "node_edge" (
  "id" SERIAL PRIMARY KEY,
  "edge_id" integer,
  "node_id" integer,
  "created_at" timestamp,
  "updated_at" timestamp
);

CREATE TABLE "node_instructions" (
  "id" SERIAL PRIMARY KEY,
  "node_id" integer,
  "instruction_types_id" integer,
  "created_at" timestamp,
  "updated_at" timestamp,
  "created_by" text
);

CREATE TABLE "instruction_types" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar,
  "slug" varchar UNIQUE,
  "description" varchar,
  "parameters" varchar,
  "priority" integer,
  "max_retry" integer,
  "created_at" timestamp,
  "updated_at" timestamp,
  "created_by" integer
);

CREATE TABLE "diagram_instructions" (
  "id" SERIAL PRIMARY KEY,
  "diagram_id" integer,
  "instruction_types_id" integer,
  "node_id" integer,
  "instruction_order" integer,
  "parameters" varchar,
  "created_at" timestamp,
  "updated_at" timestamp
);

CREATE TABLE "jobs" (
  "id" SERIAL PRIMARY KEY,
  "instruction_types_id" integer,
  "diagram_id" integer,
  "node_id" integer,
  "scheduled_time" timestamp,
  "retry_count" integer,
  "trigger_time" timestamp,
  "created_at" timestamp,
  "updated_at" timestamp
);

CREATE TABLE "avatars" (
  "id" SERIAL PRIMARY KEY,
  "user_id" integer,
  "image_url" varchar,
  "created_at" timestamp,
  "updated_at" timestamp
);

CREATE TABLE "user_roles" (
  "id" SERIAL PRIMARY KEY,
  "user_id" integer,
  "role" varchar
);

CREATE TABLE "action_logs" (
  "id" SERIAL PRIMARY KEY,
  "user_id" integer,
  "action" varchar,
  "timestamp" timestamp
);

CREATE TABLE "password_resets" (
  "id" SERIAL PRIMARY KEY,
  "user_id" integer,
  "reset_token" varchar,
  "expiry_time" timestamp
);

CREATE TABLE "email_templates" (
  "id" SERIAL PRIMARY KEY,
  "template_name" varchar,
  "template_content" varchar,
  "created_at" timestamp,
  "updated_at" timestamp,
  "created_by" integer
);

CREATE TABLE "notifications" (
  "id" SERIAL PRIMARY KEY,
  "user_id" integer,
  "content" varchar,
  "created_at" timestamp,
  "is_read" boolean
);

ALTER TABLE "diagram_instructions" ADD FOREIGN KEY ("instruction_types_id") REFERENCES "instruction_types" ("id");

ALTER TABLE "diagrams" ADD FOREIGN KEY ("created_by") REFERENCES "users" ("id");

ALTER TABLE "instruction_types" ADD FOREIGN KEY ("created_by") REFERENCES "users" ("id");

ALTER TABLE "jobs" ADD FOREIGN KEY ("instruction_types_id") REFERENCES "instruction_types" ("id");

ALTER TABLE "jobs" ADD FOREIGN KEY ("diagram_id") REFERENCES "diagrams" ("id");

ALTER TABLE "avatars" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "user_roles" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "action_logs" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "password_resets" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "notifications" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "node_instructions" ADD FOREIGN KEY ("node_id") REFERENCES "nodes" ("id");

ALTER TABLE "node_instructions" ADD FOREIGN KEY ("instruction_types_id") REFERENCES "instruction_types" ("id");

ALTER TABLE "node_edge" ADD FOREIGN KEY ("node_id") REFERENCES "nodes" ("id");

ALTER TABLE "edges" ADD FOREIGN KEY ("diagram_id") REFERENCES "diagrams" ("id");

ALTER TABLE "node_edge" ADD FOREIGN KEY ("edge_id") REFERENCES "edges" ("id");

ALTER TABLE "nodes" ADD FOREIGN KEY ("diagram_id") REFERENCES "diagrams" ("id");

ALTER TABLE "email_templates" ADD FOREIGN KEY ("created_by") REFERENCES "users" ("id");

ALTER TABLE "token_black_list" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "diagram_instructions" ADD FOREIGN KEY ("diagram_id") REFERENCES "diagrams" ("id");

ALTER TABLE "diagram_instructions" ADD FOREIGN KEY ("node_id") REFERENCES "nodes" ("id");

ALTER TABLE "nodes" ADD FOREIGN KEY ("created_by") REFERENCES "users" ("id");
