import { Provider } from 'react-redux'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { AppLayout } from './AppLayout'
import { DetailPage } from './pages/DetailPage'
import { ListPage } from './pages/ListPage'
import store from './store'

const queryClient = new QueryClient()

export const App = () => (
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <AppLayout>
        <BrowserRouter>
          <Switch>
            <Route path="/detail/:id" component={DetailPage} />
            <Route path="/" component={ListPage} />
          </Switch>
        </BrowserRouter>
      </AppLayout>
    </Provider>
  </QueryClientProvider>
)
