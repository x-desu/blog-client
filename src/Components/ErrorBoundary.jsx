import { useRouteError } from "react-router-dom"
import RootLayout from "../layouts/RootLayout";

const ErrorBoundary = () => {
    const error = useRouteError();
    
    if(error.status === 404){
        return(
            <div>
                <h1>404 - Page Not Found</h1>
                <p>The page you are looking for does not exist.</p>
            </div>
        )
    }
  return (
    <>
    <RootLayout/>
    <div>
        <h1>Something went wrong</h1>
        <p>{error.statusText || error.message || "An unexpected error occurred."}</p>
    </div>
    </>
  )
}

export default ErrorBoundary