"use client";
import { useEffect, useState } from "react";
import { apiClient } from "@/api/axios";
import { Users, Shield, Coins, Search, Edit2, X, Save } from "lucide-react";

interface User {
  id: string;
  email: string;
  name: string;
  nickname?: string;
  role: string;
  group?: string;
  remaining_coin: number;
  created_at: string;
}

interface EditingUser {
  id: string;
  name: string;
  nickname: string;
  role: string;
  remaining_coin: number;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingUser, setEditingUser] = useState<EditingUser | null>(null);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await apiClient.get("/users");
      setUsers(res.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (user: User) => {
    setEditingUser({
      id: user.id,
      name: user.name,
      nickname: user.nickname || "",
      role: user.role,
      remaining_coin: user.remaining_coin,
    });
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
  };

  const handleSaveEdit = async () => {
    if (!editingUser) return;

    try {
      setUpdating(true);
      await apiClient.patch(`/users/admin/${editingUser.id}`, {
        name: editingUser.name,
        nick_name: editingUser.nickname || null,
        role_id: editingUser.role,
        remaining_coin: editingUser.remaining_coin,
      });

      // Update local state
      setUsers(users.map(u =>
        u.id === editingUser.id
          ? { ...u, name: editingUser.name, nickname: editingUser.nickname, role: editingUser.role, remaining_coin: editingUser.remaining_coin }
          : u
      ));

      setEditingUser(null);
      alert("User updated successfully!");
    } catch (error: any) {
      console.error("Error updating user:", error);
      alert(error.response?.data?.message || "Failed to update user");
    } finally {
      setUpdating(false);
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.nickname && user.nickname.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white text-lg">Loading users...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">User Management</h1>
          <p className="text-gray-400 mt-1">View and manage all user accounts</p>
        </div>
      </div>

      <div className="bg-gray-900 rounded-lg p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search users by email, name, or nickname..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <div className="bg-gray-900 rounded-lg p-6">
          <Users className="w-8 h-8 text-blue-500 mb-2" />
          <p className="text-3xl font-bold text-white">{users.length}</p>
          <p className="text-sm text-gray-400">Total Users</p>
        </div>
        <div className="bg-gray-900 rounded-lg p-6">
          <Shield className="w-8 h-8 text-purple-500 mb-2" />
          <p className="text-3xl font-bold text-white">
            {users.filter((u) => u.role === "ADMIN").length}
          </p>
          <p className="text-sm text-gray-400">Admins</p>
        </div>
        <div className="bg-gray-900 rounded-lg p-6">
          <Coins className="w-8 h-8 text-yellow-500 mb-2" />
          <p className="text-3xl font-bold text-white">
            {users.reduce((sum, u) => sum + u.remaining_coin, 0).toFixed(0)}
          </p>
          <p className="text-sm text-gray-400">Total Coins</p>
        </div>
        <div className="bg-gray-900 rounded-lg p-6">
          <Coins className="w-8 h-8 text-green-500 mb-2" />
          <p className="text-3xl font-bold text-white">
            {(users.reduce((sum, u) => sum + u.remaining_coin, 0) / users.length).toFixed(0)}
          </p>
          <p className="text-sm text-gray-400">Avg Coins/User</p>
        </div>
      </div>

      <div className="bg-gray-900 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Group
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Coins
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Joined
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {filteredUsers.map((user) => {
                const isEditing = editingUser?.id === user.id;

                return (
                  <tr key={user.id} className={`transition-colors ${isEditing ? 'bg-gray-800' : 'hover:bg-gray-800'}`}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {isEditing ? (
                        <div className="space-y-2">
                          <input
                            type="text"
                            value={editingUser.name}
                            onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                            className="w-full px-2 py-1 bg-gray-700 border border-gray-600 rounded text-sm text-white focus:ring-2 focus:ring-blue-500"
                            placeholder="Name"
                          />
                          <input
                            type="text"
                            value={editingUser.nickname}
                            onChange={(e) => setEditingUser({ ...editingUser, nickname: e.target.value })}
                            className="w-full px-2 py-1 bg-gray-700 border border-gray-600 rounded text-sm text-white focus:ring-2 focus:ring-blue-500"
                            placeholder="Nickname"
                          />
                        </div>
                      ) : (
                        <div>
                          <p className="text-sm font-medium text-white">{user.name}</p>
                          {user.nickname && (
                            <p className="text-sm text-gray-400">@{user.nickname}</p>
                          )}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user.group ? (
                        <span className="px-2 py-1 bg-blue-600 text-white rounded-full text-xs font-medium">
                          {user.group}
                        </span>
                      ) : (
                        <span className="text-sm text-gray-500">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {isEditing ? (
                        <select
                          value={editingUser.role}
                          onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}
                          className="px-2 py-1 bg-gray-700 border border-gray-600 rounded text-xs text-white focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="USER">USER</option>
                          <option value="ADMIN">ADMIN</option>
                        </select>
                      ) : (
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            user.role === "ADMIN"
                              ? "bg-purple-600 text-white"
                              : "bg-gray-700 text-gray-300"
                          }`}
                        >
                          {user.role}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {isEditing ? (
                        <input
                          type="number"
                          value={editingUser.remaining_coin}
                          onChange={(e) => setEditingUser({ ...editingUser, remaining_coin: parseFloat(e.target.value) })}
                          className="w-24 px-2 py-1 bg-gray-700 border border-gray-600 rounded text-sm text-white focus:ring-2 focus:ring-blue-500"
                        />
                      ) : (
                        <div className="flex items-center space-x-1">
                          <Coins className="w-4 h-4 text-yellow-500" />
                          <span className="text-sm font-medium text-white">
                            {user.remaining_coin.toFixed(0)}
                          </span>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                      {new Date(user.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {isEditing ? (
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={handleSaveEdit}
                            disabled={updating}
                            className="p-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white rounded transition-colors"
                          >
                            <Save className="w-4 h-4" />
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            disabled={updating}
                            className="p-1 bg-gray-600 hover:bg-gray-700 disabled:bg-gray-600 text-white rounded transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleEdit(user)}
                          className="p-1 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
