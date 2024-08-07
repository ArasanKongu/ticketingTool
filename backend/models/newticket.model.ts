import { RowDataPacket } from "mysql2";

// Define the NewTicketModel interface
export interface NewTicketModel extends RowDataPacket {
  id: number;
  userName: string;
  EmpolyeeNo: string;
  type: string;
  project: string;
  urgency: string;
  Location: string;
  watchers: string;
  title: string;
  description: string;
  date?: Date;
}
