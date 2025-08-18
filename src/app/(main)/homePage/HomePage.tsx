import HeroSection from "./sections/HeroSection";

const HomePage = () => {
    return (
        <div className="min-h-screen w-full max-w-7xl m-auto bg-gray-950 pt-32 flex flex-col items-center justify-center">
            <HeroSection />
        </div>
    );
}

export default HomePage;