-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 05-04-2024 a las 03:05:49
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
-- Base de datos: `apyt`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE `clientes` (
  `id_cliente` int(50) NOT NULL,
  `id_servicio` int(50) NOT NULL,
  `contrato_linea` int(50) NOT NULL,
  `nombres` varchar(50) NOT NULL,
  `apellidos` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes_procesos`
--

CREATE TABLE `clientes_procesos` (
  `id_cliente` int(50) NOT NULL,
  `id_proceso` int(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `consultas`
--

CREATE TABLE `consultas` (
  `id_consulta` int(50) NOT NULL,
  `id_proceso` int(50) DEFAULT NULL,
  `id_servicio` int(50) NOT NULL,
  `consulta` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `consulta_proceso`
--

CREATE TABLE `consulta_proceso` (
  `id_consulta` int(50) NOT NULL,
  `id_proceso` int(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empleados`
--

CREATE TABLE `empleados` (
  `id_empleado` int(50) NOT NULL,
  `id_jerarquia` int(50) NOT NULL,
  `cedula` varchar(80) NOT NULL,
  `nombres` varchar(50) NOT NULL,
  `apellidos` varchar(40) NOT NULL,
  `usuario` varchar(50) NOT NULL,
  `password` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `empleados`
--

INSERT INTO `empleados` (`id_empleado`, `id_jerarquia`, `cedula`, `nombres`, `apellidos`, `usuario`, `password`) VALUES
(1, 1, '1233489895', 'cristian camilo', 'castillo rodriguez', 'camil-coder', '$2a$07$RfMLVpN7MZXy0WkiuRPfBebNAzuqLSyn/IGLMIPQaVlQHg0PUxz3a'),
(2, 2, '1588645785', 'Juan', 'Quiroz', 'Juan-gamer', '$2a$07$4voVeZLI1PZC.GdP0lScOeWS0VeSzce..bnnWuAPox/pUMxZ2elU6'),
(4, 1, '1006520165', 'betsy', 'tovar', 'betsyM', '$2a$07$7wa6fpHImvrCF2c4dl7dUefsYmydMP7IvDh9XkhIwXcG6TlNoNCda'),
(5, 1, '102750165', 'Nelson', 'Castro', 'Stic1227', '$2a$07$yCLD2ObBrfqY2TJjx.QHouknSL9Tk3DTC8rexxDZcl.SNUL810ypa'),
(6, 2, '56842715', 'adolfo', 'perez', 'hitler', '$2a$07$yqljwD3PtDGGWrEOzGQQDu/YHm6UvCSk1gy9.0PXw6Sy76fkVWJkC'),
(7, 1, '123348989', 'orlando', 'parada', 'Orla', '$2a$07$SJ.2c1AneYO.WuZkbBY/pOPY/1/CuL4iWn/6n6La3M3mat9rIXlD2'),
(8, 1, '4424242424', 'raul', 'ernesto', 'Raul', '$2a$07$njNzplIBqrjes/kCCjPTQu/Dof2kIsrNGD0zkQH05Tx8dIuqgMSMe'),
(9, 1, '564324234', 'harry', 'poter', 'harry', '$2a$07$xN.UfMcKop7P77IBIkonC.Wyb0tbtw3Vin6oJrmZGmife11qBKZpa');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `jerarquia`
--

CREATE TABLE `jerarquia` (
  `id_jerarquia` int(50) NOT NULL,
  `jerarquia` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `jerarquia`
--

INSERT INTO `jerarquia` (`id_jerarquia`, `jerarquia`) VALUES
(1, 'supervisor'),
(2, 'asesor');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `procesos`
--

CREATE TABLE `procesos` (
  `id_proceso` int(50) NOT NULL,
  `id_cliente` int(50) NOT NULL,
  `proceso` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `procesos_servicios`
--

CREATE TABLE `procesos_servicios` (
  `id_servicio` int(50) NOT NULL,
  `id_proceso` int(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `segmentos`
--

CREATE TABLE `segmentos` (
  `id_segmento` int(50) NOT NULL,
  `id_servicio` int(50) NOT NULL,
  `segmento` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `servicios`
--

CREATE TABLE `servicios` (
  `id_servicio` int(50) NOT NULL,
  `id_segmento` int(50) NOT NULL,
  `id_cliente` int(50) NOT NULL,
  `id_proceso` int(50) NOT NULL,
  `servicio` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`id_cliente`);

--
-- Indices de la tabla `clientes_procesos`
--
ALTER TABLE `clientes_procesos`
  ADD KEY `id_cliente` (`id_cliente`),
  ADD KEY `id_proceso` (`id_proceso`);

--
-- Indices de la tabla `consultas`
--
ALTER TABLE `consultas`
  ADD PRIMARY KEY (`id_consulta`),
  ADD KEY `DOCUMENTO` (`id_proceso`);

--
-- Indices de la tabla `consulta_proceso`
--
ALTER TABLE `consulta_proceso`
  ADD KEY `id_consulta` (`id_consulta`),
  ADD KEY `id_proceso` (`id_proceso`);

--
-- Indices de la tabla `empleados`
--
ALTER TABLE `empleados`
  ADD PRIMARY KEY (`id_empleado`),
  ADD KEY `id_jerarquia` (`id_jerarquia`);

--
-- Indices de la tabla `jerarquia`
--
ALTER TABLE `jerarquia`
  ADD PRIMARY KEY (`id_jerarquia`);

--
-- Indices de la tabla `procesos`
--
ALTER TABLE `procesos`
  ADD PRIMARY KEY (`id_proceso`);

--
-- Indices de la tabla `procesos_servicios`
--
ALTER TABLE `procesos_servicios`
  ADD KEY `id_proceso` (`id_proceso`),
  ADD KEY `id_servicio` (`id_servicio`);

--
-- Indices de la tabla `segmentos`
--
ALTER TABLE `segmentos`
  ADD PRIMARY KEY (`id_segmento`);

--
-- Indices de la tabla `servicios`
--
ALTER TABLE `servicios`
  ADD PRIMARY KEY (`id_servicio`),
  ADD KEY `id_cliente` (`id_cliente`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `clientes`
--
ALTER TABLE `clientes`
  MODIFY `id_cliente` int(50) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `empleados`
--
ALTER TABLE `empleados`
  MODIFY `id_empleado` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `jerarquia`
--
ALTER TABLE `jerarquia`
  MODIFY `id_jerarquia` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `segmentos`
--
ALTER TABLE `segmentos`
  MODIFY `id_segmento` int(50) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `servicios`
--
ALTER TABLE `servicios`
  MODIFY `id_servicio` int(50) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `clientes_procesos`
--
ALTER TABLE `clientes_procesos`
  ADD CONSTRAINT `clientes_procesos_ibfk_1` FOREIGN KEY (`id_cliente`) REFERENCES `clientes` (`id_cliente`),
  ADD CONSTRAINT `clientes_procesos_ibfk_2` FOREIGN KEY (`id_proceso`) REFERENCES `procesos` (`id_proceso`);

--
-- Filtros para la tabla `consulta_proceso`
--
ALTER TABLE `consulta_proceso`
  ADD CONSTRAINT `consulta_proceso_ibfk_1` FOREIGN KEY (`id_consulta`) REFERENCES `consultas` (`id_consulta`),
  ADD CONSTRAINT `consulta_proceso_ibfk_2` FOREIGN KEY (`id_proceso`) REFERENCES `procesos` (`id_proceso`);

--
-- Filtros para la tabla `empleados`
--
ALTER TABLE `empleados`
  ADD CONSTRAINT `empleados_ibfk_1` FOREIGN KEY (`id_jerarquia`) REFERENCES `jerarquia` (`id_jerarquia`);

--
-- Filtros para la tabla `procesos_servicios`
--
ALTER TABLE `procesos_servicios`
  ADD CONSTRAINT `procesos_servicios_ibfk_1` FOREIGN KEY (`id_proceso`) REFERENCES `procesos` (`id_proceso`),
  ADD CONSTRAINT `procesos_servicios_ibfk_2` FOREIGN KEY (`id_servicio`) REFERENCES `servicios` (`id_servicio`);

--
-- Filtros para la tabla `servicios`
--
ALTER TABLE `servicios`
  ADD CONSTRAINT `servicios_ibfk_1` FOREIGN KEY (`id_cliente`) REFERENCES `segmentos` (`id_segmento`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
