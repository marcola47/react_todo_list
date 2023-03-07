import React, { useState, useEffect, useRef } from 'react';
import { v4 } from 'uuid';
import './css/app.css';

import TodosList from './components/list';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList } from '@fortawesome/free-solid-svg-icons';

export const ListItemsContext = React.createContext();

export default function App() 
{
  const [listItems, setListItems] = useState([]);
  const [activeTodos, setActiveTodos] = useState(0);
  const itemTextRef = useRef();

  function countActiveTodos()
  {
    let totalActiveTodos = 0;

    listItems.forEach(item => {if (item.active === true) totalActiveTodos++;})
    setActiveTodos(totalActiveTodos);
  }

  function addListItem()
  {
    let text = itemTextRef.current.value;
    if (text === '') return;

    const newItem = {id: v4(), text: text, active: true};
    const newItems = [...listItems, newItem];
    setListItems(newItems);
    
    itemTextRef.current.value = ""; 
    countActiveTodos();
  }

  function handleKeyDown(e)
  {
    if (e.key === "Enter")
      addListItem();
  }

  function TodosCounter()
  {
    // do this every time there is any change to the counter component
    useEffect(() => {countActiveTodos()}, []);
  
    if (listItems.length > 0)
    {
      return ( 
        <div className='total-todos' id='total-todos'>
          <div>Total to-dos: <span className='highlight'>{listItems.length}</span></div>
          <div>Active to-dos: <span className='highlight'>{activeTodos}</span></div>
        </div>
      )
    }
  }

  return (
    <div className="app">
      <div className='app-title'><h1>TO-DO LIST</h1><FontAwesomeIcon icon={faList}></FontAwesomeIcon></div>

      <div className='inputs'>
        <input id='input-text' onKeyDown={handleKeyDown} ref={itemTextRef} type="text" placeholder='To-do'/>
        <button id='input-submit' onClick={addListItem}>ADD ITEM</button> 
      </div>

      <div className='container'>
        <TodosCounter/>
      
        <ListItemsContext.Provider value={{ listItems, setListItems }}>
            <TodosList listItems={listItems}/>
        </ListItemsContext.Provider>
      </div>
    </div>
  );
};
