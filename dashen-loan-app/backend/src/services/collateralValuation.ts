export function evaluateCollateral(input: { type: string; estimatedValue: number; ageYears: number }) {
  const { type, estimatedValue, ageYears } = input;
  let discountFactor = 0.5;

  switch (type) {
    case 'Commercial Building':
    case 'Residential Building':
    case 'Mixed-Use':
      discountFactor = 1.0;
      break;
    case 'Coffee Site':
      discountFactor = 0.75;
      break;
    case 'Business Mortgage':
      if (ageYears <= 1) discountFactor = 0.75;
      else if (ageYears <= 2) discountFactor = 0.6;
      else if (ageYears <= 3) discountFactor = 0.5;
      else if (ageYears <= 4) discountFactor = 0.4;
      else discountFactor = 0.25;
      break;
    case 'Vehicle (New)':
      if (ageYears <= 1) discountFactor = 1.0;
      else if (ageYears <= 2) discountFactor = 0.9;
      else if (ageYears <= 4) discountFactor = 0.75;
      else if (ageYears <= 5) discountFactor = 0.6;
      else discountFactor = 0.3;
      break;
    case 'Vehicle (Working Capital)':
      if (ageYears <= 1) discountFactor = 0.75;
      else if (ageYears <= 2) discountFactor = 0.6;
      else if (ageYears <= 3) discountFactor = 0.5;
      else if (ageYears <= 4) discountFactor = 0.4;
      else if (ageYears <= 5) discountFactor = 0.3;
      else discountFactor = 0.15;
      break;
    case 'Construction Machinery':
      if (ageYears <= 1) discountFactor = 0.85;
      else if (ageYears <= 2) discountFactor = 0.75;
      else if (ageYears <= 3) discountFactor = 0.65;
      else if (ageYears <= 4) discountFactor = 0.55;
      else if (ageYears <= 5) discountFactor = 0.4;
      else discountFactor = 0.2;
      break;
    case 'Cash':
      discountFactor = 1.0;
      break;
    case 'Cash Substitute (Government)':
      discountFactor = 0.95;
      break;
    case 'Cash Substitute (A Rated)':
      discountFactor = 0.9;
      break;
    case 'Bank Share':
    case 'Insurance Share':
      discountFactor = 0.85;
      break;
    default:
      discountFactor = 0.5;
  }

  const netValue = estimatedValue * discountFactor;
  return {
    discountFactor: discountFactor * 100,
    netValue: Math.round(netValue),
    acceptableBase: getBase(type),
  };
}

function getBase(type: string): string {
  if (['Commercial Building', 'Residential Building', 'Mixed-Use', 'Coffee Site'].includes(type))
    return 'Engineering Estimation';
  if (['Business Mortgage', 'Vehicle (New)', 'Vehicle (Working Capital)', 'Construction Machinery'].includes(type))
    return 'Engineering Estimation / Purchase Document / Insurance Value';
  if (['Cash', 'Cash Substitute (Government)', 'Cash Substitute (A Rated)'].includes(type))
    return 'Face Value';
  if (['Bank Share', 'Insurance Share'].includes(type))
    return 'Par Value';
  return 'Engineering Estimation';
}
