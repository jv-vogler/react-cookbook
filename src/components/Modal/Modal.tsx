import { ReactElement, ReactNode } from 'react'

import * as Dialog from '@radix-ui/react-dialog'
import * as VisuallyHidden from '@radix-ui/react-visually-hidden'

import cx from './Modal.module.css'

type ModalProps = {
  children: ReactNode
  title: string
  className?: string
  description?: string
  trigger?: ReactNode
}

const Modal = ({ className, children, description, title, trigger }: ModalProps) => {
  return (
    <Dialog.Root>
      {trigger ? <Dialog.Trigger asChild>{trigger}</Dialog.Trigger> : <DefaultTrigger />}
      <Dialog.Portal>
        <Dialog.Overlay className={cx.overlay} />
        <Dialog.Content className={cx.content} aria-labelledby={description}>
          <>
            <VisuallyHidden.Root asChild>
              <Dialog.Title>{title}</Dialog.Title>
            </VisuallyHidden.Root>
            <VisuallyHidden.Root asChild>
              <Dialog.Description>{description}</Dialog.Description>
            </VisuallyHidden.Root>
          </>
          <div className={className}>{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

const ModalCloseWrapper = ({ children }: { children: ReactElement<HTMLButtonElement> }) => {
  return <Dialog.Close asChild>{children}</Dialog.Close>
}

const DefaultTrigger = () => <Dialog.Trigger className={cx.trigger}>Open</Dialog.Trigger>

export { Modal, ModalCloseWrapper }
