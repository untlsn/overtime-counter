import CalendarPicker from '~/components/inputs/CalendarPicker';

export default function TimeSetter() {
  const params = useParams();

  return (
    <div class="p-8">
      <CalendarPicker year={Number(params.year)} month={Number(params.month)} />
    </div>
  );
}
