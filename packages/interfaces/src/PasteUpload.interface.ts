import PasteFragment from "./PasteFragment.interface";

interface PasteUpload {
    title: string,
    fragments: PasteFragment[],
    isPrivate: boolean,
    password?: string
}

export default PasteUpload;