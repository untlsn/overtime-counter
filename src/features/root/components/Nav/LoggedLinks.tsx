import Link from '~/features/root/components/Nav/Link';
import { Show } from 'solid-js';
import { useAuth$ } from '~/api/auth';


export default function LoggedLinks() {
	const auth = useAuth$();

	return (
		<Show when={auth()?.isLogged}>
			<Link href="/months/current">Current month</Link>
			<Link href="/months/previous">Previous month</Link>
		</Show>
	);
}
