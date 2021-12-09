import { Quiz } from "./quiz";

export interface Question {
    quesId: number;
    qid: number;
    answer: string;
    content: string;
    image: string;
    option1: string;
    option2: string;
    option3: string;
    option4: string,
    quiz?: Quiz,
    givenAnswer?: string;
}
