// Takes four bytes of a file as a string and returns a MIME type string corresponding to the file type.
const mimeTypesAndHexes = [
    {
        mime: 'image/jpeg',
        humanReadable: '.jpeg',
        hexes: ['FFD8FFE0', 'FFD8FFE1', 'FFD8FFE2', 'FFD8FFE8'],
    },
    {
        mime: 'image/png',
        humanReadable: '.png',
        hexes: ['89504E47'],
    },
    {
        mime: 'image/gif',
        humanReadable: '.gif',
        hexes: ['47494638'],
    },
    {
        mime: 'image/tiff',
        humanReadable: '.tiff',
        hexes: ['4D4D002A', '4D4D002B', '49492A00'],
    },
    {
        mime: 'application/msword', // .doc
        humanReadable: '.doc',
        hexes: ['0D444F43'],
    },
    {
        mime: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
        humanReadable: '.docx',
        hexes: ['504B0304'],
    },
    {
        mime: 'application/pdf',
        humanReadable: '.pdf',
        hexes: ['25504446'],
    },
];

export const mimeTypes = mimeTypesAndHexes.map(({ mime }) => mime);

export function getHumanReadableTypeFromMime(mimeType: any) {
    return mimeTypesAndHexes.find((mimeTypeAndHex) => mimeTypeAndHex.mime === mimeType)?.humanReadable;
}

export function findMimeType(hex: any) {
    return mimeTypesAndHexes.find((mimeType) => mimeType.hexes.includes(hex))?.mime;
}
