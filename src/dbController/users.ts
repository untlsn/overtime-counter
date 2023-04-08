import type { InferModel } from 'drizzle-orm';
import { placeholder } from 'drizzle-orm';
import { db, usersTable } from '~/db';
import { eq } from 'drizzle-orm/expressions';
import type { SQLiteInsertValue } from 'drizzle-orm/sqlite-core/query-builders/insert';

export type User = InferModel<typeof usersTable>
export type UserInset = SQLiteInsertValue<typeof usersTable>

const getUserByLoginQuery = db.select().from(usersTable)
	.where(eq(usersTable.login, placeholder('login')))
	.prepare();

export const getUserByLogin = (login: string): User | undefined => getUserByLoginQuery.get({ login });

export const createUser = (data: UserInset): User => db.insert(usersTable).values(data).run();
