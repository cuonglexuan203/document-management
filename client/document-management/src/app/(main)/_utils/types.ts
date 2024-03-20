export interface Document {
    id: string,
    title: string,
    thumbnail: string,
    version: string,
    addedTime: string,
    description: string,
    path: string,
    ministry: string,

}

export interface Ministry{
    id: string,
    name: string
    documents: Document[],
}