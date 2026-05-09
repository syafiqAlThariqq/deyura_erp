import { useAuth } from '../context/AuthContext';

function Navbar() {

    const { user, logout } = useAuth();

    return (

        <header className="bg-white shadow px-6 py-4 flex justify-between items-center">

            <div>
                <h2 className="text-2xl font-bold">
                    Dashboard
                </h2>
            </div>

            <div className="flex items-center gap-4">

                <input
                    type="text"
                    placeholder="Search..."
                    className="border rounded-xl px-4 py-2"
                />

                <div className="text-right">
                    <p className="font-semibold">
                        {user?.name}
                    </p>

                    <p className="text-sm text-gray-500">
                        {user?.role}
                    </p>
                </div>

                <button
                    onClick={logout}
                    className="bg-red-500 text-white px-4 py-2 rounded-xl"
                >
                    Logout
                </button>

            </div>

        </header>

    );
}

export default Navbar;