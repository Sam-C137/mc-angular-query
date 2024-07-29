import { Email, User } from "@types";

/**
 *  Login
 */
export type LoginUserDetails = {
    user: {
        email: Email;
        password: string;
    };
};

export type LoginUserResponse = {
    user: User;
};

export type BackendErrors = {
    [key: string]: string[];
};

/**
 *  Sign up
 */
export type SignUpUserDetails = {
    user: {
        username: string;
        email: Email;
        password: string;
    };
};
