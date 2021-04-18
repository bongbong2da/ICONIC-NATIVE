export type PostingTypes = {
    postingIdx: number
    postingCount: number
    postingChanIdx: number
    postingTitle: string
    postingWriter: string
    postingEmoji: string
    postingContent: string
    postingIsAttached: string
    postingAttach: string
    postingReg: string
}

export type PageDataTypes = {
    content : PostingTypes[]
    empty : boolean
    first : boolean
    last : boolean
    number : number
    numberOfElements : number
    pageable : {
        offset : number
        pageNumber : number
        pageSize : number
        paged : boolean
        sort : {
            empty : boolean
            sorted : boolean
            unsorted : boolean
        }
        unpaged : boolean
    }
    size : number
    sort : {
        empty : boolean
        sorted : boolean
        unsorted : boolean
    }
    totalElements : number
    totalPages : number
}
