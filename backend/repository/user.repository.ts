import { createPool, Pool, RowDataPacket, ResultSetHeader } from 'mysql2/promise';
import { User } from '../models/user.model';
import bcrypt from 'bcrypt';
import 'dotenv/config';

// Create a pool of connections
const pool = createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME, // Replace with your database name
    password: process.env.DB_PASSWORD, // Replace with your database password
    waitForConnections: true,
    connectionLimit: 10
});

class UserRepository {
    private pool: Pool;

    constructor() {
        this.pool = pool;
    }

    async retrieve(filter: Partial<User>): Promise<User | undefined> {
        const { email, status } = filter;
        let query = "SELECT * FROM users WHERE 1=1";
        const conditions: string[] = [];
        const params: any[] = [];

        if (email) {
            conditions.push("email = ?");
            params.push(email);
        }
        if (status !== undefined) {
            conditions.push("status = ?");
            params.push(status);
        }

        if (conditions.length) query += ' AND ' + conditions.join(' AND ');

        const [rows] = await this.pool.query<RowDataPacket[]>(query, params);
        return rows[0] as User; // Cast the result to User
    }

    async save(user: User): Promise<User> {
        if (!user) {
            throw Error("Invalid Parameter");
        }

        // const hashedPassword = await bcrypt.hash(user.password, 10);
        const query = `INSERT INTO users (username, email, password, status) VALUES (?, ?, ?, ?)`;

        const [result] = await this.pool.query<ResultSetHeader>(query, [user.username, user.email, user.password, user.status]);

        user.id = result.insertId; // Assuming your User model has an id property
        return user;
    }
    async login(email:string, password:string): Promise<User | null> {
        const query =  `SELECT * FROM users WHERE email = ?`;
        const [rows] = await this.pool.query<RowDataPacket[]>(query, [email]);

        console.log('Query Result:', rows)

        if(rows.length ===0) {
            console.log('User not found for email:', email)
            return null;
        }
        const user = rows[0] as User;

        // const passwordIsValid = await bcrypt.compare(password, user.password);
        // console.log('Password is valid:', passwordIsValid);

        if(password !== user.password) {
            console.log('Invalid password for user:', email)
            return null;
        }
        
        return user;
    }
}
export const userRepository = new UserRepository();


