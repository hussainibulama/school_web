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

export const capitalize = (s: string) => {
  return s ? s[0].toUpperCase() + s.slice(1).toLowerCase() : s;
};

export const getCurrentPage = (location: any) => {
  const pathSegments = location.pathname.split('/').filter(Boolean);

  // Helper function to detect likely ID (UUID or numeric ID)
  const isLikelyId = (segment: string) => {
    return (
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(segment) ||
      /^\d+$/.test(segment)
    );
  };

  let currentPage = '';

  if (pathSegments.length === 0) {
    currentPage = 'Dashboard';
  } else if (isLikelyId(pathSegments[pathSegments.length - 1])) {
    // If last segment is an ID, use the one before it
    currentPage = pathSegments[pathSegments.length - 2];
  } else {
    currentPage = pathSegments[pathSegments.length - 1];
  }

  // Format: replace dashes and capitalize
  currentPage = currentPage?.replace(/-/g, ' ')?.replace(/\b\w/g, (char) => char.toUpperCase());

  return currentPage;
};
