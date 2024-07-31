"use client";
import React, { useState } from "react";
import { Input, Button, Textarea, Select, SelectItem } from "@nextui-org/react";
import { Location, Project, Types, Urgency, Watchers } from "./data";
import { FaUser } from "react-icons/fa";

const GenerateTicketForm = () => {
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [selectedPeople, setSelectedPeople] = useState<any[]>([]); // Adjust to handle complex objects

  const handleSelectionChange = (keys: any) => {
    console.log("Selection changed:", keys);

    const selectedKeys = Array.isArray(keys) ? keys : keys.selectedKeys;

    if (selectedKeys) {
      const selected = Watchers.filter((watcher) =>
        selectedKeys.includes(watcher.key)
      );
      setSelectedPeople(selected);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);
      setSelectedFiles(filesArray);
    }
  };

  return (
    <div className="w-10/12 mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-semibold mb-4">Create Ticket</h1>
      <form>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Select
              isRequired
              items={Types}
              label="Type"
              placeholder="Select Type"
              className="max-w-xs"
              variant="underlined"
              color="primary"
            >
              {(type) => (
                <SelectItem key={type.key} textValue={type.label}>
                  {type.label}
                </SelectItem>
              )}
            </Select>
          </div>

          <div>
            <Select
              isRequired
              items={Project}
              label="Project"
              placeholder="Select your Project"
              className="max-w-xs"
              variant="underlined"
              color="primary"
            >
              {(project) => (
                <SelectItem key={project.key} textValue={project.label}>
                  {project.label}
                </SelectItem>
              )}
            </Select>
          </div>

          <div>
            <Select
              isRequired
              items={Urgency}
              label="Urgency"
              placeholder="Select Urgency"
              className="max-w-xs"
              variant="underlined"
              color="primary"
            >
              {(urgency) => (
                <SelectItem key={urgency.key} textValue={urgency.label}>
                  {urgency.label}
                </SelectItem>
              )}
            </Select>
          </div>

          <div>
            <Select
              isRequired
              items={Location}
              label="Location"
              placeholder="Select Your Location"
              className="max-w-xs"
              variant="underlined"
              color="primary"
            >
              {(loc) => (
                <SelectItem key={loc.key} textValue={loc.label}>
                  {loc.label}
                </SelectItem>
              )}
            </Select>
          </div>

          <div>
            <Select
              isRequired
              items={Watchers}
              selectionMode="multiple"
              label="Watchers"
              placeholder="Watchers"
              className="max-w-xs"
              variant="underlined"
              color="primary"
              onSelectionChange={handleSelectionChange}
              value={selectedPeople.map((watcher) => watcher.key)}
            >
              {(watcher) => (
                <SelectItem key={watcher.key} textValue={watcher.label}>
                  <div className="flex items-center space-x-2">
                    {watcher.icon}
                    <div>
                      <span>{watcher.label}</span>
                      <br />
                      <span className="text-sm text-gray-500">
                        {watcher.email}
                      </span>
                    </div>
                  </div>
                </SelectItem>
              )}
            </Select>
          </div>

          <div>
            <Input
              isRequired
              label="Title"
              placeholder="Enter Your Title"
              variant="underlined"
              className="max-w-xs"
            />
          </div>

          <div className="md:col-span-2 mt-8">
            <Textarea label="Description" rows={3} isRequired />
          </div>

          <div className="md:col-span-2 mt-8">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="file-upload"
              >
                Attach files (2 MB max each)
              </label>

              <div className="relative inline-block w-full max-w-xs">
                <input
                  id="file-upload"
                  type="file"
                  accept=".png,.doc,.docx"
                  multiple
                  onChange={handleFileChange}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-end space-x-4">
          <Button type="button">Save</Button>
        </div>
      </form>
    </div>
  );
};

export default GenerateTicketForm;
