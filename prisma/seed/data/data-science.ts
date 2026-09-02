import type { DomainSeed } from "../types.js";

export const dataScience: DomainSeed = {
  slug: "data-science",
  name: "Data Science",
  description:
    "Extract insights from data using statistics, programming, and machine learning.",
  subjects: [
    {
      slug: "programming-for-data",
      name: "Programming for Data",
      description:
        "Programming languages and tools for data manipulation and analysis.",
      topics: [
        {
          slug: "python",
          name: "Python",
          description: "Core Python programming for data science.",
          skills: [
            {
              slug: "python-basics",
              name: "Python Basics",
              description:
                "Variables, control flow, functions, and data structures in Python.",
              difficulty: 1,
              prerequisites: [],
              resources: [
                {
                  slug: "cs50-python",
                  title: "CS50P - Introduction to Programming with Python",
                  type: "COURSE",
                  url: "https://cs50.harvard.edu/python/",
                  universitySlug: "harvard",
                  instructor: "David J. Malan",
                  description:
                    "Harvard's beginner Python course covering fundamentals through OOP.",
                  language: "en",
                  level: "BEGINNER",
                  durationHours: 60,
                  year: 2024,
                  quality: { score: 95, reasons: ["Expert instructor", "Proven curriculum", "Free access"] },
                },
                {
                  slug: "python-docs",
                  title: "Python Official Tutorial",
                  type: "DOCUMENTATION",
                  url: "https://docs.python.org/3/tutorial/",
                  universitySlug: "mit",
                  description:
                    "Official Python tutorial from the Python Software Foundation.",
                  language: "en",
                  level: "BEGINNER",
                  quality: { score: 85, reasons: ["Authoritative source", "Up-to-date", "Concise"] },
                },
              ],
            },
            {
              slug: "python-data-libraries",
              name: "Python Data Libraries",
              description:
                "NumPy, pandas, and the scientific Python ecosystem for data analysis.",
              difficulty: 2,
              prerequisites: ["python-basics"],
              resources: [
                {
                  slug: "data8-python",
                  title: "Foundations of Data Science - Python",
                  type: "COURSE",
                  url: "https://www.data8.org/sp24/python/",
                  universitySlug: "berkeley",
                  description:
                    "UC Berkeley's Python-based introduction to data science.",
                  language: "en",
                  level: "BEGINNER",
                  durationHours: 40,
                  year: 2024,
                  quality: { score: 92, reasons: ["Excellent pedagogy", "Project-based", "Free"] },
                },
                {
                  slug: "kaggle-python",
                  title: "Kaggle Learn - Python",
                  type: "COURSE",
                  url: "https://www.kaggle.com/learn/python",
                  universitySlug: "stanford",
                  description:
                    "Hands-on Python exercises for data science on Kaggle.",
                  language: "en",
                  level: "BEGINNER",
                  durationHours: 5,
                  quality: { score: 82, reasons: ["Interactive exercises", "Quick start", "Free"] },
                },
              ],
            },
          ],
        },
        {
          slug: "r",
          name: "R",
          description:
            "Statistical computing and graphics with R.",
          skills: [
            {
              slug: "r-basics",
              name: "R Basics",
              description:
                "Data types, data frames, and basic operations in R.",
              difficulty: 2,
              prerequisites: ["python-basics"],
              resources: [
                {
                  slug: "learning-statistics-r",
                  title: "Learning Statistics with R",
                  type: "BOOK",
                  url: "https://learningstatisticswithr.com/",
                  universitySlug: "stanford",
                  description:
                    "Free textbook covering R basics through applied statistics.",
                  language: "en",
                  level: "BEGINNER",
                  durationHours: 50,
                  year: 2022,
                  quality: { score: 88, reasons: ["Comprehensive textbook", "Practical examples", "Free online"] },
                },
              ],
            },
          ],
        },
        {
          slug: "sql",
          name: "SQL",
          description:
            "Structured query language for relational databases.",
          skills: [
            {
              slug: "databases-sql",
              name: "Databases & SQL",
              description:
                "Relational database concepts and SQL querying fundamentals.",
              difficulty: 2,
              resources: [
                {
                  slug: "mit-intro-sql",
                  title: "6.S191 - Introduction to SQL",
                  type: "LECTURE_NOTES",
                  url: "https://ocw.mit.edu/courses/6-s191-introduction-to-deep-learning-january-iap-2020/",
                  universitySlug: "mit",
                  description:
                    "MIT OpenCourseWare materials on database fundamentals.",
                  language: "en",
                  level: "BEGINNER",
                  durationHours: 20,
                  quality: { score: 80, reasons: ["MIT quality", "Structured material", "Free"] },
                },
              ],
            },
            {
              slug: "advanced-sql",
              name: "Advanced SQL",
              description:
                "Window functions, CTEs, subqueries, and performance tuning.",
              difficulty: 3,
              prerequisites: ["databases-sql"],
              resources: [
                {
                  slug: "datacamp-advanced-sql",
                  title: "Advanced SQL for Data Science",
                  type: "COURSE",
                  url: "https://www.kaggle.com/learn/advanced-sql",
                  universitySlug: "berkeley",
                  description:
                    "Kaggle's advanced SQL course with real-world datasets.",
                  language: "en",
                  level: "INTERMEDIATE",
                  durationHours: 15,
                  quality: { score: 78, reasons: ["Practical exercises", "Real datasets", "Free"] },
                },
              ],
            },
          ],
        },
        {
          slug: "version-control",
          name: "Version Control",
          description:
            "Tracking changes and collaboration with Git.",
          skills: [
            {
              slug: "git-version-control",
              name: "Git Version Control",
              description:
                "Commits, branches, merging, and collaborative workflows with Git.",
              difficulty: 1,
              resources: [
                {
                  slug: "git-scm-docs",
                  title: "Pro Git Book",
                  type: "BOOK",
                  url: "https://git-scm.com/book/en/v2",
                  universitySlug: "mit",
                  description:
                    "The official and comprehensive Git reference book.",
                  language: "en",
                  level: "BEGINNER",
                  durationHours: 25,
                  year: 2024,
                  quality: { score: 90, reasons: ["Authoritative", "Comprehensive", "Free online"] },
                },
              ],
            },
          ],
        },
      ],
    },
    {
      slug: "stats-math",
      name: "Statistics & Mathematics",
      description:
        "Mathematical foundations of data science: statistics, probability, and linear algebra.",
      topics: [
        {
          slug: "statistics",
          name: "Statistics",
          description:
            "Statistical methods and inference for data analysis.",
          skills: [
            {
              slug: "descriptive-statistics",
              name: "Descriptive Statistics",
              description:
                "Measures of central tendency, dispersion, and data summarization.",
              difficulty: 2,
              prerequisites: ["python-basics"],
              resources: [
                {
                  slug: "data8-descriptive",
                  title: "Foundations of Data Science - Statistics",
                  type: "COURSE",
                  url: "https://www.data8.org/sp24/",
                  universitySlug: "berkeley",
                  description:
                    "UC Berkeley's data science course covering descriptive statistics.",
                  language: "en",
                  level: "BEGINNER",
                  durationHours: 45,
                  year: 2024,
                  quality: { score: 93, reasons: ["Excellent pedagogy", "Real data applications", "Free"] },
                },
              ],
            },
            {
              slug: "inferential-statistics",
              name: "Inferential Statistics",
              description:
                "Hypothesis testing, confidence intervals, and statistical inference.",
              difficulty: 3,
              prerequisites: ["descriptive-statistics", "probability"],
              resources: [
                {
                  slug: "stat110",
                  title: "Statistics 110: Probability",
                  type: "LECTURE",
                  url: "https://www.youtube.com/playlist?list=PL2SOU6wwxB0uwwH80KTQ6ht66KWxbzTIo",
                  universitySlug: "harvard",
                  instructor: "Joe Blitzstein",
                  description:
                    "Harvard's famous probability and statistics lecture series.",
                  language: "en",
                  level: "INTERMEDIATE",
                  durationHours: 35,
                  year: 2023,
                  quality: { score: 95, reasons: ["Legendary lectures", "Harvard professor", "Free"] },
                },
              ],
            },
            {
              slug: "bayesian-statistics",
              name: "Bayesian Statistics",
              description:
                "Bayesian inference, priors, posteriors, and probabilistic modeling.",
              difficulty: 4,
              prerequisites: ["inferential-statistics", "probability"],
              resources: [
                {
                  slug: "bayesian-stats-book",
                  title: "Bayesian Data Analysis",
                  type: "BOOK",
                  url: "https://www.stat.columbia.edu/~gelman/book/",
                  universitySlug: "harvard",
                  instructor: "Andrew Gelman",
                  description:
                    "The definitive textbook on Bayesian methods by Andrew Gelman.",
                  language: "en",
                  level: "ADVANCED",
                  durationHours: 60,
                  year: 2023,
                  quality: { score: 96, reasons: ["Definitive reference", "Rigorous yet accessible", "Updated edition"] },
                },
              ],
            },
          ],
        },
        {
          slug: "mathematics",
          name: "Mathematics",
          description:
            "Core mathematical foundations for data science.",
          skills: [
            {
              slug: "linear-algebra",
              name: "Linear Algebra",
              description:
                "Vectors, matrices, eigenvalues, and linear transformations.",
              difficulty: 2,
              prerequisites: ["calculus-1"],
              resources: [
                {
                  slug: "mit-18065",
                  title: "18.065 - Matrix Methods in Data Analysis",
                  type: "COURSE",
                  url: "https://ocw.mit.edu/courses/18-065-matrix-methods-in-data-analysis-signal-processing-and-machine-learning-spring-2018/",
                  universitySlug: "mit",
                  instructor: "Gilbert Strang",
                  description:
                    "MIT's linear algebra course focused on data science applications.",
                  language: "en",
                  level: "INTERMEDIATE",
                  durationHours: 50,
                  year: 2018,
                  certificate: true,
                  quality: { score: 98, reasons: ["Legendary instructor", "MIT brand", "Data science focus", "Free"] },
                },
              ],
            },
            {
              slug: "calculus-1",
              name: "Calculus I",
              description:
                "Limits, derivatives, and introductory integration.",
              difficulty: 1,
              resources: [
                {
                  slug: "mit-1801",
                  title: "18.01 - Single Variable Calculus",
                  type: "COURSE",
                  url: "https://ocw.mit.edu/courses/18-01sc-single-variable-calculus-fall-2010/",
                  universitySlug: "mit",
                  instructor: "David Jerison",
                  description:
                    "MIT's foundational calculus course with problem sets and exams.",
                  language: "en",
                  level: "BEGINNER",
                  durationHours: 60,
                  year: 2010,
                  quality: { score: 97, reasons: ["Classic MIT course", "Comprehensive", "Free"] },
                },
              ],
            },
            {
              slug: "probability",
              name: "Probability",
              description:
                "Probability theory, distributions, and random variables.",
              difficulty: 2,
              prerequisites: ["python-basics"],
              resources: [
                {
                  slug: "stat110-prob",
                  title: "Statistics 110: Probability",
                  type: "LECTURE",
                  url: "https://www.youtube.com/playlist?list=PL2SOU6wwxB0uwwH80KTQ6ht66KWxbzTIo",
                  universitySlug: "harvard",
                  instructor: "Joe Blitzstein",
                  description:
                    "Harvard's comprehensive probability course via video lectures.",
                  language: "en",
                  level: "INTERMEDIATE",
                  durationHours: 35,
                  year: 2023,
                  quality: { score: 95, reasons: ["Harvard quality", "Engaging lectures", "Free"] },
                },
              ],
            },
            {
              slug: "optimization",
              name: "Optimization",
              description:
                "Convex optimization, gradient descent, and numerical methods.",
              difficulty: 3,
              prerequisites: ["linear-algebra", "calculus-1"],
              resources: [
                {
                  slug: "convex-optimization",
                  title: "Convex Optimization",
                  type: "COURSE",
                  url: "https://www.coursera.org/learn/convex-optimization",
                  universitySlug: "stanford",
                  instructor: "Stephen Boyd",
                  description:
                    "Stanford's famous convex optimization course by Stephen Boyd.",
                  language: "en",
                  level: "INTERMEDIATE",
                  durationHours: 40,
                  year: 2023,
                  quality: { score: 94, reasons: ["World-class instructor", "Practical applications", "Free audit"] },
                },
              ],
            },
          ],
        },
        {
          slug: "regression",
          name: "Regression",
          description:
            "Regression modeling for prediction and inference.",
          skills: [
            {
              slug: "linear-regression",
              name: "Linear Regression",
              description:
                "Ordinary least squares, model diagnostics, and regularization.",
              difficulty: 2,
              prerequisites: ["descriptive-statistics"],
              resources: [
                {
                  slug: "islr-linear-regression",
                  title: "Introduction to Statistical Learning - Ch 3",
                  type: "BOOK",
                  url: "https://www.statlearning.com/",
                  universitySlug: "stanford",
                  instructor: "Gareth James",
                  description:
                    "ISLR textbook chapter on linear regression for data science.",
                  language: "en",
                  level: "INTERMEDIATE",
                  durationHours: 15,
                  year: 2023,
                  quality: { score: 90, reasons: ["Authoritative textbook", "Free PDF available", "R and Python editions"] },
                },
              ],
            },
            {
              slug: "logistic-regression",
              name: "Logistic Regression",
              description:
                "Binary and multinomial classification with logistic models.",
              difficulty: 3,
              prerequisites: ["linear-regression", "probability"],
              resources: [
                {
                  slug: "islr-logistic",
                  title: "Introduction to Statistical Learning - Ch 4",
                  type: "BOOK",
                  url: "https://www.statlearning.com/",
                  universitySlug: "stanford",
                  instructor: "Gareth James",
                  description:
                    "ISLR chapter on classification including logistic regression.",
                  language: "en",
                  level: "INTERMEDIATE",
                  durationHours: 12,
                  year: 2023,
                  quality: { score: 89, reasons: ["Clear explanations", "Practical examples", "Free PDF"] },
                },
              ],
            },
          ],
        },
      ],
    },
    {
      slug: "machine-learning",
      name: "Machine Learning",
      description:
        "Algorithms and techniques for learning from data.",
      topics: [
        {
          slug: "fundamentals",
          name: "Fundamentals",
          description:
            "Core machine learning concepts and methodology.",
          skills: [
            {
              slug: "ml-fundamentals",
              name: "ML Fundamentals",
              description:
                "Bias-variance tradeoff, cross-validation, and the ML pipeline.",
              difficulty: 3,
              prerequisites: [
                "python-data-libraries",
                "probability",
                "linear-algebra",
              ],
              resources: [
                {
                  slug: "fast-ai",
                  title: "Practical Deep Learning for Coders",
                  type: "COURSE",
                  url: "https://course.fast.ai/",
                  universitySlug: "berkeley",
                  instructor: "Jeremy Howard",
                  description:
                    "fast.ai's top-down practical approach to machine learning.",
                  language: "en",
                  level: "INTERMEDIATE",
                  durationHours: 60,
                  year: 2024,
                  quality: { score: 94, reasons: ["Unique pedagogy", "Highly practical", "Free"] },
                },
                {
                  slug: "islr",
                  title: "Introduction to Statistical Learning",
                  type: "BOOK",
                  url: "https://www.statlearning.com/",
                  universitySlug: "stanford",
                  instructor: "Gareth James",
                  description:
                    "The classic ISLR textbook for statistical machine learning.",
                  language: "en",
                  level: "INTERMEDIATE",
                  durationHours: 45,
                  year: 2023,
                  quality: { score: 93, reasons: ["Gold standard textbook", "Free PDF", "R and Python editions"] },
                },
              ],
            },
            {
              slug: "model-evaluation",
              name: "Model Evaluation",
              description:
                "Metrics, cross-validation, ROC curves, and model selection.",
              difficulty: 3,
              prerequisites: ["ml-fundamentals"],
              resources: [
                {
                  slug: "sklearn-eval",
                  title: "Scikit-learn Model Evaluation",
                  type: "DOCUMENTATION",
                  url: "https://scikit-learn.org/stable/modules/model_evaluation.html",
                  universitySlug: "berkeley",
                  description:
                    "Official scikit-learn documentation on evaluation metrics.",
                  language: "en",
                  level: "INTERMEDIATE",
                  durationHours: 10,
                  quality: { score: 85, reasons: ["Authoritative docs", "Code examples", "Free"] },
                },
              ],
            },
            {
              slug: "feature-engineering",
              name: "Feature Engineering",
              description:
                "Feature selection, encoding, scaling, and creation techniques.",
              difficulty: 3,
              prerequisites: ["pandas", "python-data-libraries"],
              resources: [
                {
                  slug: "kaggle-feature-eng",
                  title: "Kaggle Learn - Feature Engineering",
                  type: "COURSE",
                  url: "https://www.kaggle.com/learn/feature-engineering",
                  universitySlug: "berkeley",
                  description:
                    "Kaggle's hands-on feature engineering course.",
                  language: "en",
                  level: "INTERMEDIATE",
                  durationHours: 10,
                  year: 2024,
                  quality: { score: 80, reasons: ["Practical exercises", "Real datasets", "Free"] },
                },
              ],
            },
          ],
        },
        {
          slug: "supervised-learning",
          name: "Supervised Learning",
          description:
            "Algorithms that learn from labeled data.",
          skills: [
            {
              slug: "decision-trees",
              name: "Decision Trees",
              description:
                "Tree-based models for classification and regression.",
              difficulty: 3,
              prerequisites: ["ml-fundamentals"],
              resources: [
                {
                  slug: "sklearn-decision-trees",
                  title: "Scikit-learn Decision Trees",
                  type: "DOCUMENTATION",
                  url: "https://scikit-learn.org/stable/modules/tree.html",
                  universitySlug: "berkeley",
                  description:
                    "Official scikit-learn documentation on decision trees.",
                  language: "en",
                  level: "INTERMEDIATE",
                  durationHours: 5,
                  quality: { score: 82, reasons: ["Clear documentation", "Code examples", "Free"] },
                },
              ],
            },
            {
              slug: "random-forests",
              name: "Random Forests",
              description:
                "Ensemble methods using bagged decision trees.",
              difficulty: 3,
              prerequisites: ["decision-trees"],
              resources: [
                {
                  slug: "sklearn-random-forests",
                  title: "Scikit-learn Random Forests",
                  type: "DOCUMENTATION",
                  url: "https://scikit-learn.org/stable/modules/ensemble.html#forests-of-randomized-trees",
                  universitySlug: "berkeley",
                  description:
                    "Official scikit-learn docs on random forest ensembles.",
                  language: "en",
                  level: "INTERMEDIATE",
                  durationHours: 5,
                  quality: { score: 82, reasons: ["Authoritative", "Practical examples", "Free"] },
                },
              ],
            },
            {
              slug: "svm",
              name: "Support Vector Machines",
              description:
                "Kernel methods and maximum margin classifiers.",
              difficulty: 4,
              prerequisites: ["linear-algebra", "optimization"],
              resources: [
                {
                  slug: "sklearn-svm",
                  title: "Scikit-learn SVM",
                  type: "DOCUMENTATION",
                  url: "https://scikit-learn.org/stable/modules/svm.html",
                  universitySlug: "berkeley",
                  description:
                    "Official scikit-learn documentation on support vector machines.",
                  language: "en",
                  level: "INTERMEDIATE",
                  durationHours: 8,
                  quality: { score: 80, reasons: ["Clear theory and practice", "Code examples", "Free"] },
                },
              ],
            },
            {
              slug: "gradient-boosting",
              name: "Gradient Boosting",
              description:
                "XGBoost, LightGBM, and gradient boosted decision trees.",
              difficulty: 4,
              prerequisites: ["random-forests", "optimization"],
              resources: [
                {
                  slug: "xgboost-docs",
                  title: "XGBoost Documentation",
                  type: "DOCUMENTATION",
                  url: "https://xgboost.readthedocs.io/",
                  universitySlug: "berkeley",
                  description:
                    "Official XGBoost documentation and tutorials.",
                  language: "en",
                  level: "INTERMEDIATE",
                  durationHours: 12,
                  year: 2024,
                  quality: { score: 88, reasons: ["Industry standard", "Comprehensive docs", "Free"] },
                },
              ],
            },
          ],
        },
        {
          slug: "unsupervised-learning",
          name: "Unsupervised Learning",
          description:
            "Methods for discovering structure in unlabeled data.",
          skills: [
            {
              slug: "clustering",
              name: "Clustering",
              description:
                "K-means, hierarchical clustering, and DBSCAN.",
              difficulty: 3,
              prerequisites: ["python-data-libraries", "linear-algebra"],
              resources: [
                {
                  slug: "sklearn-clustering",
                  title: "Scikit-learn Clustering",
                  type: "DOCUMENTATION",
                  url: "https://scikit-learn.org/stable/modules/clustering.html",
                  universitySlug: "berkeley",
                  description:
                    "Official scikit-learn documentation on clustering algorithms.",
                  language: "en",
                  level: "INTERMEDIATE",
                  durationHours: 8,
                  quality: { score: 82, reasons: ["Clear documentation", "Benchmarks included", "Free"] },
                },
              ],
            },
            {
              slug: "dimensionality-reduction",
              name: "Dimensionality Reduction",
              description:
                "Techniques for reducing feature space while preserving structure.",
              difficulty: 3,
              prerequisites: ["linear-algebra", "clustering"],
              resources: [
                {
                  slug: "sklearn-dim-reduction",
                  title: "Scikit-learn Dimensionality Reduction",
                  type: "DOCUMENTATION",
                  url: "https://scikit-learn.org/stable/modules/unsupervised_reduction.html",
                  universitySlug: "berkeley",
                  description:
                    "Official scikit-learn docs on dimensionality reduction.",
                  language: "en",
                  level: "INTERMEDIATE",
                  durationHours: 8,
                  quality: { score: 80, reasons: ["Comprehensive overview", "Code examples", "Free"] },
                },
              ],
            },
            {
              slug: "pca",
              name: "Principal Component Analysis",
              description:
                "Eigenvalue decomposition and PCA for feature extraction.",
              difficulty: 3,
              prerequisites: ["linear-algebra"],
              resources: [
                {
                  slug: "mit-pca",
                  title: "18.065 - PCA in Data Analysis",
                  type: "COURSE",
                  url: "https://ocw.mit.edu/courses/18-065-matrix-methods-in-data-analysis-signal-processing-and-machine-learning-spring-2018/",
                  universitySlug: "mit",
                  instructor: "Gilbert Strang",
                  description:
                    "MIT course covering PCA with matrix methods perspective.",
                  language: "en",
                  level: "INTERMEDIATE",
                  durationHours: 20,
                  year: 2018,
                  quality: { score: 92, reasons: ["MIT quality", "Rigorous treatment", "Free"] },
                },
              ],
            },
          ],
        },
        {
          slug: "deep-learning",
          name: "Deep Learning",
          description:
            "Neural networks and deep learning architectures.",
          skills: [
            {
              slug: "neural-networks",
              name: "Neural Networks",
              description:
                "Perceptrons, backpropagation, and deep neural network architectures.",
              difficulty: 4,
              prerequisites: ["ml-fundamentals", "linear-algebra"],
              resources: [
                {
                  slug: "fast-ai-dl",
                  title: "Practical Deep Learning for Coders",
                  type: "COURSE",
                  url: "https://course.fast.ai/",
                  universitySlug: "berkeley",
                  instructor: "Jeremy Howard",
                  description:
                    "fast.ai's practical deep learning course from fundamentals to advanced.",
                  language: "en",
                  level: "INTERMEDIATE",
                  durationHours: 60,
                  year: 2024,
                  quality: { score: 94, reasons: ["Unique top-down approach", "Highly practical", "Free"] },
                },
                {
                  slug: "mit-deep-learning",
                  title: "MIT 6.S191 - Introduction to Deep Learning",
                  type: "LECTURE",
                  url: "https://introtodeeplearning.com/",
                  universitySlug: "mit",
                  instructor: "Alexander Amini",
                  description:
                    "MIT's annual deep learning course with video lectures.",
                  language: "en",
                  level: "INTERMEDIATE",
                  durationHours: 30,
                  year: 2024,
                  quality: { score: 93, reasons: ["MIT quality", "Updated annually", "Free lectures"] },
                },
              ],
            },
            {
              slug: "cnn",
              name: "Convolutional Neural Networks",
              description:
                "Architectures for image recognition and computer vision.",
              difficulty: 4,
              prerequisites: ["neural-networks"],
              resources: [
                {
                  slug: "stanford-cs231n",
                  title: "CS231n - CNNs for Visual Recognition",
                  type: "LECTURE",
                  url: "https://cs231n.stanford.edu/",
                  universitySlug: "stanford",
                  instructor: "Fei-Fei Li",
                  description:
                    "Stanford's definitive course on convolutional neural networks.",
                  language: "en",
                  level: "ADVANCED",
                  durationHours: 45,
                  year: 2024,
                  quality: { score: 96, reasons: ["Legendary course", "World-class faculty", "Free lectures"] },
                },
              ],
            },
            {
              slug: "transformers",
              name: "Transformers",
              description:
                "Attention mechanisms, transformer architectures, and LLMs.",
              difficulty: 5,
              prerequisites: ["neural-networks"],
              resources: [
                {
                  slug: "stanford-cs224n",
                  title: "CS224n - NLP with Deep Learning",
                  type: "LECTURE",
                  url: "https://web.stanford.edu/class/cs224n/",
                  universitySlug: "stanford",
                  instructor: "Christopher Manning",
                  description:
                    "Stanford's NLP course covering transformers and modern architectures.",
                  language: "en",
                  level: "ADVANCED",
                  durationHours: 50,
                  year: 2024,
                  quality: { score: 96, reasons: ["Definitive course", "Cutting-edge content", "Free lectures"] },
                },
              ],
            },
          ],
        },
      ],
    },
    {
      slug: "data-engineering",
      name: "Data Engineering",
      description:
        "Infrastructure and tools for working with data at scale.",
      topics: [
        {
          slug: "data-wrangling",
          name: "Data Wrangling",
          description:
            "Cleaning, transforming, and preparing data for analysis.",
          skills: [
            {
              slug: "data-cleaning",
              name: "Data Cleaning",
              description:
                "Handling missing values, outliers, and data quality issues.",
              difficulty: 2,
              prerequisites: ["python-data-libraries"],
              resources: [
                {
                  slug: "kaggle-data-cleaning",
                  title: "Kaggle Learn - Data Cleaning",
                  type: "COURSE",
                  url: "https://www.kaggle.com/learn/data-cleaning",
                  universitySlug: "berkeley",
                  description:
                    "Kaggle's hands-on data cleaning course with real datasets.",
                  language: "en",
                  level: "BEGINNER",
                  durationHours: 5,
                  year: 2024,
                  quality: { score: 80, reasons: ["Practical exercises", "Real data", "Free"] },
                },
              ],
            },
            {
              slug: "pandas",
              name: "Pandas",
              description:
                "DataFrame operations, joins, and data manipulation with pandas.",
              difficulty: 2,
              prerequisites: ["python-data-libraries"],
              resources: [
                {
                  slug: "pandas-docs",
                  title: "10 Minutes to pandas",
                  type: "DOCUMENTATION",
                  url: "https://pandas.pydata.org/docs/user_guide/10min.html",
                  universitySlug: "berkeley",
                  description:
                    "Official pandas quickstart tutorial.",
                  language: "en",
                  level: "BEGINNER",
                  durationHours: 5,
                  quality: { score: 82, reasons: ["Official docs", "Concise", "Free"] },
                },
              ],
            },
          ],
        },
        {
          slug: "visualization",
          name: "Data Visualization",
          description:
            "Creating informative charts and visual representations of data.",
          skills: [
            {
              slug: "data-visualization",
              name: "Data Visualization",
              description:
                "Principles of effective data visualization and storytelling.",
              difficulty: 2,
              prerequisites: ["descriptive-statistics"],
              resources: [
                {
                  slug: "data-viz-principles",
                  title: "Fundamentals of Data Visualization",
                  type: "BOOK",
                  url: "https://serialmentor.com/dataviz/",
                  universitySlug: "berkeley",
                  instructor: "Claire McMonigal",
                  description:
                    "Comprehensive guide to data visualization principles.",
                  language: "en",
                  level: "BEGINNER",
                  durationHours: 30,
                  year: 2022,
                  quality: { score: 88, reasons: ["Well-structured", "Practical examples", "Free online"] },
                },
              ],
            },
            {
              slug: "matplotlib-seaborn",
              name: "Matplotlib & Seaborn",
              description:
                "Python plotting libraries for static and statistical graphics.",
              difficulty: 2,
              prerequisites: ["python-data-libraries"],
              resources: [
                {
                  slug: "matplotlib-tutorials",
                  title: "Matplotlib Tutorials",
                  type: "DOCUMENTATION",
                  url: "https://matplotlib.org/stable/tutorials/index.html",
                  universitySlug: "berkeley",
                  description:
                    "Official matplotlib tutorial gallery.",
                  language: "en",
                  level: "BEGINNER",
                  durationHours: 10,
                  quality: { score: 83, reasons: ["Official docs", "Visual examples", "Free"] },
                },
              ],
            },
          ],
        },
        {
          slug: "infrastructure",
          name: "Infrastructure",
          description:
            "Tools for scalable data processing and deployment.",
          skills: [
            {
              slug: "docker-containers",
              name: "Docker Containers",
              description:
                "Containerization for reproducible data science environments.",
              difficulty: 3,
              prerequisites: [],
              resources: [
                {
                  slug: "docker-getting-started",
                  title: "Docker Getting Started",
                  type: "DOCUMENTATION",
                  url: "https://docs.docker.com/get-started/",
                  universitySlug: "mit",
                  description:
                    "Official Docker getting started documentation.",
                  language: "en",
                  level: "BEGINNER",
                  durationHours: 10,
                  quality: { score: 85, reasons: ["Official docs", "Step-by-step", "Free"] },
                },
              ],
            },
            {
              slug: "cloud-computing",
              name: "Cloud Computing",
              description:
                "AWS, GCP, and Azure for data science workloads.",
              difficulty: 3,
              prerequisites: ["docker-containers"],
              resources: [
                {
                  slug: "aws-machine-learning",
                  title: "AWS Machine Learning Specialty",
                  type: "COURSE",
                  url: "https://aws.amazon.com/training/learn-about/machine-learning/",
                  universitySlug: "mit",
                  description:
                    "AWS training for machine learning in the cloud.",
                  language: "en",
                  level: "INTERMEDIATE",
                  durationHours: 40,
                  year: 2024,
                  quality: { score: 82, reasons: ["Industry standard", "Hands-on labs", "Free tier available"] },
                },
              ],
            },
            {
              slug: "spark-basics",
              name: "Apache Spark",
              description:
                "Distributed data processing with PySpark.",
              difficulty: 4,
              prerequisites: ["pandas", "python-data-libraries"],
              resources: [
                {
                  slug: "spark-docs",
                  title: "Apache Spark Quick Start",
                  type: "DOCUMENTATION",
                  url: "https://spark.apache.org/docs/latest/quick-start.html",
                  universitySlug: "berkeley",
                  description:
                    "Official Apache Spark quick start guide.",
                  language: "en",
                  level: "INTERMEDIATE",
                  durationHours: 20,
                  quality: { score: 84, reasons: ["Official docs", "Comprehensive", "Free"] },
                },
              ],
            },
          ],
        },
        {
          slug: "mlops",
          name: "MLOps",
          description:
            "Machine learning operations and lifecycle management.",
          skills: [
            {
              slug: "model-deployment",
              name: "Model Deployment",
              description:
                "Serving models via APIs and building ML pipelines.",
              difficulty: 4,
              prerequisites: ["ml-fundamentals", "docker-containers"],
              resources: [
                {
                  slug: "mlops-course",
                  title: "Made With ML - MLOps",
                  type: "COURSE",
                  url: "https://madewithml.com/",
                  universitySlug: "berkeley",
                  instructor: "Goku Mohandas",
                  description:
                    "End-to-end MLOps course from data to deployment.",
                  language: "en",
                  level: "INTERMEDIATE",
                  durationHours: 40,
                  year: 2024,
                  quality: { score: 89, reasons: ["Comprehensive", "Practical projects", "Free"] },
                },
              ],
            },
            {
              slug: "experiment-tracking",
              name: "Experiment Tracking",
              description:
                "MLflow, Weights & Biases, and experiment management.",
              difficulty: 3,
              prerequisites: ["ml-fundamentals"],
              resources: [
                {
                  slug: "mlflow-docs",
                  title: "MLflow Documentation",
                  type: "DOCUMENTATION",
                  url: "https://mlflow.org/docs/latest/index.html",
                  universitySlug: "berkeley",
                  description:
                    "Official MLflow documentation for experiment tracking.",
                  language: "en",
                  level: "INTERMEDIATE",
                  durationHours: 8,
                  year: 2024,
                  quality: { score: 83, reasons: ["Industry standard tool", "Well documented", "Free"] },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  paths: [
    {
      slug: "data-scientist",
      name: "Data Scientist",
      tagline: "Turn raw data into actionable insights",
      description:
        "Comprehensive path from data wrangling to advanced machine learning.",
      level: "BEGINNER",
      estimatedMonths: 14,
      phases: [
        {
          name: "FOUNDATIONS",
          skillSlugs: [
            "python-basics",
            "git-version-control",
            "databases-sql",
            "calculus-1",
          ],
        },
        {
          name: "STATISTICS",
          skillSlugs: [
            "descriptive-statistics",
            "probability",
            "linear-algebra",
            "inferential-statistics",
          ],
        },
        {
          name: "ML CORE",
          skillSlugs: [
            "python-data-libraries",
            "pandas",
            "linear-regression",
            "ml-fundamentals",
            "model-evaluation",
            "feature-engineering",
          ],
        },
        {
          name: "ADVANCED ML",
          skillSlugs: [
            "logistic-regression",
            "decision-trees",
            "random-forests",
            "clustering",
            "pca",
            "neural-networks",
          ],
        },
        {
          name: "PRACTICE",
          skillSlugs: [
            "data-cleaning",
            "data-visualization",
            "matplotlib-seaborn",
            "advanced-sql",
            "model-deployment",
          ],
        },
      ],
    },
    {
      slug: "ml-engineer",
      name: "Machine Learning Engineer",
      tagline: "Build and deploy ML systems at scale",
      description:
        "Engineering-focused path: from data pipelines to production ML systems.",
      level: "INTERMEDIATE",
      estimatedMonths: 16,
      phases: [
        {
          name: "FOUNDATIONS",
          skillSlugs: [
            "python-basics",
            "databases-sql",
            "git-version-control",
            "docker-containers",
          ],
        },
        {
          name: "CORE",
          skillSlugs: [
            "python-data-libraries",
            "pandas",
            "linear-algebra",
            "probability",
            "ml-fundamentals",
            "feature-engineering",
          ],
        },
        {
          name: "ML SYSTEMS",
          skillSlugs: [
            "random-forests",
            "gradient-boosting",
            "svm",
            "model-evaluation",
            "experiment-tracking",
          ],
        },
        {
          name: "DEEP LEARNING",
          skillSlugs: [
            "neural-networks",
            "cnn",
            "transformers",
          ],
        },
        {
          name: "PRODUCTION",
          skillSlugs: [
            "cloud-computing",
            "model-deployment",
            "spark-basics",
            "data-cleaning",
            "advanced-sql",
          ],
        },
      ],
    },
    {
      slug: "data-analyst",
      name: "Data Analyst",
      tagline: "Discover patterns and tell data stories",
      description:
        "Practical path focused on analysis, visualization, and business insights.",
      level: "BEGINNER",
      estimatedMonths: 8,
      phases: [
        {
          name: "FOUNDATIONS",
          skillSlugs: [
            "python-basics",
            "databases-sql",
            "git-version-control",
          ],
        },
        {
          name: "ANALYSIS",
          skillSlugs: [
            "descriptive-statistics",
            "python-data-libraries",
            "pandas",
            "data-cleaning",
            "advanced-sql",
          ],
        },
        {
          name: "VISUALIZATION",
          skillSlugs: [
            "data-visualization",
            "matplotlib-seaborn",
          ],
        },
        {
          name: "STATISTICS",
          skillSlugs: [
            "inferential-statistics",
            "probability",
            "linear-regression",
          ],
        },
        {
          name: "PRACTICE",
          skillSlugs: [
            "bayesian-statistics",
            "r-basics",
            "optimization",
          ],
        },
      ],
    },
  ],
  courses: [
    {
      slug: "mit-18-065-matrix",
      title: "18.065 Matrix Methods in Data Analysis, Signal Processing, and Machine Learning",
      universitySlug: "mit",
      subjectSlug: "stats-math",
      level: "INTERMEDIATE",
      description:
        "Linear algebra with applications to data science, signal processing, and machine learning.",
      url: "https://ocw.mit.edu/courses/18-065-matrix-methods-in-data-analysis-signal-processing-and-machine-learning-spring-2018/",
      skillSlugs: ["linear-algebra", "pca", "ml-fundamentals"],
    },
    {
      slug: "mit-18-01-sc",
      title: "18.01SC Single Variable Calculus",
      universitySlug: "mit",
      subjectSlug: "stats-math",
      level: "BEGINNER",
      description:
        "MIT's complete single variable calculus course.",
      url: "https://ocw.mit.edu/courses/18-01sc-single-variable-calculus-fall-2010/",
      skillSlugs: ["calculus-1"],
    },
    {
      slug: "harvard-stat-110",
      title: "Statistics 110: Probability",
      universitySlug: "harvard",
      subjectSlug: "stats-math",
      level: "INTERMEDIATE",
      description:
        "Harvard's probability course emphasizing conceptual understanding.",
      url: "https://www.youtube.com/playlist?list=PL2SOU6wwxB0uwwH80KTQ6ht66KWxbzTIo",
      skillSlugs: ["probability", "inferential-statistics"],
    },
    {
      slug: "stanford-cs231n",
      title: "CS231n: Convolutional Neural Networks for Visual Recognition",
      universitySlug: "stanford",
      subjectSlug: "machine-learning",
      level: "ADVANCED",
      description:
        "Stanford's definitive course on CNNs and computer vision.",
      url: "https://cs231n.stanford.edu/",
      skillSlugs: ["cnn"],
    },
    {
      slug: "stanford-cs224n",
      title: "CS224n: NLP with Deep Learning",
      universitySlug: "stanford",
      subjectSlug: "machine-learning",
      level: "ADVANCED",
      description:
        "Stanford's NLP course covering transformers and modern architectures.",
      url: "https://web.stanford.edu/class/cs224n/",
      skillSlugs: ["transformers"],
    },
    {
      slug: "berkeley-data8",
      title: "Data 8: Foundations of Data Science",
      universitySlug: "berkeley",
      subjectSlug: "programming-for-data",
      level: "BEGINNER",
      description:
        "UC Berkeley's foundational data science course.",
      url: "https://www.data8.org/sp24/",
      skillSlugs: ["python-basics", "descriptive-statistics"],
    },
    {
      slug: "harvard-cs50p",
      title: "CS50P: Introduction to Programming with Python",
      universitySlug: "harvard",
      subjectSlug: "programming-for-data",
      level: "BEGINNER",
      description:
        "Harvard's beginner Python programming course.",
      url: "https://cs50.harvard.edu/python/",
      skillSlugs: ["python-basics"],
    },
    {
      slug: "fast-ai-practical-dl",
      title: "Practical Deep Learning for Coders",
      universitySlug: "berkeley",
      subjectSlug: "machine-learning",
      level: "INTERMEDIATE",
      description:
        "fast.ai's top-down practical approach to deep learning.",
      url: "https://course.fast.ai/",
      skillSlugs: ["ml-fundamentals", "neural-networks"],
    },
    {
      slug: "mit-6-s191-dl",
      title: "MIT 6.S191: Introduction to Deep Learning",
      universitySlug: "mit",
      subjectSlug: "machine-learning",
      level: "INTERMEDIATE",
      description:
        "MIT's annual introduction to deep learning course.",
      url: "https://introtodeeplearning.com/",
      skillSlugs: ["neural-networks"],
    },
    {
      slug: "stanford-convex-opt",
      title: "Convex Optimization",
      universitySlug: "stanford",
      subjectSlug: "stats-math",
      level: "INTERMEDIATE",
      description:
        "Stanford's convex optimization course by Stephen Boyd.",
      url: "https://www.coursera.org/learn/convex-optimization",
      skillSlugs: ["optimization"],
    },
    {
      slug: "islr-textbook",
      title: "Introduction to Statistical Learning",
      universitySlug: "stanford",
      subjectSlug: "machine-learning",
      level: "INTERMEDIATE",
      description:
        "The classic ISLR textbook for statistical machine learning.",
      url: "https://www.statlearning.com/",
      skillSlugs: ["linear-regression", "logistic-regression", "ml-fundamentals"],
    },
    {
      slug: "berkeley-spark",
      title: "Introduction to Big Data with Apache Spark",
      universitySlug: "berkeley",
      subjectSlug: "data-engineering",
      level: "INTERMEDIATE",
      description:
        "UC Berkeley's course on distributed computing with Spark.",
      url: "https://www.data8.org/sp24/",
      skillSlugs: ["spark-basics"],
    },
  ],
  curricula: [
    {
      degreeSlug: "mit-sds-sb",
      degreeName: "Statistics and Data Science",
      degreeLevel: "BACHELOR",
      universitySlug: "mit",
      name: "MIT Statistics & Data Science SB",
      sourceUrl: "https://registrar.mit.edu/registration-academics/mit-curriculum",
      courses: [
        { courseSlug: "mit-18-01-sc", order: 1, year: 1, semester: 1 },
        { courseSlug: "mit-18-065-matrix", order: 2, year: 1, semester: 2 },
        { courseSlug: "harvard-stat-110", order: 3, year: 2, semester: 1 },
        { courseSlug: "berkeley-data8", order: 4, year: 2, semester: 2 },
        { courseSlug: "harvard-cs50p", order: 5, year: 2, semester: 2 },
        { courseSlug: "islr-textbook", order: 6, year: 3, semester: 1 },
        { courseSlug: "fast-ai-practical-dl", order: 7, year: 3, semester: 2 },
        { courseSlug: "stanford-cs231n", order: 8, year: 3, semester: 2 },
        { courseSlug: "stanford-cs224n", order: 9, year: 4, semester: 1 },
        { courseSlug: "mit-6-s191-dl", order: 10, year: 4, semester: 1 },
        { courseSlug: "berkeley-spark", order: 11, year: 4, semester: 2 },
      ],
    },
    {
      degreeSlug: "harvard-ds-sm",
      degreeName: "Data Science",
      degreeLevel: "MASTER",
      universitySlug: "harvard",
      name: "Harvard Data Science SM",
      sourceUrl: "https://www.seas.harvard.edu/programs/graduate-programs/data-science",
      courses: [
        { courseSlug: "harvard-stat-110", order: 1, year: 1, semester: 1 },
        { courseSlug: "berkeley-data8", order: 2, year: 1, semester: 1 },
        { courseSlug: "islr-textbook", order: 3, year: 1, semester: 1 },
        { courseSlug: "mit-18-065-matrix", order: 4, year: 1, semester: 2 },
        { courseSlug: "fast-ai-practical-dl", order: 5, year: 1, semester: 2 },
        { courseSlug: "stanford-cs231n", order: 6, year: 1, semester: 2 },
        { courseSlug: "mit-6-s191-dl", order: 7, year: 2, semester: 1 },
        { courseSlug: "stanford-cs224n", order: 8, year: 2, semester: 1 },
        { courseSlug: "stanford-convex-opt", order: 9, year: 2, semester: 1 },
        { courseSlug: "berkeley-spark", order: 10, year: 2, semester: 2 },
      ],
    },
  ],
};
