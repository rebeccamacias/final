import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { ApiContext } from '../../utils/api_context';
import { AuthContext } from '../../utils/auth_context';
import { RolesContext } from '../../utils/roles_context';
import { Button } from '../common/button';
import { Link } from 'react-router-dom';

export const Home = () => {
  const api = useContext(ApiContext);

  const [lists, setLists] = useState([]);

  const [, setAuthToken] = useContext(AuthContext);
  const roles = useContext(RolesContext);

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');

  useEffect(async () => {
    const res = await api.get('/users/me');
    const { groceryLists } = await api.get('/grocery_lists/mine');
    setUser(res.user);
    setLists(groceryLists);
    setLoading(false);
    // Get lists
    // let groceryApiResults = await api.get('/itemsresults?searchBarContents=pizza');
  }, []);

  const logout = async () => {
    const res = await api.del('/sessions');
    if (res.success) {
      setAuthToken(null);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  // Create a list
  const createList = async (name) => {
    const listBody = {
      name: name,
    };
    const { groceryList } = await api.post('/lists', listBody);
    setLists([...groceryLists, groceryList]);
  };

  // Get items, then map them here
  // const listMap = lists.map((list) => {
  //   return (
  //   <div>
  //       <Link to={`/lists/${list.id}`} className="border-2 rounded-lg p-1 px-1 text-black">{list.name}</Link>
  //       <Button>Go to {list.name}</Button>
  //   </div>)
  // });

  return (
    <div className="p-4">
      <h1>Welcome {user.firstName}</h1>
      <input type="text" value={name} onChange={(e) => {setName(e.target.value)}} />
      <Button type="button" onClick={createList}>+</Button>

      {/* {listMap} */}

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
