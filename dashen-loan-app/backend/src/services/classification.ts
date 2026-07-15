export function classifyLoan(input: {
  daysPastDue: number;
  loanType: string;
  overdraftBalancePct: number;
  restructureIterations: number;
  hasPreEstablishedProgram: boolean;
  unlikelyToPay: boolean;
}) {
  const {
    daysPastDue,
    loanType,
    overdraftBalancePct,
    restructureIterations,
    hasPreEstablishedProgram,
    unlikelyToPay,
  } = input;

  let classification = 'PASS';
  let provisioningPct = 0.01;

  if (hasPreEstablishedProgram) {
    if (daysPastDue < 30) {
      classification = 'PASS';
      provisioningPct = 0.01;
    } else if (daysPastDue < 90) {
      classification = 'SPECIAL_MENTION';
      provisioningPct = 0.05;
    } else if (daysPastDue < 180) {
      classification = 'SUBSTANDARD';
      provisioningPct = 0.25;
    } else if (daysPastDue < 360) {
      classification = 'DOUBTFUL';
      provisioningPct = 0.5;
    } else {
      classification = 'LOSS';
      provisioningPct = 1.0;
    }
  } else {
    if (daysPastDue < 30) {
      classification = 'PASS';
      provisioningPct = 0.01;
    } else if (daysPastDue < 90) {
      classification = 'SPECIAL_MENTION';
      provisioningPct = 0.05;
    } else if (daysPastDue < 180) {
      classification = 'SUBSTANDARD';
      provisioningPct = 0.25;
    } else if (daysPastDue < 360) {
      classification = 'DOUBTFUL';
      provisioningPct = 0.5;
    } else {
      classification = 'LOSS';
      provisioningPct = 1.0;
    }

    if (loanType === 'Overdraft') {
      if (overdraftBalancePct >= 50) {
        classification = 'LOSS';
        provisioningPct = 1.0;
      } else if (overdraftBalancePct >= 20) {
        classification = 'DOUBTFUL';
        provisioningPct = 0.5;
      } else if (overdraftBalancePct >= 5) {
        classification = 'SUBSTANDARD';
        provisioningPct = 0.25;
      }
    }
  }

  if (
    restructureIterations > 2 &&
    (classification === 'PASS' || classification === 'SPECIAL_MENTION')
  ) {
    classification = 'SUBSTANDARD';
    provisioningPct = 0.25;
  }

  if (unlikelyToPay && classification === 'PASS') {
    classification = 'SUBSTANDARD';
    provisioningPct = 0.25;
  }

  const isNonPerforming = ['SUBSTANDARD', 'DOUBTFUL', 'LOSS'].includes(
    classification,
  );

  return {
    classification,
    provisioningPct,
    isNonPerforming,
    display: classification
      .replace('_', ' ')
      .toLowerCase()
      .replace(/\b\w/g, (l) => l.toUpperCase()),
  };
}
