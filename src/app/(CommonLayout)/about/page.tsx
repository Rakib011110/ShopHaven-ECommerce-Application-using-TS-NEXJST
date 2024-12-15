import React from "react";

// Fake JSON Data
const teamMembers = [
  {
    name: "Alice Johnson",
    email: "rakib@techhub.com",
    photo:
      "https://media.istockphoto.com/id/645075706/photo/mature-businessman-smiling-wearing-classic-suit.jpg?s=612x612&w=0&k=20&c=nwkIaq8_3EJg9fFWMVYMv4y7kLwUuHBL8Np6Nigwhg4=",
    role: "Frontend Developer",
  },
  {
    name: "Bob Smith",
    email: "ariyan@techhub.com",
    photo:
      "https://media.istockphoto.com/id/1364917563/photo/businessman-smiling-with-arms-crossed-on-white-background.jpg?s=612x612&w=0&k=20&c=NtM9Wbs1DBiGaiowsxJY6wNCnLf0POa65rYEwnZymrM=",
    role: "Backend Developer",
  },
  {
    name: "Charlie Brown",
    email: "charlie.brown@techhub.com",
    photo:
      "https://media.istockphoto.com/id/661799106/photo/portrait-of-a-young-french-man.jpg?s=612x612&w=0&k=20&c=M-8ccbYQZCvQWmKLLyDF5mYjF3KaBTQwX6HDdzvw_pk=",
    role: "UI/UX Designer",
  },
  {
    name: "Dana White",
    email: "dana.white@techhub.com",
    photo:
      "https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg",
    role: "Project Manager",
  },
];

const AboutUsPage = () => {
  return (
    <div className="about-us-page p-12 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-5xl font-extrabold mb-8 text-gray-800">
          About TechHub
        </h1>
        <p className="text-lg text-gray-600 mb-12 leading-relaxed">
          Welcome to TechHub, your go-to platform for tech tips, guides, and
          discussions. Whether you’re looking to improve your skills or stay
          updated with the latest trends, our platform connects tech enthusiasts
        </p>

        <section className="mission-vision mb-20">
          <h2 className="text-4xl font-semibold mb-6 text-gray-800">
            Our Mission
          </h2>
          <p className="text-gray-700 mb-8 text-lg leading-relaxed">
            At TechHub, our mission is to empower the tech community by
            providing a space to share insights, knowledge, and innovation. We
            believe that sharing ideas leads to better solutions and growth for
            all.
          </p>
          <h2 className="text-4xl font-semibold mb-6 text-gray-800">
            Our Vision
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            We envision a future where technology is accessible to everyone, and
            where collaboration drives the industry forward. TechHub strives to
            be at the center of this collaboration, helping tech professionals,
            hobbyists, and enthusiasts connect and grow together.
          </p>
        </section>

        <section className="team-members mb-12">
          <h2 className="text-4xl font-semibold mb-10 text-gray-800">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 ">
            {teamMembers.map((member) => (
              <div
                key={member.email}
                className="team-member bg-white rounded-lg shadow-lg p-8 transition-transform transform hover:scale-105 hover:shadow-2xl"
              >
                <img
                  alt={member.name}
                  className="w-24 h-24 mx-auto rounded-full mb-6"
                  src={member.photo}
                />
                <h3 className="text-2xl font-bold mb-2 text-gray-800">
                  {member.name}
                </h3>
                <p className="text-gray-500 text-lg">{member.role}</p>
                <a
                  className="text-blue-600 underline mt-4 inline-block text-lg"
                  href={`mailto:${member.email}`}
                >
                  {member.email}
                </a>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutUsPage;
