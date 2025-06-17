import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { User } from '../../models/user.model';
import { UserService } from '../../core/services/user.service';
import { MaterialModule } from '../../shared/modules/material.module';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    ConfirmDialogComponent
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

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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

  onViewUser(user: User): void {
    this.snackBar.open(`
    Viewing details for ${user.firstName} ${user.lastName}`, 'Close', {
      duration: 2000,
      panelClass: ['success-snackbar']
    });
  }

  onEditUser(user: User): void {
    this.snackBar.open(`Edit functionality for ${user.firstName} ${user.lastName} - Coming soon!`, 'Close', {
      duration: 2000,
      panelClass: ['success-snackbar']
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