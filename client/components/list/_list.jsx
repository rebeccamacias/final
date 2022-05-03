import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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
  const [searchResults, setSearchResults] = useState({items: []});
  const [searchInput, setSearchInput] = useState("");
  const [selectVal, setSelectVal] = useState("");
  const [searchResultMap, setSearchResultMap] = useState(<option></option>);

  useEffect(async () => {
    const res = await api.get('/users/me');
    setUser(res.user);
    setLoading(false);
    // const listIdNum = parseInt(listId)
    // console.log(listIdNum)
    console.log(listId)
    const { items } = await api.get(`/items/${listId}`);
    console.log(items)
    // setItems([{id: 1, name: "potato"}, {id: 2, name: "potato2"}, {id: 3, name: "potato3"}, {id: 4, name: "steve"}]);
    setItems(items)
  }, []);

  useEffect(() => {
    console.log(searchResults)
    const result = searchResults.items.map((result)=>{
      return (<option value={result.id} key={result.id}>{result.title}</option>);
    });
    setSearchResultMap(result)
  },[searchResults]) 

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
  const search = async () => {
    if (searchInput == "") return;

    // Make api call and save 
    const apiResult = await api.get('/itemsresults?searchBarContents=' + searchInput);
    setSearchResults(apiResult);
    if (apiResult.length > 0){
      setSelectVal(apiResult[0].id)
    }
  };

  // Add item to list from options
  const addItem = async () =>{
    if (!selectVal) return;

    console.log(selectVal)
    let item = searchResults.items.find((item) => {
      return item.id === parseInt(selectVal);
    })
    const itemsBody = {
      name: item.title,
      quantity: 1,
      groceryListId: listId,
      isPurchased: false,
    };

    ({ item } = await api.post('/items',itemsBody));

    setItems([...items, item]);
  };

 

  return (
    <div className="p-4">
      <h1>Welcome {user.firstName}</h1>
        {itemsMap}
        <Input type="text" value={searchInput} onChange={(e)=> {setSearchInput(e.target.value);}} placeholder="Search for item"></Input>
        <Button type="button" onClick={search}>Search for items</Button>
        <label htmlFor="searchResults">Pick a result to add</label>
        <select name="searchResults" id="searchResults" value={selectVal} onChange={e => setSelectVal(e.currentTarget.value)}>
          {searchResultMap}
        </select>
        <Button onClick={addItem}>Add selected item to list</Button>
    </div>
  );
};