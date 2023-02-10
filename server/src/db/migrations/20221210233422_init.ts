import { Knex } from "knex";

export const up = async (knex: Knex): Promise<void> =>
  await knex.schema
    .createTable("product", (table) => {
      table.increments().primary();
      table.string("name").notNullable().unique();
      table.decimal("price").unsigned().defaultTo(0);
      table.text("description").notNullable();
      table.integer("views").unsigned().notNullable().defaultTo(0);
      table.integer("like").unsigned().notNullable().defaultTo(0);
      table.integer("dislike").unsigned().notNullable().defaultTo(0);
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    })
    .createTable("attribute", (table) => {
      table.increments().primary();
      table.string("name").notNullable();
      table.integer("order").notNullable();
      table.integer("category_id").unsigned().notNullable();
      table
        .foreign("category_id")
        .references("id")
        .inTable("category")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.unique(["name", "category_id"]);
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    })
    .createTable("attribute_value", (table) => {
      table.increments().primary();
      table.string("value").notNullable();
      table.integer("order").notNullable();
      table.integer("attribute_id").unsigned().notNullable();
      table
        .foreign("attribute_id")
        .references("id")
        .inTable("attribute")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.unique(["value", "attribute_id"]);
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    })
    .createTable("product_attribute_value", (table) => {
      table.integer("product_id").unsigned().notNullable();
      table
        .foreign("product_id")
        .references("id")
        .inTable("product")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.integer("attribute_id").unsigned().notNullable();
      table
        .foreign("attribute_id")
        .references("id")
        .inTable("attribute")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.integer("attribute_value_id").unsigned().notNullable();
      table
        .foreign("attribute_value_id")
        .references("id")
        .inTable("attribute_value")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.primary(["product_id", "attribute_id", "attribute_value_id"]);
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    })
    .createTable("user", (table) => {
      table.increments().primary();
      table.string("first_name").notNullable();
      table.string("last_name").notNullable();
      table.string("phone_number").unique();
      table.string("avatar");
      table.string("email").notNullable().unique();
      table.string("password").notNullable();
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    })
    .createTable("role", (table) => {
      table.increments().primary();
      table.string("role", 255).notNullable().unique();
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    })
    .createTable("token", (table) => {
      table.increments().primary();
      table.text("refreshToken").notNullable();
      table.integer("user_id").unsigned().notNullable();
      table
        .foreign("user_id")
        .references("id")
        .inTable("user")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    })
    .createTable("user_role", (table) => {
      table.integer("user_id").unsigned().notNullable();
      table
        .foreign("user_id")
        .references("id")
        .inTable("user")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.integer("role_id").unsigned().notNullable();
      table.foreign("role_id").references("id").inTable("role");
      table.primary(["user_id", "role_id"]);
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    })

    .createTable("view", (table) => {
      table.increments().primary();
      table.integer("product_id").unsigned().notNullable();
      table
        .foreign("product_id")
        .references("id")
        .inTable("product")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    })
    .createTable("category", (table) => {
      table.increments().primary();
      table.string("name").unique().notNullable();
      table.string("path").unique().notNullable();
      table.tinyint("search_visibillity");
      table.integer("parent_id").unsigned().defaultTo(null);
      table
        .foreign("parent_id")
        .references("id")
        .inTable("category")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    })
    .createTable("product_category", (table) => {
      table.integer("product_id").unsigned().notNullable();
      table
        .foreign("product_id")
        .references("id")
        .inTable("product")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.integer("category_id").unsigned().notNullable();
      table.foreign("category_id").references("id").inTable("category");
      table.primary(["product_id", "category_id"]);
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    })
    .createTable("image", (table) => {
      table.increments().primary();
      table.integer("product_id").unsigned().notNullable();
      table
        .foreign("product_id")
        .references("id")
        .inTable("product")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.string("path").unique();
      table.integer("order").notNullable();
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    })
    .createTable("price_dynamic", (table) => {
      table.increments().primary();
      table.decimal("new_price").unsigned().defaultTo(0);
      table.integer("product_id").unsigned().notNullable();
      table
        .foreign("product_id")
        .references("id")
        .inTable("product")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    })
    .createTable("reaction", (table) => {
      table.integer("reaction_action").notNullable();
      table.integer("user_id").unsigned().notNullable();
      table
        .foreign("user_id")
        .references("id")
        .inTable("user")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.integer("product_id").unsigned().notNullable();
      table
        .foreign("product_id")
        .references("id")
        .inTable("product")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.primary(["user_id", "product_id"]);
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    })
    .createTable("favorite", (table) => {
      table.integer("user_id").unsigned().notNullable();
      table
        .foreign("user_id")
        .references("id")
        .inTable("user")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.integer("product_id").unsigned().notNullable();
      table
        .foreign("product_id")
        .references("id")
        .inTable("product")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.primary(["product_id", "user_id"]);
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    })
    .createTable("comment", (table) => {
      table.increments().primary();
      table.text("text").notNullable();
      table.integer("user_id").unsigned().notNullable();
      table.foreign("user_id").references("id").inTable("user");
      table.integer("product_id").unsigned().notNullable();
      table
        .foreign("product_id")
        .references("id")
        .inTable("product")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    });

export const down = async (knex: Knex): Promise<void> =>
  await knex.schema
    .dropTableIfExists("product")
    .dropTableIfExists("user")
    .dropTableIfExists("role")
    .dropTableIfExists("user_role")
    .dropTableIfExists("token")
    .dropTableIfExists("view")
    .dropTableIfExists("category")
    .dropTableIfExists("product_category")
    .dropTableIfExists("price_dynamic")
    .dropTableIfExists("attribute")
    .dropTableIfExists("attribute_value")
    .dropTableIfExists("product_attribute_value")
    .dropTableIfExists("reaction")
    .dropTableIfExists("comment")
    .dropTableIfExists("favorite")
    .dropTableIfExists("image");
