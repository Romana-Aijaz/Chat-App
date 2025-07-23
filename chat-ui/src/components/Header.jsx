
const Header = ({ user, onSignOut }) => {
  return (
    <header className="flex items-center justify-between px-6 py-3 bg-white shadow">
      <div className="flex items-center gap-3">
        <span className="relative">
          <img
            src='https://randomuser.me/api/portraits/women/25.jpg'
            alt={user.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
        </span>
        <div>
          <p className="font-medium text-gray-800">{user.name}</p>
          <p className="text-sm text-gray-500">Online</p>
        </div>
      </div>
      <button
        onClick={onSignOut}
        className="text-red-500 hover:text-red-600 font-semibold"
      >
        Sign Out
      </button>
    </header>
  );
};

export default Header;
