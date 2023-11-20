export interface LoginInterface {
    email: String;
    password: String;
}

export interface LoginOutputInterface {
    jwtToken: string;
    username: String;
    result: String;
}