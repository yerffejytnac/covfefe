import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { gql } from "graphql-request";

import { Layout } from "@components";
import { useQuery, graphQLRequest } from "../../lib";

const Root = styled.main`
  font-family: ${(props) => props.theme.fonts.body};
  min-height: 100vh;
  padding: 1rem;

  dl {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
  }
`;

const Category = styled.div`
  grid-template-columns: 1fr;
  gap: 0.5rem;

  & dt {
    font-weight: 600;
    font-size: 1rem;
    line-height: 1.3;
    margin-bottom: 0.25rem;
  }

  & dd {
    border: 1px solid blue;
  }
`;

const MenuContainer = styled(motion.ul)`
  border: 1px solid green;
  display: grid;
  gap: 0.25rem;
`;

const MenuItem = styled(motion.li)`
  border: 1px solid red;
  opacity: 0;
`;

const QUERY = gql`
  {
    menuCollection(limit: 1, where: { id_in: "Main" }) {
      items {
        title
        description
        categoriesCollection(limit: 5) {
          items {
            sys {
              id
            }
            title
            menuItemsCollection {
              items {
                sys {
                  id
                }
                title
                description
              }
            }
          }
        }
      }
    }
  }
`;

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0 },
};

const IndexPage = () => {
  const { data, error } = useQuery(QUERY);

  if (error) console.error(error);
  if (!data) return null;

  const collectionKey = Object.keys(data)[0];
  const menu = data[collectionKey].items[0];

  const categoriesCollection = menu?.categoriesCollection?.items;
  const categories = categoriesCollection.map((c: any) => {
    return {
      id: c.sys.id,
      title: c.title,
      items:
        c.menuItemsCollection.items.map((i: any) => ({
          id: i.sys.id,
          title: i.title,
          description: i.description,
        })) ?? [],
    };
  });

  return (
    <Layout>
      <Root>
        <dl>
          {categories.map((c: any) => {
            return (
              <Category key={c.id}>
                <dt>{c.title}</dt>
                <dd>
                  <MenuContainer
                    variants={container}
                    initial="hidden"
                    animate="visible"
                  >
                    <AnimatePresence>
                      {c.items.map((i: any) => {
                        return (
                          <MenuItem variants={item} key={i.id} layout>
                            {i.title}
                          </MenuItem>
                        );
                      })}
                    </AnimatePresence>
                  </MenuContainer>
                </dd>
              </Category>
            );
          })}
        </dl>
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
