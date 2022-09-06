/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { useEffect, useState } from "react";
import { Link as LinkRouter, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moviesActions from "../redux/actions/moviesActions";
import userActions from "../redux/actions/userActions";
import Badge from "@mui/material/Badge";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import logo from "../assets/logo2.png";
import { FaUser } from "react-icons/fa";

const navigation = [{ name: "Home", href: "/", current: true }];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function NavBar() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const loggedUser = useSelector((store) => store.userReducer.loggedUser);
  const favorites = useSelector((store) => store.userReducer.favorites);

  function handleSubmit(e) {
    e.preventDefault();
  }

  useEffect(() => {
    dispatch(moviesActions.filterMovies(search));
    // eslint-disable-next-line
  }, [search]);

  return (
    <Disclosure
      as="nav"
      className="bg-gray-800  sm:bg-transparent absolute z-10 w-full"
    >
      {({ open }) => (
        <>
          <div className="max-w-screen-2xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-[10vh]">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center">
                  <img
                    className="hidden sm:block h-8 w-auto"
                    src={logo}
                    alt="Workflow"
                  />
                </div>
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <LinkRouter
                        key={item.name}
                        to={item.href}
                        className={classNames(
                          item.current
                            ? "text-white hover:text-gray-300"
                            : "text-white hover:text-gray-300",
                          "px-3 py-2 rounded-md text-sm font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </LinkRouter>
                    ))}
                  </div>
                </div>
              </div>
              <div className="gap-2 absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-0 sm:pr-0">
                {/* Search*/}
                <div className="buscador">
                  <form onSubmit={handleSubmit}>
                    <label>
                      <input
                        type="text"
                        name="name"
                        placeholder="Search..."
                        onKeyUp={(e) => setSearch(e.target.value)}
                      />
                    </label>
                  </form>
                </div>
                <LinkRouter to="/favorites">
                  <Badge badgeContent={favorites.length} color="primary">
                    {loggedUser !== null ? (
                      favorites.length > 0 ? (
                        <AiFillHeart color="white" fontSize={30} />
                      ) : (
                        <AiOutlineHeart color="white" fontSize={30} />
                      )
                    ) : (
                      <AiOutlineHeart color="white" fontSize={30} />
                    )}
                  </Badge>
                </LinkRouter>
                {/* Profile dropdown */}
                <Menu as="div" className="ml-3 relative z-10">
                  <div>
                    <Menu.Button className="bg-gray-800 flex text-sm rounded-full">
                      <span className="sr-only">Open user menu</span>
                      {loggedUser ? (
                        <FaUser
                          color="white"
                          fontSize={30}
                          style={{ background: "black", borderRadius: 50 }}
                        />
                      ) : (
                        <FaUser
                          color="black"
                          fontSize={30}
                          style={{ background: "white", borderRadius: 50 }}
                        />
                      )}
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {loggedUser ? (
                        <Menu.Item>
                          {({ active }) => (
                            <LinkRouter
                              onClick={() => dispatch(userActions.userLogout())}
                              to={"/"}
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Logout
                            </LinkRouter>
                          )}
                        </Menu.Item>
                      ) : (
                        <>
                          <Menu.Item>
                            {({ active }) => (
                              <LinkRouter
                                to={"/login"}
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                Login
                              </LinkRouter>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <LinkRouter
                                to={"/register"}
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                Register
                              </LinkRouter>
                            )}
                          </Menu.Item>
                        </>
                      )}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>
          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block px-3 py-2 rounded-md text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
