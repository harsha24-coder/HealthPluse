const bcrypt = require('bcryptjs');

// Pre-seeded memory store mimicking MySQL tables
const store = {
  users: [
    {
      id: 1,
      name: 'Health Officer (Admin)',
      email: 'admin@healthpulse.org',
      password: bcrypt.hashSync('admin123', 10),
      phone: '9876543210',
      age: 32,
      gender: 'Male',
      area: 'Public Health Ward',
      role: 'admin',
      created_at: new Date()
    },
    {
      id: 2,
      name: 'Kavitha Devi',
      email: 'kavitha@example.com',
      password: bcrypt.hashSync('admin123', 10),
      phone: '9848022338',
      age: 24,
      gender: 'Female',
      area: 'Central Zone',
      role: 'user',
      created_at: new Date()
    }
  ],
  admins: [
    { id: 1, user_id: 1, role_title: 'Lead Health Coordinator', permissions: 'ALL' }
  ],
  health_content: [
    {
      id: 1,
      category: 'Personal Hygiene',
      title_en: 'Essential Handwashing & Daily Sanitation Practices',
      title_te: 'చేతుల శుభ్రత మరియు రోజువారీ పారిశుధ్య పద్ధతులు',
      summary_en: 'Proper hand hygiene prevents over 80% of diarrheal diseases and seasonal infections.',
      summary_te: 'సరిగ్గా చేతులు కడుక్కోవడం వల్ల 80% పైగా అంటువ్యాధులు, కడుపునొప్పులు నివారించవచ్చు.',
      content_en: 'Handwashing with soap for a minimum of 20 seconds is one of the most cost-effective public health interventions. Follow these 6 steps: 1. Wet hands with clean water. 2. Apply soap and lather back of hands. 3. Rub palms and between fingers. 4. Clean under nails. 5. Rub thumbs and wrists. 6. Rinse and dry with a clean towel.',
      content_te: 'సబ్బుతో కనీసం 20 సెకన్ల పాటు చేతులు శుభ్రం చేసుకోవడం అతి ముఖ్యమైన అలవాటు. 1. శుభ్రమైన నీటితో చేతులు తడపండి. 2. సబ్బు రాయండి. 3. అరచేతులు, వేళ్ల మధ్య రుద్దండి. 4. గోళ్ల కింద మురికిని తొలగించండి. 5. బొటనవేలు మరియు మణికట్టును శుభ్రం చేయండి. 6. స్వచ్ఛమైన నీటితో కడిగి శుభ్రమైన గుడ్డతో తుడుచుకోండి.',
      author: 'Community Health Team',
      created_at: new Date()
    },
    {
      id: 2,
      category: 'Nutrition',
      title_en: 'Balanced Diet: Harnessing Affordable Local Nutrition',
      title_te: 'సమతుల్య ఆహారం: స్థానిక పోషకాహారం ప్రాముఖ్యత',
      summary_en: 'Nutritious eating does not require expensive food; millets, pulses, leafy greens, and seasonal fruits provide optimal health.',
      summary_te: 'ఖరీదైన ఆహారం అవసరం లేదు; ఆకుకూరలు, పప్పుధాన్యాలు, చిరుధాన్యాలు, సీజనల్ పండ్లతో సంపూర్ణ ఆరోగ్యం పొందవచ్చు.',
      content_en: 'A plate should ideally comprise 50% vegetables and fruits, 25% whole grains or millets (Ragi, Jowar, brown rice), and 25% lean protein (dals, sprouts, eggs, fish, milk). Include local greens like Palakura, Thotakura, and Gongura for iron and calcium.',
      content_te: 'మన భోజనంలో సగం భాగం కూరగాయలు, ఆకుకూరలు (పాలకూర, తోటకూర, గోంగూర) ఉండాలి. పావు వంతు చిరుధాన్యాలు (రాగులు, జొన్నలు) లేదా దంపుడు బియ్యం, మరో పావు వంతు ప్రోటీన్లు ఇచ్చే పప్పులు, గుడ్లు, పాలు ఉండాలి.',
      author: 'Community Nutrition Wing',
      created_at: new Date()
    },
    {
      id: 3,
      category: 'Disease Prevention',
      title_en: 'Guarding Against Dengue, Malaria, and Seasonal Fevers',
      title_te: 'డెంగ్యూ, మలేరియా మరియు కాలానుగుణ వ్యాధుల నివారణ',
      summary_en: 'Stagnant water eradication and domestic mosquito defense save families from vector-borne hospitalization.',
      summary_te: 'ఇళ్ల చుట్టూ నీరు నిల్వ ఉండకుండా చూడటం ద్వారా డెంగ్యూ, మలేరియా వంటి దోమల వ్యాధులను అరికట్టవచ్చు.',
      content_en: 'Vector diseases surge during the monsoon. Practice weekly "Dry Day": scrub clean and dry all water containers, air coolers, flower pots, and scrap tires. Sleep under mosquito nets, especially for infants and senior citizens.',
      content_te: 'వర్షాకాలంలో దోమల వ్యాధులు అధికంగా ఉంటాయి. వారానికి ఒకసారి "డ్రై డే" పాటించి నీటి తొట్టెలు, కూలర్లు, ఖాళీ డబ్బాలను శుభ్రం చేసి ఎండబెట్టాలి. రాత్రిపూట దోమతెరలు వాడండి.',
      author: 'Community Health Surveillance',
      created_at: new Date()
    },
    {
      id: 4,
      category: 'Lifestyle Tips',
      title_en: 'Daily Wellness: Physical Activity, Restful Sleep, and Mental Health',
      title_te: 'జీవనశైలి చిట్కాలు: వ్యాయామం, చక్కని నిద్ర, మానసిక ప్రశాంతత',
      summary_en: 'Small consistent lifestyle upgrades prevent Non-Communicable Diseases like High BP, Diabetes, and chronic stress.',
      summary_te: 'రోజూ 30 నిమిషాల నడక, మంచి నిద్ర మరియు వ్యాయామం ద్వారా బిపి, షుగర్ వంటి వ్యాధులను నివారించవచ్చు.',
      content_en: '1. Walk briskly for 30 minutes every morning or evening. 2. Limit mobile phone screen time 1 hour before sleep to enjoy 7-8 hours of sound sleep. 3. Spend quality time interacting with family. 4. Say NO to tobacco.',
      content_te: '1. రోజుకు కనీసం 30 నిమిషాలు వేగంగా నడవండి. 2. నిద్రపోయే గంట ముందు మొబైల్ వాడకం ఆపండి; 7-8 గంటలు ప్రశాంతంగా నిద్రించండి. 3. కుటుంబంతో సమయం గడపండి. 4. ధూమపానం, గుట్కా మానేయండి.',
      author: 'Wellness Promotion Cell',
      created_at: new Date()
    }
  ],
  quizzes: [
    { id: 1, title_en: 'Personal Hygiene Quiz', title_te: 'వ్యక్తిగత పరిశుభ్రత క్విజ్', total_questions: 5 },
    { id: 2, title_en: 'Healthy Food and Nutrition', title_te: 'ఆరోగ్యకరమైన ఆహారం మరియు పోషకాహారం', total_questions: 5 },
    { id: 3, title_en: 'Common Diseases & Prevention', title_te: 'సాధారణ వ్యాధులు మరియు నివారణ', total_questions: 5 },
    { id: 4, title_en: 'Preventive Healthcare & Habits', title_te: 'నివారణ ఆరోగ్య సంరక్షణ & అలవాట్లు', total_questions: 5 }
  ],
  quiz_questions: [
    // Quiz 1
    { id: 1, quiz_id: 1, question_en: 'What is the minimum recommended time to wash hands with soap?', question_te: 'సబ్బుతో చేతులు కడుక్కోవడానికి కనీస సిఫార్సు సమయం ఎంత?', option_a_en: '5 seconds', option_a_te: '5 సెకన్లు', option_b_en: '20 seconds', option_b_te: '20 సెకన్లు', option_c_en: '60 seconds', option_c_te: '60 సెకన్లు', option_d_en: '2 minutes', option_d_te: '2 నిమిషాలు', correct_option: 'B', explanation_en: 'Washing hands for at least 20 seconds eliminates germs.', explanation_te: 'కనీసం 20 సెకన్ల పాటు చేతులు కడుక్కోవడం క్రిములను నాశనం చేస్తుంది.' },
    { id: 2, quiz_id: 1, question_en: 'How many times a day should a person brush their teeth?', question_te: 'రోజుకు ఎన్నిసార్లు పళ్ళు తోముకోవాలి?', option_a_en: 'Once a week', option_a_te: 'వారానికి ఒకసారి', option_b_en: 'Only in the morning', option_b_te: 'ఉదయం మాత్రమే', option_c_en: 'Twice a day (morning & night)', option_c_te: 'రోజుకు రెండుసార్లు (ఉదయం & రాత్రి)', option_d_en: 'After every 2 hours', option_d_te: 'ప్రతి 2 గంటలకు ఒకసారి', correct_option: 'C', explanation_en: 'Twice daily brushing prevents bacterial decay.', explanation_te: 'రెండుసార్లు పళ్ళు తోముకోవడం దంతాలకు రక్షణ ఇస్తుంది.' },
    { id: 3, quiz_id: 1, question_en: 'Why is nail trimming important for personal hygiene?', question_te: 'గోర్లు కత్తిరించడం వ్యక్తిగత పరిశుభ్రతకు ఎందుకు ముఖ్యం?', option_a_en: 'It looks good only', option_a_te: 'కేవలం అందం కోసం', option_b_en: 'Prevents dirt and worm eggs accumulation', option_b_te: 'మురికి మరియు సూక్ష్మక్రిములు చేరకుండా చేస్తుంది', option_c_en: 'To save water', option_c_te: 'నీటిని ఆదా చేయడానికి', option_d_en: 'It is not important', option_d_te: 'ఇది ముఖ్యం కాదు', correct_option: 'B', explanation_en: 'Long nails harbor bacteria that transfer to food.', explanation_te: 'పొడవాటి గోళ్ల కింద మురికి చేరి ఆహారంలో కలుస్తుంది.' },
    { id: 4, quiz_id: 1, question_en: 'When must you unconditionally wash your hands?', question_te: 'మీరు తప్పనిసరిగా చేతులు ఎప్పుడు కడుక్కోవాలి?', option_a_en: 'Before eating and after using the toilet', option_a_te: 'తినడానికి ముందు & మరుగుదొడ్డి ఉపయోగించిన తర్వాత', option_b_en: 'Only after taking a bath', option_b_te: 'స్నానం చేసిన తర్వాత మాత్రమే', option_c_en: 'Only while leaving home', option_c_te: 'ఇంటి నుండి బయలుదేరేటప్పుడు మాత్రమే', option_d_en: 'Once a day', option_d_te: 'రోజుకు ఒకసారి', correct_option: 'A', explanation_en: 'Hand hygiene prevents gastrointestinal diseases.', explanation_te: 'భోజనానికి ముందు చేతులు కడగడం రోగాలను అరికడుతుంది.' },
    { id: 5, quiz_id: 1, question_en: 'How should personal combs and bath towels be maintained?', question_te: 'దువ్వెనలు మరియు తువ్వాళ్లను ఎలా ఉపయోగించాలి?', option_a_en: 'Shared with all neighbours', option_a_te: 'అందరికీ పంచుకోవాలి', option_b_en: 'Kept personal and washed regularly in sunlight', option_b_te: 'వ్యక్తిగతంగా ఉంచి క్రమం తప్పకుండా ఎండలో ఆరబెట్టాలి', option_c_en: 'Never washed', option_c_te: 'ఎప్పుడూ ఉతకకూడదు', option_d_en: 'Kept in dark damp places', option_d_te: 'చీకటి ప్రదేశాల్లో ఉంచాలి', correct_option: 'B', explanation_en: 'Sharing items spreads fungal infections and lice.', explanation_te: 'వ్యక్తిగతంగా ఉంచడం వల్ల చర్మవ్యాధులు రావు.' },

    // Quiz 2
    { id: 6, quiz_id: 2, question_en: 'Which nutrient is primarily responsible for muscle building and growth?', question_te: 'శరీర పెరుగుదల మరియు కండరాల నిర్మాణానికి ప్రధానంగా ఏ పోషకం అవసరం?', option_a_en: 'Fats', option_a_te: 'కొవ్వులు', option_b_en: 'Proteins', option_b_te: 'ప్రోటీన్లు (మాంసకృత్తులు)', option_c_en: 'Sugar', option_c_te: 'చక్కెర', option_d_en: 'Salt', option_d_te: 'ఉప్పు', correct_option: 'B', explanation_en: 'Proteins in dals and eggs repair body tissues.', explanation_te: 'పప్పులు, గుడ్లలోని ప్రోటీన్లు శరీర కణాలను నిర్మిస్తాయి.' },
    { id: 7, quiz_id: 2, question_en: 'Which vitamin is synthesized in skin when exposed to morning sunlight?', question_te: 'ఉదయపు సూర్యరశ్మి నుండి మన శరీరానికి ఏ విటమిన్ లభిస్తుంది?', option_a_en: 'Vitamin C', option_a_te: 'విటమిన్ సి', option_b_en: 'Vitamin A', option_b_te: 'విటమిన్ ఎ', option_c_en: 'Vitamin D', option_c_te: 'విటమిన్ డి', option_d_en: 'Vitamin B12', option_d_te: 'విటమిన్ బి12', correct_option: 'C', explanation_en: 'Sunlight synthesizes Vitamin D for strong bones.', explanation_te: 'సూర్యకాంతి ఎముకల బలానికి విటమిన్ డి ని ఉత్పత్తి చేస్తుంది.' },
    { id: 8, quiz_id: 2, question_en: 'Deficiency of Iron in daily diet causes which condition?', question_te: 'ఆహారంలో ఐరన్ (ఇనుము) లోపం వల్ల వచ్చే సాధారణ సమస్య ఏమిటి?', option_a_en: 'Anemia (రక్తహీనత)', option_a_te: 'రక్తహీనత (అనీమియా)', option_b_en: 'Malaria', option_b_te: 'మలేరియా', option_c_en: 'Typhoid', option_c_te: 'టైఫాయిడ్', option_d_en: 'Cholera', option_d_te: 'కలరా', correct_option: 'A', explanation_en: 'Iron deficiency causes low hemoglobin and tiredness.', explanation_te: 'ఇనుము లోపం వల్ల రక్తహీనత వస్తుంది.' },
    { id: 9, quiz_id: 2, question_en: 'Which of the following is a natural source of Vitamin C?', question_te: 'రోగనిరోధక శక్తిని పెంచే విటమిన్ సి కి సహజ వనరు ఏది?', option_a_en: 'Deep fried snacks', option_a_te: 'నూనెలో వేయించిన పదార్థాలు', option_b_en: 'Amla and Citrus fruits', option_b_te: 'ఉసిరి మరియు నిమ్మజాతి పండ్లు', option_c_en: 'White refined flour', option_c_te: 'మైదా పిండి', option_d_en: 'Cold drinks', option_d_te: 'శీతల పానీయాలు', correct_option: 'B', explanation_en: 'Amla is full of Vitamin C boosting immunity.', explanation_te: 'ఉసిరి రోగనిరోధక శక్తిని పెంచుతుంది.' },
    { id: 10, quiz_id: 2, question_en: 'What is the recommended average daily water intake for an adult?', question_te: 'ఆరోగ్యకరమైన పెద్దలు రోజుకు ఎన్ని లీటర్ల నీరు తాగాలి?', option_a_en: 'Less than 500 ml', option_a_te: '500 మి.లీ కంటే తక్కువ', option_b_en: '1 to 1.5 litres', option_b_te: '1 నుండి 1.5 లీటర్లు', option_c_en: '2.5 to 3.5 litres', option_c_te: '2.5 నుండి 3.5 లీటర్లు', option_d_en: '8 litres', option_d_te: '8 లీటర్లు', correct_option: 'C', explanation_en: '2.5 to 3.5 litres keeps kidneys healthy.', explanation_te: '2.5 నుండి 3.5 లీటర్ల నీరు అవసరం.' },

    // Quiz 3
    { id: 11, quiz_id: 3, question_en: 'Which vector spreads Dengue fever in our community?', question_te: 'మన సమాజంలో డెంగ్యూ జ్వరాన్ని వ్యాప్తి చేసే దోమ ఏది?', option_a_en: 'Aedes mosquito', option_a_te: 'ఈడిస్ దోమ (పగటి దోమ)', option_b_en: 'Housefly', option_b_te: 'ఈగ', option_c_en: 'Tick', option_c_te: 'నల్లి', option_d_en: 'Cockroach', option_d_te: 'బొద్దింక', correct_option: 'A', explanation_en: 'Aedes mosquitoes bite in daylight and transmit Dengue.', explanation_te: 'ఈడిస్ దోమలు మంచి నీటి నిల్వల్లో పెరిగి డెంగ్యూను వ్యాపింపజేస్తాయి.' },
    { id: 12, quiz_id: 3, question_en: 'Which of the following prevents mosquito breeding around houses?', question_te: 'ఇళ్ల చుట్టూ దోమలు వృద్ధి చెందకుండా నిరోధించే మార్గం ఏది?', option_a_en: 'Keeping open coconut shells with rain water', option_a_te: 'కొబ్బరి చిప్పల్లో నీరు నిల్వ ఉంచడం', option_b_en: 'Covering water drums and clearing stagnant water', option_b_te: 'నీటి తొట్టెలను మూసి ఉంచడం, నిల్వ నీటిని తొలగించడం', option_c_en: 'Dumping plastic cups in corners', option_c_te: 'ప్లాస్టిక్ కప్పులను చెల్లాచెదురుగా వేయడం', option_d_en: 'Leaving coolers unchecked', option_d_te: 'కూలర్లను అలాగే వదిలేయడం', correct_option: 'B', explanation_en: 'Emptying standing water weekly stops mosquitoes.', explanation_te: 'నిల్వ నీటిని పారబోయడం దోమల వృద్ధిని ఆపుతుంది.' },
    { id: 13, quiz_id: 3, question_en: 'ORS is mainly given during which illness?', question_te: 'ORS ద్రావణాన్ని ప్రధానంగా ఏ పరిస్థితిలో ఇస్తారు?', option_a_en: 'Diarrhea and severe dehydration', option_a_te: 'విరేచనాలు మరియు నీరసం (డీహైడ్రేషన్)', option_b_en: 'Broken bone', option_b_te: 'ఎముక విరిగినప్పుడు', option_c_en: 'Eye infection', option_c_te: 'కంటి ఇన్ఫెక్షన్', option_d_en: 'Toothache', option_d_te: 'పంటి నొప్పి', correct_option: 'A', explanation_en: 'ORS restores electrolytes lost in dehydration.', explanation_te: 'డీహైడ్రేషన్ సమయంలో ORS ప్రాణాధారం.' },
    { id: 14, quiz_id: 3, question_en: 'What is the simplest way to make drinking water safe at home?', question_te: 'ఇంటి వద్ద తాగునీటిని సురక్షితంగా మార్చడానికి సరళమైన పద్ధతి ఏది?', option_a_en: 'Adding food color', option_a_te: 'ఫుడ్ కలర్ కలపడం', option_b_en: 'Boiling water for 10-15 minutes and filtering', option_b_te: '10-15 నిమిషాలు మరిగించి చల్లార్చి వడకట్టడం', option_c_en: 'Leaving it open outside', option_c_te: 'బయట తెరిచి ఉంచడం', option_d_en: 'Mixing cold sugar water', option_d_te: 'చల్లని చక్కెర నీటిని కలపడం', correct_option: 'B', explanation_en: 'Boiling kills pathogenic bacteria and viruses.', explanation_te: 'మరిగించడం వల్ల హానికర సూక్ష్మజీవులు నశిస్తాయి.' },
    { id: 15, quiz_id: 3, question_en: 'Tuberculosis (TB) primarily affects which organ?', question_te: 'క్షయవ్యాధి (TB) ప్రధానంగా ఏ అవయవాన్ని ప్రభావితం చేస్తుంది?', option_a_en: 'Lungs', option_a_te: 'ఊపిరితిత్తులు', option_b_en: 'Nails', option_b_te: 'గోర్లు', option_c_en: 'Hair', option_c_te: 'జుట్టు', option_d_en: 'Teeth', option_d_te: 'దంతాలు', correct_option: 'A', explanation_en: 'TB attacks lungs and is cured with DOTS medicines.', explanation_te: 'క్షయ ప్రధానంగా ఊపిరితిత్తులకు సోకుతుంది.' },

    // Quiz 4
    { id: 16, quiz_id: 4, question_en: 'How many minutes of physical activity is recommended daily for adults?', question_te: 'పెద్దలు రోజుకు ఎన్ని నిమిషాలు వ్యాయామం లేదా నడక చేయాలి?', option_a_en: 'No exercise needed', option_a_te: 'వ్యాయామం అవసరం లేదు', option_b_en: 'At least 30 minutes', option_b_te: 'కనీసం 30 నిమిషాలు', option_c_en: 'Only 1 minute', option_c_te: '1 నిమిషం మాత్రమే', option_d_en: '5 hours continuously', option_d_te: '5 గంటలు నిరంతరాయంగా', correct_option: 'B', explanation_en: '30 mins of brisk walk prevents BP and diabetes.', explanation_te: 'రోజుకు 30 నిమిషాల నడక బిపి, షుగర్ నివారిస్తుంది.' },
    { id: 17, quiz_id: 4, question_en: 'What is the primary danger of consuming tobacco products?', question_te: 'పొగాకు ఉత్పత్తుల (బీడీ, గుట్కా) వల్ల కలిగే ముఖ్య ప్రమాదం ఏమిటి?', option_a_en: 'Improved digestion', option_a_te: 'జీర్ణక్రియ మెరుగుపడటం', option_b_en: 'Oral and lung cancer, heart attacks', option_b_te: 'నోటి, ఊపిరితిత్తుల క్యాన్సర్ మరియు గుండెపోటు', option_c_en: 'Weight reduction safely', option_c_te: 'సురక్షిత బరువు తగ్గడం', option_d_en: 'Better eyesight', option_d_te: 'మంచి కంటి చూపు', correct_option: 'B', explanation_en: 'Tobacco is the leading cause of oral and lung cancers.', explanation_te: 'గుట్కా, ధూమపానం క్యాన్సర్ కు దారితీస్తాయి.' },
    { id: 18, quiz_id: 4, question_en: 'Why is regular blood pressure and sugar screening crucial after age 30-35?', question_te: '30-35 ఏళ్ల తర్వాత బిపి, షుగర్ పరీక్షలు ఎందుకు తప్పనిసరి?', option_a_en: 'They are silent killers without early symptoms', option_a_te: 'లక్షణాలు లేకపోయినా అంతర్గతంగా దెబ్బతీస్తాయి (సైలెంట్ కిల్లర్స్)', option_b_en: 'They are completely harmless', option_b_te: 'వాటి వల్ల ఎటువంటి హానీ ఉండదు', option_c_en: 'To take extra medicines without doctor', option_c_te: 'డాక్టర్ లేకుండా మందులు వేసుకోవడానికి', option_d_en: 'Only to waste time', option_d_te: 'కేవలం సమయం వృధా చేయడానికి', correct_option: 'A', explanation_en: 'Early detection protects kidneys and heart.', explanation_te: 'ముందుగా గుర్తించడం ప్రాణాలను కాపాడుతుంది.' },
    { id: 19, quiz_id: 4, question_en: 'Which simple habit maintains good mental health and stress relief?', question_te: 'ఒత్తిడి తగ్గించి మానసిక ఆరోగ్యాన్ని కాపాడుకోవడానికి ఉత్తమమైన అలవాటు ఏది?', option_a_en: 'Adequate sleep (7-8 hours), deep breathing, talking to family', option_a_te: '7-8 గంటల నిద్ర, ప్రాణాయామం, ఆత్మీయులతో మాట్లాడటం', option_b_en: 'Smoking excessively', option_b_te: 'ధూమపానం చేయడం', option_c_en: 'Skipping meals regularly', option_c_te: 'ఆహారం మానేయడం', option_d_en: 'Overthinking alone', option_d_te: 'ఒంటరిగా ఆందోళన చెందడం', correct_option: 'A', explanation_en: 'Good sleep and mindfulness reduce anxiety.', explanation_te: 'నిద్ర, ప్రాణాయామం మనస్సును ప్రశాంతంగా ఉంచుతాయి.' },
    { id: 20, quiz_id: 4, question_en: 'What is the best way to dispose of biodegradable kitchen waste?', question_te: 'ఇంటి సేంద్రీయ తడి చెత్తను ఎలా నిర్వహించాలి?', option_a_en: 'Dumping onto road or open drains', option_a_te: 'రోడ్లు లేదా మురుగు కాలువల్లో వేయడం', option_b_en: 'Segregation into wet/dry bins & compost making', option_b_te: 'తడి/పొడి చెత్తను వేరుచేసి కంపోస్ట్ చేయడం లేదా పారిశుధ్య కార్మికులకు ఇవ్వడం', option_c_en: 'Burning in front of house', option_c_te: 'ఇంటి ముందు కాల్చివేయడం', option_d_en: 'Throwing into neighbour open plots', option_d_te: 'పక్క ఖాళీ స్థలంలో పారవేయడం', correct_option: 'B', explanation_en: 'Waste segregation keeps community clean and drains unclogged.', explanation_te: 'చెత్తను వేరుచేయడం పరిసరాల పరిశుభ్రతకు మేలు చేస్తుంది.' }
  ],
  quiz_results: [
    { id: 1, user_id: 2, participant_name: 'Kavitha Devi', quiz_id: 1, score: 5, total: 5, badge: 'Health Champion', completed_at: new Date() }
  ],
  survey_questions: [
    { id: 1, section_number: 1, section_title_en: 'Personal Information', section_title_te: 'వ్యక్తిగత సమాచారం', question_en: 'What is your current occupation or study status?', question_te: 'మీ ప్రస్తుత వృత్తి లేదా విద్య వివరాలు ఏమిటి?', question_type: 'select', options: ["Student (విద్యార్థి)", "Employed / Private (ఉద్యోగి)", "Government Service (ప్రభుత్వ ఉద్యోగం)", "Business / Self-employed (వ్యాపారం)", "Daily Wage / Labor (కూలీ/శ్రామికుడు)", "Homemaker (గృహిణి)", "Retired / Elder (రిటైర్డ్/వృద్ధులు)"], order_seq: 1 },
    { id: 2, section_number: 1, section_title_en: 'Personal Information', section_title_te: 'వ్యక్తిగత సమాచారం', question_en: 'How many members reside in your household?', question_te: 'మీ ఇంట్లో ఎంతమంది సభ్యులు నివసిస్తున్నారు?', question_type: 'select', options: ["1-2 Members", "3-4 Members", "5-6 Members", "More than 6 Members"], order_seq: 2 },
    { id: 3, section_number: 2, section_title_en: 'General Health', section_title_te: 'సాధారణ ఆరోగ్యం', question_en: 'How would you rate your overall general health condition?', question_te: 'మీ మొత్తం సాధారణ ఆరోగ్య పరిస్థితిని ఎలా రేట్ చేస్తారు?', question_type: 'radio', options: ["Excellent (చాలా బాగుంది)", "Good (బాగుంది)", "Fair / Average (సాధారణంగా ఉంది)", "Poor (బాగాలేదు)"], order_seq: 3 },
    { id: 4, section_number: 2, section_title_en: 'General Health', section_title_te: 'సాధారణ ఆరోగ్యం', question_en: 'Do you or your family members have chronic health concerns (BP, Diabetes, Thyroid)?', question_te: 'మీకు లేదా మీ కుటుంబ సభ్యులకు బిపి, షుగర్, థైరాయిడ్ సమస్యలు ఉన్నాయా?', question_type: 'select', options: ["None (ఏమీ లేవు)", "High Blood Pressure (బిపి)", "Diabetes (మధుమేహం/షుగర్)", "Both BP & Diabetes (బిపి మరియు షుగర్)", "Thyroid / Other (థైరాయిడ్/ఇతర)"], order_seq: 4 },
    { id: 5, section_number: 2, section_title_en: 'General Health', section_title_te: 'సాధారణ ఆరోగ్యం', question_en: 'How frequently do you undergo a general medical health check-up?', question_te: 'మీరు ఎంత తరచుగా సాధారణ వైద్య పరీక్షలు చేయించుకుంటారు?', question_type: 'select', options: ["Every 6 Months (ప్రతి 6 నెలలకు)", "Once a Year (సంవత్సరానికి ఒకసారి)", "Only when severely ill (తీవ్ర అనారోగ్యం వచ్చినప్పుడు మాత్రమే)", "Never done checkup (ఎప్పుడూ చేయించుకోలేదు)"], order_seq: 5 },
    { id: 6, section_number: 3, section_title_en: 'Food and Lifestyle', section_title_te: 'ఆహారం మరియు జీవనశైలి', question_en: 'Do you include green leafy vegetables and seasonal fruits in your daily food?', question_te: 'మీ రోజువారీ ఆహారంలో ఆకుకూరలు మరియు పండ్లను తీసుకుంటున్నారా?', question_type: 'radio', options: ["Daily (రోజూ)", "3-4 times a week (వారానికి 3-4 సార్లు)", "Rarely (చాలా అరుదుగా)", "Almost Never (ఎప్పుడూ లేదు)"], order_seq: 6 },
    { id: 7, section_number: 3, section_title_en: 'Food and Lifestyle', section_title_te: 'ఆహారం మరియు జీవనశైలి', question_en: 'How many days a week do you perform physical exercise or walking for 30 minutes?', question_te: 'వారంలో ఎన్ని రోజులు 30 నిమిషాల నడక లేదా వ్యాయామం చేస్తున్నారు?', question_type: 'select', options: ["Daily (ప్రతిరోజూ)", "4-5 Days/week (4-5 రోజులు)", "1-2 Days/week (1-2 రోజులు)", "No physical exercise (ఎలాంటి వ్యాయామం లేదు)"], order_seq: 7 },
    { id: 8, section_number: 3, section_title_en: 'Food and Lifestyle', section_title_te: 'ఆహారం మరియు జీవనశైలి', question_en: 'Does anyone in your home consume tobacco products (beedi, gutkha) or alcohol?', question_te: 'మీ ఇంట్లో ఎవరైనా ధూమపానం, గుట్కా లేదా మద్యం సేవిస్తారా?', question_type: 'radio', options: ["No, none (ఎవరూ లేరు)", "Occasionally (అప్పుడప్పుడు)", "Regularly (రోజూ క్రమం తప్పకుండా)", "Prefer not to say (చెప్పడానికి ఇష్టపడలేదు)"], order_seq: 8 },
    { id: 9, section_number: 4, section_title_en: 'Hygiene & Cleanliness', section_title_te: 'పరిశుభ్రత & పారిశుధ్యం', question_en: 'Do you regularly wash hands with soap before meals and after using the toilet?', question_te: 'భోజనానికి ముందు మరియు మరుగుదొడ్డి వాడిన తర్వాత సబ్బుతో చేతులు కడుగుతున్నారా?', question_type: 'radio', options: ["Always with soap (ఎల్లప్పుడూ సబ్బుతో)", "Sometimes with soap (కొన్నిసార్లు సబ్బుతో)", "Only with water (కేవలం నీటితో మాత్రమే)", "Rarely (చాలా అరుదుగా)"], order_seq: 9 },
    { id: 10, section_number: 4, section_title_en: 'Hygiene & Cleanliness', section_title_te: 'పరిశుభ్రత & పారిశుధ్యం', question_en: 'What is your primary source of domestic drinking water?', question_te: 'మీరు తాగడానికి ఉపయోగించే ముఖ్య నీటి వనరు ఏది?', question_type: 'select', options: ["Municipal Tap Water boiled/filtered (మరిగించిన పంపు నీరు)", "Protected RO Purified Plant Water (ఆర్.ఒ వాటర్ ప్లాంట్ నీరు)", "Direct Unfiltered Tap Water (నేరుగా పంపు నీరు)", "Borewell / Ground Water (బోరు నీరు)"], order_seq: 10 },
    { id: 11, section_number: 4, section_title_en: 'Hygiene & Cleanliness', section_title_te: 'పరిశుభ్రత & పారిశుధ్యం', question_en: 'Do you segregate wet (kitchen) waste and dry waste before giving it to municipal workers?', question_te: 'పారిశుధ్య కార్మికులకు ఇచ్చేటప్పుడు తడి మరియు పొడి చెత్తను వేరు చేస్తున్నారా?', question_type: 'radio', options: ["Yes, always separated (అవును, ఎల్లప్పుడూ వేరు చేస్తాము)", "Sometimes (కొన్నిసార్లు)", "No, mixed together (లేదు, కలిపి వేస్తాము)"], order_seq: 11 },
    { id: 12, section_number: 5, section_title_en: 'Disease Awareness', section_title_te: 'వ్యాధుల అవగాహన', question_en: 'Are you aware of Dengue and Malaria symptoms and how mosquito breeding takes place?', question_te: 'డెంగ్యూ, మలేరియా లక్షణాలు మరియు దోమల పెరుగుదల గురించి మీకు అవగాహన ఉందా?', question_type: 'radio', options: ["Fully Aware (పూర్తిగా తెలుసు)", "Partially Aware (కొంతవరకు తెలుసు)", "Not Aware (అవగాహన లేదు)"], order_seq: 12 },
    { id: 13, section_number: 5, section_title_en: 'Disease Awareness', section_title_te: 'వ్యాధుల అవగాహన', question_en: 'Do you practice a weekly "Dry Day" by clearing standing water in coolers, pots, and tires?', question_te: 'కూలర్లు, కుండలు, పాత టైర్లలో నిల్వ నీటిని పారబోసి "డ్రై డే" పాటిస్తున్నారా?', question_type: 'radio', options: ["Yes, every week (అవును, ప్రతి వారం)", "Occasionally (అప్పుడప్పుడు)", "Never heard of it (దీని గురించి వినలేదు)"], order_seq: 13 },
    { id: 14, section_number: 5, section_title_en: 'Disease Awareness', section_title_te: 'వ్యాధుల అవగాహన', question_en: 'Have you completed your recommended COVID-19 vaccine doses and routine immunizations?', question_te: 'కోవిడ్-19 టీకాలు మరియు సాధారణ రోగనిరోధక టీకాలు పూర్తి చేసుకున్నారా?', question_type: 'radio', options: ["Yes, fully vaccinated (అవును, పూర్తయ్యాయి)", "Partially vaccinated (కొంతవరకు వేసుకున్నాము)", "Not vaccinated (వేసుకోలేదు)"], order_seq: 14 },
    { id: 15, section_number: 6, section_title_en: 'Mental Health', section_title_te: 'మానసిక ఆరోగ్యం', question_en: 'How often do you feel burdened by mental stress, anxiety, or sleeplessness?', question_te: 'మీరు మానసిక ఒత్తిడి, ఆందోళన లేదా నిద్రలేమితో ఎంత తరచుగా ఇబ్బంది పడుతున్నారు?', question_type: 'select', options: ["Rarely or Never (చాలా అరుదుగా లేదా ఎప్పుడూ లేదు)", "Sometimes during work/family stress (అప్పుడప్పుడు)", "Often / Weekly (తరచుగా)", "Constantly (నిరంతరం)"], order_seq: 15 },
    { id: 16, section_number: 6, section_title_en: 'Mental Health', section_title_te: 'మానసిక ఆరోగ్యం', question_en: 'How do you usually relieve your stress and anxiety?', question_te: 'మీరు మీ ఒత్తిడిని తగ్గించుకోవడానికి సాధారణంగా ఏం చేస్తారు?', question_type: 'select', options: ["Talking with family & friends (కుటుంబంతో మాట్లాడటం)", "Walking, sports or exercise (నడక లేదా వ్యాయామం)", "Watching TV / Mobile phone (టీవీ లేదా మొబైల్ చూడటం)", "Listening to music / Meditation (సంగీతం లేదా ధ్యానం)", "No effective way (సరైన మార్గం లేదు)"], order_seq: 16 },
    { id: 17, section_number: 7, section_title_en: 'Awareness & Support', section_title_te: 'అవగాహన మరియు మద్దతు', question_en: 'Did you find our Community Health Awareness & Wellness program helpful?', question_te: 'కమ్యూనిటీ ఆరోగ్య అవగాహన మరియు వెల్నెస్ కార్యక్రమం మీకు ఉపయోగపడిందా?', question_type: 'radio', options: ["Extremely Helpful (చాలా ఉపయోగపడింది)", "Helpful (ఉపయోగపడింది)", "Average (సాధారణం)", "Need more frequent camps (మరిన్ని క్యాంపులు కావాలి)"], order_seq: 17 }
  ],
  survey_responses: [
    {
      id: 1,
      user_id: 2,
      participant_name: 'Kavitha Devi',
      age: 24,
      gender: 'Female',
      area: 'Local Community',
      answers: { "1": "Homemaker (గృహిణి)", "2": "3-4 Members", "3": "Good (బాగుంది)", "9": "Always with soap (ఎల్లప్పుడూ సబ్బుతో)", "13": "Yes, every week (అవును, ప్రతి వారం)", "17": "Extremely Helpful (చాలా ఉపయోగపడింది)" },
      submitted_at: new Date()
    }
  ],
  feedback: [
    {
      id: 1,
      user_id: 2,
      name: 'Kavitha Devi',
      email: 'kavitha@example.com',
      rating: 5,
      category: 'Program Effectiveness',
      comments: 'The community health sessions were very informative. Now this web application makes it even easier to learn health tips in Telugu!',
      created_at: new Date()
    }
  ],
  reminders: [
    { id: 1, user_id: 1, title_en: 'Drink 1 Glass of Water', title_te: 'ఒక గ్లాసు మంచి నీరు తాగండి', reminder_type: 'water', frequency: 'Every 2 Hours', target_time: '09:00:00', is_active: 1 },
    { id: 2, user_id: 1, title_en: 'Wash Hands Thoroughly with Soap', title_te: 'సబ్బుతో చేతులు శుభ్రంగా కడగండి', reminder_type: 'handwash', frequency: 'Before Meals', target_time: '12:30:00', is_active: 1 },
    { id: 3, user_id: 1, title_en: 'Evening 30-min Brisk Walk', title_te: 'సాయంత్రం 30 నిమిషాల నడక', reminder_type: 'exercise', frequency: 'Daily Evening', target_time: '17:30:00', is_active: 1 }
  ],
  activities: [
    { id: 1, week_number: 1, title_en: 'Community Wellness Launch & Health Survey', title_te: 'వెల్నెస్ ప్రారంభం & ఆరోగ్య సర్వే', location_en: 'Community Health Center', location_te: 'కమ్యూనిటీ ఆరోగ్య కేంద్రం', description_en: 'Inaugurated the community wellness initiative, coordinated with local health workers, and initiated baseline public health surveys.', description_te: 'కమ్యూనిటీ ఆరోగ్య కార్యక్రమాన్ని ప్రారంభించి, ఆరోగ్య సిబ్బందితో సమన్వయం చేసుకుని ప్రాథమిక సర్వేను ప్రారంభించాము.', target_audience: 'Community Residents & Families', participants_count: 75, activity_date: '2026-08-05' },
    { id: 2, week_number: 2, title_en: 'Personal Hygiene & 6-Step Handwashing Drive', title_te: 'వ్యక్తిగత పరిశుభ్రత & చేతులు కడిగే విధానం డెమో', location_en: 'Community Public Center', location_te: 'కమ్యూనిటీ కేంద్రం', description_en: 'Conducted live demonstrations of the WHO 6-step handwashing technique with soap for community members and children. Emphasized nail hygiene and oral care.', description_te: 'సబ్బుతో చేతులు కడుక్కోవడంలో 6 దశలను ప్రాక్టికల్‌గా చూపించాము. గోర్లు కత్తిరించుకోవడం, శుభ్రమైన దుస్తుల ప్రాముఖ్యత వివరించాము.', target_audience: 'Children, Parents & Citizens', participants_count: 120, activity_date: '2026-08-12' },
    { id: 3, week_number: 3, title_en: 'Nutrition, Anaemia Defense & Balanced Food Drive', title_te: 'పోషకాహారం & రక్తహీనత నివారణ ప్రచారం', location_en: 'Community Nutrition Center', location_te: 'పోషకాహార కేంద్రం', description_en: 'Educated mothers and families on preventing iron-deficiency anaemia. Showcased affordable indigenous balanced diet plates featuring local greens, ragi, and jaggery.', description_te: 'రక్తహీనత నివారణకు ఆకుకూరలు, బెల్లం, రాగులు, పప్పుధాన్యాల ప్రాముఖ్యతను తల్లులకు మరియు ప్రజలకు అవగాహన కల్పించాము.', target_audience: 'Mothers, Families & Youth', participants_count: 95, activity_date: '2026-08-19' },
    { id: 4, week_number: 4, title_en: 'Mosquito Defense: Dengue & Seasonal Illness Prevention', title_te: 'దోమల నివారణ ప్రచారం: డెంగ్యూ, మలేరియా అవగాహన', location_en: 'Residential Neighborhoods', location_te: 'నివాస ప్రాంతాలు', description_en: 'Organized community health drives to clear stagnant water from domestic containers. Encouraged weekly Friday Dry Days and distributed vector prevention guides.', description_te: 'నివాస ప్రాంతాల్లో నిల్వ ఉన్న నీటిని తొలగించి దోమలు వృద్ధి చెందకుండా డ్రై డే పాటించవలసిందిగా నివాసితులకు అవగాహన కల్పించాము.', target_audience: 'Residents & Community Members', participants_count: 140, activity_date: '2026-08-26' },
    { id: 5, week_number: 5, title_en: 'Safe Drinking Water & Clean Sanitation Practices', title_te: 'రక్షిత తాగునీరు & చెత్త నిర్వహణ అవగాహన', location_en: 'Community Wellness Center', location_te: 'కమ్యూనిటీ వెల్నెస్ కేంద్రం', description_en: 'Demonstrated domestic boiling and filtration techniques for drinking water. Promoted waste segregation and clean sanitation habits.', description_te: 'తాగునీటిని కాచి చల్లార్చడం, తడి మరియు పొడి చెత్తను వేరుచేసి అందించడం వల్ల వచ్చే ఆరోగ్య ప్రయోజనాలపై అవగాహన సదస్సు నిర్వహించాము.', target_audience: 'Households & Citizens', participants_count: 85, activity_date: '2026-09-02' },
    { id: 6, week_number: 6, title_en: 'Preventive Health Screening & Lifestyle Wellness', title_te: 'ఆరోగ్య పరీక్షలు & జీవనశైలి వ్యాధుల అవగాహన', location_en: 'Public Wellness Center', location_te: 'ప్రజా వెల్నెస్ కేంద్రం', description_en: 'Organized preventive screenings for blood pressure, sugar levels, and BMI for adults and seniors. Highlighted the benefits of regular walking and reducing salt intake.', description_te: 'ప్రజలకు బిపి, షుగర్ ప్రాథమిక పరీక్షలు చేసి, నిత్య వ్యాయామం మరియు ఉప్పు తగ్గించడం వల్ల కలిగే ప్రయోజనాలు వివరించాము.', target_audience: 'Adults, Seniors & Citizens', participants_count: 110, activity_date: '2026-09-09' },
    { id: 7, week_number: 7, title_en: 'Mental Well-Being, Daily Exercise & Stress Relief', title_te: 'ఆరోగ్యం, వ్యాయామం & మానసిక శ్రేయస్సు', location_en: 'Community Wellness Hub', location_te: 'కమ్యూనిటీ వెల్నెస్ హబ్', description_en: 'Conducted workshops on managing daily mental stress, practicing deep breathing, promoting 30-minute daily physical exercise, and controlling screen time.', description_te: 'ప్రజలలో వ్యక్తిగత పరిశుభ్రత, ఒత్తిడిని అధిగమించడం, మానసిక ఉల్లాసం మరియు మొబైల్ వాడకం తగ్గించడంపై వర్క్‌షాప్ నిర్వహించాము.', target_audience: 'Youth, Working Adults & Families', participants_count: 160, activity_date: '2026-09-16' },
    { id: 8, week_number: 8, title_en: 'Digital Health Platform Launch & Community Engagement', title_te: 'సమీక్ష, అభిప్రాయాల సేకరణ & డిజిటల్ వ్యవస్థ ప్రతిపాదన', location_en: 'Public Health Hub', location_te: 'పబ్లిక్ హెల్త్ హబ్', description_en: 'Reviewed community feedback and health metrics, and formally introduced the HACWMS digital portal for continuous health education and wellness monitoring.', description_te: 'అధ్యయన ఫలితాలను సమీక్షించి, ప్రజలందరికీ నిరంతరం ఆరోగ్య విద్యను అందించేలా ఈ HACWMS వెబ్ అప్లికేషన్‌ను రూపొందించడం ప్రారంభించాము.', target_audience: 'Community Leaders & Citizens', participants_count: 130, activity_date: '2026-09-23' }
  ]
};

// Mock Query Dispatcher
async function mockQuery(sql, params = []) {
  const normalized = sql.replace(/\s+/g, ' ').trim().toUpperCase();

  // 1. SELECT users by email
  if (normalized.includes('FROM USERS WHERE EMAIL = ?')) {
    const inputEmail = (params[0] || '').toLowerCase();
    const user = store.users.find(u =>
      u.email.toLowerCase() === inputEmail ||
      (inputEmail === 'admin@hacwms.org' && u.email === 'admin@healthpulse.org') ||
      (inputEmail === 'admin@healthpulse.org' && u.email === 'admin@hacwms.org')
    );
    return [user ? [user] : []];
  }

  // 2. SELECT users by id
  if (normalized.includes('FROM USERS WHERE ID = ?')) {
    const user = store.users.find(u => u.id === parseInt(params[0]));
    return [user ? [user] : []];
  }

  // 3. INSERT INTO users
  if (normalized.startsWith('INSERT INTO USERS')) {
    const newId = store.users.length + 1;
    const [name, email, password, phone, age, gender, area] = params;
    const newUser = {
      id: newId,
      name,
      email,
      password,
      phone,
      age,
      gender,
      area,
      role: 'user',
      created_at: new Date()
    };
    store.users.push(newUser);
    return [{ insertId: newId }];
  }

  // 4. UPDATE users
  if (normalized.startsWith('UPDATE USERS')) {
    const id = parseInt(params[params.length - 1]);
    const user = store.users.find(u => u.id === id);
    if (user) {
      if (params[0]) user.name = params[0];
      if (params[1]) user.phone = params[1];
      if (params[2]) user.age = params[2];
      if (params[3]) user.gender = params[3];
      if (params[4]) user.area = params[4];
    }
    return [{ affectedRows: 1 }];
  }

  // 5. SELECT all users
  if (normalized.includes('FROM USERS') && normalized.includes('ORDER BY CREATED_AT DESC')) {
    return [store.users.map(u => ({ ...u, password: undefined }))];
  }

  // 6. DELETE FROM users
  if (normalized.startsWith('DELETE FROM USERS WHERE ID = ?')) {
    store.users = store.users.filter(u => u.id !== parseInt(params[0]));
    return [{ affectedRows: 1 }];
  }

  // 7. Health Content
  if (normalized.startsWith('SELECT * FROM HEALTH_CONTENT')) {
    if (normalized.includes('WHERE CATEGORY = ?')) {
      const filtered = store.health_content.filter(c => c.category === params[0]);
      return [filtered];
    }
    if (normalized.includes('WHERE ID = ?')) {
      const item = store.health_content.find(c => c.id === parseInt(params[0]));
      return [item ? [item] : []];
    }
    return [store.health_content];
  }

  if (normalized.startsWith('INSERT INTO HEALTH_CONTENT')) {
    const newId = store.health_content.length + 1;
    const [category, title_en, title_te, summary_en, summary_te, content_en, content_te, image_url, author] = params;
    store.health_content.push({
      id: newId,
      category,
      title_en,
      title_te,
      summary_en,
      summary_te,
      content_en,
      content_te,
      image_url,
      author,
      created_at: new Date()
    });
    return [{ insertId: newId }];
  }

  // 8. Survey Questions
  if (normalized.startsWith('SELECT * FROM SURVEY_QUESTIONS')) {
    return [store.survey_questions];
  }

  // 9. Survey Responses
  if (normalized.startsWith('INSERT INTO SURVEY_RESPONSES')) {
    const newId = store.survey_responses.length + 1;
    const [user_id, participant_name, age, gender, area, answers] = params;
    store.survey_responses.push({
      id: newId,
      user_id,
      participant_name,
      age,
      gender,
      area,
      answers: typeof answers === 'string' ? JSON.parse(answers) : answers,
      submitted_at: new Date()
    });
    return [{ insertId: newId }];
  }

  if (normalized.includes('FROM SURVEY_RESPONSES WHERE USER_ID = ?')) {
    const res = store.survey_responses.filter(r => r.user_id === parseInt(params[0]));
    return [res];
  }

  if (normalized.startsWith('SELECT * FROM SURVEY_RESPONSES')) {
    return [store.survey_responses];
  }

  // 10. Quizzes
  if (normalized.startsWith('SELECT * FROM QUIZZES') || normalized.includes('FROM QUIZZES')) {
    return [store.quizzes];
  }

  if (normalized.includes('FROM QUIZ_QUESTIONS') && normalized.includes('QUIZ_ID = ?')) {
    const quizId = parseInt(params[0]) || 1;
    const qList = store.quiz_questions.filter(q => q.quiz_id === quizId);
    return [qList.length > 0 ? qList : store.quiz_questions.slice(0, 5)];
  }

  if (normalized.includes('FROM QUIZ_QUESTIONS') && normalized.includes('WHERE ID IN')) {
    const rawIds = Array.isArray(params[0]) ? params[0] : [params[0]];
    const ids = (rawIds.flat ? rawIds.flat() : rawIds).map(Number);
    const items = store.quiz_questions.filter(q => ids.includes(q.id));
    return [items.length > 0 ? items : store.quiz_questions.slice(0, 5)];
  }

  if (normalized.includes('FROM QUIZ_QUESTIONS')) {
    return [store.quiz_questions.slice(0, 5)];
  }

  if (normalized.startsWith('INSERT INTO QUIZ_RESULTS')) {
    const newId = store.quiz_results.length + 1;
    const [user_id, participant_name, quiz_id, score, total, badge] = params;
    store.quiz_results.push({
      id: newId,
      user_id,
      participant_name,
      quiz_id: parseInt(quiz_id),
      score: parseInt(score),
      total: parseInt(total),
      badge,
      completed_at: new Date()
    });
    return [{ insertId: newId }];
  }

  if (normalized.includes('FROM QUIZ_RESULTS QR')) {
    if (normalized.includes('WHERE QR.USER_ID = ?')) {
      const results = store.quiz_results
        .filter(r => r.user_id === parseInt(params[0]))
        .map(r => {
          const q = store.quizzes.find(qz => qz.id === r.quiz_id);
          return { ...r, quiz_title_en: q?.title_en || 'Quiz', quiz_title_te: q?.title_te || 'క్విజ్' };
        });
      return [results];
    }
    const results = store.quiz_results.map(r => {
      const q = store.quizzes.find(qz => qz.id === r.quiz_id);
      return { ...r, quiz_title_en: q?.title_en || 'Quiz', quiz_title_te: q?.title_te || 'క్విజ్' };
    });
    return [results];
  }

  // 11. Feedback
  if (normalized.startsWith('INSERT INTO FEEDBACK')) {
    const newId = store.feedback.length + 1;
    const [user_id, name, email, rating, category, comments] = params;
    store.feedback.push({
      id: newId,
      user_id,
      name,
      email,
      rating: parseInt(rating),
      category,
      comments,
      created_at: new Date()
    });
    return [{ insertId: newId }];
  }

  if (normalized.startsWith('SELECT * FROM FEEDBACK')) {
    return [store.feedback];
  }

  if (normalized.startsWith('DELETE FROM FEEDBACK WHERE ID = ?')) {
    store.feedback = store.feedback.filter(f => f.id !== parseInt(params[0]));
    return [{ affectedRows: 1 }];
  }

  // 12. Reminders
  if (normalized.includes('FROM REMINDERS WHERE USER_ID = ?')) {
    const list = store.reminders.filter(r => r.user_id === parseInt(params[0]));
    return [list];
  }

  if (normalized.startsWith('INSERT INTO REMINDERS')) {
    const newId = store.reminders.length + 1;
    const [user_id, title_en, title_te, reminder_type, frequency, target_time] = params;
    store.reminders.push({
      id: newId,
      user_id,
      title_en,
      title_te,
      reminder_type,
      frequency,
      target_time,
      is_active: 1,
      created_at: new Date()
    });
    return [{ insertId: newId }];
  }

  if (normalized.includes('UPDATE REMINDERS SET IS_ACTIVE = NOT IS_ACTIVE')) {
    const rem = store.reminders.find(r => r.id === parseInt(params[0]));
    if (rem) rem.is_active = rem.is_active ? 0 : 1;
    return [{ affectedRows: 1 }];
  }

  if (normalized.includes('DELETE FROM REMINDERS WHERE ID = ?')) {
    store.reminders = store.reminders.filter(r => r.id !== parseInt(params[0]));
    return [{ affectedRows: 1 }];
  }

  // 13. Activities
  if (normalized.startsWith('SELECT * FROM ACTIVITIES')) {
    return [store.activities];
  }

  // 14. Admin counts
  if (normalized.includes('COUNT(*) AS TOTALUSERS')) {
    return [[{ totalUsers: store.users.filter(u => u.role === 'user').length }]];
  }
  if (normalized.includes('COUNT(*) AS TOTALSURVEYS')) {
    return [[{ totalSurveys: store.survey_responses.length }]];
  }
  if (normalized.includes('COUNT(*) AS TOTALQUIZZES')) {
    return [[{ totalQuizzes: store.quiz_results.length }]];
  }
  if (normalized.includes('COUNT(*) AS TOTALFEEDBACK')) {
    return [[{ totalFeedback: store.feedback.length }]];
  }
  if (normalized.includes('AVG(RATING) AS AVGRATING')) {
    const avg = store.feedback.length > 0
      ? store.feedback.reduce((sum, f) => sum + f.rating, 0) / store.feedback.length
      : 5.0;
    return [[{ avgRating: avg }]];
  }
  if (normalized.includes('COUNT(*) AS TOTALACTIVITIES')) {
    return [[{ totalActivities: store.activities.length }]];
  }

  // Fallback
  return [[]];
}

module.exports = { mockQuery, store };

