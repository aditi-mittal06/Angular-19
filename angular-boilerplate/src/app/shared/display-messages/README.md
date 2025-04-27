## Display messages folder

this folder contains all the common component which is help to display the alert messages.

Alert messages (a.k.a. toaster notifications) are an extremely common requirement in web applications for displaying status messages to the user e.g. error, success, warning and info alerts.

## sample

    alert.component.html - alert component template that contains the html for displaying alerts.
    alert.component.ts - alert component with the logic for displaying alerts.
    alert.model.ts - alert model class that defines the properties of an alert, it also includes the AlertType enum that defines the different types of alerts.
    alert.module.ts - alert module that encapsulates the alert component so it can be imported by the app module.
    alert.service.ts - alert service that can be used by any angular component or service to send alerts to alert components.
    index.ts - barrel file that re-exports the alert module, service and model so they can be imported using only the folder path instead of the full path to each file, and also enables importing from multiple files with a single import.
