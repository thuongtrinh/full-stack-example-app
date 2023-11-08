import { Category } from "./category";

export interface Quiz {
    qid: number;
    title: string;
    description: string;
    maxMarks: string;
    numberOfQuestion: string;
    active: boolean;
    cid: number;
    category: Category
}
