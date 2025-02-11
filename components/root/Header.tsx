import UserProfileDropdown from "@/components/root/UserProfileDropdown";
const Header = () => {
  return (
    <div
      id="main-header-container"
      className="flex flex-col sticky top-0 z-[5]"
    >
      <div className="flex items-center justify-between gap-2 py-3 px-6 border-b border-border-neutral-default bg-background-neutral-default">
        SCC
        <div className="flex items-center gap-4">
          <UserProfileDropdown />
        </div>
      </div>
    </div>
  );
};

export default Header;
