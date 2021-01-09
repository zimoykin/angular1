
export class Page <t> {

    items: [t]
    metadata: Metadata

}

export class Metadata {
    page: number
    per: number
    total: number
}