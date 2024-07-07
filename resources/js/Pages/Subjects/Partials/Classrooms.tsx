import FormItem from "@/Components/FormItem";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import SelectInput from "@/Components/SelectInput";
import SubmitButton from "@/Components/SubmitButton";
import useClassrooms from "@/Hooks/useClassroms";
import { ClassroomType, SemesterType, SpecialtyType, SubjectType } from "@/types";

type ClassroomsProps = {
    classrooms: ClassroomType<{
        semester: SemesterType;
        specialty: SpecialtyType;
    }>[];
    specialties: SpecialtyType[];
    semesters: SemesterType[];
    subject: SubjectType;
};

export default function Classrooms({classrooms, semesters, specialties, subject} : ClassroomsProps) {
    const {
        alerts,
        activeModal,
        setActiveModal,
        data,
        setData,
        processing,
        errors,
        save,
        closeModal,
        handleDelete,
        canDelete,
    } = useClassrooms({classrooms, subject});

    return (
        <>
            <section className="space-y-8 my-16">
                <div className="flex gap-4 items-center justify-between">
                    <h2 className="text-2xl font-bold text-indigo-700">
                        Grupos de la Materia:
                    </h2>

                    <button
                        title="Agregar Grupo"
                        type="button"
                        className="bg-indigo-700 hover:bg-indigo-600 transition-colors text-white p-2"
                        onClick={() => setActiveModal(true)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" className="size-6" viewBox="0 0 24 24"><path fill="currentColor" d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2z"/></svg>
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    { classrooms.map(classrooms => (
                        <div key={classrooms.id} className="p-4 bg-white shadow-md flex items-center justify-between gap-4">
                            <p className="font-bold text-gray-700 text-lg">
                                { classrooms.semester.semester }{ classrooms.semester.group } - { classrooms.specialty.specialty }
                            </p>

                            { canDelete && (
                                <button
                                    type="button"
                                    className="transition-colors bg-indigo-50 text-indigo-700 p-2 hover:bg-indigo-100"
                                    title="Quitar Grupo"
                                    onClick={() => handleDelete(classrooms.id)}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" className="size-6" viewBox="0 0 100 100"><path fill="currentColor" d="M84.707 68.752L65.951 49.998l18.75-18.752a1.989 1.989 0 0 0 0-2.813L71.566 15.295a1.99 1.99 0 0 0-2.814 0L49.999 34.047l-18.75-18.752c-.746-.747-2.067-.747-2.814 0L15.297 28.431a1.992 1.992 0 0 0 0 2.814L34.05 49.998L15.294 68.753a1.993 1.993 0 0 0 0 2.814L28.43 84.704a1.988 1.988 0 0 0 2.814 0l18.755-18.755l18.756 18.754c.389.388.896.583 1.407.583s1.019-.195 1.408-.583l13.138-13.137a1.99 1.99 0 0 0-.001-2.814"/></svg>
                                </button>
                            ) }
                        </div>
                    ))}
                </div>
            </section>

            <Modal
                show={activeModal}
                onClose={closeModal}
            >
                <form
                	className="p-4 grid grid-cols-1 gap-4"
                    onSubmit={save}
                >
                    <div>
                        { alerts.map((alert, index) => (
                            <InputError key={index} message={alert} />
                        )) }
                    </div>

                    <FormItem>
                        <InputLabel htmlFor="semester_id">
                            Semestre:
                        </InputLabel>

                        <SelectInput
                            name="semester_id"
                            id="semester_id"
                            onChange={(e) => setData('semester_id', Number(e.target.value))}
                            value={data.semester_id}
                        >
                            { semesters.map(semester => (
                                <option key={semester.id} value={semester.id}>
                                    { semester.semester }
                                </option>
                            )) }
                        </SelectInput>

                        <InputError message={errors.semester_id} />
                    </FormItem>

                    <FormItem>
                        <InputLabel htmlFor="specialty_id">
                            Especialidad:
                        </InputLabel>

                        <SelectInput
                            name="specialty_id"
                            id="specialty_id"
                            onChange={(e) => setData('specialty_id', Number(e.target.value))}
                            value={data.specialty_id}
                        >
                            { specialties.map(specialty => (
                                <option key={specialty.id} value={specialty.id}>
                                    { specialty.specialty }
                                </option>
                            )) }
                        </SelectInput>

                        <InputError message={errors.specialty_id} />
                    </FormItem>

                    <SubmitButton value="Agregar Grupo a la Materia" disabled={processing} />
                </form>
            </Modal>
        </>
    )
}
