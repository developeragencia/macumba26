<?php

namespace App\Core;

class Router
{
    private array $routes = [];

    public function addRoute(string $method, string $pattern, string $handler): void
    {
        $this->routes[] = [
            'method' => $method,
            'pattern' => $pattern,
            'handler' => $handler,
        ];
    }

    public function dispatch(string $method, string $uri): void
    {
        // Remove query string
        $uri = strtok($uri, '?');

        foreach ($this->routes as $route) {
            if ($route['method'] !== $method) {
                continue;
            }

            $pattern = '#^' . $route['pattern'] . '$#';
            
            if (preg_match($pattern, $uri, $matches)) {
                array_shift($matches); // Remove full match
                $this->callHandler($route['handler'], $matches);
                return;
            }
        }

        // 404 Not Found
        http_response_code(404);
        $this->json(['error' => 'Route not found'], 404);
    }

    private function callHandler(string $handler, array $params = []): void
    {
        [$controller, $method] = explode('@', $handler);
        $controllerClass = "App\\Controllers\\$controller";

        if (!class_exists($controllerClass)) {
            http_response_code(500);
            $this->json(['error' => 'Controller not found'], 500);
            return;
        }

        $controllerInstance = new $controllerClass();

        if (!method_exists($controllerInstance, $method)) {
            http_response_code(500);
            $this->json(['error' => 'Method not found'], 500);
            return;
        }

        call_user_func_array([$controllerInstance, $method], $params);
    }

    private function json(array $data, int $status = 200): void
    {
        header('Content-Type: application/json');
        http_response_code($status);
        echo json_encode($data);
    }
}

