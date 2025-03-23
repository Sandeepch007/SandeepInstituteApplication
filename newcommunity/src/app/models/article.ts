import { Userregister } from "./userregister.class";

export class Article {
    articleId:number= 0;
    articleType: string='';
    articleDescripstion: string='';
    currentDate: number = Date.now();
    loginId:number=0;
    login?:Userregister;
}
