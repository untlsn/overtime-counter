import { useAuth$ } from '~/api/auth';
import { useLoginForm$ } from '~/api/login';
import { useLogoutForm$ } from '~/api/logout';

export const routeData = () => ({
	auth:       useAuth$(),
	LoginForm:  useLoginForm$(),
	LogoutForm: useLogoutForm$(),
});

export default function Home() {
	const { auth, LoginForm, LogoutForm } = useRouteData<typeof routeData>();

	return (
		<main class="m-8 space-y-4">
			<h1>OverTime Counter</h1>
			<p>{auth()?.isLogged ? 'Logged' : 'Not logged'}</p>
			<Show when={auth()?.isLogged}>
				<LogoutForm>
					<button class="border-2 p-(x4 y2) rounded-lg" type="submit">Logout</button>
				</LogoutForm>
			</Show>
			<LoginForm>
				<input name="login" />
				<input name="password" type="password" />
				<button type="submit">Submit</button>
			</LoginForm>
		</main>
	);
}
