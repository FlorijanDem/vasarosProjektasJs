// "axios" using for make API queries
// if you do not want to use it
// you can use "fetch API"
//
// import axios from "axios";

// "react-hook-form" using for make easier
// make the same functionallity with JavaScript and HTML
// also posible

import { useForm } from "react-hook-form";
import { Link } from "react-router";
import axios from 'axios';
import { useState } from "react";

const LoginModal = ({ isOpen, onClose }) => {
  const [errorMessage, setErrorMessage] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  if (!isOpen) return null;
  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:3000/api/v1/login', {
        email: data.email,
        password: data.password,
      });
      console.log(response.data)
    } catch (error) {
      console.error('Login failed:', error.response?.data || error.message);
      setErrorMessage(error.response?.data?.message || 'Login failed');
    }
  };
  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center max-lg:p-4 bg- bg-[#D9D9D9]/[var(--bg-opacity)] [--bg-opacity:40%] backdrop-blur-xs">
      <div className="rounded-[1.25rem] bg-white relative w-1/3 h-2/3 flex flex-col items-center max-lg:w-full shadow-2xl  ">
        <button onClick={onClose} className="text-[3rem] self-end px-8">
          x
        </button>
        <h2 className="text-3xl font-semibold text-center">Log in</h2>
        <div className="flex w-full h-4/5 justify-center items-center">
          <form
            className="flex flex-col h-1/2 w-full justify-center items-center gap-12"
            onSubmit={handleSubmit(onSubmit)}
          >
             <p className="text-3xl text-red-400">{errorMessage}</p>
            <input
              className="border-2 rounded-2xl h-4/16 w-6/10 p-8 text-[2rem] max-lg:w-8/10 "
              type="email"
              {...register("email", { required: true })}
              placeholder="Email"
            />
            {errors.email && (
              <p className="text-red-700 font-semibold text-2xl">
                Email is required
              </p>
            )}
            <input
              className="border-2 rounded-2xl p-8 h-4/16 w-6/10 text-[2rem] max-lg:w-8/10"
              type="password"
              {...register("password", { required: true })}
              placeholder="Password"
            />
            {errors.password && (
              <p className="text-red-700 font-semibold text-2xl">
                Password is required
              </p>
            )}

            <Link>
              <p className="text-[1.25rem]">Forgot password</p>
            </Link>
            <div className="flex gap-2 text-[1.25rem]">
              <p>Don't have an account?</p>
              <Link>
                <p className="text-gray-900">Register here</p>
              </Link>
            </div>

            <input
              type="submit"
              value="Log in"
              className=" bg-white rounded-2xl border-2 h-2/16 w-2/16 text-[1.75rem]"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
