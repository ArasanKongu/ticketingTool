'use client'
import React, { useCallback, useMemo, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
  Pagination,
  Selection,
  ChipProps,
  SortDescriptor,
  Spinner
} from "@nextui-org/react";
import { PlusIcon } from "./PlusIcon";
import { VerticalDotsIcon } from "./VerticalDotsIcon";
import { ChevronDownIcon } from "./ChevronDeownIcon";
import { SearchIcon } from "./SearchIcon";
import { GetHistoryData, statusOptions } from "./data";
import { capitalize } from "./utils";
import PageLayout from "../components/navbar&Footerlayout/layout";
import { ResponseObject, StatusResponse } from "../types/response.types";
import { NewTicketObject } from "../../../../backend/types/createticket.types"
import { ActiveStatus } from "../types/enumtypes";
import { columns } from "./config";
const statusColorMap: Record<string, ChipProps["color"]> = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

const INITIAL_VISIBLE_COLUMNS = ["title", "requester", "status", "category"];

// type User = typeof users[0];

export default function History({ inputTicket }: { inputTicket: NewTicketObject[] }) {
  const [newTicket, setNewTicket] = useState<NewTicketObject[]>(inputTicket || []);
  const [isLoading, setIsLoading] = useState(false);
  const [filterValue, setFilterValue] = useState("");
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
  const [visibleColumns, setVisibleColumns] = useState<Selection>(new Set(INITIAL_VISIBLE_COLUMNS));
  const [statusFilter, setStatusFilter] = useState<Selection>("all");
  const loadingState = isLoading || newTicket?.length === 0 ? "loading" : "idle";
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "lastUpdate",
    direction: "ascending",
  });
  const headerColumns = useMemo(()=>{
    if(visibleColumns === 'all') return columns;
    return columns.filter((column)=>
    Array.from(visibleColumns).includes(column.uid))
  },[visibleColumns]);
  
  const [page, setPage] = useState(1);

  function refreshData() {
    setIsRefreshing(true);

    GetHistoryData({ status: ActiveStatus.active }).then(
      (res: ResponseObject) => {
        setIsRefreshing(false);
        if (res.status == StatusResponse.success) {
          setNewTicket(res.data.ticket as NewTicketObject[]);
        } else {
          console.log("Failed to Load");
          setNewTicket([])
        }
        // setIsLoading(false)
      }
    )
  }

  const renderCell = useCallback(
    (ticket: NewTicketObject, columnKey: React.Key) => {
      const cellValue = ticket[columnKey as keyof NewTicketObject];

  switch (columnKey) {
    case "id":
      return (
        <div>
          {ticket.id}
        </div>
      );
    case "title":
      return (
        <div className="flex flex-col">
          {/* <p className="text-bold text-small capitalize">{cellValue}</p> */}
          <p className="text-bold text-tiny capitalize text-default-500">{ticket.title}</p>
        </div>
      );
      case "EmployeeNo":
      return (
        <div className="flex flex-col">
          <p className="text-bold text-tiny capitalize text-default-500">{ticket.EmpolyeeNo}</p>
        </div>
      );
      case "project":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-tiny capitalize text-default-500">{ticket.project}</p>
          </div>
        );
        case "type":
      return (
        <div className="flex flex-col">
          <p className="text-bold text-tiny capitalize text-default-500">{ticket.type}</p>
        </div>
      );
      //   case "date":
      // return (
      //   <div className="flex flex-col">
      //     <p className="text-bold text-tiny capitalize text-default-500">{ticket.date}</p>
      //   </div>
      // );
      case "description":
      return (
        <div className="flex flex-col">
          <p className="text-bold text-tiny capitalize text-default-500">{ticket.description}</p>
        </div>
      );
      case "urgency":
      return (
        <div className="flex flex-col">
          <p className="text-bold text-tiny capitalize text-default-500">{ticket.urgency}</p>
        </div>
      );
      case "Location":
      return (
        <div className="flex flex-col">
          <p className="text-bold text-tiny capitalize text-default-500">{ticket.Location}</p>
        </div>
      );
      case "userName":
      return (
        <div className="flex flex-col">
          <p className="text-bold text-tiny capitalize text-default-500">{ticket.userName}</p>
        </div>
      );
      case "watchers":
      return (
        <div className="flex flex-col">
          <p className="text-bold text-tiny capitalize text-default-500">{ticket.watchers}</p>
        </div>
      );
      case "status":
      return (
        <div className="flex flex-col">
          <p className="text-bold text-tiny capitalize text-default-500">{ticket.status}</p>
        </div>
      );
    // case "status":
    //   return (
    //     <Chip
    //       className="capitalize border-none gap-1 text-default-600"
    //       color={statusColorMap[ticket.status]}
    //       size="sm"
    //       variant="dot"
    //     >
    //       {cellValue}
    //     </Chip>
    //   );
    // case "category":
    //   return (
    //     <div className="relative flex justify-end items-center gap-2">
    //       <Dropdown className="bg-background border-1 border-default-200">
    //         <DropdownTrigger>
    //           <Button isIconOnly radius="full" size="sm" variant="light">
    //             <VerticalDotsIcon className="text-default-400" width={undefined} height={undefined} />
    //           </Button>
    //         </DropdownTrigger>
    //         <DropdownMenu>
    //           <DropdownItem>View</DropdownItem>
    //           <DropdownItem>Edit</DropdownItem>
    //           <DropdownItem>Delete</DropdownItem>
    //         </DropdownMenu>
    //       </Dropdown>
    //     </div>
    //   );
    default:
      return <div></div>;
  }
},[]
);


const onRowsPerPageChange = React.useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
  setRowsPerPage(Number(e.target.value));
  setPage(1);
}, []);

const onSearchChange = React.useCallback((value?: string) => {
  if (value) {
    setFilterValue(value);
    setPage(1);
  } else {
    setFilterValue("");
  }
}, []);

const topContent = React.useMemo(() => {
  return (
    <div className="flex flex-col gap-4 ">
      <div className="flex justify-between gap-3 items-end">
        <Input
          isClearable
          classNames={{
            base: "w-full sm:max-w-[44%]",
            inputWrapper: "border-1",
          }}
          placeholder="Search by name..."
          size="sm"
          startContent={<SearchIcon className="text-default-300" />}
          value={filterValue}
          variant="bordered"
          onClear={() => setFilterValue("")}
          onValueChange={onSearchChange}
        />
        <div className="flex gap-3">
          {/* <Dropdown>
            <DropdownTrigger className="hidden sm:flex">
              <Button
                endContent={<ChevronDownIcon className="text-small" />}
                size="sm"
                variant="flat"
              >
                Status
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              aria-label="Table Columns"
              closeOnSelect={false}
              selectedKeys={statusFilter}
              selectionMode="multiple"
              onSelectionChange={setStatusFilter}
            >
              {statusOptions.map((status) => (
                <DropdownItem key={status.uid} className="capitalize">
                  {capitalize(status.name)}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown> */}
          <Dropdown>
            <DropdownTrigger className="hidden sm:flex">
              <Button
                endContent={<ChevronDownIcon className="text-small" />}
                size="sm"
                variant="flat"
              >
                Columns
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              aria-label="Table Columns"
              closeOnSelect={false}
              selectedKeys={visibleColumns}
              selectionMode="multiple"
              onSelectionChange={setVisibleColumns}
            >
              {columns.map((column) => (
                <DropdownItem key={column.uid} className="capitalize">
                  {capitalize(column.name)}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          <Button
            className="bg-foreground text-background"
            endContent={<PlusIcon width={undefined} height={undefined} />}
            size="sm"
          >
            Add New
          </Button>
        </div>
      </div>
      <div className="flex justify-between items-center">
        {/* <span className="text-default-400 text-small">Total {users.length} users</span> */}
        <label className="flex items-center text-default-400 text-small">
          Rows per page:
          <select
            className="bg-transparent outline-none text-default-400 text-small"
            onChange={onRowsPerPageChange}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </select>
        </label>
      </div>
    </div>
  );
}, [
  filterValue,
  statusFilter,
  visibleColumns,
  onSearchChange,
  onRowsPerPageChange,
  refreshData
]);

const bottomContent = React.useMemo(() => {
  return (
    <div className="py-2 px-2 flex justify-between items-center">
      {/* <Pagination
        showControls
        classNames={{
          cursor: "bg-foreground text-background",
        }}
        color="default"
        // isDisabled={hasSearchFilter}
        page={page}
        // total={pages}
        variant="light"
        onChange={setPage}
      /> */}
      {/* <span className="text-small text-default-400">
        {selectedKeys === "all"
          ? "All items selected"
          : `${selectedKeys.size} of ${items.length} selected`}
      </span> */}
    </div>
  );
}, [selectedKeys, page]);

const classNames = React.useMemo(
  () => ({
    wrapper: ["max-h-[382px]", "max-w-3xl"],
    th: ["bg-transparent", "text-default-500", "border-b", "border-divider"],
    td: [
      // changing the rows border radius
      // first
      "group-data-[first=true]:first:before:rounded-none",
      "group-data-[first=true]:last:before:rounded-none",
      // middle
      "group-data-[middle=true]:before:rounded-none",
      // last
      "group-data-[last=true]:first:before:rounded-none",
      "group-data-[last=true]:last:before:rounded-none",
    ],
  }),
  [],
);

return (
  <PageLayout>
    <div className="pt-1 pl-8 font-semibold ">History</div>
    <Table
      isCompact
      removeWrapper
      aria-label="Example table with custom cells, pagination and sorting"
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      checkboxesProps={{
        classNames: {
          wrapper: "after:bg-foreground after:text-background text-background overflow-y-auto",
        },
      }}
      className="pt-7 pl-8 pr-8 pb-8 "
      classNames={classNames}
      selectedKeys={selectedKeys}
      selectionMode="multiple"
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      onSelectionChange={setSelectedKeys}
      onSortChange={setSortDescriptor}
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "category" ? "center" : "start"}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody 
      // loadingContent={<Spinner/>}
      // loadingState={loadingState}
      emptyContent={"No Ticket found"}
      items={newTicket}
      >
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  </PageLayout>);
}
