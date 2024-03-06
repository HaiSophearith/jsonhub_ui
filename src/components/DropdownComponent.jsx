import React, { useState } from 'react'

export default function DropdownComponent() {
    const [dropdown, setDropdown] = useState(false);
    const dropDownMenu = () => {
        dropdown ? setDropdown(false) : setDropdown(true);
      };
  return (
    <div>
        <div>
            <ul className="ml-5 p-2">
              
                <button
                  type="button"
                  className="flex items-center bg-blue-500 w-full p-2 transition duration-75 rounded-lg group hover:bg-white"
                  onClick={dropDownMenu}
                >
                  <span className="flex-1 ml-3 text-left whitespace-nowrap">
                    Status
                  </span>
                  <svg class="w-4 h-4 ml-2" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
                {dropdown ? (
                  <ul id="dropdown" className="py-2 space-y-2 ml-2 p-2">
                      agffg
                  </ul>
                ) : null}
              
            </ul>
          </div>
 </div>
  )
}
