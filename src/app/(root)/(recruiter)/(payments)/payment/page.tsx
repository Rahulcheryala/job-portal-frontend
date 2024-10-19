import React from 'react'
import Link from 'next/link'

const payment = () => {
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
          <Link href="/razorpay">
            <button className="bg-bluel text-white font-bold py-2 px-4 rounded hover:bg-blue-700">
              Start Hiring
            </button>
          </Link>
        </div>
      );
  
}

export default payment