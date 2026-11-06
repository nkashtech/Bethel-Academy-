// Every word on the website, taken from "Bethel House of God Academy Website Structure.docx" (copy in docs/).
// Change wording, fees or contact details here and every page picks it up.

export const school = {
  name: 'Bethel House of God Academy',
  short: 'BHGA',
  motto: 'Real Christian Values, Real life Education',
  email: 'bethelhouseofgodacademy@gmail.com',
  // Replace with the real number. WhatsApp links use the digits only.
  phone: '+27 00 000 0000',
  whatsapp: '27000000000',
  officeHours: 'Monday – Friday, 08:00 – 16:00 (SAST)',
  registrationFee: 'R1,000',
}

export const nav = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/academics', label: 'Academics & Programs' },
  { to: '/exam-guide', label: 'Private Candidate & Exam Guide' },
  { to: '/fees', label: 'Tuition & Fees' },
  { to: '/admissions', label: 'Admissions & Contact' },
]

export const disclaimer =
  'Bethel House of God Academy (BHGA) is an independent online learning platform and tuition provider. We provide curriculum alignment, virtual instruction, and academic support for the Cambridge International syllabus. Bethel House of God Academy is not an accredited Cambridge International School and does not directly award examination board certificates. Students complete their tuition online with us and register as Private Candidates at accredited open Cambridge examination centres (such as British Council South Africa or approved local open centres) to sit their final external board examinations.'

// Free Unsplash photos used as placeholders until the school has its own. Swap the ids for your own files in /public.
const u = (id, w = 640, h = 900) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&h=${h}&q=70`
export const photos = {
  girlLaptop: u('photo-1758525861793-f278aacf6bb5'),
  girlStudy: u('photo-1758525861725-e0fcc0c1301c'),
  boysBackpacks: u('photo-1548102245-c79dbcfa9f92'),
  boySmile: u('photo-1539887523427-bb750641ad29'),
  girlSmile: u('photo-1617056239820-8ce90ba48193'),
  girlsTablet: u('photo-1744973149455-adf9278070da'),
  teenGirl: u('photo-1744973055670-e8ebb6261541'),
  graduates: u('photo-1594750852563-5ed8e0421d40', 1200, 900),
  graduateKid: u('photo-1627679673481-470c02807cc0'),
  boyWriting: u('photo-1529390079861-591de354faf5'),
  girlReading: u('photo-1543661976-ce48a8d34c22'),
}

export const home = {
  hero: {
    headline: 'Real Christian Values, Real Life Education',
    sub: 'Empowering Grade R to High School learners across South Africa through high-quality, faith-based Cambridge online tuition on our interactive Edubridge platform.',
  },
  welcome:
    'At Bethel House of God Academy, we nurture the whole child—academically, spiritually, and morally. We provide a safe, respectful, and inclusive virtual learning environment that builds a strong foundation for life-long learning. Our structured online tuition program supports home education families by offering rigorous, Cambridge-aligned academic instruction delivered by dedicated educators.',
  advantages: [
    { icon: 'ShieldCheck', title: 'Safe & Inclusive Environment', text: 'We provide a respectful online campus where learners grow in confidence, critical thinking, and Christian leadership under the guidance of passionate educators.' },
    { icon: 'MonitorPlay', title: 'Powered by Edubridge E-Learning', text: 'Our students access interactive live virtual classes, on-demand lesson recordings, digital study packs, and comprehensive revision resources anytime, anywhere.', link: '/edubridge' },
    { icon: 'Globe2', title: 'Global Cambridge Framework', text: 'We prepare learners for internationally recognized Cambridge qualifications, paving the way for university admission in South Africa (via USAf Matriculation Exemption) and globally.' },
    { icon: 'ClipboardCheck', title: '100% Exam-Based (No Continuous SBA Stress)', text: 'Because Cambridge private candidate pathways are evaluated through final external board examinations, families avoid the administrative burden and continuous portfolio marking costs of traditional distance schools.' },
  ],
  steps: [
    { title: 'Enroll with BHGA', text: 'Register your child for online tuition and receive immediate access to the Edubridge E-Learning platform, live classes, and study packs.' },
    { title: 'Learn & Master Content', text: 'Participate in interactive daily virtual lessons, complete internal progress assessments, and work through past-paper drills guided by subject teachers.' },
    { title: 'Register for External Board Exams', text: 'When ready to write official Cambridge examinations (IGCSE / AS Level), register directly as a Private Candidate at an accredited host centre near you (such as British Council SA or local approved open centres).' },
    { title: 'Earn Accredited Certificates', text: "Receive official Cambridge UK certificates and convert your results through USAf (Universities South Africa) for direct entrance into local or international bachelor's degree programs." },
  ],
}

// One list drives the home cards, the fee table, the academics page and the application form.
export const pathways = [
  {
    id: 'foundation', grades: 'Grade R – Grade 3', short: 'Grade R – 3', phase: 'Foundation Phase', fee: 'R2,800', photo: 'boysBackpacks',
    summary: 'Building strong foundational literacy, numeracy, and core inquiry in a supportive, engaging digital classroom.',
    intro: 'Our early learning program provides a structured, gentle introduction to online education, focusing on reading confidence, numerical comprehension, and creative curiosity.',
    lists: [
      { label: 'Core Focus Areas', items: ['Foundation English', 'Early Mathematics', 'Environmental Science', 'Creative Arts', 'Values Education'] },
    ],
    format: { label: 'Learning Format', text: 'Live daily virtual classes, guided interactive exercises, and teacher-assessed unit reviews.' },
  },
  {
    id: 'intermediate', grades: 'Grade 4 – Grade 6', short: 'Grade 4 – 6', phase: 'Intermediate Phase', stage: 'Primary Stage', fee: 'R3,000', photo: 'girlStudy',
    summary: 'Consolidating core concepts in English, Mathematics, Science, and Humanities to prepare learners for upper primary benchmarks.',
    intro: 'During the primary years, learners transition from basic literacy to conceptual understanding across core subjects.',
    lists: [
      { label: 'Core Subjects', items: ['English Language', 'Mathematics', 'Natural Sciences', 'Humanities', 'Digital Literacy'] },
    ],
    format: { label: 'Learning Format', text: 'Structured weekly schedules on the Edubridge platform, live teacher instruction, and diagnostic unit checks.' },
  },
  {
    id: 'lower-secondary', grades: 'Grade 7 – Grade 9', short: 'Grade 7 – 9', phase: 'Lower Secondary Phase', fee: 'R3,300', photo: 'boyWriting',
    summary: 'Developing advanced analytical skills across languages, mathematics, sciences, and electives as learners transition into high school.',
    intro: 'This stage bridges primary education with high school specialization, building analytical reasoning, scientific inquiry, and structured essay-writing skills.',
    lists: [
      { label: 'Core Subjects', items: ['Advanced English', 'Mathematics', 'General Science (Physics, Chemistry, Biology)', 'History', 'Geography', 'ICT'] },
    ],
    format: { label: 'Goal', text: 'Building academic confidence and subject readiness for IGCSE selection.' },
  },
  {
    id: 'igcse', grades: 'Grades 10 – 12', short: 'IGCSE Grade 10 – 12', phase: 'IGCSE & Senior Phase', feePhase: 'Senior High School (Up to 8 Subjects)', fee: 'R3,900', photo: 'teenGirl',
    summary: 'Comprehensive preparation across core compulsory subjects and specialized streams (Sciences, Commercials, Humanities) for international board exams and university entrance.',
    intro: 'At high school level, BHGA offers comprehensive teaching across compulsory core subjects and specialized elective streams.',
    lists: [
      { label: 'Compulsory Core Subjects', items: ['English Language (Compulsory)', 'Mathematics (Compulsory)'] },
    ],
    streams: [
      { name: 'Sciences', items: ['Physics', 'Chemistry', 'Biology'] },
      { name: 'Commercials', items: ['Accounting', 'Business Studies', 'Economics'] },
      { name: 'Humanities & IT', items: ['Geography', 'Computer Science'] },
    ],
    usaf: 'For learners aiming for South African university entrance after high school, we guide students through the required 4 AS Level + 1 IGCSE subject selection (covering First Language, Second Language, Quantitative/Science, and Academic Electives) to satisfy Universities South Africa (USAf) Foreign Matriculation Exemption requirements.',
  },
]

export const about = {
  title: 'About Bethel House of God Academy',
  subtitle: 'Building a Solid Foundation for Academic Excellence & Christian Leadership',
  vision: 'Our vision is to provide a platform for academic excellence, spiritual profundity, skills development and sound character development. We aim to produce children who will bring a positive impact to the society.',
  mission: 'Our Mission is to provide high quality education and childcare in a safe, respectful and inclusive environment that builds a foundation for life-long learning.',
  faithLead: 'We believe in the role of the Holy Spirit in raising Christian leaders in these last days.',
  faith: 'At Bethel House of God Academy, our Christian foundation informs everything we do. We instill values of integrity, respect, diligence, and service in our learners, ensuring that academic growth goes hand in hand with moral and spiritual maturity.',
  values: ['Integrity', 'Respect', 'Diligence', 'Service'],
  structureLead: 'The success of any educational institution depends on the strength of its leadership, governance, and the dedicated team occupying key operational roles.',
  structure: 'Bethel House of God Academy is built on a solid organizational structure that supports continuous growth, academic integrity, and student care. We employ competent, highly qualified teaching and administrative staff who share our commitment to excellence.',
  departments: [
    { icon: 'Blocks', name: 'Foundation Phase Specialists', scope: 'Grade R – Grade 3', text: 'Nurturing early literacy, numeracy, and developmental foundations.' },
    { icon: 'FlaskConical', name: 'Mathematics & Sciences Faculty', text: 'Delivering rigorous, conceptual instruction in Mathematics, Physics, Chemistry, and Biology.' },
    { icon: 'Languages', name: 'Languages Department', text: 'Fostering communication excellence in English and Afrikaans.' },
    { icon: 'Calculator', name: 'Commercials Department', text: 'Guiding high school learners through Accounting, Business Studies, and Economics.' },
    { icon: 'Landmark', name: 'Humanities Faculty', text: 'Educating learners in Geography, History, Global Perspectives, and Physical Education.' },
  ],
}

export const examGuide = {
  title: 'Understanding the Private Candidate Pathway',
  subtitle: 'Transparent Guidance on How Cambridge Board Exams & Qualifications Work',
  platform: [
    'Bethel House of God Academy operates as an independent online tuition and learning support platform. We provide complete daily academic delivery, virtual live teaching, Edubridge platform access, past-paper drills, and progress tracking.',
    'We do not charge high administrative board affiliation surcharges. Instead, our model allows parents to pay purely for quality teaching, while board examination registration is completed independently when the learner is ready.',
  ],
  steps: [
    { icon: 'Laptop', title: 'Tuition at BHGA', text: 'Learners complete their daily learning, live classes, and revision online with Bethel House of God Academy.' },
    { icon: 'MapPin', title: 'Selecting an Exam Centre', text: 'When ready to write board exams (such as Checkpoints, IGCSE, or AS Levels), parents register their child as a Private Candidate at an accredited open Cambridge examination centre (such as British Council South Africa or approved local open centres).' },
    { icon: 'PenLine', title: 'Sitting Examinations', text: 'The student physically sits for their external board papers during the official May/June or October/November examination series.' },
    { icon: 'Award', title: 'Receiving UK Qualifications', text: 'Cambridge International issues official hardcopy certificates directly to the examination centre for collection.' },
  ],
  universities: ['UCT', 'Wits', 'UP', 'Stellenbosch', 'Unisa'],
  recognition: 'Cambridge qualifications are fully recognized by all South African public universities (such as UCT, Wits, UP, Stellenbosch, Unisa, etc.) and international institutions worldwide.',
  exemptionLead: "To qualify for a South African Foreign Matriculation Exemption (Bachelor's Degree Pass equivalent), high school learners complete:",
  exemption: '4 AS Levels (Grades A–D) + 1 IGCSE (Grades A*–C)',
  exemptionAfter: 'Once board results are released in January, certificates are submitted to Universities South Africa (USAf) to receive a formal Matriculation Exemption Certificate for direct university enrollment.',
}

export const fees = {
  title: 'Transparent Tuition & Fee Structure',
  subtitle: 'Quality International Online Education Made Accessible',
  registration: 'Once-off non-refundable administrative onboarding fee per learner',
  includes: [
    'Access to live daily virtual classes led by qualified educators.',
    '24/7 access to the Edubridge E-Learning platform (recorded lessons, study notes, and exercises).',
    'Comprehensive subject coverage across core, language, science, commercial, and humanities streams.',
    'Regular internal progress checks, mock examination papers, and tutor feedback.',
    'Parent support and academic progress tracking.',
  ],
  examNote: 'Monthly tuition fees cover all online instruction, platform access, learning materials, and internal academic support provided by Bethel House of God Academy. Official external Cambridge Board Examination fees (written at Checkpoint, IGCSE, or AS Level) are separate and are paid directly by parents to the accredited exam host venue (e.g., British Council South Africa) at the time of exam entry.',
}

export const edubridge = {
  title: 'Edubridge E-Learning Infrastructure',
  subtitle: 'Innovative, Interactive Virtual Learning for Every Student',
  features: [
    { icon: 'Video', title: 'Live Virtual Classrooms', text: 'Interactive daily video lectures with real-time teacher-student interaction.' },
    { icon: 'Library', title: '24/7 On-Demand Video Library', text: 'Every live class is recorded and stored so students can revisit complex concepts during revision.' },
    { icon: 'BookOpenText', title: 'Digital Workbooks & Study Packs', text: 'Downloadable notes, exercise sets, and textbook guides aligned with syllabus codes.' },
    { icon: 'Archive', title: 'Past Paper Vault', text: 'Access to official past exam papers, specimen papers, and marking schemes for exam drills.' },
    { icon: 'LayoutDashboard', title: 'Parent & Learner Dashboard', text: 'Clear visibility into attendance records, submission deadlines, and assessment scores.' },
  ],
}

export const curricula = ['Cambridge', 'CAPS (South African national)', 'IEB', 'Home education / Other']
export const gradeOptions = ['Grade R', ...Array.from({ length: 12 }, (_, i) => `Grade ${i + 1}`)]
export const startOptions = ['Immediate', 'Next Term', 'Next Academic Year']

// Answers taken from the Website Structure document, for the home page FAQ.
export const faqs = [
  { q: 'Is Bethel House of God Academy an accredited Cambridge school?', a: 'No. BHGA is an independent online learning platform and tuition provider. We provide curriculum alignment, virtual instruction and academic support for the Cambridge International syllabus. Learners register as Private Candidates at accredited open Cambridge examination centres (such as British Council South Africa) to write their final board examinations.' },
  { q: 'Are Cambridge exam fees included in the monthly tuition?', a: 'No. Monthly tuition covers all online instruction, platform access, learning materials and internal academic support. Official Cambridge board examination fees (Checkpoint, IGCSE or AS Level) are paid directly by parents to the accredited exam host venue at the time of exam entry.' },
  { q: 'Where and when does my child write board exams?', a: 'When ready, parents register their child as a Private Candidate at an accredited open Cambridge centre near them. Learners sit their papers in person during the official May/June or October/November examination series, and Cambridge sends the certificates to the centre for collection.' },
  { q: 'Can my child enter a South African university?', a: 'Yes. Cambridge qualifications are recognised by all South African public universities. Learners who complete 4 AS Levels (grades A–D) and 1 IGCSE (grades A*–C) can apply to Universities South Africa (USAf) for a Foreign Matriculation Exemption Certificate.' },
  { q: 'What does tuition include?', a: 'Live daily virtual classes with qualified educators, 24/7 access to the Edubridge E-Learning platform (recordings, notes and exercises), full subject coverage, regular progress checks and mock exams, and parent support with progress tracking.' },
  { q: 'Is there a registration fee?', a: 'Yes, a once-off, non-refundable R1,000 administrative onboarding fee per learner.' },
]

export const subjects = ['English', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Accounting', 'Business Studies', 'Economics', 'Geography', 'History', 'Computer Science', 'Afrikaans', 'Global Perspectives', 'Creative Arts', 'Values Education']
