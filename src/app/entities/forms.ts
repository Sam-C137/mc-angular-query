import { inject } from "@angular/core";
import { FormGroup, FormBuilder, NonNullableFormBuilder } from "@angular/forms";
import { FormValidator } from "@utils";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

export abstract class MCForm {
    protected fb = inject(FormBuilder);
    protected nfb = inject(NonNullableFormBuilder);
    protected form: FormGroup;
    protected formValidator: FormValidator;

    constructor() {
        this.form = this.setupForm();
        this.formValidator = new FormValidator(this.form);
        this.form.valueChanges.pipe(takeUntilDestroyed());
    }

    abstract setupForm(): FormGroup;
}
