// repositories/newticket.repository.ts
import { ResultSetHeader } from "mysql2";
import { NewTicketModel } from "../models/newticket.model";
import { connection } from "../api";

export class NewTicketRepository {
  async create(ticket: NewTicketModel): Promise<ResultSetHeader> {
    if (!ticket) {
      throw new Error("Invalid Parameter");
    }

    const query = "INSERT INTO new_ticket SET ?";
    return new Promise(async (resolve, reject) => {
      (await connection).query<ResultSetHeader>(query, ticket);
    });
  }

  async delete(ticketId: number): Promise<ResultSetHeader> {
    if (!ticketId) {
      throw new Error("Invalid Parameter");
    }

    const query = "DELETE FROM new_ticket WHERE id = ?";
    return new Promise(async (resolve, reject) => {
      (await connection).query<ResultSetHeader>(query, [ticketId]);
    });
  }
}

export const newTicketRepository = new NewTicketRepository();
