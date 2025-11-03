# ECS in TypeScript

A minimalistic game engine with zero dependencies based on the **Entity Component System (ECS)** architecture implemented in **TypeScript**

> [!WARNING] Work in progress

## Features

- **ECS architecture** with single responsability principles (SRP)

- **SparSet** for ultra-fast entities lookup

- **Structure of Arrays(SoA)** for optimized memory storage and access

- **Bitmask** for efficient component queries

- **Canvas 2D** rendering

## Core Components

- **EntityManager**: Manage creation, destruction and entity recycle. Uses a bitmask to track components of every entity.

- **ComponentStore**: Generic store that maintains components data in SoA format to maximise cache locality.

- **Registry**: Central Orchestator that coordinates entity and components, expose an API for queries and CRUD operations

- **SparseSet**: Data structure that grants O(1) for insertion, removal and lookups of entities.

## Technologies

- TypeScript for type safety
- Canvas API for rendering
- Data oriented architecture for optimal performance
- Functional pattern without classes
