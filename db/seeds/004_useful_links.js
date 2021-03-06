
exports.seed = function(knex) {
      // Inserts seed entries
      return knex('useful_links').insert([
        {
          name: 'node.js documentation',
          description: "The official API reference documentation for Node.js. A JavaScript runtime built on the V8 JavaScript engine.",
          url: "https://www.nodejs.org/docs/latest/api",
          tag_name: "backend",
        },
        {
          name: 'HTTP request methods',
          description: "HTTP defines a set of request methods to indicate the desired action to be performed for a given resource.",
          url: "https://www.developer.mozilla.org/en-US/docs/Web/HTTP/Methods",
          tag_name: "backend",
        },
        {
          name: 'HTTP response status codes',
          description: 'HTTP response status codes indicate whether a specific HTTP request has been successfully completed. Responses are grouped in five classes: 1. Informational responses (100-199) 2. Successfull responses (200-299) 3. Redirects (300-399) 4. Client errors (400-499) 5. and Server errors (500-599).',
          url: "https://www.developer.mozilla.org/en-US/docs/Web/Status",
          tag_name: "backend",
        },
        {
          name: 'Response.status',
          description: 'Contains the status code of the response. E.G, 200 for a success.',
          url: "https://www.developer.mozilla.org/en-US/docs/Web/API/Response/status",
          tag_name: "backend",
        },
        {
          name: 'SQL keywords reference',
          description: 'A list of reserved words in SQL.',
          url: "https://www.w3schools.com/sql/sql_ref_keywords.asp",
          tag_name: "backend",
        },
        {
          name: 'Material UI react templates',
          description: 'A selection of free react templates to help you get started building your app. The collection contains react dashboard, react admin, and more.',
          url: "https://material-ui/com/getting-started/templates/",
          tag_name: "frontend",
        },
        {
          name: 'Express request documentation',
          description: 'The req object represents the HTTP requets and has properties for the reqest query string, parameters, body, HTTP headers, and so on.\n In this documentaiton and by convertion, the object is always referred to as req (and the HTTP response is res) but its actual name is determined by the parameters to the callback function in which you\'re working.\n The req object is an enhanced version of Node\'s own requestobject and supports all built-in fields and methods',
          url: "https://www.expressjs.com/en/4x/api.html#req",
          tag_name: "backend",
        },
        {
          name: 'A visual explanation of SQL joins',
          url: "https://blog.codinghorror.com/a-visual-explanation-of-sql-joins/",
          tag_name: "backend",
        },
        {
          name: 'Built-in Aggregate Functions',
          description: "Refers to the calculations performed on a data set to get a single number that accurately represents the underlying data.",
          url: "https://sqlite.org/lang_aggfunc.html",
          tag_name: "backend",
        },
        {
          name: 'How do I collapse sections of code in visual studio code for windows?',
          description: "Fold: Ctrl + Shift + [\nUnfold: Ctrl + Shift + ]\nFold All: Ctrl + (K 0)\nUnfold All: Ctrl + (k j)",
          url: "https://stackoverflow.com/questions/30067767/how-do-i-collapse-sections-of-code-in-visual-studio-code-for-windows/46597272",
          tag_name: "general",
        },
        {
          name: 'NPM init -y Explanation',
          description: "The -y flag when passed to NPM commands tells the generator to use the defaults instead of asking questions. The -y stands for yes.",
          url: "https://www.dailysmarty.com/posts/npm-init-y-explanation",
          tag_name: "backend",
        },
        {
          name: 'Knex cheatsheet',
          description: "Knex is an SQL query builder for Node.js.",
          url: "https://www.devhits.io/knex",
          tag_name: "backend",
        },
        {
          name: 'Jest expect',
          description: "When you're writing tests, you often need to check that values meet certain conditions. Expect gives you access to a number of \"matchers\" that let you validate different things.",
          url: "https://www.jestjs.io/docs/en/expect",
          tag_name: "backend",
        },
        {
          name: 'Jest Globals',
          description: "In your test files, Jest puts each of these methods and objects into the global environment. You don't have to require or import anything to use them.",
          url: "https://www.jestjs.io/docs/en/api",
          tag_name: "backend",
        },
        {
          name: 'REQ|RES',
          description: "A hosted REST-API ready to respond to your AJAX requests.",
          url: "https://www.reqres.in",
          tag_name: "frontend",
        },
        {
          name: 'HTML element reference',
          description: "HTML tags ordered alphabetically.",
          url: "https://www.w3schools.com/tags/default.asp",
          tag_name: "frontend",
        },
        {
          name: 'HTML semantic elements',
          description: "Semantic elements equals elements with a meaning.",
          url: "https://www.w3schools.com/html/html5_semantic_elements.asp",
          tag_name: "frontend",
        },
        {
          name: 'React Testing Library Cheatsheet',
          description: "A short guide to all the exported functions in React Testing Library.",
          url: "https://www.w3schools.com/html/html5_semantic_elements.asp",
          tag_name: "frontend",
        },
        {
          name: 'Which query should I use?',
          description: "Based on the Guiding Principles, your test should resemble how users intereact with your code (component, page, etc.) as much as possible.",
          url: "https://www.testing-library.com/docs/guide-which-query/",
          tag_name: "frontend",
        },
        {
          name: 'What is the meaning of git reset --hard origin/master? ',
          description: "It means throws away all my staged and unstaged changes, forget everything on my current local branch and make it exactly the same as origin/master.",
          url: "https://www.testing-library.com/docs/guide-which-query/",
          tag_name: "general",
        },
        {
          name: 'Window.localStorage',
          description: "The read-only localStorage property allows you to access a Sorage object for the DOcument's origin; the stored data is saved across browser sessions. localStorage is similar to sessionStorage, expect that while data stored in localStorage has no expiration time, data stored in sessionStorage gets cleared when the page session ends --- that is, when the page is closed. (Data is a localStorage object created in a \"private browsing\" or \"incognito\" session is cleared when the last \"private\" tab is closed.)",
          url: "https://www.deve;p[er/mozilla.org/en-US/docs/Web/API/Window/localStorage",
          video: "https://www.youtube.com/watch?v=er1JEDuPbZQ",
          tag_name: "frontend",
        },
        {
          name: 'Block Element Modifier (BEM)',
          description: "Block Element Modifier is a methodology that helps you to create reusable components and code sharing in front-end development.)",
          url: "https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage",
          tag_name: "frontend",
        },
        {
          name: 'useHistory',
          description: "The userHistory hook gives acccess to the history instance that you may use to navigate.",
          url: "https://reactrouter.com/web/api/Hooks/usehistory",
          tag_name: "frontend",
        },
        {
          name: 'useParams',
          description: "useParams returns an object of key/value pairs of URL parameters. Use it to access match.params of the current <Route>.",
          url: "https://reactrouter.com/web/api/Hooks/useparams",
          tag_name: "frontend",
        },
        {
          name: '<BrowserRouter',
          description: "A <Router> that uses the HTML5 history API (pushState, replaceState and the popstate event) to keep your UI in sync with the URL.",
          url: "https://reactrouter.com/web/api/Hooks/BrowserRouter",
          tag_name: "frontend",
        },
        {
          name: '<Route>',
          description: "The Route component is perhaps the most important component in React Router to understand and learn to use well. Its most basic responsibility is to render some UI when its path matches the current URL.",
          url: "https://reactrouter.com/web/api/Hooks/Route",
          tag_name: "frontend",
        },
        {
          name: 'render-func',
          description: "This allows for convenient inline rendering and wrapping without the undesired remounting explained above.",
          url: "https://reactrouter.com/web/api/Hooks/render-fuc",
          tag_name: "frontend",
        },
        {
          name: 'render-func',
          description: "This allows for convenient inline rendering and wrapping without the undesired remounting explained above.",
          url: "https://reactrouter.com/web/api/Hooks/render-fuc",
          tag_name: "frontend",
        },
        {
          name: '<input>: The input (form input) element',
          description: "The HTML <input> element is used to create interactive controls for web-based forms in order to accept data from the user; a wide variety of types of input data and control widgets are available, depending on the device and user agent. The <input> element is one of the most powerful and complex in all of HTML due to the sheer number of combinations of input types and attributes.",
          video: "https://www.youtube.com/watch?v=CKfIVNyleXo&t=2s",
          url: "https://www.developer.mozilla.org/en-US/docs/Web/HTML/Element/input",
          tag_name: "frontend",
        },
        {
          name: 'Vercel deployment',
          description: "A deployment is the result of building your project and making it available through a live URL. This section contains information about making, managing, and understanding the behavior of deployments.",
          url: "https://www.vercel.com/docs/platform/deployments",
          tag_name: "frontend",
        },
        {
          name: 'Vercel CLI',
          url: "https://www.github.com/vercel/vercel/tree/master/packages/now-cli",
          tag_name: "frontend",
        },
        {
          name: 'HTML elements reference',
          url: "https://www.developer.mozilla.org/en-US/docs/Web/HTML/Element",
          description: "This page lists all the HTML elements, which are using tags. They are grouped by function to help you find what you have in mind easily. An alphabetical list of all elements is provided in the sidebar on every element's page as well as this one.",
          tag_name: "frontend",
        },
        {
          name: 'React Component',
          url: "https://www.reactjs.org/docs/react-component.html",
          description: "React lets you define components as classes or functions. COmponents defined as classes curently provide more features which are described in detail on this page. To define a React component class, you need to extend React.Component.\n The only method you must define in a React.Component subclass is called render(). All the other methods described on this page are optional. \n We strongly recommend against creating your own base component classes. In React components, code reuse is primarily achieved through composition rather than inheritance.\n Each component has several \"lifecycle methods\" that you can overrride to run code at particular times in the process.",
          tag_name: "frontend",
        },
        {
          name: 'Lifecyle diagram cheat sheet',
          url: "https://www.projects.wojtekmaj.pl/react-lifecycle-methods-diagram/",
          tag_name: "frontend",
        },
        {
          name: 'Arra.prototype.map()',
          url: "https://www.developer.mozillar.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Array/map",
          description: "The map() mehod creates a new array populated with the results of calling a provided function on every element in the calling array.",
          tag_name: "general",
        },
        {
          name: 'JavaScript String.prototype.replace()',
          url: "https://www.developer.mozillar.org/en-US/docs/Web/JavaScript/Reference/Global_objects/String/replace",
          description: "The replace() method returns a new with some or all matches of a pattern replaced by a replacement. THe pattern can be a string or a RegExp, and the replacement can be a string or a function to be called for each match. If pattern is a string, only the first occurrence will be replaced.",
          tag_name: "general",
        },
        {
          name: 'Regular expresssions',
          url: "https://www.developer.mozillar.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions",
          description: "Regular expressions are patterns used to match character combinations in strings. In JavaScript, regular expressions are also objects. These patterns are used with the exec() and test() methods for RegExp, and with the match(), matchAll(), replace(), replaceAll(), search(), and split() methods of String.",
          video: "https://www.youtube.com/watch?v=rhzKDrUiJVk",
          tag_name: "general",
        },
        {
          name: 'regexr.com',
          url: "https://regexr.com/",
          description: "Regular expression tester with suntax highlighting, JS support, contextual help, cheat sheet, reference, and searchable community patterns.",
          tag_name: "general",
        },
        {
          name: 'String.prototype.replace()',
          url: "https://www.developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace",
          description: "The replace() method returns a new string with some or all matches of a pattern replaced by a replacement. The pattern can be a string or a RegExp, and the replacement can be a string or a function to be called for each match. If pattern is a string, only the first occurrence will be replaced. The original string is left unchanged.",
          tag_name: "general",
        },
        {
          name: 'String.prototype.filter()',
          url: "https://www.developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter",
          description: "The filter() method creates a new array with all elements that pass the test implemented by the provided function.",
          tag_name: "general",
        },
        {
          name: 'String.prototype.filter()',
          url: "https://www.developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter",
          description: "The filter() method creates a new array with all elements that pass the test implemented by the provided function.",
          tag_name: "general",
        },

      ]);
};
