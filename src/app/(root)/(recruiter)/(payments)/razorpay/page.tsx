"use client";

import { useState } from "react";

import RazorpayForm from "./RazorpayFor";
import styles from './RazorpayForm.module.css';

export default function Home() {
  const [jobs, setjobs] = useState({
    name: "Razorpay Integration",
    author: "Ashish sai naik",
    img: "https://akaunting.com/public/assets/media/54-mark-britto/razorpay/razorpay-logo.jpg",
    price: 250,
  });

  return (
    <div className={styles.app}>
        <RazorpayForm jobs={jobs} />
      </div>
  )
};