export interface Formtype {
  id: number;
  icon: string;
  title: string;
  date: any;
  time: string;
  startTime: string;
  endTime: string;
  details: readonly string[];
  pinned: boolean;
  personal: boolean;
  color: string;
  isCompleted: boolean;
  selectedData: null;
}
