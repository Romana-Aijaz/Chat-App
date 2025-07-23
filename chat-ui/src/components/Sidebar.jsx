const Sidebar = ({ users, onSelectUser, selectedUserId }) => {
  return (
    <div className="w-64 bg-white border-r h-full overflow-y-auto">
      <h2 className="text-xl font-semibold p-4 border-b">Users</h2>
      <ul>
        {users.map((user) => (
          <li
            key={user.id}
            onClick={() => onSelectUser(user)}
            className={`flex items-center p-4 cursor-pointer hover:bg-gray-100 ${
              selectedUserId === user.id ? 'bg-gray-200' : ''
            }`}
          >
            <img
              src='https://randomuser.me/api/portraits/women/25.jpg'
              alt={user.name}
              className="w-8 h-8 rounded-full object-cover mr-3"
            />
            <div className="flex-1">
              <p className="font-medium">{user.name}</p>
            </div>
            {/* Status Dot */}
            <div
              className={`w-3 h-3 rounded-full ${
                user.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
              }`}
            ></div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
