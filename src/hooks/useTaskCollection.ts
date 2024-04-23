import { ColumnType } from '@/utils/enums';
import { TaskModel } from '@/utils/models';
import { useLocalStorage } from 'usehooks-ts';
import { v4 as uuidv4 } from 'uuid';

function useTaskCollection() {
  return useLocalStorage<{ [key in ColumnType]: TaskModel[] }>('tasks', {
    [ColumnType.TO_DO]: [
      {
        id: uuidv4(),
        title: 'Task 1',
        column: ColumnType.TO_DO,
        color: 'red.300',
      },
      {
        id: uuidv4(),
        title: 'Task 2',
        column: ColumnType.TO_DO,
        color: 'red.300',
      },
    ],
    [ColumnType.IN_PROGRESS]: [
      {
        id: uuidv4(),
        title: 'Task 3',
        column: ColumnType.IN_PROGRESS,
        color: 'blue.300',
      },
      {
        id: uuidv4(),
        title: 'Task 4',
        column: ColumnType.IN_PROGRESS,
        color: 'blue.300',
      },
    ],
    [ColumnType.BLOCKED]: [
      {
        id: uuidv4(),
        title: 'Task 5',
        column: ColumnType.BLOCKED,
        color: 'red.300',
      },
      {
        id: uuidv4(),
        title: 'Task 6',
        column: ColumnType.BLOCKED,
        color: 'red.300',
      },
    ],
    [ColumnType.COMPLETED]: [
      {
        id: uuidv4(),
        title: 'Task 7',
        column: ColumnType.COMPLETED,
        color: 'green.300',
      },
      {
        id: uuidv4(),
        title: 'Task 8',
        column: ColumnType.COMPLETED,
        color: 'green.300',
      },
    ],
  });
}

export default useTaskCollection;
