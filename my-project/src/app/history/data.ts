'use server'
import { AxiosError } from "axios";
import axiosInstance from "../lib/api";
import { StatusResponse } from "../types/response.types";
import { cookies } from "next/headers";


const statusOptions = [
  { name: "Active", uid: "active" },
  { name: "Paused", uid: "paused" },
  { name: "Vacation", uid: "vacation" },
];


export { statusOptions };

export interface GetHistoryParams {
id?: number;
userName? : string;
// watchers?: string;
// description?: string;
// date?: Date;
EmployeeNo?: string;
// location?: string;
// project?: string;
// title?: string;
// type?: string;
// urgency?: string;
// status: number;
}

export async function GetHistoryData(params :GetHistoryParams, EmployeeNo: string ) {
  const token = cookies().get("token")?.value;

  if (!token) {
    console.error("Token is empty in Server side Components");
    return {status: StatusResponse.failed, data: []};
  }
  try {
    const tokens = localStorage.getItem("token"); 
    const res = await axiosInstance(token).get(
      
      `http://localhost:8080/api/employee/${EmployeeNo}`,
      {
        params: params,
        // maxBodyLength: Infinity,
        headers: { "x-access-key": process.env.ACCESS_KEY ?? "" },
      }
    );
    const response = res.data;
    console.log("Data table:", response)
    return response;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error("Get Data response err:", error.message);
      console.error("Data:", error.response?.data);

      return error.response?.data;
    }
    console.error("Error fetching data:", error)
    return {
      status: StatusResponse.failed,
      data: [],
      message: "Failed to get data",
    };
  }
}
