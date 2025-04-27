## Constant Folder

A constant in Angular is a value that cannot be changed during runtime. It is useful for storing values that should not be modified and need to be accessed throughout the application

As per the coding standards, there should be no any static data in the code. We will create constant file according to module wise like client.constant.ts for client component.

if there are some common constant that we are using throughout the project, then we can create common.constant.ts file

Constant file name should be singular and with constant postfix like client.constant.ts.

For Example:
export const ClientConst = {
DisplayColumns: [
'sortOrder',
'clientName',
'priorityNo',
'surveysCount',
'action',
],
Label: 'Clients',
Add: 'Add New Client',
Edit: 'Edit Client',
SortBy: 'clientName',
ClientFilterBy: 'clientId',
ShowClientBy: 'clientName',
ListHeaderName: 'Clients',
SelectedListHeaderName: 'Selected Clients',
};

# How to use it :

we first need to import it into the file where we want to use it. For example, if we want to use the DisplayColumns constant in a component that displays the table column, we can import it like this:

import { ClientConst } from 'src/app/shared/constants/client.constant';

displayedColumns: string[] = ClientConst.DisplayColumns;
