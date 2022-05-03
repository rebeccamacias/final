import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { ApiContext } from '../../utils/api_context';
import { AuthContext } from '../../utils/auth_context';
import { RolesContext } from '../../utils/roles_context';
import { Button } from '../common/button';
import { Link } from 'react-router-dom';

export const Home = () => {
  const [, setAuthToken] = useContext(AuthContext);
  const api = useContext(ApiContext);
  const roles = useContext(RolesContext);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [newList, setNewList] = useState("");
  const [lists, setLists] = useState([]);
  useEffect(async () => {
    const res = await api.get('/users/me');
    setUser(res.user);
    setLoading(false);
    // Get lists
    // this call is for testing purposes only.
    // let groceryApiResults = await api.get('/itemsresults?searchBarContents=pizza');

    const dummy = [{id: 1, name: "dummy1"},{id: 2, name: "dummy2"},{id: 3, name: "dummy3"},{id: 4, name: "dummy4"},]
    setLists(dummy);
  }, []);

  const logout = async () => {
    const res = await api.del('/sessions');
    if (res.success) {
      setAuthToken(null);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  // Create a list
  const createList = ()=>{
    if (newList === '') {
      return;
    };
    const groceryListBody =  {
      name: newList,
    };
    const { list } = await api.post('/grocery_lists', groceryListBody);
    setLists([...lists,list]);
  };

  // Get items, then map them here
  const listMap = lists.map((list) =>{
    return (
    <div>
          <Link to={`/lists/${list.id}`} className="border-2 rounded-lg p-1 px-1
          underline text-blue-600 hover:text-blue-800 visited:text-purple-600">{list.name}</Link>
    </div>)
});

  return (
    <div className="p-4">
      <h1>Welcome {user.firstName}</h1>
      <Input type="text" value={newList} onChange={(e)=> {setNewList(e.target.value);}}>New List Name</Input>
      <Button type="button" onClick={createList}>Create new list</Button>

      {listMap}

      <Button type="button" onClick={logout}>
        Logout
      </Button>
      {roles.includes('admin') && (
        <Button type="button" onClick={() => navigate('/admin')}>
          Admin
        </Button>
      )}
    </div>
  );
};
