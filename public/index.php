<?php
/**
 * Shopping da Macumba - Entry Point
 * Marketplace para produtos espirituais e esotéricos
 */

require_once __DIR__ . '/../vendor/autoload.php';

use App\Core\Router;
use App\Core\Database;
use Dotenv\Dotenv;

// Load environment variables
$dotenv = Dotenv::createImmutable(__DIR__ . '/..');
$dotenv->load();

// Error handling
error_reporting(E_ALL);
ini_set('display_errors', $_ENV['APP_ENV'] === 'development' ? '1' : '0');

// Session start
session_start();

// Initialize database
Database::init();

// Initialize router
$router = new Router();

// API Routes
$router->addRoute('GET', '/api/health', 'HealthController@check');
$router->addRoute('POST', '/api/auth/register', 'AuthController@register');
$router->addRoute('POST', '/api/auth/login', 'AuthController@login');
$router->addRoute('GET', '/api/auth/me', 'AuthController@me');
$router->addRoute('POST', '/api/auth/logout', 'AuthController@logout');

// Products API
$router->addRoute('GET', '/api/products', 'ProductController@index');
$router->addRoute('GET', '/api/products/[0-9]+', 'ProductController@show');
$router->addRoute('POST', '/api/products', 'ProductController@store');
$router->addRoute('PUT', '/api/products/[0-9]+', 'ProductController@update');
$router->addRoute('DELETE', '/api/products/[0-9]+', 'ProductController@destroy');

// Orders API
$router->addRoute('GET', '/api/orders', 'OrderController@index');
$router->addRoute('POST', '/api/orders', 'OrderController@store');
$router->addRoute('GET', '/api/orders/[0-9]+', 'OrderController@show');

// Payment API
$router->addRoute('POST', '/api/payments/stripe', 'PaymentController@stripe');
$router->addRoute('POST', '/api/payments/pix', 'PaymentController@pix');

// Web Routes (Frontend)
$router->addRoute('GET', '/', 'HomeController@index');
$router->addRoute('GET', '/login', 'AuthController@loginPage');
$router->addRoute('GET', '/register', 'AuthController@registerPage');
$router->addRoute('GET', '/produtos', 'ProductController@list');
$router->addRoute('GET', '/produto/[0-9]+', 'ProductController@details');
$router->addRoute('GET', '/carrinho', 'CartController@index');
$router->addRoute('GET', '/checkout', 'CheckoutController@index');
$router->addRoute('GET', '/dashboard', 'DashboardController@index');
$router->addRoute('GET', '/vendedor/dashboard', 'VendorController@dashboard');

// Dispatch request
$router->dispatch($_SERVER['REQUEST_METHOD'], $_SERVER['REQUEST_URI']);

