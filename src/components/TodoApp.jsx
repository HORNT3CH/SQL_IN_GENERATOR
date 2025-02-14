import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Form, ListGroup, InputGroup } from "react-bootstrap";

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

  // Add a new category
  const addCategory = () => {
    if (newCategory.trim() === "") return;
    const updatedCategories = [...categories, { id: Date.now(), name: newCategory, todos: [] }];
    updateLocalStorage(updatedCategories);
    setNewCategory("");
  };

  // Start editing a category
  const startEditingCategory = (id, name) => {
    setEditingCategory({ id, name });
  };

  // Save edited category
  const saveEditedCategory = () => {
    if (editingCategory.name.trim() === "") return;
    const updatedCategories = categories.map(cat =>
      cat.id === editingCategory.id ? { ...cat, name: editingCategory.name } : cat
    );
    updateLocalStorage(updatedCategories);
    setEditingCategory({ id: null, name: "" });
  };

  // Delete a category
  const deleteCategory = id => {
    const updatedCategories = categories.filter(cat => cat.id !== id);
    updateLocalStorage(updatedCategories);
    if (selectedCategory?.id === id) setSelectedCategory(null);
  };

  // Add a new todo
  const addTodo = () => {
    if (newTodo.trim() === "" || !selectedCategory) return;
    const updatedCategories = categories.map(cat =>
      cat.id === selectedCategory.id
        ? { ...cat, todos: [...cat.todos, { id: Date.now(), text: newTodo }] }
        : cat
    );
    updateLocalStorage(updatedCategories);
    setNewTodo("");
    setSelectedCategory(updatedCategories.find(cat => cat.id === selectedCategory.id)); // Update UI
  };

  // Start editing a todo
  const startEditingTodo = (todoId, text) => {
    setEditingTodo({ id: todoId, text });
  };

  // Save edited todo
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
    setSelectedCategory(updatedCategories.find(cat => cat.id === categoryId)); // Update UI
  };

  // Delete a todo
  const deleteTodo = (categoryId, todoId) => {
    const updatedCategories = categories.map(cat =>
      cat.id === categoryId
        ? { ...cat, todos: cat.todos.filter(todo => todo.id !== todoId) }
        : cat
    );
    updateLocalStorage(updatedCategories);
    setSelectedCategory(updatedCategories.find(cat => cat.id === categoryId)); // Update UI
  };

  return (
    <Container className="mt-4">
      <Row>
        {/* Category List */}
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

        {/* Todo List */}
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
                    <ListGroup.Item key={todo.id} className="d-flex justify-content-between align-items-center">
                      {editingTodo.id === todo.id ? (
                        <InputGroup>
                          <Form.Control
                            type="text"
                            value={editingTodo.text}
                            onChange={e => setEditingTodo({ ...editingTodo, text: e.target.value })}
                          />
                          <Button variant="success" onClick={() => saveEditedTodo(selectedCategory.id)}>Save</Button>
                        </InputGroup>
                      ) : (
                        <span>{todo.text}</span>
                      )}
                      <div>
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
