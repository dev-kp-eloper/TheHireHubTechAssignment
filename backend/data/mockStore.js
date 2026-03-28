import mongoose from 'mongoose';

const now = () => new Date();
const days = (d) => new Date(Date.now() + d * 86400000);

function newOid() {
  return new mongoose.Types.ObjectId().toString();
}

/** Deterministic seed IDs (valid 24-char hex) */
const J = [
  '64f0a1b2c3d4e5f678901234',
  '64f0a1b2c3d4e5f678901235',
  '64f0a1b2c3d4e5f678901236',
  '64f0a1b2c3d4e5f678901237',
  '64f0a1b2c3d4e5f678901238',
  '64f0a1b2c3d4e5f678901239',
];

function jobSeed() {
  const t = now();
  return [
    {
      _id: J[0],
      title: 'Senior Frontend Developer',
      department: 'Engineering',
      location: 'San Francisco, CA',
      openPositions: 2,
      hiringManager: 'Sarah Johnson',
      description:
        'We are looking for an experienced frontend developer with expertise in React and TypeScript.',
      requirements: ['React', 'TypeScript', '5+ years experience', 'CSS/Tailwind'],
      createdAt: t,
      updatedAt: t,
    },
    {
      _id: J[1],
      title: 'Full Stack Engineer',
      department: 'Engineering',
      location: 'New York, NY',
      openPositions: 3,
      hiringManager: 'Mike Chen',
      description: 'Build scalable web applications using MERN stack.',
      requirements: ['Node.js', 'React', 'MongoDB', 'Docker', '3+ years experience'],
      createdAt: t,
      updatedAt: t,
    },
    {
      _id: J[2],
      title: 'Product Manager',
      department: 'Product',
      location: 'Remote',
      openPositions: 1,
      hiringManager: 'Emma Davis',
      description: 'Lead product strategy and roadmap for our SaaS platform.',
      requirements: ['Product Management', 'Stakeholder Management', '5+ years', 'Analytics'],
      createdAt: t,
      updatedAt: t,
    },
    {
      _id: J[3],
      title: 'Backend Developer',
      department: 'Engineering',
      location: 'Austin, TX',
      openPositions: 2,
      hiringManager: 'James Wilson',
      description: 'Build robust backend services with Node.js and TypeScript.',
      requirements: ['Node.js', 'TypeScript', 'REST APIs', '3+ years experience'],
      createdAt: t,
      updatedAt: t,
    },
    {
      _id: J[4],
      title: 'UI/UX Designer',
      department: 'Design',
      location: 'Los Angeles, CA',
      openPositions: 1,
      hiringManager: 'Lisa Wong',
      description: 'Design beautiful and intuitive user interfaces.',
      requirements: ['Figma', 'UI Design', 'UX Research', '4+ years experience'],
      createdAt: t,
      updatedAt: t,
    },
    {
      _id: J[5],
      title: 'DevOps Engineer',
      department: 'Infrastructure',
      location: 'Remote',
      openPositions: 2,
      hiringManager: 'Robert King',
      description: 'Manage and optimize our cloud infrastructure and CI/CD pipelines.',
      requirements: ['Docker', 'Kubernetes', 'AWS', 'CI/CD', '4+ years experience'],
      createdAt: t,
      updatedAt: t,
    },
  ];
}

function candidateSeed() {
  const rows = [
    [J[0], 'Alex Thompson', 'alex.thompson@email.com', 'Frontend Engineer', 'Tech Solutions Inc', 6, 'Interview', 92, ['React', 'TypeScript', 'Tailwind CSS']],
    [J[0], 'Jordan Martinez', 'jordan.m@email.com', 'React Developer', 'StartupXYZ', 3, 'Shortlisted', 85, ['React', 'JavaScript', 'CSS']],
    [J[0], 'Casey Wilson', 'casey.wilson@email.com', 'Junior Frontend Developer', 'Web Agency Pro', 1, 'Applied', 68, ['React', 'HTML/CSS']],
    [J[0], 'Emma Rodriguez', 'emma.r@email.com', 'Senior UI Developer', 'Design Studio', 7, 'Offered', 90, ['React', 'TypeScript', 'Next.js']],
    [J[0], 'Priya Sharma', 'priya.s@email.com', 'Frontend Lead', 'FinTech Co', 8, 'Hired', 96, ['React', 'TypeScript', 'GraphQL']],
    [J[0], 'Noah Kim', 'noah.kim@email.com', 'Software Engineer', 'Remote First Inc', 4, 'Applied', 74, ['React', 'Vue', 'CSS']],
    [J[0], 'Olivia Grant', 'olivia.g@email.com', 'UI Engineer', 'Media Group', 5, 'Shortlisted', 82, ['React', 'Storybook', 'Jest']],
    [J[1], 'Morgan Lee', 'morgan.lee@email.com', 'Full Stack Developer', 'Cloud Systems Ltd', 7, 'Offered', 95, ['Node.js', 'React', 'MongoDB']],
    [J[1], 'Taylor Brown', 'taylor.brown@email.com', 'Backend Engineer', 'Enterprise Corp', 5, 'Interview', 88, ['Node.js', 'PostgreSQL', 'AWS']],
    [J[1], 'Riley Anderson', 'riley.anderson@email.com', 'Senior Full Stack Engineer', 'Tech Giants Inc', 8, 'Hired', 94, ['Node.js', 'React', 'Kubernetes']],
    [J[1], 'David Chen', 'david.chen@email.com', 'Full Stack Developer', 'Web Solutions', 4, 'Applied', 72, ['Node.js', 'Express', 'MongoDB']],
    [J[1], 'Avery Brooks', 'avery.b@email.com', 'Full Stack Dev', 'SaaS Labs', 5, 'Shortlisted', 79, ['Node.js', 'React', 'Docker']],
    [J[1], 'Quinn Reed', 'quinn.r@email.com', 'Engineer', 'Data Co', 3, 'Interview', 81, ['Node.js', 'React', 'Redis']],
    [J[1], 'Skyler Fox', 'skyler.f@email.com', 'Senior Engineer', 'Platform Inc', 9, 'Applied', 88, ['Node.js', 'TypeScript', 'AWS']],
    [J[2], 'Sam Patel', 'sam.patel@email.com', 'Senior Product Manager', 'SaaS Unicorn', 6, 'Interview', 87, ['Product Strategy', 'Analytics']],
    [J[2], 'Nicole Santos', 'nicole.s@email.com', 'Product Manager', 'Growth Ventures', 4, 'Shortlisted', 80, ['User Research', 'Data Analysis']],
    [J[2], 'Blake Torres', 'blake.t@email.com', 'PM', 'HealthTech', 5, 'Applied', 73, ['Roadmaps', 'Agile']],
    [J[2], 'Jamie Liu', 'jamie.liu@email.com', 'Group PM', 'E-commerce', 7, 'Offered', 91, ['B2B', 'Analytics']],
    [J[3], 'Kevin Zhang', 'kevin.z@email.com', 'Senior Backend Developer', 'Finance Systems', 7, 'Interview', 91, ['Node.js', 'TypeScript', 'PostgreSQL']],
    [J[3], 'Sarah Mitchell', 'sarah.m@email.com', 'Backend Developer', 'Tech Startup', 3, 'Applied', 76, ['Node.js', 'Express', 'MongoDB']],
    [J[3], 'Marcus Johnson', 'marcus.j@email.com', 'Principal Engineer', 'Large Enterprise', 10, 'Offered', 96, ['Node.js', 'System Design', 'AWS']],
    [J[3], 'Dana White', 'dana.w@email.com', 'Backend Engineer', 'Payments Co', 4, 'Shortlisted', 78, ['Node.js', 'Kafka', 'SQL']],
    [J[3], 'Reese Morgan', 'reese.m@email.com', 'API Developer', 'API First', 5, 'Hired', 89, ['REST', 'GraphQL', 'Node.js']],
    [J[3], 'Cameron Diaz', 'cameron.d@email.com', 'Backend Dev', 'Logistics', 2, 'Applied', 65, ['Node.js', 'MongoDB']],
    [J[4], 'Lisa Park', 'lisa.park@email.com', 'UX Designer', 'Design Co', 5, 'Interview', 89, ['Figma', 'User Research']],
    [J[4], 'James Foster', 'james.f@email.com', 'Junior UI Designer', 'Creative Agency', 2, 'Shortlisted', 70, ['Figma', 'Adobe XD']],
    [J[4], 'Morgan Blake', 'morgan.blake@email.com', 'Product Designer', 'Startup', 4, 'Applied', 75, ['Figma', 'Prototyping']],
    [J[4], 'Riley Chen', 'riley.c@email.com', 'Senior Designer', 'Agency', 6, 'Offered', 92, ['Design Systems', 'Figma']],
    [J[5], 'Christopher Lee', 'chris.lee@email.com', 'Senior DevOps Engineer', 'Cloud Infrastructure Inc', 8, 'Interview', 93, ['Docker', 'Kubernetes', 'AWS']],
    [J[5], 'Patricia Wang', 'patricia.w@email.com', 'DevOps Engineer', 'Tech Firm', 4, 'Applied', 78, ['Docker', 'AWS', 'Linux']],
    [J[5], 'Richard Brown', 'richard.b@email.com', 'Infrastructure Manager', 'Enterprise Systems', 9, 'Hired', 97, ['Docker', 'Kubernetes', 'GCP']],
    [J[5], 'Jamie Ortiz', 'jamie.o@email.com', 'SRE', 'Observability Co', 5, 'Shortlisted', 84, ['K8s', 'Prometheus']],
    [J[5], 'Drew Hayes', 'drew.h@email.com', 'Platform Engineer', 'ScaleUp', 6, 'Interview', 86, ['Terraform', 'AWS']],
    [J[0], 'Sage Miller', 'sage.m@email.com', 'Frontend Dev', 'Retail Tech', 3, 'Rejected', 58, ['React', 'CSS']],
    [J[2], 'River Stone', 'river.s@email.com', 'Associate PM', 'Mobile App', 2, 'Rejected', 55, ['Analytics']],
  ];

  const cid = (i) => `64f0c00000000000000${String(i).padStart(4, '0')}`;
  return rows.map(([jobId, name, email, currentRole, company, experience, stage, matchScore, skills], i) => {
    const _id = cid(i + 1);
    const notes =
      stage === 'Hired'
        ? ['Strong hire', 'Offer accepted']
        : stage === 'Rejected'
          ? ['Did not meet bar']
          : [`Screening note ${i + 1}`, 'Referral from employee'];
    return {
      _id,
      jobId,
      name,
      email,
      phone: `+1-555-${String(2000 + i).padStart(4, '0')}`,
      currentRole,
      company,
      experience,
      skills,
      resume: '',
      stage,
      matchScore,
      lastActivity: days(-i % 14),
      notes,
      interviewStatus:
        stage === 'Interview' || stage === 'Offered' ? 'Scheduled' : stage === 'Hired' ? 'Completed' : 'Not Started',
      interviewDate: stage === 'Interview' ? days(2 + (i % 5)) : null,
      createdAt: days(-30 + i),
      updatedAt: now(),
    };
  });
}

let jobs = jobSeed();
let candidates = candidateSeed();

function serializeJob(j) {
  return {
    ...j,
    _id: j._id,
    createdAt: j.createdAt instanceof Date ? j.createdAt.toISOString() : j.createdAt,
    updatedAt: j.updatedAt instanceof Date ? j.updatedAt.toISOString() : j.updatedAt,
  };
}

function serializeCandidate(c) {
  return {
    ...c,
    _id: c._id,
    jobId: c.jobId,
    lastActivity: c.lastActivity instanceof Date ? c.lastActivity.toISOString() : c.lastActivity,
    interviewDate:
      c.interviewDate == null
        ? null
        : c.interviewDate instanceof Date
          ? c.interviewDate.toISOString()
          : c.interviewDate,
    createdAt: c.createdAt instanceof Date ? c.createdAt.toISOString() : c.createdAt,
    updatedAt: c.updatedAt instanceof Date ? c.updatedAt.toISOString() : c.updatedAt,
  };
}

function filterCandidateList(list, query, jobIdFixed) {
  let list2 = jobIdFixed ? list.filter((c) => c.jobId === jobIdFixed) : [...list];

  const { stage, minExperience, maxExperience, minScore, maxScore, search } = query;

  if (stage && stage !== 'All') {
    list2 = list2.filter((c) => c.stage === stage);
  }
  if (minExperience) {
    list2 = list2.filter((c) => c.experience >= parseInt(minExperience, 10));
  }
  if (maxExperience) {
    list2 = list2.filter((c) => c.experience <= parseInt(maxExperience, 10));
  }
  if (minScore) {
    list2 = list2.filter((c) => c.matchScore >= parseInt(minScore, 10));
  }
  if (maxScore) {
    list2 = list2.filter((c) => c.matchScore <= parseInt(maxScore, 10));
  }
  if (search) {
    const s = search.toLowerCase();
    list2 = list2.filter(
      (c) => c.name.toLowerCase().includes(s) || c.email.toLowerCase().includes(s)
    );
  }

  list2.sort((a, b) => new Date(b.lastActivity) - new Date(a.lastActivity));
  return list2.map(serializeCandidate);
}

export function mockGetAllJobs() {
  return jobs.map(serializeJob);
}

export function mockGetJobById(id) {
  const job = jobs.find((j) => j._id === id);
  if (!job) return null;
  const count = candidates.filter((c) => c.jobId === id).length;
  return { ...serializeJob(job), totalApplicants: count };
}

export function mockCreateJob(body) {
  const t = now();
  const doc = {
    _id: newOid(),
    title: body.title,
    department: body.department,
    location: body.location,
    openPositions: body.openPositions,
    hiringManager: body.hiringManager,
    description: body.description || '',
    requirements: body.requirements || [],
    createdAt: t,
    updatedAt: t,
  };
  jobs.push(doc);
  return serializeJob(doc);
}

export function mockUpdateJob(id, body) {
  const idx = jobs.findIndex((j) => j._id === id);
  if (idx === -1) return null;
  jobs[idx] = { ...jobs[idx], ...body, updatedAt: now() };
  return serializeJob(jobs[idx]);
}

export function mockDeleteJob(id) {
  const idx = jobs.findIndex((j) => j._id === id);
  if (idx === -1) return false;
  jobs.splice(idx, 1);
  candidates = candidates.filter((c) => c.jobId !== id);
  return true;
}

export function mockGetAllCandidates(query) {
  const list = filterCandidateList(candidates, query, null);
  const jobMap = Object.fromEntries(jobs.map((j) => [j._id, serializeJob(j)]));
  return list.map((c) => ({
    ...c,
    jobId: jobMap[c.jobId] || c.jobId,
  }));
}

export function mockGetCandidatesByJob(jobId, query) {
  return filterCandidateList(candidates, query, jobId);
}

export function mockGetCandidateById(id) {
  const c = candidates.find((x) => x._id === id);
  return c ? serializeCandidate(c) : null;
}

export function mockCreateCandidate(body) {
  const t = now();
  const doc = {
    _id: newOid(),
    name: body.name,
    email: body.email,
    phone: body.phone || '',
    currentRole: body.currentRole,
    company: body.company,
    experience: body.experience,
    skills: body.skills || [],
    resume: body.resume || '',
    jobId: body.jobId,
    stage: 'Applied',
    matchScore: body.matchScore ?? 70,
    lastActivity: t,
    notes: [],
    interviewStatus: 'Not Started',
    interviewDate: null,
    createdAt: t,
    updatedAt: t,
  };
  candidates.push(doc);
  return serializeCandidate(doc);
}

export function mockUpdateCandidate(id, body) {
  const idx = candidates.findIndex((c) => c._id === id);
  if (idx === -1) return null;
  const { _id, ...rest } = body;
  candidates[idx] = {
    ...candidates[idx],
    ...rest,
    lastActivity: now(),
    updatedAt: now(),
  };
  return serializeCandidate(candidates[idx]);
}

export function mockUpdateCandidateStage(id, stage) {
  const idx = candidates.findIndex((c) => c._id === id);
  if (idx === -1) return null;
  candidates[idx] = {
    ...candidates[idx],
    stage,
    lastActivity: now(),
    updatedAt: now(),
  };
  return serializeCandidate(candidates[idx]);
}

export function mockAddNote(id, note) {
  const idx = candidates.findIndex((c) => c._id === id);
  if (idx === -1) return null;
  candidates[idx].notes = [...(candidates[idx].notes || []), note];
  candidates[idx].lastActivity = now();
  candidates[idx].updatedAt = now();
  return serializeCandidate(candidates[idx]);
}

export function mockDeleteCandidate(id) {
  const idx = candidates.findIndex((c) => c._id === id);
  if (idx === -1) return false;
  candidates.splice(idx, 1);
  return true;
}

export function mockGetCandidatesByStage(jobId) {
  const stages = ['Applied', 'Shortlisted', 'Interview', 'Offered', 'Hired'];
  const result = {};
  for (const stage of stages) {
    result[stage] = candidates
      .filter((c) => c.jobId === jobId && c.stage === stage)
      .sort((a, b) => new Date(b.lastActivity) - new Date(a.lastActivity))
      .map(serializeCandidate);
  }
  return result;
}

export function mockGetCandidateStats(jobId) {
  const list = candidates.filter((c) => c.jobId === jobId);
  const map = {};
  for (const c of list) {
    map[c.stage] = (map[c.stage] || 0) + 1;
  }
  return Object.entries(map).map(([stage, count]) => ({ _id: stage, count }));
}
