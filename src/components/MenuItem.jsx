
const MenuItem = ({ handleClick, label }) => {
  return (
    <div className="menu_item" onClick={handleClick}>
        {label}
    </div>
  );
};

export default MenuItem;
