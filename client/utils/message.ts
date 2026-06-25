import axios from "axios";
import { toast, Bounce } from "react-toastify";


const baseOptions = {
  position: "bottom-center" as const,
  autoClose: 2500,
  hideProgressBar: false,
  closeOnClick: false,
  pauseOnHover: true,
  draggable: true,
  theme: "colored",
  transition: Bounce,
};

type ErrorResponse = {
  message?: string;
  error?: string;
  statusCode?: number;
};

export const errorMessage = (error: unknown | string) => {
  let message = "An unknown error occurred";

  if (typeof error === "string") {
    message = error;
  }
  else if (axios.isAxiosError<ErrorResponse>(error)) {
    message =
      error.response?.data?.message ||
      error.message ||
      "Request failed";
  }
  else if (error instanceof Error) {
    message = error.message;
  }

  toast.error(message, baseOptions);
};



export const successMessage = (message: string) => {
  toast.success(message, baseOptions);
};