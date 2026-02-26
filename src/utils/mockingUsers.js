import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';

export const generateMockUsers = async (quantity) => {
    const users = await Promise.all(
        Array.from({ length: quantity }, async () => {
            const hashedPassword = await bcrypt.hash('coder123', 10);
            return {
                _id: faker.database.mongodbObjectId(),
                first_name: faker.person.firstName(),
                last_name: faker.person.lastName(),
                email: faker.internet.email(),
                age: faker.number.int({ min: 18, max: 80 }),
                password: hashedPassword,
                role: faker.helpers.arrayElement(['user', 'admin']),
                pets: []
            };
        })
    );
    return users;
};
