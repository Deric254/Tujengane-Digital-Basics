const modules = [
    {
        title: "Introduction & The Data Analyst Mindset",
        slides: [
            { title: "Welcome & What to Expect", content: `<div class="ai-slide-block"><ol class='highlight-list'>
                <li><strong>Karibu!</strong> Welcome to <strong>Tujengane Analyst Pro</strong> – your practical journey to becoming a data analyst.</li>
                <li><strong>What to Expect:</strong> You’ll learn to collect, clean, analyze, and present data using tools like Excel, Power BI, Python, and SQL.</li>
                <li><strong>Why Data?</strong> Data is everywhere: mobile money, supermarket sales, SACCO records, county budgets, and more.</li>
                <li><strong>Goal:</strong> By the end, you’ll confidently solve real-world problems with data and make better decisions for your business, job, or community.</li>
                <li><strong>Local Relevance:</strong> All examples and exercises are based on Kenyan and East African realities.</li>
                <hr><div class="activity-block"><strong>Activity:</strong> Share one way you’ve seen data used in your daily life (e.g., M-Pesa SMS, shop receipts, school marks).</div>
            </ol></div>` },
            { title: "Who is a Data Analyst?", content: `<div class="ai-slide-block"><ol class='highlight-list'>
                <li><strong>Definition:</strong> A data analyst turns raw numbers into useful answers.</li>
                <li><strong>Purpose:</strong> Help people and businesses make better decisions.</li>
                <li><strong>Example:</strong> Shop sales data shows sugar sells most on Fridays—so order more for weekends.</li>
                <hr><div class="activity-block"><strong>Activity:</strong> Name one place you’ve seen someone use numbers to make a decision (e.g., market, school, home).</div>
            </ol></div>` },
            { title: "The Data Analytics Cycle", content: `<div class="ai-slide-block"><ol class='highlight-list'>
                <li><strong>1. Collect:</strong> Get the data you need.</li>
                <li><strong>2. Clean:</strong> Fix mistakes and remove errors.</li>
                <li><strong>3. Explore:</strong> Look for patterns or trends.</li>
                <li><strong>4. Share:</strong> Present your findings simply.</li>
                <li><strong>5. Act:</strong> Use the results to make decisions.</li>
                <hr><div class="activity-block"><strong>Activity:</strong> In pairs, list steps you’d take to check if your shop is making a profit.</div>
            </ol></div>` },
            { title: "Real-World Impact of Data", content: `<div class="ai-slide-block"><ol class='highlight-list'>
                <li><strong>Shops:</strong> Track sales to know what to restock.</li>
                <li><strong>Farming:</strong> Use records to plan milk or crop deliveries.</li>
                <li><strong>Finance:</strong> Banks use data to check loan repayment.</li>
                <li><strong>County:</strong> Data helps spot fraud in projects.</li>
                <hr><div class="activity-block"><strong>Activity:</strong> Name one way data is used in your area (e.g., school, business, hospital).</div>
            </ol></div>` },
            { title: "Key Skills for Analysts", content: `<div class="ai-slide-block"><ol class='highlight-list'>
                <li><strong>Collect & Clean:</strong> Make sure your data is correct.</li>
                <li><strong>Think:</strong> Ask good questions before you analyze.</li>
                <li><strong>Explain:</strong> Share results in a simple way.</li>
                <li><strong>Use Tools:</strong> Excel, Power BI, Python, SQL.</li>
                <hr><div class="activity-block"><strong>Tip:</strong> Tools make you fast. Good thinking makes you valuable.</div>
            </ol></div>` },
            { title: "Overview of Tools: Excel, Power BI, Python, SQL", content: `<div class="ai-slide-block"><ol class='highlight-list'>
                <li><strong>Excel:</strong> Quick calculations and small reports.</li>
                <li><strong>Power BI:</strong> Build interactive dashboards.</li>
                <li><strong>Python:</strong> Automate tasks and handle big data.</li>
                <li><strong>SQL:</strong> Store and manage structured data.</li>
                <hr><div class="activity-block"><strong>Activity:</strong> Which tool do you want to try first? Why?</div>
            </ol></div>` },
            { title: "Setting Up Your Workspace", content: `<div class="ai-slide-block"><ol class='highlight-list'>
                <li>Install Excel or use Google Sheets.</li>
                <li>Download Power BI Desktop (free).</li>
                <li>Install Python (Anaconda is easiest).</li>
                <li>Set up MySQL (local or cloud).</li>
                <hr><div class="activity-block"><strong>Tip:</strong> These tools work together for a full data workflow.</div>
            </ol></div>` },
            { title: "Data-Driven Thinking", content: `<div class="ai-slide-block"><ol class='highlight-list'>
                <li><strong>1. Problem:</strong> What needs fixing?</li>
                <li><strong>2. Data:</strong> What do the numbers say?</li>
                <li><strong>3. Action:</strong> What can you do?</li>
                <li><strong>Example:</strong> Delayed payments? Data shows handwritten records cause delays. Solution: Go digital for faster pay.</li>
                <hr><div class="activity-block"><strong>Activity:</strong> Think of a problem you could solve with data at home or work.</div>
            </ol></div>` },
            { title: "Growth Mindset for Analysts", content: `<div class="ai-slide-block"><ol class='highlight-list'>
                <li>Be curious—always ask why.</li>
                <li>Don’t fear mistakes—learn from them.</li>
                <li>Practice often—skills grow with use.</li>
                <li>Share your findings with others.</li>
                <hr><div class="activity-block"><strong>Tip:</strong> Every analyst started as a beginner. Keep going!</div>
            </ol></div>` },
            { title: "Practical: Your First Data Question", content: `<div class="ai-slide-block"><ol class='highlight-list'>
                <li><strong>Dataset:</strong> Date, Item, Quantity, Price (e.g., 2025-09-01, Sugar, 10, 120)</li>
                <li>Open in Excel or Google Sheets.</li>
                <li>Count how many sugar sales happened.</li>
                <li>Add a column: Revenue = Quantity × Price.</li>
                <li>Find total revenue using SUM.</li>
                <hr><div class="activity-block"><strong>Activity:</strong> Try these steps and share your total revenue.</div>
            </ol></div>` },
            { title: "Q&A", content: `<div class="ai-slide-block"><ol class='highlight-list'>
                <li>Which part of today’s lesson was most relatable?</li>
                <li>Where do you see data being used around you?</li>
                <li>Which tool are you most excited to learn?</li>
            </ol></div>` },
            { title: "Key Takeaways", content: `<div class="ai-slide-block"><ol class='highlight-list'>
                <li>Data analysts turn numbers into solutions.</li>
                <li>Follow the cycle: Collect → Clean → Explore → Share → Act.</li>
                <li>Tools help, but your thinking matters most.</li>
                <li>Data is useful everywhere—shops, farms, offices.</li>
            </ol></div>` },
            { title: "Challenge: Why Data Matters", content: `<div class="ai-slide-block"><ol class='highlight-list'>
                <li>Pick one area in your life where data is used (e.g., farming, shop, school).</li>
                <li>Describe a problem and how data could help solve it.</li>
                <li>Write your answer to share next time.</li>
                <hr><div class="activity-block"><strong>Example:</strong> Milk spoils before pickup. Solution: Record times and plan better routes.</div>
            </ol></div>` }
        ]
    },
    {
        title: "Data Acquisition",
        slides: [
            { title: "What is Data Acquisition?", content: `<div class="ai-slide-block"><ol class='highlight-list'>
                <li><strong>Data acquisition</strong> means collecting information from different places.</li>
                <li>Good data = good analysis. Bad data = wrong answers!</li>
                <ul>
                    <li>Sales records</li>
                    <li>Survey results</li>
                    <li>Website visits</li>
                    <li>Weather data</li>
                </ul>
                <hr><div class="activity-block"><strong>Activity:</strong> List two places you could collect data in your community.</div>
            </ol></div>` },
            { title: "Types of Data (Structured, Unstructured)", content: `<div class="ai-slide-block"><ol class='highlight-list'>
                <li><strong>Structured data:</strong> Neatly organized in tables (Excel, databases).</li>
                <li><strong>Unstructured data:</strong> Messy—text, photos, audio, social media.</li>
                <ul>
                    <li>Most analysis starts with structured data.</li>
                </ul>
                <hr><div class="activity-block"><strong>Activity:</strong> Name one example of each type from your life.</div>
            </ol></div>` },
            { title: "Finding Data Sources (Local & Global)", content: `<div class="ai-slide-block"><ol class='highlight-list'>
                <li><strong>Local sources:</strong>
                    <ul>
                        <li>Shop records</li>
                        <li>School marks</li>
                        <li>SACCO statements</li>
                    </ul>
                </li>
                <li><strong>Global sources:</strong>
                    <ul>
                        <li>Kenya Open Data</li>
                        <li>World Bank</li>
                        <li>Kaggle</li>
                    </ul>
                </li>
                <li>Always check if data is reliable and current.</li>
                <hr><div class="activity-block"><strong>Activity:</strong> Where would you look for data about your area?</div>
            </ol></div>` },
            { title: "Collecting Data with Excel & Power BI", content: `<div class="ai-slide-block"><ol class='highlight-list'>
                <li>Type data in by hand (manual entry).</li>
                <li>Import files (CSV, Excel, web data).</li>
                <li>Connect to online sources (Google Sheets, APIs).</li>
                <hr><div class="activity-block"><strong>Activity:</strong> Try importing a small CSV file into Excel or Power BI.</div>
            </ol></div>` },
            { title: "Web Data & APIs (Intro to Python)", content: `<div class="ai-slide-block"><ol class='highlight-list'>
                <li>Web scraping: Download data from websites (with permission).</li>
                <li>APIs: Get data automatically from online services.</li>
                <li>Python is great for both tasks.</li>
                <hr><div class="activity-block"><strong>Tip:</strong> Always ask before scraping a website!</div>
            </ol></div>` },
            { title: "Importing Data into Excel", content: `<div class="ai-slide-block"><ol class='highlight-list'>
                <li>Open Excel.</li>
                <li>Go to the “Data” tab and click “Get Data.”</li>
                <li>Select your source (CSV, web, database).</li>
                <li>Follow the steps to load your data.</li>
                <hr><div class="activity-block"><strong>Activity:</strong> Import a CSV file into Excel and view the data.</div>
            </ol></div>` },
            { title: "Importing Data into Power BI", content: `<div class="ai-slide-block"><ol class='highlight-list'>
                <li>Open Power BI Desktop.</li>
                <li>Click “Get Data.”</li>
                <li>Pick your source (Excel, web, SQL, etc.).</li>
                <li>Load and view your data in Power BI.</li>
                <hr><div class="activity-block"><strong>Activity:</strong> Try loading a sample Excel file into Power BI.</div>
            </ol></div>` },
            { title: "Importing Data into Python (pandas)", content: `<div class="ai-slide-block"><ol class='highlight-list'>
                <li>Install Python and pandas.</li>
                <li>Save your data as a CSV file.</li>
                <li>Use this code in Jupyter Notebook:</li>
            </ol>
            <ul>
                <li><code>import pandas as pd</code></li>
                <li><code>df = pd.read_csv('yourfile.csv')</code></li>
                <li><code>df.head()</code></li>
            </ul>
            <div class="activity-block"><strong>Activity:</strong> Try loading a CSV file in Jupyter Notebook.</div>
            </div>` },
            { title: "Importing Data into SQL", content: `<div class="ai-slide-block"><ol class='highlight-list'>
                <li>Open your SQL tool (e.g., MySQL Workbench).</li>
                <li>Create a table for your data.</li>
                <li>Import data or use <code>INSERT</code> to add rows.</li>
                <hr><div class="activity-block"><strong>Activity:</strong> Add a few rows to a table in SQL.</div>
            </ol></div>` },
            { title: "Practical: Download & Import a Dataset", content: `<div class="ai-slide-block"><ol class='highlight-list'>
                <li>Find a free dataset (Kenya Open Data, Kaggle, etc.).</li>
                <li>Download as CSV.</li>
                <li>Import into Excel, Power BI, Python, or SQL.</li>
                <hr><div class="activity-block"><strong>Activity:</strong> Share what data you imported and which tool you used.</div>
            </ol></div>` },
            { title: "Q&A", content: `<div class="ai-slide-block"><ul class='highlight-list'>
                <li>What was the easiest tool to import data with?</li>
                <li>What challenges did you face?</li>
                <li>Where else can you find useful data?</li>
            </ul></div>` },
            { title: "Key Takeaways", content: `<div class="ai-slide-block"><ul class='highlight-list'>
                <li>Data acquisition is the first step in analysis.</li>
                <li>Use reliable, up-to-date sources.</li>
                <li>Practice importing data into all your tools.</li>
            </ul></div>` },
            { title: "Challenge: Find & Import Data", content: `<div class="ai-slide-block"><ol class='highlight-list'>
                <li>Find a dataset about something you care about (e.g., business, school, weather).</li>
                <li>Import it into Excel, Power BI, Python, or SQL.</li>
                <li>Be ready to share your experience next time.</li>
                <hr><div class="activity-block"><strong>Tip:</strong> Pick something that interests you for more fun!</div>
            </ol></div>` }
        ]
    },
    {
        title: "Data Cleaning and Preparation",
        slides: [
            { title: "What is Data Cleaning?", content: `<div class="ai-slide-block"><ol class='highlight-list'>
                <li>Data cleaning means fixing or removing wrong or missing data.</li>
                <li>Why? Dirty data = wrong answers!</li>
                <ul>
                    <li>Correct spelling mistakes</li>
                    <li>Fill in missing values</li>
                </ul>
                <hr><div class="activity-block"><strong>Activity:</strong> Find one error in a sample dataset and fix it.</div>
            </ol></div>` },
            { title: "Common Data Issues", content: `<div class="ai-slide-block"><ol class='highlight-list'>
                <li>Missing values (blanks)</li>
                <li>Duplicates (same record twice)</li>
                <li>Inconsistencies (e.g., kg vs. pounds)</li>
                <li>Outliers (very high or low numbers)</li>
                <hr><div class="activity-block"><strong>Activity:</strong> Spot one issue in a real or sample dataset.</div>
            </ol></div>` },
            { title: "Data Cleaning in Excel", content: `<div class="ai-slide-block"><ol class='highlight-list'>
                <li>Use TRIM, CLEAN, SUBSTITUTE to fix text.</li>
                <li>Remove duplicates (Data tab → Remove Duplicates).</li>
                <li>Split data (Text to Columns).</li>
                <hr><div class="activity-block"><strong>Activity:</strong> Try removing duplicates in Excel.</div>
            </ol></div>` },
            { title: "Data Cleaning in Power BI", content: `<div class="ai-slide-block"><ol class='highlight-list'>
                <li>Open Power Query Editor to clean data.</li>
                <li>Remove extra rows or columns.</li>
                <li>Fill down/up to fix missing values.</li>
                <hr><div class="activity-block"><strong>Activity:</strong> Remove a column in Power BI and see the result.</div>
            </ol></div>` },
            { title: "Data Cleaning in Python (pandas)", content: `<div class="ai-slide-block"><ol class='highlight-list'>
                <li>Remove missing values: <code>df.dropna()</code></li>
                <li>Fill blanks: <code>df.fillna(value)</code></li>
                <li>Remove duplicates: <code>df.drop_duplicates()</code></li>
                <hr><div class="activity-block"><strong>Activity:</strong> Try <code>df.dropna()</code> on a small dataset in Jupyter.</div>
            </ol></div>` },
            { title: "Data Cleaning in SQL", content: `<div class="ai-slide-block"><ol class='highlight-list'>
                <li>Remove rows: <code>DELETE</code></li>
                <li>Change values: <code>UPDATE</code></li>
                <li>Target specific data: <code>WHERE</code> (e.g., age IS NULL)</li>
                <li>Edit columns: <code>ALTER TABLE</code></li>
                <hr><div class="activity-block"><strong>Activity:</strong> Write a simple <code>DELETE</code> or <code>UPDATE</code> query.</div>
            </ol></div>` },
            { title: "Practical: Clean a Sample Dataset", content: `<div class="ai-slide-block"><ol class='highlight-list'>
                <li>Download a sample dataset with issues (e.g., from Kaggle).</li>
                <li>Clean it using Excel, Power BI, Python, or SQL.</li>
                <li>Share before and after examples of your data.</li>
                <hr><div class="activity-block"><strong>Activity:</strong> Show your cleaned data to a friend or classmate.</div>
            </ol></div>` },
            { title: "Q&A", content: `<div class="ai-slide-block"><ul class='highlight-list'>
                <li>What was the most challenging part of data cleaning?</li>
                <li>Which tool did you find easiest for cleaning data?</li>
                <li>What will you do if you encounter dirty data in real life?</li>
            </ul></div>` },
            { title: "Key Takeaways", content: `<div class="ai-slide-block"><ul class='highlight-list'>
                <li>Clean data = correct answers.</li>
                <li>Use the right tool for the job.</li>
                <li>Practice makes you better.</li>
            </ul></div>` },
            { title: "Challenge: Clean Your Own Data", content: `<div class="ai-slide-block"><ol class='highlight-list'>
                <li>Take a dataset you’ve used before.</li>
                <li>Find and fix at least three data issues.</li>
                <li>Be ready to discuss your process and solutions.</li>
                <hr><div class="activity-block"><strong>Tip:</strong> Even small fixes can make a big difference!</div>
            </ol></div>` }
        ]
    },
    {
        title: "Data Analysis and Visualization",
        slides: [
            { title: "What is Data Analysis?", content: `<div class="ai-slide-block"><ol class='highlight-list'>
                <li>Data analysis means looking at data to find useful answers.</li>
                <li>It helps you make better decisions.</li>
                <ul>
                    <li>Example: Check sales to see which product sells best.</li>
                </ul>
                <hr><div class="activity-block"><strong>Activity:</strong> Think of a question you could answer with data.</div>
            </ol></div>` },
            { title: "Data Analysis Process", content: `<div class="ai-slide-block"><ol class='highlight-list'>
                <li>1. Define your question (What do you want to know?)</li>
                <li>2. Prepare your data (Clean and organize it)</li>
                <li>3. Analyze (Look for patterns or answers)</li>
                <li>4. Interpret (What do the results mean?)</li>
                <li>5. Share (Explain your findings simply)</li>
                <hr><div class="activity-block"><strong>Activity:</strong> Write down a simple analysis process for a real-life problem.</div>
            </ol></div>` },
            { title: "Introduction to Data Visualization", content: `<div class="ai-slide-block"><ol class='highlight-list'>
                <li>Data visualization means showing data as charts or graphs.</li>
                <li>It makes complex data easy to understand.</li>
                <ul>
                    <li>Good visuals are clear and accurate.</li>
                </ul>
                <hr><div class="activity-block"><strong>Activity:</strong> Draw a simple bar chart for your weekly spending.</div>
            </ol></div>` },
            { title: "Choosing the Right Chart", content: `<div class="ai-slide-block"><ol class='highlight-list'>
                <li>Bar Chart: Compare quantities (e.g., sales by product)</li>
                <li>Line Chart: Show trends over time (e.g., monthly sales)</li>
                <li>Pie Chart: Show parts of a whole (e.g., market share)</li>
                <li>Scatter Plot: Show relationships (e.g., price vs. sales)</li>
                <hr><div class="activity-block"><strong>Activity:</strong> Pick a chart type for your own data example.</div>
            </ol></div>` },
            { title: "Data Visualization in Excel", content: `<div class="ai-slide-block"><ol class='highlight-list'>
                <li>Select your data and click “Insert Chart.”</li>
                <li>Pick the best chart for your data.</li>
                <li>Customize with Chart Tools.</li>
                <hr><div class="activity-block"><strong>Activity:</strong> Create a chart in Excel using your own data.</div>
            </ol></div>` },
            { title: "Data Visualization in Power BI", content: `<div class="ai-slide-block"><ol class='highlight-list'>
                <li>Load your data into Power BI.</li>
                <li>Drag fields onto the canvas to create visuals.</li>
                <li>Change chart types in the Visualizations pane.</li>
                <hr><div class="activity-block"><strong>Activity:</strong> Build a simple dashboard in Power BI.</div>
            </ol></div>` },
            { title: "Data Visualization in Python (matplotlib, seaborn)", content: `<div class="ai-slide-block"><ol class='highlight-list'>
                <li>Install matplotlib and seaborn.</li>
                <li>Use <code>plt.plot()</code> for lines, <code>sns.barplot()</code> for bars.</li>
                <li>Add titles, labels, and colors.</li>
                <hr><div class="activity-block"><strong>Activity:</strong> Plot a simple chart in Jupyter Notebook.</div>
            </ol></div>` },
            { title: "Data Visualization in SQL (using CASE statements)", content: `<div class="ai-slide-block"><ol class='highlight-list'>
                <li>Use CASE to group or label data.</li>
                <li>Example: <code>SELECT product, sales, CASE WHEN sales &gt; 100 THEN 'High' ELSE 'Low' END AS sales_category FROM sales_data;</code></li>
                <li>Helps make reports easier to read.</li>
                <hr><div class="activity-block"><strong>Activity:</strong> Write a CASE statement for your own data.</div>
            </ol></div>` },
            { title: "Practical: Analyze and Visualize a Dataset", content: `<div class="ai-slide-block"><ol class='highlight-list'>
                <li>Pick a dataset and a question to answer.</li>
                <li>Clean and prepare your data.</li>
                <li>Create two different charts or graphs.</li>
                <li>Write a short summary of what you found.</li>
                <hr><div class="activity-block"><strong>Activity:</strong> Share your charts and summary with a friend.</div>
            </ol></div>` },
            { title: "Q&A", content: `<div class="ai-slide-block"><ul class='highlight-list'>
                <li>What analysis or chart surprised you most?</li>
                <li>Which tool was easiest for you?</li>
                <li>How can you use these skills in your life or work?</li>
            </ul></div>` },
            { title: "Key Takeaways", content: `<div class="ai-slide-block"><ul class='highlight-list'>
                <li>Analysis and visualization are key skills.</li>
                <li>Practice with real data and charts.</li>
                <li>Pick the right chart for your question.</li>
            </ul></div>` },
            { title: "Challenge: Analyze and Visualize Data", content: `<div class="ai-slide-block"><ol class='highlight-list'>
                <li>Find a dataset that interests you.</li>
                <li>Analyze it to answer a question.</li>
                <li>Create charts to show your findings.</li>
                <li>Be ready to present your work next time.</li>
                <hr><div class="activity-block"><strong>Tip:</strong> Use simple charts for clear stories!</div>
            </ol></div>` }
        ]
    },
    {
        title: "Storytelling with Data",
        slides: [
            { title: "What is Data Storytelling?", content: `<div class="ai-slide-block"><ol class='highlight-list'>
                <li>Data storytelling means using data and visuals to tell a story.</li>
                <li>It helps people understand and act on your findings.</li>
                <ul>
                    <li>A good story leads to action or change.</li>
                </ul>
                <hr><div class="activity-block"><strong>Activity:</strong> Share a story you know that uses numbers or facts.</div>
            </ol></div>` },
            { title: "Components of a Good Data Story", content: `<div class="ai-slide-block"><ol class='highlight-list'>
                <li>Clear message: What’s the main point?</li>
                <li>Accurate data: Is it correct and relevant?</li>
                <li>Good visuals: Do they help tell the story?</li>
                <li>Compelling narrative: Does it drive action?</li>
                <hr><div class="activity-block"><strong>Activity:</strong> Pick a chart and explain the story it tells.</div>
            </ol></div>` },
            { title: "Building Blocks of Data Storytelling", content: `<div class="ai-slide-block"><ol class='highlight-list'>
                <li>Know your audience (Who are you talking to?)</li>
                <li>Define your key message (What should they remember?)</li>
                <li>Pick the right visuals (Which chart or graph fits?)</li>
                <li>Build a simple story around your data.</li>
                <hr><div class="activity-block"><strong>Activity:</strong> Try telling a short story using a chart.</div>
            </ol></div>` },
            { title: "Data Storytelling in Excel", content: `<div class="ai-slide-block"><ol class='highlight-list'>
                <li>Use sparklines for small charts in cells.</li>
                <li>Try data bars and color scales for quick visuals.</li>
                <li>Keep your report clean and focused.</li>
                <hr><div class="activity-block"><strong>Activity:</strong> Add a sparkline to a table in Excel.</div>
            </ol></div>` },
            { title: "Data Storytelling in Power BI", content: `<div class="ai-slide-block"><ol class='highlight-list'>
                <li>Use bookmarks to guide your story.</li>
                <li>Add buttons and links for easy navigation.</li>
                <li>Make it interactive and fun for your audience.</li>
                <hr><div class="activity-block"><strong>Activity:</strong> Create a simple story with bookmarks in Power BI.</div>
            </ol></div>` },
            { title: "Data Storytelling in Python (using Jupyter Notebooks)", content: `<div class="ai-slide-block"><ol class='highlight-list'>
                <li>Mix code, output, and notes to tell your story.</li>
                <li>Use Matplotlib and Seaborn for charts.</li>
                <li>Export as PDF or HTML to share.</li>
                <hr><div class="activity-block"><strong>Activity:</strong> Add a markdown cell to explain your chart in Jupyter.</div>
            </ol></div>` },
            { title: "Data Storytelling in SQL (using Views and Stored Procedures)", content: `<div class="ai-slide-block"><ol class='highlight-list'>
                <li>Use views to make complex data simple.</li>
                <li>Automate analysis with stored procedures.</li>
                <li>Example: View for monthly sales by product.</li>
                <hr><div class="activity-block"><strong>Activity:</strong> Create a simple view in SQL for your data.</div>
            </ol></div>` },
            { title: "Practical: Create a Data Story", content: `<div class="ai-slide-block"><ol class='highlight-list'>
                <li>Pick a dataset and a clear goal for your story.</li>
                <li>Analyze and find key insights.</li>
                <li>Choose visuals and build your story.</li>
                <li>Share your story with a friend or mentor.</li>
                <hr><div class="activity-block"><strong>Activity:</strong> Present your story and get feedback.</div>
            </ol></div>` },
            { title: "Q&A", content: `<div class="ai-slide-block"><ul class='highlight-list'>
                <li>What was the hardest part of telling your data story?</li>
                <li>Which tool helped you most?</li>
                <li>How can you use data stories in your work or life?</li>
            </ul></div>` },
            { title: "Key Takeaways", content: `<div class="ai-slide-block"><ul class='highlight-list'>
                <li>Data stories help people understand and act.</li>
                <li>Practice telling stories with charts and facts.</li>
                <li>Use the right tool for your audience.</li>
            </ul></div>` },
            { title: "Challenge: Tell a Story with Your Data", content: `<div class="ai-slide-block"><ol class='highlight-list'>
                <li>Take the dataset you analyzed before.</li>
                <li>Build a story around your findings.</li>
                <li>Focus on the message and visuals.</li>
                <li>Be ready to present your story next time.</li>
                <hr><div class="activity-block"><strong>Tip:</strong> Keep your story simple and clear!</div>
            </ol></div>` }
        ]
    },
    {
        title: "Introduction to Dashboards",
        slides: [
            { title: "What is a Dashboard?", content: `<div class="ai-slide-block"><ol class='highlight-list'>
                <li>A dashboard shows key information visually.</li>
                <li>It helps you see trends and make quick decisions.</li>
                <ul>
                    <li>Example: Sales dashboard shows daily totals and best sellers.</li>
                </ul>
                <hr><div class="activity-block"><strong>Activity:</strong> Look at a dashboard (online or in Excel) and name two things you see.</div>
            </ol></div>` },
            { title: "Components of a Good Dashboard", content: `<div class="ai-slide-block"><ol class='highlight-list'>
                <li>Clear purpose: What question does it answer?</li>
                <li>Relevant data: Is it useful and up to date?</li>
                <li>Good visuals: Are the charts clear?</li>
                <li>User-friendly: Easy to read at a glance.</li>
                <hr><div class="activity-block"><strong>Activity:</strong> List two things that make a dashboard easy to use.</div>
            </ol></div>` },
            { title: "Types of Dashboards", content: `<div class="ai-slide-block"><ol class='highlight-list'>
                <li>Operational: Monitor real-time data (e.g., sales today)</li>
                <li>Analytical: Analyze trends over time</li>
                <li>Strategic: High-level overview for leaders</li>
                <hr><div class="activity-block"><strong>Activity:</strong> Which type would help your business or project most?</div>
            </ol></div>` },
            { title: "Dashboard Design Principles", content: `<div class="ai-slide-block"><ol class='highlight-list'>
                <li>Simplicity: Keep it simple, avoid clutter.</li>
                <li>Consistency: Use the same colors, fonts, and layout.</li>
                <li>Clarity: Every element should be clear and useful.</li>
                <li>Accessibility: Easy for anyone to use and understand.</li>
                <hr><div class="activity-block"><strong>Activity:</strong> Name one thing that makes a dashboard confusing.</div>
            </ol></div>` },
            { title: "Creating Dashboards in Excel", content: `<div class="ai-slide-block"><ol class='highlight-list'>
                <li>Use PivotTables and PivotCharts for summaries.</li>
                <li>Add slicers and timelines to filter data.</li>
                <li>Update your dashboard with new data often.</li>
                <hr><div class="activity-block"><strong>Activity:</strong> Build a simple dashboard in Excel with at least two charts.</div>
            </ol></div>` },
            { title: "Creating Dashboards in Power BI", content: `<div class="ai-slide-block"><ol class='highlight-list'>
                <li>Drag and drop visuals onto your dashboard.</li>
                <li>Arrange tiles for a clear layout.</li>
                <li>Publish and share your dashboard with others.</li>
                <hr><div class="activity-block"><strong>Activity:</strong> Create a dashboard in Power BI and share it with a friend.</div>
            </ol></div>` },
            { title: "Best Practices for Dashboard Maintenance", content: `<div class="ai-slide-block"><ul class='highlight-list'>
                <li>Update your data and dashboard layout often.</li>
                <li>Review your KPIs and metrics regularly.</li>
                <li>Ask for feedback and improve your dashboard.</li>
                <hr><div class="activity-block"><strong>Tip:</strong> A good dashboard is always improving!</div>
            </ul></div>` },
            { title: "Practical: Create a Dashboard", content: `<div class="ai-slide-block"><ol class='highlight-list'>
                <li>Pick a business question to answer.</li>
                <li>Create a dashboard in Excel or Power BI.</li>
                <li>Focus on clear, relevant, and attractive visuals.</li>
                <hr><div class="activity-block"><strong>Activity:</strong> Present your dashboard to the group and explain your choices.</div>
            </ol></div>` },
            { title: "Q&A", content: `<div class="ai-slide-block"><ul class='highlight-list'>
                <li>What challenges did you face while creating your dashboard?</li>
                <li>Which tool did you like best for dashboards?</li>
                <li>How can dashboards help you at work or home?</li>
            </ul></div>` },
            { title: "Key Takeaways", content: `<div class="ai-slide-block"><ul class='highlight-list'>
                <li>Dashboards help you see and use your data quickly.</li>
                <li>Practice making clear, useful dashboards.</li>
                <li>Try different tools to find what works for you.</li>
            </ul></div>` },
            { title: "Challenge: Create Your Own Dashboard", content: `<div class="ai-slide-block"><ol class='highlight-list'>
                <li>Pick a dataset and a key business question.</li>
                <li>Analyze the data and choose important numbers.</li>
                <li>Design and build a dashboard in Excel or Power BI.</li>
                <li>Be ready to present your dashboard next time.</li>
                <hr><div class="activity-block"><strong>Tip:</strong> Focus on what matters most for your audience!</div>
            </ol></div>` }
        ]
    },
    {
        title: "Introduction to Databases",
        slides: [
            { title: "What is a Database?", content: `<div class="ai-slide-block"><ol class='highlight-list'>
                <li>A database is a way to organize and store lots of data.</li>
                <li>It makes it easy to find, update, and manage information.</li>
                <ul>
                    <li>Used for websites, apps, businesses, and more.</li>
                </ul>
                <hr><div class="activity-block"><strong>Activity:</strong> Name one place you think uses a database.</div>
            </ol></div>` },
            { title: "Why Use a Database?", content: `<div class="ai-slide-block"><ol class='highlight-list'>
                <li>Store and manage lots of data easily.</li>
                <li>Find and analyze information quickly.</li>
                <li>Keep data safe and accurate.</li>
                <hr><div class="activity-block"><strong>Activity:</strong> List two reasons you’d use a database in your work or business.</div>
            </ol></div>` },
            { title: "Types of Databases", content: `<div class="ai-slide-block"><ol class='highlight-list'>
                <li>Relational: Data in tables (MySQL, PostgreSQL)</li>
                <li>NoSQL: Flexible, like documents or key-value (MongoDB, Redis)</li>
                <li>Cloud: Hosted online (Amazon RDS, Google Cloud SQL)</li>
                <hr><div class="activity-block"><strong>Activity:</strong> Which type do you think is used by M-Pesa or WhatsApp?</div>
            </ol></div>` },
            { title: "Database Design Principles", content: `<div class="ai-slide-block"><ol class='highlight-list'>
                <li>Decide what data you need to store.</li>
                <li>Organize data into tables and link them.</li>
                <li>Keep data accurate and avoid repeats.</li>
                <li>Plan for future changes or growth.</li>
                <hr><div class="activity-block"><strong>Activity:</strong> Sketch a simple table for a shop (e.g., products, sales).</div>
            </ol></div>` },
            { title: "Creating a Simple Database in MySQL", content: `<div class="ai-slide-block"><ol class='highlight-list'>
                <li>Open MySQL Workbench and connect to your server.</li>
                <li>Create a database and tables with SQL commands.</li>
                <li>Add, update, or delete data as needed.</li>
                <hr><div class="activity-block"><strong>Activity:</strong> Try creating a table for products in MySQL.</div>
            </ol></div>` },
            { title: "Database Management and Maintenance", content: `<div class="ai-slide-block"><ul class='highlight-list'>
                <li>Back up your database often.</li>
                <li>Optimize for speed (e.g., use indexes).</li>
                <li>Check for and fix errors or issues.</li>
                <hr><div class="activity-block"><strong>Tip:</strong> A safe database is a healthy database!</div>
            </ul></div>` },
            { title: "Practical: Create and Manage a Database", content: `<ol><li>Create a simple database for a business scenario (e.g., a shop).</li><li>Define tables for products, customers, and sales.</li><li>Practice adding, updating, and querying data.</li></ol>` },
            { title: "Q&A", content: `<ul><li>What was the most challenging part of creating your database?</li><li>Which SQL command did you find most useful?</li><li>How can databases be useful in your current or future job?</li></ul>` },
            { title: "Key Takeaways", content: `<ul><li>Databases are crucial for storing and managing data.</li><li>Learn to use SQL for database manipulation and querying.</li><li>Practice designing and managing databases.</li></ul>` },
            { title: "Challenge: Build Your Own Database", content: `<ol><li>Design a database for a personal project or interest.</li><li>Use MySQL to create the database and tables.</li><li>Populate with sample data and practice queries.</li><li>Be ready to demonstrate your database in the next session.</li></ol>` }
        ]
    },
    {
        title: "SQL for Data Analysis",
        slides: [
            { title: "What is SQL?", content: `<ul><li>SQL (Structured Query Language) is a language for managing and analyzing data in relational databases.</li><li>It’s used to perform tasks such as updating data, retrieving data, and creating reports.</li></ul>` },
            { title: "Basic SQL Commands", content: `<ul><li><code>SELECT</code>: Retrieve data from a database.</li><li><code>INSERT</code>: Add new data to a table.</li><li><code>UPDATE</code>: Modify existing data.</li><li><code>DELETE</code>: Remove data from a table.</li></ul>` },
            { title: "Filtering and Sorting Data", content: `<ul><li>Use <code>WHERE</code> to filter records (e.g., <code>SELECT * FROM sales WHERE amount > 100;</code>).</li><li>Use <code>ORDER BY</code> to sort records (e.g., <code>SELECT * FROM sales ORDER BY date DESC;</code>).</li></ul>` },
            { title: "Aggregating Data", content: `<ul><li>Use <code>GROUP BY</code> to group records (e.g., total sales by product).</li><li>Use aggregate functions like <code>SUM</code>, <code>AVG</code>, <code>COUNT</code> (e.g., <code>SELECT product, SUM(amount) FROM sales GROUP BY product;</code>).</li></ul>` },
            { title: "Joining Tables", content: `<ul><li>Use <code>JOIN</code> to combine rows from two or more tables based on a related column (e.g., customer ID).</li><li>Types of joins: INNER JOIN, LEFT JOIN, RIGHT JOIN, FULL JOIN.</li></ul>` },
            { title: "Subqueries and Nested Queries", content: `<ul><li>A subquery is a query within another query.</li><li>Used to perform operations that require multiple steps (e.g., finding top-selling products).</li></ul>` },
            { title: "SQL for Data Analysis: Best Practices", content: `<ul><li>Always back up your data before running update or delete queries.</li><li>Use transactions to ensure data integrity.</li><li>Optimize queries for better performance (e.g., using indexes).</li></ul>` },
            { title: "Practical: Analyze Data with SQL", content: `<ol><li>Given a dataset, write SQL queries to answer specific business questions.</li><li>Practice using SELECT, WHERE, JOIN, and aggregate functions.</li><li>Share your queries and results with a peer for review.</li></ol>` },
            { title: "Q&A", content: `<ul><li>What SQL command did you find most useful for data analysis?</li><li>What challenges did you face while writing SQL queries?</li><li>How can SQL skills benefit your career?</li></ul>` },
            { title: "Key Takeaways", content: `<ul><li>SQL is a powerful tool for data analysis in relational databases.</li><li>Practice writing and optimizing SQL queries.</li><li>Learn to use SQL in conjunction with other data tools.</li></ul>` },
            { title: "Challenge: SQL Data Analysis", content: `<ol><li>Take a dataset and write SQL queries to extract meaningful insights.</li><li>Use at least three different SQL commands in your analysis.</li><li>Be prepared to explain your queries and findings in the next session.</li></ol>` }
        ]
    },
    {
        title: "Introduction to Python for Data Analysis",
        slides: [
            { title: "Why Python for Data Analysis?", content: `<ul><li>Python is a powerful, flexible programming language.</li><li>It’s widely used for data analysis, machine learning, web development, and more.</li><li>Python has a simple syntax that’s easy to learn for beginners.</li></ul>` },
            { title: "Setting Up Python", content: `<ol><li>Download and install Python from the official website.</li><li>Install a code editor or IDE (e.g., PyCharm, VSCode).</li><li>Install Jupyter Notebook for interactive coding and data visualization.</li></ol>` },
            { title: "Python Basics: Data Types and Variables", content: `<ul><li>Common data types: integers, floats, strings, booleans.</li><li>Variables are used to store data values (e.g., <code>age = 30</code>).</li><li>Lists, tuples, and dictionaries are used to store collections of data.</li></ul>` },
            { title: "Python Basics: Control Structures", content: `<ul><li>Use <code>if</code>, <code>elif</code>, and <code>else</code> to perform conditional logic.</li><li>Use <code>for</code> and <code>while</code> loops to iterate over data.</li><li>Use <code>break</code> and <code>continue</code> to control loop execution.</li></ul>` },
            { title: "Introduction to Python Libraries for Data Analysis", content: `<ul><li>Pandas: Data manipulation and analysis.</li><li>NumPy: Numerical computing with Python.</li><li>Matplotlib and Seaborn: Data visualization libraries.</li><li>Scikit-learn: Machine learning library.</li></ul>` },
            { title: "Getting Started with Pandas", content: `<ol><li>Import the pandas library: <code>import pandas as pd</code>.</li><li>Load data into a DataFrame: <code>df = pd.read_csv('file.csv')</code>.</li><li>View and explore your data: <code>df.head()</code>, <code>df.info()</code>.</li></ol>` },
            { title: "Data Manipulation with Pandas", content: `<ol><li>Filter rows based on conditions: <code>df[df['column'] > value]</code>.</li><li>Select specific columns: <code>df[['column1', 'column2']]</code>.</li><li>Group data and calculate aggregates: <code>df.groupby('column').sum()</code>.</li></ol>` },
            { title: "Data Visualization with Matplotlib and Seaborn", content: `<ol><li>Create line charts, bar charts, and scatter plots to visualize data.</li><li>Customize charts with titles, labels, and legends.</li><li>Show trends, patterns, and outliers in your data.</li></ol>` },
            { title: "Practical: Analyze Data with Python", content: `<ol><li>Using a dataset, perform data cleaning, analysis, and visualization using Python.</li><li>Share your code and findings with a peer for review.</li></ol>` },
            { title: "Q&A", content: `<ul><li>What Python feature or library do you find most interesting?</li><li>What challenges did you face while using Python for data analysis?</li><li>How can Python skills benefit your career?</li></ul>` },
            { title: "Key Takeaways", content: `<ul><li>Python is a versatile language for data analysis and more.</li><li>Pandas and Matplotlib/Seaborn are essential libraries for data work.</li><li>Practice coding in Python regularly to improve your skills.</li></ul>` },
            { title: "Challenge: Python Data Analysis", content: `<ol><li>Take a dataset and use Python to clean, analyze, and visualize the data.</li><li>Be prepared to present your analysis and visuals in the next session.</li></ol>` }
        ]
    },
    {
        title: "Introduction to Machine Learning",
        slides: [
            { title: "What is Machine Learning?", content: `<ul><li>Machine learning is a type of artificial intelligence that allows software applications to become more accurate at predicting outcomes without being explicitly programmed.</li><li>It uses algorithms to find patterns and learn from data.</li></ul>` },
            { title: "Why Machine Learning Matters", content: `<ul><li>It enables computers to learn on their own, improving efficiency and effectiveness.</li><li>Machine learning is used in many applications, from email filtering to self-driving cars.</li></ul>` },
            { title: "Types of Machine Learning", content: `<ul><li>Supervised learning: The model is trained on labeled data (e.g., spam detection).</li><li>Unsupervised learning: The model finds patterns in unlabeled data (e.g., customer segmentation).</li><li>Reinforcement learning: The model learns by receiving rewards or penalties (e.g., game playing).</li></ul>` },
            { title: "Machine Learning Process", content: `<ol><li>Define the problem: What do you want to predict or classify?</li><li>Prepare the data: Clean and organize your data for training.</li><li>Choose a model: Select the appropriate machine learning algorithm.</li><li>Train the model: Use your data to teach the model.</li><li>Evaluate the model: Test the model’s accuracy and adjust as needed.</li></ol>` },
            { title: "Introduction to Python for Machine Learning", content: `<ul><li>Python is a popular language for machine learning due to its simplicity and powerful libraries.</li><li>Key libraries: Scikit-learn, TensorFlow, Keras, PyTorch.</li></ul>` },
            { title: "Getting Started with Scikit-learn", content: `<ol><li>Import the library: <code>from sklearn.model_selection import train_test_split</code>.</li><li>Load your data and split it into training and test sets.</li><li>Choose and train a model (e.g., linear regression, decision tree).</li><li>Make predictions and evaluate the model’s performance.</li></ol>` },
            { title: "Practical: Build a Machine Learning Model", content: `<ol><li>Using a dataset, build a simple machine learning model in Python.</li><li>Practice training, testing, and evaluating the model.</li><li>Share your code and results with a peer for review.</li></ol>` },
            { title: "Q&A", content: `<ul><li>What machine learning concept or application interests you the most?</li><li>What challenges did you face while building your model?</li><li>How can machine learning skills benefit your career?</li></ul>` },
            { title: "Key Takeaways", content: `<ul><li>Machine learning is a key technology in AI and data science.</li><li>Practice building and evaluating machine learning models.</li><li>Learn to use Python and its libraries for machine learning.</li></ul>` },
            { title: "Challenge: Build Your Own Machine Learning Model", content: `<ol><li>Take a dataset and build a machine learning model to solve a specific problem.</li><li>Be prepared to present your model, findings, and code in the next session.</li></ol>` }
        ]
    },
    {
        title: "Introduction to Artificial Intelligence",
        slides: [
            { title: "What is Artificial Intelligence?", content: `<ul><li>AI is the simulation of human intelligence in machines.</li><li>It enables machines to perform tasks that typically require human intelligence.</li><li>Examples: Understanding natural language, recognizing patterns, solving problems.</li></ul>` },
            { title: "Why AI Matters", content: `<ul><li>AI can analyze data and make decisions faster than humans.</li><li>It can work 24/7 without fatigue.</li><li>AI is transforming industries by enabling smarter products and services.</li></ul>` },
            { title: "Types of AI", content: `<ul><li>Narrow AI: Specialized in one task (e.g., facial recognition).</li><li>General AI: Has human-like cognitive abilities (still theoretical).</li></ul>` },
            { title: "AI Technologies and Tools", content: `<ul><li>Machine Learning: Algorithms that learn from data.</li><li>Natural Language Processing: Understanding and generating human language.</li><li>Computer Vision: Analyzing and interpreting visual data.</li><li>Robotics: Designing and using robots for tasks.</li></ul>` },
            { title: "Getting Started with AI: Key Concepts", content: `<ul><li>Data: The fuel for AI; more data generally leads to better AI models.</li><li>Algorithms: The methods AI uses to learn from data.</li><li>Model: The output of the AI training process; a model makes predictions or decisions.</li></ul>` },
            { title: "AI in Practice: Examples and Applications", content: `<ul><li>Healthcare: AI for diagnosing diseases, personalizing treatment.</li><li>Finance: AI for fraud detection, algorithmic trading.</li><li>Transportation: AI in self-driving cars, traffic management.</li><li>Retail: AI for inventory management, customer recommendations.</li></ul>` },
            { title: "Ethics and AI", content: `<ul><li>AI raises ethical questions: job displacement, privacy, bias in decision-making.</li><li>It’s important to design AI systems that are fair, transparent, and accountable.</li></ul>` },
            { title: "Future of AI", content: `<ul><li>AI technology is advancing rapidly, with ongoing research and development.</li><li>AI has the potential to significantly impact economies and societies.</li><li>It’s important to prepare for an AI-driven future.</li></ul>` },
            { title: "Getting Started with AI: Resources and Next Steps", content: `<ul><li>Online courses, tutorials, and books on AI and machine learning.</li><li>Join AI and data science communities and forums.</li><li>Work on AI projects and build a portfolio.</li></ul>` },
            { title: "Q&A", content: `<ul><li>What AI concept or application interests you the most?</li><li>What challenges do you foresee in learning or working with AI?</li><li>How can AI skills benefit your career?</li></ul>` },
            { title: "Key Takeaways", content: `<ul><li>AI is a key technology with wide-ranging applications.</li><li>Start learning AI concepts and tools, especially Python.</li><li>Practice building AI models and working with AI technologies.</li></ul>` },
            { title: "Challenge: Explore AI Tools", content: `<ol><li>Choose an AI tool or technology that interests you.</li><li>Follow a tutorial or guide to learn the basics.</li><li>Experiment with building a simple AI model or application.</li><li>Be prepared to share your experience and project in the next session.</li></ol>` }
        ]
    },
    {
        title: "Capstone Project and Review",
        slides: [
            { title: "Capstone Project and Review", content: `<div class="ai-slide-block"><ol class='highlight-list'>
                <li><strong>Objective:</strong> Combine all skills for a final project.</li>
                <li><strong>Today:</strong> Create, present, and share a report.</li>
                <li><strong>Why It Matters:</strong> Use all tools in real life!</li>
                <li>What project would you like to create? (e.g., a budget)</li>
            </ol></div>` },
            { title: "What Is the Capstone Project?", content: `<div class="ai-slide-block"><ol class='highlight-list'>
                <li>Create a budget report (Word, Excel).</li>
                <li>Present it (PowerPoint, Zoom).</li>
                <li>Share it (Google Drive, Gmail, PDF).</li>
                <li>Use all tools from Weeks 1-11.</li>
            </ol><div class="ai-action-box">🛠️ <strong>Explain:</strong> The project is a real-world task.</div></div>` },
            { title: "Step 1 – Create an Excel Table", content: `<div class="ai-slide-block"><ol class='highlight-list'>
                <li>Step 1: Open Excel (Week 3, 6).</li>
                <li>Step 2: Label A1:B1 as “Item,” “Cost” (e.g., “Rent,” $500).</li>
                <li>Step 3: Enter 4 items; use SUM for total.</li>
                <li>Step 4: Create a column chart (Week 6).</li>
            </ol><div class="ai-action-box">📊 <strong>Practice:</strong> Create a budget table in Excel.</div></div>` },
            { title: "Step 2 – Write a Report in Word", content: `<div class="ai-slide-block"><ol class='highlight-list'>
                <li>Step 1: Open Word (Week 2).</li>
                <li>Step 2: Type title (e.g., “My Budget Report”).</li>
                <li>Step 3: Add text (e.g., “This shows my expenses.”).</li>
                <li>Step 4: Copy-paste Excel chart (Week 11).</li>
            </ol><div class="ai-action-box">📝 <strong>Guide:</strong> Write a report in Word.</div></div>` },
            { title: "Step 3 – Save as PDF", content: `<div class="ai-slide-block"><ol class='highlight-list'>
                <li>Step 1: In Word, click File → Save As.</li>
                <li>Step 2: Choose “PDF” format, save in “My Files 2025.”</li>
                <li>Step 3: Open in Acrobat Reader to check (Week 10).</li>
            </ol><div class="ai-action-box">📄 <strong>Practice:</strong> Save as PDF and check in Acrobat.</div></div>` },
            { title: "Step 4 – Create a Presentation", content: `<div class="ai-slide-block"><ol class='highlight-list'>
                <li>Step 1: Open PowerPoint (Week 7).</li>
                <li>Step 2: Create 3 slides (title, text, chart).</li>
                <li>Step 3: Apply a theme; add an image.</li>
                <li>Step 4: Save as “My Project” in “My Files 2025.”</li>
            </ol><div class="ai-action-box">📽️ <strong>Practice:</strong> Create slides for your project.</div></div>` },
            { title: "Step 5 – Upload to Google Drive", content: `<div class="ai-slide-block"><ol class='highlight-list'>
                <li>Step 1: Open Google Drive (Week 9).</li>
                <li>Step 2: Upload Word, PDF, and PowerPoint files.</li>
                <li>Step 3: Create a folder “My Project 2025.”</li>
            </ol><div class="ai-action-box">☁️ <strong>Practice:</strong> Upload files to Drive.</div></div>` },
            { title: "Step 6 – Share via Email", content: `<div class="ai-slide-block"><ol class='highlight-list'>
                <li>Step 1: Open Gmail (Week 4).</li>
                <li>Step 2: Compose email, attach PDF.</li>
                <li>Step 3: Share Google Drive link (view-only).</li>
            </ol><div class="ai-action-box">📧 <strong>Practice:</strong> Email your project files.</div></div>` },
            { title: "Step 7 – Present in Zoom", content: `<div class="ai-slide-block"><ol class='highlight-list'>
                <li>Step 1: Join a Zoom meeting (Week 8).</li>
                <li>Step 2: Share PowerPoint via Screen Share.</li>
                <li>Step 3: Present slides, explain report.</li>
            </ol><div class="ai-action-box">🎤 <strong>Practice:</strong> Present your project in Zoom.</div></div>` },
            { title: "Practical Activity", content: `<div class="ai-slide-block"><ol class='highlight-list'>
                <li>Task 1: Create Excel table and chart (4 items).</li>
                <li>Task 2: Write Word report with chart; save as PDF.</li>
                <li>Task 3: Create 3-slide PowerPoint.</li>
                <li>Task 4: Upload to Google Drive, share via Gmail, present in Zoom.</li>
            </ol><div class="ai-action-box">✅ <strong>Checklist:</strong> Complete each task and celebrate progress!</div></div>` },
            { title: "Review of Skills", content: `<div class="ai-slide-block"><ol class='highlight-list'>
                <li>Week 1-2: Files, typing.</li>
                <li>Week 3-6: Spreadsheets, internet.</li>
                <li>Week 7-11: Presentations, Zoom, Drive, PDFs.</li>
                <li>Today: Combine all for real-world tasks!</li>
            </ol><div class="ai-action-box">🎉 <strong>Celebrate:</strong> Review all skills learned.</div></div>` },
            { title: "Why This Matters", content: `<div class="ai-slide-block"><ol class='highlight-list'>
                <li>Create reports, budgets, or plans.</li>
                <li>Share and present ideas confidently.</li>
                <li>Use computers for daily life!</li>
            </ol><div class="ai-action-box">⏳ <strong>Note:</strong> Capstone skills help in real life.</div></div>` },
            { title: "Q&A and Next Steps", content: `<div class="ai-slide-block"><ol class='highlight-list'>
                <li><strong>Ask:</strong> Any questions about the project?</li>
                <li><strong>Next Steps:</strong>
                    <ol>
                        <li>Keep practicing all tools.</li>
                        <li>Explore more features (e.g., Google Docs).</li>
                        <li>Share your skills with others!</li>
                    </ol>
                </li>
                <li><strong>Certificate:</strong> Celebrate your completion!</li>
            </ol><div class="ai-action-box">🎓 <strong>Encourage:</strong> Ask questions and distribute certificates.</div></div>` }
        ]
    },
    {
        title: "Artificial Intelligence",
        slides: [
            { title: "Artificial Intelligence – Your New Digital Assistant", content: `<div class="ai-slide-block"><ol class='highlight-list'><li>Learn how AI can save you time, help you make better decisions, and open new opportunities.</li></ol><div class="ai-action-box">💡 <strong>Reflection:</strong> Have you ever heard of AI before? What do you think it does? <br><em>Write down your thoughts or say them aloud.</em></div></div>` },
            { title: "What is AI?", content: `<div class="ai-slide-block"><ol class='highlight-list'><li>AI means machines that can learn and make decisions.</li><li>It uses data to find patterns and give smart answers.</li><li>It’s not magic — it’s math + logic + examples.</li></ol><div class="ai-action-box">🔍 <strong>Analogy:</strong> AI is like a smart student who learns from past papers and helps you solve new questions.</div></div>` },
            { title: "Why Should You Care?", content: `<div class="ai-slide-block"><ol class='highlight-list'><li>AI helps you do tasks faster.</li><li>It gives better results than guessing.</li><li>It can help you earn more or save more.</li></ol><div class="ai-action-box">🤔 <strong>Think:</strong> What’s one task you do often that takes time? Imagine AI doing it for you.</div></div>` },
            { title: "AI You Already Use Daily", content: `<div class="ai-slide-block"><ol class='highlight-list'>
                <li>M-Pesa: fraud alerts, transaction summaries.</li>
                <li>YouTube/TikTok: video suggestions.</li>
                <li>Google Translate: instant language help.</li>
                <li>Facebook: friend suggestions, auto-tagging photos.</li>
            </ol><div class="ai-action-box">📱 <strong>Quick Poll:</strong> Have you used any of these today? <em>Think about which ones you use most often.</em></div></div>` },
            { title: "AI for Small Business", content: `<div class="ai-slide-block"><ol class='highlight-list'>
                <li>Track sales trends automatically.</li>
                <li>Predict which products will sell more.</li>
                <li>Manage stock levels.</li>
                <li>Send targeted messages to customers.</li>
            </ol><div class="ai-action-box">🏪 <strong>Local Example:</strong> Imagine your shop knows which items will run out next week — that’s AI helping.</div></div>` },
            { title: "AI for Personal Productivity", content: `<div class="ai-slide-block"><ol class='highlight-list'>
                <li>Voice-to-text: speak instead of typing.</li>
                <li>Smart typing: auto-complete messages.</li>
                <li>Calendar suggestions: best time to meet.</li>
                <li>Photo sorting: group by faces or places.</li>
            </ol><div class="ai-action-box">🎤 <strong>Try It:</strong> Use voice-to-text on your phone. Do you ever struggle with typing long messages?</div></div>` },
            { title: "AI for Learning", content: `<div class="ai-slide-block"><ol class='highlight-list'>
                <li>Chatbots that explain topics in simple words.</li>
                <li>AI quizzes that adjust to your level.</li>
                <li>Apps that correct your pronunciation.</li>
                <li>Study summaries from long notes.</li>
            </ol><div class="ai-action-box">🧑‍💻 <strong>Demo:</strong> Ask ChatGPT or Bing Copilot a basic question. See how it answers!</div></div>` },
            { title: "AI for Data Analysis", content: `<div class="ai-slide-block"><ol class='highlight-list'>
                <li>Automatically creates charts from data.</li>
                <li>Spots patterns you might miss.</li>
                <li>Writes summaries and recommendations.</li>
                <li>Saves hours of manual work.</li>
            </ol><div class="ai-action-box">📊 <strong>Showcase:</strong> See a sample Excel sheet, then an AI-generated chart and insight.</div></div>` },
            { title: "Free AI Tools You Can Try Today", content: `<div class="ai-slide-block"><ol class='highlight-list'>
                <li><strong>ChatGPT / Bing Copilot:</strong> Ask questions, get answers.</li>
                <li><strong>Canva Magic Design:</strong> Create posters and graphics.</li>
                <li><strong>Google Lens:</strong> Identify objects, translate signs.</li>
                <li><strong>Grammarly:</strong> Improve your writing.</li>
            </ol><div class="ai-action-box">🌐 <strong>Explore:</strong> Try one of these tools after class and share your experience next time!</div></div>` },
            { title: "How to Start Using AI", content: `<div class="ai-slide-block"><ol class='highlight-list'>
                <li>Pick one task you do often.</li>
                <li>Search for an AI tool that helps with it.</li>
                <li>Try it with small, safe data.</li>
                <li>Keep what works, drop what doesn’t.</li>
            </ol><div class="ai-action-box">📝 <strong>Example:</strong> Typing long messages? Use voice-to-text. Making posters? Try Canva.</div></div>` },
            { title: "Skills to Work Well with AI", content: `<div class="ai-slide-block"><ol class='highlight-list'>
                <li>Ask clear questions (called prompts).</li>
                <li>Check AI’s answers — don’t trust blindly.</li>
                <li>Combine AI help with your own thinking.</li>
            </ol><div class="ai-action-box">💬 <strong>Prompt Practice:</strong> <span class='good-prompt'>Good:</span> “Give me 3 tips to grow a small shop in Kenya.” <span class='bad-prompt'>Bad:</span> “Tell me about business.”</div></div>` },
            { title: "Risks & How to Stay Safe", content: `<div class="ai-slide-block"><ol class='highlight-list'>
                <li>Don’t share private info (ID, passwords).</li>
                <li>Double-check facts — AI can be wrong.</li>
                <li>Don’t copy blindly — learn and improve.</li>
                <li>Keep learning — AI changes fast.</li>
            </ol><div class="ai-action-box">⚠️ <strong>Remember:</strong> AI is a helper, not a master. You’re still in control.</div></div>` },
            { title: "Call to Action", content: `<div class="ai-slide-block"><ol class='highlight-list'>
                <li>Try one AI tool this week.</li>
                <li>Use it for one task (typing, learning, designing).</li>
                <li>Share your experience in the next class.</li>
            </ol><div class="ai-action-box">✅ <strong>Homework:</strong> Pick one tool, use it, and tell us what happened!</div></div>` },
            { title: "Bonus: AI in Kenya", content: `<div class="ai-slide-block"><ol class='highlight-list'>
                <li>Local banks use AI for fraud detection.</li>
                <li>Kenyan startups use AI for agriculture (predicting weather, crop diseases).</li>
                <li>AI chatbots help with customer service in local businesses.</li>
            </ol><div class="ai-action-box">🌍 <strong>Discussion:</strong> Where else could AI help in our country?</div></div>` },
            { title: "Bonus: The Future of AI", content: `<div class="ai-slide-block"><ol class='highlight-list'>
                <li>AI is getting better at understanding language and images.</li>
                <li>More jobs will use AI tools in the future.</li>
                <li>Learning AI basics now gives you an advantage.</li>
            </ol><div class="ai-action-box">🚀 <strong>Encouragement:</strong> You don’t need to be a programmer to use AI. Curiosity and practice are enough!</div></div>` }
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