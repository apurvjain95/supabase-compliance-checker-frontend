import { ComplianceResponse } from "@/models/Compliance";
import request from "@/utils/request";

const endpoints = {
  refreshComplianceScore: `/scan/run-compliance`,
};

const complianceAPI = {
  refreshComplianceScore: () => {
    return request.post<object, ComplianceResponse>(
      endpoints.refreshComplianceScore,
      {},
    );
  },
};

export default complianceAPI;
