const modules = [
    {
    title: "Introduction to Data Analytics",
    slides: [
        { 
            title: "What is Data Analytics?", 
            content: `<div class="ai-slide-block"><ol class='highlight-list'>
                <li>Data analytics is finding insights from data to make decisions.</li>
                <li>It uses tools like Excel, Power BI, Python, and SQL.</li>
                <li>Examples: Sales trends, customer behavior, health patterns.</li>
                <li>It’s about asking questions and finding answers.</li>
                <li>Anyone can learn it with practice!</li>
                <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Data is a puzzle—analytics is how you solve it.”</div>
            </ol></div>` 
        },
        { 
            title: "Why Data Analytics Matters", 
            content: `<div class="ai-slide-block"><ol class='highlight-list'>
                <li>Helps businesses make smarter choices.</li>
                <li>Drives efficiency, profit, and innovation.</li>
                <li>Used in finance, healthcare, marketing, and more.</li>
                <li>In Kenya, it powers M-Pesa, agriculture, and startups.</li>
                <li>It’s a skill for the future job market.</li>
                <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Data analytics turns raw numbers into real impact.”</div>
            </ol></div>` 
        },
        { 
            title: "The Data Analytics Process", 
            content: `<div class="ai-slide-block"><ol class='highlight-list'>
                <li><strong>Step: Ask</strong> - Define the question or problem</li>
                <li><strong>Step: Acquire</strong> - Collect relevant data</li>
                <li><strong>Step: Clean</strong> - Fix errors and missing values</li>
                <li><strong>Step: Explore</strong> - Analyze to find patterns</li>
                <li><strong>Step: Visualize</strong> - Create charts and graphs</li>
                <li><strong>Step: Present</strong> - Share insights with others</li>
                <li>Follow this cycle for every project.</li>
                <hr><div class="activity-block"><strong>Food for the Mind:</strong> “The analytics process is your map—follow it to find treasure in data.”</div>
            </ol></div>` 
        },
        { 
            title: "Types of Data", 
            content: `<div class="ai-slide-block"><ol class='highlight-list'>
                <li><strong>Type: Numerical</strong> - Numbers (e.g., sales, age)</li>
                <li><strong>Type: Categorical</strong> - Groups (e.g., gender, region)</li>
                <li><strong>Type: Time Series</strong> - Data over time (e.g., stock prices)</li>
                <li><strong>Type: Text</strong> - Words or comments (e.g., reviews)</li>
                <li>Understand your data type to choose the right analysis.</li>
                <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Data types are your ingredients—know them to cook the right insights.”</div>
            </ol></div>` 
        },
        { 
            title: "Tools for Data Analytics", 
            content: `<div class="ai-slide-block"><ol class='highlight-list'>
                <li><strong>Tool: Excel</strong> - Spreadsheets for quick analysis</li>
                <li><strong>Tool: Power BI</strong> - Interactive dashboards</li>
                <li><strong>Tool: Python</strong> - Programming for advanced analytics</li>
                <li><strong>Tool: SQL</strong> - Querying databases</li>
                <li>You’ll learn these tools in this course!</li>
                <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Tools are your keys—each one unlocks a new way to see data.”</div>
            </ol></div>` 
        },
        { 
            title: "Skills of a Data Analyst", 
            content: `<div class="ai-slide-block"><ol class='highlight-list'>
                <li>Curiosity: Ask good questions.</li>
                <li>Technical skills: Use tools like Excel and Python.</li>
                <li>Critical thinking: Spot patterns and errors.</li>
                <li>Communication: Explain insights clearly.</li>
                <li>Problem-solving: Find solutions in data.</li>
                <hr><div class="activity-block"><strong>Food for the Mind:</strong> “A data analyst is a detective—searching for truth in numbers.”</div>
            </ol></div>` 
        },
        { 
            title: "Data Analytics in Kenya", 
            content: `<div class="ai-slide-block"><ol class='highlight-list'>
                <li>Used in mobile money (e.g., M-Pesa analytics).</li>
                <li>Helps agriculture with crop yield predictions.</li>
                <li>Improves healthcare with patient data analysis.</li>
                <li>Startups use it for growth and marketing.</li>
                <li>Growing demand for data skills in Kenya.</li>
                <hr><div class="activity-block"><strong>Food for the Mind:</strong> “In Kenya, data analytics is a tool for local solutions and global impact.”</div>
            </ol></div>` 
        },
        { 
            title: "Practical: Explore a Dataset", 
            content: `<div class="ai-slide-block"><ol class='highlight-list'>
                <li><strong>Task:</strong></li>
                <li>Find a simple dataset (e.g., sales, weather).</li>
                <li>Look at its columns and data types.</li>
                <li>Write down one question you could ask.</li>
                <li>Share your question with a peer or mentor.</li>
                <li>Start thinking about how to answer it.</li>
                <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Every dataset is a story waiting for you to tell it.”</div>
            </ol></div>` 
        },
        { 
            title: "Q&A", 
            content: `<div class="ai-slide-block"><ol class='highlight-list'>
                <li>What if I’m new to data? → Start with simple tools like Excel.</li>
                <li>What if I don’t know coding? → You’ll learn Python step-by-step.</li>
                <li>What if I don’t have data? → Use free datasets from Kaggle.</li>
                <li>What if it feels hard? → Practice small tasks and ask for help.</li>
                <li>What’s the first step? → Be curious and dive in!</li>
                <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Every analyst starts somewhere—your journey begins with curiosity.”</div>
            </ol></div>` 
        },
        { 
            title: "Key Takeaways", 
            content: `<div class="ai-slide-block"><ol class='highlight-list'>
                <li>Data analytics turns raw data into insights.</li>
                <li>It’s used in many industries, including in Kenya.</li>
                <li>Follow the analytics process: Ask, Acquire, Clean, Explore, Visualize, Present.</li>
                <li>Learn tools like Excel, Power BI, Python, and SQL.</li>
                <li>You’re ready to start your analytics journey!</li>
                <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Data analytics is your superpower—use it to solve real problems.”</div>
            </ol></div>` 
        },
        { 
            title: "First Analytics Task", 
            content: `<div class="ai-slide-block"><ol class='highlight-list'>
                <li><strong>Task:</strong></li>
                <li>Find a dataset online (e.g., Kaggle, Data.gov).</li>
                <li>Identify its data types (numerical, categorical).</li>
                <li>Write one question you could explore.</li>
                <li>Share your findings with a peer or save them.</li>
                <li>Reflect on what excites you about analytics.</li>
                <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Your first task is your first step—take it with confidence.”</div>
            </ol></div>` 
        }
    ]
},
    {
        title: "Data Acquisition",
        slides: [
            { 
                title: "What is Data Acquisition?", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li>Data acquisition is the process of gathering raw data for analysis.</li>
                    <li>It’s the first step in the data analytics cycle.</li>
                    <li>Data can be collected manually or automatically.</li>
                    <li>Common sources include files, databases, websites, and APIs.</li>
                    <li>Without data, analysis cannot begin.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Before you analyze anything, you need something to analyze—this is where the hunt begins.”</div>
                </ol></div>` 
            },
            { 
                title: "Types of Data", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li>Structured data: organized in rows and columns (e.g., Excel, SQL).</li>
                    <li>Unstructured data: includes text, images, audio, video.</li>
                    <li>Structured data is easier to analyze and visualize.</li>
                    <li>Unstructured data requires more processing and tools.</li>
                    <li>Most beginner projects use structured data.</li>
                    <li>Even if you have unstructured data the goal is first structure it then continue.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Structured data is like a clean kitchen—everything in its place, ready to cook.”</div>
                </ol></div>` 
            },
            { 
                title: "Finding Data Sources", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li>We have Local & Global sources of data.</li>
                    <li>Local sources: surveys, spreadsheets, company systems.</li>
                    <li>Global sources: Kaggle, Data.gov, World Bank, UN datasets.</li>
                    <li>APIs provide live data from websites and apps.</li>
                    <li>Always check data quality and relevance before using.</li>
                    <li>Use open data portals for practice and projects.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Good data is like good ingredients—fresh, clean, and useful makes all the difference.”</div>
                </ol></div>` 
            },
            { 
                title: "Collecting Data with Excel & Power BI", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li>Excel: manually enter or import data from files/web.</li>
                    <li>Power BI: connect to Excel, databases, and online sources.</li>
                    <li>Use Power Query to clean and shape data during import.</li>
                    <li>Combine multiple sources into one report.</li>
                    <li>Great for small businesses and quick analysis.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Excel and Power BI are your first fishing rods—cast them wisely and reel in insight.”</div>
                </ol></div>` 
            },
            { 
                title: "Web Data & APIs", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li>Websites often publish data in tables or downloadable files.</li>
                    <li>APIs allow you to pull data automatically using Python.</li>
                    <li>Example: Get COVID-19 stats or weather updates via API.</li>
                    <li>Use Python libraries like requests and json.</li>
                    <li>APIs are powerful for real-time and large-scale data.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “APIs are like secret tunnels—fast, direct, and full of treasure.”</div>
                </ol></div>` 
            },
            { 
                title: "Importing Data into Excel", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li>Use “Data → Get Data” to import from CSV, Excel, or web.</li>
                    <li>Clean data using filters and formatting tools.</li>
                    <li>Use formulas to check for missing or duplicate values.</li>
                    <li>Save your cleaned version for analysis.</li>
                    <li>Excel is great for beginners and small datasets.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Excel is your entry point—simple, powerful, and perfect for getting started.”</div>
                </ol></div>` 
            },
            { 
                title: "Importing Data into Power BI", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li>Use “Get Data” to connect to Excel, SQL, web, and more.</li>
                    <li>Power Query Editor helps clean and transform data.</li>
                    <li>Combine multiple sources into one dashboard.</li>
                    <li>Refresh data automatically for live reports.</li>
                    <li>Power BI is ideal for business insights.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Power BI doesn’t just show data—it helps you shape it into something meaningful.”</div>
                </ol></div>` 
            },
            { 
                title: "Importing Data into Python (pandas)", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li><pre><code>import pandas as pd<br>df = pd.read_csv("data.csv")<br>print(df.head())</code></pre></li>
                    <li>Use pandas to load CSV, Excel, JSON, or SQL data.</li>
                    <li>read_csv() is the most common starting point.</li>
                    <li>Preview data with head() and check structure.</li>
                    <li>Python is great for automation and large datasets.</li>
                    <li>You’ll use it often in cleaning and analysis.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Python doesn’t just read data—it helps you tame it, clean it, and make it talk.”</div>
                </ol></div>` 
            },
            { 
                title: "Importing Data into SQL", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li>Use tools like MySQL Workbench or SQLite.</li>
                    <li>Import CSV files into tables using built-in tools.</li>
                    <li>Run queries to explore and filter data.</li>
                    <li>SQL is best for structured, relational data.</li>
                    <li>You’ll learn how to write queries step by step.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “SQL is like asking a librarian for exactly the book you want—fast, precise, and powerful.”</div>
                </ol></div>` 
            },
            { 
                title: "Practical: Download & Import a Dataset", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li><strong>Task:</strong></li>
                    <li>Find a dataset from Kaggle or Data.gov.</li>
                    <li>Import it into Excel, Power BI, Python, and SQL.</li>
                    <li>Compare how each tool handles the same data.</li>
                    <li>Note what was easy, what was hard, and what looked best.</li>
                    <li>Save your cleaned version for the next module.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Try each tool like trying on shoes—see which one fits your style and your data.”</div>
                </ol></div>` 
            },
            { 
                title: "Q&A", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li>What if I can’t find data? → Use open portals or sample files.</li>
                    <li>What if my file won’t open? → Check format and encoding.</li>
                    <li>What if I don’t understand the data? → Read the column names and documentation.</li>
                    <li>What if I don’t have Power BI? → Use Excel or Google Sheets.</li>
                    <li>What if I’m stuck? → Ask questions and try again.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Every question is a step forward—ask boldly, learn deeply.”</div>
                </ol></div>` 
            },
            { 
                title: "Key Takeaways", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li>Data acquisition is the first step in analysis.</li>
                    <li>You can collect data from files, web, APIs, and databases.</li>
                    <li>Excel, Power BI, Python, and SQL all support data import.</li>
                    <li>Clean data starts with smart collection.</li>
                    <li>You’re now ready to clean and prepare your data.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “You’ve gathered your ingredients—next, we clean them and prep for the real cooking.”</div>
                </ol></div>` 
            },
            { 
                title: "Find & Import Data", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li><strong>Task:</strong></li>
                    <li>Choose a topic you care about (e.g., sports, finance, health).</li>
                    <li>Find a dataset online.</li>
                    <li>Import it into at least two tools.</li>
                    <li>Write down what the data contains and what questions you could ask.</li>
                    <li>Save it for your next project.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Pick a topic you care about—data is more fun when it’s personal.”</div>
                </ol></div>` 
            }
        ]
    },
    {
        title: "Data Cleaning & Preparation",
        slides: [
            { 
                title: "Why Clean Data?", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li>Dirty data leads to wrong answers and bad decisions.</li>
                    <li>Common issues include missing values, duplicates, and incorrect formats.</li>
                    <li>Cleaning ensures accuracy, consistency, and trust.</li>
                    <li>It’s the most time-consuming but critical step in analysis.</li>
                    <li>Clean data = reliable insights.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Messy data is like a cracked mirror—it reflects the truth badly until you fix it.”</div>
                </ol></div>` 
            },
            { 
                title: "Common Data Issues", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li><strong>Issue: Missing values</strong> - Blank cells in the sales column</li>
                    <li><strong>Issue: Duplicates</strong> - Same customer listed twice</li>
                    <li><strong>Issue: Wrong formats</strong> - “100” stored as text</li>
                    <li><strong>Issue: Typos</strong> - “Nairobbi” instead of “Nairobi”</li>
                    <li><strong>Issue: Mixed types</strong> - Dates stored as text</li>
                    <li>These issues distort analysis and visuals.</li>
                    <li>Always inspect your data before diving into insights.</li>
                    <li>Use filters, summaries, and profiling tools to detect problems.</li>
                    <li>Document what you fix and why.</li>
                    <li>Cleaning is both technical and thoughtful.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Before you analyze, you must sanitize—clean data is the foundation of insight.”</div>
                </ol></div>` 
            },
            { 
                title: "Cleaning Data in Excel", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li>Use “Remove Duplicates” under the Data tab.</li>
                    <li>Use TRIM, CLEAN, and PROPER to fix messy text.</li>
                    <li>Use filters to find blanks or errors.</li>
                    <li>Use “Text to Columns” to split combined data.</li>
                    <li>Format cells correctly (dates, currency, numbers).</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Excel is your sponge—scrub the dirt off your data before you serve it.”</div>
                </ol></div>` 
            },
            { 
                title: "Cleaning Data in Power BI", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li>Use Power Query to remove errors and blanks.</li>
                    <li>Detect and change incorrect data types.</li>
                    <li>Split, merge, and rename columns.</li>
                    <li>Replace values to fix typos and inconsistencies.</li>
                    <li>Preview and transform data before loading.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Power BI doesn’t just show data—it helps you shape it into something meaningful.”</div>
                </ol></div>` 
            },
            { 
                title: "Cleaning Data with Python (pandas)", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li><pre><code>df.dropna(inplace=True)<br>df['Name'] = df['Name'].str.strip().str.title()<br>df.drop_duplicates(inplace=True)</code></pre></li>
                    <li>Use dropna() to remove rows with missing values.</li>
                    <li>Use string functions to clean text: strip(), lower(), title().</li>
                    <li>Use drop_duplicates() to remove repeated entries.</li>
                    <li>Convert data types using astype() or pd.to_datetime().</li>
                    <li>Python is ideal for cleaning large datasets efficiently.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Cleaning with pandas is like brushing your data’s teeth—fresh, sharp, and ready to smile.”</div>
                </ol></div>` 
            },
            { 
                title: "Data Types & Formatting", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li>Data types include text, numbers, dates, and booleans.</li>
                    <li>Wrong formats can break formulas and analysis.</li>
                    <li>In Excel: use “Format Cells” to fix types.</li>
                    <li>In Python: use astype() or pd.to_datetime() for conversions.</li>
                    <li>Always check column types before analysis.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Wrong data types are like wrong shoes—uncomfortable and misleading until you fix them.”</div>
                </ol></div>` 
            },
            { 
                title: "Handling Missing Values", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li>Drop rows or columns with too many blanks.</li>
                    <li>Fill missing values with average, median, or default.</li>
                    <li>Use domain knowledge to decide what to keep.</li>
                    <li>In Python: fillna() helps fill gaps.</li>
                    <li>In Excel: use IF() or filters to flag missing entries.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Missing data isn’t the end—it’s just a question waiting for your judgment.”</div>
                </ol></div>` 
            },
            { 
                title: "Removing Duplicates", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li>Duplicates can distort totals and averages.</li>
                    <li>In Excel: use “Remove Duplicates” under Data tab.</li>
                    <li>In Python: use drop_duplicates().</li>
                    <li>Always check for hidden duplicates (e.g., same name, different spelling).</li>
                    <li>Document what you remove and why.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Duplicates are echoes—clear them out so your data speaks once.”</div>
                </ol></div>` 
            },
            { 
                title: "Data Validation", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li>Validation ensures only correct data is entered.</li>
                    <li>In Excel: use “Data Validation” to create dropdowns or rules.</li>
                    <li>Prevents typos and wrong formats.</li>
                    <li>Helps maintain clean inputs for future analysis.</li>
                    <li>Example: restrict entries to valid regions or dates.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Validation is your gatekeeper—only clean data gets through.”</div>
                </ol></div>` 
            },
            { 
                title: "Practical: Clean a Messy Dataset", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li><strong>Task:</strong></li>
                    <li>Choose a messy dataset (e.g., customer feedback, sales records).</li>
                    <li>Identify issues: blanks, typos, wrong formats, duplicates.</li>
                    <li>Clean using Excel, Power BI, or Python.</li>
                    <li>Document each step you take.</li>
                    <li>Save the cleaned version for Module 4.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Cleaning data is like prepping ingredients—do it well, and the final dish will shine.”</div>
                </ol></div>` 
            },
            { 
                title: "Q&A", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li>What if I delete something by mistake? → Always keep a backup.</li>
                    <li>What if I don’t know what’s wrong with the data? → Use filters and summaries to inspect.</li>
                    <li>What if I can’t fix a value? → Flag it and explain in your report.</li>
                    <li>What if cleaning takes too long? → Focus on the most important columns first.</li>
                    <li>What if I’m unsure? → Ask for help or test different methods.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Cleaning isn’t deleting—it’s deciding what deserves to stay.”</div>
                </ol></div>` 
            },
            { 
                title: "Key Takeaways", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li>Clean data is essential for accurate analysis.</li>
                    <li>Common issues include blanks, typos, duplicates, and wrong formats.</li>
                    <li>Excel, Power BI, and Python offer powerful cleaning tools.</li>
                    <li>Always document your cleaning steps.</li>
                    <li>You’re now ready to explore your data with confidence.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Clean data is like a clear sky—you can finally see what’s really there.”</div>
                </ol></div>` 
            },
            { 
                title: "Data Cleaning Task", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li><strong>Task:</strong></li>
                    <li>Choose a dataset and clean it using at least two tools.</li>
                    <li>Fix missing values, duplicates, and formatting issues.</li>
                    <li>Write a short summary of what you cleaned and why.</li>
                    <li>Save your cleaned dataset for the next module.</li>
                    <li>Share your process with a peer or mentor.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Every cleaned dataset is a story waiting to be told—make yours worth reading.”</div>
                </ol></div>` 
            }
        ]
    },
    {
        title: "Exploratory Data Analysis (EDA)",
        slides: [
            { 
                title: "What is EDA?", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li>EDA stands for Exploratory Data Analysis.</li>
                    <li>It’s the process of understanding your data before modeling or decision-making.</li>
                    <li>You look for patterns, trends, and relationships.</li>
                    <li>EDA helps you spot errors, outliers, and surprises.</li>
                    <li>It’s where curiosity meets structure.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “EDA is like meeting your data for the first time—listen closely, it has stories to tell.”</div>
                </ol></div>` 
            },
            { 
                title: "Asking the Right Questions", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li>Start with a clear goal: What do you want to know?</li>
                    <li>Ask questions like: What’s the average? What’s increasing? What’s unusual?</li>
                    <li>Break big questions into smaller ones.</li>
                    <li>Use filters and summaries to test ideas.</li>
                    <li>Let the data guide your next question.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Smart questions lead to smart answers—ask with purpose, explore with patience.”</div>
                </ol></div>` 
            },
            { 
                title: "Descriptive Statistics in Excel", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li>Use AVERAGE, MEDIAN, MODE, MAX, MIN to summarize data.</li>
                    <li>Use COUNT and COUNTA to check volume.</li>
                    <li>Use “Data Analysis Toolpak” for deeper stats.</li>
                    <li>Create summary tables with formulas.</li>
                    <li>Great for quick overviews and comparisons.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Excel gives you the numbers—your job is to find the meaning behind them.”</div>
                </ol></div>` 
            },
            { 
                title: "Descriptive Statistics in Python", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li><pre><code>df.describe()<br>df['Region'].value_counts()<br>df.groupby('Product')['Sales'].mean()</code></pre></li>
                    <li>describe() gives summary stats for numeric columns.</li>
                    <li>value_counts() shows frequency of categories.</li>
                    <li>groupby() helps compare across groups.</li>
                    <li>Use mean(), sum(), std() for insights.</li>
                    <li>Python is great for large datasets and automation.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Python doesn’t just crunch numbers—it helps you ask better questions.”</div>
                </ol></div>` 
            },
            { 
                title: "Exploring Data in Power BI", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li>Use visuals to explore trends and patterns.</li>
                    <li>Use slicers to filter by region, product, or time.</li>
                    <li>Use cards to show key metrics like totals and averages.</li>
                    <li>Use charts to compare categories and time periods.</li>
                    <li>Power BI makes exploration interactive.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Power BI turns exploration into conversation—click, filter, discover.”</div>
                </ol></div>` 
            },
            { 
                title: "Identifying Patterns & Trends", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li>Look for increases, decreases, and cycles.</li>
                    <li>Compare categories to find leaders and laggards.</li>
                    <li>Use line charts for time trends.</li>
                    <li>Use bar charts for category comparisons.</li>
                    <li>Patterns help you predict and explain.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Trends are footprints—follow them to understand where your data is going.”</div>
                </ol></div>` 
            },
            { 
                title: "Outlier Detection", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li>Outliers are values that don’t fit the pattern.</li>
                    <li>Use box plots or scatter plots to spot them.</li>
                    <li>In Excel: use conditional formatting to highlight extremes.</li>
                    <li>In Python: use df[df['Sales'] > threshold].</li>
                    <li>Investigate outliers—they may be errors or insights.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Outliers are whispers—sometimes mistakes, sometimes breakthroughs.”</div>
                </ol></div>` 
            },
            { 
                title: "Correlation & Relationships", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li>Correlation shows how two variables move together.</li>
                    <li>In Excel: use CORREL() function.</li>
                    <li>In Python: use df.corr() for a matrix.</li>
                    <li>Positive correlation: both go up together.</li>
                    <li>Negative correlation: one goes up, the other down.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Correlation is chemistry—see which variables spark together.”</div>
                </ol></div>` 
            },
            { 
                title: "Data Segmentation", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li>Break data into groups for deeper insight.</li>
                    <li>Segment by region, age, product, or time.</li>
                    <li>Use filters and group functions.</li>
                    <li>Compare segments to find differences.</li>
                    <li>Segmentation helps tailor decisions.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Segmentation is storytelling—each group has its own chapter.”</div>
                </ol></div>` 
            },
            { 
                title: "Practical: EDA on a Real Dataset", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li><strong>Task:</strong></li>
                    <li>Choose a cleaned dataset from Module 3.</li>
                    <li>Use Excel, Power BI, or Python to explore it.</li>
                    <li>Find averages, trends, outliers, and correlations.</li>
                    <li>Segment the data and compare groups.</li>
                    <li>Write down 3 insights you discovered.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Exploration is not just analysis—it’s discovery with direction.”</div>
                </ol></div>` 
            },
            { 
                title: "Q&A", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li>What if I don’t see any patterns? → Try segmenting or visualizing differently.</li>
                    <li>What if my data is too small? → Focus on quality, not quantity.</li>
                    <li>What if I find something strange? → Investigate—it could be valuable.</li>
                    <li>What if I don’t know what to ask? → Start with summaries and comparisons.</li>
                    <li>What if I’m overwhelmed? → Focus on one column or question at a time.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Confusion is part of exploration—keep asking, keep learning.”</div>
                </ol></div>` 
            },
            { 
                title: "Key Takeaways", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li>EDA helps you understand your data before analysis.</li>
                    <li>Ask smart questions and explore with summaries and visuals.</li>
                    <li>Use Excel, Power BI, and Python to uncover patterns.</li>
                    <li>Spot outliers, trends, and relationships.</li>
                    <li>You’re now ready to visualize your findings.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “EDA is the flashlight—shine it on your data and see what’s hidden.”</div>
                </ol></div>` 
            },
            { 
                title: "EDA Report", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li><strong>Task:</strong></li>
                    <li>Choose a dataset and perform EDA using at least two tools.</li>
                    <li>Summarize key stats, trends, and outliers.</li>
                    <li>Segment the data and compare groups.</li>
                    <li>Write a short report with 3–5 insights.</li>
                    <li>Save it for your portfolio or share with a peer.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Your EDA report is your first story—make it clear, curious, and compelling.”</div>
                </ol></div>` 
            }
        ]
    },
    {
        title: "Data Visualization",
        slides: [
            { 
                title: "Why Visualize Data?", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li>Visuals help people understand data faster than tables or text.</li>
                    <li>Charts reveal patterns, trends, and outliers at a glance.</li>
                    <li>Good visuals support decision-making and storytelling.</li>
                    <li>Visualization makes data accessible to non-technical audiences.</li>
                    <li>It’s not just decoration—it’s communication.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Data speaks louder when it’s visual—show it, don’t just say it.”</div>
                </ol></div>` 
            },
            { 
                title: "Choosing the Right Chart", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li><strong>Chart Type: Bar Chart</strong> - Comparing categories</li>
                    <li><strong>Chart Type: Line Chart</strong> - Showing trends over time</li>
                    <li><strong>Chart Type: Pie Chart</strong> - Showing proportions</li>
                    <li><strong>Chart Type: Scatter Plot</strong> - Showing relationships</li>
                    <li><strong>Chart Type: Map Chart</strong> - Showing geographic data</li>
                    <li>Match the chart to the message.</li>
                    <li>Avoid pie charts for too many categories.</li>
                    <li>Use color and labels wisely.</li>
                    <li>Keep it simple and focused.</li>
                    <li>Test different charts to find the best fit.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “The right chart is like the right outfit—it makes your message shine.”</div>
                </ol></div>` 
            },
            { 
                title: "Visualizing in Excel", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li>Use “Insert → Chart” to create bar, line, pie, and more.</li>
                    <li>Use “Recommended Charts” for quick suggestions.</li>
                    <li>Customize titles, labels, and colors.</li>
                    <li>Use conditional formatting for in-cell visuals.</li>
                    <li>Excel is great for quick, simple charts.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Excel turns numbers into pictures—fast, familiar, and effective.”</div>
                </ol></div>` 
            },
            { 
                title: "Visualizing in Power BI", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li>Drag fields to create visuals instantly.</li>
                    <li>Use slicers to make charts interactive.</li>
                    <li>Combine visuals into dashboards.</li>
                    <li>Use filters to focus on specific data.</li>
                    <li>Power BI is ideal for business storytelling.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Power BI is your canvas—paint your insights with clarity and control.”</div>
                </ol></div>` 
            },
            { 
                title: "Visualizing in Python", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li><pre><code>import matplotlib.pyplot as plt<br>df['Sales'].plot(kind='bar')<br>plt.title('Sales by Product')<br>plt.show()</code></pre></li>
                    <li>Use matplotlib for basic charts.</li>
                    <li>Use seaborn for advanced, beautiful visuals.</li>
                    <li>Customize colors, labels, and styles.</li>
                    <li>Save charts as images for reports.</li>
                    <li>Python is great for automation and customization.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Python lets you design your visuals—precise, powerful, and programmable.”</div>
                </ol></div>` 
            },
            { 
                title: "Customizing Visuals", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li>Add clear titles and axis labels.</li>
                    <li>Use color to highlight key points.</li>
                    <li>Avoid clutter—less is more.</li>
                    <li>Use annotations to explain insights.</li>
                    <li>Make visuals readable and professional.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Customization is clarity—make your visuals speak with purpose.”</div>
                </ol></div>` 
            },
            { 
                title: "Telling a Story with Data", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li>Start with a question or insight.</li>
                    <li>Use visuals to guide the audience step by step.</li>
                    <li>Highlight trends, comparisons, and conclusions.</li>
                    <li>Use captions and commentary to explain.</li>
                    <li>End with a recommendation or action.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Data storytelling turns charts into chapters—make your message unforgettable.”</div>
                </ol></div>` 
            },
            { 
                title: "Dashboards in Power BI", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li>Combine multiple visuals into one view.</li>
                    <li>Use slicers and filters for interactivity.</li>
                    <li>Show key metrics like totals, averages, and trends.</li>
                    <li>Design for clarity and flow.</li>
                    <li>Dashboards help teams monitor performance in real time.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “A dashboard is your data’s résumé—clean, confident, and ready to impress.”</div>
                </ol></div>` 
            },
            { 
                title: "Common Visualization Mistakes", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li>Too many colors or chart types.</li>
                    <li>Misleading scales or axes.</li>
                    <li>Overuse of pie charts.</li>
                    <li>Cluttered labels and legends.</li>
                    <li>Ignoring the audience’s needs.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “A bad chart is noise—a good chart is music. Make yours sing.”</div>
                </ol></div>` 
            },
            { 
                title: "Practical: Build a Dashboard", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li><strong>Task:</strong></li>
                    <li>Choose a cleaned dataset from Module 3.</li>
                    <li>Use Power BI or Excel to build a dashboard.</li>
                    <li>Include at least 3 visuals (e.g., bar chart, line chart, card).</li>
                    <li>Add slicers or filters for interactivity.</li>
                    <li>Save and present your dashboard.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Your dashboard is your stage—let your data perform.”</div>
                </ol></div>` 
            },
            { 
                title: "Q&A", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li>What if my chart looks messy? → Simplify and remove clutter.</li>
                    <li>What if I don’t know which chart to use? → Try a few and compare.</li>
                    <li>What if my data is too small? → Focus on clarity, not complexity.</li>
                    <li>What if I want to impress my boss? → Use dashboards with clear insights.</li>
                    <li>What if I’m stuck? → Ask for feedback and iterate.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Every chart is a draft—refine it until it speaks clearly.”</div>
                </ol></div>` 
            },
            { 
                title: "Key Takeaways", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li>Visualization makes data easier to understand and share.</li>
                    <li>Choose the right chart for your message.</li>
                    <li>Use Excel, Power BI, and Python to create visuals.</li>
                    <li>Customize for clarity and impact.</li>
                    <li>Dashboards help tell stories and drive decisions.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Your visuals are your voice—make them bold, clear, and confident.”</div>
                </ol></div>` 
            },
            { 
                title: "Visualization Project", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li><strong>Task:</strong></li>
                    <li>Choose a dataset and build a dashboard using Power BI or Excel.</li>
                    <li>Include at least 3 types of visuals.</li>
                    <li>Customize titles, labels, and colors.</li>
                    <li>Write a short summary of what your dashboard shows.</li>
                    <li>Save it for your portfolio or present it to a peer.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Your dashboard is your signature—make it smart, clean, and unforgettable.”</div>
                </ol></div>` 
            }
        ]
    },
    {
        title: "Working with Databases & SQL",
        slides: [
            { 
                title: "What is a Database?", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li>A database stores structured data in tables—like Excel, but more powerful.</li>
                    <li>It allows fast access, updates, and organization of large datasets.</li>
                    <li>Common types: MySQL, PostgreSQL, SQLite, Microsoft SQL Server.</li>
                    <li>Used in banking, healthcare, retail, and more.</li>
                    <li>You’ll learn how to interact with databases using SQL.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “A database is your digital warehouse—organized, secure, and ready for action.”</div>
                </ol></div>` 
            },
            { 
                title: "Introduction to SQL", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li>SQL stands for Structured Query Language.</li>
                    <li>It’s used to communicate with databases.</li>
                    <li>You write queries to get, filter, and manipulate data.</li>
                    <li>SQL is simple to learn but powerful to use.</li>
                    <li>You’ll start with basic commands and build up.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “SQL is not coding—it’s asking questions in the language of data.”</div>
                </ol></div>` 
            },
            { 
                title: "Connecting to Databases", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li>Use tools like MySQL Workbench, SQLite, or cloud platforms.</li>
                    <li>Connect using credentials: host, username, password, database name.</li>
                    <li>You can also connect through Python or Power BI.</li>
                    <li>Example: Connect to a customer database to analyze purchases.</li>
                    <li>Always test your connection before querying.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Connecting to a database is like unlocking a vault—know the keys, and the data is yours.”</div>
                </ol></div>` 
            },
            { 
                title: "Basic SQL Queries (SELECT, WHERE)", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li><pre><code>SELECT Name, Sales<br>FROM Customers<br>WHERE Region = 'Nairobi';</code></pre></li>
                    <li>SELECT chooses columns.</li>
                    <li>FROM specifies the table.</li>
                    <li>WHERE filters rows based on conditions.</li>
                    <li>Use quotes for text and operators like =, >, <.</li>
                    <li>Start with simple queries to explore your data.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “SELECT is your spotlight—shine it where the answers hide.”</div>
                </ol></div>` 
            },
            { 
                title: "Filtering & Sorting Data", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li><pre><code>SELECT *<br>FROM Sales<br>WHERE Amount > 1000<br>ORDER BY Date DESC;</code></pre></li>
                    <li>Use WHERE to filter rows.</li>
                    <li>Use ORDER BY to sort results.</li>
                    <li>ASC = ascending, DESC = descending.</li>
                    <li>Combine filters for deeper analysis.</li>
                    <li>Example: Find top sales in the last month.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Filtering is like zooming in—focus on what matters most.”</div>
                </ol></div>` 
            },
            { 
                title: "Aggregations (SUM, AVG, COUNT)", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li><pre><code>SELECT Region, SUM(Sales)<br>FROM Orders<br>GROUP BY Region;</code></pre></li>
                    <li>SUM() adds values.</li>
                    <li>AVG() finds the average.</li>
                    <li>COUNT() counts rows.</li>
                    <li>Use GROUP BY to summarize by category.</li>
                    <li>Example: Total sales per region.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Aggregation turns rows into insights—big picture, clear answers.”</div>
                </ol></div>` 
            },
            { 
                title: "Joins & Relationships", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li><pre><code>SELECT Customers.Name, Orders.Amount<br>FROM Customers<br>JOIN Orders ON Customers.ID = Orders.CustomerID;</code></pre></li>
                    <li>Joins combine data from multiple tables.</li>
                    <li>INNER JOIN shows matching rows.</li>
                    <li>LEFT JOIN keeps all from the left table.</li>
                    <li>Relationships are built on shared keys.</li>
                    <li>Example: Match customers with their orders.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Joins are bridges—connect the dots and the story unfolds.”</div>
                </ol></div>` 
            },
            { 
                title: "Importing SQL Data into Power BI/Excel", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li>Power BI: Use “Get Data → SQL Server” to connect.</li>
                    <li>Excel: Use “Data → From Database” to import.</li>
                    <li>You can refresh data automatically.</li>
                    <li>Use filters and visuals to explore imported data.</li>
                    <li>Great for building dashboards from live databases.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “SQL feeds the dashboard—real-time data, real-time decisions.”</div>
                </ol></div>` 
            },
            { 
                title: "Exporting Data from SQL", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li><pre><code>SELECT *<br>INTO ExportTable<br>FROM CleanedData;</code></pre></li>
                    <li>Export data to CSV, Excel, or another table.</li>
                    <li>Use INTO to create new tables.</li>
                    <li>Use tools or scripts to automate exports.</li>
                    <li>Example: Export cleaned customer list for reporting.</li>
                    <li>Always check formats and permissions.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Exporting is packaging—your insights, ready to deliver.”</div>
                </ol></div>` 
            },
            { 
                title: "Practical: Query a Real Database", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li><strong>Task:</strong></li>
                    <li>Connect to a sample database (e.g., SQLite or MySQL).</li>
                    <li>Run basic queries: SELECT, WHERE, ORDER BY.</li>
                    <li>Use GROUP BY and JOIN to explore relationships.</li>
                    <li>Import results into Excel or Power BI.</li>
                    <li>Document your queries and findings.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Every query is a question—ask wisely, and the data will answer.”</div>
                </ol></div>` 
            },
            { 
                title: "Q&A", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li>What if my query doesn’t work? → Check syntax and table names.</li>
                    <li>What if I don’t have a database? → Use free tools like SQLite or sample datasets.</li>
                    <li>What’s the difference between SQL and Excel? → SQL handles bigger, faster data.</li>
                    <li>Can I use SQL with Python? → Yes, with libraries like sqlite3 or SQLAlchemy.</li>
                    <li>How do I practice? → Use online platforms like Mode, W3Schools, or DB Fiddle.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Questions are fuel—ask more, learn faster.”</div>
                </ol></div>` 
            },
            { 
                title: "Key Takeaways", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li>SQL is the language of databases—simple, powerful, essential.</li>
                    <li>You can filter, sort, and summarize data with ease.</li>
                    <li>Joins unlock deeper insights across tables.</li>
                    <li>SQL connects smoothly to Excel and Power BI.</li>
                    <li>You now have the skills to query real-world data.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “You’ve learned to speak data fluently—SQL is your passport.”</div>
                </ol></div>` 
            },
            { 
                title: "SQL Task", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li><strong>Task:</strong></li>
                    <li>Choose a dataset with at least two related tables.</li>
                    <li>Write queries to explore, filter, and summarize the data.</li>
                    <li>Use joins to combine insights.</li>
                    <li>Import your results into Power BI or Excel.</li>
                    <li>Share your findings or save for your portfolio.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Your challenge is simple: turn raw tables into real answers.”</div>
                </ol></div>` 
            }
        ]
    },
    {
        title: "Advanced Excel for Analysts",
        slides: [
            { 
                title: "Advanced Formulas (IF, VLOOKUP, INDEX/MATCH)", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li>IF() lets you create logic-based decisions in cells.</li>
                    <li>VLOOKUP() searches for values vertically in a table.</li>
                    <li>INDEX/MATCH is more flexible than VLOOKUP for complex lookups.</li>
                    <li>Combine formulas for multi-step logic.</li>
                    <li>Use named ranges to simplify formulas.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Formulas are your thinking tools—build logic into every cell.”</div>
                </ol></div>` 
            },
            { 
                title: "Pivot Tables", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li>Pivot Tables summarize large datasets quickly.</li>
                    <li>Drag and drop fields to create dynamic reports.</li>
                    <li>Use filters and slicers to explore data.</li>
                    <li>Group data by categories, dates, or ranges.</li>
                    <li>Great for finding trends and totals fast.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Pivot Tables are your microscope—zoom in and see what matters.”</div>
                </ol></div>` 
            },
            { 
                title: "Conditional Formatting", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li>Highlight cells based on rules (e.g., greater than, duplicates).</li>
                    <li>Use color scales to show value intensity.</li>
                    <li>Use icon sets for visual indicators.</li>
                    <li>Helps spot trends, errors, and outliers.</li>
                    <li>Make your data speak visually.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Color isn’t decoration—it’s direction. Use it to guide the eye.”</div>
                </ol></div>` 
            },
            { 
                title: "Data Validation & Protection", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li>Use Data Validation to control what users can enter.</li>
                    <li>Create dropdown lists for clean inputs.</li>
                    <li>Prevent duplicates or invalid entries.</li>
                    <li>Protect sheets to lock formulas and structure.</li>
                    <li>Keep your data clean and secure.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Validation is your bouncer—only clean data gets past the door.”</div>
                </ol></div>` 
            },
            { 
                title: "What-If Analysis", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li>Use “Goal Seek” to find inputs that reach a target.</li>
                    <li>Use “Scenario Manager” to compare different outcomes.</li>
                    <li>Use “Data Tables” to test multiple values.</li>
                    <li>Great for forecasting and decision-making.</li>
                    <li>Helps answer “what happens if…?”</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “What-if tools turn questions into simulations—test before you act.”</div>
                </ol></div>` 
            },
            { 
                title: "Macros & Automation", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li>Macros record steps to automate tasks.</li>
                    <li>Use the Developer tab to access macro tools.</li>
                    <li>Write simple VBA code for custom automation.</li>
                    <li>Save time on repetitive tasks.</li>
                    <li>Always test macros before sharing.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Macros are your robot assistants—teach them once, and they’ll never forget.”</div>
                </ol></div>` 
            },
            { 
                title: "Connecting Excel to Power BI", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li>Export Excel tables into Power BI for visualization.</li>
                    <li>Use Power Query in both tools for cleaning and shaping.</li>
                    <li>Refresh data automatically from Excel sources.</li>
                    <li>Combine Excel logic with Power BI visuals.</li>
                    <li>Great for building hybrid dashboards.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Excel and Power BI are teammates—connect them and amplify your insights.”</div>
                </ol></div>` 
            },
            { 
                title: "Importing Data from Web", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li>Use “Data → From Web” to pull online tables into Excel.</li>
                    <li>Clean and format web data using Power Query.</li>
                    <li>Great for live updates from public sources.</li>
                    <li>Watch for inconsistent formatting or broken links.</li>
                    <li>Use responsibly and cite your sources.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “The web is a buffet—Excel helps you plate the data you need.”</div>
                </ol></div>` 
            },
            { 
                title: "Data Modeling in Excel", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li>Use relationships between tables with Power Pivot.</li>
                    <li>Create calculated columns and measures using DAX.</li>
                    <li>Build models that update with new data.</li>
                    <li>Use slicers and timelines for interactivity.</li>
                    <li>Excel can handle complex models with the right setup.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Modeling is storytelling with structure—build it once, and let it evolve.”</div>
                </ol></div>` 
            },
            { 
                title: "Practical: Advanced Excel Project", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li><strong>Task:</strong></li>
                    <li>Use a dataset to build a dashboard with Pivot Tables, formulas, and conditional formatting.</li>
                    <li>Add dropdowns and validation for clean inputs.</li>
                    <li>Use Goal Seek or Scenario Manager for forecasting.</li>
                    <li>Automate one task with a macro.</li>
                    <li>Save and present your workbook.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Your workbook is your workshop—build tools that work for you.”</div>
                </ol></div>` 
            },
            { 
                title: "Q&A", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li>What if my formula doesn’t work? → Check syntax and cell references.</li>
                    <li>What if my Pivot Table is blank? → Check your source data and filters.</li>
                    <li>What if I break a macro? → Undo or restore a backup.</li>
                    <li>What if I don’t see Power Pivot? → Enable it in Excel options.</li>
                    <li>What if I’m overwhelmed? → Start with one feature at a time.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Excel is deep—dive in slowly, and you’ll swim like a pro.”</div>
                </ol></div>` 
            },
            { 
                title: "Key Takeaways", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li>Advanced Excel features help you analyze, automate, and model data.</li>
                    <li>Use formulas, Pivot Tables, and conditional formatting for insight.</li>
                    <li>Use validation and protection to keep data clean.</li>
                    <li>Automate tasks with macros and connect to Power BI.</li>
                    <li>You’re now ready to build powerful Excel projects.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Excel isn’t just a spreadsheet—it’s your analytical playground.”</div>
                </ol></div>` 
            },
            { 
                title: "Excel Mini-Project", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li><strong>Task:</strong></li>
                    <li>Choose a dataset and build a mini-project using at least 3 advanced features.</li>
                    <li>Include formulas, visuals, and automation.</li>
                    <li>Write a short summary of what your workbook does.</li>
                    <li>Save it for your portfolio or present it to a peer.</li>
                    <li>Reflect on what you learned.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Your Excel project is your proof—show what you’ve built, and how it works.”</div>
                </ol></div>` 
            }
        ]
    },
    {
        title: "Power BI for Business Insights",
        slides: [
            { 
                title: "Power BI Overview", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li>Power BI is a business intelligence tool for data visualization and reporting.</li>
                    <li>It connects to multiple data sources and transforms raw data into insights.</li>
                    <li>You can build interactive dashboards and share them online.</li>
                    <li>It’s used by companies for performance tracking and decision-making.</li>
                    <li>Power BI has a desktop app and a cloud service.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Power BI turns data into decisions—fast, visual, and impactful.”</div>
                </ol></div>` 
            },
            { 
                title: "Connecting to Multiple Data Sources", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li>Use “Get Data” to connect to Excel, SQL, web, and cloud sources.</li>
                    <li>Combine data from different systems into one report.</li>
                    <li>Use Power Query to clean and shape data during import.</li>
                    <li>Refresh data automatically for live updates.</li>
                    <li>Great for building unified dashboards.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Power BI is your data hub—connect everything, see everything.”</div>
                </ol></div>` 
            },
            { 
                title: "Data Modeling in Power BI", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li>Use relationships to connect tables (like SQL joins).</li>
                    <li>Create calculated columns and measures using DAX.</li>
                    <li>Build models that update with new data.</li>
                    <li>Use “Manage Relationships” to define links.</li>
                    <li>Modeling helps you analyze complex datasets.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Modeling is structure—build it right, and your insights will stand strong.”</div>
                </ol></div>` 
            },
            { 
                title: "Creating Interactive Dashboards", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li>Drag visuals onto the canvas to build your dashboard.</li>
                    <li>Use slicers and filters for interactivity.</li>
                    <li>Add cards to show totals, averages, and KPIs.</li>
                    <li>Use themes and layout tools for design.</li>
                    <li>Dashboards help users explore data on their own.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “A dashboard is your data’s voice—make it speak clearly and confidently.”</div>
                </ol></div>` 
            },
            { 
                title: "DAX Basics", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li>DAX stands for Data Analysis Expressions.</li>
                    <li>It’s used to create formulas in Power BI.</li>
                    <li>Example: TotalSales = SUM(Sales[Amount])</li>
                    <li>Use DAX for calculated columns, measures, and filters.</li>
                    <li>DAX is powerful for custom logic and analysis.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “DAX is your formula language—speak it fluently, and your data will listen.”</div>
                </ol></div>` 
            },
            { 
                title: "Filters & Slicers", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li>Filters narrow down data in visuals or pages.</li>
                    <li>Slicers let users interact with dashboards.</li>
                    <li>Use dropdowns, buttons, or timelines.</li>
                    <li>Combine multiple slicers for deeper control.</li>
                    <li>Filters help focus the story.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Slicers are your steering wheel—let users drive their own insights.”</div>
                </ol></div>` 
            },
            { 
                title: "Sharing Reports", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li>Publish dashboards to Power BI Service.</li>
                    <li>Share with teams or clients via links or apps.</li>
                    <li>Set permissions for viewing or editing.</li>
                    <li>Schedule data refreshes for up-to-date reports.</li>
                    <li>Collaborate in real time across devices.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Insights are meant to be shared—Power BI makes it seamless.”</div>
                </ol></div>` 
            },
            { 
                title: "Power BI Service & Cloud", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li>Power BI Service is the online platform for sharing and collaboration.</li>
                    <li>Access dashboards from any device.</li>
                    <li>Use workspaces to organize reports.</li>
                    <li>Set alerts and subscriptions for key metrics.</li>
                    <li>Cloud access means real-time decisions.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “The cloud is your command center—watch your data, lead your team.”</div>
                </ol></div>` 
            },
            { 
                title: "Real-World Use Cases", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li><strong>Industry: Retail</strong> - Track sales and inventory</li>
                    <li><strong>Industry: Finance</strong> - Monitor budgets and forecasts</li>
                    <li><strong>Industry: Healthcare</strong> - Analyze patient outcomes</li>
                    <li><strong>Industry: Education</strong> - Visualize student performance</li>
                    <li><strong>Industry: Logistics</strong> - Optimize delivery routes</li>
                    <li>Power BI is used across industries.</li>
                    <li>Dashboards help teams stay informed and aligned.</li>
                    <li>You’ll build your own use case in the practical task.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Power BI isn’t just a tool—it’s a translator between data and decisions.”</div>
                </ol></div>` 
            },
            { 
                title: "Practical: Build a Business Dashboard", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li><strong>Task:</strong></li>
                    <li>Choose a dataset related to business (e.g., sales, finance, operations).</li>
                    <li>Connect it to Power BI and clean the data.</li>
                    <li>Build a dashboard with at least 3 visuals.</li>
                    <li>Add slicers and cards for interactivity.</li>
                    <li>Save and present your dashboard.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Your dashboard is your business pitch—make it smart, visual, and convincing.”</div>
                </ol></div>` 
            },
            { 
                title: "Q&A", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li>What if my visuals don’t show data? → Check relationships and filters.</li>
                    <li>What if I don’t understand DAX? → Start with simple formulas and build up.</li>
                    <li>What if my dashboard looks messy? → Use themes and layout tools.</li>
                    <li>What if I can’t publish? → Check your Power BI account and permissions.</li>
                    <li>What if I’m stuck? → Ask for help or explore Power BI tutorials.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Every dashboard starts rough—refine it until it tells a story.”</div>
                </ol></div>` 
            },
            { 
                title: "Key Takeaways", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li>Power BI helps you turn data into business insights.</li>
                    <li>Connect multiple sources and model your data.</li>
                    <li>Build interactive dashboards with visuals and slicers.</li>
                    <li>Use DAX for custom logic and analysis.</li>
                    <li>Share your work through Power BI Service.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Power BI is your business lens—look through it, and lead with clarity.”</div>
                </ol></div>` 
            },
            { 
                title: "Power BI Project", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li><strong>Task:</strong></li>
                    <li>Choose a business dataset and build a dashboard in Power BI.</li>
                    <li>Include at least 3 visuals, 2 slicers, and 1 DAX measure.</li>
                    <li>Write a short summary of what your dashboard shows.</li>
                    <li>Share it with a peer or save it for your portfolio.</li>
                    <li>Reflect on what you learned.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Your Power BI project is your proof—show how data drives decisions.”</div>
                </ol></div>` 
            }
        ]
    },
    
    {
        title: "Python for Data Analysis",
        slides: [
            { 
                title: "Visualizing Data with Python", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li><pre><code>import matplotlib.pyplot as plt<br>import seaborn as sns<br>sns.barplot(x='Sales', y='Product', data=df)<br>plt.title('Sales by Product')<br>plt.show()</code></pre></li>
                    <li>Use matplotlib for basic charts.</li>
                    <li>Use seaborn for advanced, beautiful visuals.</li>
                    <li>Create bar, line, scatter, and box plots.</li>
                    <li>Customize titles, labels, and colors.</li>
                    <li>Save charts with plt.savefig().</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Visuals in Python are your canvas—paint your insights with code.”</div>
                </ol></div>` 
            },
            { 
                title: "Automating Analysis with Python", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li><pre><code>for col in df.columns:<br>    print(f"{col}: {df[col].isnull().sum()}")</code></pre></li>
                    <li>Use loops to automate repetitive tasks.</li>
                    <li>Create functions to reuse code.</li>
                    <li>Automate cleaning, summaries, and visuals.</li>
                    <li>Save time and reduce errors.</li>
                    <li>Share scripts for collaboration.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Automation is freedom—let Python do the heavy lifting.”</div>
                </ol></div>` 
            },
            { 
                title: "Combining Data Sources", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li><pre><code>df1 = pd.read_csv("sales.csv")<br>df2 = pd.read_csv("customers.csv")<br>merged = pd.merge(df1, df2, on='CustomerID')</code></pre></li>
                    <li>Use pd.merge() to combine datasets.</li>
                    <li>Use concat() to stack data vertically.</li>
                    <li>Ensure keys match for clean merges.</li>
                    <li>Check for duplicates after combining.</li>
                    <li>Great for complex analysis across sources.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Merging data is like mixing ingredients—blend well for richer insights.”</div>
                </ol></div>` 
            },
            { 
                title: "Exporting Results", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li><pre><code>df.to_csv("cleaned_data.csv", index=False)<br>df.to_excel("report.xlsx")</code></pre></li>
                    <li>Export data to CSV, Excel, or JSON.</li>
                    <li>Use index=False to avoid extra columns.</li>
                    <li>Export visuals with plt.savefig().</li>
                    <li>Share results with Power BI or reports.</li>
                    <li>Always check format compatibility.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Exporting is sharing—package your insights for the world to see.”</div>
                </ol></div>` 
            },
            { 
                title: "Practical: Python Analysis Project", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li><strong>Task:</strong></li>
                    <li>Choose a dataset and load it with pandas.</li>
                    <li>Clean it, explore it, and visualize it.</li>
                    <li>Use groupby() and at least one chart.</li>
                    <li>Export your results to CSV or an image.</li>
                    <li>Write a short summary of your findings.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Your Python project is your lab report—show your process, share your results.”</div>
                </ol></div>` 
            },
            { 
                title: "Q&A", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li>What if my code doesn’t work? → Check syntax and indentation.</li>
                    <li>What if I don’t understand pandas? → Start with simple functions like head().</li>
                    <li>What if my visuals look bad? → Adjust colors and sizes with code.</li>
                    <li>What if Python is slow? → Optimize with smaller datasets or loops.</li>
                    <li>What if I’m stuck? → Use online resources or ask for help.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Python is a puzzle—every error is a clue to learn more.”</div>
                </ol></div>` 
            },
            { 
                title: "Key Takeaways", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li>Python is powerful for cleaning, analyzing, and visualizing data.</li>
                    <li>Use pandas for data manipulation and matplotlib/seaborn for visuals.</li>
                    <li>Automate tasks to save time and reduce errors.</li>
                    <li>Combine and export data for collaboration.</li>
                    <li>You’re now ready to tackle data with Python.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Python is your data superpower—learn it, wield it, win with it.”</div>
                </ol></div>` 
            },
            { 
                title: "Python Mini-Project", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li><strong>Task:</strong></li>
                    <li>Choose a dataset and analyze it with pandas.</li>
                    <li>Clean, explore, and create at least two visuals.</li>
                    <li>Automate one task with a loop or function.</li>
                    <li>Export your results and write a short summary.</li>
                    <li>Share your notebook or save it for your portfolio.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Your Python code is your signature—make it clean, clear, and clever.”</div>
                </ol></div>` 
            }
        ]
    },
    {
        title: "Statistics for Data Analytics",
        slides: [
            { 
                title: "Why Statistics?", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li>Statistics helps you understand data patterns and variability.</li>
                    <li>It’s the foundation of reliable insights and predictions.</li>
                    <li>You don’t need to be a math expert—just know the basics.</li>
                    <li>Statistics answers: How much? How likely? How different?</li>
                    <li>It’s critical for decision-making and reporting.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Statistics is your data’s heartbeat—listen to it to understand what’s happening.”</div>
                </ol></div>` 
            },
            { 
                title: "Descriptive Statistics", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li><strong>Measure: Mean</strong> - Average of all values</li>
                    <li><strong>Measure: Median</strong> - Middle value when sorted</li>
                    <li><strong>Measure: Mode</strong> - Most frequent value</li>
                    <li><strong>Measure: Variance</strong> - How spread out data is</li>
                    <li><strong>Measure: Standard Deviation</strong> - Square root of variance</li>
                    <li>Use these to summarize and describe your data.</li>
                    <li>In Excel: Use AVERAGE, MEDIAN, STDEV.P.</li>
                    <li>In Python: Use df.describe().</li>
                    <li>Great for quick insights and comparisons.</li>
                    <li>Always interpret in context of your question.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Descriptive stats are your data’s selfie—capture the essence at a glance.”</div>
                </ol></div>` 
            },
            { 
                title: "Probability Basics", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li>Probability measures how likely something is (0 to 1).</li>
                    <li>Example: 0.7 means 70% chance of rain.</li>
                    <li>Use probability to assess risks and outcomes.</li>
                    <li>Independent events don’t affect each other (e.g., coin flips).</li>
                    <li>Dependent events do (e.g., sales depend on season).</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Probability is your weather forecast—use it to plan for what’s likely.”</div>
                </ol></div>` 
            },
            { 
                title: "Distributions & Normal Curve", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li>Data often follows patterns called distributions.</li>
                    <li>Normal distribution: bell-shaped, symmetric, mean = median.</li>
                    <li>Use histograms to check if data is normal.</li>
                    <li>Normal curves help predict ranges and likelihoods.</li>
                    <li>In Python: Use seaborn.histplot() to visualize.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Distributions are your data’s shape—know them to predict its behavior.”</div>
                </ol></div>` 
            },
            { 
                title: "Correlation vs. Causation", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li>Correlation: Two things move together (e.g., ice cream sales and temperature).</li>
                    <li>Causation: One thing causes another (e.g., marketing causes sales).</li>
                    <li>In Excel: Use CORREL() for correlation.</li>
                    <li>In Python: Use df.corr().</li>
                    <li>Never assume correlation means causation.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Correlation is a hint, not a proof—dig deeper to find the truth.”</div>
                </ol></div>` 
            },
            { 
                title: "Hypothesis Testing", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li>Test ideas with data (e.g., “Does training improve sales?”).</li>
                    <li>Null hypothesis: No difference or effect.</li>
                    <li>Alternative hypothesis: There is a difference.</li>
                    <li>Use p-value to check significance (low p = reject null).</li>
                    <li>In Python: Use scipy.stats for tests like t-test.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Hypothesis testing is your detective—prove or disprove with evidence.”</div>
                </ol></div>` 
            },
            { 
                title: "Statistical Tools in Excel", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li>Use “Data Analysis Toolpak” for stats like t-tests and regression.</li>
                    <li>Use AVERAGE, STDEV.P, CORREL for basics.</li>
                    <li>Create histograms for distribution checks.</li>
                    <li>Use Pivot Tables for group summaries.</li>
                    <li>Excel is great for quick statistical analysis.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Excel’s stats tools are your calculator—fast, simple, and reliable.”</div>
                </ol></div>` 
            },
            { 
                title: "Statistical Tools in Python", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li><pre><code>from scipy.stats import ttest_ind<br>stats, p = ttest_ind(df['Group1'], df['Group2'])<br>print(p)</code></pre></li>
                    <li>Use scipy.stats for t-tests and other tests.</li>
                    <li>Use numpy for calculations like mean and std.</li>
                    <li>Use pandas for summaries and grouping.</li>
                    <li>Python is ideal for advanced stats and large data.</li>
                    <li>Visualize stats with seaborn or matplotlib.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Python’s stats tools are your lab—test, analyze, and discover.”</div>
                </ol></div>` 
            },
            { 
                title: "Interpreting Results", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li>Stats give numbers; you give meaning.</li>
                    <li>Compare means to find differences.</li>
                    <li>Use p-values to judge significance.</li>
                    <li>Explain results in plain language for non-experts.</li>
                    <li>Always tie stats to your original question.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Stats are facts—your job is to turn them into stories.”</div>
                </ol></div>` 
            },
            { 
                title: "Practical: Statistical Analysis", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li><strong>Task:</strong></li>
                    <li>Choose a dataset and calculate descriptive stats.</li>
                    <li>Check for correlations and distributions.</li>
                    <li>Run a simple hypothesis test (e.g., t-test).</li>
                    <li>Use Excel or Python for analysis.</li>
                    <li>Write a short summary of your findings.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Stats aren’t just numbers—they’re your data’s pulse. Check it carefully.”</div>
                </ol></div>` 
            },
            { 
                title: "Q&A", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li>What if I don’t understand stats? → Focus on basics like mean and median.</li>
                    <li>What if my p-value is high? → Your hypothesis may not be supported.</li>
                    <li>What if my data isn’t normal? → Use non-parametric tests or transform it.</li>
                    <li>What if stats feel hard? → Practice with small datasets first.</li>
                    <li>What if I’m stuck? → Ask for help or check online tutorials.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Stats are a language—learn a few words, and you’ll start to speak it.”</div>
                </ol></div>` 
            },
            { 
                title: "Key Takeaways", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li>Statistics help you summarize, compare, and predict.</li>
                    <li>Use descriptive stats for quick insights.</li>
                    <li>Understand probability, distributions, and correlations.</li>
                    <li>Test hypotheses to confirm ideas.</li>
                    <li>You’re now ready to add stats to your analysis.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Stats are your data’s truth serum—use them to reveal what’s real.”</div>
                </ol></div>` 
            },
            { 
                title: "Statistics Mini-Project", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li><strong>Task:</strong></li>
                    <li>Choose a dataset and calculate key stats (mean, median, std).</li>
                    <li>Check for correlations or run a hypothesis test.</li>
                    <li>Create visuals to show your findings.</li>
                    <li>Write a short report summarizing your results.</li>
                    <li>Save it for your portfolio or share with a peer.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Your stats project is your proof—show the world what your data says.”</div>
                </ol></div>` 
            }
        ]
    },
    {
        title: "Storytelling with Data",
        slides: [
            { 
                title: "What is Data Storytelling?", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li>Data storytelling is using data and visuals to explain insights clearly.</li>
                    <li>It combines numbers, visuals, and narrative.</li>
                    <li>It’s about making your findings relatable and actionable.</li>
                    <li>Great stories answer: What? Why? So what?</li>
                    <li>It’s critical for analysts to influence decisions.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Data without a story is just numbers—tell it well, and it changes minds.”</div>
                </ol></div>` 
            },
            { 
                title: "The Storytelling Framework", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li><strong>Step: Problem</strong> - What’s the issue or question?</li>
                    <li><strong>Step: Data</strong> - What does the data show?</li>
                    <li><strong>Step: Insight</strong> - What’s the key finding?</li>
                    <li><strong>Step: Action</strong> - What should be done?</li>
                    <li>Use this to structure every report or presentation.</li>
                    <li>Keep your audience in mind—technical or non-technical.</li>
                    <li>Simplify without losing truth.</li>
                    <li>Use visuals to support your story.</li>
                    <li>Practice explaining in plain language.</li>
                    <li>End with a clear recommendation.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “A good story is a bridge—connect your data to your audience’s needs.”</div>
                </ol></div>` 
            },
            { 
                title: "Know Your Audience", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li>Understand who you’re presenting to: boss, client, team.</li>
                    <li>Tailor technical details to their knowledge level.</li>
                    <li>Focus on what they care about (e.g., profit, impact, efficiency).</li>
                    <li>Use visuals for non-technical audiences.</li>
                    <li>Be ready to answer their questions.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Your audience is your guide—speak their language, solve their problems.”</div>
                </ol></div>` 
            },
            { 
                title: "Crafting a Narrative", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li>Start with a hook: Why does this matter?</li>
                    <li>Build with data: Show evidence step by step.</li>
                    <li>Highlight insights: Point out what’s surprising or important.</li>
                    <li>End with action: Suggest what to do next.</li>
                    <li>Use visuals to reinforce the narrative.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “A narrative is a journey—lead your audience from question to solution.”</div>
                </ol></div>` 
            },
            { 
                title: "Using Visuals in Storytelling", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li>Choose visuals that match your message.</li>
                    <li>Use annotations to highlight key points.</li>
                    <li>Avoid clutter—focus on one insight per visual.</li>
                    <li>Use consistent colors and fonts.</li>
                    <li>Make sure visuals are easy to read.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Visuals are your story’s pictures—make them clear, vivid, and memorable.”</div>
                </ol></div>` 
            },
            { 
                title: "Writing Clear Reports", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li>Start with an executive summary.</li>
                    <li>Explain your question, data, and findings.</li>
                    <li>Use visuals to support your points.</li>
                    <li>Keep sentences short and jargon-free.</li>
                    <li>Include recommendations and next steps.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “A report is your data’s voice—write it clearly, and it will be heard.”</div>
                </ol></div>` 
            },
            { 
                title: "Presenting to Stakeholders", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li>Practice your presentation to be clear and confident.</li>
                    <li>Start with the big picture, then dive into details.</li>
                    <li>Use dashboards or slides to show visuals.</li>
                    <li>Anticipate questions and prepare answers.</li>
                    <li>End with a call to action.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Presenting is performing—own the stage and inspire action.”</div>
                </ol></div>` 
            },
            { 
                title: "Tools for Storytelling", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li>Power BI: Interactive dashboards for dynamic stories.</li>
                    <li>Excel: Charts and tables for simple reports.</li>
                    <li>Python: Custom visuals with matplotlib/seaborn.</li>
                    <li>PowerPoint: Combine visuals and text for presentations.</li>
                    <li>Word: Write detailed reports with embedded visuals.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Tools are your instruments—choose the ones that play your story best.”</div>
                </ol></div>` 
            },
            { 
                title: "Common Storytelling Mistakes", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li>Too much technical jargon.</li>
                    <li>Overloading with data or visuals.</li>
                    <li>No clear action or recommendation.</li>
                    <li>Ignoring the audience’s needs.</li>
                    <li>Not practicing the delivery.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “A bad story buries the data—a good story makes it soar.”</div>
                </ol></div>` 
            },
            { 
                title: "Practical: Create a Data Story", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li><strong>Task:</strong></li>
                    <li>Choose a dataset and define a clear question.</li>
                    <li>Analyze and visualize your findings.</li>
                    <li>Build a short presentation or dashboard.</li>
                    <li>Tell a story with problem, data, insight, and action.</li>
                    <li>Present to a peer or save for your portfolio.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Your story is your data’s spotlight—shine it on what matters.”</div>
                </ol></div>` 
            },
            { 
                title: "Q&A", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li>What if my story isn’t clear? → Simplify and focus on one key insight.</li>
                    <li>What if my audience doesn’t understand? → Use plain language and visuals.</li>
                    <li>What if I don’t know what to recommend? → Suggest a next step or further analysis.</li>
                    <li>What if I’m nervous presenting? → Practice and start small.</li>
                    <li>What if I’m stuck? → Get feedback from a peer.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Every story starts rough—polish it until it shines.”</div>
                </ol></div>` 
            },
            { 
                title: "Key Takeaways", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li>Storytelling turns data into actionable insights.</li>
                    <li>Use the framework: Problem, Data, Insight, Action.</li>
                    <li>Know your audience and tailor your story.</li>
                    <li>Use visuals and tools to enhance clarity.</li>
                    <li>You’re now ready to present data that drives decisions.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Your story is your impact—tell it well, and change the game.”</div>
                </ol></div>` 
            },
            { 
                title: "Storytelling Project", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li><strong>Task:</strong></li>
                    <li>Choose a dataset and create a 3–5 slide presentation.</li>
                    <li>Follow the storytelling framework.</li>
                    <li>Include at least 2 visuals and 1 recommendation.</li>
                    <li>Present to a peer or save for your portfolio.</li>
                    <li>Reflect on what you learned.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Your story is your legacy—make it clear, compelling, and actionable.”</div>
                </ol></div>` 
            }
        ]
    },
    {
        title: "Data Ethics & Privacy",
        slides: [
            { 
                title: "Why Ethics Matter", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li>Data can impact people’s lives, so it must be handled responsibly.</li>
                    <li>Ethics ensure trust, fairness, and legal compliance.</li>
                    <li>Misusing data can harm individuals or groups.</li>
                    <li>Analysts must protect privacy and avoid bias.</li>
                    <li>Ethics build your reputation and credibility.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Data is power—use it to help, not harm.”</div>
                </ol></div>` 
            },
            { 
                title: "Data Privacy Laws", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li>Kenya’s Data Protection Act (2019) protects personal data.</li>
                    <li>GDPR (Europe) sets global standards for privacy.</li>
                    <li>Rules include consent, transparency, and secure storage.</li>
                    <li>Violations can lead to fines or loss of trust.</li>
                    <li>Always know the laws in your region.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Privacy laws are your guardrails—follow them to stay safe and trusted.”</div>
                </ol></div>` 
            },
            { 
                title: "Protecting Personal Data", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li>Anonymize data: Remove names, IDs, or sensitive info.</li>
                    <li>Use secure storage: Encrypt files and databases.</li>
                    <li>Limit access: Share only with those who need it.</li>
                    <li>Avoid sharing raw personal data in reports.</li>
                    <li>Check for accidental leaks in visuals or exports.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Personal data is someone’s story—protect it like it’s your own.”</div>
                </ol></div>` 
            },
            { 
                title: "Avoiding Bias in Data", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li>Bias can come from incomplete or skewed data.</li>
                    <li>Example: Surveying only urban areas ignores rural needs.</li>
                    <li>Check for representation in your data.</li>
                    <li>Use diverse sources to balance perspectives.</li>
                    <li>Question your assumptions before analyzing.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Bias hides in the shadows—shine a light on it before you analyze.”</div>
                </ol></div>` 
            },
            { 
                title: "Ethical Decision-Making", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li>Ask: Is this fair? Is it legal? Is it transparent?</li>
                    <li>Consider the impact of your analysis on people.</li>
                    <li>Be honest about data limitations and uncertainties.</li>
                    <li>Communicate risks to stakeholders.</li>
                    <li>Choose ethics over shortcuts or pressure.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Ethics is your compass—follow it to stay true to your data and yourself.”</div>
                </ol></div>` 
            },
            { 
                title: "Data Security Practices", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li>Use strong passwords and two-factor authentication.</li>
                    <li>Encrypt sensitive files and databases.</li>
                    <li>Back up data to prevent loss.</li>
                    <li>Avoid public Wi-Fi for sensitive tasks.</li>
                    <li>Regularly update software for security patches.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Security is your shield—guard your data, guard your trust.”</div>
                </ol></div>` 
            },
            { 
                title: "Transparency & Accountability", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li>Document your data sources and methods.</li>
                    <li>Explain how you cleaned and analyzed data.</li>
                    <li>Share limitations and assumptions.</li>
                    <li>Be open to questions and feedback.</li>
                    <li>Transparency builds trust in your work.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Transparency is your signature—sign your work with honesty.”</div>
                </ol></div>` 
            },
            { 
                title: "Case Studies in Ethics", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li><strong>Case: Misleading Reports</strong> - Hiding data to favor a conclusion</li>
                    <li><strong>Case: Privacy Breach</strong> - Sharing customer data without consent</li>
                    <li><strong>Case: Biased Analysis</strong> - Using incomplete data to favor one group</li>
                    <li>Learn from real-world mistakes.</li>
                    <li>Always prioritize fairness and truth.</li>
                    <li>Discuss ethical dilemmas with peers or mentors.</li>
                    <li>Stay updated on ethical guidelines in your field.</li>
                    <li>Ethics are as important as technical skills.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Ethics aren’t optional—they’re the foundation of good analysis.”</div>
                </ol></div>` 
            },
            { 
                title: "Practical: Ethical Data Review", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li><strong>Task:</strong></li>
                    <li>Choose a dataset with personal or sensitive information.</li>
                    <li>Check for privacy risks (e.g., names, IDs).</li>
                    <li>Anonymize the data and document your steps.</li>
                    <li>Check for bias in the data or analysis.</li>
                    <li>Write a short report on your ethical decisions.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Ethics isn’t just rules—it’s respect for the people behind the data.”</div>
                </ol></div>` 
            },
            { 
                title: "Q&A", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li>What if I’m pressured to manipulate data? → Stand firm and explain ethics.</li>
                    <li>What if my data isn’t private? → Still check for fairness and bias.</li>
                    <li>What if I find bias? → Adjust your methods or report it.</li>
                    <li>What if I don’t know the laws? → Research or ask an expert.</li>
                    <li>What if I’m unsure? → Discuss with a mentor or peer.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Ethics is your North Star—follow it, and you’ll never lose your way.”</div>
                </ol></div>` 
            },
            { 
                title: "Key Takeaways", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li>Ethics and privacy are critical in data analysis.</li>
                    <li>Protect personal data and comply with laws.</li>
                    <li>Avoid bias and ensure transparency.</li>
                    <li>Make decisions with fairness and accountability.</li>
                    <li>You’re now ready to analyze data responsibly.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Good analysts don’t just crunch numbers—they protect trust and truth.”</div>
                </ol></div>` 
            },
            { 
                title: "Ethics Mini-Project", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li><strong>Task:</strong></li>
                    <li>Choose a dataset and analyze it for ethical risks.</li>
                    <li>Anonymize sensitive data and check for bias.</li>
                    <li>Write a 1-page report on your process and decisions.</li>
                    <li>Share with a peer or save for your portfolio.</li>
                    <li>Reflect on why ethics matter to you.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Your ethical choices define your work—make them count.”</div>
                </ol></div>` 
            }
        ]
    },
    {
        title: "Big Data & Cloud Analytics",
        slides: [
            { 
                title: "What is Big Data?", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li>Big data refers to massive datasets too large for traditional tools.</li>
                    <li>It’s characterized by volume, velocity, and variety.</li>
                    <li>Examples: Social media posts, transaction logs, IoT sensor data.</li>
                    <li>Requires specialized tools like Hadoop, Spark, or cloud platforms.</li>
                    <li>Analysts use samples or summaries for insights.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Big data is a big ocean—learn to navigate its waves for insights.”</div>
                </ol></div>` 
            },
            { 
                title: "Cloud Analytics Overview", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li>Cloud analytics uses online platforms to process and store data.</li>
                    <li>Platforms: AWS, Azure, Google Cloud, Snowflake.</li>
                    <li>Benefits: Scalability, accessibility, and collaboration.</li>
                    <li>No need for expensive local hardware.</li>
                    <li>Great for real-time dashboards and big data.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “The cloud is your data’s sky—vast, flexible, and always accessible.”</div>
                </ol></div>` 
            },
            { 
                title: "Big Data Tools", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li>Hadoop: Processes large datasets across clusters.</li>
                    <li>Spark: Fast processing for big data analytics.</li>
                    <li>BigQuery: Google’s serverless data warehouse.</li>
                    <li>Databricks: Combines Spark with cloud analytics.</li>
                    <li>You’ll focus on cloud tools for simplicity.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Big data tools are your heavy machinery—use them to move data mountains.”</div>
                </ol></div>` 
            },
            { 
                title: "Cloud Platforms for Analytics", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li><strong>Platform: AWS</strong> - Redshift for data warehousing</li>
                    <li><strong>Platform: Azure</strong> - Synapse Analytics for big data</li>
                    <li><strong>Platform: Google Cloud</strong> - BigQuery for fast queries</li>
                    <li>Sign up for free tiers to practice.</li>
                    <li>Use Power BI or Python to connect to cloud data.</li>
                    <li>Cloud platforms handle scale and speed.</li>
                    <li>Learn the basics to stay competitive.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Cloud platforms are your rocket—launch your data to new heights.”</div>
                </ol></div>` 
            },
            { 
                title: "Working with Big Data in Python", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li><pre><code>import pyspark.sql as ps<br>spark = ps.SparkSession.builder.appName('BigData').getOrCreate()<br>df = spark.read.csv("large_data.csv")</code></pre></li>
                    <li>Use PySpark for big data processing.</li>
                    <li>Load and query large datasets efficiently.</li>
                    <li>Use sampling to work with manageable chunks.</li>
                    <li>Connect to cloud platforms like BigQuery.</li>
                    <li>Python scales with big data needs.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Python with big data is like a big truck—carry heavy loads with ease.”</div>
                </ol></div>` 
            },
            { 
                title: "Real-Time Analytics", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li>Real-time analytics processes data as it arrives.</li>
                    <li>Examples: Live dashboards, fraud detection, stock tracking.</li>
                    <li>Use cloud platforms for streaming data.</li>
                    <li>Power BI supports real-time refreshes.</li>
                    <li>Critical for fast-paced industries like finance.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Real-time data is your pulse—watch it to act in the moment.”</div>
                </ol></div>` 
            },
            { 
                title: "Big Data in Kenya & Africa", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li>Mobile data drives big data growth (e.g., M-Pesa transactions).</li>
                    <li>Health: Real-time disease tracking.</li>
                    <li>Agriculture: Sensor data for crop monitoring.</li>
                    <li>Challenges: Infrastructure and connectivity gaps.</li>
                    <li>Opportunities: Cloud adoption and local innovation.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Africa’s big data is young and vibrant—tap into it to solve local problems.”</div>
                </ol></div>` 
            },
            { 
                title: "Practical: Explore Cloud Analytics", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li><strong>Task:</strong></li>
                    <li>Sign up for a free cloud platform (e.g., Google BigQuery).</li>
                    <li>Load a sample dataset and run a query.</li>
                    <li>Use Power BI or Python to visualize results.</li>
                    <li>Write a short summary of what you learned.</li>
                    <li>Save your work for your portfolio.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “The cloud is your playground—explore it to unlock big data’s potential.”</div>
                </ol></div>` 
            },
            { 
                title: "Q&A", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li>What if I can’t afford cloud services? → Use free tiers or local tools.</li>
                    <li>What if big data feels overwhelming? → Start with small samples.</li>
                    <li>What if I don’t have fast internet? → Use offline tools or smaller datasets.</li>
                    <li>What if I don’t understand Spark? → Focus on Python or Power BI first.</li>
                    <li>What if I’m stuck? → Check tutorials or ask for help.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Big data is a big step—take it one cloud at a time.”</div>
                </ol></div>` 
            },
            { 
                title: "Key Takeaways", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li>Big data handles massive, complex datasets.</li>
                    <li>Cloud analytics offers scalability and speed.</li>
                    <li>Use Python, Power BI, or cloud platforms for big data.</li>
                    <li>Africa has unique big data opportunities.</li>
                    <li>You’re now ready to explore big data tools.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Big data is your horizon—reach for it with the right tools.”</div>
                </ol></div>` 
            },
            { 
                title: "Cloud Analytics Task", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li><strong>Task:</strong></li>
                    <li>Choose a large dataset and load it into a cloud platform.</li>
                    <li>Run a simple query or analysis.</li>
                    <li>Create a visual using Power BI or Python.</li>
                    <li>Write a short summary of your process.</li>
                    <li>Save or share your work.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Your cloud project is your first flight—launch it and see how far you go.”</div>
                </ol></div>` 
            }
        ]
    },
    {
        title: "AI & Data Analytics",
        slides: [
            { 
                title: "What is AI in Analytics?", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li>AI (Artificial Intelligence) uses algorithms to find patterns in data.</li>
                    <li>It automates tasks like cleaning, prediction, and insights.</li>
                    <li>Examples: Predictive sales, customer segmentation, fraud detection.</li>
                    <li>AI doesn’t replace analysts—it enhances your work.</li>
                    <li>You’ll use AI tools to boost your analysis.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “AI is your assistant—smart, fast, but only as good as your questions.”</div>
                </ol></div>` 
            },
            { 
                title: "AI vs. Traditional Analytics", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li><strong>Aspect: Speed</strong> - AI: Fast, automated | Traditional: Manual, slower</li>
                    <li><strong>Aspect: Scale</strong> - AI: Handles big data | Traditional: Limited by tools</li>
                    <li><strong>Aspect: Complexity</strong> - AI: Finds complex patterns | Traditional: Simple trends</li>
                    <li><strong>Aspect: Human Role</strong> - AI: Supports decisions | Traditional: Drives decisions</li>
                    <li>AI complements your skills, not replaces them.</li>
                    <li>Use AI for speed, but verify with logic.</li>
                    <li>Combine both for the best results.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “AI is your engine, but you’re the driver—steer wisely.”</div>
                </ol></div>` 
            },
            { 
                title: "AI Tools for Analysts", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li>Power BI: AI visuals like Key Influencers and Q&A.</li>
                    <li>Python: Libraries like scikit-learn for predictions.</li>
                    <li>Excel: Forecast Sheet for simple predictions.</li>
                    <li>ChatGPT: Summarize data or generate insights.</li>
                    <li>Start with free or built-in tools.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “AI tools are your wings—use them to fly faster and farther.”</div>
                </ol></div>` 
            },
            { 
                title: "Machine Learning Basics", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li>Machine learning (ML) is a subset of AI for predictions.</li>
                    <li>Supervised learning: Predict outcomes with labeled data.</li>
                    <li>Unsupervised learning: Find patterns without labels.</li>
                    <li>Example: Predict sales based on past trends.</li>
                    <li>You’ll try simple ML in Python.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Machine learning is your crystal ball—use it to see patterns, not magic.”</div>
                </ol></div>` 
            },
            { 
                title: "AI for Data Cleaning", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li>AI can detect missing values, outliers, and typos.</li>
                    <li>In Python: Use libraries like pandas-ai or autoimpute.</li>
                    <li>In Power BI: Use AI to suggest fixes in Power Query.</li>
                    <li>Always review AI suggestions manually.</li>
                    <li>AI saves time but doesn’t replace judgment.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “AI cleans fast, but you check the corners—precision matters.”</div>
                </ol></div>` 
            },
            { 
                title: "AI for Visualization", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li>Power BI’s AI visuals suggest insights automatically.</li>
                    <li>Example: Key Influencers finds what drives sales.</li>
                    <li>In Python: Use AutoViz for quick chart suggestions.</li>
                    <li>Customize AI-generated visuals for clarity.</li>
                    <li>AI helps you visualize faster, but you refine the story.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “AI draws the sketch—you add the color and meaning.”</div>
                </ol></div>` 
            },
            { 
                title: "AI for Predictions", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li><pre><code>from sklearn.linear_model import LinearRegression<br>model = LinearRegression()<br>model.fit(X_train, y_train)<br>predictions = model.predict(X_test)</code></pre></li>
                    <li>Use scikit-learn for simple predictions.</li>
                    <li>Predict sales, customer churn, or trends.</li>
                    <li>Split data into training and testing sets.</li>
                    <li>Check accuracy with metrics like R-squared.</li>
                    <li>Start with simple models like linear regression.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Predictions are guesses with math—AI makes them sharper, but you make them real.”</div>
                </ol></div>` 
            },
            { 
                title: "Ethical AI Use", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li>AI can amplify bias if data is skewed.</li>
                    <li>Always check AI outputs for fairness.</li>
                    <li>Protect privacy when using AI tools.</li>
                    <li>Be transparent about AI’s role in your analysis.</li>
                    <li>Combine AI with human judgment for trust.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “AI is a tool, not a truth—use it responsibly to stay trusted.”</div>
                </ol></div>` 
            },
            { 
                title: "AI in Kenya & Africa", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li>AI is growing in agriculture, health, and finance.</li>
                    <li>Example: Predicting crop yields with satellite data.</li>
                    <li>Challenges: Limited data and infrastructure.</li>
                    <li>Opportunities: Mobile tech and local innovation.</li>
                    <li>You can use AI to solve local problems.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “AI in Africa is a seedling—nurture it to grow solutions for tomorrow.”</div>
                </ol></div>` 
            },
            { 
                title: "Practical: AI-Enhanced Analysis", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li><strong>Task:</strong></li>
                    <li>Choose a dataset and apply AI in one step (cleaning, analysis, or visualization).</li>
                    <li>Use a tool like ChatGPT, Copilot, or Python’s AI libraries.</li>
                    <li>Compare AI results with manual methods.</li>
                    <li>Write a short summary of how AI helped or what you learned.</li>
                    <li>Save your work for your portfolio or share with a peer.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “AI is a spark—your curiosity turns it into a flame.”</div>
                </ol></div>` 
            },
            { 
                title: "Q&A", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li>What if AI gives wrong results? → Review and validate manually.</li>
                    <li>What if I don’t have AI tools? → Use free versions or focus on traditional methods.</li>
                    <li>What if AI confuses me? → Start with simple tasks and learn step by step.</li>
                    <li>How do I stay ethical? → Check for bias and protect privacy.</li>
                    <li>What if I’m unsure about predictions? → Combine AI with your own judgment.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “AI is a tool—sharp, but not flawless. Use it, but trust yourself.”</div>
                </ol></div>` 
            },
            { 
                title: "Key Takeaways", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li>AI enhances data analytics by automating tasks and uncovering patterns.</li>
                    <li>Use AI tools for cleaning, visualization, and prediction.</li>
                    <li>Ethics and human judgment are critical when using AI.</li>
                    <li>AI works best with clean, reliable data.</li>
                    <li>You’re ready to explore AI in your projects.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “AI is your co-pilot—let it fly, but you steer the course.”</div>
                </ol></div>` 
            },
            { 
                title: "AI-Enhanced Analysis", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li><strong>Task:</strong></li>
                    <li>Choose a dataset and apply AI in one step (cleaning, analysis, or visualization).</li>
                    <li>Use a tool like ChatGPT, Copilot, or Python’s AI libraries.</li>
                    <li>Compare AI results with manual methods.</li>
                    <li>Write a short summary of how AI helped or what you learned.</li>
                    <li>Save your work for your portfolio or share with a peer.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “AI is a spark—your curiosity turns it into a flame.”</div>
                </ol></div>` 
            }
        ]
    },
    {
        title: "Trends & The Future of Data Analytics",
        slides: [
            { 
                title: "The Evolving Data Landscape", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li>Data analytics is growing fast, driven by technology and need.</li>
                    <li>Big data, AI, and cloud computing are reshaping the field.</li>
                    <li>Demand for analysts is rising globally and in Africa.</li>
                    <li>New tools and methods emerge every year.</li>
                    <li>Staying current means lifelong learning.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “The data world moves fast—run with it, and you’ll lead the way.”</div>
                </ol></div>` 
            },
            { 
                title: "Big Data & Cloud Analytics", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li>Big data means massive, complex datasets.</li>
                    <li>Cloud platforms like AWS, Azure, and Google Cloud handle big data.</li>
                    <li>Cloud analytics allows real-time access and collaboration.</li>
                    <li>Reduces need for expensive hardware.</li>
                    <li>Analysts must learn cloud basics for modern workflows.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “The cloud is your data’s new home—spacious, scalable, and always accessible.”</div>
                </ol></div>` 
            },
            { 
                title: "Data Science vs. Data Analytics", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li><strong>Aspect: Focus</strong> - Data Analytics: Insights from data | Data Science: Models and predictions</li>
                    <li><strong>Aspect: Tools</strong> - Data Analytics: Excel, Power BI, SQL | Data Science: Python, R, TensorFlow</li>
                    <li><strong>Aspect: Skills</strong> - Data Analytics: Visualization, reporting | Data Science: Machine learning, coding</li>
                    <li><strong>Aspect: Output</strong> - Data Analytics: Dashboards, reports | Data Science: Algorithms, forecasts</li>
                    <li>Analytics answers “what happened?”; science asks “what will happen?”</li>
                    <li>Both need clean data and critical thinking.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Analytics tells the story—science writes the sequel.”</div>
                </ol></div>` 
            },
            { 
                title: "Data Engineering Basics", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li>Data engineering builds pipelines to collect, store, and process data.</li>
                    <li>Engineers ensure data is accessible and clean for analysts.</li>
                    <li>Key tasks: ETL (Extract, Transform, Load), database design.</li>
                    <li>Tools: Apache Spark, Airflow, SQL.</li>
                    <li>Analysts and engineers work together for success.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Engineers build the roads—analysts drive the insights.”</div>
                </ol></div>` 
            },
            { 
                title: "Data Analytics in Kenya & Africa", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li>Growing demand in finance, agriculture, health, and tech.</li>
                    <li>Examples: M-Pesa analytics, agricultural yield tracking, health monitoring.</li>
                    <li>Challenges: limited infrastructure, data literacy gaps.</li>
                    <li>Opportunities: mobile data, open data, and local innovation.</li>
                    <li>Africa’s data scene is young and full of potential.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Africa’s data revolution is yours to shape—start local, think global.”</div>
                </ol></div>` 
            },
            { 
                title: "Industry Trends (Finance, Health, etc.)", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li><strong>Industry: Finance</strong> - Real-time fraud detection</li>
                    <li><strong>Industry: Healthcare</strong> - Predictive patient care</li>
                    <li><strong>Industry: Agriculture</strong> - Precision farming with IoT</li>
                    <li><strong>Industry: Retail</strong> - Personalized marketing</li>
                    <li><strong>Industry: Education</strong> - Learning analytics for performance</li>
                    <li>Data drives innovation across sectors.</li>
                    <li>Analysts bridge data and industry needs.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Trends are your map—use them to navigate the data future.”</div>
                </ol></div>` 
            },
            { 
                title: "Data Privacy & Security", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li>Protecting data is critical—laws like GDPR and Kenya’s Data Protection Act.</li>
                    <li>Anonymize sensitive information before analysis.</li>
                    <li>Use secure platforms and encryption.</li>
                    <li>Breaches can damage trust and lead to fines.</li>
                    <li>Analysts must prioritize ethics and compliance.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Data is power—handle it with care and responsibility.”</div>
                </ol></div>` 
            },
            { 
                title: "Open Data & Collaboration", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li>Open data is freely available for anyone to use (e.g., Data.gov, Kaggle).</li>
                    <li>Collaboration tools like GitHub and Power BI Service enable teamwork.</li>
                    <li>Share datasets, code, and insights to learn and innovate.</li>
                    <li>Africa has growing open data initiatives.</li>
                    <li>Collaboration builds stronger solutions.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Open data is a shared garden—plant, grow, and harvest together.”</div>
                </ol></div>` 
            },
            { 
                title: "Building a Career in Analytics", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li>Skills: Master Excel, Power BI, Python, SQL, and storytelling.</li>
                    <li>Portfolio: Showcase projects on GitHub or LinkedIn.</li>
                    <li>Network: Join data communities, attend meetups, engage online.</li>
                    <li>Certifications: Google Data Analytics, Microsoft Power BI, etc.</li>
                    <li>Keep learning to stay competitive.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Your career is a dataset—collect skills, clean your path, and visualize success.”</div>
                </ol></div>` 
            },
            { 
                title: "Practical: Research a Trend", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li><strong>Task:</strong></li>
                    <li>Choose a trend (e.g., big data, AI, cloud, privacy).</li>
                    <li>Research its impact on analytics using online sources.</li>
                    <li>Summarize findings in a 1-page report or 3 slides.</li>
                    <li>Include examples from Kenya or Africa if possible.</li>
                    <li>Share your work with a peer or mentor.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Trends are your compass—study them to find your direction.”</div>
                </ol></div>` 
            },
            { 
                title: "Q&A", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li>What if I don’t know where to start? → Pick one tool or trend and dive in.</li>
                    <li>What if I don’t have experience? → Build projects and share them.</li>
                    <li>How do I stay updated? → Follow blogs, X, and data communities.</li>
                    <li>What if I’m not in tech? → Analytics applies to every industry.</li>
                    <li>What if I’m overwhelmed? → Focus on one skill at a time.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “The future is big—start small, grow steady.”</div>
                </ol></div>` 
            },
            { 
                title: "Key Takeaways", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li>Data analytics is evolving with AI, big data, and cloud.</li>
                    <li>Africa offers unique opportunities and challenges.</li>
                    <li>Privacy, ethics, and collaboration are critical.</li>
                    <li>Build your career with skills, projects, and networking.</li>
                    <li>You’re ready to shape the future of analytics.</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “The data future is yours—learn, build, and lead with insight.”</div>
                </ol></div>` 
            },
            { 
                title: "Future-Proof Your Skills", 
                content: `<div class="ai-slide-block"><ol class='highlight-list'>
                    <li><strong>Task:</strong></li>
                    <li>Choose one trend or skill to explore further (e.g., cloud, AI, privacy).</li>
                    <li>Create a small project or research summary.</li>
                    <li>Add it to your portfolio or share it online.</li>
                    <li>Reflect on how this skill could shape your career.</li>
                    <li>Plan one action to stay updated (e.g., join a community).</li>
                    <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Your skills are your currency—invest in them to stay rich in opportunity.”</div>
                </ol></div>` 
            }
        ]
    },
    {
    title: "Capstone Project & Graduation",
    slides: [
        { 
            title: "What is a Capstone Project?", 
            content: `<div class="ai-slide-block"><ol class='highlight-list'>
                <li>A capstone project combines all your skills into one big project.</li>
                <li>You’ll ask a question, collect data, clean, analyze, visualize, and present.</li>
                <li>It showcases your ability as a data analyst.</li>
                <li>Choose a topic that excites you or solves a real problem.</li>
                <li>This is your chance to shine!</li>
                <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Your capstone is your masterpiece—build it with everything you’ve learned.”</div>
            </ol></div>` 
        },
        { 
            title: "Choosing Your Dataset", 
            content: `<div class="ai-slide-block"><ol class='highlight-list'>
                <li>Pick a dataset that’s relevant and interesting to you.</li>
                <li>Sources: Kaggle, Data.gov, local data, or company data.</li>
                <li>Ensure it has enough rows and columns for analysis.</li>
                <li>Look for data with variety (numbers, text, dates).</li>
                <li>A good dataset makes your project engaging.</li>
                <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Your dataset is your canvas—choose one that inspires your creativity.”</div>
            </ol></div>` 
        },
        { 
            title: "Defining Your Question", 
            content: `<div class="ai-slide-block"><ol class='highlight-list'>
                <li>Ask a clear, specific question your data can answer.</li>
                <li>Example: “What drives sales in Nairobi supermarkets?”</li>
                <li>Break it into smaller questions for analysis.</li>
                <li>Ensure the question aligns with your dataset.</li>
                <li>A good question guides your entire project.</li>
                <hr><div class="activity-block"><strong>Food for the Mind:</strong> “A question is your North Star—let it guide every step you take.”</div>
            </ol></div>` 
        },
        { 
            title: "Planning Your Workflow", 
            content: `<div class="ai-slide-block"><ol class='highlight-list'>
                <li>Follow the analytics cycle: Ask, Acquire, Clean, Explore, Visualize, Present.</li>
                <li>List tools you’ll use (Excel, Power BI, Python, SQL).</li>
                <li>Plan your visuals and key insights.</li>
                <li>Set milestones: cleaning done by day 2, visuals by day 4, etc.</li>
                <li>Stay organized to avoid stress.</li>
                <hr><div class="activity-block"><strong>Food for the Mind:</strong> “A plan is your roadmap—follow it, but enjoy the detours.”</div>
            </ol></div>` 
        },
        { 
            title: "Tools You Can Use", 
            content: `<div class="ai-slide-block"><ol class='highlight-list'>
                <li><strong>Tool: Excel</strong> - Cleaning, basic analysis, quick charts</li>
                <li><strong>Tool: Power BI</strong> - Interactive dashboards, storytelling</li>
                <li><strong>Tool: Python</strong> - Advanced cleaning, analysis, visuals</li>
                <li><strong>Tool: SQL</strong> - Querying large datasets, joins</li>
                <li>Choose tools based on your strengths and project needs.</li>
                <li>Combine tools for maximum impact.</li>
                <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Your tools are your brushes—use them to paint a vivid picture.”</div>
            </ol></div>` 
        },
        { 
            title: "Presenting Your Capstone", 
            content: `<div class="ai-slide-block"><ol class='highlight-list'>
                <li>Create a 5–7 slide presentation or a dashboard.</li>
                <li>Include your question, key findings, visuals, and recommendations.</li>
                <li>Tell a story: problem, evidence, solution.</li>
                <li>Practice your presentation for clarity and confidence.</li>
                <li>Be ready to answer questions.</li>
                <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Your presentation is your stage—own it with pride and clarity.”</div>
            </ol></div>` 
        },
        { 
            title: "Peer Review & Feedback", 
            content: `<div class="ai-slide-block"><ol class='highlight-list'>
                <li>Share your project with peers or mentors.</li>
                <li>Ask for feedback on clarity, visuals, and insights.</li>
                <li>Be open to suggestions and improvements.</li>
                <li>Give constructive feedback to others.</li>
                <li>Feedback helps polish your work.</li>
                <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Feedback is growth—listen, learn, and level up.”</div>
            </ol></div>` 
        },
        { 
            title: "Graduation & Certification", 
            content: `<div class="ai-slide-block"><ol class='highlight-list'>
                <li>Congratulations! You’ve completed the course.</li>
                <li>Your capstone project earns you a certificate.</li>
                <li>Share your achievement on LinkedIn or with employers.</li>
                <li>Celebrate your hard work and new skills.</li>
                <li>This is just the start of your data journey!</li>
                <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Graduation isn’t the end—it’s the launch of your data career.”</div>
            </ol></div>` 
        },
        { 
            title: "Next Steps in Your Journey", 
            content: `<div class="ai-slide-block"><ol class='highlight-list'>
                <li>Build more projects to grow your portfolio.</li>
                <li>Join data communities on X, LinkedIn, or local meetups.</li>
                <li>Explore advanced topics like machine learning or cloud analytics.</li>
                <li>Apply for internships or entry-level analyst roles.</li>
                <li>Keep learning and stay curious.</li>
                <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Your journey doesn’t stop—every step builds a stronger analyst.”</div>
            </ol></div>` 
        },
        { 
            title: "Practical: Complete Your Capstone", 
            content: `<div class="ai-slide-block"><ol class='highlight-list'>
                <li><strong>Task:</strong></li>
                <li>Choose a dataset and define a question.</li>
                <li>Follow the analytics cycle to analyze and visualize.</li>
                <li>Create a dashboard or presentation with your findings.</li>
                <li>Present to peers or mentors and collect feedback.</li>
                <li>Finalize your project for your portfolio.</li>
                <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Your capstone is your legacy—build it to last, share it to shine.”</div>
            </ol></div>` 
        },
        { 
            title: "Q&A", 
            content: `<div class="ai-slide-block"><ol class='highlight-list'>
                <li>What if my dataset is too big? → Filter or sample it.</li>
                <li>What if I don’t know what to ask? → Start with simple trends or comparisons.</li>
                <li>What if my visuals aren’t clear? → Simplify and get feedback.</li>
                <li>What if I’m nervous about presenting? → Practice with peers first.</li>
                <li>What’s next after this? → Keep building and learning.</li>
                <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Every question is progress—ask, act, and achieve.”</div>
            </ol></div>` 
        },
        { 
            title: "Key Takeaways", 
            content: `<div class="ai-slide-block"><ol class='highlight-list'>
                <li>Your capstone combines all your skills into one project.</li>
                <li>Choose a dataset and question that excite you.</li>
                <li>Use Excel, Power BI, Python, or SQL to create impact.</li>
                <li>Present your work with clarity and confidence.</li>
                <li>You’re now a data analyst—ready for the real world!</li>
                <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Your capstone is your crown—wear it with pride.”</div>
            </ol></div>` 
        },
        { 
            title: "Final Reflect & Share", 
            content: `<div class="ai-slide-block"><ol class='highlight-list'>
                <li>Reflect on your capstone project and what you learned.</li>
                <li>Share your project on LinkedIn, GitHub, or with peers.</li>
                <li>Discuss challenges and how you overcame them.</li>
                <li>Celebrate your growth as a data analyst.</li>
                <li>Plan one action to continue your data journey.</li>
                <hr><div class="activity-block"><strong>Food for the Mind:</strong> “Your capstone is your first step—reflect, share, and keep climbing.”</div>
            </ol></div>` 
        }
        ]
    }
];
const welcomeSlide = {
    title: "Welcome to Tujengane Analyst Pro",
    content: `
    <div class="welcome-block" style="padding:1.2rem 0.5rem 1rem 0.5rem; text-align:center; max-width: 98vw; min-height: 0;">
        <div style="font-size:1rem; color:#333; margin-bottom:1rem;">
            Welcome to our 13-week digital skills course by <strong>EXES BI</strong>!<br>
            <span style="color:#256d4f; font-weight:600;">Choose your next step below or use the sidebar to explore modules.</span>
        </div>
        <div class="welcome-links" style="display:flex; flex-wrap:wrap; justify-content:center; gap:0.7rem; margin-bottom:1.2rem;">
            <a href="../Tujengane Analyst Pro/analystpro.html" class="welcome-card" style="background:#facc15; color:#1e293b; border-radius:0.7rem; padding:1rem 1.2rem; font-weight:700; font-size:0.98rem; box-shadow:0 2px 8px rgba(0,0,0,0.08); text-decoration:none; transition:transform 0.2s; display:flex; flex-direction:column; align-items:center; min-width:120px;">
                <i class="fas fa-chart-bar" style="font-size:1.2rem; margin-bottom:0.3rem;"></i>
                For Aspiring Data Analysts<br><span style="font-weight:400; font-size:0.9rem;">Go to Analyst Pro</span>
            </a>
            <a href="../Tujengane data basics/databasics.html" class="welcome-card" style="background:#49A078; color:#fff; border-radius:0.7rem; padding:1rem 1.2rem; font-weight:700; font-size:0.98rem; box-shadow:0 2px 8px rgba(0,0,0,0.08); text-decoration:none; transition:transform 0.2s; display:flex; flex-direction:column; align-items:center; min-width:120px;">
                <i class="fas fa-database" style="font-size:1.2rem; margin-bottom:0.3rem;"></i>
                For Beginner Analysts<br><span style="font-weight:400; font-size:0.9rem;">Go to Data Basics</span>
            </a>
            <a href="https://exesbi.netlify.app/" target="_blank" class="welcome-card" style="background:#256d4f; color:#fff; border-radius:0.7rem; padding:1rem 1.2rem; font-weight:700; font-size:0.98rem; box-shadow:0 2px 8px rgba(0,0,0,0.08); text-decoration:none; transition:transform 0.2s; display:flex; flex-direction:column; align-items:center; min-width:120px;">
                <i class="fas fa-rocket" style="font-size:1.2rem; margin-bottom:0.3rem;"></i>
                For Professional Analysis<br><span style="font-weight:400; font-size:0.9rem;">Visit EXES BI</span>
            </a>
        </div>
        <div style="font-size:0.93rem; color:#666; margin-bottom:0.7rem;">
            <strong>Instructions:</strong> Use the sidebar to select a module and start your journey. Each module contains step-by-step lessons and practical activities.<br>
            <span style="color:#256d4f;">Ready to grow your digital skills? Start now!</span>
        </div>
        <div style="font-size:0.9rem; color:#888; margin-top:0.5rem;">
            <em>EXES BI – Empowering your future with practical digital skills.</em>
        </div>
    </div>
    `
};

let currentModule = null;
let currentSlide = 0;
let isSidebarOpen = false;

const slideContainer = document.getElementById('slide-container');
const currentSlideDisplay = document.getElementById('current-slide');
const totalSlidesDisplay = document.getElementById('total-slides');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const hamburgerBtn = document.getElementById('hamburger-btn');
const sidebar = document.querySelector('.sidebar');
const navLinks = document.getElementById('nav-links');

function updateSlide(moduleIndex, slideIndex) {
    const slide = moduleIndex !== null ? modules[moduleIndex].slides[slideIndex] : welcomeSlide;
    slideContainer.innerHTML = `
        <div class="slide-content">
            <h2>${slide.title}</h2>
            ${slide.content}
        </div>
    `;
    slideContainer.classList.add('active');

    if (moduleIndex !== null) {
        currentSlideDisplay.textContent = slideIndex + 1;
        totalSlidesDisplay.textContent = modules[moduleIndex].slides.length;
        prevBtn.disabled = slideIndex === 0;
        nextBtn.disabled = slideIndex === modules[moduleIndex].slides.length - 1 && moduleIndex === modules.length - 1;
        document.querySelector('.navigation').classList.remove('hidden');
        document.getElementById('slide-number-display').classList.remove('hidden');
        document.getElementById('slide-number-display').textContent = `${modules[moduleIndex].title} - Slide ${slideIndex + 1} of ${modules[moduleIndex].slides.length}`;
    } else {
        currentSlideDisplay.textContent = 0;
        totalSlidesDisplay.textContent = 0;
        prevBtn.disabled = true;
        nextBtn.disabled = true;
        document.querySelector('.navigation').classList.add('hidden');
        document.getElementById('slide-number-display').classList.add('hidden');
    }

    document.querySelectorAll('.sidebar-link').forEach(link => {
        link.classList.remove('active');
        link.parentElement.classList.remove('active');
    });
    if (moduleIndex !== null) {
        const activeLink = document.querySelector(`.sidebar-link[data-module="${moduleIndex}"][data-slide="${slideIndex}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
            activeLink.parentElement.classList.add('active');
        }
    }
}

function toggleModule(moduleIndex) {
    const moduleToggles = document.querySelectorAll('.module-toggle');
    const moduleSlides = document.querySelectorAll('.module-slides');

    moduleToggles.forEach((toggle, index) => {
        if (index === moduleIndex) {
            toggle.classList.toggle('collapsed');
            moduleSlides[index].classList.toggle('open', !toggle.classList.contains('collapsed'));
            toggle.classList.remove('hidden');
        } else {
            toggle.classList.add('hidden');
            moduleSlides[index].classList.remove('open');
        }
    });

    if (moduleIndex !== null && moduleToggles[moduleIndex].classList.contains('collapsed')) {
        currentModule = null;
        currentSlide = 0;
        updateSlide(null, 0);
        moduleToggles.forEach(toggle => toggle.classList.remove('hidden'));
    } else if (moduleIndex !== null) {
        currentModule = moduleIndex;
        currentSlide = 0;
        updateSlide(moduleIndex, 0);
    }
}

function handlePrev() {
    if (currentModule !== null && currentSlide > 0) {
        currentSlide--;
        updateSlide(currentModule, currentSlide);
    }
}

function handleNext() {
    if (currentModule !== null) {
        if (currentSlide < modules[currentModule].slides.length - 1) {
            currentSlide++;
            updateSlide(currentModule, currentSlide);
        } else if (currentModule < modules.length - 1) {
            currentModule++;
            currentSlide = 0;
            toggleModule(currentModule);
            updateSlide(currentModule, 0);
        }
    }
}

document.querySelectorAll('.module-toggle').forEach((toggle, index) => {
    toggle.addEventListener('click', () => toggleModule(index));
    toggle.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleModule(index);
        }
    });
});

document.querySelectorAll('.sidebar-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const moduleIndex = parseInt(link.dataset.module);
        const slideIndex = parseInt(link.dataset.slide);
        currentModule = moduleIndex;
        currentSlide = slideIndex;
        updateSlide(moduleIndex, slideIndex);
    });
});

prevBtn.addEventListener('click', handlePrev);
nextBtn.addEventListener('click', handleNext);

hamburgerBtn.addEventListener('click', () => {
    isSidebarOpen = !isSidebarOpen;
    sidebar.classList.toggle('active', isSidebarOpen);
});

document.addEventListener('click', (e) => {
    if (isSidebarOpen && !sidebar.contains(e.target) && !hamburgerBtn.contains(e.target)) {
        isSidebarOpen = false;
        sidebar.classList.remove('active');
    }
});

function toggleChat() {
    const chatWidget = document.getElementById('chatWidget');
    const chatOverlay = document.getElementById('chatOverlay');
    chatWidget.classList.toggle('hidden');
    chatOverlay.classList.toggle('hidden');
}

function openModal(modalId) {
    document.getElementById(modalId).classList.remove('hidden');
    document.getElementById('chatOverlay').classList.remove('hidden');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.add('hidden');
    document.getElementById('chatOverlay').classList.add('hidden');
}

// Show welcome only if no module is open at start
if (currentModule === null && currentSlide === 0) {
    updateSlide(null, 0);
}

function checkOrientation() {
    const isLandscape = window.innerWidth > window.innerHeight;
    const slideContainerWrapper = document.querySelector('.slide-container-wrapper');
    const chatButton = document.getElementById('chatButton');
    const chatWidget = document.getElementById('chatWidget');
    const navigation = document.querySelector('.navigation');
    const footer = document.querySelector('.footer');
    const layout = document.querySelector('.layout');

    if (isLandscape && window.innerWidth <= 768) {
        slideContainerWrapper.style.paddingBottom = '250px';
        chatButton.style.bottom = '120px';
        chatButton.style.zIndex = '60';
        chatWidget.style.bottom = '140px';
        chatWidget.style.zIndex = '60';
        navigation.style.bottom = '0';
        navigation.style.zIndex = '50';
        footer.style.position = 'relative';
        layout.style.marginBottom = '0';
    } else if (isLandscape && window.innerWidth <= 480) {
        slideContainerWrapper.style.paddingBottom = '200px';
        chatButton.style.bottom = '100px';
        chatButton.style.zIndex = '60';
        chatWidget.style.bottom = '120px';
        chatWidget.style.zIndex = '60';
        navigation.style.bottom = '0';
        navigation.style.zIndex = '50';
        footer.style.position = 'relative';
        layout.style.marginBottom = '0';
    } else {
        // Reset to default
        slideContainerWrapper.style.paddingBottom = '';
        chatButton.style.bottom = '';
        chatButton.style.zIndex = '';
        chatWidget.style.bottom = '';
        chatWidget.style.zIndex = '';
        navigation.style.bottom = '';
        navigation.style.zIndex = '';
        footer.style.position = '';
        layout.style.marginBottom = '';
    }
}

// Call on load and resize
checkOrientation();
window.addEventListener('resize', checkOrientation);