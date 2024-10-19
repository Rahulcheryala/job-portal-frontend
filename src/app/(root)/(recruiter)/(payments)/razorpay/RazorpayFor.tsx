"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Script from "next/script";
import styles from "./RazorpayForm.module.css";

interface Job {
  name: string;
  price: number;
  img: string;
}

interface RazorpayFormProps {
  jobs: Job;
}

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

const RazorpayForm: React.FC<RazorpayFormProps> = ({ jobs }) => {
  const [error, setError] = useState<string | null>(null);
  const [job, setJob] = useState<Job>({
    name: "Razorpay Integration",
    img: "https://akaunting.com/public/assets/media/54-mark-britto/razorpay/razorpay-logo.jpg",
    price: 350,
  });

  const handleRazorpayPayment = async () => {
    try {
      console.log("Razorpay payment processing");
      const orderUrl = process.env.NEXT_PUBLIC_ORDER_URL;
      if (!orderUrl) {
        throw new Error("Order URL is not defined in environment variables");
      }

      const { data } = await axios.post(orderUrl, {
        amount: job.price,
        userId: "123456",
      });
      console.log("Order data:", data);

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY || "rzp_test_DL8XNF5TE9MW4P", // Razorpay key from env variable
        amount: data.data.amount,
        currency: data.data.currency,
        name: job.name,
        description: "Test Transaction",
        image: job.img,
        order_id: data.data.id,
        handler: async (response: RazorpayResponse) => {
          try {
            const verifyUrl = process.env.NEXT_PUBLIC_VERIFY_URL;
            if (!verifyUrl) {
              throw new Error(
                "Verify URL is not defined in environment variables"
              );
            }

            const { data } = await axios.post(verifyUrl, response);
            console.log("Verification data:", data);
          } catch (error: any) {
            console.log(
              "Verification error:",
              error.response?.data || error.message
            );
            setError("Verification failed. Please try again.");
          }
        },
        theme: {
          color: "#3399cc",
        },
      };
      console.log("Razorpay options:", options);

      const rzp1 = new (window as any).Razorpay(options);
      rzp1.open();
    } catch (error: any) {
      console.log(
        "Error processing payment:",
        error.response?.data || error.message
      );
      setError("Error processing payment with Razorpay. Please try again.");
    }
  };

  return (
    <div>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
        onLoad={() => console.log("Razorpay script loaded successfully")}
        onError={() => console.log("Failed to load Razorpay script")}
      />
      {error && <div className={styles.error}>{error}</div>}
      <button
        onClick={handleRazorpayPayment}
        // disabled={job.price <= 0}
        className={styles.button}
      >
        Pay <span>&#x20B9; {job.price}</span> with Razorpay
      </button>
    </div>
  );
};

export default RazorpayForm;
