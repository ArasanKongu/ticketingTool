import { ResultSetHeader } from "mysql2";
import { UserRoles } from "../models/newticket.model";
import { connection } from "../api";

export class UserRolesRepository {
    async createUserRole(roles: UserRoles): Promise<ResultSetHeader> {
        if (!roles) {
            throw new Error("Invalid Parameter");
        }
        const query =
            "INSERT INTO ticket_tool.user_roles (EmployeeNo,email,roles) VALUES (?,?,?)";
        const values = [
            roles.EmployeeNo,
            roles.email,
            roles.roles
        ];
        console.log("Roles:", values);
        return new Promise<ResultSetHeader>(async (resolve, reject) => {
            (await connection).query<ResultSetHeader>(query, values);
        });
    }
}

export const userRolesRepository = new UserRolesRepository();