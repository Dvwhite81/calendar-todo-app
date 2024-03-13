import { useNavigate } from 'react-router-dom';

interface DropdownMenuProps {
  handleClick: () => void;
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
    <div className="dropdown-menu">
      {dummyCategories.map((category) => (
        <li
          key={category}
          style={{ marginTop: '1rem', textAlign: 'center' }}
          onClick={handleClick}
        >
          <p
            key={category}
            style={{ color: 'var(--off-white)' }}
            onClick={() => handleLinkClick(category)}
          >
            {category}
          </p>
        </li>
      ))}
    </div>
  );
};

export default DropdownMenu;
