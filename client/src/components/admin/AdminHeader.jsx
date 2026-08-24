import { FiMenu, FiUser } from "react-icons/fi";
import { useSelector } from "react-redux";

const AdminHeader = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <header
      className="
        sticky
        top-0
        z-30
        flex
        h-16
        items-center
        justify-between
        border-b
        border-[#E7DED4]
        bg-white
        px-4
        sm:px-6
        lg:px-8
      "
    >
      {/* MOBILE MENU */}

      <button
        type="button"
        className="
          rounded-lg
          p-2
          text-[#341A36]
          hover:bg-[#F7F2EB]
          lg:hidden
        "
        aria-label="Open menu"
      >
        <FiMenu className="text-xl" />
      </button>

      {/* TITLE */}

      <div className="hidden lg:block">
        <p className="text-xs text-[#6B5A68]">
          Welcome back
        </p>

        <h2 className="text-sm font-medium text-[#341A36]">
          Admin Dashboard
        </h2>
      </div>

      {/* USER */}

      <div className="ml-auto flex items-center gap-3">
        <div
          className="
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-full
            bg-[#341A36]
            text-[#C7A05A]
          "
        >
          <FiUser />
        </div>

        <div className="hidden sm:block">
          <p className="text-sm font-medium text-[#341A36]">
            {user?.name || "Admin"}
          </p>

          <p className="text-[11px] text-[#6B5A68]">
            Administrator
          </p>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;