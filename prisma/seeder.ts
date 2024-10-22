import { PrismaClient } from '@prisma/client';

const dbService = new PrismaClient();

async function seedCategory() {
  const categories = ['Shopping', 'Subscription', 'Food', 'Salary', 'Transportation', 'General Use', 'Loan', 'Borrow', 'Other'];

  categories.map(async (cate) => {
    await dbService.category.create({
      data: {
        name: cate,
      },
    });
  });
}

seedCategory();
