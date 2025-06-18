import { Component, inject, OnDestroy, OnInit, computed, effect } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subject, takeUntil, debounceTime, distinctUntilChanged } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../modules/material.module';
import {
  AddEditUserDialogData,
  AddEditUserFormData,
  UserRole,
  RoleOption,
  FormFieldConfig,
  User
} from '../../../models/add-edit-user.model';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-add-edit-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MaterialModule],
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.scss']
})
export class AddEditUserComponent implements OnInit, OnDestroy {
  private fb = inject(FormBuilder);
  private userService = inject(UserService);
  private dialogRef = inject(MatDialogRef<AddEditUserComponent>);
  private data = inject(MAT_DIALOG_DATA) as AddEditUserDialogData;

  userForm!: FormGroup;
  isLoading = false;
  isAddMode = this.data.mode === 'add';
  dialogTitle = this.isAddMode ? 'Add New User' : 'Edit User';

  availableRoles: RoleOption[] = [];
  private destroy$ = new Subject<void>();

  fieldConfigs: Record<string, FormFieldConfig> = {
    email: { label: 'Email Address', placeholder: 'Enter email address', maxLength: 254, required: true, type: 'email' },
    firstName: { label: 'First Name', placeholder: 'Enter first name', maxLength: 100, required: true, type: 'text' },
    lastName: { label: 'Last Name', placeholder: 'Enter last name', maxLength: 100, required: true, type: 'text' },
    role: { label: 'User Role', placeholder: 'Select a role', required: true, type: 'select' }
  };

  private roleHierarchy: Record<UserRole, UserRole[]> = {
    [UserRole.ADMIN]: [UserRole.ADMIN, UserRole.MANAGER, UserRole.USER],
    [UserRole.MANAGER]: [UserRole.MANAGER, UserRole.USER],
    [UserRole.USER]: [UserRole.USER]
  };

  ngOnInit(): void {
    this.initForm();
    this.setupAvailableRoles();
    this.setupLiveValidation();
    if (!this.isAddMode && this.data.user) this.populateForm(this.data.user);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  initForm(): void {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email, Validators.maxLength(254)]],
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100), this.nameValidator]],
      lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100), this.nameValidator]],
      role: ['', [Validators.required]]
    });
  }

  setupAvailableRoles(): void {
    const currentRole = this.data.currentUserRole;
    const allowed = this.roleHierarchy[currentRole] || [UserRole.USER];
    const allRoles: RoleOption[] = [
      { value: UserRole.ADMIN, label: 'Administrator', description: 'Full system access', disabled: !allowed.includes(UserRole.ADMIN) },
      { value: UserRole.MANAGER, label: 'Manager', description: 'Manage users', disabled: !allowed.includes(UserRole.MANAGER) },
      { value: UserRole.USER, label: 'User', description: 'Basic access', disabled: !allowed.includes(UserRole.USER) }
    ];
    this.availableRoles = allRoles.filter(role => allowed.includes(role.value));
  }

  setupLiveValidation(): void {
    this.userForm.valueChanges.pipe(takeUntil(this.destroy$), debounceTime(300), distinctUntilChanged()).subscribe(() => {
      Object.keys(this.userForm.controls).forEach(field => this.userForm.get(field)?.markAsTouched());
    });

    this.userForm.get('email')?.valueChanges.pipe(takeUntil(this.destroy$), debounceTime(500), distinctUntilChanged()).subscribe(email => {
      if (email && this.userForm.get('email')?.valid) this.checkEmailUniqueness(email);
    });
  }

  checkEmailUniqueness(email: string): void {
    if (!this.isAddMode && this.data.user?.email === email) return;
    this.userService.getUsers(false).subscribe({
      next: res => {
        const exists = res.users.some(user => user.email.toLowerCase() === email.toLowerCase() && (!this.data.user || user.id !== this.data.user.id));
        const control = this.userForm.get('email');
        if (control) {
          if (exists) control.setErrors({ ...control.errors, emailExists: true });
          else if (control.hasError('emailExists')) {
            const { emailExists, ...other } = control.errors || {};
            control.setErrors(Object.keys(other).length ? other : null);
          }
        }
      }
    });
  }

  populateForm(user: User): void {
    this.userForm.patchValue({
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role
    });
  }

  nameValidator(control: AbstractControl): { [key: string]: any } | null {
    const value = control.value;
    if (!value) return null;
    const pattern = /^[a-zA-Z\s\-']+$/;
    if (!pattern.test(value) || /[\s\-']{2,}/.test(value) || value.trim().length === 0) {
      return { pattern: true };
    }
    return null;
  }

  getAutocomplete(field: string): string {
    return field === 'email' ? 'email' : field === 'firstName' ? 'given-name' : 'family-name';
  }

  getRoleIcon(role: UserRole): string {
    return role === UserRole.ADMIN ? 'admin_panel_settings' : role === UserRole.MANAGER ? 'supervisor_account' : 'person';
  }

  getRoleIconClass(role: UserRole): string {
    return role.toLowerCase() + '-icon';
  }

  getRoleDisplayName(role: UserRole): string {
    return this.availableRoles.find(r => r.value === role)?.label || role;
  }

  getRolePermissionDescription(role: UserRole): string {
    switch (role) {
      case UserRole.ADMIN:
        return 'Can manage all users and settings.';
      case UserRole.MANAGER:
        return 'Can manage users and view reports.';
      case UserRole.USER:
        return 'Standard user permissions.';
      default:
        return 'Standard user permissions apply.';
    }
  }

  onSubmit(): void {
    if (this.userForm.valid && !this.isLoading) {
      this.isLoading = true;
      const form: AddEditUserFormData = {
        email: this.userForm.value.email.trim(),
        firstName: this.userForm.value.firstName.trim(),
        lastName: this.userForm.value.lastName.trim(),
        role: this.userForm.value.role
      };
      setTimeout(() => {
        const result = {
          ...form,
          id: this.isAddMode ? Date.now() : this.data.user!.id,
          status: this.isAddMode ? true : this.data.user!.status
        };
        this.dialogRef.close({ success: true, user: result, mode: this.data.mode });
        this.isLoading = false;
      }, 1500);
    } else {
      Object.values(this.userForm.controls).forEach(control => control.markAsTouched());
    }
  }

  onCancel(): void {
    this.dialogRef.close({ success: false, cancelled: true });
  }
}
