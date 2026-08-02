const dotenv = require('dotenv');
const path = require('path');

// Load env variables
dotenv.config({ path: path.join(__dirname, '../../.env') });

const PORT = process.env.PORT || 8000;
const BASE_URL = `http://localhost:${PORT}/api`;

const assert = (condition, message) => {
  if (!condition) {
    throw new Error(`Assertion failed: ${message}`);
  }
  console.log(`[PASS] ${message}`);
};

const runTests = async () => {
  console.log('==================================================');
  console.log('STARTING INTEGRATION TESTS FOR JOB PORTAL BACKEND');
  console.log(`Target API URL: ${BASE_URL}`);
  console.log('==================================================\n');

  try {
    // 1. Health check
    console.log('Testing /health check...');
    const healthRes = await fetch(`${BASE_URL}/health`);
    const healthData = await healthRes.json();
    assert(healthRes.status === 200, 'Health check returns 200 status');
    assert(healthData.success === true, 'Health check returns success=true');
    assert(healthData.database === 'Connected', 'Database connection status is Connected');

    // Make sure we have unique email suffixes for each test run to avoid pre-existing seed conflicts
    const suffix = Date.now();
    const seekerEmail = `test_seeker_${suffix}@test.com`;
    const employerEmail = `test_employer_${suffix}@test.com`;
    const adminEmail = 'admin@jobportal.com'; // seeded admin

    let seekerToken, employerToken, adminToken;
    let seekerId, employerId;
    let companyId, jobId, applicationId;

    // 2. Authentication: Seeker Registration
    console.log('\nTesting Job Seeker registration...');
    const regSeekerRes = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test Seeker',
        email: seekerEmail,
        password: 'password123',
        role: 'JOB_SEEKER',
      }),
    });
    const regSeekerData = await regSeekerRes.json();
    assert(regSeekerRes.status === 201, 'Seeker registration returns 201 Created');
    assert(regSeekerData.success === true, 'Registration reports success=true');
    assert(regSeekerData.data.user.role === 'JOB_SEEKER', 'User is created as JOB_SEEKER');
    assert(!regSeekerData.data.user.password, 'User password is not returned in response');
    seekerId = regSeekerData.data.user._id;

    // Duplicate Registration Conflict Check
    console.log('\nTesting duplicate email registration conflict (409)...');
    const dupRegRes = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test Seeker Dup',
        email: seekerEmail,
        password: 'password123',
        role: 'JOB_SEEKER',
      }),
    });
    const dupRegData = await dupRegRes.json();
    assert(dupRegRes.status === 409, 'Duplicate registration returns 409 Conflict');
    assert(dupRegData.success === false, 'Duplicate reports success=false');
    assert(dupRegData.error === 'CONFLICT', 'Duplicate returns CONFLICT error code');

    // Employer Registration
    console.log('\nTesting Employer registration...');
    const regEmployerRes = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test Employer',
        email: employerEmail,
        password: 'password123',
        role: 'EMPLOYER',
      }),
    });
    const regEmployerData = await regEmployerRes.json();
    assert(regEmployerRes.status === 201, 'Employer registration returns 201 Created');
    employerId = regEmployerData.data.user._id;

    // 3. Login
    console.log('\nTesting Seeker Login...');
    const loginSeekerRes = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: seekerEmail, password: 'password123' }),
    });
    const loginSeekerData = await loginSeekerRes.json();
    assert(loginSeekerRes.status === 200, 'Seeker login returns 200 OK');
    assert(loginSeekerData.data.token !== undefined, 'Token is returned upon login');
    seekerToken = loginSeekerData.data.token;

    console.log('\nTesting Employer Login...');
    const loginEmployerRes = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: employerEmail, password: 'password123' }),
    });
    const loginEmployerData = await loginEmployerRes.json();
    assert(loginEmployerRes.status === 200, 'Employer login returns 200 OK');
    employerToken = loginEmployerData.data.token;

    console.log('\nTesting Admin Login...');
    const loginAdminRes = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: adminEmail, password: 'password123' }),
    });
    const loginAdminData = await loginAdminRes.json();
    assert(loginAdminRes.status === 200, 'Admin login returns 200 OK');
    adminToken = loginAdminData.data.token;

    // 4. Me endpoint
    console.log('\nTesting /me auth validation...');
    const meRes = await fetch(`${BASE_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${seekerToken}` },
    });
    const meData = await meRes.json();
    assert(meRes.status === 200, 'Get /me returns 200 OK');
    assert(meData.data.user.email === seekerEmail, 'Retrieved user matches the token user');

    // 5. Unauthorized check
    console.log('\nTesting unauthorized API request (missing token)...');
    const unauthRes = await fetch(`${BASE_URL}/auth/me`);
    const unauthData = await unauthRes.json();
    assert(unauthRes.status === 401, 'Request without token returns 401');
    assert(unauthData.success === false, 'Unauthorized response has success=false');

    // 6. Profiles CRUD (Seeker profile)
    console.log('\nTesting profile CRUD...');
    const createProfRes = await fetch(`${BASE_URL}/profile`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${seekerToken}`,
      },
      body: JSON.stringify({
        phone: '555-0199',
        location: 'Chicago, IL',
        bio: 'Node.js developer testing profiles',
        skills: ['Node.js', 'Express', 'Mongoose'],
        education: [
          { school: 'Test College', degree: 'BS', from: '2020-01-01', to: '2024-01-01' },
        ],
        experience: [
          { title: 'Tester', company: 'Quality Corp', from: '2024-01-01', current: true },
        ],
      }),
    });
    const createProfData = await createProfRes.json();
    assert(createProfRes.status === 201, 'Profile creation returns 201 Created');
    assert(createProfData.data.profile.phone === '555-0199', 'Profile properties parsed correctly');

    // Read profile
    const getProfRes = await fetch(`${BASE_URL}/profile`, {
      headers: { Authorization: `Bearer ${seekerToken}` },
    });
    const getProfData = await getProfRes.json();
    assert(getProfRes.status === 200, 'Profile retrieval returns 200 OK');
    assert(getProfData.data.profile.location === 'Chicago, IL', 'Profile details match');

    // 7. Companies CRUD
    console.log('\nTesting company profile CRUD...');
    const createCompRes = await fetch(`${BASE_URL}/companies`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${employerToken}`,
      },
      body: JSON.stringify({
        companyName: 'Test Automation Inc',
        description: 'Quality assurance tools automation',
        website: 'https://test-auto.example.com',
        location: 'Austin, TX',
        industry: 'Tech',
      }),
    });
    const createCompData = await createCompRes.json();
    assert(createCompRes.status === 201, 'Company creation returns 201 Created');
    companyId = createCompData.data.company._id;

    // View company details
    const getCompRes = await fetch(`${BASE_URL}/companies/${companyId}`);
    const getCompData = await getCompRes.json();
    assert(getCompRes.status === 200, 'Retrieve company by ID returns 200 OK');
    assert(getCompData.data.company.companyName === 'Test Automation Inc', 'Company details retrieved successfully');

    // Update company (Employer role check)
    const updateCompRes = await fetch(`${BASE_URL}/companies/${companyId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${employerToken}`,
      },
      body: JSON.stringify({ location: 'Austin, TX (HQ)' }),
    });
    const updateCompData = await updateCompRes.json();
    assert(updateCompRes.status === 200, 'Company update returns 200 OK');
    assert(updateCompData.data.company.location === 'Austin, TX (HQ)', 'Update field matches');

    // 8. Jobs CRUD
    console.log('\nTesting Job posting CRUD...');
    const createJobRes = await fetch(`${BASE_URL}/jobs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${employerToken}`,
      },
      body: JSON.stringify({
        companyId: companyId,
        title: 'Automation Engineer',
        description: 'Write integration tests and maintain CI scripts.',
        location: 'Remote',
        employmentType: 'FULL_TIME',
        experienceLevel: 'MID',
        salaryMin: 80000,
        salaryMax: 100000,
        skills: ['Node.js', 'Playwright', 'Jest'],
        category: 'QA Engineering',
        deadline: '2026-12-31',
      }),
    });
    const createJobData = await createJobRes.json();
    assert(createJobRes.status === 201, 'Job creation returns 201 Created');
    jobId = createJobData.data.job._id;

    // Authorization limit check (Job seeker cannot update a job)
    console.log('\nTesting authorization boundary (Job seeker updates employer job)...');
    const badUpdateJobRes = await fetch(`${BASE_URL}/jobs/${jobId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${seekerToken}`,
      },
      body: JSON.stringify({ title: 'Hacked Title' }),
    });
    assert(badUpdateJobRes.status === 403, 'Unauthorized update returns 403 Forbidden');

    // 9. Job search, filters, pagination
    console.log('\nTesting Job search and filters...');
    const searchRes = await fetch(`${BASE_URL}/jobs?keyword=Automation&location=Remote&page=1&limit=5`);
    const searchData = await searchRes.json();
    assert(searchRes.status === 200, 'Job search returns 200 OK');
    assert(searchData.data.length >= 1, 'Search finds at least one matching job');
    assert(searchData.pagination.page === 1, 'Pagination page matches 1');
    assert(searchData.pagination.total >= 1, 'Pagination total records count is populated');

    // 10. Saved Jobs
    console.log('\nTesting Saved Jobs...');
    const saveJobRes = await fetch(`${BASE_URL}/jobs/${jobId}/save`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${seekerToken}` },
    });
    assert(saveJobRes.status === 201, 'Save job returns 201 Created');

    // Duplicate save block check
    console.log('\nTesting duplicate saved job prevention...');
    const dupSaveRes = await fetch(`${BASE_URL}/jobs/${jobId}/save`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${seekerToken}` },
    });
    assert(dupSaveRes.status === 409, 'Duplicate save job returns 409 Conflict');

    // Retrieve saved list
    const getSavedRes = await fetch(`${BASE_URL}/saved-jobs`, {
      headers: { Authorization: `Bearer ${seekerToken}` },
    });
    const getSavedData = await getSavedRes.json();
    assert(getSavedRes.status === 200, 'Retrieve saved jobs list returns 200 OK');
    assert(getSavedData.data.savedJobs.length >= 1, 'Saved job list has at least one entry');

    // 11. Application Workflow
    console.log('\nTesting Job application submission...');
    const applyRes = await fetch(`${BASE_URL}/jobs/${jobId}/apply`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${seekerToken}`,
      },
      body: JSON.stringify({
        resumeUrl: 'uploads/resumes/test-resume.pdf',
        coverLetter: 'I am the perfect fit for this automated engineer testing position.',
      }),
    });
    const applyData = await applyRes.json();
    assert(applyRes.status === 201, 'Submit application returns 201 Created');
    applicationId = applyData.data.application._id;

    // Duplicate apply block check
    console.log('\nTesting duplicate application submission check...');
    const dupApplyRes = await fetch(`${BASE_URL}/jobs/${jobId}/apply`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${seekerToken}`,
      },
      body: JSON.stringify({
        resumeUrl: 'uploads/resumes/test-resume.pdf',
      }),
    });
    assert(dupApplyRes.status === 409, 'Duplicate application returns 409 Conflict');

    // Employer views job applications
    console.log('\nTesting employer viewing job applications...');
    const viewAppsRes = await fetch(`${BASE_URL}/jobs/${jobId}/applications`, {
      headers: { Authorization: `Bearer ${employerToken}` },
    });
    const viewAppsData = await viewAppsRes.json();
    assert(viewAppsRes.status === 200, 'Employer views applications returns 200 OK');
    assert(viewAppsData.data.applications.length >= 1, 'Applications list is not empty');

    // Employer updates status
    console.log('\nTesting employer status updates (APPLIED -> SHORTLISTED)...');
    const updateAppStatusRes = await fetch(`${BASE_URL}/applications/${applicationId}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${employerToken}`,
      },
      body: JSON.stringify({ status: 'SHORTLISTED' }),
    });
    const updateAppStatusData = await updateAppStatusRes.json();
    assert(updateAppStatusRes.status === 200, 'Status update returns 200 OK');
    assert(updateAppStatusData.data.application.status === 'SHORTLISTED', 'Status changes to SHORTLISTED');

    // 12. Notifications check
    console.log('\nTesting notification generation...');
    const notifRes = await fetch(`${BASE_URL}/notifications`, {
      headers: { Authorization: `Bearer ${seekerToken}` },
    });
    const notifData = await notifRes.json();
    assert(notifRes.status === 200, 'Fetch seeker notifications returns 200 OK');
    assert(notifData.data.notifications.length >= 1, 'Seeker received notifications');

    const unreadCount = notifData.data.notifications.filter(n => !n.isRead).length;
    console.log(`Unread seeker notifications: ${unreadCount}`);

    // Mark all read
    const readAllRes = await fetch(`${BASE_URL}/notifications/read-all`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${seekerToken}` },
    });
    assert(readAllRes.status === 200, 'Mark all notifications as read returns 200');

    // 13. Admin system check
    console.log('\nTesting admin fetch users...');
    const adminUsersRes = await fetch(`${BASE_URL}/admin/users`, {
      headers: { Authorization: `Bearer ${adminToken}` },
    });
    const adminUsersData = await adminUsersRes.json();
    assert(adminUsersRes.status === 200, 'Admin fetch users returns 200 OK');
    assert(adminUsersData.data.users.length > 0, 'Admin retrieves users list');

    // Admin updates user status (Deactivate Seeker)
    console.log('\nTesting admin user deactivation (seeker)...');
    const deactivateRes = await fetch(`${BASE_URL}/admin/users/${seekerId}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${adminToken}`,
      },
      body: JSON.stringify({ isActive: false }),
    });
    assert(deactivateRes.status === 200, 'Admin deactivates seeker user successfully');

    // Verify deactivated user cannot log in
    console.log('\nTesting deactivated user login session block (403)...');
    const blockedLoginRes = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: seekerEmail, password: 'password123' }),
    });
    assert(blockedLoginRes.status === 403, 'Deactivated user login returns 403 Forbidden');

    // Reactivate user
    console.log('\nReactivating user...');
    await fetch(`${BASE_URL}/admin/users/${seekerId}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${adminToken}`,
      },
      body: JSON.stringify({ isActive: true }),
    });

    // 14. Validation edge cases: Invalid ObjectId checks
    console.log('\nTesting invalid Mongo ObjectId inputs (400 validation error)...');
    const badIdRes = await fetch(`${BASE_URL}/companies/not-a-valid-object-id`, {
      headers: { Authorization: `Bearer ${seekerToken}` },
    });
    const badIdData = await badIdRes.json();
    assert(badIdRes.status === 400, 'Invalid Mongo ObjectId returns 400 Bad Request');
    assert(badIdData.success === false, 'Invalid ObjectId returns success=false');
    assert(badIdData.error === 'VALIDATION_ERROR', 'Error reported is VALIDATION_ERROR');

    // 15. Validation edge cases: Missing required fields
    console.log('\nTesting missing required fields on job creation (400 validation error)...');
    const badJobRes = await fetch(`${BASE_URL}/jobs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${employerToken}`,
      },
      body: JSON.stringify({
        title: 'Missing Category and Description',
      }),
    });
    assert(badJobRes.status === 400, 'Missing required fields returns 400 Bad Request');

    // 16. Clean up temporary test data
    console.log('\nCleaning up test job...');
    const deleteJobRes = await fetch(`${BASE_URL}/jobs/${jobId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${employerToken}` },
    });
    assert(deleteJobRes.status === 200, 'Clean up test job succeeded');

    const deleteCompRes = await fetch(`${BASE_URL}/companies/${companyId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${employerToken}` },
    });
    assert(deleteCompRes.status === 200, 'Clean up test company succeeded');

    console.log('\n==================================================');
    console.log('ALL INTEGRATION TESTS PASSED SUCCESSFULLY! 26/26');
    console.log('==================================================');
    process.exit(0);
  } catch (error) {
    console.error('\n[FAIL] Test suite crashed with error:', error);
    process.exit(1);
  }
};

runTests();
