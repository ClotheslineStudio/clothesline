// packages/ui/src/components/core/DatePicker/date-utils.ts
export function toDate(d: any): Date | null {
  if (!d && d !== 0) return null;
  const t = new Date(d);
  return isNaN(t.getTime()) ? null : t;
}

export function isSameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() &&
         a.getMonth() === b.getMonth() &&
         a.getDate() === b.getDate();
}

export function clampDate(d: Date, min: Date | null, max: Date | null): Date {
  if (min && d < min) return min;
  if (max && d > max) return max;
  return d;
}

export function inRange(d: Date, min: Date | null, max: Date | null): boolean {
  if (min && d < min) return false;
  if (max && d > max) return false;
  return true;
}

export function addMonths(d: Date, delta: number): Date {
  const n = new Date(d);
  n.setMonth(n.getMonth() + delta);
  return n;
}

export function addYears(d: Date, delta: number): Date {
  const n = new Date(d);
  n.setFullYear(n.getFullYear() + delta);
  return n;
}

/** Build a 6x7 matrix of dates to render a month grid */
export function monthMatrix(view: Date, weekStartsOn: 0 | 1 = 0, fixedWeeks = true): Date[][] {
  const first = new Date(view.getFullYear(), view.getMonth(), 1);
  const startOffset = (first.getDay() - weekStartsOn + 7) % 7; // 0..6
  const gridStart = new Date(first);
  gridStart.setDate(first.getDate() - startOffset);

  const weeks: Date[][] = [];
  let cursor = new Date(gridStart);

  const weeksToRender = fixedWeeks ? 6 : 5; // will extend to 6 if needed

  for (let w = 0; w < 6; w++) {
    const row: Date[] = [];
    for (let d = 0; d < 7; d++) {
      row.push(new Date(cursor));
      cursor.setDate(cursor.getDate() + 1);
    }
    weeks.push(row);
  }

  if (!fixedWeeks) {
    // Trim leading/trailing weeks that don't include current month days
    while (weeks.length && weeks[0].every(day => day.getMonth() !== view.getMonth())) weeks.shift();
    while (weeks.length && weeks[weeks.length - 1].every(day => day.getMonth() !== view.getMonth())) weeks.pop();
  }
  return weeks;
}

export function formatMonthYear(d: Date, locale = 'en-US') {
  return new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' }).format(d);
}
export function formatWeekdayShort(index: number, locale = 'en-US', weekStartsOn: 0 | 1 = 0) {
  const day = (index + weekStartsOn) % 7;
  // Use a fixed reference week starting on Sunday
  const ref = new Date(Date.UTC(2025, 0, 5 + day)); // Jan 5, 2025 is a Sunday
  return new Intl.DateTimeFormat(locale, { weekday: 'short' }).format(ref);
}