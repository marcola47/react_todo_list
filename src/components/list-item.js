import { useContext } from 'react';
import ListItemText from './list-item-text';

import { ListItemsContext } from '../app';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';

export default function ListItem({ listItem })
{
  const { listItems, setListItems } = useContext(ListItemsContext);

  function handleTextChange(newText) 
  {
    const placeholderItems = listItems.map((item) => 
    {
      if (item.id === listItem.id) 
        return { ...item, text: newText }
      
      return item;
    });

    setListItems(placeholderItems);
  }
  
  function removeListItem() 
  {
    const listItemElement = document.getElementById(listItem.id);
  
    listItemElement.classList.add('li-removing');
    setTimeout(() => {setListItems((listItems) => listItems.filter((item) => item.id !== listItem.id))}, 400);
  }

  function checkListItem(event)
  {
    const parent = event.target.parentNode;
    parent.classList.toggle('todo-completed');

    const placeholderItems = listItems.map((item) => 
    {
      if (item.id === listItem.id && item.active === true) 
        return { ...item, active: false }
      
      else if (item.id === listItem.id && item.active === false)
        return { ...item, active: true }

      return item;
    });

    setListItems(placeholderItems);
  }

  return (
    <div className='li' id={listItem.id}>
      <ListItemText type="text" value={listItem.text} onChange={handleTextChange}/>
      <div className='li-complete' onClick={checkListItem}><FontAwesomeIcon icon={faCheckSquare}></FontAwesomeIcon></div>
      <div className='li-remove' onClick={removeListItem}><FontAwesomeIcon icon={faTrashCan}></FontAwesomeIcon></div>
    </div>
  )
}
