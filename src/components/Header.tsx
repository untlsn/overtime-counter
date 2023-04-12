import LoginButtons from '~/components/Header/LoginButtons';
import { useAuth$ } from '~/api/auth';
import LogoutButton from '~/components/Header/LogoutButton';

export default function Header() {
	const auth = useAuth$();


	return (
		<header class="sticky bg-[#80B8E4] flex px-4 h-16 items-center">
			<i class="i-bi-clock-history text-white size-10">
				logo
			</i>
			<Show when={auth()?.isLogged} fallback={<LoginButtons />}>
				<LogoutButton />
			</Show>
		</header>
	);
}
