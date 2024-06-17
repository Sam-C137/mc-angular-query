import { User } from "@types";

/**
 *  Login
 */
export type LoginUserDetails = {
    user: {
        email: string;
        password: string;
    };
};

export type LoginUserResponse = {
    user: User;
};

export type LoginState = {
    isSubmitting: boolean;
    errors: BackendErrors | null;
    user: User | null;
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
        email: string;
        password: string;
    };
};

export type SignUpUserResponse = {} & LoginUserResponse;

export type SignUpState = {} & LoginState;
