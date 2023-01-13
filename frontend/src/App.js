import './App.css';
import {Routes, Route, useParams} from "react-router-dom";
import Layout from "./components/layout/Layout";
import DatePicker from "./components/datepicker/DatePicker";
import Groups from './pages/Groups/Groups';
import Group from './pages/Group/Group';
import VoteList from "./components/vote/VoteList";
import Profile from "./components/profile/Profile";
import Profileedit from "./components/profileedit/Profileedit";
import VoteForm from "./components/vote/VoteForm";
import Pairs2 from './pages/Pairs2/Pairs2';
import GroupsFromPairs from './pages/GroupsFromPairs/GroupsFromPairs';


function App() {
  let { id } = useParams();
  return (
    <Layout>
      <Routes>
          <Route path="/calendar" element={<DatePicker />}/>
          <Route path="/review" element={<div>Код ревью</div>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="profileedit" element={<Profileedit/>}/>
          <Route path="/lectures" element={<div>Материалы лекции</div>}/>
          <Route path="/chats" element={<div>Чаты</div>}/>
          <Route path="/votes" element={<VoteList />}/>
          <Route path="/votes/create" element={<VoteForm />}/>
          <Route path="/pairs" element={<GroupsFromPairs/>}/>
          <Route path="/pairs">
          <Route path=":id" element={<Pairs2/>}/>
          </Route>
          <Route path="/groups" element={<Groups/>}/>
          <Route path="/groups">
          <Route path=":id" element={<Group/>}/>
          </Route>
          <Route path="/wiki" element={<div>Вики</div>}/>
      </Routes>
    </Layout>
  );
}

export default App;
