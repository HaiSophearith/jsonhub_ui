import { Outlet } from "react-router"
import FooterComponent from "../components/FooterComponent"
import NavbarComponent from "../components/NavbarComponent"

const Layout = () => {
    return (
        <>
            <NavbarComponent />
            <Outlet />
            <FooterComponent />
        </>
    )
}
export default Layout