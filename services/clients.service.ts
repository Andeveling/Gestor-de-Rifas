import { TCreateClient, TClient } from "@/types/client.types";

export const createClient = async (data: TCreateClient): Promise<TClient | undefined> => {
  try {
    const response = await fetch("/api/clients", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result: TClient = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const getClients = async (): Promise<TClient[] | undefined> => {
  try {
    const response = await fetch("/api/clients");
    const result: TClient[] = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}

export const getClient = async (id: string): Promise<TClient | undefined> => {
  try {
    const response = await fetch(`/api/clients/${id}`);
    const result: TClient = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}
export const updateClient = async (data: TClient): Promise<TClient | undefined> => {
  try {
    const response = await fetch("/api/clients", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result: TClient = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}

export const deleteClient = async (id: string): Promise<TClient | undefined> => {
  try {
    const response = await fetch("/api/clients", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    const result: TClient = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}