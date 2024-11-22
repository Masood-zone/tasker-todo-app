"use server";

import { db } from "@/lib/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { auth } from "./auth";
import { revalidatePath } from "next/cache";

export async function addTodo(prevState: unknown, data: FormData) {
  try {
    const task = data.get("task");
    const description = data.get("description");
    const priority = data.get("priority");
    const createdAt = new Date().getTime();

    // Get the current user's ID
    const session = await auth();
    const userId = session?.user?.email;

    if (!task || !userId) {
      throw new Error(`Missing required fields:
          ${!task ? "task" : ""}
          ${!description ? "Description" : ""}
          ${!userId ? "userId: you might want to login" : ""}
        `);
    }

    // Add a new todo to Firestore
    const docRef = await addDoc(collection(db, "todos"), {
      task,
      description,
      priority,
      completed: false,
      createdAt,
      userId,
    });

    revalidatePath("/");

    // Return success state
    return {
      success: true,
      message: "Todo added successfully",
      docId: docRef.id,
    };
  } catch (error) {
    console.error("Error adding todo: ", error);
    return { success: false, message: (error as Error).message };
  }
}

// Fetch all todos for the current user
export async function fetchTodos() {
  try {
    const session = await auth();
    const userId = session?.user?.email;

    if (!userId) {
      throw new Error("User not authenticated");
    }

    const querySnapshot = await getDocs(
      query(collection(db, "todos"), where("userId", "==", userId))
    );

    const todos = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      task: doc.data().task,
      description: doc.data().description,
      priority: doc.data().priority,
      completed: doc.data().completed,
      createdAt: doc.data().createdAt,
      ...doc.data(),
    }));

    return { success: true, todos };
  } catch (error) {
    console.error("Error fetching todos: ", error);
    return { success: false, message: (error as Error).message };
  }
}

//Toggle the completed status of a todo
export async function toggleTodoStatus(prevState: unknown, docId: string) {
  try {
    const todoRef = doc(db, "todos", docId);
    const todoSnapshot = await getDoc(todoRef);
    if (!todoSnapshot.exists()) {
      throw new Error("Todo not found");
    }

    const completed = !todoSnapshot.data().completed;
    await updateDoc(todoRef, { completed });
    revalidatePath("/");

    return { success: true, message: "Todo status updated successfully" };
  } catch (error) {
    console.error("Error updating todo status: ", error);
    return { success: false, message: (error as Error).message };
  }
}

// Update a todo for the current user
export async function updateTodo(prevState: unknown, data: FormData) {
  try {
    const docId = data.get("docId") as string;
    const task = data.get("task");
    const description = data.get("description");
    const completed = data.get("completed");
    const priorityData = data.get("priority");
    const priority = JSON.parse(priorityData as string);

    if (!docId) {
      throw new Error("Missing required fields: docId");
    }

    // Update the todo in Firestore
    const todoRef = doc(db, "todos", docId);
    await updateDoc(todoRef, {
      task,
      description,
      completed,
      priority,
    });
    revalidatePath("/");

    return { success: true, message: "Todo updated successfully" };
  } catch (error) {
    console.error("Error updating todo: ", error);
    return { success: false, message: (error as Error).message };
  }
}

// Create a removeTodo for the current user
export async function removeTodo(prevState: unknown, docId: string) {
  try {
    await deleteDoc(doc(db, "todos", docId));
    revalidatePath("/");
    return { success: true, message: "Todo removed successfully" };
  } catch (error) {
    console.error("Error removing todo: ", error);
    return { success: false, message: (error as Error).message };
  }
}
