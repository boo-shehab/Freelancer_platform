import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";

const MainLayout = () => {
    return (
        <>
            <Header />
            <Outlet />
        </>
    )
}

export default MainLayout;