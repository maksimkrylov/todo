import { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Heading,
  Input,
  Stack,
  Text,
  Flex,
  HStack,
} from "@chakra-ui/react";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  const addTodo = () => {
    if (input.trim() === "") return;
    const newTodo: Todo = {
      id: Date.now(),
      text: input,
      completed: false,
    };
    setTodos([newTodo, ...todos]);
    setInput("");
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  return (
    <Flex minW="100vw" justify="center" align="center" bg="gray.50" px={4}>
      <Box maxW="xl" mx="auto" p={4}>
        <Heading textAlign="center" color="gray.400" fontWeight="thin" mb={6}>
          todos
        </Heading>
        <Box bg="white" borderRadius="2xl" boxShadow="md" p={6}>
          <Input
            data-testid="todo-input"
            placeholder="What needs to be done?"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTodo()}
            mb={4}
          />

          <Stack spacing={2}>
            {filteredTodos.map((todo) => (
              <Flex key={todo.id} align="center" gap={2}>
                <Checkbox
                  data-testid={`todo-checkbox-${todo.text}`}
                  variant="subtle"
                  isChecked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                />
                <Text
                  data-testid={`todo-text-${todo.text}`}
                  textDecoration={todo.completed ? "line-through" : "none"}
                  color={todo.completed ? "gray.400" : "gray.800"}
                >
                  {todo.text}
                </Text>
              </Flex>
            ))}
          </Stack>

          <Flex
            justify="space-between"
            align="center"
            gap={4}
            pt={4}
            fontSize="sm"
            color="gray.500"
          >
            <Text>{todos.filter((t) => !t.completed).length} items left</Text>
            <HStack spacing={4}>
              <Button
                size="sm"
                variant={filter === "all" ? "solid" : "outline"}
                onClick={() => setFilter("all")}
              >
                All
              </Button>
              <Button
                data-testid="filter-active"
                size="sm"
                variant={filter === "active" ? "solid" : "outline"}
                onClick={() => setFilter("active")}
              >
                Active
              </Button>
              <Button
                size="sm"
                variant={filter === "completed" ? "solid" : "outline"}
                onClick={() => setFilter("completed")}
              >
                Completed
              </Button>
            </HStack>
            <Button
              data-testid="clear-completed"
              size="sm"
              variant="ghost"
              onClick={clearCompleted}
            >
              Clear completed
            </Button>
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
}
