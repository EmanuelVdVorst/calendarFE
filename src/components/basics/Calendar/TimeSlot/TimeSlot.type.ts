export interface TimeSlotProps {
  date: Date;
  hour: number;
  onClick: (date: Date, hour: number) => void;
}
