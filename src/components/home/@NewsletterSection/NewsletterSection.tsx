"use client";
import { useState } from "react";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus("success");
        setMessage("Thank you for subscribing!");
        setEmail("rakib088880@gmail.com");
      } else {
        const { error } = await res.json();
        setStatus("error");
        setMessage(error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setStatus("error");
      setMessage("Network error. Please try again later.");
    }
  };

  return (
    <div className="flex bg-slate-300  bg-opacity-40 flex-col mb-20 items-center bg-gradient-to-r border-4 border-blue-800  py-12 px-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 uppercase">
        Subscribe to Our Newsletter
      </h2>
      <p className="text-center mb-6">
        Stay updated with the latest news, articles, and resources, sent to your
        inbox weekly.
      </p>
      <form className="w-full max-w-md" onSubmit={handleSubmit}>
        <div className="flex items-center">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="flex-grow px-4 border-blue-600 border py-2 rounded-l-md focus:outline-none text-gray-800"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="px-6 py-2 bg-[#1bf0ff] hover:bg-purple-800 rounded-r-md font-semibold transition disabled:opacity-50">
            {status === "loading" ? "Submitting..." : "Subscribe"}
          </button>
        </div>
        {status !== "idle" && (
          <p
            className={`mt-4 text-sm ${
              status === "success" ? "text-green-300" : "text-red-300"
            }`}>
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default NewsletterSection;
