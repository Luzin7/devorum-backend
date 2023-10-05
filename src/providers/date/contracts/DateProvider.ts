export interface IsBeforeProps {
  initialDate: Date
  endDate: Date
}

export abstract class DateProvider {
  abstract addDays(days: number): Date
  abstract isBefore(props: IsBeforeProps): boolean
}
