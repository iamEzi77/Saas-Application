export const sampleUsers = [
  { id: "u1",  name: "Chad M.",    userType: "administrator", role: "Admin",         status: "Approved", pm: "red"},
  { id: "u2",  name: "Camilla M.", userType: "Standard User", role: "Admin",         status: "Approved", pm: "orange" },
  { id: "u3",  name: "Sam T.",     userType: "Basic User", role: "Standard User", status: "Approved", pm: "yellow" },
  { id: "u4",  name: "Eric R.",    userType: "Basic User", role: "Standard User", status: "Approved", pm: "green" },
  { id: "u5",  name: "Norm G.",    userType: "Basic User", role: "Standard User", status: "Approved", pm: "green" },
  { id: "u16", name: "Alice B.",   userType: "administrator", role: "Admin",      status: "Approved", pm: "red" },
];

export function getUsersList() {
  return sampleUsers;
}

// Requests
export const sampleRequests = {
  u1: [
    { id: "M40",  type: "Maintenance", priority: "High",   date: "4/21/2023", status: "In Process", submitted: "Chad M", assigned: "Eric R", description: "Belt is loose and needs to be retightened" },
    { id: "S010", type: "Safety",      priority: "High",   date: "3/22/2023", status: "In Review",  submitted: "Chad M", assigned: "Josh W", description: "Safety guard is missing" },
    { id: "M053", type: "Maintenance", priority: "Medium", date: "5/1/2023",  status: "In Process", submitted: "Chad M", assigned: "Chad M", description: "Air hose is leaking" },
  ],
  u2:[
    { id: "M052", type: "Maintenance", priority: "Medium", date: "4/30/2023", status: "On Hold",    submitted: "Eric R", assigned: "Chad M", description: "Tool is dull" },
    { id: "M10",  type: "Maintenance", priority: "Low",    date: "1/1/2023",  status: "Resolved",   submitted: "Eric R", assigned: "Chad M", description: "Making a funny noise" },
  ],
  u16: [
    { id: "A101", type: "Maintenance", priority: "High",   date: "5/1/2023",  status: "In Process", submitted: "Alice B", assigned: "Chad M", description: "Check conveyor belt" },
    { id: "A102", type: "Safety",      priority: "Medium", date: "5/2/2023",  status: "Pending",    submitted: "Alice B", assigned: "Eric R", description: "Replace worn safety signs" },
  ],
};

// Preventive Maintenance
export const samplePM = {
  u1: [
    { equipment: "E1", status: "Overdue",  task: "Grease Bearings",     desc: "Use 5257 bearing grease",                                   due: "4/20/2023" },
    { equipment: "E1", status: "Overdue",  task: "Check Belt Tension",  desc: "Belt should deflect 1 inch under 10 lbs of force",          due: "5/1/2023" },
    { equipment: "E3", status: "Upcoming", task: "Calibrate Head",      desc: "Run calibration program XYX",                                due: "5/15/2023" },
    { equipment: "E4", status: "Good",     task: "Charge Oil",          desc: "Drain oil and refill with SAE-20",                           due: "7/20/2023" },
    { equipment: "E3", status: "Good",     task: "Check Air Pressure",  desc: "Check Pressure Gauge near machine and verify it is",         due: "8/5/2023" },
  ],
  u16: [
    { equipment: "E2", status: "Overdue",  task: "Inspect Valves",      desc: "Check all safety valves",                                     due: "5/5/2023" },
    { equipment: "E5", status: "Good",     task: "Lubricate Gears",     desc: "Use recommended gear oil",                                     due: "6/10/2023" },
  ],
};

// Teams
export const sampleTeams = {
  u1: [
    { role: "Team Member", team: "T1", description: "Team 1", teamType: "Safety",      priority: 2.0 },
    { role: "Team Lead",   team: "T2", description: "Team 2", teamType: "Maintenance", priority: 1.5 },
    { role: "Team Member", team: "T4", description: "Team 3", teamType: "Cleaning",    priority: 0.95 },
  ],
  u16: [
    { role: "Team Lead",   team: "T5", description: "Team 5", teamType: "Safety",      priority: 2.0 },
    { role: "Team Member", team: "T6", description: "Team 6", teamType: "Maintenance", priority: 1.0 },
  ],
};

// Training
export const sampleTraining = {
  u1: [
    { operation: "Motor Assembly",   description: "Assemble motor",        certificationDate: "7/5/2022",  skillLevel: "Expert" },
    { operation: "Pump Assembly",    description: "Assemble all pumps",    certificationDate: "3/21/2023", skillLevel: "Intermediate" },
    { operation: "Bracket Assembly", description: "Bracket Assembly",      certificationDate: "7/15/2021", skillLevel: "Intermediate" },
    { operation: "Frame Assembly",   description: "Frame Assembly",        certificationDate: "5/14/2020", skillLevel: "Beginner" },
  ],
  u16: [
    { operation: "Valve Installation", description: "Install all valves",   certificationDate: "4/10/2023", skillLevel: "Intermediate" },
    { operation: "Pump Testing",       description: "Test pump performance", certificationDate: "5/1/2023", skillLevel: "Advanced" },
  ],
};
