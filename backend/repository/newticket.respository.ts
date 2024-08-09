// repositories/newticket.repository.ts
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { format } from "date-fns";

import { NewTicketModel } from "../models/newticket.model";
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
      "INSERT INTO ticket_tool.new_ticket (type, project, urgency, location, title, description, watchers,date) VALUES (?, ?, ?, ?, ?, ?, ?,?)";
    const values = [
      ticket.type,
      ticket.project,
      ticket.urgency,
      ticket.location,
      ticket.title,
      ticket.description,
      JSON.stringify(ticket.watchers),
      formattedDate,
    ];

    return new Promise<ResultSetHeader>(async (resolve, reject) => {
      (await connection).query<ResultSetHeader>(query, values);
    });
  }

  async getByEmployeeNo(employeeNo: string): Promise<NewTicketModel[]> {
    if (!employeeNo) {
      throw new Error("Invalid Parameter");
    }

    const query = `SELECT * FROM ticket_tool.new_ticket WHERE EmpolyeeNo = '${employeeNo}'`;
    console.log(query);
    const conn = await connection;
    const [results] = await conn.query<NewTicketModel[]>(query, [employeeNo]);
    return results;
  }
}

export const newTicketRepository = new NewTicketRepository();
