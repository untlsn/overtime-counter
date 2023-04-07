import { usersTable, db } from '~/db';
import Navigation from '~/components/Navigation';


export default function Page() {
	const users = createServerData$(() => (
		db.select().from(usersTable).all()
	));

	return (
		<main class="min-h-screen bg-c-carbon text-white grid place-items-center">
			<ul class="space-y-2">
				<For each={users()}>
					{(user) => (
						<li>
							<a href={`/users/${user.id}`} class="cursor-pointer">
								{user.id}
								{'. '}
								{user.fullName}
							</a>
						</li>
					)}
				</For>
			</ul>
			<Navigation />
		</main>
	);
}
