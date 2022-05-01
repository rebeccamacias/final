import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { ApiContext } from '../../utils/api_context';
import { AuthContext } from '../../utils/auth_context';
import { RolesContext } from '../../utils/roles_context';
import { Button } from '../common/button';
import { Input} from '../common/input';
import { Item } from './listItem';

export const List = () => {
  const [, setAuthToken] = useContext(AuthContext);
  const api = useContext(ApiContext);

  const {listId} = useParams();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [items, setItems] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [selectVal, setSelectVal] = useState("");
  const [searchResultMap, setSearchResultMap] = useState(null);

  useEffect(async () => {
    const res = await api.get('/users/me');
    setUser(res.user);
    setLoading(false);
    const { items } = await api.get(`/items/${listId}`);
    setItems(items);
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
        <Item item={item} key={item.id}></Item>
      )
  });

  // Search bar
  const search = () => {
    if (searchInput == "") return;

    // Make api call and save 
    //const apiResult =
    //setSearchResults(apiResult)
    setSearchResultMap(searchResults.map((result)=>{
      return (<option value={result}>{result.desc}</option>);
    }));
  };

  // Add item to list from options
  const addItem = async () =>{
    if (selectVal = "") return;
    const itemsBody = {
      name: selectVal.desc,
      quantity: 1,
      groceryListId: listId,
      isPurchased: false,
    };

    const { itemCreated } = await api.post('/items',itemsBody);

    setItems([...items, itemCreated]);
  };


  return (
    <div className="p-4">
      <h1>Welcome {user.firstName}</h1>
        {itemsMap}
        <Input type="text" value={searchInput} onChange={(e)=> {setSearchInput(e.target.value);}} placeholder="Search for item"></Input>
        <Button type="button" onClick={saveProject}>Search for items</Button>
        <label for="searchResults">Pick a result to add</label>
        <select name="searchResults" id="searchResults" value={selectVal} onChange={e => setSelectVal(e.currentTarget.value)}>
          {searchResultMap}
        </select>
        <Button onClick={addItem}>Add selected item to list</Button>
    </div>
  );
};