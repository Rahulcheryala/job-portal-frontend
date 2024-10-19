import React from 'react';
import Link from 'next/link';

interface NavBarProps {
  starticon?: boolean;
  menu?: boolean;
  endIcon?: boolean;
  variant?: 'default' | 'neutral' | 'primary';
  withSearch?: boolean;
  post?: boolean;
}

export const NavBar = ({
  starticon = false,
  menu = false,
  endIcon = true,
  variant = 'default',
  withSearch = false,
  post=false
}: NavBarProps) => {
  let navbarClass = "navbar";
  let buttonClass = "btn btn-ghost text-xl";

  switch (variant) {
    case 'neutral':
      navbarClass += " bg-neutral text-neutral-content";
      break;
    case 'primary':
      navbarClass += " bg-primary text-primary-content";
      break;
    default:
      navbarClass += " bg-white";
  }

  return (
    <div className={`${navbarClass} border border-gray-300 shadow-lg rounded-md`} style={{ width: "600px" }}>
      {starticon && (
        <div className="flex-none">
          <button className="btn btn-square btn-ghost">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      )}
      <div className="flex-1"> 
        <a className={`text-black p-6 text-3xl `} >Code Unity</a>
        {post&&<main className="flex-1"><a className={`${buttonClass} text-black ml-[25%] font-serif p-21 text-[250%] `}>{"Hire remotely"}</a>
        <Link href="/"><button className='btn btn-error ml-[35%] text-white font-bold'>Back{" <--"}</button></Link></main>}
      </div>
      {menu && (
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li><a>Link</a></li>
            <li>
              <details>
                <summary>
                  Parent
                </summary>
                <ul className="p-2 bg-base-100 rounded-t-none">
                  <li><a>Link 1</a></li>
                  <li><a>Link 2</a></li>
                </ul>
              </details>
            </li>
          </ul>
        </div>
      )}
      {withSearch && (
        <div className="flex-none gap-2">
          <div className="form-control">
            <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
          </div>
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img alt="Tailwind CSS Navbar component" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
              </div>
            </div>
            <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li><a>Settings</a></li>
              <li><a>Logout</a></li>
            </ul>
          </div>
        </div>
      )}
      {endIcon && (
        <div className="flex-none">
          <button className="btn btn-square btn-ghost">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path>
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};
