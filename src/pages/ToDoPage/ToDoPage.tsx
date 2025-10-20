import "./ToDoPage.css"
import Header from "../../components/Header/Header";
import Task from "../../components/Task/Task";
import { useEffect, useState } from "react";
import TaskModal from "../../components/TaskModal/TaskModal";
import type { TaskModel } from "../../models/TaskModel";

export default function ToDoPage() {
    const [isModalTaskOpen, setIsModalTaskOpen] = useState(false);
    const [tasks, setTasks] = useState<TaskModel[]>([]);
    const [taskToEdit, setTaskToEdit] = useState<TaskModel | undefined>(undefined);

    useEffect(() => {
        loadTasks();
    }, []);

    async function closeModal() {
        setIsModalTaskOpen(false);
        loadTasks();
        setTaskToEdit(undefined);
    }

    function loadTasks() {
        const raw = localStorage.getItem('tasks');
        if (!raw) {
            setTasks([]);
            return;
        }

        const tasksData: TaskModel[] = JSON.parse(raw);
        setTasks(tasksData);
    }

    async function onClickEdit(task: TaskModel) {
        setTaskToEdit(task);
        setIsModalTaskOpen(true)
    }

    async function deleteTask(id: number) {
        const raw = localStorage.getItem('tasks');
        const tasks: TaskModel[] = raw ? JSON.parse(raw) : [];

        const updatedTasks = tasks.filter(t => t.id !== id);

        localStorage.setItem('tasks', JSON.stringify(updatedTasks));

        loadTasks();
    }

    function toggleIsCompleted(id: number) {
        const raw = localStorage.getItem('tasks');
        const tasks: TaskModel[] = raw ? JSON.parse(raw) : [];

        const updatedTasks = tasks.map(task =>
            task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
        );

        localStorage.setItem('tasks', JSON.stringify(updatedTasks));

        loadTasks();
    }


    return (
        <>
            <Header />

            <h2 className="title">Tarefas:</h2>

            <button className="open-modal-btn" onClick={() => setIsModalTaskOpen(true)}>
                Criar Tarefa
            </button>

            <div className="tasks-list">
                {tasks.length == 0 ? <p>Nenhuma tarefa cadastrada.</p> : tasks.map((task) => <Task key={task.id} id={task.id} title={task.title} isCompleted={task.isCompleted} onEdit={() => onClickEdit(task)} onDelete={() => deleteTask(task.id)} onComplete={() => toggleIsCompleted(task.id)} />)}
            </div>

            {isModalTaskOpen && <TaskModal taskToEdit={taskToEdit} closeTasksModal={() => closeModal()} />}
        </>
    )
}