import type { Page } from '../../App'

type SidebarProps = {
  currentPage: Page
  onNavigate: (page: Page) => void
}

type MenuItem = {
  id: Page
  label: string
  description: string
}

const menuItems: MenuItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    description: 'Visão geral'
  },
  {
    id: 'customers',
    label: 'Clientes',
    description: 'Cadastro de clientes'
  },
  {
    id: 'cars',
    label: 'Carros',
    description: 'Cadastro de veículos'
  }
]

export function Sidebar({ currentPage, onNavigate }: SidebarProps): React.JSX.Element {
  return (
    <aside className="fixed left-0 top-0 flex h-screen w-64 flex-col border-r border-slate-800 bg-slate-950 text-white">
      <div className="border-b border-slate-800 px-6 py-6">
        <div className="text-xl font-bold">Minha Oficina</div>

        <div className="mt-1 text-sm text-slate-400">Sistema de gestão</div>
      </div>

      <nav className="flex-1 space-y-2 p-4">
        {menuItems.map((item) => {
          const active = currentPage === item.id

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate(item.id)}
              className={`
                w-full rounded-xl px-4 py-3 text-left transition
                ${
                  active
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                }
              `}
            >
              <div className="font-medium">{item.label}</div>

              <div className={`mt-0.5 text-xs ${active ? 'text-blue-100' : 'text-slate-500'}`}>
                {item.description}
              </div>
            </button>
          )
        })}
      </nav>

      <div className="border-t border-slate-800 p-5">
        <div className="text-sm font-medium">Sistema local</div>

        <div className="mt-1 text-xs text-slate-500">Electron + SQLite</div>
      </div>
    </aside>
  )
}
