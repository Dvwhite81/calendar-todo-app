interface CategoryPageProps {
  category: string;
}

const CategoryPage = ({ category }: CategoryPageProps) => {
  return (
    <div className="page">
      <h2 className="pad-left">{category}</h2>
      <p>Searched Category: {category}</p>
    </div>
  );
};

export default CategoryPage;
