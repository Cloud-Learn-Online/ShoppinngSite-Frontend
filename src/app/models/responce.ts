export interface IResponce<T>{
    time: Date;
    message:string;
    status: string;
    data: T; 
}