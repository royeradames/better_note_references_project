
exports.seed = function(knex) {
      // Inserts seed entries
      return knex('libraries').insert([
        {
          name: 'Express.js',
          description: "Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.",
          tag_name: "backend",
          link: "https://expressjs.com/"
        },
        {
          name: 'Node.js',
          description: "Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine.",
          tag_name: "backend",
          link: "https://nodejs.org/en/"
        },
        {
          name: 'Cors',
          description: "CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.",
          tag_name: "backend",
          link: "https://expressjs.com/en/resources/middleware/cors.html"
        },
        {
          name: 'Nodemon',
          description: "nodemon is a tool that helps develop node.js based applications by automatically restarting the node application when file changes in the directory are detected.",
          tag_name: "backend",
          link: "https://www.npmjs.com/package/nodemon"
        },
        {
          name: 'Helmet',
          description: "Helmet helps you secure your Express apps by setting various HTTP headers. It's not a silver bullet, but it can help!",
          tag_name: "backend",
          link: "https://www.npmjs.com/package/helmet"
        },
        {
          name: 'cross-env 🔀',
          description: "cross-env makes it so you can have a single command without worrying about setting or using the environment variable properly for the platform. Just set it like you would if it's running on a POSIX system, and cross-env will take care of setting it properly.",
          tag_name: "backend",
          link: "https://www.npmjs.com/package/cross-env"
        },
        {
          name: 'dotenv',
          description: "Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env.",
          tag_name: "backend",
          link: "https://www.npmjs.com/package/dotenv"
        },
        {
          name: 'knex',
          description: "SQL query builder for Postgres, MSSQL, MySQL, MariaDB, SQLite3, Oracle, and Amazon Redshift",
          tag_name: "backend",
          link: "http://knexjs.org/"
        },
        {
          name: 'sqlite3',
          description: "Run sqlite",
          tag_name: "backend",
          link: "https://www.npmjs.com/package/sqlite3"
        },
        {
          name: 'faker',
          description: "Generate massive amounts of fake data in the browser and node.js",
          tag_name: "backend",
          link: "https://www.npmjs.com/package/faker"
        },
        {
          name: 'supertest',
          description: "provide a high-level abstraction for testing HTTP, while still allowing you to drop down to the lower-level API provided by superagent.",
          tag_name: "backend",
          link: "https://www.npmjs.com/package/supertest"
        },
        {
          name: 'knex-cleaner',
          description: "Helper library to clean a PostgreSQL, MySQL or SQLite3 database tables using Knex. Great for integration tests.",
          tag_name: "backend",
          link: "https://www.npmjs.com/package/knex-cleaner"
        },
        {
          name: 'bcrypt',
          description: "Hash, and unhash passwords.",
          tag_name: "backend",
          link: "https://www.npmjs.com/package/knex-cleaner"
        },
        {
          name: 'jsonwebtoken',
          description: "An implementation of Json web token (JWT). JWT is a compact, URL-safe means of representing claims to be transferred between two parties.",
          tag_name: "backend",
          link: "https://www.npmjs.com/package/jsonwebtoken"
        },
        {
          name: 'jest',
          description: "A testing framework.",
          tag_name: "backend",
          link: "https://jestjs.io/docs/en/getting-started"
        },
      ]);
};
