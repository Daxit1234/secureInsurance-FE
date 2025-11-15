// src/components/Contact.jsx
import { Facebook, Instagram, Twitter } from "feather-icons-react";
import React from "react";
import { Link } from "react-router-dom";

export default function Contact() {
  return (
    <div className="py-20 px-8 bg-dark text-center">
      <h2 className="text-3xl font-bold text-light mb-4">Contact Us</h2>
      <p className="text-light max-w-2xl mx-auto mb-10">
        Have questions or need assistance? We’re here to help. Feel free to
        reach out using the details below.
      </p>

      <div className="max-w-md mx-auto bg-gray-50 p-8 rounded-2xl shadow-md text-left">
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-[#0b3554] mb-2">Email</h3>
          <p className="text-gray-700">
            <a
              href="mailto:secureinvest542@gmail.com"
              className="text-blue-600 hover:underline"
            >
              secureinvest542@gmail.com
            </a>
          </p>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-[#0b3554] mb-2">Phone</h3>
          <p className="text-gray-700">
            <a
              href="tel:+919499849461"
              className="text-blue-600 hover:underline"
            >
              +91 94998 49461
            </a>
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-[#0b3554] mb-2">Address</h3>
          <p className="text-gray-700">
            AR Mall, Mota Varacha, Surat, Gujarat, India
          </p>
        </div>
      <div className="flex mt-3 text-center w-100 gap-4 text-red-500 text-xl">
        <Link href="">
          <Twitter className="w-6 h-6 text-dark hover:text-blue-700" />
        </Link>
        <Link href="/">
          <Facebook className="w-6 h-6 text-dark hover:text-blue-700" />
        </Link>
        <Link href="#">
          <Instagram className="w-6 h-6 text-dark hover:text-blue-700" />
        </Link>
      </div>
      </div>
    </div>
  );
}
