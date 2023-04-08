import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';

export const usersTable = sqliteTable('users', {
	id:       integer('id').primaryKey(),
	login:    text('login').notNull(),
	password: text('password').notNull(),
});

export const monthsTable = sqliteTable('months', {
	id:    integer('id').primaryKey(),
	month: integer('month').notNull(),
	year:  integer('year').notNull(),
	owner: integer('owner').notNull().references(() => usersTable.id),
});

export const daysTable = sqliteTable('days', {
	id:    integer('id').primaryKey(),
	day:   integer('day').notNull(),
	hours: text('hours').default('[]'),
	month: integer('month').notNull().references(() => monthsTable.id),
});

const sqlite = new Database('sqlite.db');
export const db = drizzle(sqlite);
migrate(db, { migrationsFolder: './migrations' });
