'use client';

import React, { useState, useEffect } from 'react'
import { Bell, User } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Moon, Sun } from "lucide-react"

const Header: React.FC = () => {
  const [hasUnread, setHasUnread] = useState(false);
  const [notifications, setNotifications] = useState({ calls: 0, spend: 0, leads: 0 });
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    // Simulate getting an unread notification each night
    const now = new Date();
    if (now.getHours() === 0 && now.getMinutes() === 0) {
      setHasUnread(true);
    }

    // Mock data for notifications
    setNotifications({
      calls: Math.floor(Math.random() * 100),
      spend: Math.floor(Math.random() * 1000),
      leads: Math.floor(Math.random() * 50)
    });
  }, []);

  const handleNotificationClick = () => {
    setHasUnread(false);
  };

  return (
    <header className="bg-background border-b border-border px-4 py-3 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" onClick={handleNotificationClick}>
              <Bell className="h-5 w-5" />
              {hasUnread && (
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Calls today: {notifications.calls}</DropdownMenuItem>
            <DropdownMenuItem>Spend today: ${notifications.spend}</DropdownMenuItem>
            <DropdownMenuItem>Leads this week: {notifications.leads}</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

export default Header
