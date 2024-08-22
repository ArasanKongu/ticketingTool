import { RowDataPacket } from "mysql2";

// Define the NewTicketModel interface
export interface NewTicketModel extends RowDataPacket {
  id: number;
  userName: string;
  EmployeeNo: string;
  type: string;
  project: string;
  urgency: string;
  Location: string;
  watchers: string;
  title: string;
  description: string;
  date?: Date;
}

export interface Profile extends RowDataPacket {
  name: string;
  EmployeeNo: string;
  mobile_no: string;
  email: string;
  status: number;
}
