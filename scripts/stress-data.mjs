import assert from 'node:assert/strict';

const programs = [
  ['Food pantry', 'Sort shelf-stable donations', 'Pack grocery boxes', 'Label dietary options', 'Count remaining supplies'],
  ['Park cleanup', 'Map litter collection zones', 'Distribute gloves and bags', 'Collect litter at trailheads', 'Log filled bags'],
  ['Winter coat drive', 'Check coat condition', 'Sort coats by size', 'Stock pickup tables', 'Count coats for the next shift'],
  ['Community garden', 'Clear raised beds', 'Label new seedlings', 'Check irrigation hoses', 'Update the watering roster'],
  ['Library book sale', 'Sort donated books', 'Set up genre tables', 'Restock popular sections', 'Box remaining books'],
  ['Senior meal delivery', 'Confirm pickup windows', 'Pack insulated delivery bags', 'Review delivery routes', 'Report returned containers'],
  ['School supply giveaway', 'Count donated notebooks', 'Assemble grade-level kits', 'Restock the check-in table', 'Record kits distributed'],
  ['Pet shelter support', 'Sort towels and bedding', 'Check food donation dates', 'Assemble adoption packets', 'Update storage labels'],
  ['River trail maintenance', 'Check trail markers', 'Clear debris from crossings', 'Photograph drainage trouble spots', 'Log repairs for follow-up'],
  ['Neighborhood tech clinic', 'Set up charging stations', 'Check in workshop guests', 'Prepare device setup guides', 'Collect workshop feedback'],
];
const sites = ['Northside', 'Riverfront', 'Eastwood', 'Downtown', 'West End', 'Southside'];
const names = [
  'Maya Brooks', 'Noah Reed', 'Zoe Carter', 'Eli Bennett', 'Nina Patel',
  'Liam Foster', 'Ava Morgan', 'Omar Hayes', 'Ivy Chen', 'Leo Rivera',
  'Rosa Grant', 'Isaac Bell', 'Amara Scott', 'Miles Perry', 'Layla Ortiz',
  'Evan King', 'Sofia James', 'Theo Woods', 'Hana Lewis', 'Mateo Green',
];
const id = (type, index) => `a12-${type}-${String(index + 1).padStart(3, '0')}`;
const createdAt = new Date('2026-11-23T14:00:00Z');
const dueDate = index => new Date(Date.UTC(2026, 11, 2 + index % 21)).toISOString().slice(0, 10);

export function createStressData() {
  const members = names.map((name, index) => ({
    id: id('member', index),
    name,
    email: `volunteer-${index + 1}@example.com`,
    phone: `(989) 555-01${String(index).padStart(2, '0')}`,
    createdAt,
  }));
  const issues = sites.flatMap((site, siteIndex) => programs.map(([program], programIndex) => {
    const index = siteIndex * programs.length + programIndex;
    return {
      id: id('issue', index),
      title: `${site} ${program.toLowerCase()}`,
      description: `Coordinate the ${program.toLowerCase()} volunteer shift in ${site}. Meet at the site check-in table and record any follow-up for the next team.`,
      status: ['open', 'in_progress', 'resolved'][index % 3],
      ownerId: members[index % members.length].id,
      createdAt,
      dueDate: dueDate(index),
    };
  }));
  const tasks = issues.flatMap((issue, issueIndex) => {
    const [, ...titles] = programs[issueIndex % programs.length];
    return titles.slice(0, issueIndex < 40 ? 4 : 3).map((title, slot) => ({
      id: id('task', issueIndex * 4 + slot),
      issueId: issue.id,
      title,
      description: `${title} during the ${issue.title.toLowerCase()} shift. Leave a handoff note with the result and any follow-up.`,
      status: issue.status === 'resolved' ? 'done' : ['todo', 'doing', 'done'][slot % 3],
      assigneeId: members[(issueIndex + slot * 5) % members.length].id,
      createdBy: issue.ownerId,
      createdAt,
      dueDate: issue.dueDate,
    }));
  });
  return { members, issues, tasks };
}

export function validateStressData({ members, issues, tasks }) {
  assert.ok(members.length >= 20);
  assert.ok(issues.length >= 60);
  assert.ok(tasks.length >= 200);
  const memberIds = new Set(members.map(member => member.id));
  const issueIds = new Set(issues.map(issue => issue.id));
  assert.equal(memberIds.size, members.length);
  assert.equal(issueIds.size, issues.length);
  assert.equal(new Set(tasks.map(task => task.id)).size, tasks.length);
  for (const issue of issues) assert.ok(memberIds.has(issue.ownerId));
  for (const task of tasks) {
    assert.ok(issueIds.has(task.issueId));
    assert.ok(memberIds.has(task.createdBy) && memberIds.has(task.assigneeId));
  }
  const assignments = members.map(member => {
    const assigned = tasks.filter(task => task.assigneeId === member.id);
    const issueCount = new Set(assigned.map(task => task.issueId)).size;
    assert.ok(assigned.length >= 10, `Too few tasks for ${member.name}`);
    assert.ok(issueCount >= 5, `Too few issues for ${member.name}`);
    return { tasks: assigned.length, issues: issueCount };
  });
  return {
    members: members.length,
    issues: issues.length,
    tasks: tasks.length,
    minimumTasksPerMember: Math.min(...assignments.map(row => row.tasks)),
    minimumIssuesPerMember: Math.min(...assignments.map(row => row.issues)),
  };
}
