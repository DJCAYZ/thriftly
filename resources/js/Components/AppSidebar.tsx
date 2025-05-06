import { ChartColumn, ChevronUp, LayoutDashboard, Library, User2, BookMarked, LucideIcon, ChevronDown, ChevronRight, ArrowRightLeft } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/Components/ui/sidebar";
import { Link, usePage } from '@inertiajs/react';
import ApplicationLogo from "./ApplicationLogo";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/Components/ui/dropdown-menu";
import { MenuItem } from "@headlessui/react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";

interface MenuItem {
    title: string,
    url: string,
    icon : LucideIcon,
}

interface MenuItemGroup {
    title: string,
    subitems: MenuItem[],
}

// Menu items.
const items: Array<MenuItem | MenuItemGroup> = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Accounts",
    url: "/accounts",
    icon: BookMarked,
  },
  {
    title: "Records",
    subitems: [
        {
            title: "Transactions",
            url: "/transactions",
            icon: Library,
        },
        {
            title: "Transfers",
            url: "/transactions/transfers",
            icon: ArrowRightLeft,
        },
    ],
  },
//   {
//     title: "Statistics",
//     url: "/statistics",
//     icon: ChartColumn,
//   },
];

export function AppSidebar() {

    const { url, props } = usePage();

    return (
        <Sidebar className="opacity-90">
            <SidebarHeader>
                <ApplicationLogo className="w-30 px-5" />
            </SidebarHeader>    
            <SidebarContent>
                <SidebarGroup>
                <SidebarGroupContent>
                    <SidebarMenu>
                    {items.map((item) => {
                        if ("url" in item) {
                            return (
                                <SidebarGroup>
                                    <SidebarGroupContent>
                                        <SidebarMenuItem key={item.title}>
                                            <SidebarMenuButton asChild isActive={url === item.url}>
                                                <Link href={item.url}>
                                                    <item.icon />
                                                    <span>{item.title}</span>
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    </SidebarGroupContent>
                                </SidebarGroup>
                            )
                        }

                        return (
                            <Collapsible title={item.title} defaultOpen className="group/collapsible">
                                <SidebarGroup>
                                    <SidebarGroupLabel className="group/label text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground" asChild>
                                        <CollapsibleTrigger>    
                                            {item.title}{" "}
                                            <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                                        </CollapsibleTrigger>
                                    </SidebarGroupLabel>
                                    <CollapsibleContent>
                                        <SidebarGroupContent className="space-y-1">
                                            {item.subitems.map((subitem) => (
                                                <SidebarMenuItem key={subitem.title}>
                                                    <SidebarMenuButton asChild isActive={url === subitem.url}>
                                                        <Link href={subitem.url}>
                                                            <subitem.icon />
                                                            <span>{subitem.title}</span>
                                                        </Link>
                                                    </SidebarMenuButton>
                                                </SidebarMenuItem>
                                            ))}
                                        </SidebarGroupContent>
                                    </CollapsibleContent>
                                </SidebarGroup>
                            </Collapsible>
                        )
                    })}
                    </SidebarMenu>
                </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton>
                                    <User2 /> {props.auth.user.username}
                                    <ChevronUp className="ml-auto" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                side="top"
                                className="w-[--radix-popper-anchor-width]"
                            >
                                <DropdownMenuItem>
                                    <Link href={route('profile.edit')} className="text-left w-full">
                                        <span>Profile</span>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Link href={route('logout')} method='post' className="text-left w-full">
                                        <span>Sign Out</span>
                                    </Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}
