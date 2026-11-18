-- ====================================================================
-- Health Awareness and Community Wellness Management System (HACWMS)
-- Database Schema for MySQL
-- Location Context: 10th Ward, Tadepalligudem, West Godavari District
-- ====================================================================

CREATE DATABASE IF NOT EXISTS hacwms_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE hacwms_db;

-- 1. Users Table
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  age INT,
  gender ENUM('Male', 'Female', 'Other'),
  area VARCHAR(100) DEFAULT '10th Ward, Tadepalligudem',
  role ENUM('user', 'admin') DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Admins Table
CREATE TABLE IF NOT EXISTS admins (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  role_title VARCHAR(50) DEFAULT 'Ward Health Coordinator',
  permissions TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 3. Health Content Table
CREATE TABLE IF NOT EXISTS health_content (
  id INT AUTO_INCREMENT PRIMARY KEY,
  category ENUM('Personal Hygiene', 'Nutrition', 'Disease Prevention', 'Lifestyle Tips') NOT NULL,
  title_en VARCHAR(200) NOT NULL,
  title_te VARCHAR(200) NOT NULL,
  summary_en TEXT NOT NULL,
  summary_te TEXT NOT NULL,
  content_en LONGTEXT NOT NULL,
  content_te LONGTEXT NOT NULL,
  image_url VARCHAR(255),
  author VARCHAR(100) DEFAULT 'CSP Health Team',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 4. Survey Questions Table (Digitized 17 Questions from 7 Sections)
CREATE TABLE IF NOT EXISTS survey_questions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  section_number INT NOT NULL,
  section_title_en VARCHAR(100) NOT NULL,
  section_title_te VARCHAR(100) NOT NULL,
  question_en TEXT NOT NULL,
  question_te TEXT NOT NULL,
  question_type ENUM('text', 'select', 'radio', 'checkbox') NOT NULL,
  options JSON NULL,
  order_seq INT DEFAULT 1
);

-- 5. Survey Responses Table
CREATE TABLE IF NOT EXISTS survey_responses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NULL,
  participant_name VARCHAR(100) NOT NULL,
  age INT,
  gender VARCHAR(20),
  area VARCHAR(100) DEFAULT '10th Ward, Tadepalligudem',
  answers JSON NOT NULL,
  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- 6. Quizzes Categories Table
CREATE TABLE IF NOT EXISTS quizzes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title_en VARCHAR(100) NOT NULL,
  title_te VARCHAR(100) NOT NULL,
  description_en TEXT,
  description_te TEXT,
  total_questions INT DEFAULT 5,
  icon VARCHAR(50) DEFAULT 'Heart',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 7. Quiz Questions Table
CREATE TABLE IF NOT EXISTS quiz_questions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  quiz_id INT NOT NULL,
  question_en TEXT NOT NULL,
  question_te TEXT NOT NULL,
  option_a_en VARCHAR(255) NOT NULL,
  option_a_te VARCHAR(255) NOT NULL,
  option_b_en VARCHAR(255) NOT NULL,
  option_b_te VARCHAR(255) NOT NULL,
  option_c_en VARCHAR(255) NOT NULL,
  option_c_te VARCHAR(255) NOT NULL,
  option_d_en VARCHAR(255) NOT NULL,
  option_d_te VARCHAR(255) NOT NULL,
  correct_option CHAR(1) NOT NULL, -- 'A', 'B', 'C', or 'D'
  explanation_en TEXT,
  explanation_te TEXT,
  FOREIGN KEY (quiz_id) REFERENCES quizzes(id) ON DELETE CASCADE
);

-- 8. Quiz Results Table
CREATE TABLE IF NOT EXISTS quiz_results (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NULL,
  participant_name VARCHAR(100) NOT NULL,
  quiz_id INT NOT NULL,
  score INT NOT NULL,
  total INT NOT NULL DEFAULT 5,
  badge VARCHAR(50) NOT NULL,
  completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
  FOREIGN KEY (quiz_id) REFERENCES quizzes(id) ON DELETE CASCADE
);

-- 9. Feedback Table
CREATE TABLE IF NOT EXISTS feedback (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NULL,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100),
  rating INT NOT NULL CHECK(rating >= 1 AND rating <= 5),
  category VARCHAR(50) DEFAULT 'General',
  comments TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- 10. Reminders Table
CREATE TABLE IF NOT EXISTS reminders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  title_en VARCHAR(100) NOT NULL,
  title_te VARCHAR(100) NOT NULL,
  reminder_type ENUM('water', 'handwash', 'exercise', 'medicine', 'other') NOT NULL,
  frequency VARCHAR(50) DEFAULT 'Daily',
  target_time TIME NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 11. Activities Table (CSP 8-Week Program Records)
CREATE TABLE IF NOT EXISTS activities (
  id INT AUTO_INCREMENT PRIMARY KEY,
  week_number INT NOT NULL,
  title_en VARCHAR(200) NOT NULL,
  title_te VARCHAR(200) NOT NULL,
  location_en VARCHAR(150) NOT NULL,
  location_te VARCHAR(150) NOT NULL,
  description_en TEXT NOT NULL,
  description_te TEXT NOT NULL,
  target_audience VARCHAR(100),
  participants_count INT DEFAULT 0,
  activity_date DATE,
  image_url VARCHAR(255)
);

-- ====================================================================
-- SEED DATA
-- ====================================================================

-- 1. Default Admin & Demo User (Passwords are bcrypt hashed: admin123 & user123)
-- admin123: $2a$10$iM.GgQzG4JzV8zD6mKeqAOmjZ7QkUv31nQ.C/7rV7kHjA7m1nQZVy
INSERT INTO users (id, name, email, password, phone, age, gender, area, role)
VALUES
(1, 'Ward Health Officer (Admin)', 'admin@hacwms.org', '$2a$10$wW5LqT6K321lPZ226qFj..9Hq7mXp9H5sO1rPjS8z7W43zR4b3M2O', '9876543210', 32, 'Male', '10th Ward, Tadepalligudem', 'admin'),
(2, 'Kavitha Devi', 'kavitha@example.com', '$2a$10$wW5LqT6K321lPZ226qFj..9Hq7mXp9H5sO1rPjS8z7W43zR4b3M2O', '9848022338', 24, 'Female', '10th Ward, Tadepalligudem', 'user')
ON DUPLICATE KEY UPDATE name=VALUES(name);

INSERT INTO admins (user_id, role_title, permissions)
VALUES (1, 'Lead Health Coordinator', 'ALL')
ON DUPLICATE KEY UPDATE role_title=VALUES(role_title);

-- 2. Quizzes Seed
INSERT INTO quizzes (id, title_en, title_te, description_en, description_te, total_questions, icon)
VALUES
(1, 'Personal Hygiene Quiz', 'వ్యక్తిగత పరిశుభ్రత క్విజ్', 'Test your knowledge on daily cleanliness, handwashing steps, and oral hygiene.', 'రోజువారీ పరిశుభ్రత, చేతులు కడుక్కోవడం మరియు దంతాల శుభ్రతపై మీ పరిజ్ఞానాన్ని పరీక్షించండి.', 5, 'Sparkles'),
(2, 'Healthy Food and Nutrition', 'ఆరోగ్యకరమైన ఆహారం మరియు పోషకాహారం', 'Check how well you know balanced diets, vitamins, and nutritious local foods.', 'సమతుల్య ఆహారం, విటమిన్లు మరియు స్థానిక పోషక ఆహారాల గురించి తెలుసుకోండి.', 5, 'Apple'),
(3, 'Common Diseases & Prevention', 'సాధారణ వ్యాధులు మరియు నివారణ', 'Understand mosquito-borne illnesses, seasonal infections, and water contamination.', 'దోమల ద్వారా సంక్రమించే వ్యాధులు, కాలానుగుణ ఇన్ఫెక్షన్లు మరియు నీటి కాలుష్యంపై సమాచారం.', 5, 'ShieldCheck'),
(4, 'Preventive Healthcare & Habits', 'నివారణ ఆరోగ్య సంరక్షణ & అలవాట్లు', 'Explore daily fitness, clean water habits, mental wellness, and health checkups.', 'రోజువారీ ఫిట్‌నెస్, స్వచ్ఛమైన నీటి అలవాట్లు, మానసిక ఆరోగ్యం మరియు చెకప్‌లను అర్థం చేసుకోండి.', 5, 'Activity')
ON DUPLICATE KEY UPDATE title_en=VALUES(title_en);

-- 3. Quiz Questions Seed (5 questions per quiz)
INSERT INTO quiz_questions (quiz_id, question_en, question_te, option_a_en, option_a_te, option_b_en, option_b_te, option_c_en, option_c_te, option_d_en, option_d_te, correct_option, explanation_en, explanation_te)
VALUES
-- Quiz 1: Hygiene
(1, 'What is the minimum recommended time to wash hands with soap?', 'సబ్బుతో చేతులు కడుక్కోవడానికి కనీస సిఫార్సు సమయం ఎంత?', '5 seconds', '5 సెకన్లు', '20 seconds', '20 సెకన్లు', '60 seconds', '60 సెకన్లు', '2 minutes', '2 నిమిషాలు', 'B', 'Washing hands with soap for at least 20 seconds effectively removes germs and prevents disease transmission.', 'కనీసం 20 సెకన్ల పాటు సబ్బుతో చేతులు కడుక్కోవడం వల్ల సూక్ష్మక్రిములు నశిస్తాయి.'),
(1, 'How many times a day should a person brush their teeth?', 'రోజుకు ఎన్నిసార్లు పళ్ళు తోముకోవాలి?', 'Once a week', 'వారానికి ఒకసారి', 'Only in the morning', 'ఉదయం మాత్రమే', 'Twice a day (morning & night)', 'రోజుకు రెండుసార్లు (ఉదయం & రాత్రి)', 'After every 2 hours', 'ప్రతి 2 గంటలకు ఒకసారి', 'C', 'Brushing twice daily cleans plaque and safeguards teeth and gums from bacterial decay.', 'రోజుకు రెండుసార్లు పళ్ళు తోముకోవడం దంతాలు మరియు చిగుళ్ళను ఆరోగ్యంగా ఉంచుతుంది.'),
(1, 'Why is nail trimming important for personal hygiene?', 'గోర్లు కత్తిరించడం వ్యక్తిగత పరిశుభ్రతకు ఎందుకు ముఖ్యం?', 'It looks good only', 'కేవలం అందం కోసం', 'Prevents dirt and worm eggs accumulation', 'మురికి మరియు సూక్ష్మక్రిములు చేరకుండా చేస్తుంది', 'To save water', 'నీటిని ఆదా చేయడానికి', 'It is not important', 'ఇది ముఖ్యం కాదు', 'B', 'Long untrimmed nails harbor dirt, parasites, and bacteria that transfer to food while eating with hands.', 'పొడవాటి గోళ్ల కింద మురికి, బాక్టీరియా చేరి భోజనం చేసేటప్పుడు కడుపులోకి వెళ్తాయి.'),
(1, 'When must you unconditionally wash your hands?', 'మీరు తప్పనిసరిగా చేతులు ఎప్పుడు కడుక్కోవాలి?', 'Before eating and after using the toilet', 'తినడానికి ముందు & మరుగుదొడ్డి ఉపయోగించిన తర్వాత', 'Only after taking a bath', 'స్నానం చేసిన తర్వాత మాత్రమే', 'Only while leaving home', 'ఇంటి నుండి బయలుదేరేటప్పుడు మాత్రమే', 'Once a day', 'రోజుకు ఒకసారి', 'A', 'Hand hygiene before meals and after sanitation eliminates over 80% of contagious enteric bacteria.', 'తినడానికి ముందు, మరుగుదొడ్డి వాడిన తర్వాత చేతులు కడగడం రోగాలను అరికడుతుంది.'),
(1, 'How should personal combs and bath towels be maintained?', 'దువ్వెనలు మరియు తువ్వాళ్లను ఎలా ఉపయోగించాలి?', 'Shared with all neighbours', 'అందరికీ పంచుకోవాలి', 'Kept personal and washed regularly in sunlight', 'వ్యక్తిగతంగా ఉంచి క్రమం తప్పకుండా ఎండలో ఆరబెట్టాలి', 'Never washed', 'ఎప్పుడూ ఉతకకూడదు', 'Kept in dark damp places', 'చీకటి ప్రదేశాల్లో ఉంచాలి', 'B', 'Personal towels and combs should never be shared to prevent skin ringworm, lice, and dandruff spread.', 'చర్మవ్యాధులు మరియు పేలు వ్యాపించకుండా ఉండటానికి వీటిని వ్యక్తిగతంగా ఉపయోగించాలి.'),

-- Quiz 2: Nutrition
(2, 'Which nutrient is primarily responsible for muscle building and body growth?', 'శరీర పెరుగుదల మరియు కండరాల నిర్మాణానికి ప్రధానంగా ఏ పోషకం అవసరం?', 'Fats', 'కొవ్వులు', 'Proteins', 'ప్రోటీన్లు (మాంసకృత్తులు)', 'Sugar', 'చక్కెర', 'Salt', 'ఉప్పు', 'B', 'Proteins found in dals, eggs, milk, and pulses build and repair body tissues.', 'పప్పుధాన్యాలు, గుడ్లు, పాలలో ఉండే ప్రోటీన్లు శరీర కణాల మరమ్మత్తుకు తోడ్పడతాయి.'),
(2, 'Which vitamin is synthesized in our skin when exposed to early morning sunlight?', 'ఉదయపు సూర్యరశ్మి నుండి మన శరీరానికి ఏ విటమిన్ లభిస్తుంది?', 'Vitamin C', 'విటమిన్ సి', 'Vitamin A', 'విటమిన్ ఎ', 'Vitamin D', 'విటమిన్ డి', 'Vitamin B12', 'విటమిన్ బి12', 'C', 'Mild morning sunlight triggers our body to synthesize essential Vitamin D for healthy bones.', 'లేత సూర్యకాంతి ఎముకల బలానికి అవసరమైన విటమిన్ డి ని శరీరంలో ఉత్పత్తి చేస్తుంది.'),
(2, 'Deficiency of Iron in daily diet causes which common condition?', 'ఆహారంలో ఐరన్ (ఇనుము) లోపం వల్ల వచ్చే సాధారణ సమస్య ఏమిటి?', 'Anemia (రక్తహీనత)', 'రక్తహీనత (అనీమియా)', 'Malaria', 'మలేరియా', 'Typhoid', 'టైఫాయిడ్', 'Cholera', 'కలరా', 'A', 'Lack of iron causes anemia, leading to tiredness, dizziness, and low hemoglobin.', 'ఇనుము లోపం వల్ల రక్తహీనత ఏర్పడి అలసట, బలహీనత కలుగుతాయి.'),
(2, 'Which of the following is a balanced natural source of Vitamin C to boost immunity?', 'రోగనిరోధక శక్తిని పెంచే విటమిన్ సి కి సహజ వనరు ఏది?', 'Deep fried snacks', 'నూనెలో వేయించిన పదార్థాలు', 'Amla (Indian Gooseberry) and Citrus fruits', 'ఉసిరి మరియు నిమ్మజాతి పండ్లు', 'White refined flour', 'మైదా పిండి', 'Carbonated cold drinks', 'శీతల పానీయాలు', 'B', 'Amla, lemons, and guavas are rich in natural Vitamin C that safeguards the immune system.', 'ఉసిరికాయ, జామ, నిమ్మ పండ్లలో విటమిన్ సి పుష్కలంగా ఉంటుంది.'),
(2, 'What is the recommended average daily water intake for a healthy adult in our climate?', 'మన వాతావరణంలో ఆరోగ్యకరమైన పెద్దలు రోజుకు ఎన్ని లీటర్ల నీరు తాగాలి?', 'Less than 500 ml', '500 మి.లీ కంటే తక్కువ', '1 to 1.5 litres', '1 నుండి 1.5 లీటర్లు', '2.5 to 3.5 litres', '2.5 నుండి 3.5 లీటర్లు', '8 litres', '8 లీటర్లు', 'C', 'Staying hydrated with 2.5-3.5 litres maintains kidney health and thermal balance.', '2.5 నుండి 3.5 లీటర్ల స్వచ్ఛమైన నీరు తాగడం కిడ్నీ ఆరోగ్యానికి, శరీర చల్లదనానికి అవసరం.'),

-- Quiz 3: Common Diseases
(3, 'Which vector spreads Dengue fever in our community?', 'మన సమాజంలో డెంగ్యూ జ్వరాన్ని వ్యాప్తి చేసే దోమ ఏది?', 'Aedes mosquito', 'ఈడిస్ దోమ (పగటి దోమ)', 'Housefly', 'ఈగ', 'Tick', 'నల్లి', 'Cockroach', 'బొద్దింక', 'A', 'Aedes mosquitoes that breed in clean stagnant artificial containers bite during daytime and transmit Dengue.', 'ఈడిస్ దోమలు మంచి నీరు నిల్వ ఉన్న ప్రాంతాల్లో వృద్ధి చెంది డెంగ్యూని వ్యాపింపజేస్తాయి.'),
(3, 'Which of the following prevents mosquito breeding around houses?', 'ఇళ్ల చుట్టూ దోమలు వృద్ధి చెందకుండా నిరోధించే మార్గం ఏది?', 'Keeping open coconut shells with rain water', 'కొబ్బరి చిప్పల్లో నీరు నిల్వ ఉంచడం', 'Covering water drums and clearing stagnant water', 'నీటి తొట్టెలను మూసి ఉంచడం, నిల్వ నీటిని తొలగించడం', 'Dumping plastic cups in corners', 'ప్లాస్టిక్ కప్పులను చెల్లాచెదురుగా వేయడం', 'Leaving coolers unchecked', 'కూలర్లను అలాగే వదిలేయడం', 'B', 'Eliminating standing water weekly stops the mosquito reproductive cycle completely (Dry Day).', 'ప్రతి శుక్రవారం లేదా ఆదివారం డ్రై డే పాటించి నిల్వ నీటిని పారబోయాలి.'),
(3, 'ORS (Oral Rehydration Solution) is mainly given during which illness?', 'ORS ద్రావణాన్ని ప్రధానంగా ఏ పరిస్థితిలో ఇస్తారు?', 'Diarrhea and severe dehydration', 'విరేచనాలు మరియు నీరసం (డీహైడ్రేషన్)', 'Broken bone', 'ఎముక విరిగినప్పుడు', 'Eye infection', 'కంటి ఇన్ఫెక్షన్', 'Toothache', 'పంటి నొప్పి', 'A', 'ORS quickly restores critical fluids, glucose, and electrolytes lost during loose stools and vomiting.', 'విరేచనాలు, వాంతులు అయినప్పుడు కోల్పోయిన నీటిని, లవణాలను ORS భర్తీ చేస్తుంది.'),
(3, 'What is the simplest way to make domestic drinking water safe at home?', 'ఇంటి వద్ద తాగునీటిని సురక్షితంగా మార్చడానికి సరళమైన పద్ధతి ఏది?', 'Adding food color', 'ఫుడ్ కలర్ కలపడం', 'Boiling water for 10-15 minutes and filtering', '10-15 నిమిషాలు మరిగించి చల్లార్చి వడకట్టడం', 'Leaving it open outside', 'బయట తెరిచి ఉంచడం', 'Mixing cold sugar water', 'చల్లని చక్కెర నీటిని కలపడం', 'B', 'Rolling boiling kills all pathogenic waterborne bacteria and viruses without chemical residues.', 'నీటిని బాగా మరిగించడం వల్ల నీటి ద్వారా వ్యాపించే హానికర సూక్ష్మజీవులు నశిస్తాయి.'),
(3, 'Tuberculosis (TB) is primarily an infection affecting which body organ?', 'క్షయవ్యాధి (TB) ప్రధానంగా ఏ అవయవాన్ని ప్రభావితం చేస్తుంది?', 'Lungs', 'ఊపిరితిత్తులు', 'Nails', 'గోర్లు', 'Hair', 'జుట్టు', 'Teeth', 'దంతాలు', 'A', 'TB is a bacterial airborne infection primarily attacking the lungs, curable with timely DOTS medication.', 'క్షయ వ్యాధి ప్రధానంగా ఊపిరితిత్తులకు సోకుతుంది. ప్రభుత్వ ఆసుపత్రులలో దీనికి ఉచిత మందులు లభిస్తాయి.'),

-- Quiz 4: Preventive Healthcare & Habits
(4, 'How many minutes of moderate physical activity is recommended daily for adults?', 'పెద్దలు రోజుకు ఎన్ని నిమిషాలు వ్యాయామం లేదా నడక చేయాలి?', 'No exercise needed', 'వ్యాయామం అవసరం లేదు', 'At least 30 minutes', 'కనీసం 30 నిమిషాలు', 'Only 1 minute', '1 నిమిషం మాత్రమే', '5 hours continuously', '5 గంటలు నిరంతరాయంగా', 'B', '30 minutes of brisk walking or yoga controls hypertension, sugar levels, and heart disease risk.', 'రోజుకు 30 నిమిషాలు నడవడం వల్ల గుండె జబ్బులు, బిపి, షుగర్ నియంత్రణలో ఉంటాయి.'),
(4, 'What is the primary danger of consuming tobacco products (beedi, gutkha, cigarettes)?', 'పొగాకు ఉత్పత్తుల (బీడీ, గుట్కా, సిగరెట్) వల్ల కలిగే ముఖ్య ప్రమాదం ఏమిటి?', 'Improved digestion', 'జీర్ణక్రియ మెరుగుపడటం', 'Oral, throat and lung cancer, heart attacks', 'నోటి, ఊపిరితిత్తుల క్యాన్సర్ మరియు గుండెపోటు', 'Weight reduction safely', 'సురక్షిత బరువు తగ్గడం', 'Better eyesight', 'మంచి కంటి చూపు', 'B', 'Tobacco is the number one cause of oral submucous fibrosis, mouth cancer, and vascular blockages.', 'గుట్కా మరియు ధూమపానం నోటి క్యాన్సర్‌కు, ఊపిరితిత్తుల వ్యాధులకు ప్రధాన కారణం.'),
(4, 'Why is regular blood pressure and blood sugar screening crucial after age 30-35?', '30-35 ఏళ్ల తర్వాత బిపి, షుగర్ పరీక్షలు ఎందుకు తప్పనిసరి?', 'They are "silent killers" without early symptoms', 'లక్షణాలు లేకపోయినా అంతర్గతంగా దెబ్బతీస్తాయి (సైలెంట్ కిల్లర్స్)', 'They are completely harmless', 'వాటి వల్ల ఎటువంటి హానీ ఉండదు', 'To take extra medicines without doctor', 'డాక్టర్ లేకుండా మందులు వేసుకోవడానికి', 'Only to waste time', 'కేవలం సమయం వృధా చేయడానికి', 'A', 'Hypertension and Diabetes are asymptomatic initially; early detection saves heart and kidney damage.', 'బిపి, డయాబెటిస్ ప్రారంభంలో లక్షణాలు చూపించవు కాబట్టి ముందుగానే గుర్తించడం ప్రాణాధారం.'),
(4, 'Which simple habit maintains good mental health and stress relief?', 'ఒత్తిడి తగ్గించి మానసిక ఆరోగ్యాన్ని కాపాడుకోవడానికి ఉత్తమమైన అలవాటు ఏది?', 'Adequate sleep (7-8 hours), deep breathing, talking to family', '7-8 గంటల నిద్ర, ప్రాణాయామం, ఆత్మీయులతో మాట్లాడటం', 'Smoking excessively', 'ధూమపానం చేయడం', 'Skipping meals regularly', 'ఆహారం మానేయడం', 'Overthinking alone', 'ఒంటరిగా ఆందోళన చెందడం', 'A', 'Proper restful sleep, mindfulness, and healthy family sharing relieve anxiety and improve well-being.', 'తగినంత నిద్ర, కుటుంబంతో సమయం గడపడం, ప్రాణాయామం ఒత్తిడిని తగ్గిస్తాయి.'),
(4, 'What is the best way to dispose of biodegradable kitchen waste in a residential society?', 'ఇంటి సేంద్రీయ తడి చెత్తను ఎలా నిర్వహించాలి?', 'Dumping onto road or open drains', 'రోడ్లు లేదా మురుగు కాలువల్లో వేయడం', 'Segregation into wet/dry bins & compost making', 'తడి/పొడి చెత్తను వేరుచేసి కంపోస్ట్ చేయడం లేదా పారిశుధ్య కార్మికులకు ఇవ్వడం', 'Burning in front of house', 'ఇంటి ముందు కాల్చివేయడం', 'Throwing into neighbour open plots', 'పక్క ఖాళీ స్థలంలో పారవేయడం', 'B', 'Source segregation prevents mosquito breeding, drain clogging, and foul odors in the ward.', 'చెత్తను వేరుచేసి అందించడం వల్ల వీధులు శుభ్రంగా ఉంటాయి, దోమలు పెరగవు.');

-- 4. Health Content Seed (4 Categories)
INSERT INTO health_content (category, title_en, title_te, summary_en, summary_te, content_en, content_te, author)
VALUES
('Personal Hygiene', 'Essential Handwashing & Daily Sanitation Practices', 'చేతుల శుభ్రత మరియు రోజువారీ పారిశుధ్య పద్ధతులు',
 'Proper hand hygiene prevents over 80% of diarrheal diseases and seasonal infections.',
 'సరిగ్గా చేతులు కడుక్కోవడం వల్ల 80% పైగా అంటువ్యాధులు, కడుపునొప్పులు నివారించవచ్చు.',
 'Handwashing with soap for a minimum of 20 seconds is one of the most cost-effective public health interventions. Follow these 6 steps: 1. Wet hands with clean water. 2. Apply soap and lather back of hands. 3. Rub palms and between fingers. 4. Clean under nails. 5. Rub thumbs and wrists. 6. Rinse and dry with a clean towel. Bathe daily, keep your nails trimmed, brush teeth twice, and wear clean sun-dried clothes.',
 'సబ్బుతో కనీసం 20 సెకన్ల పాటు చేతులు శుభ్రం చేసుకోవడం అతి ముఖ్యమైన అలవాటు. 1. శుభ్రమైన నీటితో చేతులు తడపండి. 2. సబ్బు రాయండి. 3. అరచేతులు, వేళ్ల మధ్య రుద్దండి. 4. గోళ్ల కింద మురికిని తొలగించండి. 5. బొటనవేలు మరియు మణికట్టును శుభ్రం చేయండి. 6. స్వచ్ఛమైన నీటితో కడిగి శుభ్రమైన గుడ్డతో తుడుచుకోండి. రోజూ స్నానం చేయడం, ఉదయం-రాత్రి పళ్ళు తోముకోవడం మరియు ఉతికిన బట్టలు ధరించడం శ్రేయస్కరం.',
 'Tadepalligudem 10th Ward Health Team'),

('Nutrition', 'Balanced Diet: Harnessing Affordable Local Nutrition', 'సమతుల్య ఆహారం: స్థానిక పోషకాహారం ప్రాముఖ్యత',
 'Nutritious eating does not require expensive food; millets, pulses, leafy greens, and seasonal fruits provide optimal health.',
 'ఖరీదైన ఆహారం అవసరం లేదు; ఆకుకూరలు, పప్పుధాన్యాలు, చిరుధాన్యాలు, సీజనల్ పండ్లతో సంపూర్ణ ఆరోగ్యం పొందవచ్చు.',
 'A plate should ideally comprise 50% vegetables and fruits, 25% whole grains or millets (Ragi, Jowar, brown rice), and 25% lean protein (dals, sprouts, eggs, fish, milk). Include local greens like Palakura, Thotakura, and Gongura for iron and calcium. Avoid excessive palm oil, refined sugar, and salt to safeguard cardiovascular health. Ensure adolescent girls and pregnant women receive iron-folic acid rich meals.',
 'మన భోజనంలో సగం భాగం కూరగాయలు, ఆకుకూరలు (పాలకూర, తోటకూర, గోంగూర) ఉండాలి. పావు వంతు చిరుధాన్యాలు (రాగులు, జొన్నలు) లేదా దంపుడు బియ్యం, మరో పావు వంతు ప్రోటీన్లు ఇచ్చే పప్పులు, గుడ్లు, పాలు ఉండాలి. జంక్ ఫుడ్, అధిక ఉప్పు, తీపి పదార్థాలు తగ్గించండి. ప్రతిరోజూ 8-10 గ్లాసుల కాచి చల్లార్చిన నీటిని తాగండి.',
 'Ward Health Nutrition Wing'),

('Disease Prevention', 'Guarding Against Dengue, Malaria, and Seasonal Fevers', 'డెంగ్యూ, మలేరియా మరియు కాలానుగుణ వ్యాధుల నివారణ',
 'Stagnant water eradication and domestic mosquito defense save families from vector-borne hospitalization.',
 'ఇళ్ల చుట్టూ నీరు నిల్వ ఉండకుండా చూడటం ద్వారా డెంగ్యూ, మలేరియా వంటి దోమల వ్యాధులను అరికట్టవచ్చు.',
 'Vector diseases surge during the monsoon. Practice weekly "Dry Day": scrub clean and dry all water containers, air coolers, flower pots, and scrap tires. Sleep under mosquito nets, especially for infants and senior citizens. Do not self-medicate with high-dose painkillers during acute fever; visit the Urban Primary Health Centre (UPHC) or Government Area Hospital for a free platelet and blood count checkup.',
 'వర్షాకాలంలో దోమల వ్యాధులు అధికంగా ఉంటాయి. వారానికి ఒకసారి "డ్రై డే" పాటించి నీటి తొట్టెలు, కూలర్లు, ఖాళీ డబ్బాలను శుభ్రం చేసి ఎండబెట్టాలి. రాత్రిపూట దోమతెరలు వాడండి. జ్వరం వస్తే నిర్లక్ష్యం చేయకుండా లేదా ఆర్.ఎం.పి వద్ద అజాగ్రత్తగా ఇంజెక్షన్లు తీసుకోకుండా ప్రభుత్వ ఆసుపత్రి (UPHC)కి వెళ్లి రక్త పరీక్షలు చేయించుకోండి.',
 'Community Health Surveillance'),

('Lifestyle Tips', 'Daily Wellness: Physical Activity, Restful Sleep, and Mental Health', 'జీవనశైలి చిట్కాలు: వ్యాయామం, చక్కని నిద్ర, మానసిక ప్రశాంతత',
 'Small consistent lifestyle upgrades prevent Non-Communicable Diseases like High BP, Diabetes, and chronic stress.',
 'రోజూ 30 నిమిషాల నడక, మంచి నిద్ర మరియు వ్యాయామం ద్వారా బిపి, షుగర్ వంటి వ్యాధులను నివారించవచ్చు.',
 '1. Walk briskly for 30 minutes every morning or evening. 2. Limit mobile phone screen time 1 hour before sleep to enjoy 7-8 hours of sound sleep. 3. Spend quality time interacting with family and neighbors in the community. 4. Say a complete NO to gutkha, khaini, cigarettes, and excessive alcohol. 5. Drink warm water and do 10 minutes of basic pranayama or deep breathing to mitigate daily tension.',
 '1. రోజుకు కనీసం 30 నిమిషాలు వేగంగా నడవండి. 2. నిద్రపోయే గంట ముందు మొబైల్ వాడకం ఆపండి; 7-8 గంటలు ప్రశాంతంగా నిద్రించండి. 3. స్నేహితులు, కుటుంబ సభ్యులతో మనసువిప్పి మాట్లాడండి. 4. ధూమపానం, గుట్కా, మద్యపానానికి దూరంగా ఉండండి. 5. ఉదయం 10 నిమిషాలు ప్రాణాయామం చేసి మనస్సును ప్రశాంతంగా ఉంచుకోండి.',
 'Wellness Promotion Cell');

-- 5. Survey Questions Seed (The 17 Questions Across 7 Sections of the CSP Survey)
INSERT INTO survey_questions (section_number, section_title_en, section_title_te, question_en, question_te, question_type, options, order_seq)
VALUES
-- Section 1: Personal Information
(1, 'Personal Information', 'వ్యక్తిగత సమాచారం', 'What is your current occupation or study status?', 'మీ ప్రస్తుత వృత్తి లేదా విద్య వివరాలు ఏమిటి?', 'select', '["Student (విద్యార్థి)", "Employed / Private (ఉద్యోగి)", "Government Service (ప్రభుత్వ ఉద్యోగం)", "Business / Self-employed (వ్యాపారం)", "Daily Wage / Labor (కూలీ/శ్రామికుడు)", "Homemaker (గృహిణి)", "Retired / Elder (రిటైర్డ్/వృద్ధులు)"]', 1),
(1, 'Personal Information', 'వ్యక్తిగత సమాచారం', 'How many members reside in your household?', 'మీ ఇంట్లో ఎంతమంది సభ్యులు నివసిస్తున్నారు?', 'select', '["1-2 Members", "3-4 Members", "5-6 Members", "More than 6 Members"]', 2),

-- Section 2: General Health
(2, 'General Health', 'సాధారణ ఆరోగ్యం', 'How would you rate your overall general health condition?', 'మీ మొత్తం సాధారణ ఆరోగ్య పరిస్థితిని ఎలా రేట్ చేస్తారు?', 'radio', '["Excellent (చాలా బాగుంది)", "Good (బాగుంది)", "Fair / Average (సాధారణంగా ఉంది)", "Poor (బాగాలేదు)"]', 3),
(2, 'General Health', 'సాధారణ ఆరోగ్యం', 'Do you or your family members have chronic health concerns (BP, Diabetes, Thyroid, Heart)?', 'మీకు లేదా మీ కుటుంబ సభ్యులకు బిపి, షుగర్, థైరాయిడ్ లేదా గుండె సమస్యలు ఉన్నాయా?', 'select', '["None (ఏమీ లేవు)", "High Blood Pressure (బిపి)", "Diabetes (మధుమేహం/షుగర్)", "Both BP & Diabetes (బిపి మరియు షుగర్)", "Thyroid / Other (థైరాయిడ్/ఇతర)"]', 4),
(2, 'General Health', 'సాధారణ ఆరోగ్యం', 'How frequently do you undergo a general medical health check-up?', 'మీరు ఎంత తరచుగా సాధారణ వైద్య పరీక్షలు చేయించుకుంటారు?', 'select', '["Every 6 Months (ప్రతి 6 నెలలకు)", "Once a Year (సంవత్సరానికి ఒకసారి)", "Only when severely ill (తీవ్ర అనారోగ్యం వచ్చినప్పుడు మాత్రమే)", "Never done checkup (ఎప్పుడూ చేయించుకోలేదు)"]', 5),

-- Section 3: Food and Lifestyle
(3, 'Food and Lifestyle', 'ఆహారం మరియు జీవనశైలి', 'Do you include green leafy vegetables and seasonal fruits in your daily food?', 'మీ రోజువారీ ఆహారంలో ఆకుకూరలు మరియు పండ్లను తీసుకుంటున్నారా?', 'radio', '["Daily (రోజూ)", "3-4 times a week (వారానికి 3-4 సార్లు)", "Rarely (చాలా అరుదుగా)", "Almost Never (ఎప్పుడూ లేదు)"]', 6),
(3, 'Food and Lifestyle', 'ఆహారం మరియు జీవనశైలి', 'How many days a week do you perform physical exercise, walking, or yoga for 30 minutes?', 'వారంలో ఎన్ని రోజులు 30 నిమిషాల నడక లేదా వ్యాయామం చేస్తున్నారు?', 'select', '["Daily (ప్రతిరోజూ)", "4-5 Days/week (4-5 రోజులు)", "1-2 Days/week (1-2 రోజులు)", "No physical exercise (ఎలాంటి వ్యాయామం లేదు)"]', 7),
(3, 'Food and Lifestyle', 'ఆహారం మరియు జీవనశైలి', 'Does anyone in your home consume tobacco products (beedi, cigarettes, gutkha) or alcohol?', 'మీ ఇంట్లో ఎవరైనా ధూమపానం, గుట్కా లేదా మద్యం సేవిస్తారా?', 'radio', '["No, none (ఎవరూ లేరు)", "Occasionally (అప్పుడప్పుడు)", "Regularly (రోజూ క్రమం తప్పకుండా)", "Prefer not to say (చెప్పడానికి ఇష్టపడలేదు)"]', 8),

-- Section 4: Hygiene
(4, 'Hygiene & Cleanliness', 'పరిశుభ్రత & పారిశుధ్యం', 'Do you regularly wash hands with soap before meals and after using the sanitation facility?', 'భోజనానికి ముందు మరియు మరుగుదొడ్డి వాడిన తర్వాత సబ్బుతో చేతులు కడుగుతున్నారా?', 'radio', '["Always with soap (ఎల్లప్పుడూ సబ్బుతో)", "Sometimes with soap (కొన్నిసార్లు సబ్బుతో)", "Only with water (కేవలం నీటితో మాత్రమే)", "Rarely (చాలా అరుదుగా)"]', 9),
(4, 'Hygiene & Cleanliness', 'పరిశుభ్రత & పారిశుధ్యం', 'What is your primary source of domestic drinking water in the ward?', 'వార్డులో మీరు తాగడానికి ఉపయోగించే ముఖ్య నీటి వనరు ఏది?', 'select', '["Municipal Tap Water boiled/filtered (మరిగించిన మునిసిపల్ పంపు నీరు)", "Protected RO Purified Plant Water (ఆర్.ఒ వాటర్ ప్లాంట్ నీరు)", "Direct Unfiltered Tap Water (నేరుగా పంపు నీరు)", "Borewell / Ground Water (బోరు నీరు)"]', 10),
(4, 'Hygiene & Cleanliness', 'పరిశుభ్రత & పారిశుధ్యం', 'Do you segregate wet (kitchen) waste and dry waste before giving it to municipal workers?', 'పారిశుధ్య కార్మికులకు ఇచ్చేటప్పుడు తడి మరియు పొడి చెత్తను వేరు చేస్తున్నారా?', 'radio', '["Yes, always separated (అవును, ఎల్లప్పుడూ వేరు చేస్తాము)", "Sometimes (కొన్నిసార్లు)", "No, mixed together (లేదు, కలిపి వేస్తాము)"]', 11),

-- Section 5: Disease Awareness
(5, 'Disease Awareness', 'వ్యాధుల అవగాహన', 'Are you aware of Dengue and Malaria symptoms and how mosquito breeding takes place?', 'డెంగ్యూ, మలేరియా లక్షణాలు మరియు దోమల పెరుగుదల గురించి మీకు అవగాహన ఉందా?', 'radio', '["Fully Aware (పూర్తిగా తెలుసు)", "Partially Aware (కొంతవరకు తెలుసు)", "Not Aware (అవగాహన లేదు)"]', 12),
(5, 'Disease Awareness', 'వ్యాధుల అవగాహన', 'Do you practice a weekly "Dry Day" by clearing standing water in coolers, pots, and tires?', 'కూలర్లు, కుండలు, పాత టైర్లలో నిల్వ నీటిని పారబోసి "డ్రై డే" పాటిస్తున్నారా?', 'radio', '["Yes, every week (అవును, ప్రతి వారం)", "Occasionally (అప్పుడప్పుడు)", "Never heard of it (దీని గురించి వినలేదు)"]', 13),
(5, 'Disease Awareness', 'వ్యాధుల అవగాహన', 'Have you completed your recommended COVID-19 vaccine doses and routine immunizations?', 'కోవిడ్-19 టీకాలు మరియు సాధారణ రోగనిరోధక టీకాలు పూర్తి చేసుకున్నారా?', 'radio', '["Yes, fully vaccinated (అవును, పూర్తయ్యాయి)", "Partially vaccinated (కొంతవరకు వేసుకున్నాము)", "Not vaccinated (వేసుకోలేదు)"]', 14),

-- Section 6: Mental Health & Well-being
(6, 'Mental Health', 'మానసిక ఆరోగ్యం', 'How often do you feel burdened by mental stress, anxiety, or sleeplessness?', 'మీరు మానసిక ఒత్తిడి, ఆందోళన లేదా నిద్రలేమితో ఎంత తరచుగా ఇబ్బంది పడుతున్నారు?', 'select', '["Rarely or Never (చాలా అరుదుగా లేదా ఎప్పుడూ లేదు)", "Sometimes during work/family stress (అప్పుడప్పుడు)", "Often / Weekly (తరచుగా)", "Constantly (నిరంతరం)"]', 15),
(6, 'Mental Health', 'మానసిక ఆరోగ్యం', 'How do you usually relieve your stress and anxiety?', 'మీరు మీ ఒత్తిడిని తగ్గించుకోవడానికి సాధారణంగా ఏం చేస్తారు?', 'select', '["Talking with family & friends (కుటుంబంతో మాట్లాడటం)", "Walking, sports or exercise (నడక లేదా వ్యాయామం)", "Watching TV / Mobile phone (టీవీ లేదా మొబైల్ చూడటం)", "Listening to music / Meditation (సంగీతం లేదా ధ్యానం)", "No effective way (సరైన మార్గం లేదు)"]', 16),

-- Section 7: Community Awareness & Support
(7, 'Awareness & Support', 'అవగాహన మరియు మద్దతు', 'Did you find our 8-week Community Health Awareness program in Tadepalligudem 10th Ward helpful?', 'తాడేపల్లిగూడెం 10వ వార్డులో నిర్వహించిన 8 వారాల ఆరోగ్య అవగాహన కార్యక్రమం మీకు ఉపయోగపడిందా?', 'radio', '["Extremely Helpful (చాలా ఉపయోగపడింది)", "Helpful (ఉపయోగపడింది)", "Average (సాధారణం)", "Need more frequent camps (మరిన్ని క్యాంపులు కావాలి)"]', 17);

-- 6. Activities Seed (The 8-Week CSP Program in 10th Ward, Tadepalligudem)
INSERT INTO activities (week_number, title_en, title_te, location_en, location_te, description_en, description_te, target_audience, participants_count, activity_date)
VALUES
(1, 'Orientation & Baseline Survey Launch', 'ప్రాజెక్ట్ ప్రారంభం & ప్రాథమిక సర్వే', 'Municipal Office & Ward Secretariat 10, Tadepalligudem', 'మున్సిపల్ కార్యాలయం & 10వ వార్డు సచివాలయం',
 'Inaugurated the 8-week CSP health program. Coordinated with Ward Sachivalayam staff, Health Secretary (ANM), and distributed baseline paper questionnaires to map community health indicators.',
 '8 వారాల కమ్యూనిటీ సర్వీస్ ప్రాజెక్ట్‌ను ప్రారంభించాము. వార్డు సచివాలయ సిబ్బంది, ANM లతో సమన్వయం చేసుకుని వార్డులోని ప్రాథమిక ఆరోగ్య పరిస్థితులపై సర్వే ప్రారంభించాము.',
 'Ward Residents & Municipal Staff', 75, '2026-08-05'),

(2, 'Personal Hygiene & Handwashing Demonstration', 'వ్యక్తిగత పరిశుభ్రత & చేతులు కడిగే విధానం డెమో', 'Mandal Parishad Primary School, 10th Ward', 'మండల పరిషత్ ప్రాథమిక పాఠశాల, 10వ వార్డు',
 'Conducted hands-on demonstration of WHO 6-step handwashing technique using soap for primary students. Emphasized nail cleanliness, oral brushing, and germ defense.',
 'ప్రాథమిక పాఠశాల విద్యార్థులకు సబ్బుతో చేతులు కడుక్కోవడంలో 6 దశలను ప్రాక్టికల్‌గా చూపించాము. గోర్లు కత్తిరించుకోవడం, శుభ్రమైన దుస్తుల ప్రాముఖ్యత వివరించాము.',
 'Primary School Children & Teachers', 120, '2026-08-12'),

(3, 'Nutrition, Anaemia Defense & Balanced Food Drive', 'పోషకాహారం & రక్తహీనత నివారణ ప్రచారం', 'Anganwadi Centre & Residential Streets, Ward 10', 'అంగన్‌వాడీ కేంద్రం & నివాస ప్రాంతాలు',
 'Educated young mothers and adolescent girls on preventing iron-deficiency anaemia. Showcased low-cost indigenous balanced diet plates featuring local greens, ragi, and jaggery.',
 'రక్తహీనత నివారణకు ఆకుకూరలు, బెల్లం, రాగులు, పప్పుధాన్యాల ప్రాముఖ్యతను తల్లులకు మరియు కిశోర బాలికలకు అవగాహన కల్పించాము.',
 'Mothers, Pregnant Women & Girls', 95, '2026-08-19'),

(4, 'Anti-Mosquito Drive: Dengue & Malaria Prevention', 'దోమల నివారణ ప్రచారం: డెంగ్యూ, మలేరియా అవగాహన', 'Residential Society & Streets, 10th Ward', 'రెసిడెన్షియల్ సొసైటీ & వీధులు, 10వ వార్డు',
 'Organized street-by-street inspections to identify stagnant water in discard tires, coconut shells, and open tanks. Observed Friday Dry Day and distributed flyers on vector control.',
 'వీధుల్లో నిల్వ ఉన్న నీటి తొట్టెలు, కొబ్బరి చిప్పలను తొలగించి దోమలు వృద్ధి చెందకుండా డ్రై డే పాటించవలసిందిగా నివాసితులకు అవగాహన కల్పించాము.',
 'Residents & Commercial Owners', 140, '2026-08-26'),

(5, 'Safe Drinking Water & Solid Waste Management', 'రక్షిత తాగునీరు & చెత్త నిర్వహణ అవగాహన', 'Community Hall & Ward Streets', 'కమ్యూనిటీ హాల్ & వార్డు వీధులు',
 'Demonstrated domestic boiling and filtration techniques for tap water. Advocated household wet and dry waste segregation to help sanitation workers keep drains flowing cleanly.',
 'తాగునీటిని కాచి చల్లార్చడం, తడి మరియు పొడి చెత్తను వేరుచేసి పారిశుధ్య కార్మికులకు ఇవ్వడం వల్ల వచ్చే ఆరోగ్య ప్రయోజనాలపై అవగాహన సదస్సు నిర్వహించాము.',
 'Local Householders & Sanitarians', 85, '2026-09-02'),

(6, 'Health Screening & Non-Communicable Diseases (NCDs)', 'ఆరోగ్య పరీక్షలు & జీవనశైలి వ్యాధుల అవగాహన', 'Ward Secretariat 10, Tadepalligudem', '10వ వార్డు సచివాలయం, తాడేపల్లిగూడెం',
 'Assisted ANMs in basic screening of BP, random blood sugar, and BMI for adults over 35 years. Highlighted risk factors of smoking, gutkha, excess salt, and sedentary lifestyle.',
 '30 ఏళ్లు పైబడిన వార్డు ప్రజలకు బిపి, షుగర్ పరీక్షలలో సహాయం చేసి, వ్యాయామం మరియు ఉప్పు తగ్గించడం వల్ల కలిగే ప్రయోజనాలు వివరించాము.',
 'Adults & Senior Citizens', 110, '2026-09-09'),

(7, 'Adolescent Health, Hygiene & Mental Well-being', 'కౌమారదశ ఆరోగ్యం, పరిశుభ్రత & మానసిక శ్రేయస్సు', 'Government High School, Tadepalligudem', 'ప్రభుత్వ ఉన్నత పాఠశాల, తాడేపల్లిగూడెం',
 'Conducted interactive workshop on adolescent growth, personal cleanliness, managing exam stress, positive thinking, and digital screen addiction control.',
 'హైస్కూల్ విద్యార్థులకు వ్యక్తిగత పరిశుభ్రత, పరీక్షల ఒత్తిడిని అధిగమించడం, మానసిక ఉల్లాసం మరియు మొబైల్ వాడకం తగ్గించడంపై వర్క్‌షాప్ నిర్వహించాము.',
 'High School Students (Class 8-10)', 160, '2026-09-16'),

(8, 'Evaluation, Community Feedback & Digital Platform Proposal', 'సమీక్ష, అభిప్రాయాల సేకరణ & డిజిటల్ వ్యవస్థ ప్రతిపాదన', 'Municipal Office Conference Area, Tadepalligudem', 'మున్సిపల్ కార్యాలయ సమావేశ ప్రాంగణం',
 'Shared findings of the 8-week CSP survey with municipal officers and community leaders. Formally proposed the web-based HACWMS platform to ensure ongoing digital health education.',
 '8 వారాల అధ్యయన ఫలితాలను సమీక్షించి, ప్రజలందరికీ నిరంతరం ఆరోగ్య విద్యను అందించేలా ఈ HACWMS వెబ్ అప్లికేషన్‌ను రూపొందించడం ప్రారంభించాము.',
 'Ward Corporators, Officials & Citizens', 130, '2026-09-23');

-- 7. Initial Sample Reminders
INSERT INTO reminders (user_id, title_en, title_te, reminder_type, frequency, target_time)
VALUES
(1, 'Drink 1 Glass of Water', 'ఒక గ్లాసు మంచి నీరు తాగండి', 'water', 'Every 2 Hours', '09:00:00'),
(1, 'Wash Hands Thoroughly with Soap', 'సబ్బుతో చేతులు శుభ్రంగా కడగండి', 'handwash', 'Before Meals', '12:30:00'),
(1, 'Evening 30-min Brisk Walk', 'సాయంత్రం 30 నిమిషాల నడక', 'exercise', 'Daily Evening', '17:30:00');

-- 8. Initial Sample Feedback
INSERT INTO feedback (user_id, name, email, rating, category, comments)
VALUES
(2, 'Kavitha Devi', 'kavitha@example.com', 5, 'Program Effectiveness', 'The 8-week sessions in 10th ward were very informative. Now this web application makes it even easier to learn health tips in Telugu!');
