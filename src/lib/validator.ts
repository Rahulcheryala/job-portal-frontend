import { z } from "zod";

const forgotPasswordSchema = z.object({
  email: z
    .string()
    .email()
    .max(50, { message: "Email must be at most 50 characters long" }),
});

const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .regex(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/,
        "At least: 8 characters, 1 uppercase, 1 lowercase, 1 symbol"
      ),
    confirm_password: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

const loginFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long" }),
  password: z.string(),
});

const recruiterSignupFormSchema = z
  .object({
    first_name: z
      .string()
      .min(3, { message: "First name must be at least 3 characters long" }),
    last_name: z
      .string()
      .min(3, { message: "Last name must be at least 3 characters long" }),
    email: z
      .string()
      .email()
      .max(50, { message: "Email must be at most 50 characters long" }),
    work_email: z
      .string()
      .email()
      .max(50, { message: "Working email must be at most 50 characters long" }),
    username: z
      .string()
      .min(3, { message: "Username must be at least 3 characters long" })
      .regex(/^\S*$/, { message: "Username cannot contain spaces" }),
    password: z
      .string()
      .regex(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/,
        "At least: 8 characters, 1 uppercase, 1 lowercase, 1 symbol"
      ),
    confirm_password: z.string(),
    how_heard_about_company: z.string(),
  })
  .refine(
    (data) => {
      // console.log(data.password, data.confirm_password);
      return data.password === data.confirm_password;
    },
    {
      message: "Passwords do not match",
      path: ["confirm_password"],
    }
  );

const seekerSignupFormSchema = z
  .object({
    first_name: z
      .string()
      .min(3, { message: "First name must be at least 3 characters long" }),
    last_name: z
      .string()
      .min(3, { message: "Last name must be at least 3 characters long" }),
    email: z
      .string()
      .email()
      .max(50, { message: "Email must be at most 50 characters long" }),
    username: z
      .string()
      .min(3, { message: "Username must be at least 3 characters long" }),
    password: z
      .string()
      .regex(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/,
        "At least: 8 characters, 1 uppercase, 1 lowercase, 1 symbol"
      ),
    confirm_password: z.string(),
    // location: z.string().min(1, { message: "Location is required" }),
    // experience: z.coerce
    //   .number()
    //   .gte(0, { message: "Experience must be a non-negative number" })
    //   .lte(50, { message: "Experience must be at most 50 years" }),
    how_heard_about_company: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

const postJobSchema = z.object({
  // company_name: z.string().min(1, { message: "Company name is required" }),
  job_role: z.string().min(1, { message: "Job Role is required" }),
  apply_url: z.string().url(),
});

const aboutSchema = z.object({
  first_name: z
    .string()
    .min(3, { message: "First name must be at least 3 characters long" }),
  last_name: z
    .string()
    .min(3, { message: "Last name must be at least 3 characters long" }),
  work_email: z
    .union([
      z
        .string()
        .email()
        .min(1, { message: "Your work email is required" })
        .max(50, { message: "Email must be at most 50 characters long" }),
      z.null(),
    ])
    .optional(),
  company_website: z
    .union([
      z.string().url().min(1, { message: "Website is required" }),
      z.null(),
    ])
    .optional(),
  designation: z
    .union([
      z
        .string()
        .min(1, { message: "Your designation is required" })
        .max(50, { message: "Designation must be at most 50 characters long" }),
      z.null(),
    ])
    .optional(),
  textarea: z
    .string()
    .min(1, { message: "Description is required" })
    .max(1000, { message: "Description must be at most 500 characters long" }),
});

const socialProfilesSchema = z.object({
  linkedin: z.string().url(),
  github: z.string().url(),
  website: z.string().url(),
  telegram: z.string().url(),
});

const experienceSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Work Description is required" }),
});

const educationSchema = z.object({
  year_of_graduation: z.coerce
    .number()
    .gte(new Date().getFullYear() - 100, {
      message: "Graduation year cannot be before 1922",
    })
    .lte(new Date().getFullYear() + 6, {
      message: "Graduation year cannot be more than 6 years in the future",
    })
    .or(z.null()),
  gpa: z.coerce
    .number()
    .gte(0, { message: "CGPA cannot be 0" })
    .lte(10, { message: "CGPA cannot be more than 10" })
    .or(z.null()),
});

const generalSchema = z.object({
  achievements: z.union([z.string(), z.null()]).optional(),
  pronouns_self_describe: z
    .union([
      z
        .string()
        .min(1, { message: "Field must not be empty" })
        .max(30, { message: "Pronouns must be at most 30 characters long" }),
      z.null(),
    ])
    .optional(),
  gender_self_describe: z
    .union([
      z.string().min(1, { message: "Field must not be empty" }).max(50, {
        message: "Pronouns must be at most 30 characters long",
      }),
      z.null(),
    ])
    .optional(),
});

export {
  forgotPasswordSchema,
  resetPasswordSchema,
  loginFormSchema,
  recruiterSignupFormSchema,
  seekerSignupFormSchema,
  postJobSchema,
  aboutSchema,
  socialProfilesSchema,
  experienceSchema,
  educationSchema,
  generalSchema,
};
