"use client";

import React from "react";
import { Menu, Search, Plus, LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

/**
 * Props:
 * - isCollapsed: boolean
 * - setIsCollapsed: (b: boolean) => void
 * - onCreateJob: () => void
 * - onLogout: () => void
 * - searchMaxWidth: number
 * - user: object | null
 * - authLoading: boolean
 * - topbarPlaceholder: string
 */
export default function Topbar({
  isCollapsed,
  setIsCollapsed,
  onCreateJob = () => {},
  onLogout = () => {},
  searchMaxWidth = 1200,
  user = null,
  authLoading = false,
  topbarPlaceholder = "Search candidates, jobs, skills...",
}) {
  const avatarInitial = (user && (user.name?.[0] || user.email?.[0])) || "U";

  return (
    <div className="w-full flex items-center justify-between gap-4">
      <div className="flex items-center gap-3 min-w-0">
        {/* hamburger toggles sidebar */}
        <button
          onClick={() => setIsCollapsed((s) => !s)}
          aria-label="Toggle sidebar"
          className="p-2 rounded hover:bg-[color:var(--color-surface-1)]/60"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* search bar */}
        <div
          className="flex items-center gap-2 rounded-lg px-3 py-2 shadow-sm bg-white/80"
          style={{ maxWidth: searchMaxWidth, minWidth: 420 }}
        >
          <Search className="w-4 h-4 text-[color:var(--color-foreground-muted)]" />
          <Input
            className="border-0 bg-transparent p-0 min-w-0 focus:ring-0"
            placeholder={topbarPlaceholder}
            aria-label="Search"
          />
        </div>

        {/* Create job button */}
        <Button
          onClick={onCreateJob}
          style={{
            background: "var(--color-primary)",
            borderColor: "transparent",
            color: "var(--color-primary-foreground)",
          }}
        >
          <Plus className="w-4 h-4" />
          <span className="ml-2 hidden sm:inline">Create job</span>
        </Button>
      </div>

      {/* Right: profile with dropdown (logout only) */}
      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className="flex items-center gap-2 rounded-full px-3 py-2 focus-visible:ring-2 focus-visible:ring-offset-2 hover:bg-surface-3"
              aria-label="Open profile menu"
            >
              {user?.photoURL ? (
                <Avatar>
                  <AvatarImage
                    src={user.photoURL}
                    alt={user.name || "profile"}
                  />
                  <AvatarFallback>{avatarInitial}</AvatarFallback>
                </Avatar>
              ) : (
                <Avatar>
                  <AvatarFallback>{avatarInitial}</AvatarFallback>
                </Avatar>
              )}
              <span className="text-sm font-medium text-foreground">
                {user?.name || user?.email || "HR"}
              </span>
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-40">
            <DropdownMenuItem
              onClick={onLogout}
              className={`${
                authLoading ? "opacity-70 pointer-events-none" : ""
              }`}
            >
              <LogOut className="mr-2 h-4 w-4" />
              {authLoading ? "Signing out..." : "Logout"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
