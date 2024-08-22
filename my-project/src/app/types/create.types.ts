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
    name: string;
    email: string;
    mobile_no: string;
    status: number;
  };