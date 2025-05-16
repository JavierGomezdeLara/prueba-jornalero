export interface Laborer {
        picture: string;
        firstName: string;
        lastName: string;
        email: string;
        role: 'user' | 'admin' | 'supervisor';
        hireDate: string;
    }
