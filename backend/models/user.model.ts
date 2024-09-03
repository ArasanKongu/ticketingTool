export default interface User {
    id?: number;
    EmployeeNo: string;
    userName: string;
    email: string;
    password: string;
    status?: number;
    superAdminCode?:string;
}