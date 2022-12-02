import { createSignal } from "solid-js";

export default function Counter() {
  const [count, setCount] = createSignal(0);

  return (
    <button
      class="p-(y4 x8) text-[#335d92] bg-[#446B9E]/10 rounded-full border-(2 transparent) w-50 tabular-nums outline-none active:bg-opacity-20 hover:border-[#335d92]"
      onClick={() => setCount(v => v + 1)}
    >
      Clicks: {count()}
    </button>
  );
}
