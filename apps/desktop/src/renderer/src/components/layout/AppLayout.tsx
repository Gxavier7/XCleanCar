import type { ReactNode } from 'react'

import { Sidebar } from './Sidebar'
import type { Page } from '../../App'

type AppLayoutProps = {
  children: ReactNode
  currentPage: Page
  onNavigate: (page: Page) => void
}

export function AppLayout({
  children,
  currentPage,
  onNavigate
}: AppLayoutProps): React.JSX.Element {
  return (
    <div className="min-h-screen bg-slate-100">
      <Sidebar currentPage={currentPage} onNavigate={onNavigate} />

      <main className="ml-64 min-h-screen p-8">{children}</main>
    </div>
  )
}
