import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { User, UserResponse } from '../../models/user.model';
import { AddEditUserData, AddEditUserResponse } from '../../models/add-edit-user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private mockUsers: User[] = [
    { id: 1, firstName: 'Alice', lastName: 'Johnson', email: 'alice.johnson@example.com', role: 'Admin', status: true },
    { id: 2, firstName: 'Bob', lastName: 'Smith', email: 'bob.smith@example.com', role: 'User', status: true },
    { id: 3, firstName: 'Charlie', lastName: 'Brown', email: 'charlie.brown@example.com', role: 'Manager', status: false },
    { id: 4, firstName: 'Diana', lastName: 'Wilson', email: 'diana.wilson@example.com', role: 'User', status: true },
    { id: 5, firstName: 'Edward', lastName: 'Davis', email: 'edward.davis@example.com', role: 'Admin', status: false },
    { id: 6, firstName: 'Fiona', lastName: 'Miller', email: 'fiona.miller@example.com', role: 'User', status: true },
    { id: 7, firstName: 'George', lastName: 'Garcia', email: 'george.garcia@example.com', role: 'Manager', status: true },
    { id: 8, firstName: 'Helen', lastName: 'Martinez', email: 'helen.martinez@example.com', role: 'User', status: false },
    { id: 9, firstName: 'Ivan', lastName: 'Rodriguez', email: 'ivan.rodriguez@example.com', role: 'Admin', status: true },
    { id: 10, firstName: 'Julia', lastName: 'Lopez', email: 'julia.lopez@example.com', role: 'User', status: true },
    { id: 11, firstName: 'Kevin', lastName: 'Gonzalez', email: 'kevin.gonzalez@example.com', role: 'Manager', status: false },
    { id: 12, firstName: 'Laura', lastName: 'Hernandez', email: 'laura.hernandez@example.com', role: 'User', status: true }
  ];

  getUsers(showActiveOnly: boolean = true, sortBy: string = 'firstName', sortDirection: string = 'asc'): Observable<UserResponse> {
    return new Observable(observer => {
      setTimeout(() => {
        try {
          let filteredUsers = showActiveOnly 
            ? this.mockUsers.filter(user => user.status) 
            : this.mockUsers;

          // Sort users
          filteredUsers = this.sortUsers(filteredUsers, sortBy, sortDirection);

          observer.next({
            users: filteredUsers,
            total: filteredUsers.length
          });
          observer.complete();
        } catch (error) {
          observer.error('Failed to load users');
        }
      }, 500);
    });
  }

  addUser(userData: AddEditUserData): Observable<AddEditUserResponse> {
    return new Observable(observer => {
      setTimeout(() => {
        try {
          // Check if email already exists
          const emailExists = this.mockUsers.some(user => 
            user.email.toLowerCase() === userData.email.toLowerCase()
          );

          if (emailExists) {
            observer.error('Email already exists');
            return;
          }

          const newUser: User = {
            id: Math.max(...this.mockUsers.map(u => u.id)) + 1,
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            role: userData.role,
            status: userData.status ?? true
          };

          this.mockUsers.push(newUser);

          observer.next({
            success: true,
            user: newUser,
            message: 'User created successfully'
          });
          observer.complete();
        } catch (error) {
          observer.error('Failed to create user');
        }
      }, 1000);
    });
  }

  updateUser(userId: number, userData: AddEditUserData): Observable<AddEditUserResponse> {
    return new Observable(observer => {
      setTimeout(() => {
        try {
          const userIndex = this.mockUsers.findIndex(user => user.id === userId);
          
          if (userIndex === -1) {
            observer.error('User not found');
            return;
          }

          // Check if email already exists (excluding current user)
          const emailExists = this.mockUsers.some(user => 
            user.email.toLowerCase() === userData.email.toLowerCase() && user.id !== userId
          );

          if (emailExists) {
            observer.error('Email already exists');
            return;
          }

          const updatedUser: User = {
            ...this.mockUsers[userIndex],
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            role: userData.role
          };

          this.mockUsers[userIndex] = updatedUser;

          observer.next({
            success: true,
            user: updatedUser,
            message: 'User updated successfully'
          });
          observer.complete();
        } catch (error) {
          observer.error('Failed to update user');
        }
      }, 1000);
    });
  }

  updateUserStatus(userId: number, status: boolean): Observable<boolean> {
    return new Observable(observer => {
      setTimeout(() => {
        const userIndex = this.mockUsers.findIndex(user => user.id === userId);
        if (userIndex !== -1) {
          this.mockUsers[userIndex].status = status;
          observer.next(true);
        } else {
          observer.error('User not found');
        }
        observer.complete();
      }, 300);
    });
  }

  deleteUser(userId: number): Observable<boolean> {
    return new Observable(observer => {
      setTimeout(() => {
        const userIndex = this.mockUsers.findIndex(user => user.id === userId);
        if (userIndex !== -1) {
          this.mockUsers.splice(userIndex, 1);
          observer.next(true);
        } else {
          observer.error('User not found');
        }
        observer.complete();
      }, 300);
    });
  }

  getCurrentUserRole(): string {
    // In a real application, this would come from authentication service
    // For demo purposes, return 'Admin' to show all role options
    return 'Admin';
  }

  private sortUsers(users: User[], sortBy: string, sortDirection: string): User[] {
    return users.sort((a, b) => {
      let aValue: string;
      let bValue: string;

      switch (sortBy) {
        case 'firstName':
          aValue = a.firstName.toLowerCase();
          bValue = b.firstName.toLowerCase();
          break;
        case 'lastName':
          aValue = a.lastName.toLowerCase();
          bValue = b.lastName.toLowerCase();
          break;
        case 'email':
          aValue = a.email.toLowerCase();
          bValue = b.email.toLowerCase();
          break;
        default:
          aValue = a.firstName.toLowerCase();
          bValue = b.firstName.toLowerCase();
      }

      if (sortDirection === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });
  }
}