"use client";

import { UserContext } from "@/context/UserContext";
import ChevronDown from "@/assets/images/icons/ChevronDown";
import { Avatar, DropdownMenu } from "@radix-ui/themes";
import { useContext } from "react";

const UserProfileDropdown = () => {
  const { currentUser, logout } = useContext(UserContext);

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <div
          role="button"
          className="w-[4.75rem] h-11 rounded-lg bg-surface-neutral-default p-1 pr-2 flex items-center justify-between"
        >
          <Avatar fallback="TS" />
          <ChevronDown className="w-4 h-4" />
        </div>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content
        className="w-[13.5rem]"
        variant="soft"
        color="gray"
        align="end"
      >
        <DropdownMenu.Item className="pointer-events-none text-body-sm-regular overflow-hidden text-ellipsis text-nowrap max-w-[18ch]">
          {currentUser.email}
        </DropdownMenu.Item>
        <DropdownMenu.Item
          className="text-body-sm-medium"
          onClick={() => logout()}
        >
          Logout
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default UserProfileDropdown;
