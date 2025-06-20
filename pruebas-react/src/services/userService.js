const API_URL = "https://reqres.in/api/users";

export async function fetchUsers(page = 1) {
  const res = await fetch(`${API_URL}?page=${page}`);
  if (!res.ok) throw new Error("Error al obtener usuarios");
  return res.json();
}

export async function fetchUser(id) {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error("Error al obtener usuario");
  return res.json();
}

export async function createUser(data) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error al crear usuario");
  return res.json();
}
