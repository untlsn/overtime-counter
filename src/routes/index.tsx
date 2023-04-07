import Navigation from '~/components/Navigation';

export default function Home() {
	const [count, setCount] = createSignal(0);

	return (
		<main class="font-sans grid place-items-center min-h-screen bg-c-carbon text-white">
			<article>
				<img src="/favicon.svg" alt="logo" class="h-50" />
				<p class="text-center m-4">
					<button
						type="button"
						onClick={() => setCount(count() + 1)}
						class="bg-white/10 border-(1 #01DD84) rounded-lg p-(x4 y2)"
					>
						{count()}
					</button>
				</p>
			</article>
			<Navigation />
		</main>
	);
}
