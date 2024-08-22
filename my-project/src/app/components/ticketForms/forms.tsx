"use client";
import React, { useEffect, useState } from "react";
import {
  Input,
  Button,
  Textarea,
  Select,
  SelectItem,
  Avatar,
  Chip,
  SelectedItems,
  SharedSelection,
} from "@nextui-org/react";
import { Location, Project, Types, Urgency } from "./data";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type User = {
  id: number;
  EmployeeNo: string;
  name: string;
  email: string;
  mobile_no: string;
  status: number;
};

interface FormData {
  type: string;
  project: string;
  urgency: string;
  location: string;
  watchers: string[];
  attachment: string;
  title: string;
  description: string;
  date: Date;
}

const GenerateTicketForm: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<FormData>({
    type: "",
    project: "",
    urgency: "",
    location: "",
    watchers: [],
    attachment: "",
    title: "",
    description: "",
    date: new Date(),
  });
  const [users, setUsers] = useState<User[]>([]);
  const [errors, setErrors] = useState({
    type: "",
    project: "",
    urgency: "",
    location: "",
    watchers: "",
    title: "",
    description: "",
  });

  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  useEffect(() => {
    // Fetch users from the API
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token"); // Get the token from localStorage
        const user = localStorage.getItem("");

        if(!token){
          toast.error("You are not logged in. Redirecting to login page.");
          window.location.href = "/login";
          return;
        }

        const response = await axios.get(
          "http://localhost:8080/api/employeeDetails",
          {
            headers: {
              "x-access-token": token ? token : "", // Set the Authorization header
            },
          }
        );
        setUsers(response.data);
        console.log("Fetched Users:", response.data); // Log the fetched users
      } catch (error) {
        console.error("Error fetching users:", error);
        toast.error("Failed to fetch users. Please try again.");
      }
    };

    fetchUsers();
  }, []); // Empty dependency array ensures this runs once on mount

  const handleChange = (
    e: React.ChangeEvent<
      HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const validate = () => {
    let valid = true;
    let newErrors = {
      type: "",
      project: "",
      urgency: "",
      location: "",
      watchers: "",
      title: "",
      description: "",
    };

    if (!formData.type) {
      newErrors.type = "Type is required";
      valid = false;
    }
    if (!formData.project) {
      newErrors.project = "Project is required";
      valid = false;
    }
    if (!formData.urgency) {
      newErrors.urgency = "Urgency is required";
      valid = false;
    }
    if (!formData.location) {
      newErrors.location = "Location is required";
      valid = false;
    }
    if (!formData.title) {
      newErrors.title = "Title is required";
      valid = false;
    }
    if (!formData.description) {
      newErrors.description = "Description is required";
      valid = false;
    }
    if (formData.watchers.length === 0) {
      newErrors.watchers = "Watchers are required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSelectionChange = (keys: SharedSelection) => {
    let selectedKeys: string[] = [];

    if (keys === "all") {
      // Handle case where all users are selected
      selectedKeys = users.map((user) => user.id.toString());
    } else if (keys instanceof Set) {
      // Handle case where keys is a Set of keys
      selectedKeys = Array.from(keys) as string[];
    }

    // Filter users based on selected keys
    const selected = users.filter((user) =>
      selectedKeys.includes(user.id.toString())
    );

    // Update the selected users array and watchers field in formData
    setSelectedUsers(selected);
    setFormData((prevFormData) => ({
      ...prevFormData,
      watchers: selected.map((user) => user.email.toString()),
    }));

    // Log the selected users array to the console
    console.log("Selected Users:", selected);
  };
  const handleSubmit = async () => {
    if (validate()) {
      // Get the token, username, and email from localStorage
      const token = localStorage.getItem("token"); // Replace "token" with the actual key if different
      const storedUser = localStorage.getItem("user");
      let userName = "";
      let EmployeeNo = "";

      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        userName = parsedUser.profile_name || "";
        EmployeeNo = parsedUser.EmployeeNo || "";
      }

      try {
        const response = await axios.post(
          "http://localhost:8080/api/tickets", // Ensure the URL is correct
          {
            ...formData,
            userName, // Include the username in the form data
            EmployeeNo, // Include the email in the form data
          },
          {
            headers: {
              "x-access-token": token ? token : "", // Attach the token to the request
            },
          }
        );
        console.log("Response:", response.data);

        // Show success message
        toast.success("Ticket created successfully!");

        // Clear form data
        setFormData({
          type: "",
          project: "",
          urgency: "",
          location: "",
          watchers: [],
          attachment: "",
          title: "",
          description: "",
          date: new Date(),
        });

        // Clear selected users
        setSelectedUsers([]);
      } catch (error) {
        console.error("Error posting data:", error);
        toast.error("Failed to create ticket. Please try again.");
      }
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);
      setFormData({
        ...formData,
        attachment: filesArray.map((file) => file.name).join(","),
      });
    }
  };

  return (
    <div className="w-[45rem] max-w-screen-lg mx-auto p-6 bg-white shadow-md rounded-lg max-h-[80vh] overflow-y-auto scrollbar-hide">
      <ToastContainer />
      <h1 className="text-2xl font-semibold mb-4">Create Ticket</h1>
      <form>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Type */}
          <div>
            <Select
              isRequired
              name="type"
              label="Type"
              placeholder="Select Type"
              className="max-w-xs"
              variant="underlined"
              color="primary"
              value={formData.type}
              onChange={(e) => handleSelectChange("type", e.target.value)}
            >
              {Types.map((option) => (
                <SelectItem key={option.key} value={option.key}>
                  {option.label}
                </SelectItem>
              ))}
            </Select>
            {errors.type && (
              <p className="text-red-500 text-sm">{errors.type}</p>
            )}
          </div>

          {/* Project */}
          <div>
            <Select
              isRequired
              name="project"
              label="Project"
              placeholder="Select your Project"
              className="max-w-xs"
              variant="underlined"
              color="primary"
              value={formData.project}
              onChange={(e) => handleSelectChange("project", e.target.value)}
            >
              {Project.map((option) => (
                <SelectItem key={option.key} value={option.key}>
                  {option.label}
                </SelectItem>
              ))}
            </Select>
            {errors.project && (
              <p className="text-red-500 text-sm">{errors.project}</p>
            )}
          </div>

          {/* Urgency */}
          <div>
            <Select
              isRequired
              name="urgency"
              label="Urgency"
              placeholder="Select Urgency"
              className="max-w-xs"
              variant="underlined"
              color="primary"
              value={formData.urgency}
              onChange={(e) => handleSelectChange("urgency", e.target.value)}
            >
              {Urgency.map((option) => (
                <SelectItem key={option.key} value={option.key}>
                  {option.label}
                </SelectItem>
              ))}
            </Select>
            {errors.urgency && (
              <p className="text-red-500 text-sm">{errors.urgency}</p>
            )}
          </div>

          {/* Location */}
          <div>
            <Select
              isRequired
              name="location"
              label="Location"
              placeholder="Select Your Location"
              className="max-w-xs"
              variant="underlined"
              color="primary"
              value={formData.location}
              onChange={(e) => handleSelectChange("location", e.target.value)}
            >
              {Location.map((option) => (
                <SelectItem key={option.key} value={option.key}>
                  {option.label}
                </SelectItem>
              ))}
            </Select>
            {errors.location && (
              <p className="text-red-500 text-sm">{errors.location}</p>
            )}
          </div>

          {/* Title */}
          <div>
            <Input
              isRequired
              name="title"
              label="Title"
              placeholder="Enter Your Title"
              variant="underlined"
              className="max-w-xs"
              value={formData.title}
              onChange={handleChange}
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title}</p>
            )}
          </div>

          {/* Description */}
          <div className="md:col-span-2 mt-3">
            <Textarea
              name="description"
              label="Description"
              rows={3}
              isRequired
              value={formData.description}
              onChange={handleChange}
            />
            {errors.description && (
              <p className="text-red-500 text-sm">{errors.description}</p>
            )}
          </div>

          {/* Assigned to (Watchers) */}
          <div className="md:col-span-2 mt-3">
            <Select
              items={users}
              label="Assigned to"
              variant="underlined"
              isMultiline={true}
              selectionMode="multiple"
              placeholder="Select a user"
              labelPlacement="inside"
              classNames={{
                base: "max-w-2xl",
                trigger: "min-h-12 py-2",
              }}
              onSelectionChange={handleSelectionChange}
              renderValue={(items: SelectedItems<User>) => {
                return (
                  <div className="flex flex-wrap gap-2">
                    {items.map((item: any) => (
                      <Chip key={item.key}>{item.data.name}</Chip>
                    ))}
                  </div>
                );
              }}
            >
              {(user) => (
                <SelectItem key={user.id.toString()} textValue={user.name}>
                  <div className="flex gap-2 items-center">
                    <Avatar
                      alt={user.name}
                      className="flex-shrink-0"
                      size="sm"
                      // src={user.avatar}
                    />
                    <div className="flex flex-col">
                      <span className="text-small">{user.name}</span>
                      <span className="text-tiny text-default-400">
                        {user.email}
                      </span>
                    </div>
                  </div>
                </SelectItem>
              )}
            </Select>
            {errors.watchers && (
              <p className="text-red-500 text-sm">{errors.watchers}</p>
            )}
          </div>

          {/* Attachment */}
          <div className="md:col-span-2 mt-3">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-medium"
                htmlFor="attachment"
              >
                Attachment
              </label>
              <input
                id="attachment"
                name="attachment"
                type="file"
                multiple
                onChange={handleFileChange}
                className="mt-1 block w-full "
              />
            </div>
            {formData.attachment && (
              <p className="text-sm text-gray-500">{formData.attachment}</p>
            )}
          </div>
        </div>
        <div className="mt-3 flex justify-center space-x-4">
          <Button type="button" color="warning" onClick={handleSubmit}>
            Submit Ticket
          </Button>
        </div>
      </form>
    </div>
  );
};

export default GenerateTicketForm;
