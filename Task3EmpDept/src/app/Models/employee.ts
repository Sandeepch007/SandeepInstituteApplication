import { Dept } from "./dept";

export class Employee {
    empno:number= 0;
    empName:string='';
    empSalary:string='';
    empDate: Date|null=null;
    empDob: Date|null=null;
    empAadharNo:string='';
    empLocation:string='';
    empPincode:string='';
    empEmailId:string='';
    empPassportNo:string='';
    empGender:string='';
    deptId:number=0;
    dept?:Dept;
   
}
