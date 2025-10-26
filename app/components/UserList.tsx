'use client';
import { useEffect, useRef, useState, type FC } from "react";
import type { User, Users } from "../types/types";

// ✅ Base user list
const initialUsers: Users = [
  {
    id: 1,
    name: "Leanne Graham",
    email: "kD2jW@example.com",
    username: "Bret",
    password: "password",
  },
  {
    id: 2,
    name: "Ervin Howell",
    email: "Tn2M9@example.com",
    username: "Antonette",
    password: "password",
  },
  {
    id: 3,
    name: "Clementine Bauch",
    email: "Tn2M9@example.com",
    username: "Samantha",
    password: "password",
  },
  {
    id: 4,
    name: "Patricia Lebsack",
    email: "Tn2M9@example.com",
    username: "Karianne",
    password: "password",
  },
  {
    id: 5,
    name: "Chelsey Dietrich",
    email: "Tn2M9@example.com",
    username: "Kamren",
    password: "password",
  },
];

export const UserComponent: FC = () => {
  const [usersList, setUsersList] = useState<Users>(initialUsers);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  // Edit form refs
  const editNameRef = useRef<HTMLInputElement>(null);
  const editEmailRef = useRef<HTMLInputElement>(null);
  const editUsernameRef = useRef<HTMLInputElement>(null);
  const editPasswordRef = useRef<HTMLInputElement>(null);

  // Load from localStorage on client side only
  useEffect(() => {
    queueMicrotask(() => {
      const stored = localStorage.getItem("users");
      if (stored) {
        setUsersList(JSON.parse(stored));
      }
      setIsLoaded(true);
    });
  }, []);


  // Save to localStorage whenever usersList changes (only after initial load)
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("users", JSON.stringify(usersList));
    }
  }, [usersList, isLoaded]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (
      nameRef.current &&
      emailRef.current &&
      usernameRef.current &&
      passwordRef.current
    ) {
      const newUser: User = {
        id: usersList.length + 1,
        name: nameRef.current.value,
        email: emailRef.current.value,
        username: usernameRef.current.value,
        password: passwordRef.current.value,
      };

      setUsersList(prev => [...prev, newUser]);

      nameRef.current.value = "";
      emailRef.current.value = "";
      usernameRef.current.value = "";
      passwordRef.current.value = "";
    }
  }

  function handleDelete(id: number) {
    setUsersList(prev => prev.filter(user => user.id !== id));

    if (editingUser?.id === id) {
      setEditingUser(null);
      setIsEditing(false);
    }
  }

  // Handle Edit functionality
  function handleEdit(user: User) {
    setEditingUser(user);
    setIsEditing(true);

    // Set timeout to ensure refs are available after render
    setTimeout(() => {
      if (editNameRef.current) editNameRef.current.value = user.name;
      if (editEmailRef.current) editEmailRef.current.value = user.email;
      if (editUsernameRef.current) editUsernameRef.current.value = user.username;
      if (editPasswordRef.current) editPasswordRef.current.value = user.password;
    }, 0);
  }

  function handleUpdate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (
      editingUser &&
      editNameRef.current &&
      editEmailRef.current &&
      editUsernameRef.current &&
      editPasswordRef.current
    ) {
      const updatedUser: User = {
        ...editingUser,
        name: editNameRef.current.value,
        email: editEmailRef.current.value,
        username: editUsernameRef.current.value,
        password: editPasswordRef.current.value,
      };

      setUsersList(usersList.map(user =>
        user.id === editingUser.id ? updatedUser : user
      ));

      // Reset edit state
      setEditingUser(null);
      setIsEditing(false);
    }

    // Reset form values
    if (editNameRef.current) editNameRef.current.value = "";
    if (editEmailRef.current) editEmailRef.current.value = "";
    if (editUsernameRef.current) editUsernameRef.current.value = "";
    if (editPasswordRef.current) editPasswordRef.current.value = "";
  }

  function handleCancelEdit() {
    setEditingUser(null);
    setIsEditing(false);

    // Reset form values
    if (editNameRef.current) editNameRef.current.value = "";
    if (editEmailRef.current) editEmailRef.current.value = "";
    if (editUsernameRef.current) editUsernameRef.current.value = "";
    if (editPasswordRef.current) editPasswordRef.current.value = "";
  }

  // Show loading state until localStorage data is loaded
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <div className="text-white text-lg">Loading users...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3">
            User Management
          </h1>
          <p className="text-gray-400 text-lg sm:text-xl">
            Add and manage users in the system
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 xl:gap-12">
          {/* Form Section - Toggle between Add and Edit */}
          <div className="lg:sticky lg:top-6 lg:h-fit">
            <form
              onSubmit={isEditing ? handleUpdate : handleSubmit}
              className="bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 p-6 sm:p-8"
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 text-center">
                {isEditing ? "Edit User" : "Add New User"}
              </h2>

              <div className="space-y-4 sm:space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Enter full name"
                    ref={isEditing ? editNameRef : nameRef}
                    autoComplete="name"
                    required
                    className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter email address"
                    ref={isEditing ? editEmailRef : emailRef}
                    autoComplete="email"
                    required
                    className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>

                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
                    Username
                  </label>
                  <input
                    id="username"
                    type="text"
                    placeholder="Choose a username"
                    ref={isEditing ? editUsernameRef : usernameRef}
                    autoComplete="username"
                    required
                    className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    placeholder={isEditing ? "Enter new password" : "Create a password"}
                    ref={isEditing ? editPasswordRef : passwordRef}
                    autoComplete={isEditing ? "new-password" : "new-password"}
                    required
                    className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>

                <div className="flex gap-3">
                  {isEditing && (
                    <button
                      type="button"
                      onClick={handleCancelEdit}
                      className="flex-1 bg-gray-600 text-white font-semibold rounded-xl py-3 px-4 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
                    >
                      Cancel
                    </button>
                  )}
                  <button
                    type="submit"
                    className={`${isEditing ? 'flex-1' : 'w-full'} bg-linear-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl py-3 px-4 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg`}
                  >
                    {isEditing ? "Update User" : "Add User"}
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* User List Section */}
          <div>
            <div className="bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 p-6 sm:p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-white">
                  Users ({usersList.length})
                </h2>
                <div className="flex items-center gap-3">
                  {isEditing && (
                    <span className="bg-yellow-600 text-white text-sm font-medium px-3 py-1 rounded-full animate-pulse">
                      Editing: {editingUser?.name}
                    </span>
                  )}
                  <span className="bg-blue-600 text-white text-sm font-medium px-3 py-1 rounded-full">
                    Total: {usersList.length}
                  </span>
                </div>
              </div>

              <div className="grid gap-4 sm:gap-5">
                {usersList.map((user) => (
                  <div
                    key={user.id}
                    className={`bg-gray-750 rounded-xl border p-5 sm:p-6 hover:shadow-lg transition-all duration-200 group ${editingUser?.id === user.id
                      ? 'border-yellow-500 border-2'
                      : 'border-gray-600 hover:border-gray-500'
                      }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors">
                            {user.name}
                          </h3>
                          <span className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded-full">
                            ID: {user.id}
                          </span>
                          {editingUser?.id === user.id && (
                            <span className="bg-yellow-600 text-white text-xs px-2 py-1 rounded-full animate-pulse">
                              Editing...
                            </span>
                          )}
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-gray-300">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <span className="text-sm">{user.email}</span>
                          </div>

                          <div className="flex items-center gap-2 text-gray-300">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            <span className="text-sm">@{user.username}</span>
                          </div>

                          <div className="flex items-center gap-2 text-gray-400">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                            <span className="text-sm font-mono">••••••••</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex sm:flex-col gap-2 sm:gap-1">
                        <button
                          onClick={() => handleEdit(user)}
                          disabled={isEditing && editingUser?.id !== user.id}
                          className={`text-xs px-3 py-1 rounded-lg transition-colors ${isEditing && editingUser?.id !== user.id
                            ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                            : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                            }`}
                        >
                          {editingUser?.id === user.id ? 'Editing...' : 'Edit'}
                        </button>
                        <button
                          onClick={() => handleDelete(user.id)}
                          disabled={isEditing}
                          className={`text-xs px-3 py-1 rounded-lg transition-colors ${isEditing
                            ? 'bg-red-800 text-red-200 cursor-not-allowed'
                            : 'bg-red-600 hover:bg-red-700 text-white'
                            }`}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {usersList.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-gray-400 text-lg">No users found</div>
                  <div className="text-gray-500 text-sm mt-2">Add a new user to get started</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};