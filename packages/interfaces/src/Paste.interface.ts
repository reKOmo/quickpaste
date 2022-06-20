import PasteData from "./PasteData.interface";
import PasteFragment from "./PasteFragment.interface";

interface Paste extends PasteData {
    fragments: PasteFragment[]
}

export default Paste;