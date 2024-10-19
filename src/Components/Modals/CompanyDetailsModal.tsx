import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import CompanySelect from "../Forms/Inputs/apiLinked/CompanySelect";
import SignupFormInput from "../Forms/Inputs/SignupFormInput";
import ImgUpload from "../Forms/Custom/ImgUpload";
import { IoMdClose } from "react-icons/io";
import { swalFailed, swalSuccess } from "@/lib/helpers/swal";
import axios from "axios";

// Define your validation schema with Zod
const schema = z.object({
  company_website: z.string().url("Must be a valid URL"),
});

type CompanyFormInputs = z.infer<typeof schema>;

interface CompanyDetailsModalProps {
  emptyFields: string[];
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsMissingDataFilled: React.Dispatch<React.SetStateAction<boolean>>;
  setMainFormData: any;
}

interface emptyFields {
  company_name?: string;
  company_website?: string;
  company_photo?: File | null;
  company_photo_url?: string;
}

const CompanyDetailsModal: React.FC<CompanyDetailsModalProps> = ({
  emptyFields,
  setIsModalOpen,
  setMainFormData,
  setIsMissingDataFilled,
}) => {
  const [formData, setFormData] = useState<emptyFields>({
    company_name: "",
    company_website: "",
    company_photo: null,
    company_photo_url: "",
  });
  const [isPhotoSaved, setIsPhotoSaved] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CompanyFormInputs>({
    resolver: zodResolver(schema),
  });

  const handleChange = (key: string, value: string | File | null) => {
    setFormData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleFileUpload = async (file: File, fileType: string) => {
    // console.log(file);
    const baseurl = process.env.NEXT_PUBLIC_BASE_URL;
    const token = localStorage.getItem("access_token");

    const formData = new FormData();
    formData.append("file", file); // Append the file to FormData

    try {
      // console.log(`Uploading ${fileType}...`);
      const response = await fetch(
        `${baseurl}/accounts/upload/company-photo/`,
        {
          method: "PUT",
          body: formData, // Send the file data
          headers: {
            Authorization: `Bearer ${token}`, // Include the token
          },
        }
      );

      const result = await response.json();
      // console.log(result);

      if (response.ok) {
        // console.log(`${fileType} uploaded successfully`, result);
        setFormData((prevData) => ({
          ...prevData,
          company_photo_url: result.company_photo_url, // Dynamically update the relevant URL in state
        }));

        setIsPhotoSaved(true);
      } else {
        console.error(`Error uploading ${fileType}:`, result);
      }
    } catch (error) {
      console.error(`Network error while uploading ${fileType}:`, error);
    }
  };

  const onSubmit = async (data: CompanyFormInputs) => {
    // Handle the file upload first if a photo is present and hasn't been saved yet
    if (
      emptyFields.includes("company_photo") &&
      formData.company_photo &&
      !isPhotoSaved
    ) {
      await handleFileUpload(formData.company_photo, "company_photo");
    }

    // Prepare the data to be sent in the PATCH request
    const profileUpdateData = {
      job_hirer_profile: {} as { [key: string]: any },
    };

    // Add fields conditionally
    if (emptyFields.includes("company_name"))
      profileUpdateData.job_hirer_profile.company_name = formData.company_name;
    if (emptyFields.includes("company_website"))
      profileUpdateData.job_hirer_profile.company_website =
        data.company_website;

    const baseurl = process.env.NEXT_PUBLIC_BASE_URL;
    const access_token = localStorage.getItem("access_token");

    // console.log("Updating company details:", profileUpdateData);
    try {
      // Send the PATCH request
      const response = await axios.patch(
        `${baseurl}/accounts/profile/`,
        profileUpdateData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`, // Include the token
          },
        }
      );

      // Check if the response is OK
      if (response.status === 200) {
        // console.log("Profile updated successfully:", response.data);

        // Show success message
        swalSuccess({
          title: "Company details updated successfully.",
          type: "toast",
        });

        setMainFormData((prevData: any) => ({
          ...prevData,
          company_name: response.data?.job_hirer_profile?.company_name,
          company_website: response.data?.job_hirer_profile?.company_website,
          company_photo_url:
            response.data?.job_hirer_profile?.company_photo_url,
        }));

        // Optionally close the modal or perform additional actions
        setIsModalOpen(false);
        setIsMissingDataFilled(true);
      } else {
        // Handle error responses
        console.error("Error updating profile:", errors);

        swalFailed({
          title: "Error updating company details.",
          type: "toast",
        });
      }
    } catch (error) {
      console.error("Network error while updating profile:", error);

      // Show network error message
      swalFailed({
        title: "Network Error while updating company details.",
        type: "toast",
      });
    }
  };

  return (
    <div className="overflow-y-auto overflow-x-hidden fixed z-[70] flex justify-center items-center w-full inset-0 h-full select-none">
      <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
        {/* Modal content */}
        <div className="relative p-4 bg-white rounded-lg shadow sm:p-5">
          {/* Modal header */}
          <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 border-gray-300">
            <h3 className="text-lg font-semibold text-gray-900">
              Update Company Details
            </h3>
            <button
              type="button"
              className="bg-transparent hover:bg-gray-200 rounded-lg text-sm p-1 ml-auto inline-flex items-center"
              onClick={() => setIsModalOpen(false)}
            >
              <IoMdClose size={24} className="text-gray-500" />
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          {/* Modal body */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 sm:grid-cols-[1fr,auto] gap-12">
              {/* Left side: Company Name and Company Website */}
              <div className="space-y-2">
                {/* Company Name */}
                {emptyFields.includes("company_name") && (
                  <div className="w-full">
                    <label className="text-gray-500 font-semibold block mb-1 me-1.5">
                      Company Name <span className="text-red-500">*</span>
                    </label>
                    <CompanySelect
                      handle={(val: string) => {
                        handleChange("company_name", val);
                      }}
                      val={formData.company_name ?? ""}
                    />
                  </div>
                )}

                {/* Company Website */}
                {emptyFields.includes("company_website") && (
                  <div className="flex flex-col sm:flex-row gap-x-6 gap-y-4 items-center">
                    <SignupFormInput
                      id="company_website"
                      name="company_website"
                      type="url"
                      label="Company Website"
                      control={control}
                      placeholder="www.company.com"
                      req={true}
                      cls={
                        "relative w-full mt-0.5 p-2 bg-gray-50 text-gray-800 rounded border border-gray-300 outline-none focus-visible:ring-2 focus-visible:ring-blue-300 placeholder:text-sm placeholder:italic"
                      }
                      error={errors.company_website}
                    />
                  </div>
                )}
              </div>

              {/* Right side: Company Photo Upload */}
              {emptyFields.includes("company_photo") && (
                <div className="flex-1 mx-8">
                  <div className="w-full flex justify-center">
                    <ImgUpload
                      label="Company Logo"
                      name="company_photo"
                      Url={formData.company_photo_url!}
                      onChange={handleChange}
                      submit={handleFileUpload}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex items-center space-x-4 mt-6">
              <button
                type="submit"
                className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Update Company Details
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetailsModal;
