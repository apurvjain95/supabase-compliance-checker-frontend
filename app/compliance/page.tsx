"use client";

import complianceAPI from "@/api/ComplianceAPI";
import Progress from "@/components/global/Progress";
import { Badge, Box, Button, Table } from "@radix-ui/themes";
import { useContext, useEffect, useState } from "react";
import { ToastContext } from "@/context/ToastContext";
import { ComplianceResponse } from "@/models/Compliance";
import Spinner from "@/components/global/Spinner";

const CompliancePage = () => {
  const [loading, setLoading] = useState(false);
  const [compliancePassingItems, setCompliancePassingItems] = useState(0);
  const [complianceTotalItems, setComplianceTotalItems] = useState(0);
  const [mfaDetails, setMfaDetails] = useState<
    ComplianceResponse["mfa"]["details"]
  >([]);
  const [rlsDetails, setRlsDetails] = useState<
    ComplianceResponse["rls"]["details"]
  >([]);
  const [pitrDetails, setPitrDetails] =
    useState<ComplianceResponse["pitr"]["status"]>(false);

  const { openToast } = useContext(ToastContext);

  type keysOfComplianceResponse = (keyof Pick<
    ComplianceResponse,
    "mfa" | "rls"
  >)[];

  const handleRefresh = async () => {
    try {
      setLoading(true);
      const response = await complianceAPI.refreshComplianceScore();
      if (response.success) {
        setComplianceTotalItems(
          (["mfa", "rls"] as unknown as keysOfComplianceResponse).reduce(
            (acc, curr) => {
              return acc + response[curr].details.length;
            },
            // initial value is 1 set for pitr case
            1,
          ),
        );
        setCompliancePassingItems(
          (["mfa", "rls"] as unknown as keysOfComplianceResponse).reduce(
            (acc, curr) => {
              return (
                acc +
                response[curr].details.filter((item) => {
                  if ("hasMFA" in item) {
                    return item.hasMFA;
                  }
                  if ("hasRLS" in item) {
                    return item.hasRLS;
                  }
                  return false;
                }).length
              );
            },
            response.pitr.status ? 1 : 0,
          ),
        );
        setMfaDetails(response.mfa.details);
        setRlsDetails(response.rls.details);
        setPitrDetails(response.pitr.status);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      openToast({
        message:
          err.response.data.message || "Failed to fetch compliance details",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleRefresh();
  }, []);

  return (
    <div className="flex flex-col gap-6 w-full">
      <h1 className="flex justify-center mb-6">Supabase Compliance Status</h1>
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <Box className="h-8 w-8">
            <Spinner />
          </Box>
        </div>
      ) : (
        <>
          <div className="flex flex-wrap items-center sm:gap-4 md:gap-10">
            <div className="text-body-xs-medium whitespace-nowrap">
              Compliance Percentage
            </div>
            <div className="flex flex-1 items-center sm:gap-4 md:gap-10">
              <div className="flex flex-1 items-center gap-4 min-w-40">
                <Progress
                  value={compliancePassingItems}
                  maxValue={complianceTotalItems}
                />
                <span className="text-body-xs-medium">
                  {(
                    (compliancePassingItems / complianceTotalItems) *
                    100
                  ).toFixed(2)}
                  %
                </span>
              </div>
              <Button className="cursor-pointer" onClick={handleRefresh}>
                Refresh
              </Button>
            </div>
          </div>
          <div className="flex flex-wrap items-start justify-evenly gap-6">
            <div className="flex flex-col gap-2 min-w-80">
              <div className="flex items-center gap-2">
                <h3>MFA Status:</h3>
                <div className="text-body-sm-medium">
                  <Badge
                    color={
                      mfaDetails.some((detail) => !detail.hasMFA)
                        ? "red"
                        : "green"
                    }
                  >
                    {mfaDetails.some((detail) => !detail.hasMFA)
                      ? "Non-Compliant"
                      : "Compliant"}
                  </Badge>
                </div>
              </div>
              <Table.Root className="border border-gray-200 rounded-md overflow-hidden w-full">
                <Table.Header className="bg-gray-300">
                  <Table.Row className="text-gray-600">
                    <Table.ColumnHeaderCell
                      key="mfa-email-header"
                      className="text-body-xs-medium"
                    >
                      User Email
                    </Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell
                      key="mfa-compliant-header"
                      className="text-body-xs-medium"
                    >
                      MFA Compliant
                    </Table.ColumnHeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {mfaDetails.map((detail) => (
                    <Table.Row key={`mfa-${detail.id}`} className="h-fit">
                      <Table.Cell className="text-body-sm-medium">
                        {detail.email}
                      </Table.Cell>
                      <Table.Cell className="text-body-sm-medium">
                        <Badge color={detail.hasMFA ? "green" : "red"}>
                          {detail.hasMFA ? "Compliant" : "Non-Compliant"}
                        </Badge>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Root>
            </div>
            <div className="flex flex-col gap-2 min-w-80">
              <div className="flex items-center gap-2">
                <h3>RLS Status:</h3>
                <div className="text-body-sm-medium">
                  <Badge
                    color={
                      rlsDetails.some((detail) => !detail.hasRLS)
                        ? "red"
                        : "green"
                    }
                  >
                    {rlsDetails.some((detail) => !detail.hasRLS)
                      ? "Non-Compliant"
                      : "Compliant"}
                  </Badge>
                </div>
              </div>
              <Table.Root className="border border-gray-200 rounded-md overflow-hidden w-full">
                <Table.Header className="bg-gray-300">
                  <Table.Row className="text-gray-600">
                    <Table.ColumnHeaderCell
                      key="rls-table-name-header"
                      className="text-body-xs-medium"
                    >
                      Table name
                    </Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell
                      key="rls-compliant-header"
                      className="text-body-xs-medium"
                    >
                      RLS Compliant
                    </Table.ColumnHeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {rlsDetails.map((detail) => (
                    <Table.Row
                      key={`rls-${detail.tableName}`}
                      className="h-fit"
                    >
                      <Table.Cell className="text-body-sm-medium">
                        {detail.tableName}
                      </Table.Cell>
                      <Table.Cell className="text-body-sm-medium">
                        <Badge color={detail.hasRLS ? "green" : "red"}>
                          {detail.hasRLS ? "Compliant" : "Non-Compliant"}
                        </Badge>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Root>
            </div>
            <div className="flex items-center gap-2 min-w-80">
              <h3>PITR Status:</h3>
              <div className="text-body-sm-medium">
                <Badge color={pitrDetails ? "green" : "red"}>
                  {pitrDetails ? "Compliant" : "Non-Compliant"}
                </Badge>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CompliancePage;
