import './App.css';
import {Routes, Route} from "react-router-dom";
import Layout from "./components/layout/Layout";

function App() {
  return (
    <Layout>
      <Routes>
          <Route path="/calendar" element={<div>Календарь</div>}/>
          <Route path="/review" element={<div>Код ревью</div>}/>
          <Route path="/profile" element={<div>Профиль</div>}/>
          <Route path="/lectures" element={<div>Материалы лекции</div>}/>
          <Route path="/chats" element={<div>Чаты</div>}/>
          <Route path="/votes" element={<div>Голосования</div>}/>
          <Route path="/pairs" element={<div>Пары</div>}/>
          <Route path="/groups" element={<div>Группы</div>}/>
          <Route path="/wiki" element={<div>Вики</div>}/>
      </Routes>
    </Layout>
  );
}

export default App;
