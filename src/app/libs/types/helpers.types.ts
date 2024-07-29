import { ValidatorFn } from "@angular/forms";

export type Nullable<T> = T | null;

export type Falsy<T> = T | false | 0 | "" | null | undefined;

export type Optional<T> = T | undefined | null;

export type FormField<T> = [
    (
        | T
        | {
              value: T;
              disabled: boolean;
          }
    ),
    [...ValidatorFn[]],
];

declare const __unique: unique symbol;

export type Unique<T, Label> = T & { __unique: Label };

export type Email = Unique<string, "Email">;

export type UUID = Unique<string, "UUID">;
