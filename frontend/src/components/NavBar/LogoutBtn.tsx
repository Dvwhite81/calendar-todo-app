interface LogoutBtnProps {
  handleLogout: () => void;
}

const LogoutBtn = ({ handleLogout }: LogoutBtnProps) => {
  return (
    <button
      type="button"
      className="btn"
      id="logout-btn"
      onClick={handleLogout}
    >
      Log Out
    </button>
  );
};

export default LogoutBtn;
