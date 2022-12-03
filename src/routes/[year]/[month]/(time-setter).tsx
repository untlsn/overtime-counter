import dayjs from 'dayjs';
import CalendarPicker from '~/components/inputs/CalendarPicker';

interface TimePair {
  start: number,
  end: number
}

export default function TimeSetter() {
  const params = useParams();
  const inputs = [] as HTMLInputElement[];
  const [times, setTimes] = createStore<Record<number, TimePair[]>>({});
  const [selected, setSelected] = createSignal(1);
  const selectedTimes = () => times[selected()] || [];

  const submit = () => batch(() => {
    const [start, end] = inputs.map((ev) => {
      const value = ev.value.includes(':') ? ev.value : `${ev.value}:00`;
      ev.value = '';

      return dayjs(value, 'HH:mm').minutesOfDay();
    });
    setTimes(selected(), (arr = []) => [...arr, { start, end }]);
  });

  const formatFromMinutes = (value: number) => dayjs().minutesOfDay(value).format('HH:mm');
  const getDiff = ({ start, end }: TimePair) => {
    const diff = (end - start);
    const hour = (diff / 60).toFixed(0);
    const minutes = diff % 60;

    if (!minutes) return `${hour}h`;

    return `${hour}h ${String(minutes).padStart(2, '0')}m`;
  };

  const reduceSelectedTimes = (type: 'start' | 'end') => selectedTimes().map((v) => v[type]).reduce((acc, cur) => acc + cur, 0);

  return (
    <div class="p-8 flex justify-between">
      <CalendarPicker
        year={Number(params.year)}
        month={Number(params.month)}
        selected={selected()}
        setSelected={setSelected}
      />
      <ul>
        <For each={selectedTimes()}>
          {(timePair) => (
            <li>
              <span>{formatFromMinutes(timePair.start)} - {formatFromMinutes(timePair.end)}</span>
              <span> ({getDiff(timePair)})</span>
            </li>
          )}
        </For>
      </ul>
      <div>
        Total: {getDiff({
        start: reduceSelectedTimes('start'),
        end: reduceSelectedTimes('end'),
      })}
      </div>
      <form
        class="inline-block"
        onSubmit={(ev) => {
          ev.preventDefault();
          submit();
        }}
      >
        <input ref={inputs[0]} class="border-1 rounded-lg mr-2" />
        <input ref={inputs[1]} class="border-1 rounded-lg" />
        <div class="text-right mt-2">
          <button class="" type="submit">
            Dodaj
          </button>
        </div>
      </form>
    </div>
  );
}
