import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import { AuthLayout } from "../layouts/AuthLayout";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import ProtectedRoute from "./ProtectedRoute";
import { foldersLoader } from "../utils/folderUtils";
import NoteList from "../components/NoteList";
import { addNewNote, noteDetailLoader, notesLoader, updateNote } from "../utils/noteUtils";
import Note from "../components/Note";

export const router = createBrowserRouter([{
    element: <AuthLayout />,
    errorElement: <ErrorPage />,
    children: [
    {
        element: <Login />,
        path: "/login",
    },
     {
        element: <ProtectedRoute />,
        children: [
            {
                element: <Home />,
                path: "/",
                loader: foldersLoader,
                children: [
                    {
                        element: <NoteList />,
                        path: `folders/:folderId`,
                        loader: notesLoader,
                        action: addNewNote,
                        children: [
                            {
                                element: <Note />,
                                path: `note/:noteId`,
                                loader: noteDetailLoader,
                                action: updateNote,
                            },
                        ],
                    }
                ]
            },
        ]
    },
  ]
}]);
