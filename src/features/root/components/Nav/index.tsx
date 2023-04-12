import { Transition } from 'solid-transition-group';
import NavSelf from '~/features/root/components/Nav/NavSelf';

function LiteTransition(props: { class: string, enterToClass: string, exitToClass: string, children: any }) {
	return (
		<Transition
			enterActiveClass={props.class}
			exitActiveClass={props.class}
			exitClass={props.enterToClass}
			enterToClass={props.enterToClass}
			exitToClass={props.exitToClass}
			enterClass={props.exitToClass}
		>
			{props.children}
		</Transition>
	);
}

export default function Nav() {
	const [open, setOpen] = createSignal(false);
	const location = useLocation();

	createEffect(() => {
		location.pathname;
		setOpen(false);
	});

	return (
		<>
			<button class="i-bi-clock-history size-10 text-white" type="button" onClick={() => setOpen(!open())}>
				{open() ? 'close' : 'open'}
				{' nav'}
			</button>
			<LiteTransition
				class="transition-opacity"
				enterToClass="opacity-100"
				exitToClass="opacity-0"
			>
				<Show when={open()}>
					<div aria-hidden="true" class="bg-black/30 fixed inset-0 size-100v mt-16" />
				</Show>
			</LiteTransition>
			<LiteTransition
				class="transition-transform"
				enterToClass="translate-x-0"
				exitToClass="-translate-x-full"
			>
				<Show when={open()}>
					<NavSelf />
				</Show>
			</LiteTransition>
		</>
	);
}
