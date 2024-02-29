import { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import DashboardMenuContent from "./DashboardMenuContent.js";
import { useSelector, useDispatch } from "react-redux";
import { setMenuClose } from "../redux/actions.js";

export default function Admindashboard() {
  const state = useSelector((state)=>state.Allteachers)
  const dispatch  = useDispatch()

  console.log(state.close);
  
  const toggleMobileMenuOpen =(value)=>{
    dispatch(setMenuClose(value));
  }

  return (
    <div className="bg-blueGray-200">
      <header className=" inset-x-0 top-0 z-50">
        <nav
          className="flex items-center justify-between p-2 lg:px-0"
          aria-label="Global"
        >
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={()=>toggleMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-6">
            <DashboardMenuContent />
          </div>
        </nav>
        <Dialog
          as="div"
          className="lg:hidden flex"
          open={state.close || false}
          onClose={setMenuClose}
        >
          <div className="fixed inset-0 z-50" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => toggleMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root ml-4">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  <DashboardMenuContent />
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>
    </div>
  );
}
