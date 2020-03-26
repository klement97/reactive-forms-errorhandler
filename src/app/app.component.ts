import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ErrorHandler} from 'src/app/error.handler';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'reactive-forms-error-handling';
    signUpForm: FormGroup;
    errors: any = {};

    constructor(
        private fb: FormBuilder,
        private errorHandler: ErrorHandler
    ) {}

    ngOnInit(): void {
        this.initializeForm();
        this.errorHandler.handleErrors(this.signUpForm, this.errors);
    }

    initializeForm() {
        const passwordRegex = new RegExp('');
        const passwordValidators = [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(200),
            Validators.pattern(passwordRegex)];

        this.signUpForm = this.fb.group({
            first_name: ['', [
                Validators.required,
                Validators.minLength(2),
                Validators.maxLength(100)
            ]],
            last_name: ['', [
                Validators.required,
                Validators.maxLength(100)
            ]],
            email: ['', [
                Validators.required,
                Validators.maxLength(255),
                Validators.minLength(3),
                Validators.email
            ]
            ],
            password: ['', [...passwordValidators]],
            re_password: ['', [...passwordValidators]]
        });
    }

    submit() {
        if (this.signUpForm.invalid) {
            this.signUpForm.markAllAsTouched();
            return;
        }
    }
}
