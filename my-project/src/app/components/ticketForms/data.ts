import { ReactNode } from "react";

export interface Watcher {
  key: string;
  label: string;
  email: string;
  icon: ReactNode;
}
export const Types = [
  { key: "incident", label: "Incident" },
  { key: "request", label: "Request" },
];

export const Project = [
  { key: "tag", label: "Tag" },
  { key: "ashita", label: "Ashita" },
  { key: "AAJ", label: "AAJ" },
];

export const Urgency = [
  { key: "High", label: "High" },
  { key: "Medium", label: "Medium" },
  { key: "Low", label: "Low" },
];

export const Location = [
  { key: "coimbatore", label: "NEXWARE-Coimbatore" },
  { key: "Japan", label: "NEXGEN-Japan" },
];

export const Watchers: Watcher[] = [
  {
    key: "N31",
    label: "Rajesh",
    email: "rajesh@example.com",
    icon: "",
  },
  {
    key: "N32",
    label: "Senthil",
    email: "senthil@example.com",
    icon: "",
  },
  {
    key: "N33",
    label: "Mohan",
    email: "mohan@example.com",
    icon: "",
  },
  { key: "N34", label: "Bala", email: "bala@example.com", icon: "" },
  {
    key: "N31",
    label: "Rajesh",
    email: "rajesh@example.com",
    icon: "",
  },
  {
    key: "N32",
    label: "Senthil",
    email: "senthil@example.com",
    icon: "",
  },
  {
    key: "N33",
    label: "Mohan",
    email: "mohan@example.com",
    icon: "",
  },
  { key: "N34", label: "Bala", email: "bala@example.com", icon: "" },
  {
    key: "N31",
    label: "Rajesh",
    email: "rajesh@example.com",
    icon: "",
  },
  {
    key: "N32",
    label: "Senthil",
    email: "senthil@example.com",
    icon: "",
  },
  {
    key: "N33",
    label: "Mohan",
    email: "mohan@example.com",
    icon: "",
  },
  { key: "N34", label: "Bala", email: "bala@example.com", icon: "" },
  {
    key: "N31",
    label: "Rajesh",
    email: "rajesh@example.com",
    icon: "",
  },
  {
    key: "N32",
    label: "Senthil",
    email: "senthil@example.com",
    icon: "",
  },
  {
    key: "N33",
    label: "Mohan",
    email: "mohan@example.com",
    icon: "",
  },
  { key: "N34", label: "Bala", email: "bala@example.com", icon: "" },
];
