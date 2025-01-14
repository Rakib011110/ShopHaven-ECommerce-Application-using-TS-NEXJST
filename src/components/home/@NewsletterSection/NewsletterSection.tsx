"use client";
import { useState } from "react";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    if (!email) {
      alert("Please enter a valid email address.");
      return;
    }
    // Handle subscription logic (e.g., send email to the backend)
    alert(`Subscribed with email: ${email}`);
    setEmail("");
  };

  return (
    <section className="bg-gray-100 p-8 mb-10 rounded-lg shadow-md">
      {/* Newsletter Section */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-white p-6 rounded-lg">
        <div className="text-center md:text-left flex flex-col gap-2">
          <h3 className="text-blue-600 font-semibold text-lg">Newsletter</h3>
          <h2 className="text-2xl font-bold">Get weekly update</h2>
        </div>
        <div className="flex items-center w-full md:w-auto gap-4">
          <input
            type="email"
            placeholder="example@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300"
          />
          <button
            onClick={handleSubscribe}
            className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition">
            Subscribe
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Feature 1 */}
        <div className="flex items-center gap-4">
          <div className="text-blue-600 text-3xl">📦</div>
          <div>
            <h4 className="font-bold">Fast & Secure Delivery</h4>
            <p className="text-gray-600">Tell about your service.</p>
          </div>
        </div>

        {/* Feature 2 */}
        <div className="flex items-center gap-4">
          <div className="text-blue-600 text-3xl">💸</div>
          <div>
            <h4 className="font-bold">Money Back Guarantee</h4>
            <p className="text-gray-600">Within 10 days.</p>
          </div>
        </div>

        {/* Feature 3 */}
        <div className="flex items-center gap-4">
          <div className="text-blue-600 text-3xl">🔄</div>
          <div>
            <h4 className="font-bold">24 Hour Return Policy</h4>
            <p className="text-gray-600">No question ask.</p>
          </div>
        </div>

        {/* Feature 4 */}
        <div className="flex items-center gap-4">
          <div className="text-blue-600 text-3xl">🎧</div>
          <div>
            <h4 className="font-bold">Pro Quality Support</h4>
            <p className="text-gray-600">24/7 live support.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
