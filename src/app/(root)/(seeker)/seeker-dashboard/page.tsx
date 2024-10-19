import JobsPage from "@/Components/Cards/JobsPage";

export const metadata = {
  title: "Jobs",
  description: "Explore and apply for jobs",
};

const PostedJobs = () => {
  return <JobsPage type="jobs" />;
};

export default PostedJobs;
