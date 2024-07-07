import api from "@/Lib/axios";
import { SemesterType, SpecialtyType } from "@/types";
import Swal from "sweetalert2";

export default {
    getSubjectsTeachers(page = 1, search = '') {
        return api.get(route('subjects-teachers.index', {
            page,
            search,
        }));
    },
    searchClassrooms(specialty_id?: SpecialtyType['id'], semester_id?: SemesterType['id']) {
        return api.get(route('search-classrooms', {specialty_id, semester_id}));
    }
};
