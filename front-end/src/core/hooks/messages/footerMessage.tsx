import Swal from 'sweetalert2';
import { readSettings } from '../settings/readSettings';

export const footerMessage = () => {
    Swal.mixin({
        toast: true,
        showConfirmButton: true,
        width: '420px'
    }).fire({
        icon: 'info',
        title: '<span class="text-[26px]">' + readSettings('hotel_name') + ' Hotel</span>',
        html: '<p>Check <a href="https://github.com/realcosis/StarLight" target="_blank"><b>StarLight</b></a> repository for more!</p><p>Developed & Designed by <b>RealCosis</b></p>',
    });
}