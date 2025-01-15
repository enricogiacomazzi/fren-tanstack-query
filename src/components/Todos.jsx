import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useRef } from 'react';

const url = 'http://localhost:3000/todos';

export const Todos = () => {
    const inputRef = useRef();
    const {data, isLoading} = useQuery({
        queryKey: ['todos'],
        queryFn: () => axios.get(url).then(x => x.data)
      });

    const add = e => {
        if(e.key !== 'Enter') {
            return;
        }
        const title = inputRef.current.value;
        console.log(title);

        inputRef.current.value = '';
    }

    
      if(isLoading) {
        return (
          <h1>...</h1>
        )
      }
    
      return (
        <>
            <input type="text"  ref={inputRef} placeholder="new todo" onKeyDown={add} />
            <ul>
                {data.map(u => (
                    <li key={u.id} className={u.done ? 'done' : ''}>
                        {u.title}
                    </li>
                ))}
            </ul>
        </>

      )





}