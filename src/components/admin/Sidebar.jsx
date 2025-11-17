import React from "react";
import { Menu } from "antd";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
    const location = useLocation(); // Get current path
    // Map pathnames to menu keys
    const pathToKey = {
        "/admin/inquiry": "inquiry",
        "/admin/system-setup": "system-setup",
        "/admin/dashboard": "dashboard",
    };

    const currentKey = pathToKey[location.pathname] || "inquiry";

    return (
        <div style={{ height: "100vh" }}>
            <Menu
                selectedKeys={[currentKey]}
                mode="vertical"
                theme="dark"
                className="vh-100 p-3"
            >
                <h4 className="text-center mb-4">Admin Panel</h4>
                <Menu.Item key="dashboard">
                    <Link to="/admin/dashboard" className="text-decoration-none">
                        <span>Dashboard</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="inquiry">
                    <Link to="/admin/inquiry" className="text-decoration-none">
                        <span>Customer Inquiry</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="system-setup">
                    <Link to="/admin/system-setup" className="text-decoration-none">
                        <span>System Setup</span>
                    </Link>
                </Menu.Item>
            </Menu>
        </div>
    );
}
