import { faker } from '@faker-js/faker';
import { generateMockUsers } from '../utils/mockingUsers.js';
import { usersService, petsService } from '../services/index.js';

const generateMockPet = () => ({
    name: faker.animal.petName(),
    specie: faker.helpers.arrayElement(['dog', 'cat', 'rabbit', 'bird', 'fish']),
    birthDate: faker.date.past({ years: 10 }),
    adopted: false,
    image: ''
});

const getMockingPets = async (req, res) => {
    const pets = Array.from({ length: 100 }, generateMockPet);
    res.send({ status: 'success', payload: pets });
};

const getMockingUsers = async (req, res) => {
    const users = await generateMockUsers(50);
    res.send({ status: 'success', payload: users });
};

const generateData = async (req, res) => {
    const { users = 0, pets = 0 } = req.body;

    const mockUsers = await generateMockUsers(Number(users));
    const mockPets = Array.from({ length: Number(pets) }, generateMockPet);

    await Promise.all(mockUsers.map(user => usersService.create(user)));
    await Promise.all(mockPets.map(pet => petsService.create(pet)));

    res.send({
        status: 'success',
        message: `${users} users and ${pets} pets inserted into the database`
    });
};

export default {
    getMockingPets,
    getMockingUsers,
    generateData
};
