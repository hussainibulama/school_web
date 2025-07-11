export function mapUserTableData(data: any[] = []) {
  return data.map((item, index) => ({
    id: index + 1,
    userId: item.userId,
    name: [item.firstName, item.middleName, item.lastName].filter(Boolean).join(' '),
    gender: item.gender,
    type: item.role,
    phone: item.phone,
    email: item.email,
    created: item.createdAt,
    active: item.active,
    status: item.active === true ? 'Active' : 'Deactivated',
  }));
}
