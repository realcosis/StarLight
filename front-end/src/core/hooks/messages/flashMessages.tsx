import Swal, { SweetAlertIcon } from 'sweetalert2';

export const flashMessages = (type: SweetAlertIcon, message: string) => {
    Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    }).fire({
        icon: type,
        title: message
    });
}