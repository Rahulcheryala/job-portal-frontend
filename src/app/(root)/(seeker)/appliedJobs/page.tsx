import JobsPage from "@/Components/Cards/JobsPage";
import { cookies } from "next/headers";

export const metadata = {
  title: "Applied Jobs",
  description: "View all the jobs applied by you.",
};

const AppliedJobs = () => {
  const access_token = cookies().get("access_token");
  const isAuthenticated = !!access_token;

  return <JobsPage type="applied" isAuthenticated={isAuthenticated} />;
};

export default AppliedJobs;
