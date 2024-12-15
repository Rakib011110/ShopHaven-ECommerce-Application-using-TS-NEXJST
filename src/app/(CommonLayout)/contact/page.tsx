"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

// Contact data
const contactDetails = {
  phoneNumber: "+1 (123) 456-7890",
  email: "support@techhub.com",
  address: "123 TechHub Avenue, Silicon Valley, CA",
};

interface FormInputs {
  name: string;
  email: string;
  message: string;
}

const ContactDetails = () => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h2 className="text-2xl font-semibold mb-4 text-gray-800">Get in Touch</h2>
    <p className="text-gray-700 mb-4">
      <strong>Phone:</strong> {contactDetails.phoneNumber}
    </p>
    <p className="text-gray-700 mb-4">
      <strong>Email:</strong>{" "}
      <a
        className="text-blue-600 underline"
        href={`mailto:${contactDetails.email}`}
      >
        {contactDetails.email}
      </a>
    </p>
    <p className="text-gray-700">
      <strong>Address:</strong> {contactDetails.address}
    </p>
  </div>
);

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();
  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    alert("Your message has been submitted!");
    console.log("Form Data:", data);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Send us a Message
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Name Input */}
        <div className="mb-4">
          <label
            className="block text-gray-700 font-semibold mb-2"
            htmlFor="name"
          >
            Your Name
          </label>
          <input
            id="name"
            {...register("name", { required: "Name is required" })}
            className={`w-full p-3 rounded-lg border ${errors.name ? "border-red-500" : "border-gray-300"} focus:outline-none focus:border-blue-500`}
            type="text"
            placeholder="Enter your name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Email Input */}
        <div className="mb-4">
          <label
            className="block text-gray-700 font-semibold mb-2"
            htmlFor="email"
          >
            Your Email
          </label>
          <input
            id="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email address",
              },
            })}
            className={`w-full p-3 rounded-lg border ${errors.email ? "border-red-500" : "border-gray-300"} focus:outline-none focus:border-blue-500`}
            type="email"
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Message Input */}
        <div className="mb-6">
          <label
            className="block text-gray-700 font-semibold mb-2"
            htmlFor="message"
          >
            Message
          </label>
          <textarea
            id="message"
            {...register("message", { required: "Message is required" })}
            className={`w-full p-3 rounded-lg border ${errors.message ? "border-red-500" : "border-gray-300"} focus:outline-none focus:border-blue-500`}
            rows={5}
            placeholder="Write your message here..."
          />
          {errors.message && (
            <p className="text-red-500 text-sm mt-1">
              {errors.message.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300"
          type="submit"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

const ContactUsPage = () => {
  return (
    <div className="contact-us-page py-16 px-4 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">
          Contact Us
        </h1>
        <p className="text-lg text-gray-700 text-center mb-12">
          We would love to hear from you! Feel free to reach out for support,
          inquiries, or feedback.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <ContactDetails />
          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;
