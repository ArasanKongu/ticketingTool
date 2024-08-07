// repositories/newticket.repository.ts
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { NewTicketModel } from "../models/newticket.model";
import { connection } from "../api";

export class NewTicketRepository {
  async create(ticket: NewTicketModel): Promise<ResultSetHeader> {
    if (!ticket) {
      throw new Error("Invalid Parameter");
    }

    const query = "INSERT INTO new_ticket SET ?";
    return new Promise(async (resolve, reject) => {
      (await connection).query<NewTicketModel[]>(query, ticket);
    });
  }

  async delete(ticketId: number): Promise<ResultSetHeader> {
    if (!ticketId) {
      throw new Error("Invalid Parameters");
    }

    const query = "DELETE FROM new_ticket WHERE id = ?";
    return new Promise(async (resolve, reject) => {
      (await connection).query<ResultSetHeader>(query, [ticketId]);
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
