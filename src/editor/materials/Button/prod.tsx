import { Button as AntdButton } from 'antd';
import { CommonComponentProps } from '../../interface';
import { forwardRef } from 'react';


const Button = forwardRef<{}, CommonComponentProps>(({ id, type, text, styles, ...props}, ref) => {
  return (
    <AntdButton type={type} style={styles} {...props}>{text}</AntdButton>
  )
})

export default Button;
