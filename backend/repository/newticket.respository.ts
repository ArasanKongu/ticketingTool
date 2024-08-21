// repositories/newticket.repository.ts
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { format } from "date-fns";

import { NewTicketModel, Profile } from "../models/newticket.model";
import { connection } from "../api";

export class NewTicketRepository {
  async create(ticket: NewTicketModel): Promise<ResultSetHeader> {
    if (!ticket) {
      throw new Error("Invalid Parameter");
    }
    const formattedDate = ticket.date
      ? format(new Date(ticket.date), "yyyy-MM-dd HH:mm:ss")
      : null;
    const query =
      "INSERT INTO ticket_tool.new_ticket (userName,EmployeeNo,type, project, urgency, location, title, description, watchers,date) VALUES (?, ?, ?, ?, ?, ?, ?,?,?,?)";
    const values = [
      ticket.userName,
      ticket.EmployeeNo,
      ticket.type,
      ticket.project,
      ticket.urgency,
      ticket.location,
      ticket.title,
      ticket.description,
      JSON.stringify(ticket.watchers),
      formattedDate,
      // ticket.files,
    ];
    console.log("smdms", values);
    return new Promise<ResultSetHeader>(async (resolve, reject) => {
      (await connection).query<ResultSetHeader>(query, values);
    });
  }

  async getByEmployeeNo(employeeNo: string): Promise<NewTicketModel[]> {
    if (!employeeNo) {
      throw new Error("Invalid Parameter");
    }

    const query = `SELECT * FROM ticket_tool.new_ticket WHERE EmployeeNo = '${employeeNo}'`;
    console.log(query);
    const conn = await connection;
    const [results] = await conn.query<NewTicketModel[]>(query, [employeeNo]);
    return results;
  }

  async getAll(): Promise<NewTicketModel[]> {
    const query = `SELECT * FROM ticket_tool.new_ticket`;
    console.log("Query:", query);
    const conn = await connection;
    const [result] = await conn.query<NewTicketModel[]>(query);
    return result;
  }

  async getAllEmpoyee(): Promise<Profile[]> {
    const query = `SELECT * FROM ticket_tool.user_profile;`;
    console.log("Executing Query:", query);

    try {
      const conn = await connection;
      const [result] = await conn.query<Profile[]>(query);
      console.log("Query Result:", result);
      return result;
    } catch (error) {
      console.error("Error fetching employee profiles:", error);
      throw new Error("Failed to fetch employee profiles");
    }
  }
}

export const newTicketRepository = new NewTicketRepository();
