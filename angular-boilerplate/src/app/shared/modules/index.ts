/**
 * Barrel export file for shared modules
 * 
 * This file provides a centralized export point for all shared modules,
 * making imports cleaner and more maintainable across the application.
 * 
 * @example
 * ```typescript
 * // Instead of:
 * import { MaterialModule } from '../shared/modules/material.module';
 * 
 * // You can use:
 * import { MaterialModule } from '../shared/modules';
 * ```
 */

export { MaterialModule, type MaterialModuleName, type MaterialComponent } from './material.module';

/**
 * Re-export commonly used Angular modules for convenience
 * This allows importing common modules alongside our custom modules
 */
export { CommonModule } from '@angular/common';
export { ReactiveFormsModule, FormsModule } from '@angular/forms';
export { RouterModule } from '@angular/router';