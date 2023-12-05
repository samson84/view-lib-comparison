import type { ReactNode } from "react"

type VerticalBoxProps = {
  children: ReactNode
}

export default function VerticalBox({ children }: VerticalBoxProps) {

  return (
    <article className="shadow-lg border border-base-200 rounded-lg p-4">
      {children}
    </article>
  )
}