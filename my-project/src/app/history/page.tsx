'use client'
import React, { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Avatar, Button, Chip, ChipProps, Pagination, Select, SelectItem, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip, User } from "@nextui-org/react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import PageLayout from "../components/navbar&Footerlayout/layout";
import { columns, pageSelectionOptions } from "./config";  // Import columns

const statusColorMap: Record<string, ChipProps['color']> = {
    High: "danger",
    Low: "success",
    Medium: "primary"
}

interface EmployeeData {
    id: number;
    userName: string;
    EmployeeNo: string;
    type: string;
    project: string;
    urgency: string;
    title: string;
    description: string;
    date: string;
}

export default function HistoryPage() {
    const [data, setData] = useState<EmployeeData[]>([]);
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchEmployeeDetails = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem("token");
                const user = localStorage.getItem("user");
                console.log("EmployeeNo:", user)

                if (!token) {
                    toast.error("You are not logged in. Redirecting to login page.");
                    router.push("/login");
                    return;
                }

                if (user) {
                    const parsedUser = JSON.parse(user);
                    const employeeNo = parsedUser.EmployeeNo;
                    console.log("EmployeeNo:", parsedUser.EmployeeNo)

                    const response = await axios.get(
                        `http://localhost:8080/api/employee/${employeeNo}?page=${page}&limit=${rowsPerPage}`,
                        {
                            headers: {
                                "x-access-token": token,
                            },
                        }
                    );
                    if (Array.isArray(response.data.items)) {
                        setData(response.data.items);
                        setTotalPages(response.data.totalPages || 1);
                    } else {
                        console.error("Expected items to be an array, got:", response.data.items);
                        setData([]);
                    }
                    // setData(response.data);
                    // setTotalPages(response.data.totalPages);
                    // console.log("Fetched Employee Data:", response.data);
                } else {
                    toast.error("Employee number not found. Redirecting to login page.");
                    router.push("/login");
                    return;
                }
            } catch (error) {
                console.error("Error fetching employee data:", error);
                toast.error("Failed to fetch data. Please try again.");
            } finally {
                setLoading(false);
            }
        };
        fetchEmployeeDetails();
    }, [router, page, rowsPerPage]);

    const onNextPage = useCallback(() => {
        if (page < totalPages) {
            setPage(page + 1);
        }
    }, [page, totalPages]);

    const onPreviousPage = useCallback(() => {
        if (page > 1) {
            setPage(page - 1);
        }
    }, [page]);

    const onRowsPerPageChange = useCallback((e: any) => {
        // let [_, value] = Object.entries(e as React.Key[])[0];
        const value = e.currentKey;
        setRowsPerPage(Number(value));
        setPage(1)
    }, []);

    const currentPageData = useMemo(() => {
        return data;
    },
        [data]);

    const renderCell = (item: EmployeeData, columnKey: string) => {
        switch (columnKey) {
            case "userDetails":
                return (
                    <div className="flex"><Avatar
                        className="transition-transform"
                        color="default"
                        name={item.userName}
                        size="sm"
                    /><div className="flex pl-2 items-center">{item.EmployeeNo}</div></div>
                )
            case "id":
                return item.id;
            case "type":
                return item.type;
            case "project":
                return item.project;
            case "urgency":
                return (
                    <Chip color={statusColorMap[item.urgency]} size="md" variant="flat">
                        {item.urgency}
                    </Chip>
                )
            case "title":
                return (
                    <Tooltip
                        placement="bottom-start"
                        classNames={{ content: ["text-black bg-neutral-200"] }}
                        content={item.description}>{item.title}</Tooltip>);
            case "date":
                return new Date(item.date).toLocaleString();
            default:
                return ""; // Return an empty string instead of null
        }
    };

    const topContent = useMemo(() => (
        <div className="flex justify-end gap-2">
            <Button
                isDisabled={page === 1}
                size='sm'
                variant={page === 1 ? "light" : "flat"}
                onPress={onPreviousPage}>
                Previous
            </Button>
            <Button
                isDisabled={totalPages === page}
                size='sm'
                variant={page === totalPages ? "light" : "flat"}
                onPress={onNextPage}
            >
                Next
            </Button>
            <label className="flex items-center text-default-400 text-small gap-x-1">
                No. of Rows:
                <Select
                    aria-label="Rows per page"
                    size="sm"
                    placeholder="Rows per page"
                    variant="bordered"
                    selectedKeys={new Set([rowsPerPage.toString()])}
                    onSelectionChange={onRowsPerPageChange}
                    className="flex justify-center items-center text-foreground outline-none text-sm w-20 h-3 "
                    classNames={{
                        label: "opacity-100 font-semibold",
                        trigger: "h-8 min-h-unit-8",
                    }}
                >
                    {pageSelectionOptions.map((pageSelection) => (
                        <SelectItem
                            key={pageSelection.uid}
                            value={pageSelection.name}
                            className="text-foreground"
                        >
                            {pageSelection.name}
                        </SelectItem>
                    ))}
                </Select>
            </label>
        </div>
    ), [page, totalPages, onNextPage, onPreviousPage, onRowsPerPageChange, rowsPerPage]);

    const bottomContent = useMemo(() => (
        <div className="py-2 px-2 flex justify-between items-center">
            <span className="text-small text-default-400">
                {`${currentPageData.length} of ${data.length} items`}
            </span>
            <Pagination
                showControls
                page={page}
                total={totalPages}
                onChange={setPage}
            />
        </div>
    ), [currentPageData.length, data.length, page, totalPages]);

    const classNames = useMemo(() => ({
        wrapper: [
            "max-h-[68vh] mx-auto w-[calc(100%-1rem)] lg:w-full xl:w-full max-w-full overflow-x-auto overflow-y-auto scrollbar-hide bg-background shadow-sm",
        ],
        th: ["text-default-500", "border-b", "border-divider"],
        td: [
            "group-data-[first=true]:first:before:rounded-none",
            "group-data-[first=true]:last:before:rounded-none",
            "group-data-[middle=true]:before:rounded-none",
            "group-data-[last=true]:first:before:rounded-none",
            "group-data-[last=true]:last:before:rounded-none",
        ],
    }), [])
    return (
        <PageLayout>
            {loading ? (
                <div className="flex justify-center items-center h-full">
                    <Spinner size="lg" />
                </div>
            ) : (
                <Table
                    isHeaderSticky
                    aria-label="Employee History Table"
                    topContent={topContent}
                    topContentPlacement="outside"
                    bottomContent={bottomContent}
                    bottomContentPlacement="outside"
                    classNames={classNames}
                    className="flex p-5">
                    <TableHeader columns={columns}>
                        {(column) => (
                            <TableColumn key={column.key}>{column.label}</TableColumn>
                        )}
                    </TableHeader>
                    <TableBody items={currentPageData}>
                        {(item) => (
                            <TableRow key={item.id}>
                                {columns.map((column) => (
                                    <TableCell key={column.key}>
                                        {renderCell(item, column.key)}
                                    </TableCell>
                                ))}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            )}
        </PageLayout>
    );
}

