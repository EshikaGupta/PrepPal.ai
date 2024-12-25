import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  
  const generationConfig1 = {
    temperature: 1,
    topP: 0.95,
    topK: 50,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };

export const courseOutlineAIModel = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "Generate a detailed study material for Python for Exam and level of difficulty should be Easy, with summary of course, list of chapters with summary of each chapter, topic list in each chapter. All results should be in JSON format."},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\"courseSummary\": \"This course provides an easy introduction to Python programming.  It covers fundamental concepts and syntax, making it suitable for beginners with little to no prior programming experience.  The focus is on practical application and building a solid foundation for further learning.\", \"chapters\": [{\"chapterTitle\": \"Introduction to Python\", \"chapterSummary\": \"This chapter introduces the basics of Python, including its history, applications, and how to set up your programming environment. You will learn how to write and run your first Python program.\", \"topics\": [\"What is Python?\", \"Why learn Python?\", \"Setting up Python environment\", \"First Python program\", \"Basic Syntax\", \"Running Python code\"]}, {\"chapterTitle\": \"Variables and Data Types\", \"chapterSummary\": \"This chapter covers fundamental data types in Python, including integers, floats, strings, and booleans, and explains how to work with variables.\", \"topics\": [\"Integers\", \"Floats\", \"Strings\", \"Booleans\", \"Variables\", \"Variable assignment\", \"Data type conversion\"]}, {\"chapterTitle\": \"Operators\", \"chapterSummary\": \"This chapter explains different types of operators used in Python: arithmetic, comparison, logical, assignment, and bitwise operators.\", \"topics\": [\"Arithmetic operators\", \"Comparison operators\", \"Logical operators\", \"Assignment operators\", \"Bitwise operators\", \"Operator precedence\"]}, {\"chapterTitle\": \"Control Flow\", \"chapterSummary\": \"This chapter covers control flow statements that allow you to control the order in which your code executes, including conditional statements and loops.\", \"topics\": [\"Conditional statements (if, elif, else)\", \"For loops\", \"While loops\", \"Break and continue statements\"]}, {\"chapterTitle\": \"Data Structures\", \"chapterSummary\": \"This chapter introduces basic data structures: lists, tuples, and dictionaries, and explains how to create, access, and manipulate them.\", \"topics\": [\"Lists\", \"Tuples\", \"Dictionaries\", \"List operations\", \"Tuple operations\", \"Dictionary operations\"]}, {\"chapterTitle\": \"Functions\", \"chapterSummary\": \"This chapter covers functions: reusable blocks of code that perform specific tasks.  You will learn how to define and call functions.\", \"topics\": [\"Defining functions\", \"Function arguments\", \"Return values\", \"Function calls\", \"Scope\"]}, {\"chapterTitle\": \"Input and Output\", \"chapterSummary\": \"This chapter will show you how to get input from the user and display output using the print function and other methods.\", \"topics\": [\"Taking user input\", \"Displaying output\", \"Formatted output\", \"File input/output (basic)\"]}]}\n```"},
          ],
        },
      ],
    });

    export const generateNotesAIModel = model.startChat({
        generationConfig1,
        history: [
          {
            role: "user",
            parts: [
              {text: "generate detailed study material content for each chapter. make sure to include all topics points in the content in detail. make sure to give content in HTML format  (do not add HTML, body, head, title tags) and no extra content should be added . The chapter with title, summary and topics is: {\"chapterTitle\": \"Introduction to Machine Learning\",\"chapterSummary\": \"This chapter introduces the core concepts of machine learning, including different learning paradigms, types of problems, and evaluation metrics.  It sets the stage for the subsequent chapters.\",\"topics\": [ \"What is Machine Learning?\",\"Supervised vs. Unsupervised Learning\",\"Reinforcement Learning\",\"Types of Machine Learning Problems (Regression, Classification\\\", Clustering)\",\"Model Evaluation Metrics (Accuracy, Precision, Recall, F1-score, AUC)\",\"Bias-Variance Tradeoff\", \"Overfitting and Underfitting\"] }"},
            ],
          },
          {
            role: "model",
            parts: [
              {text: "<h1>Introduction to Machine Learning</h1>\n\n<p><b>Chapter Summary:</b> This chapter introduces the core concepts of machine learning, including different learning paradigms, types of problems, and evaluation metrics.  It sets the stage for the subsequent chapters.</p>\n\n<h2>What is Machine Learning?</h2>\n<p>Machine learning is a field of computer science that allows computers to learn from data without being explicitly programmed.  Instead of relying on pre-defined rules, machine learning algorithms identify patterns and relationships in data to make predictions or decisions.  Key aspects include:</p>\n<ul>\n    <li><b>Learning from Data:</b> Algorithms learn from examples, identifying underlying patterns.</li>\n    <li><b>Predictive Modeling:</b> Algorithms make predictions about future data based on learned patterns.</li>\n    <li><b>Pattern Recognition:</b> Algorithms discover hidden structures and relationships within data.</li>\n    <li><b>Automation:</b> Machine learning automates decision-making processes.</li>\n    <li><b>Adaptability:</b> Algorithms adapt to new data and improve their performance over time.</li>\n</ul>\n\n\n<h2>Supervised vs. Unsupervised Learning</h2>\n<p>Machine learning tasks are broadly categorized into supervised and unsupervised learning, based on the type of data used for training:</p>\n<ul>\n    <li><b>Supervised Learning:</b> Algorithms learn from labeled data, where each data point is associated with a known output or target variable.  Examples include regression (predicting a continuous value) and classification (predicting a categorical value).</li>\n    <li><b>Unsupervised Learning:</b> Algorithms learn from unlabeled data, seeking inherent structures or patterns without predefined outputs.  Examples include clustering (grouping similar data points together).</li>\n</ul>\n\n\n<h2>Reinforcement Learning</h2>\n<p>Reinforcement learning is a type of machine learning where an agent learns to make decisions in an environment by interacting with it and receiving rewards or penalties.  The agent's goal is to maximize cumulative rewards over time. Key elements include:</p>\n<ul>\n    <li><b>Agent:</b> The learning entity interacting with the environment.</li>\n    <li><b>Environment:</b> The external world the agent interacts with.</li>\n    <li><b>Actions:</b> The choices the agent can make in the environment.</li>\n    <li><b>Rewards:</b> Feedback provided to the agent for its actions.</li>\n    <li><b>Policy:</b> The strategy used by the agent to make decisions.</li>\n</ul>\n\n\n<h2>Types of Machine Learning Problems</h2>\n<ul>\n    <li><b>Regression:</b> Predicting a continuous target variable (e.g., house prices, stock prices).</li>\n    <li><b>Classification:</b> Predicting a categorical target variable (e.g., spam/not spam, cat/dog).</li>\n    <li><b>Clustering:</b> Grouping similar data points together (e.g., customer segmentation, document categorization).</li>\n</ul>\n\n\n<h2>Model Evaluation Metrics</h2>\n<p>Evaluating the performance of a machine learning model is crucial.  Common metrics include:</p>\n<ul>\n    <li><b>Accuracy:</b> Proportion of correctly classified instances.</li>\n    <li><b>Precision:</b> Proportion of correctly predicted positive instances out of all predicted positives.</li>\n    <li><b>Recall:</b> Proportion of correctly predicted positive instances out of all actual positive instances.</li>\n    <li><b>F1-score:</b> Harmonic mean of precision and recall.</li>\n    <li><b>AUC (Area Under the ROC Curve):</b> Measures the model's ability to distinguish between classes.</li>\n</ul>\n\n\n<h2>Bias-Variance Tradeoff</h2>\n<p>A fundamental concept in machine learning is the tradeoff between bias and variance.  Models with high bias make overly simplistic assumptions and underfit the data, while models with high variance overfit the data by capturing noise and performing poorly on new, unseen data.</p>\n\n\n<h2>Overfitting and Underfitting</h2>\n<p><b>Overfitting</b> occurs when a model learns the training data too well, including noise and irrelevant details. This leads to poor generalization to unseen data.  <b>Underfitting</b> occurs when a model is too simple to capture the underlying patterns in the data, resulting in poor performance on both training and unseen data.</p>\n"},
            ],
          },
        ]
      });

      export const generateStudyTypeContentAIModel = model.startChat({
        generationConfig,
        history: [
          {
            role: "user",
            parts: [
              {text: "generate maximum 15 flashcards on topics : Flutter Fundamentals, User Interface (UI) Development, Basic app navigation in JSON format with content on front and back of cards"},
            ],
          },
          {
            role: "model",
            parts: [
              {text: "```json\n[\n  {\n    \"front\": \"What is Flutter?\",\n    \"back\": \"Flutter is a UI toolkit for building beautiful, natively compiled applications for mobile, web, desktop, and embedded devices from a single codebase. It uses the Dart programming language.\"\n  },\n  {\n    \"front\": \"Widgets in Flutter\",\n    \"back\": \"Widgets are the fundamental building blocks of a Flutter UI. They encapsulate visual elements (buttons, text fields, images, etc.) and their behavior.  They are reusable and highly customizable.\"\n  },\n  {\n    \"front\": \"Stateful vs. Stateless Widgets\",\n    \"back\": \"Stateful widgets can change their state and rebuild their UI, often responding to user interactions. Stateless widgets do not have internal state and render their UI based on the provided data.  Stateful widgets use the `State` class.\"\n  },\n  {\n    \"front\": \"What is a Widget Tree?\",\n    \"back\": \"A hierarchical structure of widgets that visually represents the layout and content of your application.  Widgets are nested inside one another, forming a tree.\"\n  },\n  {\n    \"front\": \"Common Flutter Layout Widgets\",\n    \"back\": \"Examples include `Column`, `Row`, `Container`, `Expanded`, `Align`, `Padding`, and `SizedBox`. These widgets manage the arrangement of child widgets within a layout.\"\n  },\n  {\n    \"front\": \"How to use `Scaffold`\",\n    \"back\": \"`Scaffold` is a foundational widget that provides a basic structure for an application's layout.  It includes properties like `appBar`, `body`, `drawer`, etc.\"\n  },\n  {\n    \"front\": \"App Bar in Flutter\",\n    \"back\": \"The `AppBar` widget is used for the top bar of your application, providing title, actions, navigation, and potentially a drawer.\"\n  },\n  {\n    \"front\": \"What's `setState()`?\",\n    \"back\": \"The method used in Stateful widgets to trigger a rebuild of the UI after a change in state. This ensures the UI reflects the updated data.\"\n  },\n  {\n    \"front\": \"`Navigator.push`\",\n    \"back\": \"Used to navigate to another route/screen.  A common method for navigation between screens in Flutter applications.  It takes a `MaterialPageRoute` or similar as argument.\"\n  },\n  {\n    \"front\": \"`Navigator.pop`\",\n    \"back\": \"Used to return to the previous screen/route in the navigation stack.\"\n  },\n  {\n    \"front\": \"`MaterialPageRoute`\",\n    \"back\": \"A class defining a route for navigation using `Navigator.push`. It's often used for material design-like transitions between screens.\"\n  },\n  {\n    \"front\": \"`BottomNavigationBar`\",\n    \"back\": \"A widget to display a bottom navigation bar with different navigation destinations.  Used for quick transitions between multiple parts of an app.\"\n  },\n   {\n    \"front\": \"Dart's `async`/`await`\",\n    \"back\": \"Used in Flutter to handle asynchronous operations like network requests cleanly and without callbacks, making code easier to read.\"\n  },\n  {\n    \"front\": \"What's the `ListView` widget?\",\n    \"back\": \"For displaying scrollable lists of items in Flutter.  Supports rendering large lists of data efficiently.\"\n  },\n\n  {\n    \"front\": \"Basic JSON data for a screen navigation\",\n    \"back\": `\n    {\n      \"routes\": [\n        {\n          \"name\": \"Home\",\n          \"path\": \"/\"\n        },\n        {\n          \"name\": \"Profile\",\n          \"path\": \"/profile\"\n        }\n      ]\n    }\n   `\n  }\n]\n```"},
            ],
          },
        ],
      });

      export const generateQuizAIModel = model.startChat({
        generationConfig,
        history: [
          {
            role: "user",
            parts: [
              {text: "Generate a quiz on topics : Flutter Fundamentals, User Interface (UI) Development, Basic app navigation, with max 10 questions with 4 options each and the correct option in json format"},
            ],
          },
          {
            role: "model",
            parts: [
              {text: "```json\n{\n  \"quiz\": [\n    {\n      \"question\": \"What is the primary programming language used in Flutter development?\",\n      \"options\": [\"Java\", \"Kotlin\", \"Dart\", \"Swift\"],\n      \"answer\": \"Dart\"\n    },\n    {\n      \"question\": \"Which widget is the root of the Flutter widget tree?\",\n      \"options\": [\"Scaffold\", \"Container\", \"MaterialApp\", \"Center\"],\n      \"answer\": \"MaterialApp\"\n    },\n    {\n      \"question\": \"What is the purpose of a StatefulWidget in Flutter?\",\n      \"options\": [\"To create static UI elements\", \"To create dynamic UI elements that can change state\", \"To manage app navigation\", \"To handle user input\"],\n      \"answer\": \"To create dynamic UI elements that can change state\"\n    },\n    {\n      \"question\": \"Which widget is best suited for arranging children in a column?\",\n      \"options\": [\"Row\", \"Column\", \"Stack\", \"Container\"],\n      \"answer\": \"Column\"\n    },\n    {\n      \"question\": \"How do you navigate to a new route in Flutter using the Navigator?\",\n      \"options\": [\"Navigator.pushNamed(context, '/newRoute')\", \"Navigator.pop(context)\", \"Navigator.pushReplacementNamed(context, '/newRoute')\", \"All of the above\"],\n      \"answer\": \"Navigator.pushNamed(context, '/newRoute')\"\n    },\n    {\n      \"question\": \"What widget is commonly used to display a list of items in Flutter?\",\n      \"options\": [\"Row\", \"Column\", \"ListView\", \"Stack\"],\n      \"answer\": \"ListView\"\n    },\n    {\n      \"question\": \"Which widget is used to display an image in Flutter?\",\n      \"options\": [\"Image.asset()\", \"Image.network()\", \"Both Image.asset() and Image.network()\", \"None of the above\"],\n      \"answer\": \"Both Image.asset() and Image.network()\"\n    },\n    {\n      \"question\": \"What is the purpose of the `key` property in Flutter widgets?\",\n      \"options\": [\"To uniquely identify a widget\", \"To style a widget\", \"To manage widget state\", \"To handle user input\"],\n      \"answer\": \"To uniquely identify a widget\"\n    },\n    {\n      \"question\": \"Which of these is NOT a fundamental layout widget in Flutter?\",\n      \"options\": [\"Row\", \"Column\", \"Grid\", \"Stack\"],\n      \"answer\": \"Grid\" \n    },\n    {\n      \"question\": \"How do you pass data between routes using Navigator.pushNamed?\",\n      \"options\": [\"Using route parameters\", \"Using shared preferences\", \"Using global variables\", \"All of the above\"],\n      \"answer\": \"Using route parameters\"\n    }\n  ]\n}\n```\n"},
            ],
          },
        ],
      });
