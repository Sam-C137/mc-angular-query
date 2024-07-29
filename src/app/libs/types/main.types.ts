import { Email, UUID } from "./helpers.types";

export type User = {
    email: Email;
    token: string;
    username: string;
    bio?: string;
    image?: string;
    id: UUID;
};

export type PaginationParams = {
    limit: number;
    offset: number;
};
