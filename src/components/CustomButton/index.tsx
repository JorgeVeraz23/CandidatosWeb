import React, { ReactNode } from 'react';
import Button from '@mui/material/Button';
import { styled, useTheme, Theme } from '@mui/system';


interface StyleButtonProps {
  theme?: Theme;
  height?: string;
  width?: string;
  margin?: string;
  color?:
  'inherit'
  | 'primary'
  | 'secondary'
  | 'error'
  | 'info'
  | 'success'
  | 'warning'
}

interface CustomButtonProps extends StyleButtonProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement> | null) => void;
  child: ReactNode;
}

const MyButton = styled(Button)<StyleButtonProps>(({ color, height, width, margin }) => {
  const theme = useTheme();
  return {
    margin: margin || '0',
    minWidth: '16px',
    padding: '6px',
    height: height || 'auto',
    width: width || 'auto',
    backgroundColor: theme?.palette[color || 'primary']?.main || color || 'inherit',
    '&:hover': {
      backgroundColor: theme?.palette[color || 'primary']?.focus || color || 'inherit',
    },
  };
});

const Wrapper = styled('span')({
  color: 'white',
  lineHeight: '0',
  padding: '0',
  fontSize: '12px'
});

const CustomButton: React.FC<CustomButtonProps> = ({ onClick, color, height, width, margin, child }) =>
(
  <MyButton onClick={onClick} color={color} height={height} width={width} margin={margin}>
    <Wrapper>{child}</Wrapper>
  </MyButton>
);

export default CustomButton;