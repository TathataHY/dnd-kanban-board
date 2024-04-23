import { ItemType } from '@/utils/enums';
import { DragItem, TaskModel } from '@/utils/models';
import { useRef } from 'react';
import { useDrag, useDrop, XYCoord } from 'react-dnd';

export function useTaskDragAndDrop<T extends HTMLElement>(
  { task, index }: { task: TaskModel; index: number },
  handleDropHover: (i: number, j: number) => void,
) {
  const ref = useRef<T>(null);

  const [{ isDragging }, drag] = useDrag<
    DragItem,
    void,
    { isDragging: boolean }
  >({
    type: ItemType.TASK,
    item: { from: task.column, id: task.id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [_, drop] = useDrop<DragItem, void, unknown>({
    accept: ItemType.TASK,
    hover: (item: DragItem, monitor) => {
      if (!ref.current) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const isDraggedItemAboveHovered = dragIndex < hoverIndex;
      const isDraggedItemBelowHovered = !isDraggedItemAboveHovered;

      const { y: mouseY } = monitor.getClientOffset() as XYCoord;

      const hoverBoundingRect = ref.current.getBoundingClientRect();

      const hoveredMiddleHeight =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const mouseYRelativeToHovered = mouseY - hoverBoundingRect.top;
      const isMouseYAboveHoveredMiddleHeight =
        mouseYRelativeToHovered < hoveredMiddleHeight;
      const isMouseYBelowHoveredMiddleHeight =
        mouseYRelativeToHovered > hoveredMiddleHeight;

      if (
        (isDraggedItemAboveHovered && isMouseYAboveHoveredMiddleHeight) ||
        (isDraggedItemBelowHovered && isMouseYBelowHoveredMiddleHeight)
      ) {
        return;
      }

      handleDropHover(dragIndex, hoverIndex);

      item.index = hoverIndex;
    },
    drop: (item: DragItem) => {
      if (!item || item.from === task.column) {
        return;
      }

      task.column = item.from;

      return;
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  drag(drop(ref));

  return { ref, isDragging };
}
