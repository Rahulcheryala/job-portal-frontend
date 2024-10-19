import { UseFormWatch } from "react-hook-form";
import JobCard from "../Cards/JobCard";

interface FormData {
  job_role: string;
  job_description: string;
  job_location: string; // need to make it as string[] later
  industry: string;
  employment_type: string;
  experience_needed: string;
  skills_required: string[];
  benefits: string[];

  how_to_apply: string;
  apply_url: string;
  application_deadline: string;

  currency_type: string;
  annual_salary_min: number;
  annual_salary_max: number;

  // prefetched data
  company_name?: string;
  company_website?: string;
  company_photo_url?: string;
}

type PreviewModeModalProps = {
  watch: UseFormWatch<any>;
  formData: FormData;
  handlePreview: () => void;
};

const PreviewModeModal = ({
  watch,
  formData,
  handlePreview,
}: PreviewModeModalProps) => {
  return (
    <div className="fixed inset-0 flex md:justify-center items-center z-[80] w-full overflow-auto">
      <div className="w-fit h-fit md:px-10 sm:px-6 px-3 rounded-lg">
        <h3 className="text-blue-500 font-bold md:text-3xl sm:text-2xl text-lg">
          Preview
        </h3>
        <p className="text-gray-200 md:text-base sm:text-sm text-xs py-3">
          Here is a preview of how your job post will look like, with the
          details:
        </p>
        <JobCard
          type="preview"
          job={{
            posted_by: {
              company_name: formData.company_name!,
              company_photo_url: formData.company_photo_url!,
              company_website: formData.company_website!,
            },

            job_role: watch && watch("job_role"),
            job_description: formData.job_description,
            job_location: formData.job_location,
            industry: formData.industry,
            employment_type: formData.employment_type,
            experience_needed: formData.experience_needed,
            skills_required: formData.skills_required.join(","),

            currency_type: formData.currency_type,
            annual_salary_min: Number(formData.annual_salary_min),
            annual_salary_max: Number(formData.annual_salary_max),
            benefits: formData.benefits.join(","),

            application_deadline: formData.application_deadline,
            how_to_apply: formData.how_to_apply,
            apply_url: watch && watch("apply_url"),
          }}
          seekerside={false}
        />

        <div className="w-full flex mt-3">
          <button
            className="inline-block bg-red-500 hover:bg-red-700 text-white font-bold px-4 py-2 rounded-lg mx-auto"
            onClick={handlePreview}
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreviewModeModal;
