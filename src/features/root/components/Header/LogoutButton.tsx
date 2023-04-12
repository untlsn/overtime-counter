import { useLogoutForm$ } from '~/api/logout';

export default function LogoutButton() {
	const LogoutForm = useLogoutForm$();

	return (
		<LogoutForm class="ml-auto">
			<button class="border-2 text-white p-(x4 y2) rounded-lg hocus:opacity-60" type="submit">Logout</button>
		</LogoutForm>
	);
}
