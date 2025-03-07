import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Form, ListGroup, InputGroup, Badge } from "react-bootstrap";

const LOCAL_STORAGE_KEY = "todo_categories";

const TodoApp = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [newTodo, setNewTodo] = useState("");
  const [editingCategory, setEditingCategory] = useState({ id: null, name: "" });
  const [editingTodo, setEditingTodo] = useState({ id: null, text: "" });

  // Load categories from localStorage on mount
  useEffect(() => {
    const storedCategories = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
    setCategories(storedCategories);
  }, []);

  // Save categories to localStorage
  const updateLocalStorage = (updatedCategories) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedCategories));
    setCategories(updatedCategories);
  };

  const addCategory = () => {
    if (newCategory.trim() === "") return;
    const updatedCategories = [...categories, { id: Date.now(), name: newCategory, todos: [] }];
    updateLocalStorage(updatedCategories);
    setNewCategory("");
  };

  const startEditingCategory = (id, name) => {
    setEditingCategory({ id, name });
  };

  const saveEditedCategory = () => {
    if (editingCategory.name.trim() === "") return;
    const updatedCategories = categories.map(cat =>
      cat.id === editingCategory.id ? { ...cat, name: editingCategory.name } : cat
    );
    updateLocalStorage(updatedCategories);
    setEditingCategory({ id: null, name: "" });
  };

  const deleteCategory = id => {
    const updatedCategories = categories.filter(cat => cat.id !== id);
    updateLocalStorage(updatedCategories);
    if (selectedCategory?.id === id) setSelectedCategory(null);
  };

  const addTodo = () => {
    if (newTodo.trim() === "" || !selectedCategory) return;
    const updatedCategories = categories.map(cat =>
      cat.id === selectedCategory.id
        ? { ...cat, todos: [...cat.todos, { id: Date.now(), text: newTodo, done: false }] }
        : cat
    );
    updateLocalStorage(updatedCategories);
    setNewTodo("");
    setSelectedCategory(updatedCategories.find(cat => cat.id === selectedCategory.id));
  };

  const startEditingTodo = (todoId, text) => {
    setEditingTodo({ id: todoId, text });
  };

  const saveEditedTodo = (categoryId) => {
    if (editingTodo.text.trim() === "") return;
    const updatedCategories = categories.map(cat =>
      cat.id === categoryId
        ? {
            ...cat,
            todos: cat.todos.map(todo =>
              todo.id === editingTodo.id ? { ...todo, text: editingTodo.text } : todo
            )
          }
        : cat
    );
    updateLocalStorage(updatedCategories);
    setEditingTodo({ id: null, text: "" });
    setSelectedCategory(updatedCategories.find(cat => cat.id === categoryId));
  };

  const deleteTodo = (categoryId, todoId) => {
    const updatedCategories = categories.map(cat =>
      cat.id === categoryId
        ? { ...cat, todos: cat.todos.filter(todo => todo.id !== todoId) }
        : cat
    );
    updateLocalStorage(updatedCategories);
    setSelectedCategory(updatedCategories.find(cat => cat.id === categoryId));
  };

  const toggleTodoDone = (categoryId, todoId) => {
    const updatedCategories = categories.map(cat =>
      cat.id === categoryId
        ? {
            ...cat,
            todos: cat.todos.map(todo =>
              todo.id === todoId ? { ...todo, done: !todo.done } : todo
            )
          }
        : cat
    );
    updateLocalStorage(updatedCategories);
    setSelectedCategory(updatedCategories.find(cat => cat.id === categoryId));
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col md={4}>
          <Card>
            <Card.Header>Categories</Card.Header>
            <Card.Body>
              <InputGroup className="mb-2">
                <Form.Control
                  type="text"
                  placeholder="New category"
                  value={newCategory}
                  onChange={e => setNewCategory(e.target.value)}
                />
                <Button variant="primary" onClick={addCategory}>Add</Button>
              </InputGroup>
              <ListGroup>
                {categories.map(category => (
                  <ListGroup.Item
                    key={category.id}
                    className="d-flex justify-content-between align-items-center"
                    active={selectedCategory?.id === category.id}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {editingCategory.id === category.id ? (
                      <InputGroup>
                        <Form.Control
                          type="text"
                          value={editingCategory.name}
                          onChange={e => setEditingCategory({ ...editingCategory, name: e.target.value })}
                        />
                        <Button variant="success" onClick={saveEditedCategory}>Save</Button>
                        <Button variant="success" onClick={() => saveEditedTodo(selectedCategory.id)}>Save Todo</Button>
                      </InputGroup>
                    ) : (
                      <span>{category.name}</span>
                    )}
                    <div>
                      {editingCategory.id !== category.id && (
                        <>
                          <Button variant="warning" size="sm" onClick={() => startEditingCategory(category.id, category.name)}>Edit</Button>{" "}
                          <Button variant="danger" size="sm" onClick={() => deleteCategory(category.id)}>Delete</Button>
                        </>
                      )}
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>

        <Col md={8}>
          {selectedCategory && (
            <Card>
              <Card.Header>
                Todos for &quot;{selectedCategory.name}&quot;
              </Card.Header>
              <Card.Body>
                <InputGroup className="mb-2">
                  <Form.Control
                    type="text"
                    placeholder="New todo"
                    value={newTodo}
                    onChange={e => setNewTodo(e.target.value)}
                  />
                  <Button variant="primary" onClick={addTodo}>Add</Button>
                </InputGroup>
                <ListGroup>
                  {selectedCategory.todos.map(todo => (
                    <ListGroup.Item
                      key={todo.id}
                      className={`d-flex justify-content-between align-items-center ${todo.done ? 'bg-light text-muted' : ''}`}
                      onClick={() => toggleTodoDone(selectedCategory.id, todo.id)}
                      style={{ cursor: "pointer" }}
                    >
                      <div className="d-flex align-items-center">
                        <span style={{ textDecoration: todo.done ? "underline" : "none" }}>
                          {todo.text}
                        </span>
                        {todo.done && <Badge bg="success" className="ms-2">Task Complete</Badge>}
                      </div>
                      <div onClick={e => e.stopPropagation()}>
                        {editingTodo.id !== todo.id && (
                          <>
                            <Button variant="warning" size="sm" onClick={() => startEditingTodo(todo.id, todo.text)}>
                              Edit
                            </Button>{" "}
                            <Button variant="danger" size="sm" onClick={() => deleteTodo(selectedCategory.id, todo.id)}>
                              Delete
                            </Button>
                          </>
                        )}
                      </div>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default TodoApp;
