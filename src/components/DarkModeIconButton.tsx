import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { IconButton, useColorMode } from '@chakra-ui/react';
import { ComponentPropsWithoutRef } from 'react';

export const DarkModeIconButton = ({
  ...props
}: ComponentPropsWithoutRef<typeof IconButton>) => {
  const { colorMode, toggleColorMode } = useColorMode();

  const isDark = colorMode === 'dark';

  return (
    <IconButton
      icon={isDark ? <MoonIcon /> : <SunIcon />}
      onClick={toggleColorMode}
      {...props}
      aria-label={'dark-mode-toggle'}
    />
  );
};
