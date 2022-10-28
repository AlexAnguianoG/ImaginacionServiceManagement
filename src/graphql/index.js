import { client } from '../index';

export const useQuery = async (query, params) => {
  const { data, errors } = await client.query({
    query,
    variables: params,
    fetchPolicy: 'no-cache',
  });

  return { data, errors };
};

export const useMutation = async (mutation, params) => {
  try {
    const { data } = await client.mutate({
      mutation,
      variables: params,
    });
    return { data, errors: null };
  } catch ({ graphQLErrors }) {
    return { data: null, errors: graphQLErrors };
  }
};
