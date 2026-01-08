import { RouterProvider } from 'react-router-dom'
import { router } from './routers'
import MainLayout from './layouts/MainLayout'
import { Container } from '@mui/material'

function App() {
  return (
    <MainLayout>
      <Container maxWidth='xl'>
        <RouterProvider router={router} />
      </Container>
    </MainLayout>
  )
}

export default App
