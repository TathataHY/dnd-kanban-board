import { ColumnType, ItemType } from '@/utils/enums';
import { DragItem, TaskModel } from '@/utils/models';
import { useDrop } from 'react-dnd';

export function useColumnDrop(
  column: ColumnType,
  handleDrop: (fromColumn: ColumnType, taskId: TaskModel['id']) => void,
) {
  const [{ isOver }, drop] = useDrop<DragItem, void, { isOver: boolean }>({
    accept: ItemType.TASK,
    drop: (item: DragItem) => {
      if (!item || item.from === column) {
        return;
      }
      handleDrop(item.from, item.id);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return { drop, isOver };
}
