import { useEffect, useState } from "react";
import "./styles.scss";
import mockData from "../../pages/Clients/mockData";

export default function ClientsPopup({ isVisible, setIsVisible }) {
	const [activeTab, setActiveTab] = useState(1);
	const [currentPage, setCurrentPage] = useState(1);
	const [clientsPerPage] = useState(3);
	const [clients, setClients] = useState([]); // Новый state для списка клиентов
	const [currentClient, setCurrentClient] = useState({});

	useEffect((clientId) => {
		const indexOfLastClient = currentPage * clientsPerPage;
		const indexOfFirstClient = indexOfLastClient - clientsPerPage;
		const currentClients = mockData.data.Clients.slice(indexOfFirstClient, indexOfLastClient);
		const client = mockData.data.Clients.find(c => c.clientid === clientId);
		setCurrentClient(client);
		setClients(currentClients);
		if (currentClients.length >= 0) {
			setCurrentClient(currentClients[0]); // Устанавливаем первого клиента в качестве текущего
		}
	}, [currentPage]);

	// Функция для обработки изменения текущего клиента
	const handleClientChange = (clientId) => {
	};


	return (
		<>
			<div className={`clients-popup ${isVisible ? "active" : ""}`}>
				<div className="clients-popup__info">
					<svg onClick={() => setIsVisible(false)} className="clients-popup__cross" height="18" width="18">
						<use xlinkHref="/src/assets/icons/Clients_Sprite.svg#icon-clients-cross"/>
					</svg>
					<svg onClick={() => setIsVisible(prev => !prev)} className="clients-popup__back" height="24" width="24">
						<use xlinkHref="/src/assets/icons/Clients_Sprite.svg#icon-clients-back"/>
					</svg>
					<div className="clients-popup__wrapper">
						<img 
							alt={currentClient.surname + " " + currentClient.name} 
							src="/src/assets/images/client-1.png" 
						/>
					</div>

					<h2 className="clients-popup__title">{currentClient.surname} {currentClient.name}</h2>
					<span className="clients-popup__text">Клиент #{currentClient.clientid}</span>
				</div>
				<ul className="clients-popup__tabs">
					<li onClick={() => setActiveTab(1)} className={`clients-popup__tabs-el ${activeTab === 1 ? "active" : ""}`}>Данные клиента</li>
					<li onClick={() => setActiveTab(2)} className={`clients-popup__tabs-el ${activeTab === 2 ? "active" : ""}`}>Визиты</li>
					<li onClick={() => setActiveTab(3)} className={`clients-popup__tabs-el ${activeTab === 3 ? "active" : ""}`}>Статистика</li>
					<li onClick={() => setActiveTab(4)} className={`clients-popup__tabs-el ${activeTab === 4 ? "active" : ""}`}>Лояльность</li>
					<li onClick={() => setActiveTab(5)} className={`clients-popup__tabs-el ${activeTab === 5 ? "active" : ""}`}>Телефония</li>
				</ul>
				<div className="clients-popup__content">
					{activeTab === 1 && (
						<div className="clients-popup__data">
							<div className="clients-popup__block">
								<label htmlFor="phone" className="clients-popup__label">Телефон</label>
								<input 
									readOnly
									className="clients-popup__input"
									value={currentClient.phone || ''}
									id="phone"
									type="tel" 
								/>
							</div>
							<div className="clients-popup__block date">
								<label htmlFor="date" className="clients-popup__label">День рождения</label>
								<input 
									readOnly
									className="clients-popup__input"
									value={currentClient.dateofbirth || ''}
									id="date"
									type="text" 
								/>
							</div>
							<div className="clients-popup__block email">
								<label htmlFor="email" className="clients-popup__label">Email</label>
								<input 
									readOnly
									className="clients-popup__input"
									value="example@mail.com" // Добавьте email при необходимости
									id="email"
									type="email" 
								/>
							</div>
							<div className="clients-popup__block comment">
								<label htmlFor="comment" className="clients-popup__label">Комментарий</label>
								<textarea 
									readOnly
									className="clients-popup__input comment"
									value="Комментарий к клиенту" // Добавьте по необходимости
									id="comment"
								/>
							</div>
							<div className="clients-popup__block creating">
								<label htmlFor="creating" className="clients-popup__label">Дата создания</label>
								<input 
									readOnly
									className="clients-popup__input"
									value={currentClient.dateCreated || ''}
									id="creating"
									type="text" 
								/>
							</div>
							<div className="clients-popup__block buttons">
								<button className="clients-popup__edit">Редактировать данные</button>
								<button className="clients-popup__create">Создать запись</button>
							</div>
						</div>
					)}
					{activeTab === 2 && (
						<div className="clients-popup__visits">
							{currentClient.Info?.Visits.map((visit, index) => (
								<div key={index} className="clients-popup__table">
									<span className="clients-popup__table-header">{visit.Date}</span>
									<span className="clients-popup__table-header">{visit.Cost}₽</span>
									<span className="clients-popup__table-header">{visit.Service}</span>
								</div>
							))}
							<ul className="clients-popup__pagination">
								{/* Список страниц для навигации */}
								{Array.from({ length: Math.ceil(mockData.data.Clients.length / clientsPerPage) }, (_, index) => (
									<li
										key={index + 1}
										className={`clients-popup__pagination-el ${currentPage === index + 1 ? 'active' : ''}`}
										onClick={() => setCurrentPage(index + 1)}
									>
										{index + 1}
									</li>
								))}
							</ul>
						</div>
					)}
					{activeTab === 3 && (
						<div className="clients-popup__statistics">
							<div className="clients-popup__row">
								<span className="clients-popup__criteria">Количество записей</span>
								<span className="clients-popup__value">{currentClient.Info?.Stats[0]?.Records || 0}</span>
							</div>
							<div className="clients-popup__row">
								<span className="clients-popup__criteria">Общий доход</span>
								<span className="clients-popup__value">{currentClient.Info?.Stats[0]?.sum || 0}₽</span>
							</div>
							<div className="clients-popup__row">
								<span className="clients-popup__criteria">Средний чек</span>
								<span className="clients-popup__value">{currentClient.Info?.Stats[0]?.AverageCheck || 0}₽</span>
							</div>
							<div className="clients-popup__row">
								<span className="clients-popup__criteria">Последний визит</span>
								<span className="clients-popup__value">{currentClient.lastvisit || 'Нет данных'}</span>
							</div>
						</div>
					)}
					{/* Включите другие активные табы (Лояльность, Телефония) аналогично */}
				</div>
				
			</div>
		</>
	);
}
