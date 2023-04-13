import { placeholder } from 'drizzle-orm';
import { db, monthsTable } from '~/db';
import { and, eq } from 'drizzle-orm/expressions';

export const getCurrentMonthQuery = db.select().from(monthsTable)
	.where(and(
		eq(monthsTable.month, placeholder('month')),
		eq(monthsTable.year, 	placeholder('year')),
		eq(monthsTable.owner, placeholder('owner')),
	)).prepare();
