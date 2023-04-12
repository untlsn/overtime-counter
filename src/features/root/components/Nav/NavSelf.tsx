import Link from '~/features/root/components/Nav/Link';
import LoggedLinks from '~/features/root/components/Nav/LoggedLinks';

export default function NavSelf() {
	return (
		<nav class="fixed top-0 left-0 mt-16 size-100v z-1000">
			<ul class="bg-white w-100 max-w-9/10 h-screen p-4">
				<Link href="/">Home</Link>
				<LoggedLinks />
			</ul>
		</nav>
	);
}
