const sqlite = require('sqlite');
const sqlite3 = require('sqlite3');

async function setup() {
  const db = await sqlite.open({
    filename: 'cars.sqlite',
    driver: sqlite3.Database,
  });

  await db.migrate({ force: 'last' });

  const users = await db.all('SELECT * FROM User ORDER BY createDate DESC');
  console.log('ALL Users', JSON.stringify(users, null, 2));

  // const cars = await db.all('SELECT * FROM Car');
  // console.log('ALL CARS', JSON.stringify(cars, null, 2));

  // const merchants = await db.all('SELECT * FROM Merchant ORDER BY createDate DESC');
  // console.log('ALL Merchants', JSON.stringify(merchants, null, 2));

}

setup();
