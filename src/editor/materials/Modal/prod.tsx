import { forwardRef, useImperativeHandle, useState } from "react"
import { Modal as AntdModal } from 'antd';
import { CommonComponentProps } from "../../interface"

export interface ModalRef {
  open: () => void
  close: () => void
}

export default forwardRef<ModalRef, CommonComponentProps>((props, ref) => {
  const { children, title, onOk, onCancel, styles } = props;

  const [open, setOpen] = useState(false);

  useImperativeHandle(ref, () => {
    return {
      open: () => {
        setOpen(true)
      },
      close: () => {
        setOpen(false);
      }
    }
  }, [])

  return (
    <AntdModal
      title={title}
      style={styles}
      open={open}
      onCancel={() => {
        onCancel && onCancel();
        setOpen(false)
      }}
      onOk={() => {
        onOk && onOk();
        setOpen(false)
      }}
      destroyOnClose
    >{children}</AntdModal>
  )
})
