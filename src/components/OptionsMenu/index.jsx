import { useState } from "react";
import "../../assets/styles/index.scss"
import './styles.scss'

export default function OptionsMenu() {
    const [isOpen, setIsOpen] = useState(false)

    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }
	return (
		<>
		<div className="options-menu">
      <button onClick={toggleMenu} className="options-button">
         Опции
      </button>
      {isOpen && (
        <ul className="dropdown">
          <li className="dropdown-item">
            <img src="https://www.svgrepo.com/show/379384/export.svg" alt="" style={{ width: '20%'}} />
            Экспорт
          </li>
          <li className="dropdown-item">
          <img src="https://www.svgrepo.com/show/379357/download.svg" alt="" style={{ width: '20%'}} />
            Импорт
          </li>
        </ul>
      )}
    </div>
		</>
	);
};