import { Title } from 'solid-start';
import Counter from '~/components/Counter';

export default function Home() {
  return (
    <main class="text-center p-4 mx-auto">
      <Title>Hello World</Title>
      <h1 class="text-[#335d92] uppercase text-4rem font-100 m-(x-auto y16) max-lg:max-w-56">Hello world!</h1>
      <Counter />
      <p class="max-lg:max-w-56 m-(y4 x-auto)">
        Visit{' '}
        <a href="https://start.solidjs.com" target="_blank" class="mr-4" rel="noreferrer">
          start.solidjs.com
        </a>{' '}
        to learn how to build SolidStart apps.
      </p>
    </main>
  );
}
