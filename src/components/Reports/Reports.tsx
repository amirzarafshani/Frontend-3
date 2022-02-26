import * as React from 'react';
import { ProjectsSelect } from '@components/Reports/ProjectsSelect';
import { GatewaySelect } from '@components/Reports/GatewaySelect';
import { DateSelect } from '@components/Reports/DateSelect';
import { NoData } from '@components/Reports/NoData';
import { PieChart } from '@components/Reports/PieChart';
import axios from 'axios';
import moment from 'moment';
import {
  IAxiosProjectResponse,
  IAxiosGatewayResponse,
  IAxiosReportsResponse,
  IReportProps,
  IGroupedReportsResponse,
  IProjectProps,
  IGatewayProps,
  IFilterPostDto,
} from './reports.interface';
import { ReportResultRow } from './ReportResultRow';
import { ReportResultTable } from './ReportResultTable';
import { CurrencyFormatter } from './CurrencyFormatter';

import style from './Reports.scss';
const apiUrl = 'http://178.63.13.157:8090/mock-api/api/';

export const Reports = (): JSX.Element => {
  const [expanded, setExpanded] = React.useState<string | null>(null);
  const [projects, setProjects] = React.useState<IProjectProps[]>([]);
  const [gateways, setGateways] = React.useState<IGatewayProps[]>([]);
  const [reports, setReports] = React.useState<IGroupedReportsResponse[]>([]);
  const [filterPostDto, setFilterPost] = React.useState<IFilterPostDto | null>();

  const [projectId, setProjectId] = React.useState<string>('');
  const [gatewayId, setGatewayId] = React.useState<string>('');
  const [selectedProjectName, setSelectedProjectName] = React.useState<string>('');
  const [selectedGatewayName, setSelectedGatewayName] = React.useState<string>('');
  const [fromDate, setFromDate] = React.useState<Date | null>(null);
  const [toDate, setToDate] = React.useState<Date | null>(null);

  React.useEffect(() => {
    axios.get<IAxiosProjectResponse>(`${apiUrl}projects`).then((response) => {
      const res: IAxiosProjectResponse = response.data;
      setProjects(res.data);
    });
    axios.get<IAxiosGatewayResponse>(`${apiUrl}gateways`).then((response) => {
      const res: IAxiosGatewayResponse = response.data;
      setGateways(res.data);
    });
  }, []);

  const handleProjectChange = React.useCallback((val: string) => {
    setProjectId(val);
  }, []);

  const handleGatewayChange = React.useCallback((val: string) => {
    setGatewayId(val);
  }, []);

  const handleDateChange = React.useCallback((val: Date | null, dateType: string) => {
    switch (dateType) {
      case 'fromDate': {
        setFromDate(val);
        break;
      }
      case 'toDate': {
        setToDate(val);
        break;
      }
    }
  }, []);

  const handleGetReports = React.useCallback(() => {
    const dto: IFilterPostDto = {
      projectId: projectId,
      gatewayId: gatewayId,
      from: fromDate ? moment(fromDate).format('YYYY-MM-DD') : '',
      to: toDate ? moment(toDate).format('YYYY-MM-DD') : '',
    };

    axios
      .post<IAxiosReportsResponse>(`${apiUrl}report`, JSON.stringify(dto), {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        const res: IAxiosReportsResponse = response.data;
        const data_: IReportProps[] = res.data;

        setFilterPost(dto);
        setExpanded(null);

        setSelectedProjectName(projects.find((e: IProjectProps) => e.projectId === projectId)?.name ?? 'All projects');
        setSelectedGatewayName(gateways.find((e: IGatewayProps) => e.gatewayId === gatewayId)?.name ?? 'All gateways');

        if ((projectId && gatewayId) || !projectId) {
          const groupedReport = data_.reduce((group: IGroupedReportsResponse[], item: IReportProps) => {
            const i = group.findIndex((e: IGroupedReportsResponse) => e.id === item.projectId);
            if (i > -1) {
              group[i].total += item.amount;

              group[i].items.push({
                id: item.gatewayId,
                amount: item.amount,
                paymentId: item.paymentId,
                created: item.created,
                gateway: gateways.find((e: IGatewayProps) => e.gatewayId === item.gatewayId)?.name,
              });
            } else {
              group.push({
                id: item.projectId,
                total: item.amount,
                name: projects.find((e: IProjectProps) => e.projectId === item.projectId)?.name,
                items: [
                  {
                    id: item.gatewayId,
                    amount: item.amount,
                    paymentId: item.paymentId,
                    created: item.created,
                    gateway: gateways.find((e: IGatewayProps) => e.gatewayId === item.gatewayId)?.name,
                  },
                ],
              });
            }
            return group;
          }, []);
          setReports(groupedReport);
        } else if (!gatewayId) {
          const groupedReport = data_.reduce((group: IGroupedReportsResponse[], item: IReportProps) => {
            const i = group.findIndex((e: IGroupedReportsResponse) => e.id === item.gatewayId);
            if (i > -1) {
              group[i].total += item.amount;

              group[i].items.push({
                id: item.projectId,
                amount: item.amount,
                paymentId: item.paymentId,
                created: item.created,
              });
            } else {
              group.push({
                id: item.gatewayId,
                total: item.amount,
                name: gateways.find((e: IGatewayProps) => e.gatewayId === item.gatewayId)?.name,
                items: [{ id: item.projectId, amount: item.amount, paymentId: item.paymentId, created: item.created }],
              });
            }
            return group;
          }, []);
          setReports(groupedReport);
        }
      });
  }, [projectId, gatewayId, fromDate, toDate, projects, gateways]);

  const handleSetExpanded = React.useCallback((val: string) => {
    setExpanded((prev) => (prev === val ? '' : val));
  }, []);

  return (
    <div className={style.reportsPageContainer}>
      <div className={style.top}>
        <div className={style.titleContainer}>
          <span className={style.title}>Reports</span>
          <span className={style.subTitle}>Easily generate a report of your transactions</span>
        </div>
        <div className={style.filtersContainer}>
          <ProjectsSelect data={projects} value={projectId} onChange={handleProjectChange} />
          <GatewaySelect data={gateways} value={gatewayId} onChange={handleGatewayChange} />
          <DateSelect
            name="fromDate"
            label="From date"
            value={fromDate}
            onChange={(e: Date | null) => handleDateChange(e, 'fromDate')}
          />
          <DateSelect
            name="toDate"
            label="To date"
            value={toDate}
            minDate={fromDate}
            onChange={(e: Date | null) => handleDateChange(e, 'toDate')}
          />
          <button id="filter" className={style.generateReportBtn} onClick={handleGetReports}>
            Generate report
          </button>
        </div>
      </div>

      {reports && reports.length ? (
        <React.Fragment>
          <div className={style.reportsDataWithChartContainer} id="reults-container">
            <div className={style.reportsTableContainer}>
              <div className={style.topFilterNames}>{`${selectedProjectName} | ${selectedGatewayName}`}</div>
              {filterPostDto.projectId !== '' && filterPostDto.gatewayId !== '' ? (
                <div className={style.reportsDataContainer} id="with-projectId-with-gatewayId">
                  <ReportResultTable item={reports[0]} expanded={expanded} visible />
                </div>
              ) : (
                <div className={style.reportsDataContainer}>
                  {reports.map((item: IGroupedReportsResponse, index: number) => (
                    <React.Fragment key={index}>
                      <ReportResultRow
                        handleSetExpanded={() => handleSetExpanded(item.id)}
                        title={item.name}
                        total={item.total}
                      />
                      <ReportResultTable
                        item={item}
                        expanded={expanded}
                        showGateway={!filterPostDto.projectId && !filterPostDto.gatewayId}
                      />
                    </React.Fragment>
                  ))}
                </div>
              )}
            </div>

            {!filterPostDto.projectId && filterPostDto.gatewayId && (
              <div className={style.chartContainer} id="no-projectId-with-gatewayId-total-chart">
                <div className={style.pieChartContainer}>
                  <PieChart data={reports} />
                </div>
                <div className={style.totalContainer}>
                  <CurrencyFormatter
                    prefix="GATEWAY TOTAL |"
                    total={reports.reduce((total: number, item: IGroupedReportsResponse) => {
                      return (total += item.total);
                    }, 0)}
                  />
                </div>
              </div>
            )}
            {filterPostDto.projectId && !filterPostDto.gatewayId && (
              <div className={style.chartContainer} id="with-projectId-no-gatewayId-total-chart">
                <div className={style.pieChartContainer}>
                  <PieChart data={reports} />
                </div>
                <div className={style.totalContainer}>
                  <CurrencyFormatter
                    prefix="PROJECT TOTAL |"
                    total={reports.reduce((total: number, item: IGroupedReportsResponse) => {
                      return (total += item.total);
                    }, 0)}
                  />
                </div>
              </div>
            )}
          </div>
          {filterPostDto.projectId && filterPostDto.gatewayId && (
            <div className={style.totalContainer} id="with-projectId-with-gatewayId-total">
              <CurrencyFormatter prefix="TOTAL |" total={reports[0].total} />
            </div>
          )}
          {!filterPostDto.projectId && !filterPostDto.gatewayId && (
            <div className={style.totalContainer} id="no-projectId-no-gatewayId-total">
              <CurrencyFormatter
                prefix="TOTAL |"
                total={reports.reduce((total: number, item: IGroupedReportsResponse) => {
                  return (total += item.total);
                }, 0)}
              />
            </div>
          )}
        </React.Fragment>
      ) : (
        <NoData />
      )}
    </div>
  );
};
