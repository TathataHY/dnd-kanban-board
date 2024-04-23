import { ColumnType } from '@/utils/enums';
import { AddIcon } from '@chakra-ui/icons';
import {
  Badge,
  Box,
  Heading,
  IconButton,
  ScaleFade,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';
import useColumnTask from '@/hooks/useColumnTask';
import { useColumnDrop } from '@/hooks/useColumnDrop';
import Task from './Task';

const ColumnColorScheme: Record<ColumnType, string> = {
  [ColumnType.TO_DO]: 'gray',
  [ColumnType.IN_PROGRESS]: 'blue',
  [ColumnType.BLOCKED]: 'red',
  [ColumnType.COMPLETED]: 'green',
};

export const Column = ({ column }: { column: ColumnType }) => {
  const { tasks, addTask, updateTask, deleteTask, dropTaskFrom, swapTasks } =
    useColumnTask(column);
  const { drop, isOver } = useColumnDrop(column, dropTaskFrom);

  const ColumnTasks = tasks.map((task, index) => (
    <Task
      key={task.id}
      index={index}
      task={task}
      onUpdate={updateTask}
      onDelete={deleteTask}
      onDropHover={swapTasks}
    />
  ));

  return (
    <ScaleFade in={true} unmountOnExit>
      <Box>
        <Heading fontSize="md" mb={4} letterSpacing="wide">
          <Badge
            px={2}
            py={1}
            rounded="lg"
            colorScheme={ColumnColorScheme[column]}
          >
            {column}
          </Badge>
        </Heading>
        <IconButton
          size="xs"
          w="full"
          color={useColorModeValue('gray.500', 'gray.400')}
          bgColor={useColorModeValue('gray.100', 'gray.700')}
          _hover={{ bgColor: useColorModeValue('gray.200', 'gray.600') }}
          py={2}
          variant="solid"
          colorScheme="black"
          aria-label="add-task"
          icon={<AddIcon />}
          onClick={addTask}
        />
        <Stack
          ref={drop}
          direction={{ base: 'row', md: 'column' }}
          h={{ base: 300, md: 600 }}
          p={4}
          mt={2}
          spacing={4}
          bgColor={useColorModeValue('gray.50', 'gray.900')}
          rounded="lg"
          boxShadow="md"
          overflow="auto"
          opacity={isOver ? 0.85 : 1}
        >
          {ColumnTasks}
        </Stack>
      </Box>
    </ScaleFade>
  );
};
