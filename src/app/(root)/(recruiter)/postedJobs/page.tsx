import JobsPage from "@/Components/Cards/JobsPage";

export const metadata = {
  title: "Posted Jobs",
  description: "View all the jobs posted by you.",
};

const PostedJobs = () => {
  return <JobsPage type="posted" />;
};

export default PostedJobs;
