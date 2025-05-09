import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import UsersPage from "./screens/users.page.tsx";
import {
    createBrowserRouter,
    Link,
    Outlet,
    RouterProvider,
} from "react-router-dom";
import { TeamOutlined, FireOutlined, AudioOutlined, BookOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import "./App.scss";
import TracksPage from "./screens/tracks.page.tsx";
import CommentsPage from './screens/comments.page.tsx';

const items: MenuProps["items"] = [
    {
        label: <Link to={"/"}>Home</Link>,
        key: "home",
        icon: <FireOutlined />,
    },
    {
        label: <Link to="/users">Manage Users</Link>,
        key: "users",
        icon: <TeamOutlined />,
    },
    {
        label: <Link to='/tracks'>Manage Tracks</Link>,
        key: 'tracks',
        icon: <AudioOutlined />,
    },
    {
        label: <Link to='/comments'>Manage Comments</Link>,
        key: 'comments',
        icon: <BookOutlined />,
    },
];

const Header = () => {
    const [current, setCurrent] = useState("home");
    const onClick: MenuProps["onClick"] = (e) => {
        setCurrent(e.key);
    };

    return (
        <Menu
            onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            items={items}
        />
    );
};

const LayoutAdmin = () => {

    const getData = async () => {
        const res = await fetch(
            "http://localhost:8000/api/v1/auth/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: "hoidanit@gmail.com",
                    password: "123456"
                })
            })
        const d = await res.json();
        if (d.data) {
            localStorage.setItem("access_token", d.data.access_token);
        }
    }
    useEffect(() => {
        getData();
    }, [])


    return (
        <div>
            <Header />
            <Outlet />
        </div>
    );
};

const router = createBrowserRouter([
    {
        path: "/",
        element: <LayoutAdmin />,
        children: [
            { index: true, element: <App /> },
            {
                path: "users",
                element: <UsersPage />,
            },
            {
                path: "tracks",
                element: <TracksPage />,
            },
            {
                path: "comments",
                element: <CommentsPage />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
