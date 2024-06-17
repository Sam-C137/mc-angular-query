import {
    AbstractControl,
    FormGroup,
    ValidationErrors,
    ValidatorFn,
} from "@angular/forms";

export class FormValidator {
    private field: string = "";

    private messages = new Map<string, string>();

    constructor(private form: FormGroup) {}

    private get _errors() {
        const control = this.form.get(this.field);

        if (control?.invalid && control.touched) {
            if (control.hasError("required")) {
                return (
                    this.messages.get("required") || "This field is required"
                );
            } else if (control.hasError("minlength")) {
                return (
                    this.messages.get("minlength") ||
                    `${this.field} must be at least
                     4
                     characters long`
                );
            } else if (control.hasError("email")) {
                return (
                    this.messages.get("email") ||
                    "Email must be a valid email address"
                );
            } else if (control.hasError("invalidName")) {
                return (
                    this.messages.get("invalidName") ||
                    "Name must contain a first part, followed by a space, then a last part"
                );
            } else if (control.hasError("invalidPassword")) {
                return (
                    this.messages.get("invalidPassword") ||
                    "Password must contain at least one uppercase letter and a number"
                );
            } else if (control.hasError("passwordMismatch")) {
                return (
                    this.messages.get("passwordMismatch") ||
                    "Passwords must match"
                );
            } else if (control.hasError("invalidFileType")) {
                return (
                    this.messages.get("invalidFileType") ||
                    "Invalid file type. Please upload a PNG file"
                );
            } else if (control.hasError("invalidFileSize")) {
                return (
                    this.messages.get("invalidFileSize") ||
                    "Uploaded file must be less than 5mb"
                );
            } else if (control.hasError("invalidPhoneNumber")) {
                return (
                    this.messages.get("invalidPhoneNumber") ||
                    "Phone number must be 10 digits"
                );
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
    static confirmPasswordValidator(passwordControlName: string): ValidatorFn {
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
