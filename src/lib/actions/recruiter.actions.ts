"use server";

import axios from "axios";
import { cookies } from "next/headers";

export const dashboardDetails = async () => {
  const baseurl = process.env.NEXT_PUBLIC_BASE_URL;
  const access_token = cookies().get("access_token")?.value;

  let jobsCount = 0;
  let applicationsCount = 0;

  try {
    const response = await axios.get(`${baseurl}/posted-jobs/`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    jobsCount = response.data.count;
  } catch (error: any) {
    console.error(error.response?.data || error.message);
  }

  // need to change this
  // try {
  //   const responseApplications = await axios.get(`${baseurl}/applications`, {
  //     headers: {
  //       Authorization: `Bearer ${access_token}`,
  //     },
  //   });
  //   applicationsCount = responseApplications.data.length;
  // } catch (error: any) {
  //   console.error(error.response?.data || error.message);
  // }

  // Return as a JSON object
  return {
    jobsCount,
    applicationsCount,
  };
};
