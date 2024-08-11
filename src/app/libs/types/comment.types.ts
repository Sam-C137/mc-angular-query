import { Profile } from "./profile.types";

export type Comment = {
    id: number;
    createdAt: string;
    updatedAt: string;
    body: string;
    author: Profile;
};
