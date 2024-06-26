import { Textarea, TextareaProps } from '@chakra-ui/react';
import { forwardRef } from 'react';
import ResizeTextarea from 'react-textarea-autosize';

// eslint-disable-next-line react/display-name
export const AutoResizeTextArea = forwardRef<
  HTMLTextAreaElement,
  TextareaProps
>((props, ref) => {
  return <Textarea as={ResizeTextarea} minH="unset" ref={ref} {...props} />;
});
