import { timesMap } from 'x';

interface TimesProps {
  count: number,
  increment?: number
  children(value: number): any,
}

export default function Times(props: TimesProps) {
  const timesArr = createMemo(() => timesMap(props.count, (v) => v + (props.increment || 0)));

  return (
    <For each={timesArr()}>
      {props.children}
    </For>
  );
}
