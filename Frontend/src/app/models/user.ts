import { Role } from "./role";

export class User {
    id: String;
    firstname: String;
	lastname: String;
	username: String;
    email: String;
    password: String;
	role: Role;
    token?: string;
	
}