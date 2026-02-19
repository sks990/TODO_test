import React from 'react';
import { KanbanBoardView } from './components/organisms/KanbanBoard/KanbanBoardView';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Kanban Board</h1>
      </header>
      <main>
        <KanbanBoardView />
      </main>
    </div>
  );
}

export default App;