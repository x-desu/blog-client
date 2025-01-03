import { useLocation } from "react-router-dom";

const NotFound = () => {
    const location = useLocation();
    const errorMessage = location.state?.errorMessage;
    return (
        <div className="flex flex-col h-screen items-center justify-center gap-4">
      <div className="flex items-center gap-4">
        <h1 className="text-8xl">404</h1>
        <span className="text-6xl">|</span>
        <p className="text-2xl flex-wrap w-96 text-center">{errorMessage || "Oops! The page you are looking for does not exist."}</p>
        </div>
        <div>
        <a href="/" className="text-xl hover:scale-110 transition-all">Go Back to Home</a>
      </div>
        </div>
    );
  };
  
  export default NotFound;
  