import { v4 as uuidv4 } from 'uuid';
export function base64ToFile(base64Image) {
    const split = base64Image.split(',');
    const type = split[0].replace('data:', '').replace(';base64', '');
    const byteString = atob(split[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i += 1) {
        ia[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([ab], {
        type
    });
    const [, filetype] = blob.type.split('/');
    return new File([blob], `${uuidv4()}.${filetype}`, {
        type
    });
}
