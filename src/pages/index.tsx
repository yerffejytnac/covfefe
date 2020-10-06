import styled from "styled-components";
import { gql } from "graphql-request";

import { Layout } from "@components";
import { useQuery, graphQLRequest } from "../../lib";

const Root = styled.main`
  min-height: 100vh;
  font-family: ${(props) => props.theme.fonts.monospace};
  padding: 1rem;

  & h3 {
    font-family: ${(props) => props.theme.fonts.body};
    font-weight: 600;
    font-size: 1rem;
    line-height: 1.3;
    margin-bottom: 1rem;
  }
`;

const QUERY = gql`
  {
    menuCollection(limit: 1) {
      items {
        title
        description
        categoriesCollection(limit: 5) {
          items {
            title
            menuItemsCollection {
              items {
                title
              }
            }
          }
        }
      }
    }
  }
`;

const IndexPage = () => {
  const { data, error, isLoading, isValidating } = useQuery(QUERY);

  if (error) console.error(error);

  return (
    <Layout>
      <Root>
        <pre
          children={JSON.stringify(
            { isLoading, isValidating, error, data },
            null,
            2
          )}
        />
      </Root>
    </Layout>
  );
};

export const getServerSideProps = async () => {
  const data = await graphQLRequest(QUERY);

  return {
    props: {
      data,
    },
  };
};

export default IndexPage;
