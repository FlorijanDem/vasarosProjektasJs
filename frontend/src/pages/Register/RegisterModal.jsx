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
import { useEffect, useState } from "react";
const API_URL = import.meta.env.VITE_API_URL;
const RegisterModal = ({ isOpen, onClose, onSwitchLogin }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    // getValues,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    if (!isOpen) {
      reset();
      setErrorMessage("");
    }
  }, [isOpen, reset]);

  const handleClose = () => {
    reset();
    setErrorMessage("");
    onClose();
  };
  if (!isOpen) return null;
  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `${API_URL}/signup`,
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
        handleClose();
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
      className="fixed inset-0 z-10 flex items-center justify-center max-lg:p-4 bg-[#D9D9D9]/[var(--bg-opacity)] [--bg-opacity:40%] backdrop-blur-xs"
      onClick={handleClose}
    >
      <div
        className="rounded-[1.25rem] bg-[var(--background-color)] relative w-1/3 h-4/5 flex flex-col items-center max-xl:w-1/2 max-md:w-full max-md:h-full max-lg:w-3/4 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={handleClose} className="text-[3rem] self-end px-8">
          x
        </button>
        <div className="flex w-full h-9/10 justify-center items-center">
          <form
            className="flex flex-col h-2/3 w-full justify-center items-center gap-12"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h2 className="text-3xl font-semibold text-center">Registration</h2>
            <pre className="text-[1.15rem] text-[var(--error-text-color)] text-center max-md:text-[0.95rem]">
              {errorMessage}
            </pre>
            <input
              className="border-2 rounded-2xl h-2/16 w-7/10 p-8 text-[2rem] max-xl:w-8/10 max-xl:h-2/16 "
              type="email"
              {...register("email", { required: true, maxLength: 50 })}
              placeholder="Email"
            />
            {errors.email && errors.email.type === "required" && (
              <p className="text-[var(--error-text-color)] font-semibold text-2xl">
                Email is required
              </p>
            )}
            {errors.email && errors.email.type === "maxLength" && (
              <p className="text-[var(--error-text-color)] font-semibold text-2xl">
                Email is allowed up to 50 characters
              </p>
            )}
            <input
              className="border-2 rounded-2xl h-2/16 w-7/10 p-8 text-[2rem] max-xl:w-8/10 max-xl:h-2/16 "
              type="password"
              {...register("password", { required: true })}
              placeholder="Password"
            />
            {errors.password && (
              <p className="text-[var(--error-text-color)] font-semibold text-2xl">
                Password is required
              </p>
            )}
            <input
              className="border-2 rounded-2xl h-2/16 w-7/10 p-8 text-[2rem] max-xl:w-8/10 max-xl:h-2/16 "
              type="password"
              {...register("passwordconfirm", { required: true })}
              placeholder="Confirm Password"
            />
            {errors.passwordconfirm && (
              <p className="text-[var(--error-text-color)] font-semibold text-2xl">
                Confirm Password is required
              </p>
            )}
            <div className="flex gap-2 text-[1.25rem]">
              <p>Have an Account?</p>
              <button
                type="button"
                onClick={() => {
                  handleClose();
                  onSwitchLogin();
                }}
                className="text-[var(--primary-text-color)] cursor-pointer underline-offset-3 underline"
              >
                Login here
              </button>
            </div>
            <input
              type="submit"
              value="Register"
              className=" bg-[var(--background-color)] rounded-2xl border-2 h-2/32 w-3/16 text-[1.75rem] justify-center max-xl:text-[1.25rem] "
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;
