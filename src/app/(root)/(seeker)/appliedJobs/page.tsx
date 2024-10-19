import JobsPage from "@/Components/Cards/JobsPage";

export const metadata = {
  title: "Applied Jobs",
  description: "View all the jobs applied by you.",
};

const PostedJobs = () => {
  return <JobsPage type="applied" />;
};

export default PostedJobs;
