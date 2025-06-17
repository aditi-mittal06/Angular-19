## Modules Folder

This folder contains shared modules that can be reused across the application.

## MaterialModule

The `MaterialModule` is a centralized module that imports and exports all commonly used Angular Material components. This approach provides several benefits:

### Benefits:
- **Centralized Management**: All Material imports are managed in one place
- **Consistent Imports**: Ensures consistent Material component usage across the app
- **Tree-Shaking Optimization**: Unused components are automatically removed in production builds
- **Easier Maintenance**: Adding or removing Material components only requires changes in one file
- **Type Safety**: Includes TypeScript type definitions for better development experience

### Usage Examples:

#### In Standalone Components:
```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/modules/material.module';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Example Component</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <mat-form-field>
          <mat-label>Input Field</mat-label>
          <input matInput placeholder="Enter text">
        </mat-form-field>
        <mat-slide-toggle>Toggle me</mat-slide-toggle>
      </mat-card-content>
      <mat-card-actions>
        <button mat-raised-button color="primary">
          <mat-icon>save</mat-icon>
          Save
        </button>
      </mat-card-actions>
    </mat-card>
  `
})
export class ExampleComponent { }
```

#### Using Barrel Exports:
```typescript
// Instead of multiple imports:
import { MaterialModule } from '../shared/modules/material.module';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// You can use the barrel export:
import { MaterialModule, CommonModule, ReactiveFormsModule } from '../shared/modules';
```

### Available Material Components:

The MaterialModule includes all commonly used Material components organized by category:

#### Form Controls:
- MatAutocompleteModule
- MatCheckboxModule
- MatDatepickerModule
- MatFormFieldModule
- MatInputModule
- MatRadioModule
- MatSelectModule
- MatSliderModule
- MatSlideToggleModule

#### Navigation:
- MatMenuModule
- MatSidenavModule
- MatToolbarModule

#### Layout:
- MatCardModule
- MatDividerModule
- MatExpansionModule
- MatGridListModule
- MatListModule
- MatStepperModule
- MatTabsModule
- MatTreeModule

#### Buttons & Indicators:
- MatButtonModule
- MatButtonToggleModule
- MatBadgeModule
- MatChipsModule
- MatIconModule
- MatProgressSpinnerModule
- MatProgressBarModule
- MatRippleModule

#### Popups & Modals:
- MatBottomSheetModule
- MatDialogModule
- MatSnackBarModule
- MatTooltipModule

#### Data Table:
- MatPaginatorModule
- MatSortModule
- MatTableModule

#### Date:
- MatNativeDateModule

### Utility Methods:

The MaterialModule also provides utility methods for debugging and development:

```typescript
// Get all available Material modules
const modules = MaterialModule.getAvailableModules();
console.log('Available modules:', modules);

// Check if a specific module is included
const hasButton = MaterialModule.hasModule('MatButtonModule');
console.log('Has MatButtonModule:', hasButton);
```

### Best Practices:

1. **Import in Components**: Import MaterialModule in standalone components or feature modules
2. **Avoid Root Import**: Don't import MaterialModule in the root AppModule to prevent circular dependencies
3. **Tree-Shaking**: Let Angular's build process handle tree-shaking automatically
4. **Consistent Usage**: Use MaterialModule consistently across all components that need Material components
5. **Documentation**: Keep the module well-documented for team collaboration

### Feature Modules

Feature modules are NgModules for the purpose of organizing code.

A feature module is an organizational best practice, as opposed to a concept of the core Angular API.

A feature module delivers a cohesive set of functionality focused on a specific application need such as a user workflow, routing, or forms.

While you can do everything within the root module, feature modules help you partition the application into focused areas.

A feature module collaborates with the root module and with other modules through the services it provides and the components, directives, and pipes that it shares.

### How to make a feature module

We can create with the Angular CLI, create a feature module using the CLI by entering the following command in the root project directory.

`ng generate module CustomerDashboard` or `ng generate component customer-dashboard/CustomerDashboard`

### Importing modules

(import your module file in app.component.ts)

```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CustomerDashboardModule } from './customer-dashboard/customer-dashboard.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, CustomerDashboardModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'angular18';
}
```