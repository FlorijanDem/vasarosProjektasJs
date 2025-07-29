// "axios" using for make API queries
// if you do not want to use it
// you can use "fetch API"
//
// import axios from "axios";

// "react-hook-form" using for make easier
// make the same functionallity with JavaScript and HTML
// also posible

import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";

const RegisterModal = ({ isOpen, onClose, onSwitchLogin }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const {
    register,
    handleSubmit,
    // getValues,
    formState: { errors },
  } = useForm();
  if (!isOpen) return null;
  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/signup",
        {
          email: data.email,
          password: data.password,
          passwordconfirm: data.passwordconfirm,
        },
        {
          withCredentials: true,
        }
      );
      console.log(response.data);
      if (response.data.status === "success") {
        onClose();
      }
    } catch (error) {
      const errors = error.response?.data?.errors;
      setErrorMessage(
        error.response?.data?.message ||
          (Array.isArray(errors)
            ? errors.map((e) => e.msg).join("\n")
            : "Registration failed")
      );
      console.error(
        "Registration failed:",
        error.response?.data || error.message
      );
    }
  };
  return (
    <div
      className="fixed inset-0 z-10 flex items-center justify-center max-lg:p-4 bg- bg-[#D9D9D9]/[var(--bg-opacity)] [--bg-opacity:40%] backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="rounded-[1.25rem] bg-white relative w-1/3 h-4/5 flex flex-col items-center max-lg:w-full shadow-2xl max-xl:h-full "
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="text-[3rem] self-end px-8">
          x
        </button>
        <h2 className="text-3xl font-semibold text-center">Registration</h2>
        <div className="flex w-full h-4/5 justify-center items-center">
          <form
            className="flex flex-col h-2/3 w-full justify-center items-center gap-12"
            onSubmit={handleSubmit(onSubmit)}
          >
            <pre className="text-xl text-red-400 text-center max-xl:text-[0.95rem]">
              {errorMessage}
            </pre>
            <input
              className="border-2 rounded-2xl h-3/16 w-7/10 p-8 text-[2rem] max-xl:w-8/10 max-xl:h-2/16 "
              type="email"
              {...register("email", { required: true, maxLength: 50 })}
              placeholder="Email"
            />
            {errors.email && errors.email.type === "required" && (
              <p className="text-red-700 font-semibold text-2xl">
                Email is required
              </p>
            )}
            {errors.email && errors.email.type === "maxLength" && (
              <p className="text-red-700 font-semibold text-2xl">
                Email is allowed up to 50 characters
              </p>
            )}
            <input
              className="border-2 rounded-2xl h-3/16 w-7/10 p-8 text-[2rem] max-xl:w-8/10 max-xl:h-2/16 "
              type="password"
              {...register("password", { required: true })}
              placeholder="Password"
            />
            {errors.password && (
              <p className="text-red-700 font-semibold text-2xl">
                Password is required
              </p>
            )}
            <input
              className="border-2 rounded-2xl h-3/16 w-7/10 p-8 text-[2rem] max-xl:w-8/10 max-xl:h-2/16 "
              type="password"
              {...register("passwordconfirm", { required: true })}
              placeholder="Confirm Password"
            />
            {errors.passwordconfirm && (
              <p className="text-red-700 font-semibold text-2xl">
                Confirm Password is required
              </p>
            )}
            <div className="flex gap-2 text-[1.25rem]">
              <p>Have an Account?</p>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onSwitchLogin();
                }}
                className="text-gray-900"
              >
                Login here
              </button>
            </div>
            <input
              type="submit"
              value="Register"
              className=" bg-white rounded-2xl border-2 h-2/16 w-3/16 text-[1.75rem] max-xl:text-[1.25rem] max-xl:w-4/16"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;
