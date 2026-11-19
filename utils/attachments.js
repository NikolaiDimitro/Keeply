export const allowedAttachmentTypes = [
    'application/pdf',
    'image/jpeg',
    'image/png',
    'image/heic',
];

export const maxAttachmentSize = 10 * 1024 * 1024;

export function inferMimeType(asset) {
    if (asset.mimeType && asset.mimeType !== 'application/octet-stream') {
        return asset.mimeType;
    }

    const extension = asset.name?.toLowerCase().split('.').pop();

    if (extension === 'pdf') {
        return 'application/pdf';
    }
    if (extension === 'jpg' || extension === 'jpeg') {
        return 'image/jpeg';
    }
    if (extension === 'png') {
        return 'image/png';
    }
    if (extension === 'heic') {
        return 'image/heic';
    }

    return 'application/octet-stream';
}

export function getAttachmentValidationError(file) {
    if (!allowedAttachmentTypes.includes(file.mimeType)) {
        return 'Позволени са само PDF и JPEG, PNG или HEIC изображения.';
    }

    if (file.size != null && file.size >= maxAttachmentSize) {
        return 'Един от файловете е по-голям от 10 MB.';
    }

    return null;
}
