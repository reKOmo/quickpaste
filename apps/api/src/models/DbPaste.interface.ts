export interface DbPaste {
    id: number,
    uuid: string,
    owner_id: number,
    owner_username: string,
    password: string | null,
    created: string,
    last_visited: string,
    is_private: boolean,
    title: string
}