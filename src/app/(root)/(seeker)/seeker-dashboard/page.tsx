import JobsPage from "@/Components/Cards/JobsPage";
import { cookies } from "next/headers";

export const metadata = {
  title: "Jobs",
  description: "Explore and apply for jobs",
};

const Jobs = () => {
  const access_token = cookies().get("access_token");
  const isAuthenticated = !!access_token;

  return <JobsPage type="jobs" isAuthenticated={isAuthenticated} />;
};

export default Jobs;
