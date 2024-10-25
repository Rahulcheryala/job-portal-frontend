"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaGithub, FaLinkedin, FaTelegram, FaGlobe } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";
import Spinner from "@/Components/Loaders/Spinner";

type WorkExperience = {
  company_name: string;
  title: string;
  start_date: string; // Change Date to string for simplicity
  end_date: string | null;
  currently_working: boolean;
  description: string;
};

type Education = {
  college_name: string;
  year_of_graduation: number;
  degree: string;
  gpa: number;
  major: string;
};

interface ProfileData {
  first_name: string;
  last_name: string;
  email: string;
  profile_picture_url: string | null;
  // account_type: "job_seeker" | "job_hirer";

  job_seeker_profile?: {
    achievements: string;
    location: string;
    bio: string;
    years_of_experience: string;
  };

  job_hirer_profile?: {
    designation: string;
    company_name: string;
    company_stage: string;
    company_description: string;
    product_service: string;
  };

  social_profile: {
    website: string | null;
    telegram: string | null;
    github: string | null;
    linkedin: string | null;
  };

  personal_info: {
    phone_number: string;
  };

  education_details: Education[];
  work_experience_details: WorkExperience[];
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const ProfilePage = () => {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [accountType, setAccountType] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const accessToken = localStorage.getItem("access_token");

        if (!accessToken) {
          throw new Error("Access token not found");
        }

        setAccountType(localStorage.getItem("account_type"));

        const response = await axios.get(`${baseUrl}/accounts/profile/`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const data = response.data;
        // console.log(data);

        // Map the response data to the ProfileData structure
        const mappedData: ProfileData = {
          first_name: data.first_name || "",
          last_name: data.last_name || "",
          email: data.email || "",
          profile_picture_url: data.profile_picture_url || null,
          // account_type: data.account_type,

          job_seeker_profile: data.job_seeker_profile
            ? {
                achievements: data.job_seeker_profile.achievements || "",
                location: data.job_seeker_profile.location || "",
                bio: data.job_seeker_profile.bio || "",
                years_of_experience:
                  data.job_seeker_profile.years_of_experience || "",
              }
            : undefined,

          job_hirer_profile: data.job_hirer_profile
            ? {
                designation: data.job_hirer_profile.designation || "",
                company_name: data.job_hirer_profile.company_name || "",
                company_stage: data.job_hirer_profile.company_stage || "",
                company_description:
                  data.job_hirer_profile.company_description || "",
                product_service: data.job_hirer_profile.product_service || "",
              }
            : undefined,

          social_profile: {
            website: data.social_profile?.website || null,
            telegram: data.social_profile?.telegram || null,
            github: data.social_profile?.github || null,
            linkedin: data.social_profile?.linkedin || null,
          },

          personal_info: {
            phone_number: data.personal_info?.phone_number || "",
          },

          education_details: data.education_details
            ? data.education_details.map((edu: any) => ({
                college_name: edu.college_name || "",
                year_of_graduation: edu.year_of_graduation || 0,
                degree: edu.degree || "",
                gpa: edu.gpa || 0,
                major: edu.major || "",
              }))
            : [],

          work_experience_details: data.work_experience_details
            ? data.work_experience_details.map((exp: any) => ({
                company_name: exp.company_name || "",
                title: exp.title || "",
                start_date: exp.start_date || "",
                end_date: exp.end_date || null,
                currently_working: exp.currently_working || false,
                description: exp.description || "",
              }))
            : [],
        };

        // console.log(mappedData);

        setProfileData(mappedData);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  if (!profileData) {
    return (
      <div className="flex items-center justify-center w-full h-[100dvh]">
        <Spinner />
      </div>
    );
  }

  // Transform achievements to an array if it is a string
  const achievementsList: string[] = profileData.job_seeker_profile
    ?.achievements
    ? profileData.job_seeker_profile.achievements
        .split(",")
        .map((item) => item.trim())
    : [];

  return (
    <div className="w-full flex justify-center items-center min-h-screen bg-gray-50 min-[450px]:ps-[4.5rem]">
      <div className="bg-white shadow-md rounded-lg sm:py-10 py-8 sm:px-8 px-4 w-[50rem] max-w-5xl sm:my-8 min-[450px]:my-2.5 sm:mx-6 min-[450px]:mx-2.5 mx-1.5 border border-gray-200">
        <div className="w-full flex justify-between items-center mb-4 relative gap-4">
          <div className="flex items-center gap-2">
            <Image
              src={
                profileData.profile_picture_url ||
                "/assets/images/default-profile.webp"
              }
              width={64}
              height={64}
              alt="Profile Picture"
              className="sm:w-16 sm:h-16 w-12 aspect-square rounded-full object-cover border-2"
            />
            <div className="text-gray-700">
              <h2 className="md:text-2xl sm:text-xl max-[450px]:text-base text-lg font-semibold hover:text-blue-500 transition-colors duration-150">
                {profileData.first_name} {profileData.last_name}
              </h2>
              <p className="text-gray-500 sm:text-base text-sm">
                {profileData.email}
              </p>
              {accountType === "job_hirer" && (
                <p className="text-gray-500 md:text-base sm:text-sm text-xs">
                  {profileData.job_hirer_profile?.designation} •{" "}
                  {profileData.job_hirer_profile?.company_name} •{" "}
                  {profileData.job_hirer_profile?.company_stage}
                </p>
              )}
            </div>
          </div>

          <Link
            href="/profile/edit"
            title="Edit Profile"
            className="text-gray-500 hover:text-orange-500 hover:scale-110 transition-all duration-300 outline-none focus:outline-none focus:text-orange-500 focus:scale-110 max-sm:absolute max-sm:-top-3 max-sm:-right-1"
          >
            <FiEdit className="sm:w-8 sm:h-8 w-6 h-6" />
          </Link>
        </div>

        {/* Display phone number and location */}
        <div className="mb-4">
          <h3 className="sm:text-lg max-[450px]:text-sm text-base font-semibold text-gray-700 mb-1.5">
            Contact Information
          </h3>
          <p className="text-gray-500 sm:text-base max-[450px]:text-xs text-sm">
            Phone: +{profileData.personal_info.phone_number || "Not provided"}{" "}
            <br />
          </p>
          {accountType === "job_seeker" && (
            <p className="text-gray-500 sm:text-base max-[450px]:text-xs text-sm">
              Location: {profileData.job_seeker_profile?.location}
            </p>
          )}
        </div>

        {accountType === "job_hirer" && (
          <>
            <div className="mb-4">
              <h3 className="sm:text-lg max-[450px]:text-sm text-base font-semibold text-gray-700 mb-1.5">
                About Company
              </h3>
              <p className="text-gray-500 sm:text-base text-sm">
                {profileData.job_hirer_profile?.company_description ||
                  "No Details provided"}
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="sm:text-lg max-[450px]:text-sm text-base font-semibold text-gray-700">
                Company Type
              </h3>
              <div className="flex sm:text-sm text-xs font-semibold text-gray-500">
                <span className="bg-gray-200/80 text-gray-600 px-3 py-1.5 rounded-full">
                  {profileData.job_hirer_profile?.product_service} based -{" "}
                  {profileData.job_hirer_profile?.company_stage}
                </span>
              </div>
            </div>
          </>
        )}

        {accountType === "job_seeker" && (
          <>
            <div className="mb-4">
              <h3 className="sm:text-lg max-[450px]:text-sm text-base font-semibold text-gray-700">
                Bio
              </h3>
              <p className="text-gray-500 sm:text-base text-sm">
                {profileData.job_seeker_profile?.bio || "No Bio provided"}
              </p>
            </div>

            <div className="mb-4">
              <h3 className="sm:text-lg max-[450px]:text-sm text-base font-semibold text-gray-700">
                Experience
              </h3>
              <p className="text-gray-500 sm:text-base text-sm">
                {profileData.job_seeker_profile?.years_of_experience ||
                  "Fresher"}
              </p>
            </div>

            <div className="mb-4">
              <h3 className="sm:text-lg max-[450px]:text-sm text-base font-semibold text-gray-700">
                Achievements
              </h3>
              <ul className="list-disc list-inside text-gray-500 sm:text-base text-sm">
                {achievementsList.length > 0
                  ? achievementsList.map(
                      (achievement: string, index: number) => (
                        <li key={index}>{achievement}</li>
                      )
                    )
                  : "No achievements provided"}
              </ul>
            </div>

            <div className="mb-4">
              <h3 className="sm:text-lg max-[450px]:text-sm text-base font-semibold text-gray-700 mb-2">
                Work Experience
              </h3>
              {profileData.work_experience_details &&
              profileData.work_experience_details.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-3 gap-y-2 items-center">
                  {profileData.work_experience_details.map((exp, index) => (
                    <div
                      key={index}
                      className="border-2 sm:px-4 sm:py-2 px-2.5 py-1 rounded-md"
                    >
                      <h4 className="font-semibold text-gray-700 sm:text-base text-sm">
                        {exp.title} at {exp.company_name}
                      </h4>
                      <p className="text-gray-500 max-[450px]:text-xs text-sm">
                        {exp.start_date} -{" "}
                        {exp.end_date
                          ? exp.end_date
                          : exp.currently_working
                          ? "Present"
                          : "N/A"}
                      </p>
                      <p className="text-gray-500 text-sm">{exp.description}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No work experience provided</p>
              )}
            </div>

            <div className="mb-4">
              <h3 className="sm:text-lg max-[450px]:text-sm text-base font-semibold text-gray-700 mb-2">
                Education
              </h3>
              {profileData.education_details &&
              profileData.education_details.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-3 gap-y-2 items-center">
                  {profileData.education_details.map((edu, index) => (
                    <div
                      key={index}
                      className="border-2 sm:px-4 sm:py-2 px-2.5 py-2 rounded-md"
                    >
                      <h4 className="font-semibold text-gray-700 sm:text-base text-sm mb-2">
                        {edu.degree} in {edu.major} from {edu.college_name}
                      </h4>
                      <p className="text-gray-500 text-sm">
                        Graduated in {edu.year_of_graduation} with a GPA of{" "}
                        {edu.gpa}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No Education details provided</p>
              )}
            </div>
          </>
        )}

        <ul className="mt-5 flex flex-col sm:gap-y-3 gap-y-2">
          <Link
            href={profileData.social_profile.telegram || "#"}
            className="flex items-center gap-2.5 group w-fit px-1.5 py-0.5 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <FaTelegram
              size={20}
              className="text-gray-500 group-hover:text-blue-500 cursor-pointer"
            />
            <p className="text-sm text-gray-500 underline group-hover:text-blue-500 group-hover:decoration-2 focus:outline-none focus:decoration-2">
              Telegram
            </p>
          </Link>
          <Link
            href={profileData.social_profile.github || "#"}
            className="flex items-center gap-2.5 group w-fit px-1.5 py-0.5 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
          >
            <FaGithub
              size={20}
              className="text-gray-500 group-hover:text-purple-500 cursor-pointer"
            />
            <p className="text-sm text-gray-500 underline group-hover:text-purple-500 group-hover:decoration-2 focus:outline-none focus:decoration-2">
              Github
            </p>
          </Link>
          <Link
            href={profileData.social_profile.linkedin || "#"}
            className="flex items-center gap-2.5 group w-fit px-1.5 py-0.5 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-blue-700"
          >
            <FaLinkedin
              size={20}
              className="text-gray-500 group-hover:text-blue-700 cursor-pointer"
            />
            <p className="text-sm text-gray-500 underline group-hover:text-blue-700 group-hover:decoration-2 focus:outline-none focus:decoration-2">
              LinkedIn
            </p>
          </Link>
          <Link
            href={profileData.social_profile.website || "#"}
            className="flex items-center gap-2.5 group w-fit px-1.5 py-0.5 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-black"
          >
            <FaGlobe
              size={20}
              className="text-gray-500 group-hover:text-black cursor-pointer"
            />
            <p className="text-sm text-gray-500 underline group-hover:text-black group-hover:decoration-2 focus:outline-none focus:decoration-2">
              Website
            </p>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default ProfilePage;
