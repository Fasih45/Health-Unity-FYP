import React, { useState } from "react";
import imagelogo from "./images/healthunitylogo.jpg";
import {
  Doctoricon,
  Labicon,
  TrustedDoctoricon,
  TrustedLabicon,
} from "./IconList";
import { Routes, Route, Outlet, useParams, Link } from "react-router-dom";
import Footer from "./Footer";

const MainLayout = () => {
  const [profileOpen, setProfileOpen] = useState(false);
  const [asideOpen, setAsideOpen] = useState(true);
  const [completeprofile, setcompleteprofilemain] = useState(false);
  const { user, username, fullname } = useParams();
  const [flagasidebar, setFlagasidebar] = useState(false);

  return (
    <>
      <main className="min-h-screen w-full text-gray-700">
        {/* Header */}
        <header className="flex w-full items-center justify-between border-b-2 border-gray-200 bg-blue-500 p-2">
          {/* Logo */}
          <div className="flex items-center ">
            <button
              type="button"
              className="text-3xl"
              onClick={() => {
                if (!flagasidebar) {
                  setFlagasidebar(true);
                  setAsideOpen(true);
                } else {
                  setFlagasidebar(false);
                  setAsideOpen(false);
                }
              }}
              onBlur={() => setAsideOpen(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="w-6 h-6"
              >
                <path
                  fill-rule="evenodd"
                  d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
            <img
              src={imagelogo}
              height="130"
              width="130"
              className="rounded-full"
              alt="Logo"
            />
          </div>

          {/* Profile Button */}
          <div>
            <div className="flex items-center">
              <div className=" hidden sm:block">Hey! </div>
              <div className=" hidden sm:block font-medium ml-2 mr-5 text-white">
                {fullname}
              </div>
              <div className="w-10 h-10 flex items-center justify-center bg-gray-500 text-white font-bold rounded-full">
                {username.charAt(0).toUpperCase()}
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex">
          {/* Aside */}
          {
            <aside
              // className="flex  max-h-full flex-col space-y-2 border-r-2 border-gray-200 bg-white p-2 "
              className={`flex max-h-full flex-col space-y-2 border-r-2 border-gray-200 bg-white p-2 ${
                asideOpen && "hidden md:flex"
              }`}
              onMouseEnter={() => {
                if (!flagasidebar) {
                  setAsideOpen(true);
                }
              }}
              onMouseLeave={() => {
                if (!flagasidebar) {
                  setAsideOpen(false);
                }
              }}
              style={{ height: "100vh" }}
            >
              <Link
                to={`/welcome/${user}/${username}/${fullname}`}
                className="flex items-center space-x-1 rounded-md px-2 py-3 hover:bg-gray-100 hover:text-blue-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                  />
                </svg>
                {asideOpen && <span>Dashboard</span>}
              </Link>

              {(user === "patient" || user === "doctor") && (
                <Link
                  to={`noti`}
                  class="flex items-center space-x-1 rounded-md px-2 py-3 hover:bg-gray-100 hover:text-blue-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="w-6 h-6"
                  >
                    <path d="M12.75 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM7.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM8.25 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM9.75 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM10.5 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM12.75 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM14.25 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 13.5a.75.75 0 100-1.5.75.75 0 000 1.5z" />
                    <path
                      fill-rule="evenodd"
                      d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z"
                      clip-rule="evenodd"
                    />
                  </svg>

                  {asideOpen && <span>Shedule</span>}
                </Link>
              )}

              {user === "medical_labs" && (
                <Link
                  to={`mange_tests`}
                  class="flex items-center space-x-1 rounded-md px-2 py-3 hover:bg-gray-100 hover:text-blue-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                    />
                  </svg>
                  {asideOpen && <span className="truncate">Mange Tests</span>}
                </Link>
              )}

              {user === "patient" && (
                <Link
                  to="trust"
                  className="flex items-center  hover:bg-gray-100 hover:text-blue-600"
                >
                  <TrustedDoctoricon />
                  {asideOpen && (
                    <span className="truncate">Trusted Doctor</span>
                  )}
                </Link>
              )}
              {user === "patient" && (
                <Link
                  to="trustLab"
                  className="flex items-center  hover:bg-gray-100 hover:text-blue-600"
                >
                  <TrustedLabicon />
                  {asideOpen && <span className="truncate">Trusted labs</span>}
                </Link>
              )}

              {(user === "patient" || user === "medical_labs") && (
                <>
                  <hr className="my-4 border-t border-gray-300" />

                  <h6>Search</h6>
                </>
              )}

              {/* Link to Search Doctor */}

              {user === "patient" && (
                <Link
                  to="search"
                  className="flex items-center  hover:bg-gray-100 hover:text-blue-600"
                >
                  <Doctoricon />
                  {asideOpen && <span>Doctor</span>}
                </Link>
              )}

              {user === "patient" && (
                <Link
                  to="searchLab"
                  className="flex items-center   hover:text-blue-600"
                >
                  <Labicon />
                  {asideOpen && <span>Labs</span>}
                </Link>
              )}

              {user === "medical_labs" && (
                <Link
                  to="uploadtest"
                  class="flex items-center space-x-1 rounded-md px-2 py-3 hover:bg-gray-100 hover:text-blue-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="w-6 h-6"
                  >
                    <path d="M4.5 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM14.25 8.625a3.375 3.375 0 116.75 0 3.375 3.375 0 01-6.75 0zM1.5 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM17.25 19.128l-.001.144a2.25 2.25 0 01-.233.96 10.088 10.088 0 005.06-1.01.75.75 0 00.42-.643 4.875 4.875 0 00-6.957-4.611 8.586 8.586 0 011.71 5.157v.003z" />
                  </svg>

                  {asideOpen && <span>Patient</span>}
                </Link>
              )}
              <Link to={`/${user}/signin`}>
                <button
                  onClick={() => {
                    localStorage.removeItem(user);
                  }}
                  class="flex items-center space-x-1 rounded-md px-2 py-3 hover:bg-gray-100 hover:text-blue-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25"
                    />
                  </svg>

                  {asideOpen && <span>Log out</span>}
                </button>
              </Link>

              {/* Repeat similar blocks for other aside links */}
            </aside>
          }

          <div className="w-full overflow-auto min-h-screen bg-gray-100 p-4">
            <Outlet />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
