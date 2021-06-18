import './App.scss';
import image from '../assets/react.png'

export default function() {
    return (
        <div className="main">
                This is react typescipt app.
                <img src={image}></img>
        </div>
    );
}