import dayjs from 'dayjs';
import Times from '~/components/utils/Times';

interface CalendarPickerProps {
  month: number,
  year: number,
  selected: number,
  setSelected(value: number): void
}

export default function CalendarPicker(props: CalendarPickerProps) {
  const date = () => dayjs().month(props.month - 1).year(props.year).startOf('month');

  const isSelected = createSelector(() => props.selected);

  return (
    <div class="p-4 w-80 border-1 rounded-lg">
      <h2 class="text-2xl mb-4 capitalize">{date().format('MMMM YYYY')}</h2>
      <ul class="grid-(~ cols-7) text-center">
        <Times count={7}>
          {(i) => (
            <li>{dayjs().weekday(i).format('dd')}</li>
          )}
        </Times>
      </ul>
      <div role="radiogroup" class="grid-(~ cols-7) gap-1">
        <Times count={date().daysInMonth()} increment={1}>
          {(i) => (
            <button
              role="radio"
              aria-checked={isSelected(i)}
              type="button"
              onClick={[props.setSelected, i]}
              style={i == 1 ? {
                'grid-column-start': date().weekday() + 1,
              } : undefined}
              class={clsx(
                'rounded aspect-square',
                isSelected(i)
                  ? 'bg-gray-200 hover:bg-gray-100'
                  : 'bg-gray-100 hover:bg-gray-200',
              )}
            >
              {i}
            </button>
          )}
        </Times>
      </div>
    </div>
  );
}
