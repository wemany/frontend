import Categories from "./CategoriesSection";
import CommunitiesByUserSection from "../CommunitiesByUserSection";

const DashboardSidebarContent = () => {
    return (
        <>
            {/** Navigation Items */}
            <CommunitiesByUserSection />
            {/* Categorías */}
            <Categories />
        </>
    )
}

export default DashboardSidebarContent;