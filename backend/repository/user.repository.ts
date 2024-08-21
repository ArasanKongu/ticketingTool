import { createPool, Pool, RowDataPacket, ResultSetHeader } from 'mysql2/promise';
import  User  from '../models/user.model';
import 'dotenv/config';

// Create a pool of connections
const pool = createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  waitForConnections: true,
  connectionLimit: 10,
});

class UserRepository {
  private pool: Pool;

  constructor() {
    this.pool = pool;
  }

  // async retrieve(filter: Partial<User>): Promise<User | undefined> {
  //     const { email, status } = filter;
  //     let query = "SELECT * FROM users WHERE 1=1";
  //     const conditions: string[] = [];
  //     const params: any[] = [];

  //     if (email) {
  //         conditions.push("email = ?");
  //         params.push(email);
  //     }
  //     if (status !== undefined) {
  //         conditions.push("status = ?");
  //         params.push(status);
  //     }

  //     if (conditions.length) query += ' AND ' + conditions.join(' AND ');

  //     const [rows] = await this.pool.query<RowDataPacket[]>(query, params);
  //     return rows[0] as User; // Cast the result to User
  // }
  async retrieve(filter: Partial<User>): Promise<User | undefined> {
    const { email, username, status } = filter;
    let query = "SELECT * FROM users WHERE 1=1";
    const conditions: string[] = [];
    const params: any[] = [];

    if (email) {
      conditions.push("email = ?");
      params.push(email);
    }
    if (username) {
      conditions.push("username = ?");
      params.push(username);
    }
    if (status !== undefined) {
      conditions.push("status = ?");
      params.push(status);
    }

    if (conditions.length) query += " AND " + conditions.join(" AND ");

    const [rows] = await this.pool.query<RowDataPacket[]>(query, params);
    return rows[0] as User; // Cast the result to User
  }

  async save(user: User): Promise<User> {
    if (!user) {
      throw Error("Invalid Parameter");
    }

    const query = `INSERT INTO users (username, email, password, status) VALUES (?, ?, ?, ?)`;

    const [result] = await this.pool.query<ResultSetHeader>(query, [
      user.username,
      user.email,
      user.password,
      user.status,
    ]);

    user.id = result.insertId;
    return user;
  }

  async login(email: string, password: string): Promise<User | null> {
    const query = `SELECT u.id AS user_id,u.username,u.email,u.password,up.name AS profile_name,up.EmployeeNo,up.mobile_no,up.status FROM ticket_tool.users u JOIN ticket_tool.user_profile up ON u.email= up.email WHERE u.email = ?`;
    const [rows] = await this.pool.query<RowDataPacket[]>(query, [email]);

    if (rows.length === 0) {
      console.log("User not found for email:", email);
      return null;
    }
    const user = rows[0] as User;

    if (password !== user.password) {
      console.log("Invalid password for user:", email);
      return null;
    }

    return user;
  }

  async setSuperAdmin(userId: number): Promise<string> {
    const superAdminCode = Math.floor(1000 + Math.random() * 9000).toString();
    const query = `UPDATE users SET status = ?, superAdminCode = ? WHERE id = ?`;
    const [result] = await this.pool.query<ResultSetHeader>(query, [
      2,
      superAdminCode,
      userId,
    ]);

    if (result.affectedRows === 0) {
      throw new Error("User not found");
    }
    return superAdminCode;
  }

  async getSuperAdminCode(): Promise<string | null> {
    const query = `SELECT superAdminCode FROM users WHERE status = 2 LIMIT 1`;
    const [rows] = await this.pool.query<RowDataPacket[]>(query);
    if (rows.length === 0) {
      return null;
    }
    return rows[0].superAdminCode;
  }
}
export const userRepository = new UserRepository();
