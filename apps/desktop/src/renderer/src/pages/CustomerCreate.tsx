import { type FormEvent, useEffect, useState } from 'react'
import { Trash2 } from 'lucide-react'

import { Customer, customerApi } from '../features/customers/api/customerApi'

type CustomerForm = {
  name: string
  cpf: string
  phone: string
  email: string
  birthdate: string
  state: string
  city: string
  address: string
  reference: string
}

const initialForm: CustomerForm = {
  name: '',
  cpf: '',
  phone: '',
  email: '',
  birthdate: '',
  state: '',
  city: '',
  address: '',
  reference: ''
}

export function CustomerCreate(): React.JSX.Element {
  const [form, setForm] = useState<CustomerForm>(initialForm)

  const [loading, setLoading] = useState(false)

  const [message, setMessage] = useState<string | null>(null)

  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const [customers, setCustomers] = useState<Customer[]>([])

  function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = event.target

    setForm((current) => ({
      ...current,
      [name]: value
    }))
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setLoading(true)
    setMessage(null)
    setErrorMessage(null)

    try {
      await customerApi.create({
        name: form.name,
        cpf: form.cpf || undefined,
        phone: form.phone,
        email: form.email || undefined,
        birthdate: form.birthdate || undefined,
        state: form.state || undefined,
        city: form.city || undefined,
        address: form.address || undefined,
        reference: form.reference || undefined
      })

      setMessage('Cliente cadastrado com sucesso.')

      setForm(initialForm)
      loadClients()
    } catch (error) {
      console.error(error)

      setErrorMessage(
        error instanceof Error ? error.message : 'Não foi possível cadastrar o cliente.'
      )
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(id: string) {
    setLoading(true)
    setMessage(null)
    setErrorMessage(null)

    try {
      await customerApi.delete(id)

      setMessage('Cliente removido com sucesso.')
      setForm(initialForm)
      loadClients()
    } catch (error) {
      console.error(error)

      setErrorMessage(
        error instanceof Error ? error.message : 'Não foi possível deletar o cliente.'
      )
    } finally {
      setLoading(false)
    }
  }

  async function loadClients() {
    const customers = await customerApi.list()

    setCustomers(customers)
  }

  useEffect(() => {
    void loadClients()
  }, [])

  return (
    <div className="mx-auto max-w-5xl">
      <header>
        <p className="text-sm font-medium text-blue-600">Clientes</p>

        <h1 className="mt-1 text-3xl font-bold text-slate-900">Novo cliente</h1>

        <p className="mt-2 text-slate-500">Cadastre as informações do cliente.</p>
      </header>

      <form
        onSubmit={handleSubmit}
        className="mt-8 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm"
      >
        <section>
          <h2 className="text-lg font-semibold text-slate-900">Dados pessoais</h2>

          <div className="mt-5 grid grid-cols-2 gap-5">
            <Field
              label="Nome"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Nome completo"
              required
            />

            <Field
              label="CPF"
              name="cpf"
              value={form.cpf}
              onChange={handleChange}
              placeholder="000.000.000-00"
            />

            <Field
              label="Telefone"
              name="phone"
              value={form.phone}
              onChange={(event) => {
                const value = event.target.value.replace(/\D/g, '')

                setForm((current) => ({
                  ...current,
                  phone: value
                }))
              }}
              placeholder="(00) 00000-0000"
              required
            />

            <Field
              label="E-mail"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="cliente@email.com"
            />

            <Field
              label="Data de nascimento"
              name="birthdate"
              type="date"
              value={form.birthdate}
              onChange={handleChange}
            />

            <Field
              label="Referência"
              name="reference"
              value={form.reference}
              onChange={handleChange}
              placeholder="Próximo a..."
            />
          </div>
        </section>

        <section className="py-5">
          <h2 className="text-lg font-semibold text-slate-900">Endereço</h2>

          <div className="mt-5 grid grid-cols-2 gap-5">
            <Field
              label="Estado"
              name="state"
              value={form.state}
              onChange={handleChange}
              placeholder="SP"
            />

            <Field
              label="Cidade"
              name="city"
              value={form.city}
              onChange={handleChange}
              placeholder="São Paulo"
            />

            <div className="col-span-2">
              <Field
                label="Endereço"
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Rua, número e bairro"
              />
            </div>
          </div>
        </section>

        {message && (
          <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            {message}
          </div>
        )}

        {errorMessage && (
          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {errorMessage}
          </div>
        )}

        <div className="mt-8 flex justify-end gap-3">
          <button
            type="button"
            onClick={() => setForm(initialForm)}
            className="rounded-xl border cursor-pointer border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            Limpar
          </button>

          <button
            type="submit"
            disabled={loading}
            className="rounded-xl cursor-pointer bg-blue-600 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? 'Salvando...' : 'Cadastrar cliente'}
          </button>
        </div>
      </form>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full table-auto text-left text-sm text-slate-700">
            <thead className="bg-slate-100 text-xs uppercase tracking-wide text-slate-600">
              <tr>
                <th className="px-5 py-4 font-semibold">Nome</th>
                <th className="px-5 py-4 font-semibold">CPF</th>
                <th className="px-5 py-4 font-semibold">Telefone</th>
                <th className="px-5 py-4 font-semibold">E-mail</th>
                <th className="px-5 py-4 font-semibold">Dt. Nascimento</th>
                <th className="px-5 py-4 font-semibold">Estado</th>
                <th className="px-5 py-4 font-semibold">Cidade</th>
                <th className="px-5 py-4 font-semibold">Referência</th>
                <th className="px-5 py-4 font-semibold">Ações</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-200">
              {customers.map((customer: Customer) => (
                <tr key={customer.id} className="transition-colors hover:bg-slate-50">
                  <td className="whitespace-nowrap px-5 py-4 font-medium text-slate-900">
                    {customer.name}
                  </td>

                  <td className="whitespace-nowrap px-5 py-4">{customer.cpf}</td>

                  <td className="whitespace-nowrap px-5 py-4">{customer.phone}</td>

                  <td className="whitespace-nowrap px-5 py-4">{customer.email}</td>

                  <td className="whitespace-nowrap px-5 py-4">
                    {customer.birthdate && new Date(customer.birthdate).toLocaleDateString('pt-BR')}
                  </td>

                  <td className="whitespace-nowrap px-5 py-4">{customer.state}</td>

                  <td className="whitespace-nowrap px-5 py-4">{customer.city}</td>

                  <td className="max-w-56 truncate px-5 py-4">{customer.reference}</td>

                  <td>
                    <button
                      type="button"
                      onClick={() => handleDelete(customer.id)}
                      title="Excluir cliente"
                      aria-label={`Excluir ${customer.name}`}
                      className="
                        cursor-pointer
                        inline-flex h-9 w-9 items-center justify-center
                        rounded-lg
                        text-slate-400
                        transition
                        hover:bg-red-50
                        hover:text-red-600
                      "
                    >
                      <Trash2 size={18} strokeWidth={1.8} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

type FieldProps = {
  label: string
  name: string
  value: string
  type?: string
  placeholder?: string
  required?: boolean

  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

function Field({
  label,
  name,
  value,
  type = 'text',
  placeholder,
  required,
  onChange
}: FieldProps): React.JSX.Element {
  return (
    <label className="block">
      <span className="text-sm font-medium text-slate-700">
        {label}

        {required && <span className="ml-1 text-red-500">*</span>}
      </span>

      <input
        name={name}
        type={type}
        value={value}
        required={required}
        onChange={onChange}
        placeholder={placeholder}
        className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
      />
    </label>
  )
}
