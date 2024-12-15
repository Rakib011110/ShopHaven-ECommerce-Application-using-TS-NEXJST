// // pages/api/posts/index.ts
// import { NextApiRequest, NextApiResponse } from "next";

// // src/data/index.ts
// export const posts = [];

// export default function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === "POST") {
//     const { title, content, category, isPremium } = req.body;
//     const newPost = {
//       id: posts.length + 1,
//       title,
//       content,
//       category,
//       isPremium,
//       createdAt: new Date(),
//     };

//     posts.push(newPost);

//     return res.status(201).json(newPost);
//   }

//   if (req.method === "GET") {
//     return res.status(200).json(posts);
//   }

//   return res.status(405).end(); // Method not allowed
// }
