import axios from 'axios'
import { useQuery } from '@tanstack/react-query';

const getData = async () => {
  const res = await axios.get('https://jsonplaceholder.typicode.com/users');
  return res.data;
}

export const List = () => {
    const {data, isLoading, isError, error} = useQuery({
        queryKey: ['users'],
        queryFn: getData
      });
    
      if(isLoading) {
        return (
          <h1>sto caricando, attendere...</h1>
        )
      }
    
      if(isError) {
        return <h1>errore: {error.message}</h1>
      }
    
      return (
        <ul>
          {data.map(u => <li key={u.id}>{u.name}</li>)}
        </ul>
      )
}