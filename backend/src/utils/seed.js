const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../../.env') });

const User = require('../models/User');
const Profile = require('../models/Profile');
const Company = require('../models/Company');
const Job = require('../models/Job');
const Application = require('../models/Application');
const SavedJob = require('../models/SavedJob');
const Notification = require('../models/Notification');

const seedData = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }

    console.log('Connecting to MongoDB for seeding...');
    await mongoose.connect(uri);
    console.log('Connected to MongoDB.');

    // 1. Clear Existing Data
    console.log('Clearing existing database collections...');
    await User.deleteMany({});
    await Profile.deleteMany({});
    await Company.deleteMany({});
    await Job.deleteMany({});
    await Application.deleteMany({});
    await SavedJob.deleteMany({});
    await Notification.deleteMany({});
    console.log('Existing collections cleared.');

    // 2. Seed Users
    console.log('Seeding Users...');
    const users = await User.create([
      {
        name: 'System Admin',
        email: 'admin@jobportal.com',
        password: 'password123',
        role: 'ADMIN',
      },
      {
        name: 'Alice Employer (TechCorp)',
        email: 'employer1@jobportal.com',
        password: 'password123',
        role: 'EMPLOYER',
      },
      {
        name: 'Bob Employer (HealthInc)',
        email: 'employer2@jobportal.com',
        password: 'password123',
        role: 'EMPLOYER',
      },
      {
        name: 'John Seeker',
        email: 'seeker1@jobportal.com',
        password: 'password123',
        role: 'JOB_SEEKER',
      },
      {
        name: 'Jane Seeker',
        email: 'seeker2@jobportal.com',
        password: 'password123',
        role: 'JOB_SEEKER',
      },
      {
        name: 'Charlie Seeker',
        email: 'seeker3@jobportal.com',
        password: 'password123',
        role: 'JOB_SEEKER',
      },
    ]);

    const adminUser = users[0];
    const employer1 = users[1];
    const employer2 = users[2];
    const seeker1 = users[3];
    const seeker2 = users[4];
    const seeker3 = users[5];

    console.log('Users seeded successfully.');

    // 3. Seed Job Seeker Profiles
    console.log('Seeding Job Seeker Profiles...');
    await Profile.create([
      {
        userId: seeker1._id,
        phone: '123-456-7890',
        location: 'New York, NY',
        bio: 'Passionate software developer with 3 years of experience in JavaScript and Node.js.',
        skills: ['Node.js', 'Express', 'React', 'MongoDB', 'JavaScript'],
        education: [
          {
            school: 'State University',
            degree: 'Bachelor of Science',
            fieldOfStudy: 'Computer Science',
            from: new Date('2018-09-01'),
            to: new Date('2022-05-30'),
            current: false,
            description: 'Graduated with honors.',
          },
        ],
        experience: [
          {
            title: 'Junior Developer',
            company: 'WebDev Solutions',
            location: 'New York, NY',
            from: new Date('2022-06-01'),
            current: true,
            description: 'Building REST APIs using Node.js and Express.',
          },
        ],
        resumeUrl: 'uploads/resumes/sample-resume.pdf',
      },
      {
        userId: seeker2._id,
        phone: '987-654-3210',
        location: 'San Francisco, CA',
        bio: 'Experienced frontend engineer specialized in React and Angular apps.',
        skills: ['Angular', 'TypeScript', 'CSS', 'HTML', 'RxJS'],
        education: [
          {
            school: 'City College',
            degree: 'Associate Degree',
            fieldOfStudy: 'Web Development',
            from: new Date('2019-09-01'),
            to: new Date('2021-06-30'),
            current: false,
          },
        ],
        experience: [
          {
            title: 'Frontend Developer',
            company: 'AppStart Inc',
            location: 'San Francisco, CA',
            from: new Date('2021-07-01'),
            to: new Date('2023-12-30'),
            current: false,
          },
        ],
      },
    ]);
    console.log('Job Seeker Profiles seeded successfully.');

    // 4. Seed Companies
    console.log('Seeding Companies...');
    const companies = await Company.create([
      {
        employerId: employer1._id,
        companyName: 'TechCorp Solutions',
        description: 'A leading global software development and cloud consultation firm.',
        website: 'https://techcorp-solutions.example.com',
        location: 'San Francisco, CA',
        industry: 'Technology',
        logo: 'uploads/companies/logo-techcorp.png',
      },
      {
        employerId: employer2._id,
        companyName: 'HealthInc Care',
        description: 'Innovative healthcare products and medical services provider.',
        website: 'https://healthinc-care.example.com',
        location: 'Boston, MA',
        industry: 'Healthcare',
        logo: 'uploads/companies/logo-healthinc.png',
      },
    ]);

    const company1 = companies[0];
    const company2 = companies[1];
    console.log('Companies seeded successfully.');

    // 5. Seed Jobs
    console.log('Seeding Jobs...');
    const jobs = await Job.create([
      {
        employerId: employer1._id,
        companyId: company1._id,
        title: 'Backend Node.js Developer',
        description: 'We are looking for a Senior Node.js Developer to join our core backend engineering team. You will build highly scalable REST services and integrate databases.',
        location: 'Remote',
        employmentType: 'FULL_TIME',
        experienceLevel: 'SENIOR',
        salaryMin: 90000,
        salaryMax: 130000,
        skills: ['Node.js', 'Express', 'MongoDB', 'REST API', 'JavaScript'],
        category: 'Software Engineering',
        status: 'OPEN',
        deadline: new Date('2026-12-31'),
      },
      {
        employerId: employer1._id,
        companyId: company1._id,
        title: 'Frontend React Engineer',
        description: 'Join our product team to design and implement interactive user experiences using React.js, Redux, and Tailwind CSS.',
        location: 'San Francisco, CA',
        employmentType: 'FULL_TIME',
        experienceLevel: 'MID',
        salaryMin: 75000,
        salaryMax: 105000,
        skills: ['React', 'JavaScript', 'CSS', 'Redux'],
        category: 'Software Engineering',
        status: 'OPEN',
        deadline: new Date('2026-11-30'),
      },
      {
        employerId: employer1._id,
        companyId: company1._id,
        title: 'DevOps Intern',
        description: 'Excellent opportunity for computer science students to learn CI/CD pipelines, Docker, Kubernetes, and AWS cloud management.',
        location: 'Hybrid (San Francisco, CA)',
        employmentType: 'INTERNSHIP',
        experienceLevel: 'ENTRY',
        salaryMin: 30000,
        salaryMax: 45000,
        skills: ['Docker', 'AWS', 'Linux', 'Git'],
        category: 'DevOps',
        status: 'OPEN',
        deadline: new Date('2026-09-30'),
      },
      {
        employerId: employer2._id,
        companyId: company2._id,
        title: 'Clinical Nurse Practitioner',
        description: 'HealthInc is hiring a licensed Nurse Practitioner to provide patient care, manage clinical records, and consult on treatment plans.',
        location: 'Boston, MA',
        employmentType: 'FULL_TIME',
        experienceLevel: 'SENIOR',
        salaryMin: 110000,
        salaryMax: 140000,
        skills: ['Nursing', 'Patient Care', 'Clinical Records'],
        category: 'Medical Services',
        status: 'OPEN',
        deadline: new Date('2026-10-15'),
      },
      {
        employerId: employer2._id,
        companyId: company2._id,
        title: 'Healthcare Analyst',
        description: 'Analyze medical data, generate reports, and optimize clinical operations workflow using data management tools.',
        location: 'Remote',
        employmentType: 'CONTRACT',
        experienceLevel: 'MID',
        salaryMin: 60000,
        salaryMax: 85000,
        skills: ['SQL', 'Data Analysis', 'Healthcare Systems'],
        category: 'Data Analytics',
        status: 'OPEN',
        deadline: new Date('2026-08-31'),
      },
      {
        employerId: employer1._id,
        companyId: company1._id,
        title: 'Archived Backend Developer',
        description: 'Draft post for an older position.',
        location: 'Remote',
        employmentType: 'FULL_TIME',
        experienceLevel: 'ENTRY',
        salaryMin: 50000,
        salaryMax: 70000,
        skills: ['Node.js'],
        category: 'Software Engineering',
        status: 'DRAFT',
        deadline: new Date('2026-05-01'),
      },
    ]);

    const job1 = jobs[0];
    const job2 = jobs[1];
    const job3 = jobs[2];
    const job4 = jobs[3];
    const job5 = jobs[4];

    console.log('Jobs seeded successfully.');

    // 6. Seed Applications
    console.log('Seeding Applications...');
    await Application.create([
      {
        jobId: job1._id,
        applicantId: seeker1._id,
        resumeUrl: 'uploads/resumes/sample-resume.pdf',
        coverLetter: 'I am highly interested in the Backend Node.js position. I have been working with Node and Express for 3 years.',
        status: 'APPLIED',
      },
      {
        jobId: job2._id,
        applicantId: seeker1._id,
        resumeUrl: 'uploads/resumes/sample-resume.pdf',
        coverLetter: 'I also have basic experience with React frontend designs.',
        status: 'SHORTLISTED',
      },
      {
        jobId: job4._id,
        applicantId: seeker2._id,
        resumeUrl: 'uploads/resumes/seeker2-resume.docx',
        coverLetter: 'Applying for the Nurse Practitioner role. Licensed NP with extensive patient care history.',
        status: 'INTERVIEW',
      },
    ]);
    console.log('Applications seeded successfully.');

    // 7. Seed Saved Jobs
    console.log('Seeding Saved Jobs...');
    await SavedJob.create([
      {
        userId: seeker1._id,
        jobId: job3._id,
      },
      {
        userId: seeker2._id,
        jobId: job1._id,
      },
      {
        userId: seeker3._id,
        jobId: job1._id,
      },
      {
        userId: seeker3._id,
        jobId: job5._id,
      },
    ]);
    console.log('Saved Jobs seeded successfully.');

    // 8. Seed Notifications
    console.log('Seeding Notifications...');
    await Notification.create([
      {
        userId: seeker1._id,
        title: 'Profile Created',
        message: 'Welcome to the Job Portal! Complete your profile to get discovered.',
        type: 'SYSTEM',
        isRead: true,
      },
      {
        userId: seeker1._id,
        title: 'Application status update',
        message: 'Your application for Frontend React Engineer has been marked as SHORTLISTED.',
        type: 'STATUS_CHANGED',
        isRead: false,
      },
      {
        userId: employer1._id,
        title: 'New Application',
        message: 'John Seeker has applied for Backend Node.js Developer.',
        type: 'NEW_APPLICATION',
        isRead: false,
      },
    ]);
    console.log('Notifications seeded successfully.');

    console.log('Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error.message);
    process.exit(1);
  }
};

seedData();
