import { User } from "./User.interface";

interface PasteData {
    title: string,
    isPrivate: boolean,
    password: boolean,
    created: string,
    owner: User
}

export default PasteData;