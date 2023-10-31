export interface ContactModel {
    id: number,
    first_name: string,
    last_name: string,
    job: string,
    description: string,
    deleteContact:(id: number)=> void;
}

export interface AddContactModel{
    first_name: string,
    last_name: string,
    job: string,
    description: string
}