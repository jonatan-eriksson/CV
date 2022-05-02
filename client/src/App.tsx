import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
// import './App.css';
import Document from './views/document/Document';
import DocumentEdit from './views/document/DocumentEdit';
import Layout from './views/Layout';
import NotFound from './views/NotFound';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path='document/:id' element={<Document />} />
          <Route path="document/:id/edit" element={<DocumentEdit />} />
          <Route path="document/new" element={<DocumentEdit />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
