import './App.css';
import React, { useState } from 'react';
import AddboxForm from './components/AddboxForm';
import TableView from './components/TableView';

export default function App() {
  const [boxes, setBoxes] = useState([]);
  const [activeTab, setActiveTab] = useState('form');
  const [menuOpen, setMenuOpen] = useState(false);

  const handleAddBox = (box) => setBoxes(prev => [...prev, box]);
  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setMenuOpen(false);
  };

  return (
    <div className="App">
      <header className="app-header">
        <div className="header-title">Shipping Box</div>
        <nav className="nav-tabs">
          <button
            className={`nav-btn${activeTab === 'form' ? ' active' : ''}`}
            onClick={() => handleTabClick('form')}
          >
            Form
          </button>
          <button
            className={`nav-btn${activeTab === 'list' ? ' active' : ''}`}
            onClick={() => handleTabClick('list')}
          >
            List
          </button>
        </nav>
        <div className="nav-hamburger">
          <button
            aria-label="Open menu"
            className="hamburger-btn"
            onClick={() => setMenuOpen(m => !m)}
          >
            <span>☰</span>
          </button>
        </div>
        {menuOpen && (
          <div className="nav-mobile-menu">
            <button
              className={`nav-btn${activeTab === 'form' ? ' active' : ''}`}
              onClick={() => handleTabClick('form')}
            >
              Form
            </button>
            <button
              className={`nav-btn${activeTab === 'list' ? ' active' : ''}`}
              onClick={() => handleTabClick('list')}
            >
              List
            </button>
          </div>
        )}
      </header>
      {activeTab === 'form' && <AddboxForm onAddBox={handleAddBox} />}
      {activeTab === 'list' && <TableView boxes={boxes} />}
    </div>
  );
}