// packages/ui/src/components/core/DatePicker/types.ts
export type WeekStart = 0 | 1; // 0=Sunday, 1=Monday

export type DateLike = Date | string | number | null;

export type DatePickerProps = {
  value?: DateLike;        // selected date
  minDate?: DateLike | null;
  maxDate?: DateLike | null;
  locale?: string;         // e.g., 'en-US'
  inline?: boolean;
  disabled?: boolean;
  weekStartsOn?: WeekStart;
  fixedWeeks?: boolean;    // always render 6 weeks (7x6 grid)
  id?: string;
  name?: string;           // if you expose a hidden input
  required?: boolean;
  readonly?: boolean;
  /** Optional: control popover externally if your Popover supports it */
  open?: boolean;
};

export type DateChangeDetail = { value: Date };
