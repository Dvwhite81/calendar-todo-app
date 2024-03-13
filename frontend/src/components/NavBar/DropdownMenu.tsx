import { NavDropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

interface DropdownMenuProps {
  handleClick: () => void
}

const DropdownMenu = ({ handleClick }: DropdownMenuProps) => {
  const navigate = useNavigate();

  const handleLinkClick = (category: string) => {
    navigate(`/categories/${category}`);
    handleClick();
  };

  const dummyCategories = [
    'category 1',
    'category 2',
    'category 3',
    'category 4',
    'category 5',
    'category 6',
  ];

  return (
    <>
      {dummyCategories.map((category) => (
        <NavDropdown.Item
          key={category}
          style={{ marginTop: '1rem', textAlign: 'center',  }}
          onClick={handleClick}
        >
          <p
            key={category}
            style={{ color: 'whitesmoke' }}
            onClick={() => handleLinkClick(category)}
          >
            {category}
          </p>
        </NavDropdown.Item>
      ))}
    </>
  );
};

export default DropdownMenu;
