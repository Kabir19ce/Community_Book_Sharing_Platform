"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface SidebarItem {
  name: string;
  href?: string;
  children?: SidebarItem[];
}

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const [collapsed, setCollapsed] = useState(false);
  const [openBooks, setOpenBooks] = useState(false);

  const storedUser =
    typeof window !== "undefined"
      ? sessionStorage.getItem("user")
      : null;

  if (!storedUser) {
    router.push("/signin");
    return null;
  }

  const user = JSON.parse(storedUser);

  if (!user?.userid) {
    alert("User not found. Please login again.");
    router.push("/signin");
    return null;
  }

  const role = Number(user.userrole);

  let items: SidebarItem[] = [];

  if (role === 2) {
    // Admin Sidebar
    items = [
      { name: "Dashboard", href: "/AdminDashboard" },
      { name: "Profile", href: "/profile" },
      {
        name: "Books",
        children: [
          { name: "View Books", href: "/book/view" },
    { name: "Add Book", href: "/book/add" },
    { name: "Update Book", href: "/book/update" },
        ],
      },
      { name: "Logout", href: "/logout" },
    ];
  } else if (role === 1) {
    // User Sidebar
    items = [
      { name: "Dashboard", href: "/userDashboard" },
      { name: "Profile", href: "/profile" },
      {
        name: "Books",
        children: [{ name: "View Books", href: "/book/view/page.tsx" }],
      },
      { name: "Logout", href: "/logout" },
    ];
  } else {
    alert("User role not recognized.");
    router.push("/signin");
    return null;
  }

  // 🔹 Check if Books submenu should be active
  const isBooksActive = (children?: SidebarItem[]) =>
    children?.some((child) => pathname.startsWith(child.href!));

  // 🔹 Auto-open Books submenu if active route
  useEffect(() => {
    items.forEach((item) => {
      if (item.children && isBooksActive(item.children)) {
        setOpenBooks(true);
      }
    });
  }, [pathname]);

  return (
    <aside
      className={`bg-white dark:bg-gray-900 shadow-lg h-screen p-4 transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      <ul className="space-y-2 mt-[100px]">
        {items.map((item) => (
          <li key={item.name}>
            {/* NORMAL LINK */}
            {!item.children ? (
              <Link
                href={item.href!}
                className={`block px-4 py-2 rounded ${
                  pathname === item.href
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800"
                }`}
              >
                {collapsed ? item.name[0] : item.name}
              </Link>
            ) : (
              <>
                {/* BOOKS PARENT */}
                <button
                  onClick={() => setOpenBooks(!openBooks)}
                  className={`w-full text-left px-4 py-2 rounded ${
                    isBooksActive(item.children)
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800"
                  }`}
                >
                  {collapsed ? item.name[0] : item.name}
                </button>

                {/* SUBMENU */}
                {openBooks && !collapsed && (
                  <ul className="ml-4 mt-2 space-y-1">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href!}
                          className={`block px-3 py-2 rounded text-sm ${
                            pathname === child.href
                              ? "bg-blue-500 text-white"
                              : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                          }`}
                        >
                          {child.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
