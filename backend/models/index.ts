import { RowDataPacket } from "mysql2";

export interface SQLCountHeader extends RowDataPacket {
    count: number
}