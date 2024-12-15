import React from "react";

const CreateAdmin = () => {
  return (
    <div>
      <h1> Admin Create</h1>
    </div>
  );
};

export default CreateAdmin;

// import React from "react";
// import { useForm } from "react-hook-form";

// import { createAdmin } from "@/src/services/createAcounts";

// const AdminForm = () => {
//   const { register, handleSubmit, reset } = useForm();

//   const onSubmit = async (data: any) => {
//     try {
//       await createAdmin({
//         password: data.password,
//         admin: {
//           email: data.email,
//           name: data.name,
//           profilePhoto: data.profilePhoto,
//         },
//       });

//       reset();
//     } catch (err) {}
//   };

//   return (
//     <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
//       <input type="text" {...register("name")} required placeholder="Name" />
//       <input type="email" {...register("email")} required placeholder="Email" />
//       <input
//         type="password"
//         {...register("password")}
//         required
//         placeholder="Password"
//       />
//       <input
//         type="text"
//         {...register("profilePhoto")}
//         placeholder="Profile Photo URL"
//       />
//       <button type="submit">Create Admin</button>
//     </form>
//   );
// };

// export default AdminForm;
