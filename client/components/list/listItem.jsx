import { useState, useContext } from 'react';
import { ApiContext } from '../../utils/api_context';
export const Item = ({ item }) => {
  const api = useContext(ApiContext);
  const [checkboxChecked, setCheckboxChecked] = useState(todo.isComplete);

  const onCheckboxChange = async (e) => {
    setCheckboxChecked(e.target.checked);
    const ItemsBodyWithId =  {
        id: item.id,
      }
    await api.put(`/items/${item.id}`,ItemsBodyWithId);
  };

  return (
    <div className="p-4 border-2 border-gray-500 rounded">
      <input type="checkbox" checked={checkboxChecked} onChange={onCheckboxChange} /> {item.name}
    </div>
  );
};