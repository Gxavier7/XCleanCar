import { useState } from 'react'

import { AppLayout } from './components/layout/AppLayout'
import { Dashboard } from './pages/DashBoard'
import { CustomerCreate } from './pages/CustomerCreate'
import { CarCreate } from './pages/CarCreate'

export type Page = 'dashboard' | 'customers' | 'cars'

function App(): React.JSX.Element {
  const [page, setPage] = useState<Page>('dashboard')

  const renderPage = () => {
    switch (page) {
      case 'customers':
        return <CustomerCreate />

      case 'cars':
        return <CarCreate />

      default:
        return <Dashboard onNavigate={setPage} />
    }
  }

  return (
    <AppLayout currentPage={page} onNavigate={setPage}>
      {renderPage()}
    </AppLayout>
  )
}

export default App
