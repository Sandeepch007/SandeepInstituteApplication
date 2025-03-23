export class AgTable {
    Id:number=0;
    name:number=0;
    instrument:string="";
    purchaseDate:Date|null=null;
    purchasePrice?:number;
    currentPrice?:number;
    quantity?:number;
    timelineprice:number[]=[];
}
