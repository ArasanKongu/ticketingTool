import { Flip, Theme, ToastPosition, toast } from "react-toastify";

class Toast {
  theme: Theme = "light";
  constructor(theme: Theme) {
    this.theme = theme;
  }

  success(msg: string, position?: ToastPosition) {
    console.log("Success:", msg);
    toast.success(msg, {
      position: position ?? "top-right",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: this.theme,
      transition: Flip,
    });
  }

  error(msg: string, position?: ToastPosition) {
    console.log("Error:", msg);
    toast.error(msg ?? "Something went wrong", {
      position: position ?? "top-right",
      autoClose: 500,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: this.theme,
    });
  }
}

export default Toast;
