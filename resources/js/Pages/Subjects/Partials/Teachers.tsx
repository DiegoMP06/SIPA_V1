import Modal from "@/Components/Modal";
import Pagination from "@/Components/Pagination";
import SearchForm from "@/Components/SearchForm";
import useSubjectsTeachers from "@/Hooks/useSubjectsTeachers";
import { SubjectType, TeacherType } from "@/types";
import { Link } from "@inertiajs/react";

type TeachersProps = {
    subject: SubjectType;
    currentTeachers: TeacherType<{
        pivot: {
            id: number;
            teacher_id: number;
            subject_id: number;
        };
    }>[];
};

export default function Teachers({ subject, currentTeachers }: TeachersProps) {
    const {
        activeModal,
        data,
        setData,
        loading,
        teachers,
        openModal,
        closeModal,
        addTeacher,
        handleSearch,
        handlePaginate,
        hasTeachers,
        isLinked,
        handleDelete,
        hasLinkedTeachers,
    } = useSubjectsTeachers({ currentTeachers, subject });

    return (
        <>
            <section className="space-y-8 my-16">
                <div className="flex gap-4 items-center justify-between">
                    <h2 className="text-2xl font-bold text-rose-700">
                        Profesores de la Materia:
                    </h2>

                    <button
                        title="Agregar Profesor"
                        type="button"
                        className="bg-rose-700 hover:bg-rose-600 transition-colors text-white p-2"
                        onClick={openModal}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="128"
                            height="128"
                            className="size-6"
                            viewBox="0 0 24 24"
                        >
                            <path
                                fill="currentColor"
                                d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2z"
                            />
                        </svg>
                    </button>
                </div>

                <div>
                    {hasLinkedTeachers ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {currentTeachers.map((teacher) => (
                                <div
                                    key={teacher.id}
                                    className="p-5 bg-white shadow-md hover:shadow-lg transition-shadow duration-300 rounded-xl flex items-center justify-between gap-4 border border-rose-200"
                                >
                                    <Link
                                        href={route("teachers.show", {
                                            teacher: teacher.id,
                                        })}
                                        className="font-bold text-gray-800 text-lg"
                                    >
                                        {teacher.name}{" "}
                                        {teacher.father_last_name}{" "}
                                        {teacher.mother_last_name}
                                    </Link>

                                    <button
                                        type="button"
                                        className="transition-colors bg-rose-100 text-rose-800 p-2 hover:bg-rose-200"
                                        title="Quitar Profesor"
                                        onClick={() =>
                                            handleDelete(teacher.pivot.id)
                                        }
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="128"
                                            height="128"
                                            className="size-6"
                                            viewBox="0 0 100 100"
                                        >
                                            <path
                                                fill="currentColor"
                                                d="M84.707 68.752L65.951 49.998l18.75-18.752a1.989 1.989 0 0 0 0-2.813L71.566 15.295a1.99 1.99 0 0 0-2.814 0L49.999 34.047l-18.75-18.752c-.746-.747-2.067-.747-2.814 0L15.297 28.431a1.992 1.992 0 0 0 0 2.814L34.05 49.998L15.294 68.753a1.993 1.993 0 0 0 0 2.814L28.43 84.704a1.988 1.988 0 0 0 2.814 0l18.755-18.755l18.756 18.754c.389.388.896.583 1.407.583s1.019-.195 1.408-.583l13.138-13.137a1.99 1.99 0 0 0-.001-2.814"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-800 font-bold text-xl text-center my-40">
                            No Hay Profesores Enlazados
                        </p>
                    )}
                </div>
            </section>

            <Modal onClose={closeModal} show={activeModal}>
                <div className="p-4">
                    <SearchForm
                        data={data}
                        setData={setData}
                        processing={loading}
                        handleSearch={handleSearch}
                        placeholder="Buscar [Nombre, correo, teléfono]"
                    />

                    {hasTeachers ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
                            {teachers.data.map((teacher) => (
                                <div
                                    key={teacher.id}
                                    className={`bg-rose-700 p-2 grid grid-cols-1 ${isLinked(teacher.id) && "opacity-50 cursor-not-allowed"}`}
                                >
                                    <p className="text-white font-bold text-xl">
                                        {teacher.name}{" "}
                                        {teacher.father_last_name}{" "}
                                        {teacher.mother_last_name}
                                    </p>

                                    <p className="text-white font-bold truncate">
                                        {teacher.active ? "Activo" : "Inactivo"}
                                    </p>

                                    <button
                                        disabled={isLinked(teacher.id)}
                                        type="button"
                                        className={`p-2 text-rose-800 bg-white hover:bg-rose-200 transition-colors place-self-end disabled:hover:bg-white disabled:cursor-not-allowed`}
                                        title="Agregar Profesor"
                                        onClick={() => addTeacher(teacher.id)}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="size-6"
                                            width="128"
                                            height="128"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                fill="currentColor"
                                                d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2z"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center font-bold text-gray-800 my-20">
                            No Hay Profesores Disponibles
                        </p>
                    )}

                    <Pagination
                        pagination={teachers}
                        handlePaginate={handlePaginate}
                        withFunction
                    />
                </div>
            </Modal>
        </>
    );
}
