export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
};

type ObjType = {
    [key: string]: unknown;
}

export type PaginateProps<T extends Record<string, unknown> = Record<string, unknown>> = {
    current_page: number,
    data: T[];
    first_page_url: string,
    from: number,
    last_page: number,
    last_page_url: string,
    links: {
        url: null | string;
        label: string;
        active: boolean;
    }[];
    next_page_url: null | string,
    path: string,
    per_page: number,
    prev_page_url: null | string,
    to: number,
    total: number;
};

export type SpecialtyType <T extends Record<string, unknown> = Record<string, unknown>> = {
    id: number;
    specialty: string;
    code: string;
    created_at: string;
    updated_at: string;
} & T & ObjType;

export type ShiftType<T extends Record<string, unknown> = Record<string, unknown>> = {
    id: number;
    shift: string;
    code: string;
    created_at: string;
    updated_at: string;
} & T & ObjType;

export type SemesterType<T extends Record<string, unknown> = Record<string, unknown>> = {
    id: number;
    semester: string;
    group: string;
    active: 1 | 0;
    created_at: string;
    updated_at: string;
} & T & ObjType;

export type PeriodType<T extends Record<string, unknown> = Record<string, unknown>> = {
    id?: number;
    start_month: string;
    start_year: string;
    end_month: string;
    end_year: string;
    active?: 1 | 0;
    account_number: string;
    interbank_code: string;
    amount: number;
    type_pay_id: number;
    created_at?: string;
    updated_at?: string;
} & T & ObjType;

export type TypePayType<T extends Record<string, unknown> = Record<string, unknown>> = {
    id?: number;
    type: string;
    code: string;
    created_at?: string;
    updated_at?: string;
} & T & ObjType;

export type PayType<T extends Record<string, unknown> = Record<string, unknown>> = {
    id?: number;
    name: string;
    mother_last_name: string;
    father_last_name: string;
    code: string;
    specialty_id?: number;
    shift_id?: number;
    period_id?: number;
    semester_id?: number;
    created_at?: string;
    updated_at?: string;
} & T & ObjType;

export type SubjectType<T extends Record<string, unknown> = Record<string, unknown>> = {
    id?: number;
    subject:string;
    active: 1 | 0;
    created_at?: string;
    updated_at?: string;
} & T & ObjType;

export type ClassroomType<T extends Record<string, unknown> = Record<string, unknown>> = {
    id?: number;
    specialty_id: SpecialtyType['id'];
    semester_id: SemesterType['id'];
    subject_id?: SubjectType['id'];
    created_at?: string;
    updated_at?: string;
} & T & ObjType;

export type TeacherType<T extends Record<string, unknown> = Record<string, unknown>> = {
    id?: number;
    name: string;
    mother_last_name: string;
    father_last_name: string;
    email: string;
    phone: string;
    active: 1 | 0;
    created_at?: string;
    updated_at?: string;
} & T & ObjType;

export type ExtraordinaryPaymentType<T extends Record<string, unknown> = Record<string, unknown>> = {
    id?: number;
    pay_id: number;
    subject_id: number;
    teacher_id: number;
    created_at?: string;
    updated_at?: string;
} & T & ObjType;

