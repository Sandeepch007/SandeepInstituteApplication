import { Category } from "./category";

export class Products {
    
    productName:string= "";
    productPrice:number= 0;
    quantity:number=0 ;
    totalPrice:number= 0;
    productCode: string="";
    productId:number=0;
    categoryId:number= 0;
    category?:Category
    
}
