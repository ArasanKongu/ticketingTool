export interface NewTicketObject {
  status: any;
  id: number;
  userName: string;
  EmployeeNo: string;
  type: string;
  project: string;
  urgency: string;
  location: string;
  watchers: string[];
  title: string;
  description: string;
  date: Date;
}
