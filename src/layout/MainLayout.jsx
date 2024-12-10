import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/header/Header";

const MainLayout = () => {
    const location = useLocation();
    const isHomePage = location.pathname === "/";

    return (
        <>
            {isHomePage ? (
                <Header image={"./avatar.png"} name={"ali safaa"} type={"Front-end"} />
            ) : (
                <Header />
            )}
            <Outlet />
        </>
    );
};

export default MainLayout;
