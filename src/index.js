import { createRoot } from 'react-dom/client'

import './index.css'
import Todo from './components/todo'

const container = document.querySelector('#root')
const root = createRoot(container)

root.render(<Todo />)
