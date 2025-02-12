interface ComplianceResponse {
  success: boolean;
  timestamp: string;
  mfa: {
    status: boolean;
    details: {
      id: string;
      email: string;
      hasMFA: boolean;
    }[];
  };
  rls: {
    status: boolean;
    details: {
      tableName: string;
      hasRLS: boolean;
    }[];
  };
  pitr: {
    status: boolean;
  };
}

export type { ComplianceResponse };
