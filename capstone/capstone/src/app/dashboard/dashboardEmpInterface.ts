export interface dashboardEmpInterface {
    department:String
    email:String
    id:String
    name:String
    phone: Number
    role:String
    status:String
}

export interface groupInterface{
    group_name: String;
    emps: Array<String>
}

export interface groupOutInterface{
    group_id: String;
    group_name: String;
    emps: Array<String>
}