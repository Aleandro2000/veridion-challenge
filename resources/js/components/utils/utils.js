import Swal from "sweetalert2";
import { specialCharsRegex } from "./regex";

const Toast = Swal.mixin({
    toast: true,
    position: "bottom-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    showCancelButton: true,
    cancelButtonColor: "#000000",
    cancelButtonText: "OK",
    cancelButtonAriaLabel: "Cancel button",
    focusCancel: false,
    inputAutoFocus: false,
    didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
});

export const displayToast = (title, text, type = true) => Toast.fire({
    icon: type ? "success" : "error",
    title,
    text,
});

export const splitSpecialChars = (input) => input?.length ? input?.split(specialCharsRegex) : [];
