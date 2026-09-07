import { createElement, type ReactNode } from "react";
import {
  AccountIcon,
  BillingIcon,
  GeneralIcon,
  InvoicesIcon,
  TeamsIcon,
} from "../../../Components/Icons/SidebarIcons";

export type SidebarItemConfig = {
  id: string;
  label: string;
  to: string;
  icon: ReactNode;
};

export const sidebarItems: SidebarItemConfig[] = [
  { id: "general", label: "General", to: "/", icon: createElement(GeneralIcon) },
  { id: "teams", label: "Teams", to: "/pepe", icon: createElement(TeamsIcon) },
  { id: "billing", label: "Billing", to: "/billing", icon: createElement(BillingIcon) },
  { id: "invoices", label: "Invoices", to: "/invoices", icon: createElement(InvoicesIcon) },
  { id: "account", label: "Account", to: "/account", icon: createElement(AccountIcon) },
];
