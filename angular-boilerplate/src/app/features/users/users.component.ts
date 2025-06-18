import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { User } from '../../models/user.model';
import { UserService } from '../../core/services/user.service';
import { MaterialModule } from '../../shared/modules/material.module';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';
import { AddEditUserComponent } from '../../shared/components/add-edit-user/add-edit-user.component';
import { AddEditUserDialogData, UserRole } from '../../models/add-edit-user.model';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    ConfirmDialogComponent,
    AddEditUserComponent
  ],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'role', 'status', 'actions'];
  dataSource = new MatTableDataSource<User>();
  isLoading = false;
  showActiveOnly = true;
  error: string | null = null;
  currentUserRole: UserRole = UserRole.ADMIN; // In real app, get from auth service

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadUsers();
    this.getCurrentUserRole();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private getCurrentUserRole(): void {
    // In a real application, get this from the authentication service
    this.currentUserRole = this.userService.getCurrentUserRole() as UserRole;
  }

  loadUsers(): void {
    this.isLoading = true;
    this.error = null;

    const sortBy = this.sort?.active || 'firstName';
    const sortDirection = this.sort?.direction || 'asc';

    this.userService.getUsers(this.showActiveOnly, sortBy, sortDirection).subscribe({
      next: (response) => {
        this.dataSource.data = response.users;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isLoading = false;
      },
      error: (error) => {
        this.error = error;
        this.isLoading = false;
        this.snackBar.open('Failed to load users', 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      }
    });
  }

  onFilterToggle(): void {
    this.showActiveOnly = !this.showActiveOnly;
    this.loadUsers();
  }

  onSortChange(): void {
    this.loadUsers();
  }

  onAddUser(): void {
    const dialogData: AddEditUserDialogData = {
      mode: 'add',
      currentUserRole: this.currentUserRole
    };

    const dialogRef = this.dialog.open(AddEditUserComponent, {
      width: '600px',
      maxWidth: '95vw',
      disableClose: true,
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.success && result?.user) {
        this.userService.addUser(result.user).subscribe({
          next: (response) => {
            if (response.success) {
              this.snackBar.open(
                `User ${result.user.firstName} ${result.user.lastName} created successfully`,
                'Close',
                { 
                  duration: 4000,
                  panelClass: ['success-snackbar']
                }
              );
              this.loadUsers();
            }
          },
          error: (error) => {
            this.snackBar.open(
              error === 'Email already exists' 
                ? 'Email address is already registered' 
                : 'Failed to create user. Please try again.',
              'Close',
              {
                duration: 4000,
                panelClass: ['error-snackbar']
              }
            );
          }
        });
      }
    });
  }

  onEditUser(user: User): void {
    const dialogData: AddEditUserDialogData = {
      mode: 'edit',
      user: user,
      currentUserRole: this.currentUserRole
    };

    const dialogRef = this.dialog.open(AddEditUserComponent, {
      width: '600px',
      maxWidth: '95vw',
      disableClose: true,
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.success && result?.user) {
        this.userService.updateUser(user.id, result.user).subscribe({
          next: (response) => {
            if (response.success) {
              this.snackBar.open(
                `User ${result.user.firstName} ${result.user.lastName} updated successfully`,
                'Close',
                { 
                  duration: 4000,
                  panelClass: ['success-snackbar']
                }
              );
              this.loadUsers();
            }
          },
          error: (error) => {
            this.snackBar.open(
              error === 'Email already exists' 
                ? 'Email address is already registered' 
                : 'Failed to update user. Please try again.',
              'Close',
              {
                duration: 4000,
                panelClass: ['error-snackbar']
              }
            );
          }
        });
      }
    });
  }

  onStatusToggle(user: User): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      disableClose: true,
      data: {
        title: 'Confirm Status Change',
        message: `Are you sure you want to ${user.status ? 'deactivate' : 'activate'} ${user.firstName} ${user.lastName}?`,
        confirmText: user.status ? 'Deactivate' : 'Activate',
        cancelText: 'Cancel'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const newStatus = !user.status;
        this.userService.updateUserStatus(user.id, newStatus).subscribe({
          next: () => {
            user.status = newStatus;
            this.snackBar.open(
              `User ${newStatus ? 'activated' : 'deactivated'} successfully`,
              'Close',
              { 
                duration: 3000,
                panelClass: ['success-snackbar']
              }
            );
            // Reload if showing active only and user was deactivated
            if (this.showActiveOnly && !newStatus) {
              this.loadUsers();
            }
          },
          error: () => {
            this.snackBar.open('Failed to update user status', 'Close', {
              duration: 3000,
              panelClass: ['error-snackbar']
            });
          }
        });
      }
    });
  }

  onDeleteUser(user: User): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '450px',
      disableClose: true,
      data: {
        title: 'Confirm Delete',
        message: `Are you sure you want to permanently delete ${user.firstName} ${user.lastName}? This action cannot be undone and will remove all associated data.`,
        confirmText: 'Delete Permanently',
        cancelText: 'Cancel',
        isDestructive: true
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.deleteUser(user.id).subscribe({
          next: () => {
            this.snackBar.open(`${user.firstName} ${user.lastName} has been deleted successfully`, 'Close', {
              duration: 3000,
              panelClass: ['success-snackbar']
            });
            this.loadUsers();
          },
          error: () => {
            this.snackBar.open('Failed to delete user. Please try again.', 'Close', {
              duration: 3000,
              panelClass: ['error-snackbar']
            });
          }
        });
      }
    });
  }
}