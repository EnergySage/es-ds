// Takes four bytes of a file as a string and returns a MIME type string corresponding to the file type.
const mimeTypesAndHexes = [
    {
        mime: 'image/jpeg',
        hexes: ['FFD8FFE0', 'FFD8FFE1', 'FFD8FFE2', 'FFD8FFE8'],
    },
    {
        mime: 'image/png',
        hexes: ['89504E47'],
    },
    {
        mime: 'image/gif',
        hexes: ['47494638'],
    },
    {
        mime: 'image/tiff',
        hexes: ['4D4D002A', '4D4D002B', '49492A00'],
    },
    {
        mime: 'application/msword', // .doc
        hexes: ['0D444F43'],
    },
    {
        mime: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
        hexes: ['504B0304'],
    },
    {
        mime: 'application/pdf',
        hexes: ['25504446'],
    },
];

export const mimeTypes = mimeTypesAndHexes.map((mimeType) => mimeType.mime);

export default function findMimeType(hex) {
    return mimeTypesAndHexes.find((mimeType) => mimeType.hexes.includes(hex))?.mime;
}
