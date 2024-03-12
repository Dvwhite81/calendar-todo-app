import { Container } from 'react-bootstrap';

interface CategoryPageProps {
  category: string
}

const CategoryPage = ({
  category,
}: CategoryPageProps) => {
  return (
    <Container fluid>
      <h2 className='pad-left'>{category}</h2>
      <p>Searched Category: {category}</p>
    </Container>
  );
};

export default CategoryPage;
