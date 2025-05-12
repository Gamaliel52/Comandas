-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 10-05-2025 a las 00:16:32
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `restaurante`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comandas`
--

CREATE TABLE `comandas` (
  `id` int(11) NOT NULL,
  `mesa` int(11) NOT NULL,
  `mesero` varchar(100) NOT NULL,
  `platillos` text NOT NULL,
  `observaciones` text DEFAULT NULL,
  `hora` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `comandas`
--

INSERT INTO `comandas` (`id`, `mesa`, `mesero`, `platillos`, `observaciones`, `hora`) VALUES
(1, 1, 'Juan Pérez', '[{\"nombre\": \"Hamburguesa\", \"cantidad\": 2}, {\"nombre\": \"Coca-Cola\", \"cantidad\": 2}]', 'Sin cebolla', '2025-04-24 05:20:08'),
(2, 2, 'María López', '[{\"nombre\": \"Ensalada César\", \"cantidad\": 1}, {\"nombre\": \"Limonada\", \"cantidad\": 1}]', '', '2025-04-24 05:20:08'),
(3, 3, 'Carlos García', '[{\"nombre\": \"Tacos al Pastor\", \"cantidad\": 3}, {\"nombre\": \"Agua Natural\", \"cantidad\": 2}]', 'Sin piña', '2025-04-24 05:20:08'),
(8, 4, 'Gamaliel Domínguez', '[{\"nombre\":\"Tacos al Pastor - $80.00\",\"cantidad\":2,\"precio\":80},{\"nombre\":\"Papas Gajo - $45.00\",\"cantidad\":1,\"precio\":45},{\"nombre\":\"Coca-Cola - $25.00\",\"cantidad\":2,\"precio\":25},{\"nombre\":\"Observación: Los Tacos sin cebolla\",\"cantidad\":1,\"precio\":0}]', NULL, '2025-05-09 21:00:26'),
(9, 5, 'Jessica Sanchez', '[{\"nombre\":\"Hamburguesa - $120.00\",\"cantidad\":1,\"precio\":120}]', '', '2025-05-09 21:09:34'),
(10, 6, 'David Zarate', '[{\"nombre\":\"Ensalada César - $90.00\",\"cantidad\":2,\"precio\":90},{\"nombre\":\"Agua Natural - $20.00\",\"cantidad\":1,\"precio\":20}]', '', '2025-05-09 21:13:55'),
(11, 3, 'Jessica Sanchez', '[{\"nombre\":\"Ensalada César - $90.00\",\"cantidad\":1,\"precio\":90},{\"nombre\":\"Hamburguesa - $120.00\",\"cantidad\":1,\"precio\":120},{\"nombre\":\"Limonada - $30.00\",\"cantidad\":2,\"precio\":30}]', '', '2025-05-09 21:15:42'),
(12, 1, 'Gamaliel Domínguez', '[{\"nombre\":\"Papas Gajo - $45.00\",\"cantidad\":1,\"precio\":45},{\"nombre\":\"Coca-Cola - $25.00\",\"cantidad\":1,\"precio\":25}]', '', '2025-05-09 21:16:50'),
(13, 3, 'David Zarate', '[{\"nombre\":\"Hamburguesa - $120.00\",\"cantidad\":1,\"precio\":120},{\"nombre\":\"Tacos al Pastor - $80.00\",\"cantidad\":1,\"precio\":80},{\"nombre\":\"Coca-Cola - $25.00\",\"cantidad\":2,\"precio\":25},{\"nombre\":\"Observación: Sin Cebolla los tacos\",\"cantidad\":1,\"precio\":0}]', '', '2025-05-09 22:07:40');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `menu`
--

CREATE TABLE `menu` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `precio` decimal(10,2) NOT NULL,
  `categoria` enum('Platillo','Bebida') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `menu`
--

INSERT INTO `menu` (`id`, `nombre`, `descripcion`, `precio`, `categoria`) VALUES
(1, 'Hamburguesa', 'Hamburguesa con queso y papas fritas', 120.00, 'Platillo'),
(2, 'Ensalada César', 'Ensalada con pollo, crutones y aderezo César', 90.00, 'Platillo'),
(3, 'Tacos al Pastor', 'Tacos con carne al pastor y piña', 80.00, 'Platillo'),
(4, 'Coca-Cola', 'Refresco de cola 355ml', 25.00, 'Bebida'),
(5, 'Agua Natural', 'Botella de agua natural 500ml', 20.00, 'Bebida'),
(6, 'Limonada', 'Limonada fresca con hielo', 30.00, 'Bebida'),
(7, 'Papas Gajo', 'Papas gruesas sazonadas con sal.', 45.00, 'Platillo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `rol` enum('Cliente','Mesero','Cocinero') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `username`, `password`, `rol`) VALUES
(3, 'cocinero1', '$2b$10$9A/w2e04poOFTmsvTd3kL.xmuCes4TS6ccGYf35CdFIHqp4VwN5a.', 'Cocinero'),
(4, 'mesero1', '$2b$10$9A/w2e04poOFTmsvTd3kL.xmuCes4TS6ccGYf35CdFIHqp4VwN5a.', 'Mesero');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `comandas`
--
ALTER TABLE `comandas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `menu`
--
ALTER TABLE `menu`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `comandas`
--
ALTER TABLE `comandas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `menu`
--
ALTER TABLE `menu`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
