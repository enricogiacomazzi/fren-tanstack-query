import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRef } from 'react';

const url = 'http://localhost:3000/todos';

export const Todos = () => {
    const inputRef = useRef();
    const mutation = useMutation({
        mutationFn: title => axios.post(url,{title, done: false})
    });
    const queryClient = useQueryClient();
    const {data, isLoading} = useQuery({
        queryKey: ['todos'],
        queryFn: () => axios.get(url).then(x => x.data)
      });

    const add = async e => {
        if(e.key !== 'Enter') {
            return;
        }
        const title = inputRef.current.value;
        mutation.mutate(title, {
            onSuccess: data => {
                // const newTodo = data.data;
                // queryClient.setQueryData(
                //     ['todos'], old => [...old, newTodo])
                queryClient.invalidateQueries(['todos']);
            }
        });

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