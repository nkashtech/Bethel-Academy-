// The choices the website offers. Keep in step with frontend/src/content/site.js.
const PATHWAYS = {
  foundation: 'Grade R – 3 (Foundation Phase – R2,800/pm)',
  intermediate: 'Grade 4 – 6 (Intermediate Phase – R3,000/pm)',
  'lower-secondary': 'Grade 7 – 9 (Lower Secondary Phase – R3,300/pm)',
  igcse: 'IGCSE Grade 10 (Senior Phase Year 1 – R3,900/pm)',
};
const GRADES = ['Grade R', ...Array.from({ length: 10 }, (_, i) => `Grade ${i + 1}`)];
const CURRICULA = ['CAPS', 'IEB', 'Cambridge', 'Home Education'];
const START_DATES = ['Immediate', 'Next Term', 'Next Academic Year'];
const TIMES = ['Morning (08:00 – 12:00)', 'Afternoon (12:00 – 16:00)'];

module.exports = { PATHWAYS, GRADES, CURRICULA, START_DATES, TIMES };
