import Swal from "sweetalert2";
import { icon } from "leaflet";
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

export const iconMark = icon({
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
  iconUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png"
});
