import { useSelector } from "react-redux";
import { LogoutBtn, Logo, Container } from "../index";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "My Posts",
      slug: "/my-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
    {
      name: "Saved Posts",
      slug: "/saved-posts",
      active: authStatus,
    },
  ];

  return (
    <header className="py-3 shadow bg-gray-500">
      <Container>
        <nav className="flex items-center justify-between ">
          <div className="mr-4 ">
            <Link to="/">
              <Logo width="70px" />
            </Link>
          </div>
          <ul className="hidden md:flex ml-auto gap-2">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <NavLink
                    to={item.slug}
                    className={({ isActive }) =>
                      `inline-block px-6 py-2 duration-200 rounded-full ${
                        isActive
                          ? "bg-blue-100 text-black"
                          : "hover:bg-blue-100 text-black"
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
          <div className="md:hidden ml-auto">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </nav>
        {menuOpen && (
          <ul className="flex flex-col md:hidden gap-2 mt-4">
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.name}>
                    <NavLink
                      to={item.slug}
                      onClick={() => setMenuOpen(false)}
                      className={({ isActive }) =>
                        `block px-4 py-2 rounded ${
                          isActive
                            ? "bg-blue-100 text-black"
                            : "hover:bg-blue-100 text-black"
                        }`
                      }
                    >
                      {item.name}
                    </NavLink>
                  </li>
                )
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        )}
      </Container>
    </header>
  );
}

export default Header;
