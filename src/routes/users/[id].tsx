import { db, usersTable } from '~/db';
import { eq } from 'drizzle-orm/expressions';
import type { RouteDataFuncArgs } from '@solidjs/router';
import type { InferModel } from 'drizzle-orm';
import { createServerData$ } from 'solid-start/server';

export const routeData = ({ params }: RouteDataFuncArgs) => (
	createServerData$(async ([,strId]): Promise<InferModel<typeof usersTable> | undefined> => {
		const id = +strId;
		if (!id) return undefined;
		return db.select().from(usersTable).where(eq(usersTable.id, id)).get();
	}, {
		key: () => ['users', params.id] as const,
	})
);

export default function Page() {
	const user = useRouteData<typeof routeData>();


	return (
		<main class="grid place-items-center bg-c-carbon text-white min-h-screen">
			<p>
				{user()?.id}
				{'. '}
				{user()?.fullName}
			</p>
			<A href="/users">All users</A>
		</main>
	);
}
