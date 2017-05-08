export function getGroupById(id, colorgroups) {
  let groups = colorgroups.filter(cg => (cg.id === id));
  return groups.length ? groups[0].name : null;
}
