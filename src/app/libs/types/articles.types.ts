import { Profile } from "@types";

export type Article = {
    slug: string;
    title: string;
    description: string;
    body: string;
    tagList: string[];
    createdAt: string;
    updatedAt: string;
    favorited: boolean;
    favoritesCount: number;
    author: Profile;
};

export type AllArticles = {
    articles: Article[];
    articlesCount: number;
};
