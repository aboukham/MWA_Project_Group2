export class GlobalConstants {
    public static errorMesage: string = "something went wrong, please try again";

    public static nameRegex: string = '[a-zA-Z0-9 ]*';
    public static emailRegex: string = '[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}';
    public static phoneNumberRegex: string = '^[e0-9]{10,10}$';
    public static error: string = "error";
    public static unauthorized : string = "You are not authorized person to access this page"; 
}