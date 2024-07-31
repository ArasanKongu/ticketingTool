import { IconType } from "react-icons";
import { IoTicketOutline } from "react-icons/io5";
import { MdOutlineSettings, MdOutlineHistory } from "react-icons/md";

export interface SubMenu {
    name: string
    link: string
    icon?: IconType;
    slug?: string;
}

export interface SideBarMenus {
    name: string;
    link: string;
    icon?: IconType;
    iconSize?: string;
    onAction?: string,
}

export const menuItems: SideBarMenus[] = [
    { name: 'Create Ticket', link: '/createTicket', icon: IoTicketOutline },
    { name: 'History', link: '/history', icon: MdOutlineHistory },
    { name: 'Settings', link: '/settings', icon: MdOutlineSettings },
];