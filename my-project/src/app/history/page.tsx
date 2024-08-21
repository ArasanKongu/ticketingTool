// 'use client'
// import React, { useCallback, useEffect, useMemo, useState } from "react";
// import {
//   Table,
//   TableHeader,
//   TableColumn,
//   TableBody,
//   TableRow,
//   TableCell,
//   Input,
//   Button,
//   DropdownTrigger,
//   Dropdown,
//   DropdownMenu,
//   DropdownItem,
//   Selection,
//   ChipProps,
//   SortDescriptor,
// } from "@nextui-org/react";
// import { PlusIcon } from "./PlusIcon";
// import { ChevronDownIcon } from "./ChevronDeownIcon";
// import { SearchIcon } from "./SearchIcon";
// import { GetHistoryData } from "./data";
// import { capitalize } from "./utils";
// import PageLayout from "../components/navbar&Footerlayout/layout";
// import { ResponseObject, StatusResponse } from "../types/response.types";
// import { NewTicketObject } from "../../../../backend/types/createticket.types"
// import { ActiveStatus } from "../../../../backend/types/enum.types";
// import { columns } from "./config";
// import { useAccount } from "../lib/context/account-context";
// import { headers } from "next/headers";
// import axios from "axios";
// const statusColorMap: Record<string, ChipProps["color"]> = {
//   active: "success",
//   paused: "danger",
//   vacation: "warning",
// };

// const INITIAL_VISIBLE_COLUMNS = ["id", "title", "EmployeeNo", "project"];

// // type User = typeof users[0];

// export default function History({ inputTicket }: { inputTicket: NewTicketObject[] }) {
//   const { profile, authenticated } = useAccount();
//   const [newTicket, setNewTicket] = useState<NewTicketObject[]>(inputTicket || []);
//   const [isLoading, setIsLoading] = useState(false);
//   const [filterValue, setFilterValue] = useState("");
//   const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
//   const [visibleColumns, setVisibleColumns] = useState<Selection>(new Set(INITIAL_VISIBLE_COLUMNS));
//   const [statusFilter, setStatusFilter] = useState<Selection>("all");
//   const loadingState = isLoading || newTicket?.length === 0 ? "loading" : "idle";
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const [isRefreshing, setIsRefreshing] = useState(false)
//   const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
//     column: "lastUpdate",
//     direction: "ascending",
//   });
//   const headerColumns = useMemo(()=>{
//     if(visibleColumns === 'all') return columns;
//     return columns.filter((column)=>
//     Array.from(visibleColumns).includes(column.uid))
//   },[visibleColumns]);
  
//   const [page, setPage] = useState(1);

  
//   useEffect(()=> {
//     if(authenticated && profile)
//       console.log("Table data:", profile.EmployeeNo)
//       refreshData()
//   },[profile, authenticated]);

//   // function refreshData() {
//   //   if(!authenticated || !profile?.EmployeeNo) return;

//   //   setIsRefreshing(true);

//   //   GetHistoryData({ status: ActiveStatus.active }, profile.EmployeeNo).then(
//   //     (res: ResponseObject) => {
//   //      setIsRefreshing(false);
//   //       console.log("Response Object:", res)
//   //       if (res.status == StatusResponse.success) {
//   //         setNewTicket(res.data.ticket as NewTicketObject[]);
//   //       } else {
//   //         console.log("Failed to Load");
//   //         setNewTicket([])
//   //       }
//   //     }
//   //   )
//   // }
//  async function refreshData() {
//   if(!authenticated || !profile?.EmployeeNo) return;
//   setIsLoading(true);
//   try{
//     const token = localStorage.getItem("token");
//     if(!token){
//       console.error("Token not found");
//       return;
//     }
//     const response = await axios.get('http://localhost:8080/api/employee', {
//       headers:{
//         "x-access-token": token,
//       },
//       params: {
//         employeeNo: profile.EmployeeNo
//       }
//     });
//     console.log("Response Object:", response.data);

//     if(response.data.status === StatusResponse.success) {
//       setNewTicket(response.data.ticket as NewTicketObject[]);
//     }else{
//       console.log("Failed to Load");
//       setNewTicket([]);
//     }
//   }catch(error) {
//     console.error("Failed to fetch data:", error);
//     setNewTicket([]);
//   }finally{
//     setIsLoading(false);
//   }
//  }
  
//   const renderCell = useCallback(
//     (ticket: NewTicketObject, columnKey: React.Key) => {
//       const cellValue = ticket[columnKey as keyof NewTicketObject];

//   switch (columnKey) {
//     case "id":
//       return (
//         <div>
//           {ticket.id}
//         </div>
//       );
//     case "title":
//       return (
//         <div className="flex flex-col">
//           {/* <p className="text-bold text-small capitalize">{cellValue}</p> */}
//           <p className="text-bold text-tiny capitalize text-default-500">{ticket.title}</p>
//         </div>
//       );
//       case "EmployeeNo":
//       return (
//         <div className="flex flex-col">
//           <p className="text-bold text-tiny capitalize text-default-500">{ticket.EmployeeNo}</p>
//         </div>
//       );
//       case "project":
//         return (
//           <div className="flex flex-col">
//             <p className="text-bold text-tiny capitalize text-default-500">{ticket.project}</p>
//           </div>
//         );
//         case "type":
//       return (
//         <div className="flex flex-col">
//           <p className="text-bold text-tiny capitalize text-default-500">{ticket.type}</p>
//         </div>
//       );
//       //   case "date":
//       // return (
//       //   <div className="flex flex-col">
//       //     <p className="text-bold text-tiny capitalize text-default-500">{ticket.date}</p>
//       //   </div>
//       // );
//       case "description":
//       return (
//         <div className="flex flex-col">
//           <p className="text-bold text-tiny capitalize text-default-500">{ticket.description}</p>
//         </div>
//       );
//       case "urgency":
//       return (
//         <div className="flex flex-col">
//           <p className="text-bold text-tiny capitalize text-default-500">{ticket.urgency}</p>
//         </div>
//       );
//       case "Location":
//       return (
//         <div className="flex flex-col">
//           <p className="text-bold text-tiny capitalize text-default-500">{ticket.location}</p>
//         </div>
//       );
//       case "userName":
//       return (
//         <div className="flex flex-col">
//           <p className="text-bold text-tiny capitalize text-default-500">{ticket.userName}</p>
//         </div>
//       );
//       case "watchers":
//       return (
//         <div className="flex flex-col">
//           <p className="text-bold text-tiny capitalize text-default-500">{ticket.watchers}</p>
//         </div>
//       );
//       case "status":
//       return (
//         <div className="flex flex-col">
//           <p className="text-bold text-tiny capitalize text-default-500">{ticket.status}</p>
//         </div>
//       );
//     // case "status":
//     //   return (
//     //     <Chip
//     //       className="capitalize border-none gap-1 text-default-600"
//     //       color={statusColorMap[ticket.status]}
//     //       size="sm"
//     //       variant="dot"
//     //     >
//     //       {cellValue}
//     //     </Chip>
//     //   );
//     // case "category":
//     //   return (
//     //     <div className="relative flex justify-end items-center gap-2">
//     //       <Dropdown className="bg-background border-1 border-default-200">
//     //         <DropdownTrigger>
//     //           <Button isIconOnly radius="full" size="sm" variant="light">
//     //             <VerticalDotsIcon className="text-default-400" width={undefined} height={undefined} />
//     //           </Button>
//     //         </DropdownTrigger>
//     //         <DropdownMenu>
//     //           <DropdownItem>View</DropdownItem>
//     //           <DropdownItem>Edit</DropdownItem>
//     //           <DropdownItem>Delete</DropdownItem>
//     //         </DropdownMenu>
//     //       </Dropdown>
//     //     </div>
//     //   );
//     default:
//       return <div>Default Content</div>;
//   }
// },[]
// );

// const onRowsPerPageChange = React.useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
//   setRowsPerPage(Number(e.target.value));
//   setPage(1);
// }, []);

// const onSearchChange = React.useCallback((value?: string) => {
//   if (value) {
//     setFilterValue(value);
//     setPage(1);
//   } else {
//     setFilterValue("");
//   }
// }, []);

// const topContent = useMemo(() => {
//   return (
//     <div className="flex flex-col gap-4 ">
//       <div className="flex justify-between gap-3 items-end">
//         <Input
//           isClearable
//           classNames={{
//             base: "w-full sm:max-w-[44%]",
//             inputWrapper: "border-1",
//           }}
//           placeholder="Search by name..."
//           size="sm"
//           startContent={<SearchIcon className="text-default-300" />}
//           value={filterValue}
//           variant="bordered"
//           onClear={() => setFilterValue("")}
//           onValueChange={onSearchChange}
//         />
//         <div className="flex gap-3">
//           {/* <Dropdown>
//             <DropdownTrigger className="hidden sm:flex">
//               <Button
//                 endContent={<ChevronDownIcon className="text-small" />}
//                 size="sm"
//                 variant="flat"
//               >
//                 Status
//               </Button>
//             </DropdownTrigger>
//             <DropdownMenu
//               disallowEmptySelection
//               aria-label="Table Columns"
//               closeOnSelect={false}
//               selectedKeys={statusFilter}
//               selectionMode="multiple"
//               onSelectionChange={setStatusFilter}
//             >
//               {statusOptions.map((status) => (
//                 <DropdownItem key={status.uid} className="capitalize">
//                   {capitalize(status.name)}
//                 </DropdownItem>
//               ))}
//             </DropdownMenu>
//           </Dropdown> */}
//           <Dropdown>
//             <DropdownTrigger className="hidden sm:flex">
//               <Button
//                 endContent={<ChevronDownIcon className="text-small" />}
//                 size="sm"
//                 variant="flat"
//               >
//                 Columns
//               </Button>
//             </DropdownTrigger>
//             <DropdownMenu
//               disallowEmptySelection
//               aria-label="Table Columns"
//               closeOnSelect={false}
//               selectedKeys={visibleColumns}
//               selectionMode="multiple"
//               onSelectionChange={setVisibleColumns}
//             >
//               {columns.map((column) => (
//                 <DropdownItem key={column.uid} className="capitalize">
//                   {capitalize(column.name)}
//                 </DropdownItem>
//               ))}
//             </DropdownMenu>
//           </Dropdown>
//           <Button
//             className="bg-foreground text-background"
//             endContent={<PlusIcon width={undefined} height={undefined} />}
//             size="sm"
//           >
//             Add New
//           </Button>
//         </div>
//       </div>
//       <div className="flex justify-between items-center">
//         {/* <span className="text-default-400 text-small">Total {users.length} users</span> */}
//         <label className="flex items-center text-default-400 text-small">
//           Rows per page:
//           <select
//             className="bg-transparent outline-none text-default-400 text-small"
//             onChange={onRowsPerPageChange}
//           >
//             <option value="5">5</option>
//             <option value="10">10</option>
//             <option value="15">15</option>
//           </select>
//         </label>
//       </div>
//     </div>
//   );
// }, [
//   filterValue,
//   statusFilter,
//   visibleColumns,
//   onSearchChange,
//   onRowsPerPageChange,
//   refreshData
// ]);

// const bottomContent = useMemo(() => {
//   return (
//     <div className="py-2 px-2 flex justify-between items-center">
//       {/* <Pagination
//         showControls
//         classNames={{
//           cursor: "bg-foreground text-background",
//         }}
//         color="default"
//         // isDisabled={hasSearchFilter}
//         page={page}
//         // total={pages}
//         variant="light"
//         onChange={setPage}
//       /> */}
//       {/* <span className="text-small text-default-400">
//         {selectedKeys === "all"
//           ? "All items selected"
//           : `${selectedKeys.size} of ${items.length} selected`}
//       </span> */}
//     </div>
//   );
// }, [selectedKeys, page]);

// const classNames = useMemo(
//   () => ({
//     wrapper: ["max-h-[382px]", "max-w-3xl"],
//     th: ["bg-transparent", "text-default-500", "border-b", "border-divider"],
//     td: [
//       // changing the rows border radius
//       // first
//       "group-data-[first=true]:first:before:rounded-none",
//       "group-data-[first=true]:last:before:rounded-none",
//       // middle
//       "group-data-[middle=true]:before:rounded-none",
//       // last
//       "group-data-[last=true]:first:before:rounded-none",
//       "group-data-[last=true]:last:before:rounded-none",
//     ],
//   }),
//   [],
// );

// return (
//   <PageLayout>
//     <div className="pt-1 pl-8 font-semibold ">History</div>
//     <Table
//       isCompact
//       removeWrapper
//       aria-label="Example table with custom cells, pagination and sorting"
//       bottomContent={bottomContent}
//       bottomContentPlacement="outside"
//       checkboxesProps={{
//         classNames: {
//           wrapper: "after:bg-foreground after:text-background text-background overflow-y-auto",
//         },
//       }}
//       className="pt-7 pl-8 pr-8 pb-8 "
//       classNames={classNames}
//       selectedKeys={selectedKeys}
//       selectionMode="multiple"
//       sortDescriptor={sortDescriptor}
//       topContent={topContent}
//       topContentPlacement="outside"
//       onSelectionChange={setSelectedKeys}
//       onSortChange={setSortDescriptor}
//     >
//       <TableHeader columns={headerColumns}>
//         {(column) => (
//           <TableColumn
//             key={column.uid}
//             // align={column.uid === "category" ? "center" : "start"}
//             // allowsSorting={column.sortable}
//           >
//             {column.name}
//           </TableColumn>
//         )}
//       </TableHeader>
//       <TableBody 
//       // loadingContent={<Spinner/>}
//       // loadingState={loadingState}
//       // emptyContent={"No Ticket found"}
//       items={newTicket}
//       >
//         {(item) => (
//           <TableRow key={item.id}>
//             {(columnKey) => renderCell(item, columnKey)}
//           </TableRow>
//         )}
//       </TableBody>
//     </Table>
//   </PageLayout>
//   );
// }

'use client'
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, user } from "@nextui-org/react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import PageLayout from "../components/navbar&Footerlayout/layout";

interface EmployeeData {
    id: number;
    userName: string;
    EmployeeNo: string;
    type: string;
    project: string;
    urgency: string;
    Location: string;
    watchers: string[];
    title: string;
    description: string;
    date: string;
}


const HistoryPage = () => {
    const [data, setData] = useState<EmployeeData[]>([]);
    const router = useRouter();

    useEffect(() => {
        // Function to fetch employee details
        const fetchEmployeeDetails = async () => {
            try {
                const token = localStorage.getItem("token"); // Get the token from localStorage
                const user = localStorage.getItem("user"); // Get the EmployeeNo from localStorage or other method
                console.log("EmployeeNo:", user)

                if (!token) {
                    toast.error("You are not logged in. Redirecting to login page.");
                    router.push("/login"); // Redirect to login page
                    return;
                }

                if (user) {
                    const parsedUser = JSON.parse(user);
                    const employeeNo = parsedUser.EmployeeNo;
                    console.log("EmployeeNo:", parsedUser.EmployeeNo)

                    const response = await axios.get(
                        `http://localhost:8080/api/employee/${employeeNo}`,
                        {
                            headers: {
                                "x-access-token": token, // Set the Authorization header
                            },
                        }
                    );
                    setData(response.data);
                    console.log("Fetched Employee Data:", response.data); // Log the fetched data
                } else {
                    toast.error("Employee number not found. Redirectig to login page.");
                    router.push("/login");
                    return;
                }
            } catch (error) {
                console.error("Error fetching employee data:", error);
                toast.error("Failed to fetch data. Please try again.");
            }
        };

        fetchEmployeeDetails();
    }, [router]);

    return (
        <PageLayout><Table aria-label="Employee History Table">
            <TableHeader>
                <TableColumn>ID</TableColumn>
                <TableColumn>Username</TableColumn>
                <TableColumn>Employee No</TableColumn>
                <TableColumn>Type</TableColumn>
                <TableColumn>Project</TableColumn>
                <TableColumn>Urgency</TableColumn>
                <TableColumn>Location</TableColumn>
                <TableColumn>Watchers</TableColumn>
                <TableColumn>Title</TableColumn>
                <TableColumn>Description</TableColumn>
                <TableColumn>Date</TableColumn>
            </TableHeader>
            <TableBody>
                {data.map((item) => (
                    <TableRow key={item.id}>
                        <TableCell>{item.id}</TableCell>
                        <TableCell>{item.userName}</TableCell>
                        <TableCell>{item.EmployeeNo}</TableCell>
                        <TableCell>{item.type}</TableCell>
                        <TableCell>{item.project}</TableCell>
                        <TableCell>{item.urgency}</TableCell>
                        <TableCell>{item.Location}</TableCell>
                        <TableCell>{item.watchers}</TableCell>
                        <TableCell>{item.title}</TableCell>
                        <TableCell>{item.description}</TableCell>
                        <TableCell>{new Date(item.date).toLocaleString()}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table></PageLayout>

    );
};

export default HistoryPage;
