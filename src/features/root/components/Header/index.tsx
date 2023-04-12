import LoginButtons from '~/features/root/components/Header/LoginButtons';
import { useAuth$ } from '~/api/auth';
import LogoutButton from '~/features/root/components/Header/LogoutButton';
import Nav from '~/features/root/components/Nav';

export default function Header() {
	const auth = useAuth$();


	return (
		<header class="sticky bg-[#80B8E4] flex gap-4 px-4 h-16 items-center z-1000">
			<Nav />
			<A href="/" class="text-white">
				OverTime Counter
			</A>
			<Show when={auth()?.isLogged} fallback={<LoginButtons />}>
				<LogoutButton />
			</Show>
		</header>
	);
}
