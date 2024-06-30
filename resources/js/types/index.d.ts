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

export type SpecialtyType = {
    id: number;
    specialty: string;
    code: string;
    created_at: string;
    updated_at: string;
}

export type ShiftType = {
    id: number;
    shift: string;
    code: string;
    created_at: string;
    updated_at: string;
}

export type SemesterType = {
    id: number;
    semester: string;
    group: string;
    active: 1 | 0;
    created_at: string;
    updated_at: string;
}

export type PeriodType = {
    id?: number;
    start_month: string;
    start_year: string;
    end_month: string;
    end_year: string;
    active?: 1 | 0;
    reference_number: string;
    account_number: string;
    interbank_code: string;
    amount: number;
    created_at?: string;
    updated_at?: string;
};

export type TypePayType = {
    id?: number;
    type: string;
    code: string;
    created_at?: string;
    updated_at?: string;
}

export type PayType = {
    id?: number;
    name: string;
    mother_last_name: string;
    father_last_name: string;
    code: string;
    curp: string;
    type_pay_id?: number;
    specialty_id?: number;
    shift_id?: number;
    period_id?: number;
    semester_id?: number;
}

export type PaymentType = PayType & {
    type_pay: TypePayType;
    specialty: SpecialtyType;
    shift: ShiftType;
    semester: SemesterType;
}
