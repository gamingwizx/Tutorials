import logo from "./logo.svg";
import "./App.css";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
function App() {
  return (
    <div className="App">
      <ItemContainer key="container" />
    </div>
  );
}
function ItemContainer() {
  const draggedId = useRef(0);
  const enteredId = useRef(0);
  const [items, setItems] = useState([
    { id: 1, name: "Item 1" },
    { id: 2, name: "Item 2" },
    { id: 3, name: "Item 3" },
  ]);
  const handleDrop = () => {
    const copy = items.slice().filter((item) => item.id !== draggedId.current);
    const draggedItem = items
      .slice()
      .find((item) => item.id === draggedId.current);
    const enteredIndex = items
      .slice()
      .findIndex((item) => item.id === enteredId.current);
    copy.splice(enteredIndex, 0, draggedItem);
    setItems(copy);
  };
  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={() => handleDrop()}
      className="item-container"
    >
      {items.map((item) => (
        <Item
          key={item.id}
          draggedId={draggedId}
          enteredId={enteredId}
          item={item}
        />
      ))}
    </div>
  );
}
function Item({ item, draggedId, enteredId }) {
  return (
    <motion.div
      layout
      layoutId={item.id}
      onDragStart={(e) => (draggedId.current = item.id)}
      onDragEnter={(e) => (enteredId.current = item.id)}
      draggable="true"
      className="item"
    >
      {item.name}
    </motion.div>
  );
}

export default App;
