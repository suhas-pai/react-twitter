import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/messages')({
  component: () => <div>Hello /messages!</div>,
})
