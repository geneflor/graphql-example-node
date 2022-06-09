export type Department = {
    id: number;
    name: string;
    location: string;
}

export type Employee = {
    id: number;
    firstName: string;
    email: string;
    department: number;
}

const departments: Department[] = [
    { id: 1, name: 'Sales', location: 'New York' },
    { id: 2, name: 'Marketing', location: 'Chicago' },
    { id: 3, name: 'Engineering', location: 'Austin' }
]

const employees: Employee[] = [
    { id: 1, firstName: 'Gene', email: 'gene@oracle.com', department: 3 },
    { id: 2, firstName: 'Jane', email: 'jane@oracle.com', department: 1 },
    { id: 3, firstName: 'Shashi', email: 'shashi@oracle.com', department: 3 },
    { id: 4, firstName: 'Alex', email: 'alex@oracle.com', department: 2 },
    { id: 5, firstName: 'Jaewoong', email: 'jaewoong@oracle.com', department: 3 },
    { id: 6, firstName: 'Larry', email: 'larry@oracle.com', department: 1 },
    { id: 7, firstName: 'Chris', email: 'chris@oracle.com', department: 2 },
]

export const getDepartments = () => departments

export const getDepartmentById = (id: number) => departments.find(d => d.id === id)

export const getEmployees = () => employees

export const getEmployeeById = (id: number) => employees.find(d => d.id === id)
