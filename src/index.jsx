import { createRoot } from 'react-dom/client';

import "./index.scss";

const CinemaExpressApplication = () => {
    return (
        <div className="cinema-express">
            <div>Good morning</div>
        </div>
    );
};

const container = document.querySelector("#root");
const root = createRoot(container);

root.render(<CinemaExpressApplication />);