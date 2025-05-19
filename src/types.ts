export interface Laborer {
        id: number;
        picture: string;
        firstName: string;
        lastName: string;
        email: string;
        role: 'user' | 'admin' | 'supervisor';
        hireDate: string;
    }
