import { PrismaClient } from "../../src/generated/prisma/client.js";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import path from "node:path";

const dbPath = path.resolve(process.cwd(), "prisma/dev.db");
const adapter = new PrismaBetterSqlite3({ url: `file:${dbPath}` });
const prisma = new PrismaClient({ adapter });

type QuestionData = {
  prompt: string;
  choices: string[];
  answerIndex: number;
  explanation: string;
};

type AssessmentData = {
  skillSlug: string;
  type: string;
  title: string;
  description: string;
  passScore: number;
  questions: QuestionData[];
};

const assessments: AssessmentData[] = [
  {
    skillSlug: "python-basics",
    type: "QUIZ",
    title: "Python Basics Quiz",
    description: "Test your understanding of Python fundamentals: variables, data types, control flow, and functions.",
    passScore: 70,
    questions: [
      {
        prompt: "What is the output of: print(type(3.14))?",
        choices: ["<class 'int'>", "<class 'float'>", "<class 'decimal'>", "<class 'number'>"],
        answerIndex: 1,
        explanation: "3.14 is a floating-point number, so type() returns <class 'float'>.",
      },
      {
        prompt: "Which keyword is used to define a function in Python?",
        choices: ["function", "def", "func", "define"],
        answerIndex: 1,
        explanation: "Python uses 'def' to define functions.",
      },
      {
        prompt: "What does len([1, 2, 3, 4]) return?",
        choices: ["3", "4", "5", "[1, 2, 3, 4]"],
        answerIndex: 1,
        explanation: "len() returns the number of items in a list. The list has 4 elements.",
      },
      {
        prompt: "Which of the following is a valid Python variable name?",
        choices: ["2name", "_name", "my-name", "class"],
        answerIndex: 1,
        explanation: "Variable names can start with underscore. They cannot start with a number, contain hyphens, or be reserved keywords.",
      },
      {
        prompt: "What is the result of: 'hello' + ' ' + 'world'?",
        choices: ["hello world", "helloworld", "hello+space+world", "Error"],
        answerIndex: 0,
        explanation: "The + operator concatenates strings in Python.",
      },
    ],
  },
  {
    skillSlug: "data-structures",
    type: "QUIZ",
    title: "Data Structures Quiz",
    description: "Test your knowledge of arrays, linked lists, stacks, queues, and trees.",
    passScore: 70,
    questions: [
      {
        prompt: "What is the time complexity of accessing an element by index in an array?",
        choices: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
        answerIndex: 0,
        explanation: "Arrays provide constant-time access by index via direct memory offset calculation.",
      },
      {
        prompt: "Which data structure follows LIFO (Last In, First Out)?",
        choices: ["Queue", "Stack", "Linked List", "Binary Tree"],
        answerIndex: 1,
        explanation: "A stack follows LIFO: the last element pushed is the first one popped.",
      },
      {
        prompt: "What is the main advantage of a linked list over an array?",
        choices: [
          "Faster random access",
          "Less memory usage",
          "Efficient insertion/deletion",
          "Better cache performance",
        ],
        answerIndex: 2,
        explanation: "Linked lists allow O(1) insertion/deletion at known positions, while arrays require shifting elements.",
      },
      {
        prompt: "In a binary search tree, which traversal gives sorted order?",
        choices: ["Pre-order", "Post-order", "In-order", "Level-order"],
        answerIndex: 2,
        explanation: "In-order traversal (left, root, right) of a BST produces elements in sorted order.",
      },
      {
        prompt: "What is the average time complexity of searching in a hash table?",
        choices: ["O(1)", "O(n)", "O(log n)", "O(n log n)"],
        answerIndex: 0,
        explanation: "Hash tables provide O(1) average-case lookup via direct hash computation.",
      },
    ],
  },
  {
    skillSlug: "algorithms",
    type: "QUIZ",
    title: "Algorithms Quiz",
    description: "Test your understanding of sorting, searching, and algorithm design paradigms.",
    passScore: 70,
    questions: [
      {
        prompt: "What is the worst-case time complexity of QuickSort?",
        choices: ["O(n log n)", "O(n)", "O(n²)", "O(log n)"],
        answerIndex: 2,
        explanation: "QuickSort degrades to O(n²) when the pivot selection is poor (e.g., already sorted input with first-element pivot).",
      },
      {
        prompt: "Which algorithm paradigm divides a problem into overlapping subproblems?",
        choices: ["Divide and Conquer", "Dynamic Programming", "Greedy", "Backtracking"],
        answerIndex: 1,
        explanation: "Dynamic Programming solves overlapping subproblems by storing computed results.",
      },
      {
        prompt: "What is the time complexity of binary search?",
        choices: ["O(n)", "O(log n)", "O(n log n)", "O(1)"],
        answerIndex: 1,
        explanation: "Binary search halves the search space each step, giving O(log n).",
      },
      {
        prompt: "Which sorting algorithm is stable?",
        choices: ["QuickSort", "HeapSort", "MergeSort", "Selection Sort"],
        answerIndex: 2,
        explanation: "MergeSort preserves the relative order of equal elements, making it stable.",
      },
      {
        prompt: "What technique uses the greedy choice property and optimal substructure?",
        choices: ["Dynamic Programming", "Greedy Algorithms", "Backtracking", "Divide and Conquer"],
        answerIndex: 1,
        explanation: "Greedy algorithms make locally optimal choices at each step, requiring greedy choice property and optimal substructure.",
      },
    ],
  },
  {
    skillSlug: "linear-algebra",
    type: "QUIZ",
    title: "Linear Algebra Quiz",
    description: "Test your knowledge of vectors, matrices, eigenvalues, and linear transformations.",
    passScore: 70,
    questions: [
      {
        prompt: "What is the determinant of a 2x2 matrix [[a,b],[c,d]]?",
        choices: ["a+b+c+d", "ad-bc", "ac-bd", "ab-cd"],
        answerIndex: 1,
        explanation: "The determinant of a 2x2 matrix is ad - bc.",
      },
      {
        prompt: "A matrix is invertible if and only if its determinant is:",
        choices: ["Zero", "One", "Non-zero", "Negative"],
        answerIndex: 2,
        explanation: "A matrix is invertible (non-singular) if and only if its determinant is non-zero.",
      },
      {
        prompt: "What is the dot product of [1,2,3] and [4,5,6]?",
        choices: ["32", "14", "[4,10,18]", "21"],
        answerIndex: 0,
        explanation: "Dot product = 1*4 + 2*5 + 3*6 = 4 + 10 + 18 = 32.",
      },
      {
        prompt: "An eigenvector of matrix A satisfies: Av = λv. What is λ?",
        choices: ["The eigenvector", "The eigenvalue", "The determinant", "The trace"],
        answerIndex: 1,
        explanation: "λ is the eigenvalue corresponding to eigenvector v.",
      },
      {
        prompt: "What is the rank of a matrix?",
        choices: [
          "Number of rows",
          "Number of columns",
          "Dimension of column space",
          "Sum of all elements",
        ],
        answerIndex: 2,
        explanation: "The rank is the dimension of the column space (or row space), i.e., the number of linearly independent rows/columns.",
      },
    ],
  },
  {
    skillSlug: "probability",
    type: "QUIZ",
    title: "Probability Quiz",
    description: "Test your understanding of probability rules, distributions, and Bayesian reasoning.",
    passScore: 70,
    questions: [
      {
        prompt: "If P(A) = 0.3 and P(B) = 0.5, and A and B are independent, what is P(A ∩ B)?",
        choices: ["0.8", "0.15", "0.3", "0.5"],
        answerIndex: 1,
        explanation: "For independent events: P(A ∩ B) = P(A) × P(B) = 0.3 × 0.5 = 0.15.",
      },
      {
        prompt: "What does Bayes' theorem calculate?",
        choices: [
          "Joint probability",
          "Conditional probability from prior and likelihood",
          "Expected value",
          "Variance",
        ],
        answerIndex: 1,
        explanation: "Bayes' theorem: P(A|B) = P(B|A) × P(A) / P(B), computing posterior from prior and likelihood.",
      },
      {
        prompt: "What is the expected value of a fair 6-sided die?",
        choices: ["3", "3.5", "4", "6"],
        answerIndex: 1,
        explanation: "E[X] = (1+2+3+4+5+6)/6 = 21/6 = 3.5.",
      },
      {
        prompt: "If X ~ Binomial(n=10, p=0.5), what is E[X]?",
        choices: ["5", "10", "2.5", "0.5"],
        answerIndex: 0,
        explanation: "For binomial distribution, E[X] = np = 10 × 0.5 = 5.",
      },
      {
        prompt: "Two events are mutually exclusive if:",
        choices: [
          "They always occur together",
          "P(A ∩ B) = 0",
          "P(A|B) = P(A)",
          "P(A ∪ B) = P(A) + P(B)",
        ],
        answerIndex: 1,
        explanation: "Mutually exclusive events cannot happen simultaneously: P(A ∩ B) = 0.",
      },
    ],
  },
  {
    skillSlug: "databases-sql",
    type: "QUIZ",
    title: "SQL Basics Quiz",
    description: "Test your knowledge of SQL queries, joins, and database design.",
    passScore: 70,
    questions: [
      {
        prompt: "Which SQL clause is used to filter rows?",
        choices: ["SELECT", "WHERE", "GROUP BY", "ORDER BY"],
        answerIndex: 1,
        explanation: "WHERE filters rows based on a condition.",
      },
      {
        prompt: "What does JOIN return?",
        choices: [
          "All rows from both tables",
          "Only matching rows from both tables (for INNER JOIN)",
          "Only unmatched rows",
          "A single column",
        ],
        answerIndex: 1,
        explanation: "INNER JOIN returns rows that have matching values in both tables.",
      },
      {
        prompt: "Which aggregate function counts the number of rows?",
        choices: ["SUM()", "COUNT()", "AVG()", "MAX()"],
        answerIndex: 1,
        explanation: "COUNT() returns the number of rows matching the query.",
      },
      {
        prompt: "What is a primary key?",
        choices: [
          "A column that allows NULLs",
          "A unique identifier for each row in a table",
          "A column with duplicate values",
          "A foreign reference",
        ],
        answerIndex: 1,
        explanation: "A primary key uniquely identifies each row and cannot contain NULLs.",
      },
      {
        prompt: "What does GROUP BY do?",
        choices: [
          "Sorts the result set",
          "Groups rows sharing a value for aggregate functions",
          "Filters groups",
          "Combines tables",
        ],
        answerIndex: 1,
        explanation: "GROUP BY groups rows with the same values in specified columns for use with aggregate functions.",
      },
    ],
  },
  {
    skillSlug: "neural-networks",
    type: "QUIZ",
    title: "Neural Networks Quiz",
    description: "Test your understanding of neural network architectures, training, and optimization.",
    passScore: 70,
    questions: [
      {
        prompt: "What is the purpose of an activation function in a neural network?",
        choices: [
          "To initialize weights",
          "To introduce non-linearity",
          "To reduce overfitting",
          "To normalize inputs",
        ],
        answerIndex: 1,
        explanation: "Activation functions introduce non-linearity, allowing the network to learn complex patterns.",
      },
      {
        prompt: "What is backpropagation?",
        choices: [
          "A forward pass through the network",
          "An algorithm to compute gradients for weight updates",
          "A method to add more layers",
          "A regularization technique",
        ],
        answerIndex: 1,
        explanation: "Backpropagation computes gradients of the loss with respect to each weight using the chain rule.",
      },
      {
        prompt: "What does a learning rate too high cause?",
        choices: [
          "Slow convergence",
          "Overshooting the minimum",
          "Perfect convergence",
          "No learning",
        ],
        answerIndex: 1,
        explanation: "A high learning rate can cause the optimizer to overshoot the optimal solution, leading to divergence.",
      },
      {
        prompt: "What is the vanishing gradient problem?",
        choices: [
          "Gradients become too large in deep networks",
          "Gradients shrink exponentially in deep networks, hindering learning",
          "The learning rate is too small",
          "The model overfits",
        ],
        answerIndex: 1,
        explanation: "In deep networks, gradients can shrink exponentially through layers, making early layers learn very slowly.",
      },
      {
        prompt: "What is the purpose of dropout?",
        choices: [
          "To increase model size",
          "To randomly deactivate neurons during training to reduce overfitting",
          "To speed up training",
          "To add more data",
        ],
        answerIndex: 1,
        explanation: "Dropout randomly deactivates neurons during training, preventing co-adaptation and reducing overfitting.",
      },
    ],
  },
  {
    skillSlug: "supply-and-demand",
    type: "QUIZ",
    title: "Microeconomics Quiz",
    description: "Test your understanding of supply, demand, market equilibrium, and consumer theory.",
    passScore: 70,
    questions: [
      {
        prompt: "What happens to equilibrium price when demand increases and supply stays constant?",
        choices: ["Price decreases", "Price increases", "Price stays the same", "Cannot determine"],
        answerIndex: 1,
        explanation: "When demand increases (shifts right) and supply is constant, the equilibrium price rises.",
      },
      {
        prompt: "What is price elasticity of demand?",
        choices: [
          "The slope of the demand curve",
          "The percentage change in quantity demanded divided by percentage change in price",
          "The total revenue",
          "The consumer surplus",
        ],
        answerIndex: 1,
        explanation: "Price elasticity of demand measures responsiveness: %ΔQd / %ΔP.",
      },
      {
        prompt: "Consumer surplus is the difference between:",
        choices: [
          "Total cost and total revenue",
          "What a consumer is willing to pay and what they actually pay",
          "Supply and demand",
          "Fixed and variable costs",
        ],
        answerIndex: 1,
        explanation: "Consumer surplus is the gap between willingness to pay and the market price.",
      },
      {
        prompt: "In perfect competition, firms are:",
        choices: [
          "Price makers",
          "Price takers",
          "Monopolists",
          "Oligopolists",
        ],
        answerIndex: 1,
        explanation: "In perfect competition, firms are price takers — they accept the market price.",
      },
      {
        prompt: "What is the law of diminishing marginal utility?",
        choices: [
          "Total utility decreases as consumption increases",
          "Each additional unit consumed provides less additional satisfaction",
          "Marginal cost always increases",
          "Supply always equals demand",
        ],
        answerIndex: 1,
        explanation: "Each additional unit of a good provides less additional satisfaction than the previous unit.",
      },
    ],
  },
  {
    skillSlug: "linear-regression",
    type: "QUIZ",
    title: "Linear Regression Quiz",
    description: "Test your understanding of linear regression models, assumptions, and evaluation.",
    passScore: 70,
    questions: [
      {
        prompt: "What does the R² value represent?",
        choices: [
          "The slope of the regression line",
          "The proportion of variance in the dependent variable explained by the model",
          "The correlation coefficient",
          "The standard error",
        ],
        answerIndex: 1,
        explanation: "R² measures the proportion of variance in Y explained by the independent variables.",
      },
      {
        prompt: "In linear regression, what is the assumption about error terms?",
        choices: [
          "They must be positive",
          "They must be normally distributed with constant variance",
          "They must equal zero",
          "They must be correlated",
        ],
        answerIndex: 1,
        explanation: "Linear regression assumes errors are normally distributed with constant variance (homoscedasticity).",
      },
      {
        prompt: "What is multicollinearity?",
        choices: [
          "Non-linear relationships between variables",
          "High correlation between independent variables",
          "Missing data in the dataset",
          "Heteroscedasticity",
        ],
        answerIndex: 1,
        explanation: "Multicollinearity occurs when independent variables are highly correlated, making coefficient estimates unstable.",
      },
      {
        prompt: "What does a p-value < 0.05 for a coefficient indicate?",
        choices: [
          "The coefficient is zero",
          "The coefficient is statistically significant",
          "The model is perfect",
          "There is no relationship",
        ],
        answerIndex: 1,
        explanation: "A p-value < 0.05 suggests the coefficient is statistically significantly different from zero.",
      },
      {
        prompt: "What is the purpose of a train/test split?",
        choices: [
          "To make the model faster",
          "To evaluate model performance on unseen data",
          "To increase the dataset size",
          "To reduce overfitting during training",
        ],
        answerIndex: 1,
        explanation: "A train/test split evaluates how well the model generalizes to new, unseen data.",
      },
    ],
  },
  {
    skillSlug: "thermodynamics",
    type: "QUIZ",
    title: "Thermodynamics Quiz",
    description: "Test your understanding of the laws of thermodynamics, entropy, and heat transfer.",
    passScore: 70,
    questions: [
      {
        prompt: "What does the First Law of Thermodynamics state?",
        choices: [
          "Entropy always increases",
          "Energy cannot be created or destroyed",
          "Heat flows from cold to hot",
          "Absolute zero cannot be reached",
        ],
        answerIndex: 1,
        explanation: "The First Law is conservation of energy: energy cannot be created or destroyed, only transformed.",
      },
      {
        prompt: "What is entropy?",
        choices: [
          "The total energy of a system",
          "A measure of disorder or randomness",
          "The temperature of a system",
          "The pressure of a gas",
        ],
        answerIndex: 1,
        explanation: "Entropy is a measure of the disorder or number of microstates in a system.",
      },
      {
        prompt: "In an adiabatic process:",
        choices: [
          "Temperature is constant",
          "No heat is exchanged with the surroundings",
          "Pressure is constant",
          "Volume is constant",
        ],
        answerIndex: 1,
        explanation: "Adiabatic processes involve no heat transfer (Q = 0) between the system and surroundings.",
      },
      {
        prompt: "What is the efficiency of a Carnot engine?",
        choices: [
          "100%",
          "1 - T_cold/T_hot",
          "T_hot/T_cold",
          "T_cold × T_hot",
        ],
        answerIndex: 1,
        explanation: "Carnot efficiency = 1 - T_cold/T_hot (temperatures in Kelvin), the maximum theoretical efficiency.",
      },
      {
        prompt: "The Second Law of Thermodynamics implies:",
        choices: [
          "Energy is conserved",
          "Entropy of an isolated system never decreases",
          "Heat flows from cold to hot",
          "Perpetual motion machines are possible",
        ],
        answerIndex: 1,
        explanation: "The Second Law states that entropy of an isolated system always increases or stays constant.",
      },
    ],
  },
];

async function seedAssessments() {
  console.log("📝 Seeding assessments...");

  for (const assessment of assessments) {
    const skill = await prisma.skill.findUnique({
      where: { slug: assessment.skillSlug },
    });

    if (!skill) {
      console.warn(`  ⚠ Skill "${assessment.skillSlug}" not found, skipping assessment`);
      continue;
    }

    // Create or update assessment
    const existing = await prisma.assessment.findFirst({
      where: { skillId: skill.id, type: assessment.type },
    });

    const assm = existing
      ? await prisma.assessment.update({
          where: { id: existing.id },
          data: {
            title: assessment.title,
            description: assessment.description,
            passScore: assessment.passScore,
          },
        })
      : await prisma.assessment.create({
          data: {
            skillId: skill.id,
            type: assessment.type,
            title: assessment.title,
            description: assessment.description,
            passScore: assessment.passScore,
          },
        });

    // Delete existing questions and recreate
    await prisma.question.deleteMany({ where: { assessmentId: assm.id } });

    for (let i = 0; i < assessment.questions.length; i++) {
      const q = assessment.questions[i];
      await prisma.question.create({
        data: {
          assessmentId: assm.id,
          prompt: q.prompt,
          choices: JSON.stringify(q.choices),
          answerIndex: q.answerIndex,
          explanation: q.explanation,
          order: i,
        },
      });
    }

    console.log(`  ✓ ${assessment.title} (${assessment.questions.length} questions)`);
  }

  const count = await prisma.assessment.count();
  const questionCount = await prisma.question.count();
  console.log(`\n📊 Assessments: ${count}, Questions: ${questionCount}`);
}

seedAssessments()
  .then(async () => {
    await prisma.$disconnect();
    console.log("🎉 Assessment seed complete!");
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
