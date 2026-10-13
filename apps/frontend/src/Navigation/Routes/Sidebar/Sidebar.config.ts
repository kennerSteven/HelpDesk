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

  to: string;
  icon: ReactNode;
  badge?: string | number;
  exact?: boolean;
};

export type SidebarSectionConfig = {
  id: string;

  items: SidebarItemConfig[];
};

export const sidebarSections: SidebarSectionConfig[] = [
  {
    id: "tasks-section",

    items: [
      {
        id: "dashboard",

        to: "/",
        exact: true,
        icon: createElement(DashboardIcon),
      },
      {
        id: "gestor",

        to: "/tasks",
        icon: createElement(GestorIcon),
      },
      {
        id: "calendar",

        to: "/Calendar",
        icon: createElement(CalendarSidebarIcon),
      },
    ],
  },
  {
    id: "general-section",

    items: [
      {
        id: "account",

        to: "/account",
        icon: createElement(AccountIcon),
      },
      {
        id: "settings",

        to: "/settings",
        icon: createElement(GeneralIcon),
      },
    ],
  },
];
