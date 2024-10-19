import { useState, useContext, useEffect } from "react";

import ClientsAddForm from "../../components/ClientsAddForm";
import ClientsHeader from "../../components/ClientsHeader";
import ClientsPopup from "../../components/ClientsPopup";
import Client from "../../components/Client";

import { appContext } from "../../context";

import "../../assets/styles/index.scss"
import "./styles.scss"
import mockData from "./mockData";

export default function Clients() {
  // const { setIsActiveMenu } = useContext(appContext);
  const [isAddFormVisible, setIsAddFormVisible] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [clientsPerPage] = useState(3);
  const [currentClients, setCurrentClients] = useState([]);

  useEffect(() => {
    const indexOfLastClient = currentPage * clientsPerPage;
    const indexOfFirstClient = indexOfLastClient - clientsPerPage;
    const currentClients = mockData.data.Clients.slice(indexOfFirstClient, indexOfLastClient);
    setCurrentClients(currentClients);
  }, [currentPage]);

  const totalClients = mockData.data.Clients.length;
  const totalPages = Math.ceil(totalClients / clientsPerPage);

  const handleCheckMore = (client) => {
    isPopupVisible(true)
		setSelectedClient(client);
	};
  return (
    <>
      <ClientsHeader setIsPopup={setIsAddFormVisible} />
      <div className="clients">
        <div className="clients__container scrollbar">
          <div className="clients__table">
            <div className="clients__table-row">
              <span className="clients__table-header">Клиент</span>
              <span className="clients__table-header">Визиты</span>
              <span className="clients__table-header">Оплачено</span>
              <span className="clients__table-header">Средний чек</span>
              <span className="clients__table-header">Последний визит</span>
              <span className="clients__table-header">День рождения</span>
            </div>
            {currentClients.map(client => (
              <Client
                key={client.clientid}
                checkMore={() => setIsPopupVisible(prev => !prev) && handleCheckMore(client.clientid) }
                src="client-1.png" 
                name={client.name}
                phone={client.phone}
                visits={client.visits}
                payed={client.payed}
                averageCheck={client.AverageCheck}
                lastVisit={client.lastVisit}
                date={client.date}
              />
            ))}
          </div>
        </div>
        <div className="clients__pagination">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              className={`clients__pagination-button ${currentPage === index + 1 ? 'active' : ''}`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
      <button onClick={() => setIsAddFormVisible(prev => !prev)} className="clients__add">
        <svg className="clients__add-icon" height="24" width="24">
          <use xlinkHref="/src/assets/icons/Header_Sprite.svg#icon-header-add" />
        </svg>
        Добавить клиента
      </button>

      <ClientsAddForm isVisible={isAddFormVisible} setIsVisible={setIsAddFormVisible} />
      <ClientsPopup isVisible={isPopupVisible} setIsVisible={setIsPopupVisible} />
    </>
  );
}
