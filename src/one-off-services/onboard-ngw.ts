/** Gets all the users from NGW to send an onboard message about Chat bot
 *
 * 1) Get NGW users who are not currently active Chat bot users
 * 2) Send message (if in prod)
 * 3) notify admin that users who were onboarded & failed onboarding
 */
import * as dotenv from 'dotenv-safe';
import { getUsersAtNgw } from '../recurse-api';
import { initDB } from '../db';
dotenv.config();

async function getInactiveNGWUsers() {
  const db = initDB();
  const activeUsers = db.User.findActiveUsers().map(user => user.email);
  const setActiveUsers = new Set(activeUsers);
  const usersAtNgw = await getUsersAtNgw();
  const usersToOnBoard = usersAtNgw
    .map(user => user.email)
    .filter(email => !setActiveUsers.has(email));

  return usersToOnBoard;
}

// TESTING
(async () => {
  console.log('immediately invoked function expression');
  const results = await getInactiveNGWUsers();
  console.log(results);
})();
