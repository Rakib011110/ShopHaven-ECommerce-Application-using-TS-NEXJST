"use client";

import { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { useUser } from "@/src/context/user.provider";
import { getUser } from "@/src/services/getUser";

// Register Chart.js components
Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
);

// Define the type for posts analytics
interface Post {
  _id: string;
  title: string;
  reactions: number;
  comments: number;
  views: number;
}

const AnalyticsPage = () => {
  const { user } = useUser();
  const [posts, setPosts] = useState<Post[]>([]);
  const [totalReactions, setTotalReactions] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [totalViews, setTotalViews] = useState(0);

  const dummyPosts: Post[] = [
    { _id: "1", title: "Post 1", reactions: 10, comments: 5, views: 100 },
    { _id: "2", title: "Post 2", reactions: 20, comments: 10, views: 150 },
    { _id: "3", title: "Post 3", reactions: 30, comments: 15, views: 200 },
  ];

  // Fetch user posts data and calculate the total reactions, comments, and views
  useEffect(() => {
    const fetchUserPosts = async () => {
      if (user?._id) {
        const data = await getUser(user._id);
        const fetchedPosts = data?.data?.length > 0 ? data.data : dummyPosts; // Use dummy if no posts

        // Calculate total reactions, comments, and views
        const reactions = fetchedPosts.reduce(
          (sum: number, post: Post) => sum + post.reactions,
          0,
        );
        const comments = fetchedPosts.reduce(
          (sum: number, post: Post) => sum + post.comments,
          0,
        );
        const views = fetchedPosts.reduce(
          (sum: number, post: Post) => sum + post.views,
          0,
        );

        // Set the posts and totals in state
        setPosts(fetchedPosts);
        setTotalReactions(reactions);
        setTotalComments(comments);
        setTotalViews(views);
      } else {
        // If no user is logged in, set dummy data
        setPosts(dummyPosts);
        setTotalReactions(60);
        setTotalComments(30);
        setTotalViews(450);
      }
    };

    fetchUserPosts();
  }, [user]);

  // Prepare data for the bar chart
  const barChartData = {
    labels: ["Reactions", "Comments", "Views"],
    datasets: [
      {
        label: "Total Count",
        data: [totalReactions, totalComments, totalViews], // Values to display
        backgroundColor: [
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  // Prepare data for the line chart
  const lineChartData = {
    labels: posts.map((post) => post.title),
    datasets: [
      {
        label: "Reactions",
        data: posts.map((post) => post.reactions),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
      },
      {
        label: "Comments",
        data: posts.map((post) => post.comments),
        borderColor: "rgba(153, 102, 255, 1)",
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        fill: true,
      },
      {
        label: "Views",
        data: posts.map((post) => post.views),
        borderColor: "rgba(255, 159, 64, 1)",
        backgroundColor: "rgba(255, 159, 64, 0.2)",
        fill: true,
      },
    ],
  };

  // Chart.js options for customizing both charts (casting position properly)
  const chartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top" as const, // Cast "top" to the expected type
      },
      title: {
        display: true,
        text: "Content Analytics Overview",
      },
    },
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Content Analytics</h1>

      {/* Bar Chart */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <Bar data={barChartData} options={chartOptions} />
      </div>

      {/* Line Chart */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <Line data={lineChartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default AnalyticsPage;
