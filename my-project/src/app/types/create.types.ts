import { ProfileObject } from "./object.types";

export interface FormData {
  type: string;
  project: string;
  urgency: string;
  location: string;
  watchers: string[];
  attachment: string;
  title: string;
  description: string;
  date: Date;
}

export type User = {
  id: number;
  EmployeeNo: string;
  email: string;
  mobile_no: string;
  username: string;
  type: string;
  project: string;
  urgency: string;
  Location: string;
  watchers: string;
  title: string;
  description: string;
  date: Date;
};
