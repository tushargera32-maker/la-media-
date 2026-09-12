import bcrypt from 'bcryptjs';
import { prisma } from '../lib/prisma';

/*
  Creates (or leaves untouched) the admin user.
  Credentials come ONLY from the environment - there is deliberately no
  default password. Seeding refuses to run without ADMIN_PASSWORD so a
  weak well-known password can never end up in any database.
*/

async function main() {
  const email = (process.env.ADMIN_EMAIL ?? '').toLowerCase().trim();
  const password = process.env.ADMIN_PASSWORD ?? '';

  if (!email) {
    throw new Error('Refusing to seed: ADMIN_EMAIL is not set.');
  }
  if (password.length < 12) {
    throw new Error(
      'Refusing to seed: set a strong ADMIN_PASSWORD (min 12 characters).'
    );
  }

  console.log('Creating admin user...');

  const hashedPassword = await bcrypt.hash(password, 12);

  const admin = await prisma.user.upsert({
    where: { email },
    // Never overwrite an existing password on re-seed: a later
    // `db:seed` must not silently reset a rotated password.
    update: {},
    create: {
      email,
      password: hashedPassword,
      name: 'Admin User',
      role: 'admin',
    },
  });

  console.log('Admin user ready:', admin.email);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
