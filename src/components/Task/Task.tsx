import './Task.css';
import { FaCircleCheck, FaRegCircle } from "react-icons/fa6";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";

interface TaskProps {
    id: number;
    title: string;
    isCompleted: boolean;
    onComplete?: (event: React.MouseEvent<HTMLDivElement>) => void;
    onDelete?: (event: React.MouseEvent<HTMLDivElement>) => void;
    onEdit?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export default function Task(task: TaskProps) {
    return (
        <div className="task-item">
            <div onClick={task.onComplete}>{task.isCompleted ? <FaCircleCheck className="task-checkbox checked" /> : <FaRegCircle className="task-checkbox" />}</div>

            <span className="task-title">{task.title}</span>

            <div className="task-icon-list">
                <div onClick={task.onEdit}>
                    <FaPencilAlt className="task-btn" />
                </div>

                <div onClick={task.onDelete}>
                    <FaTrashAlt className="task-btn" />
                </div>
            </div>
        </div>
    )
}