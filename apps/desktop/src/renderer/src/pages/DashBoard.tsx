import { useEffect, useState } from 'react'

import type { Page } from '../App'
import { customerApi } from '../features/customers/api/customerApi'

type DashboardProps = {
  onNavigate: (page: Page) => void
}

export function Dashboard({ onNavigate }: DashboardProps): React.JSX.Element {
  const [customerCount, setCustomerCount] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadDashboard() {
      try {
        const customers = await customerApi.list()

        setCustomerCount(customers.length)
      } catch (error) {
        console.error('Erro ao carregar dashboard:', error)
      } finally {
        setLoading(false)
      }
    }

    loadDashboard()
  }, [])

  return (
    <div className="mx-auto max-w-7xl">
      <header>
        <p className="text-sm font-medium text-blue-600">Visão geral</p>

        <h1 className="mt-1 text-3xl font-bold text-slate-900">Dashboard</h1>

        <p className="mt-2 text-slate-500">Acompanhe os principais dados da aplicação.</p>
      </header>

      <section className="mt-8 grid grid-cols-3 gap-6">
        <DashboardCard
          title="Clientes"
          value={loading ? '...' : customerCount.toString()}
          description="Clientes cadastrados"
        />

        <DashboardCard title="Veículos" value="0" description="Veículos cadastrados" />

        <DashboardCard title="Ordens abertas" value="0" description="Serviços em andamento" />
      </section>

      <section className="mt-8 grid grid-cols-2 gap-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Ações rápidas</h2>

          <p className="mt-1 text-sm text-slate-500">Acesse os cadastros mais utilizados.</p>

          <div className="mt-6 space-y-3">
            <QuickAction
              title="Cadastrar cliente"
              description="Adicionar um novo cliente"
              onClick={() => onNavigate('customers')}
            />

            <QuickAction
              title="Cadastrar veículo"
              description="Adicionar um veículo ao sistema"
              onClick={() => onNavigate('cars')}
            />
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Atividades recentes</h2>

          <p className="mt-1 text-sm text-slate-500">Últimas movimentações do sistema.</p>

          <div className="mt-8 flex min-h-40 items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50">
            <p className="text-sm text-slate-400">Nenhuma atividade registrada.</p>
          </div>
        </div>
      </section>
    </div>
  )
}

type DashboardCardProps = {
  title: string
  value: string
  description: string
}

function DashboardCard({ title, value, description }: DashboardCardProps): React.JSX.Element {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-sm font-medium text-slate-500">{title}</p>

      <p className="mt-3 text-4xl font-bold text-slate-900">{value}</p>

      <p className="mt-2 text-sm text-slate-400">{description}</p>
    </div>
  )
}

type QuickActionProps = {
  title: string
  description: string
  onClick: () => void
}

function QuickAction({ title, description, onClick }: QuickActionProps): React.JSX.Element {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center justify-between rounded-xl border border-slate-200 p-4 text-left transition hover:border-blue-300 hover:bg-blue-50"
    >
      <div>
        <div className="font-medium text-slate-800">{title}</div>

        <div className="mt-1 text-sm text-slate-500">{description}</div>
      </div>

      <span className="text-xl text-slate-400">→</span>
    </button>
  )
}
