import {
    AbstractControl,
    FormGroup,
    ValidationErrors,
    ValidatorFn,
} from "@angular/forms";

const errorCodes = new Set([
    "required",
    "minlength",
    "email",
    "invalidPassword",
]);

const DEFAULT_ERROR_MESSAGES = {
    required: "This field is required",
    minlength: "This field must be at least 4 characters long",
    email: "Email must be a valid email address",
    invalidPassword:
        "Password must contain at least one uppercase letter and a number",
};

export class FormValidator {
    private field: string = "";

    private messages = new Map<string, string>();

    constructor(private form: FormGroup) {}

    private get _errors() {
        const control = this.form.get(this.field);

        if (control?.invalid && control.touched) {
            for (const errorCode of errorCodes) {
                if (control.hasError(errorCode)) {
                    return (
                        this.messages.get(errorCode) ||
                        DEFAULT_ERROR_MESSAGES[
                            errorCode as keyof typeof DEFAULT_ERROR_MESSAGES
                        ]
                    );
                }
            }
        }

        return "";
    }

    public errors(field: string) {
        this.field = field;
        return this._errors;
    }

    public setErrorMessage(errorCode: string, message: string) {
        this.messages.set(errorCode, message);
        return this;
    }
}

export class CustomValidators {
    static confirmPassword(passwordControlName: string): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const password = control.value;
            const confirmPassword =
                control.parent?.get(passwordControlName)?.value;

            return password === confirmPassword
                ? null
                : { passwordMismatch: true };
        };
    }
}
