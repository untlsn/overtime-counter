import { getCurrentMonthQuery } from '~/dbController/months';
import { getFromSession } from '~/api/auth';
import { db, monthsTable } from '~/db';
import { Navigate, redirect } from 'solid-start';

export const routeData = () => createServerData$(async (_key, ev) => {
	const now = new Date();
	const userId = await getFromSession(ev.request, 'userId');
	if (!userId) return redirect('/');

	const selector = {
		month: now.getMonth(),
		year:  now.getFullYear(),
		owner: +userId,
	};

	const { id } =
			getCurrentMonthQuery.get(selector) ||
			db.insert(monthsTable).values(selector).run();

	return id;
});

const isValidNumber = (number: unknown) => typeof number == 'number' && !isNaN(number);

export default function Current() {
	const monthId = useRouteData<typeof routeData>();

	return (
		<Show when={isValidNumber(monthId())}>
			<Navigate href={`/months/${monthId()}`} />
		</Show>
	);
}
