import { SyntheticEvent } from 'react';
import { Container } from 'react-bootstrap';
import { UserType } from '../utils/types';
import Search from '../components/Search';

interface HomeProps {
  query: string
  setQuery: (value: string) => void
  handleSubmit: (e: SyntheticEvent) => void
  loggedInUser: UserType | null
}

const Home = ({
  query,
  setQuery,
  handleSubmit,
}: HomeProps) => {
  return (
    <Container fluid>
      <Search query={query} setQuery={setQuery} handleSubmit={handleSubmit} />
    </Container>
  );
};

export default Home;
