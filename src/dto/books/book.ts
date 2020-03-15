import { Timestamp } from "rxjs";

export class Book {
    name: string;
    desc: string;
    price: number;
    num: number;
    discount: number;
    created: Timestamp<any>;
    updated: Timestamp<any>;
    deleted: Timestamp<any>;
}
