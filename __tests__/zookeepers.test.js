const fs = require('fs');
const {
    filterByQuery,
    findById,
    createNewZookeeper,
    validateZookeeper,
} = require("../lib/zookeepers.js");
const { zookeepers } = require("../data/zookeepers.json");
const { validate } = require('jest-validate');
const { expect } = require('@jest/globals');

jest.mock('fs');

test("creates a zookeeper object", () => {
    const zookeeper = createNewZookeeper(
        { name: "Billy", id: "br549"},
        zookeepers
    );
    expect(zookeeper.name).toBe("Billy");
    expect(zookeeper.id).toBe("br549");
});

test("filters by query", () => {
    const startingZookeepers = [
        {
            id: "0",
            name: "Kim",
            age: 28,
            favoriteAnimal: "dolphin"
        },
        {
            id: "974",
            name: "George",
            age: 84,
            favoriteAnimal: "chicken"
        }
    ];

    const updatedZookeepers = filterByQuery({ favoriteAnimal: "chicken" }, startingZookeepers);

    expect(updatedZookeepers.length).toEqual(1);
});

test("finds by id", () => {
    const startingZookeepers = [
        {
            id: "0",
            name: "Kim",
            age: 28,
            favoriteAnimal: "dolphin" 
        },
        {
            id: "974",
            name: "George",
            age: 84,
            favoriteAnimal: "chicken"  
        }
    ];

    const result = findById("974", startingZookeepers);

    expect(result.name).toBe("George");
});

test("validates age", () => {
    const zookeeper = {
        id: "974",
        name: "George",
        age: 84,
        favoriteAnimal: "chicken"
    };

    const invalidZookeeper ={
        id: "974",
        name: "George",
        age: "84",
        favoriteAnimal: "chicken"
    };

    const result = validateZookeeper(zookeeper);
    const result2 = validateZookeeper(invalidZookeeper);

    expect(result).toBe(true);
    expect(result2).toBe(false);
})