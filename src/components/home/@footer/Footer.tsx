/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { Link } from "@nextui-org/link";
import { Input, Button } from "@nextui-org/react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-900 via-blue-700 to-blue-500 text-white">
      <div className="max-w-screen-xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {/* Company Info */}
        <div>
          <h3 className="text-2xl font-bold mb-4">SHOPHAVEN </h3>
          <p className="text-sm mb-4">
            Your ultimate destination for all camping essentials. Explore our
            wide range of premium camping gear and accessories.
          </p>
          <img
            alt="SHOPHAVEN Shop Logo"
            className="w-32 mb-4"
            src="https://thumbs.dreamstime.com/b/lets-shopping-logo-design-template-shop-icon-135610500.jpg" // Replace with your logo path
          />
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link className="text-white" href="/">
                Home
              </Link>
            </li>
            <li>
              <Link className="text-white" href="/products">
                Products
              </Link>
            </li>
            <li>
              <Link className="text-white" href="/about">
                About Us
              </Link>
            </li>
            <li>
              <Link className="text-white" href="/contact">
                Contact Us
              </Link>
            </li>
            <li>
              <Link className="text-white" href="/faq">
                FAQs
              </Link>
            </li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h4 className="text-xl font-semibold mb-4">Customer Service</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link className="text-white" href="/support">
                Support
              </Link>
            </li>
            <li>
              <Link className="text-white" href="/shipping">
                Shipping Policy
              </Link>
            </li>
            <li>
              <Link className="text-white" href="/returns">
                Returns & Refunds
              </Link>
            </li>
            <li>
              <Link className="text-white" href="/privacy">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link className="text-white" href="/terms">
                Terms & Conditions
              </Link>
            </li>
          </ul>
        </div>

        {/* Newsletter & Social Media */}
        <div>
          <h4 className="text-xl font-semibold mb-4">Stay Connected</h4>
          <p className="text-sm mb-4">
            Subscribe to our newsletter to receive updates and exclusive offers.
          </p>
          <form className="flex space-x-2 mb-6">
            <Input
              fullWidth
              className="bg-white text-black rounded"
              placeholder="Enter your email"
              size="sm"
              type="email"
            />
            <Button
              className="rounded bg-yellow-500 text-black hover:bg-yellow-600"
              color="primary"
              size="sm">
              Subscribe
            </Button>
          </form>
          <div className="flex space-x-4 text-2xl">
            <Link aria-label="Facebook" href="https://facebook.com">
              <FaFacebook />
            </Link>
            <Link aria-label="Twitter" href="https://twitter.com">
              <FaTwitter />
            </Link>
            <Link aria-label="Instagram" href="https://instagram.com">
              <FaInstagram />
            </Link>
            <Link aria-label="LinkedIn" href="https://linkedin.com">
              <FaLinkedin />
            </Link>
          </div>
        </div>
      </div>
      <div className="bg-blue-900 text-center py-4">
        <p className="text-sm">
          © {new Date().getFullYear()} SHOPHAVEN Shop. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
