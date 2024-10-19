import ProfileCard from "@/Components/Cards/ProfileCard";
import { CgScrollH } from "react-icons/cg";
import { dashboardDetails } from "@/lib/actions/recruiter.actions";

export const metadata = {
  title: "Dashboard",
  description: "Dashboard to view posted jobs and applications received.",
};

const Dashboard = async () => {
  const {
    jobsCount,
    applicationsCount,
  }: { jobsCount: number; applicationsCount: number } =
    await dashboardDetails();

  return (
    <main className="min-h-screen w-full bg-[#FAFAFA] flex-1">
      <div className="px-4 pt-8 py-4 sm:px-8 lg:px-14 lg:pt-10 lg:pb-2 mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4 xl:gap-12 lg:gap-6">
          <div className="flex-none lg:flex-1">
            <p className="xl:text-6xl md:text-5xl text-4xl  font-bold leading-10 text-blue-600">
              70%
              <span className="ms-1 inline-flex items-center gap-x-1 bg-gray-200 font-medium text-gray-800 text-xs leading-4 rounded-full py-0.5 px-2">
                <svg
                  className="shrink-0 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01-.622-.636zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708z" />
                </svg>
                +7% this month
              </span>
            </p>
            <p className="mt-2 sm:mt-3 text-gray-500 truncate w-full">
              of Recruiters hire top talent from the software industry
            </p>
          </div>

          <div className="flex lg:justify-center gap-4 lg:flex-1 lg:border-l xl:pl-12 lg:pl-6 lg:border-gray-300">
            <div className="w-full lg:w-auto sm:flex-1">
              <p className="xl:text-3xl lg:text-2xl md:text-xl text-base font-semibold text-blue-600">
                {jobsCount}
              </p>
              <p className="mt-1 text-gray-500 sm:text-sm text-[12px]">
                Jobs Posted
              </p>
            </div>

            <div className="w-full lg:w-auto sm:flex-1">
              <p className="xl:text-3xl lg:text-2xl md:text-xl text-base font-semibold text-blue-600">
                {applicationsCount}+
              </p>
              <p className="mt-1 text-gray-500 sm:text-sm text-[12px]">
                Applications received
              </p>
            </div>

            <div className="w-full lg:w-auto sm:flex-1">
              <p className="xl:text-3xl lg:text-2xl md:text-xl text-base font-semibold text-blue-600">
                {applicationsCount - 3}
              </p>
              <p className="mt-1 text-gray-500 sm:text-sm text-[12px]">
                Applications shortlisted
              </p>
            </div>
          </div>
        </div>
      </div>

      <section className="sm:px-8 px-2 w-full">
        <h2 className="lg:text-4xl text-2xl font-bold text-blue-500 md:my-8 md:mx-9 mx-2 my-4">
          Top Profiles
        </h2>
        <div className="grid gap-4 w-[95%] mx-auto grid-flow-col grid-cols-[repeat(auto,minmax(0,1fr))] overflow-x-scroll overscroll-contain scrollbar-hide snap-x snap-mandatory">
          <ProfileCard />
          <ProfileCard />
          <ProfileCard />
          <ProfileCard />
          <ProfileCard />
          <ProfileCard />
          <ProfileCard />
          <ProfileCard />
          <ProfileCard />
        </div>

        <div className="text-blue-500 sm:me-16 mt-2 cursor-default">
          <span
            title="Press Shift + Scroll"
            className="italic text-sm font-semibold flex items-center sm:justify-end justify-center gap-2"
          >
            Scroll
            <CgScrollH size={24} className="inline-block" />
          </span>
        </div>
      </section>
    </main>
  );
};

export default Dashboard;
