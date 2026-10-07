import { createElement, type ReactNode } from "react";
import {
  DashboardIcon,
  GestorIcon,
  CalendarSidebarIcon,
  AccountIcon,
  GeneralIcon,
} from "../../../Components/Icons/SidebarIcons";

export type SidebarItemConfig = {
  id: string;
  label: string;
  to: string;
  icon: ReactNode;
  badge?: string | number;
  exact?: boolean;
};

export type SidebarSectionConfig = {
  id: string;
  title: string;
  items: SidebarItemConfig[];
};

export const sidebarSections: SidebarSectionConfig[] = [
  {
    id: "tasks-section",
    title: "Tareas",
    items: [
      {
        id: "dashboard",
        label: "Dashboard",
        to: "/",
        exact: true,
        icon: createElement(DashboardIcon),
      },
      {
        id: "gestor",
        label: "Gestor",
        to: "/tasks",
        icon: createElement(GestorIcon),
      },
      {
        id: "calendar",
        label: "Calendario",
        to: "/Calendar",
        icon: createElement(CalendarSidebarIcon),
      },
    ],
  },
  {
    id: "general-section",
    title: "General",
    items: [
      {
        id: "account",
        label: "Mi Cuenta",
        to: "/account",
        icon: createElement(AccountIcon),
      },
      {
        id: "settings",
        label: "Ajustes",
        to: "/settings",
        icon: createElement(GeneralIcon),
      },
    ],
  },
];
