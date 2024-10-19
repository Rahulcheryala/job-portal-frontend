import React from 'react';
import { getTimeDifference } from "../utils/timeutils";

interface Props {
  cls?: string;
  bdg?: boolean;
  top?: boolean;
  imgflg?: boolean;
  divcls?: string;
  popup?: boolean;
  fgcls?: string;
  imgsrc?: string;
  bgcolor?: string;
  position?: string;
  company_name?: string;
  location_restriction?: string;
  tags?: string;
  created_at?: string;
  job?: object;
  viewDetails?: Function;
}

interface tprop {
  tag?: string;
  index?: number;
}

const tdisp = ({ tag = "", index = 0 }: tprop) => {
  if (index < 4)
    return (
      <div key={index} className="border-2 rounded-md p-1 ml-2" style={{ borderColor: "black" }}>
        <p className="text-black-400">{tag.trim()}</p>
      </div>
    );
  if (index == 4)
    return (
      <div key={-1} className="p-1 ml-2">
        <p className="text-black-400">...</p>
      </div>
    );
};

const tdisp1 = ({ tag = "", index = 0 }: tprop) => {
  if (index < 4)
    return (
      <div className="border border-gray-300 rounded-md px-2 py-2 text-black-500 text-center ml-[1%]" style={{ display: "inline" }}>
        {tag.trim()}
      </div>
    );
  if (index == 4)
    return (
      <div style={{ display: "inline" }} key={-1} className="p-1 ml-2 text-black-400">
        ...
      </div>
    );
};

export const JobCard = ({
  cls = "",
  bdg = false,
  imgflg = false,
  divcls = "flex justify-between w-full mb-2",
  popup = false,
  top = true,
  fgcls = "",
  bgcolor = "white",
  imgsrc = "https://media.dev.to/cdn-cgi/image/width=1600,height=900,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fwhh1lpihw7h587pb2iuc.png",
  position,
  company_name = "Sample Company",
  location_restriction = "Faridabad",
  tags = "HTML,Css,JS",
  created_at = "6/18/2024 1:00:21",
  viewDetails,
  job,
}: Props) => {
  if (company_name == "") company_name = "Company";
  if (position == "") position = "Position";
  if (imgsrc == "")
    imgsrc = "https://tse4.mm.bing.net/th?id=OIP.jsRxsoSHWZurGmwk32OMcQAAAA&pid=Api&P=0&h=220";

  return (
    <li
      className={`border border-gray-200 rounded-lg shadow-md p-4 w-full transition-transform transform hover:scale-105 flex flex-col items-start ${cls}`}
      style={{ backgroundColor: `${bgcolor}`, width: "80%", height: "auto" }}
    >
      {popup && (
        <div className="card-body">
          <div className="card-actions justify-end">
            <button className="btn btn-square btn-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <p>We are using cookies for no reason.</p>
        </div>
      )}

      <div className={divcls} style={{ marginLeft: "0px" }}>
        {imgflg && top && (
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full border border-black">
              <img alt="Tailwind CSS Navbar component" src={imgsrc} />
            </div>
          </div>
        )}
        <h3 className="ml-[50%] text-lg font-bold">{position}</h3>
      </div>
      <div className="flex items-center w-full mb-2">
        {imgflg && !top && (
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img alt="Tailwind CSS Navbar component" src={imgsrc} />
            </div>
          </div>
        )}
        <div className="w-2/5">
          <div className="text-gray-700">
            <a className="font-serif font-bold">{company_name}</a>
            {bdg && <div className="badge badge-secondary inline ml-[5%]">NEW</div>}
          </div>
        </div>
        {tags && tags.split(",").map((tag, index) => tdisp({ tag, index }))}
        <div className="ml-auto flex items-center">
          <p className="mr-[8%] text-black-500 mr-32">{getTimeDifference(created_at)}</p>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <button className="border border-gray-300 rounded-md px-2 py-2 w-16" style={{ borderColor: "black" }}>
              Apply
            </button>
            <button
              className="border border-gray-300 rounded-md px-2 py-2 w-32"
              style={{ borderColor: "black", marginTop: "25px" }}
              onClick={() => viewDetails(job)}
            >
              View Details
            </button>
          </div>
        </div>
      </div>
      <div style={{ width: "90%" }}>
        {location_restriction && location_restriction.split(",").map((tag, index) => tdisp1({ tag, index }))}
      </div>
    </li>
  );
};