import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { ApiContext } from '../../utils/api_context';
import { AuthContext } from '../../utils/auth_context';
import { RolesContext } from '../../utils/roles_context';
import { Button } from '../common/button';

export const List = () => {
  const [, setAuthToken] = useContext(AuthContext);
  const api = useContext(ApiContext);
  const roles = useContext(RolesContext);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [items, setItems] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  useEffect(async () => {
    const res = await api.get('/users/me');
    setUser(res.user);
    setLoading(false);
    // Get items for list
    // let groceryApiResults = await api.get('/itemsresults?searchBarContents=pizza');
  }, []);


  // Add item to list

  if (loading) {
    return <div>Loading...</div>;
  }
  // Get items, then map them here
  const itemsMap = items.map((item) =>{
      return (
      <div>
            <h1>{item.name}</h1>
            <Button>Remove item from list, or mark as done. change later</Button>
      </div>)
  });

  // get search results, then map as such
  const searchResultsMap = searchResults.map((result)=>{
    return (<option value={result}>{result.desc}</option>);
  });
  return (
    <div className="p-4">
      <h1>Welcome {user.firstName}</h1>
        {itemsMap}
        <input>Search for item</input>
        <label for="searchResults">Pick a result to add</label>
        <select name="searchResults" id="searchResults">
          {searchResultsMap}
        </select>
    </div>
  );
};