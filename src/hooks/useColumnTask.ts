import { ColumnType } from '@/utils/enums';
import useTaskCollection from '@/hooks/useTaskCollection';
import { useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { TaskModel } from '@/utils/models';
import { pickChakraRandomColor, swap } from '@/utils/helpers';

const MAX_TASKS_PER_COLUMN = 100;

function useColumnTask(column: ColumnType) {
  const [tasks, setTasks] = useTaskCollection();

  const addTask = useCallback(() => {
    setTasks((prev) => {
      const columnTasks = prev[column];
      if (columnTasks.length >= MAX_TASKS_PER_COLUMN) {
        return prev;
      }

      const newTask: TaskModel = {
        id: uuidv4(),
        title: `New ${column} task`,
        column,
        color: pickChakraRandomColor('.300'),
      };
      return {
        ...prev,
        [column]: [newTask, ...columnTasks],
      };
    });
  }, [column, setTasks]);

  const updateTask = useCallback(
    (task: TaskModel) => {
      setTasks((prev) => {
        const columnTasks = prev[column];
        return {
          ...prev,
          [column]: columnTasks.map((t) => (t.id === task.id ? task : t)),
        };
      });
    },
    [column, setTasks],
  );

  const deleteTask = useCallback(
    (id: TaskModel['id']) => {
      setTasks((prev) => {
        const columnTasks = prev[column];
        return {
          ...prev,
          [column]: columnTasks.filter((t) => t.id !== id),
        };
      });
    },
    [column, setTasks],
  );

  const dropTaskFrom = useCallback(
    (fromColumn: ColumnType, taskId: TaskModel['id']) => {
      setTasks((prev) => {
        const fromColumnTasks = prev[fromColumn];
        const toColumnTasks = prev[column];
        const task = fromColumnTasks.find((t) => t.id === taskId);
        if (!task) {
          return prev;
        }
        return {
          ...prev,
          [fromColumn]: fromColumnTasks.filter((t) => t.id !== taskId),
          [column]: [{ ...task, column }, ...toColumnTasks],
        };
      });
    },
    [column, setTasks],
  );

  const swapTasks = useCallback(
    (i: number, j: number) => {
      setTasks((prev) => {
        const columnTasks = prev[column];
        return {
          ...prev,
          [column]: swap(columnTasks, i, j),
        };
      });
    },
    [column, setTasks],
  );

  return {
    tasks: tasks[column],
    addTask,
    updateTask,
    deleteTask,
    dropTaskFrom,
    swapTasks,
  };
}

export default useColumnTask;
