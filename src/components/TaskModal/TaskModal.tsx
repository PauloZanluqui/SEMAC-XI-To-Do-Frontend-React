import { useEffect, useState } from 'react';
import './TaskModal.css';
import { IoClose } from 'react-icons/io5';
import type { TaskModel } from '../../models/TaskModel';

interface ModalTaskProps {
    taskToEdit?: TaskModel;
    closeTasksModal: () => void;
}

export default function TaskModal({ taskToEdit, closeTasksModal }: ModalTaskProps) {
    const [title, setTitle] = useState("");

    useEffect(() => {
        if (taskToEdit) {
            setTitle(taskToEdit.title);
        } else {
            setTitle("");
        }
    }, [taskToEdit]);

    async function createTask(e: any) {
        e?.preventDefault();

        const taskData = {
            title,
            isCompleted: false,
        };

        const raw = localStorage.getItem('tasks');
        const tasks: TaskModel[] = raw ? JSON.parse(raw) : [];

        const newId = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1;

        const newTask: TaskModel = {
            id: newId,
            title: taskData.title,
            isCompleted: taskData.isCompleted,
        };

        tasks.push(newTask);
        localStorage.setItem('tasks', JSON.stringify(tasks));

        setTitle("");
        closeTasksModal();
    }

    async function editTask(e: any) {
        e?.preventDefault();

        const raw = localStorage.getItem('tasks');
        const tasks: TaskModel[] = raw ? JSON.parse(raw) : [];

        const updatedTasks = tasks.map(t =>
            t.id === taskToEdit?.id
                ? { ...t, title }
                : t
        );

        localStorage.setItem('tasks', JSON.stringify(updatedTasks));

        setTitle("");
        closeTasksModal();
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h3>{taskToEdit ? "Editar Tarefa" : "Criar Tarefa"}</h3>
                    <div onClick={closeTasksModal} className="close-button">
                        <IoClose size={20} />
                    </div>
                </div>
                <div className="modal-body">
                    <form onSubmit={taskToEdit ? editTask : createTask} action="#">
                        <input type="text" placeholder="Título da tarefa" value={title} onChange={(e) => setTitle(e.target.value)} />
                        <button type="submit">{taskToEdit ? "Editar" : "Criar"}</button>
                    </form>
                </div>
            </div>
        </div>
    );
}