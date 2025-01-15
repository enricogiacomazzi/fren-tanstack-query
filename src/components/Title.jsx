import { useQuery } from '@tanstack/react-query';

export const Title = () => {
    const {data, isLoading, isError, error} = useQuery({
        queryKey: ['users']
      });

    return (
        <h1>elementi: {data?.length ?? 0}</h1>
    )
}