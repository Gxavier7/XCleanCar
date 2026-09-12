import { Customer, customerApi } from '@renderer/features/customers/api/customerApi'
import { type FormEvent, useEffect, useState } from 'react'

type CarForm = {
  plate: string
  brand: string
  model: string
  year: string
  color: string
  mileage: string
  customerId: string
  notes: string
}

const initialForm: CarForm = {
  plate: '',
  brand: '',
  model: '',
  year: '',
  color: '',
  mileage: '',
  customerId: '',
  notes: ''
}

export function CarCreate(): React.JSX.Element {
  const [form, setForm] = useState<CarForm>(initialForm)
  const [customers, setCustomers] = useState<Customer[]>([])

  function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.target

    setForm((current) => ({
      ...current,
      [name]: value
    }))
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    console.log('Carro:', form)
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
        <p className="text-sm font-medium text-blue-600">Veículos</p>

        <h1 className="mt-1 text-3xl font-bold text-slate-900">Novo veículo</h1>

        <p className="mt-2 text-slate-500">Cadastre um veículo e relacione-o ao cliente.</p>
      </header>

      <form
        onSubmit={handleSubmit}
        className="mt-8 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm"
      >
        <section>
          <h2 className="text-lg font-semibold text-slate-900">Dados do veículo</h2>

          <div className="mt-5 grid grid-cols-3 gap-5">
            <CarField
              label="Placa"
              name="plate"
              value={form.plate}
              onChange={handleChange}
              placeholder="ABC1D23"
              required
            />

            <CarField
              label="Marca"
              name="brand"
              value={form.brand}
              onChange={handleChange}
              placeholder="Toyota"
              required
            />

            <CarField
              label="Modelo"
              name="model"
              value={form.model}
              onChange={handleChange}
              placeholder="Corolla"
              required
            />

            <CarField
              label="Ano"
              name="year"
              type="number"
              value={form.year}
              onChange={handleChange}
              placeholder="2024"
            />

            <CarField
              label="Cor"
              name="color"
              value={form.color}
              onChange={handleChange}
              placeholder="Prata"
            />

            <CarField
              label="Quilometragem"
              name="mileage"
              type="number"
              value={form.mileage}
              onChange={handleChange}
              placeholder="45000"
            />
          </div>
        </section>

        <div className="py-5 border-t border-slate-200" />

        <section>
          <h2 className="text-lg font-semibold text-slate-900">Proprietário</h2>

          <div className="mt-5">
            <select
              value={form.customerId}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  state: event.target.value
                }))
              }
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="">Selecione o Cliente</option>

              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.name}
                </option>
              ))}
            </select>
          </div>
        </section>

        <div className="my-8 border-t border-slate-200" />

        <section>
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Observações</span>

            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              rows={4}
              placeholder="Informações adicionais sobre o veículo..."
              className="mt-2 w-full resize-none rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
          </label>
        </section>

        <div className="mt-8 flex justify-end gap-3">
          <button
            type="button"
            onClick={() => setForm(initialForm)}
            className="rounded-xl border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Limpar
          </button>

          <button
            type="submit"
            className="rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-blue-500"
          >
            Cadastrar veículo
          </button>
        </div>
      </form>
    </div>
  )
}

type CarFieldProps = {
  label: string
  name: string
  value: string
  type?: string
  placeholder?: string
  required?: boolean

  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

function CarField({
  label,
  name,
  value,
  type = 'text',
  placeholder,
  required,
  onChange
}: CarFieldProps): React.JSX.Element {
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
        className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
      />
    </label>
  )
}
