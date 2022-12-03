import customParseFormat from 'dayjs/plugin/customParseFormat';
import weekday from 'dayjs/plugin/weekday';
import isToday from 'dayjs/plugin/isToday';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/pl';

[weekday, customParseFormat, isToday].forEach((plugin) => dayjs.extend(plugin));

dayjs.extend((option, dayjsClass) => {
  dayjsClass.prototype.minutesOfDay = function minutesOfDay(value?: number) {
    const day = this as Dayjs;

    if (typeof value == 'number') {
      return day.hour(value / 60).minute(value % 60).second(0);
    }

    return day.hour() * 60 + day.minute();
  } as any;
});
dayjs.locale('pl');

declare module 'dayjs' {
  interface Dayjs {
    minutesOfDay(): number
    minutesOfDay(value: number): Dayjs
  }
}
