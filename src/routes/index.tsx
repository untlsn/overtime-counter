import auth$ from '~/api/auth';
import login$ from '~/api/login';
import logout$ from '~/api/logout';

export const routeData = () => {
	const authInvalidate = { invalidate: ['auth'] };
	const [, { Form }] = createServerAction$(login$, authInvalidate);
	const auth = createServerData$(auth$, { key: ['auth'] });
	const [, { Form: LogoutForm }] = createServerAction$(logout$, authInvalidate);

	return { auth, Form, LogoutForm };
};

export default function Home() {
	const { auth, Form, LogoutForm } = useRouteData<typeof routeData>();

	return (
		<main class="m-8 space-y-4">
			<h1>OverTime Counter</h1>
			<p>{auth()?.isLogged ? 'Logged' : 'Not logged'}</p>
			<Show when={auth()?.isLogged}>
				<LogoutForm>
					<button class="border-2 p-(x4 y2) rounded-lg" type="submit">Logout</button>
				</LogoutForm>
			</Show>
			<Form>
				<input name="login" />
				<input name="password" type="password" />
				<button type="submit">Submit</button>
			</Form>
		</main>
	);
}
